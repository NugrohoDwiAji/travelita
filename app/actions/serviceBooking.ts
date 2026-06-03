"use server";

import { z } from "zod";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import type { bookingType, BookingStatus, ShuttleBookingRecordAdmin } from "@/app/types/booking";

const serviceBookingSchema = z.object({
  type: z.enum(["TRIP", "PRIVATE_CAR", "SPEAR_CAR", "TICKET"]),
  from: z.string().trim().min(1, "Lokasi asal wajib diisi."),
  to: z.string().trim().min(1, "Lokasi tujuan wajib diisi."),
  serviceDate: z.string().trim().min(1, "Tanggal layanan wajib diisi."),
  returnDate: z.string().trim().optional(),
  passengerCount: z.coerce.number().int().positive("Jumlah peserta minimal 1."),
  price: z.coerce.number().min(0, "Harga tidak valid."),
  description: z.string().trim().min(1, "Detail layanan wajib diisi."),
}).superRefine((data, ctx) => {
  const serviceDate = new Date(data.serviceDate);
  if (Number.isNaN(serviceDate.getTime())) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Format tanggal layanan tidak valid.",
      path: ["serviceDate"],
    });
  }

  if (data.returnDate) {
    const returnDate = new Date(data.returnDate);
    if (Number.isNaN(returnDate.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Format tanggal pulang tidak valid.",
        path: ["returnDate"],
      });
    }
  }
});

export type ServiceBookingInput = z.infer<typeof serviceBookingSchema>;

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(value);
}

function formatTime(value: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(value);
}

function toTableStatus(status: string): BookingStatus {
  const upper = status.toUpperCase();
  if (
    upper === "PENDING" ||
    upper === "CONFIRMED" ||
    upper === "COMPLETED" ||
    upper === "CANCELLED" ||
    upper === "PROCESSING"
  ) {
    return upper as BookingStatus;
  }
  return "PENDING";
}

function bookingPrefix(type: bookingType) {
  const prefixes: Record<bookingType, string> = {
    SHUTTLE: "SHT",
    TRIP: "TRV",
    PRIVATE_CAR: "CAR",
    SPEAR_CAR: "SPF",
    TICKET: "TKT",
  };
  return prefixes[type];
}

export async function postServiceBooking(input: ServiceBookingInput) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Silakan login terlebih dahulu." };
  }

  if (session.user.role === "ADMIN") {
    return { success: false, error: "Akun admin tidak dapat membuat pemesanan." };
  }

  const validation = serviceBookingSchema.safeParse(input);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message;
    return { success: false, error: firstError || "Data pemesanan tidak valid." };
  }

  const data = validation.data;

  const activeBooking = await prisma.booking.findFirst({
    where: {
      userId: session.user.id,
      type: data.type,
      status: { in: ["PENDING", "PROCESSING"] },
    },
    select: { id: true },
  });

  if (activeBooking) {
    return {
      success: false,
      error: "Anda masih memiliki pesanan aktif untuk layanan ini. Selesaikan atau batalkan pesanan lama terlebih dahulu.",
    };
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const detail = await tx.shuttleBooking.create({
        data: {
          shuttleType: data.returnDate ? "ROUND_TRIP" : "ONE_WAY",
          from: data.from,
          to: data.to,
          leavingTime: new Date(data.serviceDate),
          returnTime: data.returnDate ? new Date(data.returnDate) : null,
          passengerCount: data.passengerCount,
          price: data.price,
          description: data.description,
        },
        select: { id: true },
      });

      const booking = await tx.booking.create({
        data: {
          userId: session.user.id,
          details: detail.id,
          type: data.type,
          status: "PENDING",
        },
        select: { id: true },
      });

      return { bookingId: booking.id, detailId: detail.id };
    });

    return {
      success: true,
      message: "Pemesanan berhasil dikirim. Admin akan segera menghubungi Anda.",
      data: result,
    };
  } catch (error) {
    console.error("Error postServiceBooking:", error);
    return { success: false, error: "Terjadi kesalahan server saat menyimpan pemesanan." };
  }
}

export async function getServiceBookingsByType(type: Exclude<bookingType, "SHUTTLE">) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Silakan login terlebih dahulu.", data: [] };
  }

  if (session.user.role !== "ADMIN") {
    return { success: false, error: "Anda tidak memiliki izin melihat data ini.", data: [] };
  }

  const bookings = await prisma.booking.findMany({
    where: { type },
    select: {
      id: true,
      details: true,
      status: true,
      paymentProof: true,
      user: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const detailIds = bookings.map((booking) => booking.details);
  const details = await prisma.shuttleBooking.findMany({
    where: { id: { in: detailIds } },
  });
  const detailMap = new Map(details.map((detail) => [detail.id, detail]));

  const data: ShuttleBookingRecordAdmin[] = bookings.map((booking) => {
    const detail = detailMap.get(booking.details);
    const leavingDate = detail?.leavingTime ? new Date(detail.leavingTime) : null;

    return {
      id: `#${bookingPrefix(type)}-${String(booking.id).padStart(4, "0")}`,
      bookingId: booking.id,
      name: booking.user?.name ?? "-",
      phone: "-",
      route: detail ? `${detail.from} - ${detail.to}` : "-",
      date: leavingDate ? formatDate(leavingDate) : "-",
      time: leavingDate ? formatTime(leavingDate) : "-",
      passengers: detail ? String(detail.passengerCount) : "-",
      amount: detail ? formatRupiah(detail.price) : "Rp 0",
      status: toTableStatus(booking.status),
      paymentProof: booking.paymentProof,
    };
  });

  return { success: true, data };
}

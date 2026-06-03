"use server";

import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import type {
  BookingTableProps,
  BookingStatus,
  BookingListItem,
  
} from "@/app/types/booking";
import { validateShuttleBookingData } from "@/app/utils/booking-validations";
import { errorResponse, successResponse } from "../lib/action-response";
import { uploadFile } from "../lib/storage";
import { validateImageFile } from "../lib/validations/shuttle";

async function pickFile(payload: unknown) {
  // 1. Cek secara spesifik apakah payload adalah FormData
  if (!(payload instanceof FormData)) {
    throw new Error("Format tidak valid! Data harus berupa FormData.");
  }

  // 2. Gunakan .get() untuk menarik data, BUKAN titik (dot notation)
  const file = payload.get("paymentProof");
  const id = payload.get("bookingId");

  return {
    bookingId: typeof id === "string" ? id : undefined,
    paymentImage: file instanceof File ? file : null,
  };
}

async function uploadPaymentProof(
  payload: unknown,
  
) {
  const { paymentImage } = await pickFile(payload);

 
  const paymentImagePath = paymentImage
    ? await uploadFile(paymentImage, "payment-proofs")
    : null;


  if (!paymentImagePath) {
    throw new Error("Failed to upload payment proof");
  }
  return { paymentImagePath };
}

export async function postShuttleBooking(params: BookingTableProps) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Silakan login terlebih dahulu." };
  }

  if (session.user.role === "ADMIN") {
    return { success: false, error: "Akun admin tidak dapat membuat pemesanan shuttle." };
  }

  const validation = validateShuttleBookingData(params);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message;
    return { success: false, error: firstError || "Data pemesanan tidak valid." };
  }

  const data = validation.data;
  const normalizedLeavingTime = new Date(data.leavingTime);
  const normalizedReturnTime = data.returnTime
    ? new Date(data.returnTime)
    : null;
  const normalizedDescription =
    data.description && data.description.length > 0
      ? data.description
      : `${data.from} - ${data.to} untuk ${data.passengerCount} penumpang`;

  // PERBAIKAN 1 & 2: Gunakan findFirst dan langsung cari booking yang "bermasalah"
  const activeBooking = await prisma.booking.findFirst({
    where: { 
      userId: session.user.id,
      type: "SHUTTLE",
      status: {
        in: ["PENDING", "PROCESSING"] // Langsung saring status di level database
      }
    },
    select: { id: true },
  });

  // Logika pengecekan menjadi sangat sederhana
  if (activeBooking) {
    return {
      success: false,
      error: "Akun ini sudah memiliki pesanan yang sedang berjalan. Selesaikan atau batalkan pesanan lama terlebih dahulu.",
    };
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // PERBAIKAN 3: Hapus kode sisa, langsung buat datanya
      const createdShuttleBooking = await tx.shuttleBooking.create({
        data: {
          shuttleType: data.shuttleType,
          from: data.from,
          to: data.to,
          leavingTime: normalizedLeavingTime,
          returnTime: normalizedReturnTime,
          passengerCount: data.passengerCount,
          price: data.price,
          description: normalizedDescription,
        },
        select: { id: true },
      });

      const booking = await tx.booking.create({
        data: {
          userId: session.user.id,
          details: createdShuttleBooking.id,
          type: "SHUTTLE",
          status: "PENDING",
        },
        select: { id: true }
      });

      return { shuttleBookingId: createdShuttleBooking.id, bookingId: booking.id };
    });

    return {
      success: true,
      message: "Pemesanan shuttle berhasil disimpan.",
      data: result,
    };
  } catch (error) {
    console.error("Error postShuttleBooking:", error); // Berguna untuk debugging di terminal server
    return {
      success: false,
      error: "Terjadi kesalahan server saat menyimpan pemesanan shuttle.",
    };
  }
}

export async function getShuttleBookingsByUserAndStatus(
  status?: BookingStatus,
  userId?: string,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Silakan login terlebih dahulu." };
  }

  const isAdmin = session.user.role === "ADMIN";

  const targetUserId = userId ?? (isAdmin ? undefined : session.user.id);

  if (!isAdmin && userId && userId !== session.user.id) {
    return { error: "Anda tidak memiliki izin melihat data user lain." };
  }

  const bookings = (await prisma.booking.findMany({
    where: {
      ...(targetUserId ? { userId: targetUserId } : {}),
      type: "SHUTTLE",
      ...(status ? { status } : {}),
    },
    select: {
      id: true,
      userId: true,
      details: true,
      type: true,
      status: true,
      paymentProof: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          role: true,
          profile: {
            select: {
              id: true,
              country: true,
              city: true,
              profilePicture: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })) as BookingListItem[];

  if (bookings.length === 0) {
    return { success: true, data: [] };
  }

  const shuttleIds = bookings.map((booking) => booking.details);
  const shuttleRecords = await prisma.shuttleBooking.findMany({
    where: { id: { in: shuttleIds } },
    select: {
      id: true,
      shuttleType: true,
      from: true,
      to: true,
      leavingTime: true,
      returnTime: true,
      passengerCount: true,
      price: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const shuttleMap = new Map(
    shuttleRecords.map((record) => [record.id, record]),
  );

  const data = bookings.map((booking) => ({
    ...booking,
    shuttleBooking: shuttleMap.get(booking.details) ?? null,
  }));

  return { success: true, data };
}

export async function getShuttleBookingById(bookingId: number) {
  const isAuthenticated = await auth();

  if (!isAuthenticated) {
    return errorResponse("Silakan login terlebih dahulu.", 401);
  }
  try {
    const result = await prisma.shuttleBooking.findUnique({
      where: { id: bookingId },
      select: {
        id: true,
        shuttleType: true,
        from: true,
        to: true,
        leavingTime: true,
        returnTime: true,
        passengerCount: true,
        price: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return successResponse({
      success: true,
      message: "Data pemesanan shuttle berhasil diambil.",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching shuttle booking by ID:", error);
    return errorResponse("Gagal mengambil data pemesanan shuttle.", 500);
  }
}

export async function updateComfirmPayment(payload: unknown) {
  const isAuthenticated = await auth();

  if (!isAuthenticated) {
    return errorResponse("Silakan login terlebih dahulu.", 401);
  }
  const rawData = {
    bookingId:
      payload instanceof FormData ? payload.get("bookingId") : undefined,
    paymentProof:
      payload instanceof FormData ? payload.get("paymentProof") : undefined,
  };

  const parsedData = await validateImageFile(rawData);
  console.log("ini dari zod", parsedData);

  if (!parsedData.success) {
    const firstError = parsedData.error.issues[0]?.message;
    return errorResponse(firstError || "Data tidak valid.", 400);
  }
  try {
    const uploaded = await uploadPaymentProof( parsedData.data);

    const uploadPayment = await prisma.booking.update({
      where: { id: Number(parsedData.data.bookingId) },
      data: { paymentProof: uploaded.paymentImagePath },
      select: {
        id: true,
        paymentProof: true,
      },
    });
    console.log("ini dari database", uploadPayment);
    return successResponse({
      success: true,
      message: "Bukti pembayaran berhasil diunggah.",
      data: uploadPayment,
    });
  } catch (error) {
    console.error("Error updating payment proof:", error);
    return errorResponse("Gagal memperbarui bukti pembayaran.", 500);
  }
}

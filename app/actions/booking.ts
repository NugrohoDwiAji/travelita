"use server";

import { z } from "zod";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import type { BookingStatus, BookingListItem } from "@/app/types/booking";
import { getShuttleBookingById } from "./shuttleService";
import { errorResponse } from "../lib/action-response";

const updateBookingStatusSchema = z.object({
	bookingId: z.coerce.number().int().positive("ID booking tidak valid."),
	status: z.enum(["PENDING", "PROCESSING", "CONFIRMED", "COMPLETED", "CANCELLED"]),
});

type UpdateBookingStatusInput = {
	bookingId: number;
	status: BookingStatus;
};

const allowedShuttleStatuses = new Set<BookingStatus>([
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "COMPLETED",
  "CANCELLED",
]);


export async function updateBookingStatusById(input: UpdateBookingStatusInput) {
	const session = await auth();

	if (!session?.user?.id) {
		return { error: "Silakan login terlebih dahulu." };
	}

	const validation = updateBookingStatusSchema.safeParse(input);
	if (!validation.success) {
		const firstError = validation.error.issues[0]?.message;
		return { error: firstError || "Data update status tidak valid." };
	}

	const { bookingId, status } = validation.data;
	const isAdmin = session.user.role === "ADMIN";

	const booking = await prisma.booking.findUnique({
		where: { id: bookingId },
		select: {
			id: true,
			userId: true,
			status: true,
			type: true,
			updatedAt: true,
		},
	});

	if (!booking) {
		return { error: "Booking tidak ditemukan." };
	}

	if (!isAdmin && booking.userId !== session.user.id) {
		return { error: "Anda tidak memiliki izin untuk mengubah booking ini." };
	}

	try {
		const updated = await prisma.booking.update({
			where: { id: bookingId },
			data: { status },
			select: {
				id: true,
				userId: true,
				type: true,
				status: true,
				updatedAt: true,
			},
		});

		return {
			success: true,
			message: "Status booking berhasil diperbarui.",
			data: updated,
		};
	} catch {
		return { error: "Terjadi kesalahan server saat mengubah status booking." };
	}
}

export async function getUserBooking(userId: string, status?: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Silakan login terlebih dahulu.", data: [] };
  }

  const normalizedStatus = status?.toUpperCase();

  if (normalizedStatus && !allowedShuttleStatuses.has(normalizedStatus as BookingStatus)) {
    return { error: "Status booking tidak valid.", data: [] };
  }

  const targetStatus = (normalizedStatus as BookingStatus) ?? "PENDING";

  const bookings = await prisma.booking.findMany({
    where: {
      userId,
      status: targetStatus,
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
  }) as BookingListItem[];

  if (bookings.length === 0) {
    return { success: true, data: [] };
  }

  // Ambil detail shuttle untuk booking bertipe SHUTTLE
  const shuttleBookingIds = bookings
    .filter((b) => b.type === "SHUTTLE")
    .map((b) => b.details);

  const shuttleRecords =
    shuttleBookingIds.length > 0
      ? await prisma.shuttleBooking.findMany({
          where: { id: { in: shuttleBookingIds } },
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
        })
      : [];

  const shuttleMap = new Map(shuttleRecords.map((r) => [r.id, r]));

  const data = bookings.map((booking) => ({
    ...booking,
    shuttleBooking:
      booking.type === "SHUTTLE" ? (shuttleMap.get(booking.details) ?? null) : null,
  }));

  return { success: true, data };
}

export async function getUserBookingDetail(type: string, bookingId: number) {
  if (type === "SHUTTLE") {
    return getShuttleBookingById(bookingId);
  } else {
    return errorResponse("Tipe booking tidak memiliki detail shuttle.", 400);
  }
}

export async function getBookingById(bookingId: number) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Silakan login terlebih dahulu.", data: null };
  }

  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
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
  });

  if (!booking) {
    return { error: "Booking tidak ditemukan.", data: null };
  }

  if (booking.userId !== session.user.id && session.user.role !== "ADMIN") {
    return { error: "Anda tidak memiliki izin melihat data ini.", data: null };
  }

  let shuttleBooking = null;

  if (booking.type === "SHUTTLE") {
    shuttleBooking = await prisma.shuttleBooking.findUnique({
      where: { id: booking.details },
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
  }

  const data = {
    ...booking,
    shuttleBooking: shuttleBooking,
  };

  return { success: true, data };
}

// ─── Admin: Get booking statistics ───────────────────────────
export async function getBookingStats() {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return { error: "Anda tidak memiliki izin.", data: null };
  }

  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const [
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      monthlyBookings,
      todayBookings,
      totalRevenue,
      shuttleBookings,
      tripBookings,
      privateCarBookings,
      spearFishingBookings,
      ticketBookings,
    ] = await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { status: "PENDING" } }),
      prisma.booking.count({ where: { status: "CONFIRMED" } }),
      prisma.booking.count({ where: { status: "COMPLETED" } }),
      prisma.booking.count({ where: { status: "CANCELLED" } }),
      prisma.booking.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.booking.count({ where: { createdAt: { gte: startOfDay } } }),
      prisma.shuttleBooking.aggregate({ _sum: { price: true } }),
      prisma.booking.count({ where: { type: "SHUTTLE" } }),
      prisma.booking.count({ where: { type: "TRIP" } }),
      prisma.booking.count({ where: { type: "PRIVATE_CAR" } }),
      prisma.booking.count({ where: { type: "SPEAR_CAR" } }),
      prisma.booking.count({ where: { type: "TICKET" } }),
    ]);

    return {
      success: true,
      data: {
        total: totalBookings,
        pending: pendingBookings,
        confirmed: confirmedBookings,
        completed: completedBookings,
        cancelled: cancelledBookings,
        monthly: monthlyBookings,
        today: todayBookings,
        totalRevenue: totalRevenue._sum.price ?? 0,
        byType: {
          shuttle: shuttleBookings,
          trip: tripBookings,
          privateCar: privateCarBookings,
          spearFishing: spearFishingBookings,
          ticket: ticketBookings,
        },
      },
    };
  } catch {
    return { error: "Gagal mengambil statistik booking.", data: null };
  }
}

// ─── Admin: Get all bookings ─────────────────────────────────
export async function getAllBookings(status?: string, type?: string) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return { error: "Anda tidak memiliki izin.", data: [] };
  }

  const where: Record<string, unknown> = {};

  if (status) {
    where.status = status.toUpperCase();
  }

  if (type) {
    where.type = type.toUpperCase();
  }

  try {
    const bookings = await prisma.booking.findMany({
      where,
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
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Fetch shuttle details for shuttle bookings
    const shuttleIds = bookings
      .filter((b) => b.type === "SHUTTLE")
      .map((b) => b.details);

    const shuttleRecords =
      shuttleIds.length > 0
        ? await prisma.shuttleBooking.findMany({
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
            },
          })
        : [];

    const shuttleMap = new Map(shuttleRecords.map((r) => [r.id, r]));

    const data = bookings.map((booking) => ({
      ...booking,
      shuttleBooking:
        booking.type === "SHUTTLE" ? (shuttleMap.get(booking.details) ?? null) : null,
    }));

    return { success: true, data };
  } catch {
    return { error: "Gagal mengambil data booking.", data: [] };
  }
}

// ─── Admin: Delete booking ───────────────────────────────────
export async function deleteBooking(bookingId: number) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return { error: "Anda tidak memiliki izin untuk menghapus booking." };
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { id: true, type: true, details: true },
  });

  if (!booking) {
    return { error: "Booking tidak ditemukan." };
  }

  try {
    // Delete shuttle booking detail if exists
    if (booking.type === "SHUTTLE" && booking.details) {
      await prisma.shuttleBooking.deleteMany({
        where: { id: booking.details },
      });
    }

    // Delete the booking
    await prisma.booking.delete({
      where: { id: bookingId },
    });

    return { success: true, message: "Booking berhasil dihapus." };
  } catch {
    return { error: "Gagal menghapus booking." };
  }
}

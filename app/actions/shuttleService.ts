"use server";

import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import type { BookingTableProps, BookingStatus } from "@/app/types/booking";
import { validateShuttleBookingData } from "@/app/utils/booking-validations";

export async function postShuttleBooking(params:BookingTableProps) {
	const session = await auth();

	if (!session?.user?.id) {
		return { error: "Silakan login terlebih dahulu." };
	}

	if (session.user.role === "ADMIN") {
		return { error: "Akun admin tidak dapat membuat pemesanan shuttle." };
	}

	const validation = validateShuttleBookingData(params);
	if (!validation.success) {
		const firstError = validation.error.issues[0]?.message;
		return { error: firstError || "Data pemesanan tidak valid." };
	}

	const data = validation.data;
	const normalizedLeavingTime = new Date(data.leavingTime);
	const normalizedReturnTime = data.returnTime ? new Date(data.returnTime) : null;
	const normalizedDescription =
		data.description && data.description.length > 0
			? data.description
			: `${data.from} - ${data.to} untuk ${data.passengerCount} penumpang`;

			
			const existingBooking = await prisma.booking.findUnique({
		where: { userId: session.user.id },
		select: {
			id: true,
			type: true,
			details: true,
			status: true,
		},
	});
	

	if (existingBooking && existingBooking.type === "SHUTTLE" && (existingBooking.status === "PROCESSING" || existingBooking.status === "PENDING" )) {
		return {
			error: "Akun ini sudah memiliki jenis booking lain. Selesaikan booking lama terlebih dahulu.",
		};
	}

	try {
		const result = await prisma.$transaction(async (tx) => {
			let shuttleBookingId = existingBooking?.details;

			if (existingBooking) {
				const updatedShuttleBooking = await tx.shuttleBooking.update({
					where: { id: existingBooking.details },
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

				shuttleBookingId = updatedShuttleBooking.id;

				await tx.booking.update({
					where: { id: existingBooking.id },
					data: {
						details: updatedShuttleBooking.id,
						type: "SHUTTLE",
						status: "PENDING",
					},
				});
			} else {
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

				shuttleBookingId = createdShuttleBooking.id;

				await tx.booking.create({
					data: {
						userId: session.user.id,
						details: createdShuttleBooking.id,
						type: "SHUTTLE",
						status: "PENDING",
					},
				});
			}

			return { shuttleBookingId };
		});

		return {
			success: true,
			message: "Pemesanan shuttle berhasil disimpan.",
			data: result,
		};
	} catch {
		return { error: "Terjadi kesalahan server saat menyimpan pemesanan shuttle." };
	}
}



const allowedShuttleStatuses = new Set<BookingStatus>([
	"PENDING",
	"CONFIRMED",
	"PROCESSING",
	"COMPLETED",
	"CANCELLED",
]);

export async function getShuttleBookingsByUserAndStatus(status?: BookingStatus, userId?: string) {
	const session = await auth();

	if (!session?.user?.id) {
		return { error: "Silakan login terlebih dahulu." };
	}

	const isAdmin = session.user.role === "ADMIN";

	const targetUserId = userId ?? (isAdmin ? undefined : session.user.id);

	if (!isAdmin && userId && userId !== session.user.id) {
		return { error: "Anda tidak memiliki izin melihat data user lain." };
	}


	const bookings = await prisma.booking.findMany({
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
							coutry: true,
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
	});

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

	const shuttleMap = new Map(shuttleRecords.map((record) => [record.id, record]));

	const data = bookings.map((booking) => ({
		...booking,
		shuttleBooking: shuttleMap.get(booking.details) ?? null,
	}));

	return { success: true, data };
}

export async function getUserShuttleBookings(userId: string) {
	return getShuttleBookingsByUserAndStatus(undefined, userId);
}

export async function getUserShuttleBookingsPending(userId: string) {
	return getShuttleBookingsByUserAndStatus("PENDING", userId);
}

export async function getUserShuttleBookingsConfirmed(userId: string) {
	return getShuttleBookingsByUserAndStatus("CONFIRMED", userId);
}

export async function getUserShuttleBookingsProcessing(userId: string) {
	return getShuttleBookingsByUserAndStatus("PROCESSING", userId);
}

export async function getUserShuttleBookingsCompleted(userId: string) {
	return getShuttleBookingsByUserAndStatus("COMPLETED", userId);
}

export async function getUserShuttleBookingsCancelled(userId: string) {
	return getShuttleBookingsByUserAndStatus("CANCELLED", userId);
}

export async function getUserBookingPending(userId:string, status?:string) {
	const normalizedStatus = status?.toUpperCase();

	if (normalizedStatus) {
		if (!allowedShuttleStatuses.has(normalizedStatus as BookingStatus)) {
			return { error: "Status booking tidak valid." };
		}

		return getShuttleBookingsByUserAndStatus(normalizedStatus as BookingStatus, userId);
	}

	return getShuttleBookingsByUserAndStatus("PENDING", userId);


}



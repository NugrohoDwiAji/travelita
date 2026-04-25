"use server";

import { z } from "zod";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import type { BookingStatus } from "@/app/types/booking";

const updateBookingStatusSchema = z.object({
	bookingId: z.coerce.number().int().positive("ID booking tidak valid."),
	status: z.enum(["PENDING", "PROCESSING", "CONFIRMED", "COMPLETED", "CANCELLED"]),
});

type UpdateBookingStatusInput = {
	bookingId: number;
	status: BookingStatus;
};

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



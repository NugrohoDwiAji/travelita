import { z } from "zod";

export const shuttleBookingSchema = z.object({
	shuttleType: z.enum(["ONE_WAY", "ROUND_TRIP"]),
	from: z.string().trim().min(1, "Kota asal wajib diisi."),
	to: z.string().trim().min(1, "Kota tujuan wajib diisi."),
	leavingTime: z.string().trim().min(1, "Waktu berangkat wajib diisi."),
	returnTime: z.string().trim().optional(),
	passengerCount: z.coerce.number().int().positive("Jumlah penumpang minimal 1."),
	price: z.coerce.number().positive("Harga harus lebih besar dari 0."),
	description: z.string().trim().optional(),
}).superRefine((data, ctx) => {
	const leavingTime = new Date(data.leavingTime);

	if (Number.isNaN(leavingTime.getTime())) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Format waktu berangkat tidak valid.",
			path: ["leavingTime"],
		});
	}

	if (data.shuttleType === "ROUND_TRIP") {
		if (!data.returnTime) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Waktu pulang wajib diisi untuk pulang pergi.",
				path: ["returnTime"],
			});
			return;
		}

		const returnTime = new Date(data.returnTime);
		if (Number.isNaN(returnTime.getTime())) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Format waktu pulang tidak valid.",
				path: ["returnTime"],
			});
			return;
		}

		if (returnTime <= leavingTime) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Waktu pulang harus setelah waktu berangkat.",
				path: ["returnTime"],
			});
		}
	}
});

export type ShuttleBookingInput = z.infer<typeof shuttleBookingSchema>;

export function validateShuttleBookingData(data: unknown) {
	return shuttleBookingSchema.safeParse(data);
}

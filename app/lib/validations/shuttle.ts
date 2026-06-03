import { z } from "zod";

// Tentukan batas maksimal ukuran file (contoh: 5MB)
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 5MB dalam byte

// Tentukan format MIME type yang diizinkan
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
];

export const ImageUploadSchema = z.object({
  bookingId: z.string().min(1, { message: "ID booking wajib diisi" }),
  // Memastikan data yang masuk adalah instance dari File bawaan browser/Node
  paymentProof: z
    .instanceof(File, { message: "File wajib diunggah" })
    // Validasi ukuran
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Ukuran file maksimal adalah 2MB.",
    })
    // Validasi ekstensi/format
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Format file harus .jpg, .jpeg, .png, .webp, atau .pdf.",
    }),
});

export function validateImageFile(data: unknown) {
  return ImageUploadSchema.safeParse(data);
}

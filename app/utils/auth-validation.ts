import { z } from "zod";

/**
 * Zod schema untuk validasi email
 */
export const emailSchema = z
  .string({ message: "Email tidak boleh kosong" })
  .email("Email tidak valid");

/**
 * Zod schema untuk validasi username
 * - Minimal 3 karakter
 * - Maksimal 20 karakter
 * - Hanya huruf, angka, underscore
 */
export const usernameSchema = z
  .string({ message: "Username tidak boleh kosong" })
  .min(3, "Username minimal 3 karakter")
  .max(20, "Username maksimal 20 karakter")
  .regex(/^[a-zA-Z0-9_]+$/, "Username hanya boleh mengandung huruf, angka, dan underscore");

/**
 * Zod schema untuk validasi password
 * - Minimal 8 karakter
 * - Harus mengandung minimal 1 huruf besar
 * - Harus mengandung minimal 1 huruf kecil
 * - Harus mengandung minimal 1 angka
 */
export const passwordSchema = z
  .string({ message: "Password tidak boleh kosong" })
  .min(8, "Password minimal 8 karakter")
  .refine(
    (val) => /[A-Z]/.test(val),
    "Password harus mengandung minimal 1 huruf besar"
  )
  .refine(
    (val) => /[a-z]/.test(val),
    "Password harus mengandung minimal 1 huruf kecil"
  )
  .refine(
    (val) => /[0-9]/.test(val),
    "Password harus mengandung minimal 1 angka"
  );

/**
 * Zod schema untuk validasi nama
 * - Minimal 2 karakter
 * - Maksimal 50 karakter
 */
export const nameSchema = z
  .string({ message: "Nama tidak boleh kosong" })
  .min(2, "Nama minimal 2 karakter")
  .max(50, "Nama maksimal 50 karakter");

export const countrySchema = z
  .string({ message: "Negara tidak boleh kosong" })
  .min(1, "Negara wajib dipilih");

export const citySchema = z
  .string({ message: "Kota tidak boleh kosong" })
  .min(1, "Kota wajib dipilih");

/**
 * Zod schema untuk validasi signup form
 */
export const signUpSchema = z
  .object({
    email: emailSchema,
    name: nameSchema,
    username: usernameSchema,
    country: countrySchema,
    city: citySchema,
    password: passwordSchema,
    confirmPassword: z.string({ message: "Konfirmasi password tidak boleh kosong" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak sesuai",
    path: ["confirmPassword"],
  });

/**
 * Type untuk SignUp form data (inferred dari schema)
 */
export type SignUpFormData = z.infer<typeof signUpSchema>;

/**
 * Zod schema untuk validasi login form
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string({ message: "Password tidak boleh kosong" }).min(1, "Password wajib diisi"),
});

/**
 * Type untuk Login form data (inferred dari schema)
 */
export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Helper function untuk validate signup data
 * Mengembalikan result dengan data dan errors
 */
export function validateSignUpData(data: unknown) {
  return signUpSchema.safeParse(data);
}

/**
 * Helper function untuk validate login data
 */
export function validateLoginData(data: unknown) {
  return loginSchema.safeParse(data);
}

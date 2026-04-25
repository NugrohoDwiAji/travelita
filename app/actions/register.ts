"use server";

import { prisma } from "@/app/lib/prisma";
import { hashPassword } from "@/app/utils/password";
import { validateSignUpData, type SignUpFormData } from "@/app/utils/auth-validation";

export async function register(data: SignUpFormData) {
  // Validasi input dengan Zod
  const validation = validateSignUpData(data);
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message;
    return { error: firstError || "Data tidak valid." };
  }

  const { name, username, email, password, country, city } = validation.data;

  // Cek apakah email sudah terdaftar
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email sudah terdaftar." };
  }

  try {
    // Hash password dengan bcrypt
    const hashedPassword = await hashPassword(password);

    // Buat user baru dengan role USER beserta profile
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        role: "USER",
        profile: {
          create: {
            coutry: country,
            city,
          },
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });

    return { success: true, data: user };
  } catch {
    return { error: "Terjadi kesalahan server." };
  }
}
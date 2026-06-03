"use server";

import { z } from "zod";
import { prisma } from "@/app/lib/prisma";
import {
  nameSchema,
  usernameSchema,
  countrySchema,
  citySchema,
} from "@/app/utils/auth-validation";
import { uploadFile } from "@/app/lib/storage";

const updateProfileSchema = z.object({
  name: nameSchema,
  username: usernameSchema,
  country: countrySchema,
  city: citySchema,
  profilePicture: z.string().url("URL gambar tidak valid").optional().or(z.literal("")),
});

export type UpdateProfileData = {
  name: string;
  username: string;
  country: string;
  city: string;
  profilePicture?: string;
};

export async function updateProfile(userId: string, data: UpdateProfileData) {
  const parsed = updateProfileSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message;
    return { error: firstError || "Data tidak valid." };
  }

  const { name, username, country, city, profilePicture } = parsed.data;

  // Pastikan username belum dipakai user lain
  const existingUsername = await prisma.user.findFirst({
    where: { username, NOT: { id: userId } },
  });
  if (existingUsername) {
    return { error: "Username sudah digunakan." };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        username,
        profile: {
          upsert: {
            create: { country, city, profilePicture: profilePicture || null },
            update: { country, city, profilePicture: profilePicture || null },
          },
        },
      },
    });

    return { success: true };
  } catch {
    return { error: "Terjadi kesalahan server." };
  }
}

// ─── Upload profile picture ──────────────────────────────────
export async function uploadProfilePicture(userId: string, file: File) {
  try {
    // Validate file
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return { error: "Format file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF." };
    }

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return { error: "Ukuran file terlalu besar. Maksimal 2MB." };
    }

    // Upload file
    const url = await uploadFile(file, "profile-pictures");

    // Update profile in database
    await prisma.user.update({
      where: { id: userId },
      data: {
        profile: {
          upsert: {
            create: { country: "", city: "", profilePicture: url },
            update: { profilePicture: url },
          },
        },
      },
    });

    return { success: true, url };
  } catch {
    return { error: "Gagal mengunggah foto profil." };
  }
}

// ─── Get user profile ────────────────────────────────────────
export async function getProfile(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        profile: {
          select: {
            country: true,
            city: true,
            profilePicture: true,
          },
        },
      },
    });

    if (!user) {
      return { error: "User tidak ditemukan.", data: null };
    }

    return { success: true, data: user };
  } catch {
    return { error: "Gagal mengambil data profil.", data: null };
  }
}

"use server";

import { z } from "zod";
import { prisma } from "@/app/lib/prisma";
import {
  nameSchema,
  usernameSchema,
  countrySchema,
  citySchema,
} from "@/app/utils/auth-validation";

const updateProfileSchema = z.object({
  name: nameSchema,
  username: usernameSchema,
  coutry: countrySchema,
  city: citySchema,
  profilePicture: z.string().url("URL gambar tidak valid").optional().or(z.literal("")),
});

export type UpdateProfileData = {
  name: string;
  username: string;
  coutry: string;
  city: string;
  profilePicture?: string;
};

export async function updateProfile(userId: string, data: UpdateProfileData) {
  const parsed = updateProfileSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message;
    return { error: firstError || "Data tidak valid." };
  }

  const { name, username, coutry, city, profilePicture } = parsed.data;

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
            create: { coutry, city, profilePicture: profilePicture || null },
            update: { coutry, city, profilePicture: profilePicture || null },
          },
        },
      },
    });

    return { success: true };
  } catch {
    return { error: "Terjadi kesalahan server." };
  }
}

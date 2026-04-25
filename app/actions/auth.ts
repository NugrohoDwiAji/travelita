"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { validateLoginData } from "@/app/utils/auth-validation";
import { AuthError } from "next-auth";

export async function loginAdmin(email: string, password: string) {
  // Validate input with Zod
  const validation = validateLoginData({ email, password });
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message;
    return { error: firstError || "Data tidak valid." };
  }

  // Check if user exists and is ADMIN before attempting signIn
  const user = await prisma.user.findUnique({
    where: { email: validation.data.email },
    select: { role: true },
  });

  if (!user) {
    return { error: "Email atau password salah." };
  }

  if (user.role !== "ADMIN") {
    return { error: "Akun ini tidak memiliki akses admin." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Email atau password salah." };
      }
      return { error: "Terjadi kesalahan saat login." };
    }
    throw error;
  }

  return { success: true };
}

export async function loginUser(email: string, password: string) {
  const validation = validateLoginData({ email, password });
  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message;
    return { error: firstError || "Data tidak valid." };
  }

  const user = await prisma.user.findUnique({
    where: { email: validation.data.email },
    select: { role: true },
  });

  if (!user) {
    return { error: "Email atau password salah." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Email atau password salah." };
      }
      return { error: "Terjadi kesalahan saat login." };
    }
    throw error;
  }

  return { success: true };
}

export async function logout() {
  await signOut({ redirectTo: "/admin/login" });
}

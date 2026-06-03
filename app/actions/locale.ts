"use server";

import { cookies } from "next/headers";

const VALID_LOCALES = ["id", "en"] as const;
type Locale = (typeof VALID_LOCALES)[number];

/**
 * Server Action — menyimpan preferensi bahasa ke cookie di sisi server.
 * Dengan ini, saat `router.refresh()` dipanggil setelahnya, Next.js
 * sudah pasti membaca cookie yang benar saat me-render ulang layout.
 */
export async function setLocaleCookie(locale: string) {
  const cookieStore = await cookies();
  const safe: Locale = VALID_LOCALES.includes(locale as Locale)
    ? (locale as Locale)
    : "id";

  cookieStore.set("travelita-lang", safe, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 tahun
    sameSite: "lax",
  });
}

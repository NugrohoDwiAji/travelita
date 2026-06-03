import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

const VALID_LOCALES = ["id", "en"] as const;
type Locale = (typeof VALID_LOCALES)[number];

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get("travelita-lang")?.value ?? "id";
  const locale: Locale = VALID_LOCALES.includes(raw as Locale)
    ? (raw as Locale)
    : "id";

  return {
    locale,
    messages: (await import(`../translation/${locale}.json`)).default,
  };
});

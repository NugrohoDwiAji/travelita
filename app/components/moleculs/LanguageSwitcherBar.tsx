"use client";

import { useEffect, useSyncExternalStore, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLocaleCookie } from "@/app/actions/locale";

type Language = "id" | "en";

const LABELS: Record<Language, { title: string; helper: string }> = {
  id: {
    title: "Bahasa",
    helper: "Pilih bahasa tampilan",
  },
  en: {
    title: "Language",
    helper: "Choose display language",
  },
};

function getCookieLanguage(): Language {
  if (typeof document === "undefined") return "id";
  const match = document.cookie.match(/(?:^|;\s*)travelita-lang=([^;]*)/);
  const raw = match?.[1];
  if (raw === "id" || raw === "en") return raw;
  return "id";
}

function subscribeCookie(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export default function LanguageSwitcherBar() {
  const lang = useSyncExternalStore(subscribeCookie, getCookieLanguage, () => "id") as Language;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function switchLanguage(newLang: Language) {
    if (newLang === lang || isPending) return;

    startTransition(async () => {
      await setLocaleCookie(newLang);
      router.refresh();
    });
  }

  return (
    <div
      className="border-b border-(--brand-divider)"
      style={{ background: "rgba(20, 52, 164, 0.04)" }}
    >
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Label kiri */}
        <p
          suppressHydrationWarning
          className="text-[11px] font-semibold tracking-[0.08em] uppercase transition-opacity"
          style={{ color: "#4050b5", opacity: isPending ? 0.5 : 1 }}
        >
          {LABELS[lang].title}
        </p>

        <div className="flex items-center gap-2">
          {/* Teks helper (tablet+) */}
          <span
            suppressHydrationWarning
            className="hidden text-[11px] sm:block transition-opacity"
            style={{ color: "#4050b5", opacity: isPending ? 0.5 : 1 }}
          >
            {LABELS[lang].helper}
          </span>

          {/* Toggle ID / EN */}
          <div
            className="flex items-center rounded-full p-1"
            style={{
              background: "rgba(20,52,164,0.08)",
              border: "1px solid rgba(20,52,164,0.14)",
              opacity: isPending ? 0.6 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {(["id", "en"] as Language[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => switchLanguage(l)}
                disabled={isPending}
                className="rounded-full px-3 py-1 text-[11px] font-bold transition-all disabled:cursor-wait"
                style={
                  lang === l
                    ? { background: "#1434A4", color: "#fff" }
                    : { background: "transparent", color: "#4050b5" }
                }
                aria-pressed={lang === l}
                aria-busy={isPending && lang === l}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

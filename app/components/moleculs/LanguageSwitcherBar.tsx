"use client";

import { useEffect, useState } from "react";

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

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "id";

  const saved = window.localStorage.getItem("travelita-lang");
  if (saved === "id" || saved === "en") return saved;

  const browserLang = window.navigator.language.toLowerCase();
  return browserLang.startsWith("id") ? "id" : "en";
}

export default function LanguageSwitcherBar() {
  const [lang, setLang] = useState<Language>("id");

  useEffect(() => {
    const initial = getInitialLanguage();
    setLang(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem("travelita-lang", lang);
    document.cookie = `travelita-lang=${lang}; path=/; max-age=31536000; samesite=lax`;
  }, [lang]);

  return (
    <div
      className="border-b border-(--brand-divider)"
      style={{ background: "rgba(20, 52, 164, 0.04)" }}
    >
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold tracking-[0.08em] uppercase" style={{ color: "#4050b5" }}>
          {LABELS[lang].title}
        </p>

        <div className="flex items-center gap-2">
          <span className="hidden text-[11px] sm:block" style={{ color: "#4050b5" }}>
            {LABELS[lang].helper}
          </span>
          <div
            className="flex items-center rounded-full p-1"
            style={{ background: "rgba(20,52,164,0.08)", border: "1px solid rgba(20,52,164,0.14)" }}
          >
            <button
              type="button"
              onClick={() => setLang("id")}
              className="rounded-full px-3 py-1 text-[11px] font-bold transition"
              style={
                lang === "id"
                  ? { background: "#1434A4", color: "#fff" }
                  : { background: "transparent", color: "#4050b5" }
              }
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className="rounded-full px-3 py-1 text-[11px] font-bold transition"
              style={
                lang === "en"
                  ? { background: "#1434A4", color: "#fff" }
                  : { background: "transparent", color: "#4050b5" }
              }
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

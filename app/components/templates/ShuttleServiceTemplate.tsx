"use client";

import ShuttleBookingForm from "@/app/components/organism/ShuttleBookingForm";
import FaqItem from "@/app/components/moleculs/FaqItem";
import { ContentInput } from "@/app/actions/content";
import {
  IconCheck,
  IconArrow,
} from "@/app/components/atoms/BookingIcons";
import { useTranslations } from "next-intl";

const KEUNTUNGAN_KEYS = ["1", "2", "3", "4"] as const;

interface RouteData {
  from: string;
  to: string;
  duration: string;
  price: string;
  tag?: string | null;
}

interface ShuttleServiceTemplateProps {
  content?: ContentInput;
  routes?: RouteData[];
}

export default function ShuttleServiceTemplate({ content, routes }: ShuttleServiceTemplateProps) {
  const t = useTranslations("services.shuttle");
  const tFaq = useTranslations("components.shuttleService.faq");
  const title = content?.title ?? "Shuttle Service";
  const subtitle = content?.subtitle ?? "Perjalanan nyaman antar kota dengan armada modern dan sopir berpengalaman.";
  const description = content?.description ?? "Harga terjangkau, tepat waktu, dan aman.";
  const heroBadge = content?.badge;
  const ctaPrimary = content?.ctaPrimary ?? t("hero.ctaPrimary");
  const faqItems =
    content?.faqs?.length
      ? content.faqs
      : [
          { question: tFaq("1.q"), answer: tFaq("1.a") },
          { question: tFaq("2.q"), answer: tFaq("2.a") },
          { question: tFaq("3.q"), answer: tFaq("3.a") },
          { question: tFaq("4.q"), answer: tFaq("4.a") },
        ];
  const displayRoutes = routes ?? [];

  return (
    <div className="min-h-screen" style={{ background: "#f5f6fb" }}>

      {/* ── Hero Banner ── */}
      <section
        className="relative overflow-hidden pt-0 pb-36"
        style={{ background: "linear-gradient(135deg, #1434A4 0%, #3d52c6 100%)" }}
      >
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full opacity-10"
          style={{ background: "#fff" }} />
        <div className="absolute bottom-0 left-1/4 w-56 h-56 rounded-full opacity-5"
          style={{ background: "#fff" }} />
        {[
          { top: "18%", left: "5%",  size: 8  },
          { top: "60%", left: "90%", size: 5  },
          { top: "35%", left: "78%", size: 10 },
          { top: "75%", left: "15%", size: 6  },
        ].map((d, i) => (
          <div key={i} className="absolute rounded-full opacity-20"
            style={{ top: d.top, left: d.left, width: d.size, height: d.size, background: "#fff" }} />
        ))}

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 pt-28 text-center">
          <div className="mb-4 flex items-center justify-center gap-2 text-xs text-white/60">
            <span>{t("hero.breadcrumbHome")}</span>
            <span>/</span>
            <span className="text-white/90 font-medium">{t("hero.breadcrumbService")}</span>
          </div>
          {heroBadge && (
            <div className="mx-auto mb-4 inline-flex rounded-full border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
              {heroBadge}
            </div>
          )}

          <div
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect x="4" y="8" width="28" height="16" rx="3" fill="white" fillOpacity="0.9" />
              <rect x="6" y="10" width="10" height="7" rx="1.5" fill="#1434A4" fillOpacity="0.6" />
              <rect x="20" y="10" width="10" height="7" rx="1.5" fill="#1434A4" fillOpacity="0.6" />
              <path d="M4 18v4a2 2 0 002 2h1v2h4v-2h14v2h4v-2h1a2 2 0 002-2v-4H4z"
                fill="white" fillOpacity="0.9" />
              <circle cx="10" cy="26" r="3" fill="#1434A4" />
              <circle cx="26" cy="26" r="3" fill="#1434A4" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            {title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-white/75 max-w-xl mx-auto">
            {subtitle}
          </p>
          <p className="mt-3 text-base sm:text-lg text-white/75 max-w-xl mx-auto">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {[
              { value: "50+", label: t("hero.stat1Label") },
              { value: "1.000+", label: t("hero.stat2Label") },
              { value: "4.9★", label: t("hero.stat3Label") },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-xl font-extrabold text-white">{value}</span>
                <span className="text-[11px] text-white/60 uppercase tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking Form ── */}
      <section id="booking-form" className="mx-auto max-w-4xl px-4 sm:px-6 -mt-20 relative z-10">
        <ShuttleBookingForm />
      </section>

      {/* ── Keuntungan ── */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {KEUNTUNGAN_KEYS.map((key) => ({
            icon: ["🕐", "🛡️", "💺", "📍"][parseInt(key) - 1],
            title: t(`keuntungan.${key}.title`),
            desc: t(`keuntungan.${key}.desc`),
          })).map(({ icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-2 rounded-xl p-5 text-center"
              style={{
                background: "#fff",
                border: "1.5px solid rgba(20,52,164,0.10)",
                boxShadow: "0 2px 12px rgba(20,52,164,0.05)",
              }}
            >
              <span className="text-2xl">{icon}</span>
              <p className="text-sm font-bold" style={{ color: "#1434A4" }}>{title}</p>
              <p className="text-[11px] leading-snug" style={{ color: "#4050b5" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Rute Populer ── */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 mt-12 pb-4">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
              {t("popularRoutes.sectionLabel")}
            </span>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
              {t("popularRoutes.sectionTitle")}
            </h2>
          </div>
          <a href="#booking-form" className="text-xs font-semibold underline underline-offset-4" style={{ color: "#3d52c6" }}>
            {ctaPrimary}
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayRoutes.map((route) => (
            <a
              key={`${route.from}-${route.to}`}
              href="#booking-form"
              className="group relative flex items-center gap-4 rounded-xl px-5 py-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: "#fff",
                border: "1.5px solid rgba(20,52,164,0.12)",
                boxShadow: "0 2px 8px rgba(20,52,164,0.05)",
              }}
            >
              {route.tag && (
                <span
                  className="absolute -top-2 right-3 rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                  style={{ background: "#1434A4" }}
                >
                  {route.tag}
                </span>
              )}
              <span className="text-lg" style={{ color: "#1434A4" }}>🚌</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 font-bold text-sm" style={{ color: "#1434A4" }}>
                  <span className="truncate">{route.from}</span>
                  <span className="shrink-0" style={{ color: "#3d52c6" }}><IconArrow /></span>
                  <span className="truncate">{route.to}</span>
                </div>
                <span className="text-[11px]" style={{ color: "#4050b5" }}>⏱ {route.duration}</span>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs" style={{ color: "#4050b5" }}>{t("popularRoutes.priceLabel")}</p>
                <p className="text-sm font-extrabold" style={{ color: "#1434A4" }}>{route.price}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Cara Booking ── */}
      <section className="mt-14 py-14" style={{ background: "#eef0fb" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
              {t("caraBooking.sectionLabel")}
            </span>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
              {t("caraBooking.sectionTitle")}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-4">
            {(["1", "2", "3", "4"] as const).map((step) => (
              <div key={step} className="flex flex-col items-center text-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-extrabold text-white"
                  style={{ background: "#1434A4", boxShadow: "0 4px 14px rgba(20,52,164,0.30)" }}
                >
                  {step.padStart(2, "0")}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: "#1434A4" }}>{t(`caraBooking.${step}.title`)}</p>
                  <p className="mt-1 text-xs leading-snug" style={{ color: "#4050b5" }}>{t(`caraBooking.${step}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Keunggulan Layanan ── */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-14">
        <div className="mb-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
            {t("keunggulan.sectionLabel")}
          </span>
          <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
            {t("keunggulan.sectionTitle")}
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {(["1", "2", "3", "4", "5", "6"] as const).map((key) => (
            <div key={key} className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0"><IconCheck /></span>
              <p className="text-sm leading-snug" style={{ color: "#3d3d5c" }}>{t(`keunggulan.${key}`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-14" style={{ background: "#eef0fb" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
              {t("faq.sectionLabel")}
            </span>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
              {t("faq.sectionTitle")}
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqItems.map((faq) => (
              <FaqItem key={faq.question} q={faq.question} a={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Bottom ── */}
      <section
        className="py-16 text-center"
        style={{ background: "linear-gradient(135deg, #1434A4, #3d52c6)" }}
      >
        <div className="mx-auto max-w-xl px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t("cta.title")}
          </h2>
          <p className="mt-2 text-white/70 text-sm">
            {t("cta.desc")}
          </p>
          <a
            href="#booking-form"
            className="mt-6 inline-block rounded-full px-10 py-3.5 text-sm font-bold uppercase tracking-widest shadow-xl transition hover:scale-105"
            style={{ background: "#fff", color: "#1434A4" }}
          >
            {t("cta.button")}
          </a>
        </div>
      </section>

    </div>
  );
}


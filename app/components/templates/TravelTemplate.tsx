"use client";

import TravelBookingForm from "@/app/components/organism/TravelBookingForm";
import TourPackageCard from "@/app/components/moleculs/TourPackageCard";
import FaqItem from "@/app/components/moleculs/FaqItem";
import { ContentInput } from "@/app/actions/content";
import { toTourPackageCardProps } from "@/app/lib/content-utils";
import {
  IconHotel,
  IconBus,
  IconFood,
  IconCamera,
  IconGuide,
  IconMountain,
  IconBeach,
  IconMap,
} from "@/app/components/atoms/TravelIcons";
import { useTranslations } from "next-intl";

const KEUNGGULAN_ICONS = [
  <IconGuide key="guide" size={22} />,
  <IconHotel key="hotel" size={22} />,
  <IconBus key="bus" size={22} />,
  <IconFood key="food" size={22} />,
  <IconCamera key="camera" size={22} />,
  <IconMountain key="mountain" size={22} />,
];

interface TravelTemplateProps {
  content?: ContentInput;
}

export default function TravelTemplate({ content }: TravelTemplateProps) {
  const t = useTranslations("services.travel");
  const title = content?.title ?? t("hero.title");
  const subtitle = content?.subtitle ?? t("hero.subtitle");
  const description = content?.description ?? t("hero.description");
  const heroBadge = content?.badge;
  const ctaPrimary = content?.ctaPrimary ?? t("hero.ctaPrimary");
  const packageItems =
    content?.packages?.length
      ? content.packages.map((pkg, index) => toTourPackageCardProps(pkg, index))
      : [];
  const faqItems =
    content?.faqs?.length
      ? content.faqs
      : Array.from({ length: 5 }, (_, i) => ({
          question: t(`faq.${i + 1}.q`),
          answer: t(`faq.${i + 1}.a`),
        }));

  return (
    <div className="min-h-screen" style={{ background: "#f5f6fb" }}>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-0 pb-44"
        style={{
          background: "linear-gradient(150deg, #0d2280 0%, #1434A4 45%, #2e6ea6 80%, #1a4a6e 100%)",
        }}
      >
        {/* Wave bottom */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path d="M0 50c360-50 720 50 1080 0S1260-10 1440 30v50H0V50z" fill="rgba(255,255,255,0.06)" />
          <path d="M0 65c360-35 720 35 1080 0S1260 5 1440 45v35H0V65z" fill="rgba(255,255,255,0.04)" />
        </svg>

        {/* Decorative dots */}
        {[
          { top: "18%", left: "6%",  w: 8  },
          { top: "70%", left: "88%", w: 12 },
          { top: "40%", left: "78%", w: 6  },
          { top: "80%", left: "15%", w: 10 },
        ].map((d, i) => (
          <div key={i} className="absolute rounded-full opacity-20"
            style={{ top: d.top, left: d.left, width: d.w, height: d.w, background: "#fff" }} />
        ))}

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 pt-28 text-center">
          <div className="mb-4 flex items-center justify-center gap-2 text-xs text-white/60">
            <span>{t("hero.breadcrumbHome")}</span><span>/</span>
            <span className="font-medium text-white/90">{t("hero.breadcrumbService")}</span>
          </div>

          <div
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
          >
            <span className="text-4xl">🗺️</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            {title}
            <span className="block text-xl sm:text-2xl font-semibold text-white/70 mt-1">
              {subtitle}
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/75 max-w-2xl mx-auto">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
            {heroBadge && (
              <div className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                {heroBadge}
              </div>
            )}
            {[
              { value: "20+", label: t("hero.stat1Label")     },
              { value: "12+", label: t("hero.stat2Label")   },
              { value: "4.8★", label: t("hero.stat3Label")  },
              { value: "2000+", label: t("hero.stat4Label")    },
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
      <section id="booking-form" className="mx-auto max-w-4xl px-4 sm:px-6 -mt-24 relative z-10">
        <TravelBookingForm />
      </section>

      {/* ── Keunggulan ── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 mt-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {KEUNGGULAN_ICONS.map((icon, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 rounded-xl p-4 text-center"
              style={{
                background: "#fff",
                border: "1.5px solid rgba(20,52,164,0.10)",
                boxShadow: "0 2px 10px rgba(20,52,164,0.05)",
              }}
            >
              <span style={{ color: "#1434A4" }}>{icon}</span>
              <p className="text-[11px] font-bold leading-snug" style={{ color: "#1434A4" }}>{t(`keunggulan.${i + 1}.title`)}</p>
              <p className="text-[10px] leading-snug hidden sm:block" style={{ color: "#4050b5" }}>{t(`keunggulan.${i + 1}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Paket Wisata ── */}
      <section className="mt-14 py-14" style={{ background: "#eef0fb" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
                {t("packages.sectionLabel")}
              </span>
              <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
                {t("packages.sectionTitle")}
              </h2>
            </div>
            <a href="#booking-form" className="text-xs font-semibold underline underline-offset-4" style={{ color: "#3d52c6" }}>
              {ctaPrimary}
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packageItems.map((pkg) => (
              <TourPackageCard key={pkg.name} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Destinasi Unggulan ── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-14">
        <div className="mb-6 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
            {t("destinations.sectionLabel")}
          </span>
          <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
            {t("destinations.sectionTitle")}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { emoji: "🏝️", idx: 1 },
            { emoji: "🏔️", idx: 2 },
            { emoji: "🌅", idx: 3 },
            { emoji: "🏺", idx: 4 },
            { emoji: "💧", idx: 5 },
            { emoji: "🚤", idx: 6 },
            { emoji: "🌊", idx: 7 },
            { emoji: "🐠", idx: 8 },
          ].map(({ emoji, idx }) => (
            <a
              key={idx}
              href="#booking-form"
              className="group flex flex-col rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: "#fff",
                border: "1.5px solid rgba(20,52,164,0.12)",
                boxShadow: "0 2px 8px rgba(20,52,164,0.05)",
              }}
            >
              <div
                className="flex h-28 items-center justify-center text-5xl"
                style={{ background: "linear-gradient(135deg, #eef0fb, #dde1f8)" }}
              >
                {emoji}
              </div>
              <div className="p-4">
                <span
                  className="mb-1 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                  style={{ background: "rgba(20,52,164,0.08)", color: "#1434A4" }}
                >
                  {t(`destinations.${idx}.tag`)}
                </span>
                <p className="font-extrabold text-sm" style={{ color: "#1434A4" }}>{t(`destinations.${idx}.name`)}</p>
                <p className="mt-1 text-[10px] leading-snug" style={{ color: "#4050b5" }}>{t(`destinations.${idx}.desc`)}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Testimoni ── */}
      <section className="py-14" style={{ background: "#eef0fb" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
              {t("testimoni.sectionLabel")}
            </span>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
              {t("testimoni.sectionTitle")}
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {[1, 2, 3].map((i) => {
              const name = t(`testimoni.${i}.name`);
              return (
                <div
                  key={i}
                  className="rounded-2xl p-5"
                  style={{
                    background: "#fff",
                    border: "1.5px solid rgba(20,52,164,0.10)",
                    boxShadow: "0 2px 10px rgba(20,52,164,0.06)",
                  }}
                >
                  <div className="flex text-yellow-400 mb-3 gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} className="text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#374151" }}>&ldquo;{t(`testimoni.${i}.text`)}&rdquo;</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold text-white"
                      style={{ background: "#1434A4" }}
                    >
                      {name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold" style={{ color: "#1434A4" }}>{name}</p>
                      <p className="text-[10px]" style={{ color: "#4050b5" }}>{t(`testimoni.${i}.origin`)} · {t(`testimoni.${i}.pkg`)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Cara Pesan ── */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-14">
        <div className="mb-8 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
            {t("caraBooking.sectionLabel")}
          </span>
          <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
            {t("caraBooking.sectionTitle")}
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-4">
          {[
            { step: "01", icon: <IconMap size={22} /> },
            { step: "02", icon: <IconBeach size={22} /> },
            { step: "03", icon: <IconHotel size={22} /> },
            { step: "04", icon: <IconMountain size={22} /> },
          ].map(({ step, icon }) => {
            const stepNum = parseInt(step);
            return (
              <div key={step} className="flex flex-col items-center text-center gap-3">
                <div
                  className="relative flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: "#1434A4", boxShadow: "0 4px 16px rgba(20,52,164,0.30)" }}
                >
                  <span className="text-white">{icon}</span>
                  <span
                    className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-extrabold text-white"
                    style={{ background: "#3d52c6" }}
                  >
                    {step}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: "#1434A4" }}>{t(`caraBooking.${stepNum}.title`)}</p>
                  <p className="mt-1 text-xs leading-snug" style={{ color: "#4050b5" }}>{t(`caraBooking.${stepNum}.desc`)}</p>
                </div>
              </div>
            );
          })}
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

      {/* ── CTA ── */}
      <section
        className="py-16 text-center"
        style={{
          background: "linear-gradient(150deg, #0d2280 0%, #1434A4 50%, #2e6ea6 100%)",
        }}
      >
        <div className="mx-auto max-w-xl px-4">
          <span className="text-4xl">🗺️</span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">
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


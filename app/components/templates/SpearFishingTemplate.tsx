"use client";

import { useState } from "react";
import SpearFishingBookingForm from "@/app/components/organism/SpearFishingBookingForm";
import PackageCard from "@/app/components/moleculs/PackageCard";
import FaqItem from "@/app/components/moleculs/FaqItem";
import { ContentInput } from "@/app/actions/content";
import { toPackageCardProps } from "@/app/lib/content-utils";
import {
  IconFish,
  IconWaves,
  IconMask,
  IconAnchor,
  IconCamera,
  IconCertificate,
  IconCompass,
} from "@/app/components/atoms/SpearFishingIcons";
import { useTranslations } from "next-intl";

interface SpotData {
  name: string;
  region: string;
  depth: string;
  price: string;
  fish?: string;
  level?: string;
  tag?: string;
  isBestSeller?: boolean;
}

interface SpearFishingTemplateProps {
  content?: ContentInput;
  spots?: SpotData[];
}

export default function SpearFishingTemplate({ content, spots = [] }: SpearFishingTemplateProps) {
  const t = useTranslations("services.spearFishing");
  const [selectedSpot, setSelectedSpot] = useState<SpotData | null>(null);

  const title = content?.title ?? t("hero.title");
  const subtitle = content?.subtitle ?? t("hero.subtitle");
  const description = content?.description ?? t("hero.description");
  const heroBadge = content?.badge;

  const packageItems = content?.packages?.length
    ? content.packages.map((pkg, index) => toPackageCardProps(pkg, index))
    : [];

  const spotItems = spots.map((spot) => ({
    name: spot.name,
    region: spot.region,
    depth: spot.depth,
    price: spot.price,
    fish: spot.fish || "",
    level: spot.level || "",
    img: spot.name.substring(0, 2).toUpperCase(),
    tag: spot.tag || "",
    isBestSeller: spot.isBestSeller || false,
  }));

  // Filter spots to show only best sellers if any exist
  const bestSellerSpots = spotItems.filter((spot) => spot.isBestSeller);
  const spotsToDisplay = bestSellerSpots.length > 0 ? bestSellerSpots : spotItems;

  const keunggulan = [
    { icon: <IconFish size={24} />, title: t("keunggulan.1.title"), desc: t("keunggulan.1.desc") },
    { icon: <IconCertificate size={24} />, title: t("keunggulan.2.title"), desc: t("keunggulan.2.desc") },
    { icon: <IconCamera size={24} />, title: t("keunggulan.3.title"), desc: t("keunggulan.3.desc") },
    { icon: <IconAnchor size={24} />, title: t("keunggulan.4.title"), desc: t("keunggulan.4.desc") },
  ];

  const caraIkut = [
    { step: "01", title: t("caraIkut.1.title"), icon: <IconMask size={22} />, desc: t("caraIkut.1.desc") },
    { step: "02", title: t("caraIkut.2.title"), icon: <IconCompass size={22} />, desc: t("caraIkut.2.desc") },
    { step: "03", title: t("caraIkut.3.title"), icon: <IconAnchor size={22} />, desc: t("caraIkut.3.desc") },
    { step: "04", title: t("caraIkut.4.title"), icon: <IconWaves size={22} />, desc: t("caraIkut.4.desc") },
  ];

  const faqItems = content?.faqs?.length
    ? content.faqs
    : [];

  function handleSpotClick(spot: SpotData) {
    setSelectedSpot(spot);
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen" style={{ background: "#f5f6fb" }}>

      {/* ── Hero Banner ── */}
      <section
        className="relative overflow-hidden pt-0 pb-44"
        style={{
          background: "linear-gradient(160deg, #0d2280 0%, #1434A4 40%, #1a6690 75%, #0f4060 100%)",
        }}
      >
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 80"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 40c240-40 480 40 720 0s480-40 720 0v40H0V40z"
            fill="rgba(255,255,255,0.06)"
          />
          <path
            d="M0 55c240-30 480 30 720 0s480-30 720 0v25H0V55z"
            fill="rgba(255,255,255,0.04)"
          />
        </svg>

        {[
          { top: "20%", left: "8%",  size: 10 },
          { top: "65%", left: "85%", size: 6  },
          { top: "35%", left: "75%", size: 14 },
          { top: "78%", left: "22%", size: 8  },
          { top: "48%", left: "45%", size: 5  },
        ].map((d, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-15"
            style={{ top: d.top, left: d.left, width: d.size, height: d.size, background: "#fff" }}
          />
        ))}

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 pt-28 text-center">
          <div className="mb-4 flex items-center justify-center gap-2 text-xs text-white/60">
            <span>{t("hero.breadcrumbHome")}</span>
            <span>/</span>
            <span className="font-medium text-white/90">{t("hero.breadcrumbService")}</span>
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
            <span className="text-4xl">🎣</span>
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

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {[
              { value: "8+", label: t("hero.stat1Label") },
              { value: "500+", label: t("hero.stat2Label") },
              { value: "100%", label: t("hero.stat3Label") },
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
        <SpearFishingBookingForm key={selectedSpot?.name ?? "default"} initialSpot={selectedSpot} spots={spots} />
      </section>

      {/* ── Keunggulan ── */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {keunggulan.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-3 rounded-xl p-5 text-center"
              style={{
                background: "#fff",
                border: "1.5px solid rgba(20,52,164,0.10)",
                boxShadow: "0 2px 12px rgba(20,52,164,0.05)",
              }}
            >
              <span style={{ color: "#1434A4" }}>{icon}</span>
              <p className="text-sm font-bold" style={{ color: "#1434A4" }}>{title}</p>
              <p className="text-[11px] leading-snug" style={{ color: "#4050b5" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Paket ── */}
      {packageItems.length > 0 && (
        <section className="mt-14 py-14" style={{ background: "#eef0fb" }}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="mb-8 text-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
                {t("packages.sectionLabel")}
              </span>
              <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
                {t("packages.sectionTitle")}
              </h2>
              <p className="mt-2 text-sm max-w-lg mx-auto" style={{ color: "#4050b5" }}>
                {t("packages.sectionDesc")}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3 items-start">
              {packageItems.map((pkg) => (
                <PackageCard
                  key={pkg.name}
                  name={pkg.name}
                  level={pkg.level}
                  price={pkg.price}
                  priceNote={pkg.priceNote}
                  features={pkg.features}
                  badge={pkg.badge}
                  highlight={pkg.highlight}
                  icon={pkg.icon}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Spot Terbaik ── */}
      {spotsToDisplay.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 sm:px-6 py-14">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
                {t("spots.sectionLabel")}
              </span>
              <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
                {t("spots.sectionTitle")}
              </h2>
            </div>
            <a href="#booking-form" className="text-xs font-semibold underline underline-offset-4"
              style={{ color: "#3d52c6" }}>
              {t("spots.bookNow")}
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {spotsToDisplay.map((spot) => (
              <button
                key={spot.name}
                type="button"
                onClick={() => handleSpotClick(spot)}
                className="relative rounded-2xl p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                style={{
                  background: "#fff",
                  border: selectedSpot?.name === spot.name ? "2px solid #1434A4" : "1.5px solid rgba(20,52,164,0.12)",
                  boxShadow: selectedSpot?.name === spot.name
                    ? "0 4px 20px rgba(20,52,164,0.15)"
                    : "0 2px 8px rgba(20,52,164,0.05)",
                }}
              >
                {spot.tag && (
                  <span
                    className="absolute -top-2.5 right-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white"
                    style={{ background: "#1434A4" }}
                  >
                    {spot.tag}
                  </span>
                )}
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
                    style={{ background: "rgba(20,52,164,0.07)" }}
                  >
                    {spot.img}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-extrabold text-sm" style={{ color: "#1434A4" }}>{spot.name}</p>
                      {spot.isBestSeller && <span className="text-lg">⭐</span>}
                    </div>
                    <p className="text-[11px]" style={{ color: "#4050b5" }}>{spot.region}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                        style={{ background: "rgba(20,52,164,0.07)", color: "#1434A4" }}
                      >
                        🌊 {spot.depth}
                      </span>
                      {spot.fish && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                          style={{ background: "rgba(20,52,164,0.07)", color: "#1434A4" }}
                        >
                          🐠 {spot.fish}
                        </span>
                      )}
                    </div>
                    {spot.level && (
                      <span
                        className="mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold"
                        style={{ background: "rgba(20,52,164,0.05)", color: "#4050b5" }}
                      >
                        {spot.level}
                      </span>
                    )}
                    <p className="mt-2 text-xs font-bold" style={{ color: "#1434A4" }}>
                      {spot.price}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── Cara Ikut ── */}
      <section className="py-14" style={{ background: "#eef0fb" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
              {t("caraIkut.sectionLabel")}
            </span>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
              {t("caraIkut.sectionTitle")}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-4">
            {caraIkut.map(({ step, title, icon, desc }) => (
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
                  <p className="font-bold text-sm" style={{ color: "#1434A4" }}>{title}</p>
                  <p className="mt-1 text-xs leading-snug" style={{ color: "#4050b5" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Peralatan ── */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-14">
        <div className="mb-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
            {t("peralatan.sectionLabel")}
          </span>
          <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
            {t("peralatan.sectionTitle")}
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "🤿", item: t("peralatan.1.item"), note: t("peralatan.1.note") },
            { icon: "🦶", item: t("peralatan.2.item"), note: t("peralatan.2.note") },
            { icon: "🦺", item: t("peralatan.3.item"), note: t("peralatan.3.note") },
            { icon: "🔱", item: t("peralatan.4.item"), note: t("peralatan.4.note") },
            { icon: "🎥", item: t("peralatan.5.item"), note: t("peralatan.5.note") },
            { icon: "🩺", item: t("peralatan.6.item"), note: t("peralatan.6.note") },
            { icon: "🛥️", item: t("peralatan.7.item"), note: t("peralatan.7.note") },
            { icon: "🏅", item: t("peralatan.8.item"), note: t("peralatan.8.note") },
          ].map(({ icon, item, note }) => (
            <div
              key={item}
              className="flex items-center gap-4 rounded-xl px-5 py-3.5"
              style={{ background: "#fff", border: "1.5px solid rgba(20,52,164,0.10)" }}
            >
              <span className="text-xl">{icon}</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#1434A4" }}>{item}</p>
                <p className="text-[10px]" style={{ color: "#4050b5" }}>{note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      {faqItems.length > 0 && (
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
      )}

      {/* ── CTA Bottom ── */}
      <section
        className="py-16 text-center"
        style={{
          background: "linear-gradient(160deg, #0d2280 0%, #1434A4 50%, #1a6690 100%)",
        }}
      >
        <div className="mx-auto max-w-xl px-4">
          <span className="text-4xl">🌊</span>
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

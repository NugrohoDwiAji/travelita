"use client";

import { useTranslations } from "next-intl";

const REVIEW_IDS = [1, 2, 3, 4, 5, 6] as const;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill={i < rating ? "#1434A4" : "none"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505L7 1z"
            stroke="#1434A4"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const t = useTranslations("landing.reviews");
  const tReviews = useTranslations("components.reviews");

  return (
    <section
      className="py-20 lg:py-28 overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-12 text-center">
          <span
            className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.25em]"
            style={{ color: "#1434A4" }}
          >
            {t("sectionLabel")}
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold"
            style={{ color: "#1434A4" }}
          >
            {t("sectionTitle1")}&nbsp;
            <span
              style={{
                background: "linear-gradient(90deg, #1434A4, #3d52c6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {t("sectionTitle2")}
            </span>
          </h2>
          <p
            className="mt-3 text-sm sm:text-base max-w-xl mx-auto"
            style={{ color: "#4050b5" }}
          >
            {t("sectionDesc")}
          </p>
        </div>

        {/* Summary bar */}
        <div
          className="flex flex-wrap items-center justify-center gap-8 mb-12 rounded-2xl py-5 px-8"
          style={{
            background: "rgba(20,52,164,0.04)",
            border: "1.5px solid rgba(20,52,164,0.10)",
          }}
        >
          {[
            { value: "4.9", label: t("stat1Label") },
            { value: "1.000+", label: t("stat2Label") },
            { value: "98%", label: t("stat3Label") },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span
                className="text-2xl sm:text-3xl font-extrabold"
                style={{ color: "#1434A4" }}
              >
                {value}
              </span>
              <span
                className="text-xs uppercase tracking-wider"
                style={{ color: "#4050b5" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Review cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEW_IDS.map((id) => {
            const name = tReviews(`${id}.name`);
            const location = tReviews(`${id}.location`);
            const comment = tReviews(`${id}.comment`);
            const initials = name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <div
                key={id}
                className="flex flex-col gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background: "#ffffff",
                  border: "1.5px solid rgba(20,52,164,0.12)",
                  boxShadow: "0 2px 16px rgba(20,52,164,0.06)",
                }}
              >
                {/* Top row: avatar + name + rating */}
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: "#1434A4" }}
                  >
                    {initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className="font-semibold text-sm leading-tight"
                      style={{ color: "#1434A4" }}
                    >
                      {name}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: "#4050b5" }}
                    >
                      {location}
                    </p>
                    <div className="mt-1.5">
                      <StarRating rating={5} />
                    </div>
                  </div>
                </div>

                {/* Comment */}
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: "#3d3d5c" }}
                >
                  &ldquo;{comment}&rdquo;
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p
            className="mb-4 text-sm"
            style={{ color: "#4050b5" }}
          >
            {t("ctaText")}
          </p>
          <a
            href="#service"
            className="inline-block rounded-full px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: "#1434A4" }}
          >
            {t("ctaButton")}
          </a>
        </div>
      </div>
    </section>
  );
}

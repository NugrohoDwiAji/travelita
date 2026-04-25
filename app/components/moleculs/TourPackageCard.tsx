import { IconStar } from "@/app/components/atoms/TravelIcons";

interface Inclusion {
  text: string;
  included: boolean;
}

export interface TourPackageCardProps {
  name: string;
  duration: string;
  price: string;
  priceNote?: string;
  image: string;
  badge?: string;
  highlight?: boolean;
  rating: number;
  reviewCount: number;
  inclusions: Inclusion[];
  destinations: string[];
  href?: string;
}

export default function TourPackageCard({
  name,
  duration,
  price,
  priceNote = "/ orang",
  image,
  badge,
  highlight = false,
  rating,
  reviewCount,
  inclusions,
  destinations,
  href = "#booking-form",
}: TourPackageCardProps) {
  return (
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={
        highlight
          ? {
              background: "linear-gradient(160deg, #0d2280 0%, #1434A4 60%, #3d52c6 100%)",
              boxShadow: "0 8px 32px rgba(20,52,164,0.35)",
            }
          : {
              background: "#fff",
              border: "1.5px solid rgba(20,52,164,0.13)",
              boxShadow: "0 2px 12px rgba(20,52,164,0.06)",
            }
      }
    >
      {/* Image area */}
      <div
        className="relative h-48 flex items-center justify-center text-6xl"
        style={{
          background: highlight
            ? "rgba(255,255,255,0.10)"
            : "linear-gradient(135deg, #eef0fb 0%, #dde1f8 100%)",
        }}
      >
        <span>{image}</span>
        {badge && (
          <span
            className="absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider shadow"
            style={{ background: "#1434A4", color: "#fff" }}
          >
            {badge}
          </span>
        )}
        <span
          className="absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-bold"
          style={{
            background: highlight ? "rgba(255,255,255,0.20)" : "rgba(20,52,164,0.10)",
            color: highlight ? "#fff" : "#1434A4",
          }}
        >
          {duration}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Name + rating */}
        <div className="mb-1">
          <h3
            className="font-extrabold text-base leading-tight"
            style={{ color: highlight ? "#fff" : "#1434A4" }}
          >
            {name}
          </h3>
          <div className="mt-1 flex items-center gap-1.5">
            <IconStar
              size={12}
              className="shrink-0"
              style={{ color: highlight ? "#fde68a" : "#f59e0b" } as React.CSSProperties}
            />
            <span
              className="text-[11px] font-semibold"
              style={{ color: highlight ? "#fde68a" : "#f59e0b" }}
            >
              {rating.toFixed(1)}
            </span>
            <span
              className="text-[10px]"
              style={{ color: highlight ? "rgba(255,255,255,0.55)" : "#9ca3af" }}
            >
              ({reviewCount} ulasan)
            </span>
          </div>
        </div>

        {/* Destination pills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {destinations.map((d) => (
            <span
              key={d}
              className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
              style={{
                background: highlight ? "rgba(255,255,255,0.15)" : "rgba(20,52,164,0.07)",
                color: highlight ? "rgba(255,255,255,0.85)" : "#1434A4",
              }}
            >
              📍 {d}
            </span>
          ))}
        </div>

        {/* Inclusions */}
        <ul className="mt-4 flex flex-col gap-1.5 flex-1">
          {inclusions.map((inc) => (
            <li key={inc.text} className="flex items-center gap-2">
              <span style={{ color: inc.included ? (highlight ? "#86efac" : "#22c55e") : (highlight ? "rgba(255,255,255,0.35)" : "#d1d5db") }}>
                {inc.included ? "✓" : "✗"}
              </span>
              <span
                className="text-xs"
                style={{
                  color: inc.included
                    ? highlight ? "rgba(255,255,255,0.90)" : "#374151"
                    : highlight ? "rgba(255,255,255,0.40)" : "#9ca3af",
                  textDecoration: inc.included ? "none" : "line-through",
                }}
              >
                {inc.text}
              </span>
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <span
              className="text-xl font-extrabold"
              style={{ color: highlight ? "#fff" : "#1434A4" }}
            >
              {price}
            </span>
            <span
              className="ml-1 text-[11px]"
              style={{ color: highlight ? "rgba(255,255,255,0.60)" : "#4050b5" }}
            >
              {priceNote}
            </span>
          </div>
          <a
            href={href}
            className="shrink-0 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:brightness-110"
            style={
              highlight
                ? { background: "#fff", color: "#1434A4" }
                : { background: "linear-gradient(90deg, #1434A4, #3d52c6)", color: "#fff" }
            }
          >
            Pilih Paket
          </a>
        </div>
      </div>
    </div>
  );
}

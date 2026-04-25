interface Feature {
  text: string;
}

interface PackageCardProps {
  name: string;
  level: string;
  price: string;
  priceNote?: string;
  features: Feature[];
  badge?: string;
  highlight?: boolean;
  icon: string;
  href?: string;
}

export default function PackageCard({
  name,
  level,
  price,
  priceNote,
  features,
  badge,
  highlight = false,
  icon,
  href = "#booking-form",
}: PackageCardProps) {
  return (
    <div
      className="relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
      style={
        highlight
          ? {
              background: "linear-gradient(145deg, #1434A4, #3d52c6)",
              boxShadow: "0 8px 32px rgba(20,52,164,0.35)",
            }
          : {
              background: "#fff",
              border: "1.5px solid rgba(20,52,164,0.15)",
              boxShadow: "0 2px 12px rgba(20,52,164,0.06)",
            }
      }
    >
      {badge && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-bold whitespace-nowrap"
          style={
            highlight
              ? { background: "#fff", color: "#1434A4" }
              : { background: "#1434A4", color: "#fff" }
          }
        >
          {badge}
        </span>
      )}

      <div className="mb-4 flex items-center gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl text-2xl"
          style={
            highlight
              ? { background: "rgba(255,255,255,0.2)" }
              : { background: "rgba(20,52,164,0.07)" }
          }
        >
          {icon}
        </span>
        <div>
          <p
            className="font-extrabold text-base"
            style={{ color: highlight ? "#fff" : "#1434A4" }}
          >
            {name}
          </p>
          <p
            className="text-[11px] font-medium"
            style={{ color: highlight ? "rgba(255,255,255,0.70)" : "#4050b5" }}
          >
            {level}
          </p>
        </div>
      </div>

      <div className="mb-5">
        <span
          className="text-2xl font-extrabold"
          style={{ color: highlight ? "#fff" : "#1434A4" }}
        >
          {price}
        </span>
        {priceNote && (
          <span
            className="ml-1 text-xs"
            style={{ color: highlight ? "rgba(255,255,255,0.65)" : "#4050b5" }}
          >
            {priceNote}
          </span>
        )}
      </div>

      <ul className="mb-6 flex flex-col gap-2.5 flex-1">
        {features.map((f) => (
          <li key={f.text} className="flex items-start gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="mt-0.5 shrink-0"
            >
              <circle
                cx="8"
                cy="8"
                r="7"
                fill={highlight ? "rgba(255,255,255,0.20)" : "rgba(20,52,164,0.10)"}
              />
              <path
                d="M4.5 8.5l2.5 2 4.5-4"
                stroke={highlight ? "#fff" : "#1434A4"}
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="text-xs leading-snug"
              style={{ color: highlight ? "rgba(255,255,255,0.85)" : "#3d3d5c" }}
            >
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      <a
        href={href}
        className="block w-full rounded-xl py-3 text-center text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
        style={
          highlight
            ? { background: "#fff", color: "#1434A4" }
            : {
                background: "linear-gradient(90deg, #1434A4, #3d52c6)",
                color: "#fff",
              }
        }
      >
        Pilih Paket
      </a>
    </div>
  );
}

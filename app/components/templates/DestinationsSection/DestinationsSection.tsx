import Link from "next/link";

const DESTINATIONS = [
  {
    id: 1,
    name: "Raja Ampat",
    location: "Papua Barat",
    category: "Spear Fishing & Snorkeling",
    duration: "5 Hari / 4 Malam",
    price: "Rp 8.500.000",
    badge: "Terlaris",
    badgeColor: "#1434A4",
    gradient: "from-[#1434A4] to-[#3d52c6]",
  },
  {
    id: 2,
    name: "Labuan Bajo",
    location: "Nusa Tenggara Timur",
    category: "Travel & Wisata Alam",
    duration: "4 Hari / 3 Malam",
    price: "Rp 6.200.000",
    badge: "Promo",
    badgeColor: "#0d2280",
    gradient: "from-[#0d2280] to-[#1434A4]",
  },
  {
    id: 3,
    name: "Bali",
    location: "Bali",
    category: "Private Car & Travel",
    duration: "3 Hari / 2 Malam",
    price: "Rp 3.800.000",
    badge: "Popular",
    badgeColor: "#3d52c6",
    gradient: "from-[#3d52c6] to-[#5c6fd4]",
  },
  {
    id: 4,
    name: "Lombok",
    location: "Nusa Tenggara Barat",
    category: "Shuttle & Travel",
    duration: "3 Hari / 2 Malam",
    price: "Rp 4.100.000",
    badge: "Baru",
    badgeColor: "#1434A4",
    gradient: "from-[#1434A4] to-[#0d2280]",
  },
];

export default function DestinationsSection() {
  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: "var(--brand-navy-900)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span
              className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: "var(--brand-accent-500)" }}
            >
              Destinasi Populer
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold"
              style={{ color: "var(--brand-text-light)" }}
            >
              Jelajahi Destinasi&nbsp;
              <span style={{ color: "var(--brand-accent-400)" }}>Favorit</span>
            </h2>
          </div>
          <Link
            href="/travel"
            className="shrink-0 text-sm font-semibold underline underline-offset-4 transition-colors"
            style={{ color: "var(--brand-accent-500)" }}
          >
            Lihat semua destinasi →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
              style={{ border: "1px solid var(--brand-divider)" }}
            >
              {/* Visual card "image" using gradient */}
              <div
                className={`relative h-44 bg-linear-to-br ${dest.gradient} flex items-end p-5`}
              >
                {/* Location pin icon */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                  style={{ background: "rgba(0,0,0,0.4)", color: "var(--brand-text-light)" }}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1C4.3 1 3 2.3 3 4c0 2 3 7 3 7s3-5 3-7c0-1.7-1.3-3-3-3zm0 4a1 1 0 100-2 1 1 0 000 2z" fill="currentColor" />
                  </svg>
                  {dest.location}
                </div>

                {/* Badge */}
                <span
                  className="absolute top-4 left-4 rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white"
                  style={{ background: dest.badgeColor }}
                >
                  {dest.badge}
                </span>

                {/* Decorative circles */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <div className="w-32 h-32 rounded-full border-4 border-white/40" />
                  <div className="absolute w-20 h-20 rounded-full border-2 border-white/30" />
                </div>

                <div>
                  <p className="text-[11px] font-medium opacity-80 text-white">
                    {dest.category}
                  </p>
                  <h3 className="text-lg font-extrabold text-white">
                    {dest.name}
                  </h3>
                </div>
              </div>

              {/* Card body */}
              <div
                className="flex flex-1 flex-col gap-4 p-5"
                style={{ background: "var(--brand-navy-800)" }}
              >
                <div className="flex items-center justify-between text-xs" style={{ color: "var(--brand-text-muted)" }}>
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M4 1v2M8 1v2M1 5h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    {dest.duration}
                  </span>
                  <span className="flex items-center gap-0.5">
                    {"★★★★★".split("").map((s, i) => (
                      <span key={i} style={{ color: "var(--brand-gold-400)", fontSize: 11 }}>{s}</span>
                    ))}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px]" style={{ color: "var(--brand-text-muted)" }}>Mulai dari</p>
                    <p className="text-base font-extrabold" style={{ color: "var(--brand-accent-500)" }}>
                      {dest.price}
                      <span className="text-[11px] font-normal ml-1" style={{ color: "var(--brand-text-muted)" }}>/orang</span>
                    </p>
                  </div>
                  <Link
                    href={`/travel/${dest.name.toLowerCase().replace(/ /g, "-")}`}
                    className="rounded-full px-4 py-1.5 text-xs font-bold transition-all hover:opacity-90"
                    style={{
                      background: "var(--brand-accent-500)",
                      color: "white",
                    }}
                  >
                    Pesan
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

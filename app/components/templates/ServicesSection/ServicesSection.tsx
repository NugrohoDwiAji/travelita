import Link from "next/link";

const SERVICES = [
  {
    slug: "shuttle-service",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="4" y="14" width="40" height="20" rx="4" fill="currentColor" opacity="0.15" />
        <rect x="4" y="14" width="40" height="20" rx="4" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="13" cy="34" r="4" fill="currentColor" />
        <circle cx="35" cy="34" r="4" fill="currentColor" />
        <path d="M4 22h40" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 14v8M24 14v8M34 14v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="28" y="17" width="12" height="5" rx="1" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    title: "Shuttle Service",
    desc: "Layanan antar-jemput terjadwal ke bandara, terminal bus, dan destinasi wisata populer dengan armada nyaman.",
    href: "/shuttle-service",
  },
  {
    slug: "private-car",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path d="M8 28l4-10h24l4 10v6H8v-6z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        <circle cx="14" cy="34" r="4" fill="currentColor" />
        <circle cx="34" cy="34" r="4" fill="currentColor" />
        <path d="M8 28h32" stroke="currentColor" strokeWidth="1.5" />
        <rect x="14" y="21" width="8" height="5" rx="1" fill="currentColor" opacity="0.5" />
        <rect x="24" y="21" width="8" height="5" rx="1" fill="currentColor" opacity="0.5" />
        <path d="M5 34h3M40 34h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Private Car",
    desc: "Sewa kendaraan pribadi dengan pengemudi profesional untuk wisata keliling kota maupun perjalanan jauh.",
    href: "/private-car",
  },
  {
    slug: "ticketing",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <rect x="4" y="14" width="40" height="20" rx="3" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="2.2" />
        <path d="M30 14v20" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2" />
        <circle cx="30" cy="24" r="3" fill="currentColor" opacity="0.7" />
        <path d="M10 20h14M10 24h10M10 28h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Ticketing",
    desc: "Pembelian tiket pesawat, kapal feri, kereta api, dan bus dengan harga terbaik dalam satu platform.",
    href: "/ticketing",
  },
  {
    slug: "spear-fishing",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path d="M8 40 L38 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M38 10 L44 8 L42 14 L38 10Z" fill="currentColor" />
        <ellipse cx="18" cy="32" rx="5" ry="3" transform="rotate(-45 18 32)" fill="currentColor" opacity="0.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 38 Q14 30 22 36 Q30 42 38 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
      </svg>
    ),
    title: "Spear Fishing",
    desc: "Petualangan memancing bawah laut dengan instruktur bersertifikat di perairan eksotis yang jernih dan kaya fauna.",
    href: "/spear-fishing",
  },
  {
    slug: "travel",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        <path d="M24 6C24 6 10 16 10 26a14 14 0 0028 0C38 16 24 6 24 6Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="24" cy="26" r="4" fill="currentColor" />
        <path d="M24 6v6M10 26H4M38 26h6M15.5 11.5l-4-4M32.5 11.5l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 38 Q24 44 34 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    ),
    title: "Travel",
    desc: "Paket wisata domestik dan internasional dengan itinerary lengkap, akomodasi premium, dan pemandu wisata lokal.",
    href: "/travel",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 lg:py-28" style={{ background: "var(--brand-navy-950)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-14 text-center">
          <span
            className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.25em]"
            style={{ color: "var(--brand-accent-500)" }}
          >
            Layanan Kami
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold"
            style={{ color: "var(--brand-text-light)" }}
          >
            Semua Kebutuhan Perjalanan&nbsp;
            <span style={{ color: "var(--brand-accent-400)" }}>dalam Satu Tempat</span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed"
            style={{ color: "var(--brand-text-muted)" }}
          >
            Kami menyediakan berbagai layanan perjalanan yang dirancang untuk
            kenyamanan, keamanan, dan kepuasan Anda.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {SERVICES.map((svc) => (
            <Link
              key={svc.slug}
              href={svc.href}
              className="group relative flex flex-col gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background: "var(--brand-navy-800)",
                border: "1px solid var(--brand-divider)",
              }}
            >
              {/* Icon */}
              <div
                className="flex h-16 w-16 items-center justify-center rounded-xl transition-colors duration-300"
                style={{
                  background: "rgba(20,52,164,0.08)",
                  color: "var(--brand-accent-500)",
                }}
              >
                {svc.icon}
              </div>

              {/* Glow accent on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(20,52,164,0.07), rgba(61,82,198,0.05))",
                }}
              />

              <h3
                className="text-base font-bold"
                style={{ color: "var(--brand-text-light)" }}
              >
                {svc.title}
              </h3>
              <p
                className="flex-1 text-[13px] leading-relaxed"
                style={{ color: "var(--brand-text-muted)" }}
              >
                {svc.desc}
              </p>

              <span
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold transition-colors group-hover:gap-2.5"
                style={{ color: "var(--brand-accent-500)" }}
              >
                Selengkapnya
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

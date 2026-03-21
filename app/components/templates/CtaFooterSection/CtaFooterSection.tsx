import Link from "next/link";

const FOOTER_LINKS = {
  Layanan: [
    { label: "Shuttle Service", href: "/shuttle-service" },
    { label: "Private Car",     href: "/private-car" },
    { label: "Ticketing",       href: "/ticketing" },
    { label: "Spear Fishing",   href: "/spear-fishing" },
    { label: "Travel",          href: "/travel" },
  ],
  Perusahaan: [
    { label: "Tentang Kami",    href: "/about" },
    { label: "Karir",           href: "/career" },
    { label: "Blog",            href: "/blog" },
    { label: "Kontak",          href: "/contact" },
  ],
  Bantuan: [
    { label: "FAQ",             href: "/faq" },
    { label: "Kebijakan Privasi", href: "/privacy" },
    { label: "Syarat & Ketentuan", href: "/terms" },
    { label: "Lacak Booking",  href: "/track" },
  ],
};

export default function CtaFooterSection() {
  return (
    <>
      {/* ── CTA ── */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(135deg, #1434A4 0%, #3d52c6 100%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Decorative ring */}
          <div
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "2px solid rgba(255,255,255,0.7)",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path
                d="M6 18 L14 26 L30 10"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-snug text-white"
          >
            Siap Memulai&nbsp;
            <span style={{ color: "#b0bbeb" }}>Petualangan?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80">
            Hubungi tim kami sekarang dan dapatkan konsultasi perjalanan gratis
            serta penawaran spesial untuk pemesanan pertama Anda.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/booking"
              className="rounded-full px-10 py-4 text-sm font-bold uppercase tracking-widest shadow-xl transition-all duration-300 hover:scale-105 hover:brightness-110"
              style={{
                background: "#ffffff",
                color: "#1434A4",
              }}
            >
              Booking Sekarang
            </Link>
            <Link
              href="/contact"
              className="rounded-full border-2 border-white/70 px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 hover:bg-white/20"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "#ffffff",
          borderTop: "1.5px solid rgba(20,52,164,0.12)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand col */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-5">
                <span
                  className="text-xl font-extrabold uppercase tracking-wider"
                  style={{ color: "var(--brand-text-light)" }}
                >
                  Travelita
                </span>
              </Link>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "var(--brand-text-muted)" }}
              >
                Platform perjalanan terpercaya dengan layanan lengkap dari
                shuttle, private car, ticketing, hingga paket wisata eksotis.
              </p>
              {/* Social icons */}
              <div className="flex gap-3">
                {["instagram", "facebook", "twitter", "whatsapp"].map((s) => (
                  <a
                    key={s}
                    href={`https://${s}.com`}
                    aria-label={s}
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:opacity-80"
                    style={{
                      background: "#eef0fb",
                      color: "var(--brand-accent-500)",
                      border: "1.5px solid rgba(20,52,164,0.15)",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <circle cx="8" cy="8" r="6" fillOpacity="0.3" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Link cols */}
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <h4
                  className="mb-4 text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: "var(--brand-accent-500)" }}
                >
                  {heading}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm transition-colors hover:opacity-80"
                        style={{ color: "var(--brand-text-muted)" }}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider + copyright */}
          <div
            className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 text-xs"
            style={{
              borderTop: "1px solid var(--brand-divider)",
              color: "var(--brand-text-muted)",
            }}
          >
            <p>© {new Date().getFullYear()} Travelita. All rights reserved.</p>
            <p>Dibuat dengan ❤️ untuk para petualang Indonesia</p>
          </div>
        </div>
      </footer>
    </>
  );
}

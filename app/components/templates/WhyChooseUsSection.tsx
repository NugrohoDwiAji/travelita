const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
        <path d="M12 20l5 5 11-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Armada Terawat & Nyaman",
    desc: "Semua kendaraan kami diperiksa berkala, dilengkapi AC, dan siap melayani 24/7.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M4 14h32" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 22h6M12 26h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="30" cy="24" r="5" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M28 24l1.5 1.5L32 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Harga Transparan & Terjangkau",
    desc: "Tidak ada biaya tersembunyi. Semua harga sudah termasuk pajak dan layanan penuh.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M20 4 C10 4 4 12 4 20 C4 28 20 38 20 38 C20 38 36 28 36 20 C36 12 30 4 20 4Z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.15" />
        <circle cx="20" cy="20" r="4" fill="currentColor" />
      </svg>
    ),
    title: "Destinasi Pilihan Terbaik",
    desc: "Lebih dari 50 destinasi wisata dalam dan luar negeri dengan paket yang bisa dikustomisasi.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M20 6 C14 6 8 12 8 20 C8 28 14 36 20 38 C26 36 32 28 32 20 C32 12 26 6 20 6Z" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M8 20h24M20 6 Q26 20 20 38 Q14 20 20 6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Jangkauan Bali Nusra",
    desc: "Beroperasi di lebih dari 20 kota besar di Bali Nusra dengan jaringan mitra terpercaya.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M10 20 A10 10 0 0 1 30 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="20" r="4" fill="currentColor" />
        <path d="M20 4v6M36 20h-6M20 36v-6M4 20h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Support 24/7",
    desc: "Tim customer service siap membantu Anda kapan saja lewat WhatsApp, telepon, atau live chat.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section
      className="py-20 lg:py-28"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #eef0fb 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left – heading */}
          <div>
            <span
              className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: "var(--brand-accent-500)" }}
            >
              Kenapa Travelita?
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-snug"
              style={{ color: "var(--brand-text-light)" }}
            >
              Perjalanan Impian,&nbsp;
              <br />
              <span style={{ color: "var(--brand-accent-400)" }}>
                Layanan Tanpa Kompromi
              </span>
            </h2>
            <p
              className="mt-5 text-base leading-relaxed max-w-md"
              style={{ color: "var(--brand-text-muted)" }}
            >
              Kami telah melayani ribuan pelanggan dengan standar layanan
              tertinggi. Kepuasan dan keselamatan Anda adalah prioritas utama
              kami dalam setiap perjalanan.
            </p>

            {/* Progress bars */}
            <div className="mt-8 space-y-4">
              {[
                { label: "Kepuasan Pelanggan", val: 98 },
                { label: "Ketepatan Waktu",    val: 95 },
                { label: "Keamanan Perjalanan", val: 100 },
              ].map(({ label, val }) => (
                <div key={label}>
                  <div className="mb-1 flex justify-between text-xs font-medium"
                    style={{ color: "var(--brand-text-muted)" }}>
                    <span>{label}</span>
                    <span style={{ color: "var(--brand-accent-500)" }}>{val}%</span>
                  </div>
                  <div
                    className="h-2 w-full rounded-full overflow-hidden"
                    style={{ background: "rgba(0,0,0,0.08)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${val}%`,
                        background:
                          "linear-gradient(90deg, #1434A4, #3d52c6)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right – feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="flex flex-col gap-3 rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "var(--brand-navy-800)",
                  border: "1px solid var(--brand-divider)",
                }}
              >
                <div style={{ color: "var(--brand-accent-400)" }}>{f.icon}</div>
                <h3
                  className="text-sm font-bold"
                  style={{ color: "var(--brand-text-light)" }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: "var(--brand-text-muted)" }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

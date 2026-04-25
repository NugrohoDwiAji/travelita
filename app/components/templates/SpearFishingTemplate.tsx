import SpearFishingBookingForm from "@/app/components/organism/SpearFishingBookingForm";
import PackageCard from "@/app/components/moleculs/PackageCard";
import FaqItem from "@/app/components/moleculs/FaqItem";
import {
  IconFish,
  IconWaves,
  IconMask,
  IconAnchor,
  IconCamera,
  IconCertificate,
  IconCompass,
} from "@/app/components/atoms/SpearFishingIcons";

const PACKAGES = [
  {
    name: "Paket Pemula",
    level: "Untuk pemula / belum punya pengalaman",
    price: "Rp 850.000",
    priceNote: "/ orang",
    badge: undefined,
    highlight: false,
    icon: "🤿",
    features: [
      { text: "Briefing teknik spear fishing dasar (2 jam)" },
      { text: "Lokasi spot dangkal (3–5 m)" },
      { text: "1 instruktur untuk maks. 4 peserta" },
      { text: "Sewa peralatan lengkap (masker, fins, snorkel)" },
      { text: "Foto dokumentasi dasar" },
      { text: "Snack & minuman" },
    ],
  },
  {
    name: "Paket Menengah",
    level: "Sudah pernah snorkeling / freediving",
    price: "Rp 1.500.000",
    priceNote: "/ orang",
    badge: "Paling Populer ⭐",
    highlight: true,
    icon: "🐠",
    features: [
      { text: "Akses spot premium (8–15 m)" },
      { text: "1 instruktur untuk maks. 3 peserta" },
      { text: "Senapan panah + peralatan lengkap" },
      { text: "Sesi foto & video underwater" },
      { text: "Makan siang & minuman" },
      { text: "Sertifikat keikutsertaan" },
      { text: "Transfer PP dari titik kumpul" },
    ],
  },
  {
    name: "Paket Profesional",
    level: "Berpengalaman / freediver terlatih",
    price: "Rp 2.800.000",
    priceNote: "/ orang",
    badge: "Eksklusif",
    highlight: false,
    icon: "🏆",
    features: [
      { text: "Spot eksklusif off-the-grid (15–25 m)" },
      { text: "1:1 guide pribadi berpengalaman" },
      { text: "Akses peralatan kompetisi" },
      { text: "Rekaman video & editing profesional" },
      { text: "Paket makan siang premium" },
      { text: "Sertifikat & merchandise Travelita" },
      { text: "Charter perahu privat" },
    ],
  },
];

const SPOTS = [
  {
    name: "Raja Ampat",
    region: "Papua Barat",
    depth: "5–30 m",
    fish: "800+ Spesies",
    level: "Semua Level",
    img: "🌊",
    tag: "Terbaik Dunia",
  },
  {
    name: "Wakatobi",
    region: "Sulawesi Tenggara",
    depth: "3–25 m",
    fish: "590+ Spesies",
    level: "Semua Level",
    img: "🐟",
    tag: "Top Recommended",
  },
  {
    name: "Nusa Penida",
    region: "Bali",
    depth: "5–20 m",
    fish: "Mola-mola & Manta",
    level: "Semua Level",
    img: "🦈",
    tag: null,
  },
  {
    name: "Komodo",
    region: "NTT",
    depth: "10–25 m",
    fish: "Hiu, Pari, Karang",
    level: "Menengah–Ahli",
    img: "🐡",
    tag: "Tantangan Tinggi",
  },
  {
    name: "Bunaken",
    region: "Sulawesi Utara",
    depth: "5–40 m",
    fish: "Wall Reef Spektakuler",
    level: "Semua Level",
    img: "🌺",
    tag: null,
  },
  {
    name: "Kepulauan Banda",
    region: "Maluku",
    depth: "8–30 m",
    fish: "Tuna, Barracuda",
    level: "Menengah–Ahli",
    img: "🐠",
    tag: "Tersembunyi",
  },
];

const KEUNGGULAN = [
  { icon: <IconFish size={24} />,        title: "Spot Eksklusif",       desc: "Akses ke lokasi tersembunyi yang tidak dijual umum" },
  { icon: <IconCertificate size={24} />, title: "Guide Bersertifikat",  desc: "Instruktur AIDA & SSI berpengalaman min. 5 tahun"   },
  { icon: <IconCamera size={24} />,      title: "Dokumentasi Lengkap",  desc: "Foto & video underwater oleh fotografer profesional" },
  { icon: <IconAnchor size={24} />,      title: "Perahu Privat",        desc: "Charter perahu khusus, bebas dari rombongan lain"    },
];

const CARA_IKUT = [
  { step: "01", title: "Pilih Paket",       icon: <IconMask size={22} />,        desc: "Tentukan level dan paket yang sesuai pengalaman Anda"       },
  { step: "02", title: "Tentukan Lokasi",   icon: <IconCompass size={22} />,     desc: "Pilih spot dari 8+ destinasi premium kami di seluruh Indonesia" },
  { step: "03", title: "Konfirmasi & Bayar", icon: <IconAnchor size={22} />,     desc: "Booking online dan dapatkan konfirmasi segera dari tim kami"  },
  { step: "04", title: "Menyelam!",          icon: <IconWaves size={22} />,      desc: "Tim kami menjemput Anda dan siap menemani petualangan laut"   },
];

const FAQS = [
  {
    q: "Apakah saya harus bisa berenang untuk ikut spear fishing?",
    a: "Ya, kemampuan renang dasar diperlukan. Untuk paket pemula, kami menyediakan instruktur spesial dan rompi pelampung. Peserta tidak perlu pengalaman menyelam sebelumnya.",
  },
  {
    q: "Apakah peralatan spear fishing sudah termasuk dalam paket?",
    a: "Ya, semua paket sudah termasuk sewa peralatan dasar (masker, fins, snorkel). Senapan panah & wetsuit termasuk untuk paket Menengah ke atas. Anda juga bisa membawa peralatan sendiri.",
  },
  {
    q: "Berapa usia minimum untuk ikut trip spear fishing?",
    a: "Peserta minimum berusia 14 tahun. Peserta di bawah 18 tahun harus disertai pendamping dewasa dan mendapat izin orang tua tertulis.",
  },
  {
    q: "Apa yang terjadi jika cuaca buruk di hari trip?",
    a: "Keselamatan adalah prioritas kami. Jika kondisi laut tidak memungkinkan, trip akan dijadwalkan ulang tanpa biaya tambahan, atau dana 100% dikembalikan jika tidak dapat reschedule.",
  },
  {
    q: "Apakah ikan hasil tangkapan boleh dibawa pulang?",
    a: "Ikan hasil tangkapan akan dimasak untuk makan siang bersama (paket Menengah & Profesional). Untuk paket Pemula, tangkapan bersifat catch-and-release demi kelestarian ekosistem.",
  },
];

export default function SpearFishingTemplate() {
  return (
    <div className="min-h-screen" style={{ background: "#f5f6fb" }}>

      {/* ── Hero Banner ── */}
      <section
        className="relative overflow-hidden pt-28 pb-44"
        style={{
          background: "linear-gradient(160deg, #0d2280 0%, #1434A4 40%, #1a6690 75%, #0f4060 100%)",
        }}
      >
        {/* Ombak dekoratif bawah */}
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

        {/* Bubble ornaments */}
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

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-2 text-xs text-white/60">
            <span>Beranda</span>
            <span>/</span>
            <span className="font-medium text-white/90">Spear Fishing</span>
          </div>

          {/* Icon */}
          <div
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
          >
            <span className="text-4xl">🎣</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Spear Fishing
            <span className="block text-xl sm:text-2xl font-semibold text-white/70 mt-1">
              Adventure Trip Indonesia
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/75 max-w-2xl mx-auto">
            Jelajahi keindahan bawah laut Indonesia sambil merasakan thrill berburu ikan
            di spot-spot terbaik dunia. Dipandu instruktur bersertifikat AIDA internasional.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {[
              { value: "8+",   label: "Destinasi Premium" },
              { value: "500+", label: "Peserta/Tahun"      },
              { value: "100%", label: "Safety Record"      },
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
        <SpearFishingBookingForm />
      </section>

      {/* ── Keunggulan ── */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {KEUNGGULAN.map(({ icon, title, desc }) => (
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
      <section className="mt-14 py-14" style={{ background: "#eef0fb" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
              Paket Wisata
            </span>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
              Pilih Paket yang Sesuai
            </h2>
            <p className="mt-2 text-sm max-w-lg mx-auto" style={{ color: "#4050b5" }}>
              Semua paket sudah termasuk instruktur, peralatan, dan asuransi perjalanan
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3 items-start">
            {PACKAGES.map((pkg) => (
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

      {/* ── Spot Terbaik ── */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
              Lokasi Trip
            </span>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
              Spot Spear Fishing Terbaik
            </h2>
          </div>
          <a href="#booking-form" className="text-xs font-semibold underline underline-offset-4"
            style={{ color: "#3d52c6" }}>
            Booking Sekarang
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SPOTS.map((spot) => (
            <div
              key={spot.name}
              className="relative rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: "#fff",
                border: "1.5px solid rgba(20,52,164,0.12)",
                boxShadow: "0 2px 8px rgba(20,52,164,0.05)",
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
                  <p className="font-extrabold text-sm" style={{ color: "#1434A4" }}>{spot.name}</p>
                  <p className="text-[11px]" style={{ color: "#4050b5" }}>{spot.region}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{ background: "rgba(20,52,164,0.07)", color: "#1434A4" }}
                    >
                      🌊 {spot.depth}
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{ background: "rgba(20,52,164,0.07)", color: "#1434A4" }}
                    >
                      🐠 {spot.fish}
                    </span>
                  </div>
                  <span
                    className="mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{ background: "rgba(20,52,164,0.05)", color: "#4050b5" }}
                  >
                    {spot.level}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Cara Ikut ── */}
      <section className="py-14" style={{ background: "#eef0fb" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
              Panduan
            </span>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
              Cara Ikut Trip Spear Fishing
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-4">
            {CARA_IKUT.map(({ step, title, icon, desc }) => (
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
            Kelengkapan
          </span>
          <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
            Peralatan yang Kami Sediakan
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: "🤿", item: "Masker & Snorkel profesional",          note: "Tersedia semua paket"              },
            { icon: "🦶", item: "Fins / Sirip ukuran lengkap",           note: "Tersedia semua paket"              },
            { icon: "🦺", item: "Wetsuit 3mm & 5mm",                    note: "Paket Menengah ke atas"            },
            { icon: "🔱", item: "Senapan panah elastis & pneumatik",     note: "Paket Menengah ke atas"            },
            { icon: "🎥", item: "Action Camera GoPro underwater",        note: "Paket Menengah ke atas"            },
            { icon: "🩺", item: "First Aid Kit & oksigen darurat",       note: "Semua trip"                        },
            { icon: "🛥️", item: "Perahu cepat & kapal selam snorkeling", note: "Termasuk semua paket"              },
            { icon: "🏅", item: "Sertifikat keikutsertaan",              note: "Paket Menengah ke atas"            },
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
      <section className="py-14" style={{ background: "#eef0fb" }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
              FAQ
            </span>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

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
            Petualangan Bawah Laut Menanti!
          </h2>
          <p className="mt-2 text-white/70 text-sm">
            Bergabunglah dengan ratusan pelancong yang sudah merasakan
            sensasi spear fishing di spot-spot terbaik Indonesia.
          </p>
          <a
            href="#booking-form"
            className="mt-6 inline-block rounded-full px-10 py-3.5 text-sm font-bold uppercase tracking-widest shadow-xl transition hover:scale-105"
            style={{ background: "#fff", color: "#1434A4" }}
          >
            Booking Trip Sekarang
          </a>
        </div>
      </section>

    </div>
  );
}

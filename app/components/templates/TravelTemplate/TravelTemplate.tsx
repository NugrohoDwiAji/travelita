import TravelBookingForm from "@/app/components/organism/TravelBookingForm/TravelBookingForm";
import TourPackageCard from "@/app/components/moleculs/TourPackageCard/TourPackageCard";
import FaqItem from "@/app/components/moleculs/FaqItem/FaqItem";
import {
  IconHotel,
  IconBus,
  IconFood,
  IconCamera,
  IconGuide,
  IconMountain,
  IconBeach,
  IconMap,
} from "@/app/components/atoms/TravelIcons/TravelIcons";

const PACKAGES = [
  {
    name: "Gili Islands Explorer",
    duration: "3H 2M",
    price: "Rp 1.450.000",
    image: "🏝️",
    badge: undefined,
    highlight: false,
    rating: 4.9,
    reviewCount: 312,
    destinations: ["Gili Trawangan", "Gili Meno", "Gili Air"],
    inclusions: [
      { text: "Transportasi fast boat PP", included: true  },
      { text: "Penginapan 2 malam",        included: true  },
      { text: "Snorkeling 3 spot",          included: true  },
      { text: "Makan siang 1×",            included: true  },
      { text: "Guide lokal",               included: false },
      { text: "Kamera underwater",         included: false },
    ],
  },
  {
    name: "Rinjani Trekking Adventure",
    duration: "4H 3M",
    price: "Rp 2.850.000",
    image: "🏔️",
    badge: "Best Seller",
    highlight: true,
    rating: 4.8,
    reviewCount: 198,
    destinations: ["Sembalun", "Puncak Rinjani", "Danau Segara Anak"],
    inclusions: [
      { text: "Porter & guide bersertifikat", included: true },
      { text: "Tenda & sleeping bag",         included: true },
      { text: "Konsumsi 3× sehari",           included: true },
      { text: "Simaksi TNGR",                 included: true },
      { text: "Transportasi PP Mataram",      included: true },
      { text: "Dokumentasi foto",             included: true },
    ],
  },
  {
    name: "Lombok South Coast",
    duration: "2H 1M",
    price: "Rp 875.000",
    image: "🌅",
    badge: "Terpopuler",
    highlight: false,
    rating: 4.7,
    reviewCount: 421,
    destinations: ["Pantai Kuta", "Tanjung Aan", "Pantai Mawun"],
    inclusions: [
      { text: "Transportasi AC",       included: true  },
      { text: "Guide lokal",           included: true  },
      { text: "Snack & air mineral",   included: true  },
      { text: "Tiket masuk semua spot", included: true },
      { text: "Penginapan 1 malam",    included: false },
      { text: "Foto profesional",      included: false },
    ],
  },
  {
    name: "Lombok Cultural Tour",
    duration: "1 Hari",
    price: "Rp 450.000",
    image: "🏺",
    badge: undefined,
    highlight: false,
    rating: 4.6,
    reviewCount: 287,
    destinations: ["Desa Sade", "Masjid Beleq", "Pasar Seni Sayang-Sayang"],
    inclusions: [
      { text: "Guide budaya berpengalaman", included: true  },
      { text: "Transportasi minibus AC",    included: true  },
      { text: "Makan siang tradisional",    included: true  },
      { text: "Tiket masuk",                included: true  },
      { text: "Penginapan",                 included: false },
      { text: "Oleh-oleh",                  included: false },
    ],
  },
  {
    name: "Air Terjun & Alam Tengah",
    duration: "2H 1M",
    price: "Rp 680.000",
    image: "💧",
    badge: undefined,
    highlight: false,
    rating: 4.7,
    reviewCount: 156,
    destinations: ["Benang Kelambu", "Benang Stokel", "Tetebatu"],
    inclusions: [
      { text: "Transportasi 4WD",   included: true  },
      { text: "Guide alam lokal",   included: true  },
      { text: "Bekal makan siang",  included: true  },
      { text: "Tiket masuk",        included: true  },
      { text: "Penginapan 1 malam", included: false },
      { text: "Foto dokumentasi",   included: false },
    ],
  },
  {
    name: "Senggigi Premium Package",
    duration: "3H 2M",
    price: "Rp 1.950.000",
    image: "🌊",
    badge: "Premium",
    highlight: false,
    rating: 4.9,
    reviewCount: 89,
    destinations: ["Senggigi", "Pantai Batu Bolong", "Sunset Point"],
    inclusions: [
      { text: "Resort bintang 4 (2 malam)", included: true },
      { text: "Spa & wellness 1×",          included: true },
      { text: "Sunset cruise",              included: true },
      { text: "All-inclusive meals",        included: true },
      { text: "Private guide",             included: true  },
      { text: "Airport transfer",          included: true  },
    ],
  },
];

const FAQS = [
  {
    q: "Apakah harga sudah termasuk tiket pesawat ke Lombok?",
    a: "Belum. Harga yang tertera adalah harga paket wisata di Lombok saja, tidak termasuk tiket penerbangan menuju Lombok. Kami dapat membantu mencarikan tiket pesawat terbaik jika Anda membutuhkan.",
  },
  {
    q: "Berapa usia minimum untuk trekking Rinjani?",
    a: "Usia minimum untuk trekking Rinjani adalah 17 tahun dengan kondisi fisik prima. Pendakian puncak sangat disarankan bagi yang sudah terbiasa hiking. Tersedia juga rute camping tepi danau yang lebih ringan untuk usia 14 tahun ke atas.",
  },
  {
    q: "Apakah paket bisa dikustomisasi untuk grup atau keluarga?",
    a: "Tentu! Semua paket bisa disesuaikan untuk group, keluarga, maupun acara honeymoon. Hubungi tim kami untuk mendapatkan penawaran harga khusus grup (min. 10 orang).",
  },
  {
    q: "Bagaimana kebijakan pembatalan dan refund?",
    a: "Pembatalan 7 hari sebelum keberangkatan: refund 100%. Pembatalan 3–6 hari sebelumnya: refund 50%. Pembatalan kurang dari 3 hari: tidak ada refund, namun dapat dijadwalkan ulang.",
  },
  {
    q: "Apa yang perlu dibawa saat ikut paket wisata?",
    a: "Dokumen identitas (KTP/paspor), pakaian sesuai aktivitas (pakaian renang untuk pantai/Gili, pakaian hangat untuk Rinjani), sunscreen, topi, dan kamera. Setiap paket memiliki packing list lengkap yang akan dikirimkan setelah konfirmasi booking.",
  },
];

const KEUNGGULAN = [
  { icon: <IconGuide size={22} />,    title: "Guide Lokal Berpengalaman", desc: "Semua guide kami putra daerah Lombok, fasih bahasa Indonesia & Inggris" },
  { icon: <IconHotel size={22} />,    title: "Akomodasi Terpilih",        desc: "Penginapan nyaman dari homestay charming hingga resort berbintang"     },
  { icon: <IconBus size={22} />,      title: "Transportasi Nyaman",       desc: "Armada AC dengan pengemudi profesional dan tepat waktu"                 },
  { icon: <IconFood size={22} />,     title: "Kuliner Autentik",          desc: "Nikmati Ayam Taliwang, Plecing Kangkung, dan seafood segar khas Lombok" },
  { icon: <IconCamera size={22} />,   title: "Dokumentasi Profesional",   desc: "Foto & video memorable di setiap spot ikonik Lombok"                   },
  { icon: <IconMountain size={22} />, title: "Destinasi Lengkap",         desc: "Dari pantai eksotis hingga puncak Rinjani, semua ada di satu paket"     },
];

const TESTIMONIALS = [
  {
    name: "Rina S.",
    origin: "Jakarta",
    pkg: "Rinjani Trekking",
    rating: 5,
    text: "Pengalaman trekking Rinjani yang luar biasa! Guide-nya sangat profesional dan memastikan kami sampai puncak dengan selamat. Pemandangannya tidak terlupakan!",
  },
  {
    name: "Ahmad F.",
    origin: "Surabaya",
    pkg: "Gili Islands Explorer",
    rating: 5,
    text: "Paket Gili-nya worth every penny! Snorkeling di 3 spot berbeda, nemu penyu laut, dan sunset di Gili Air rasanya magical. Sudah rekomendasikan ke semua teman!",
  },
  {
    name: "Dewi K.",
    origin: "Bandung",
    pkg: "Lombok South Coast",
    rating: 5,
    text: "Pantai Tanjung Aan & Mawun benar-benar surga! Pasirnya putih bersih, air jernihnya bikin betah berjam-jam. Guide lokalnya juga ramah dan informatif sekali.",
  },
];

export default function TravelTemplate() {
  return (
    <div className="min-h-screen" style={{ background: "#f5f6fb" }}>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-28 pb-44"
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

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-2 text-xs text-white/60">
            <span>Beranda</span><span>/</span>
            <span className="font-medium text-white/90">Paket Wisata</span>
          </div>

          <div
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
          >
            <span className="text-4xl">🗺️</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Wisata Lombok
            <span className="block text-xl sm:text-2xl font-semibold text-white/70 mt-1">
              Paket Liburan Premium Pulau Seribu Masjid
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/75 max-w-2xl mx-auto">
            Jelajahi keindahan Lombok — dari Gili Islands yang memukau, 
            puncak Rinjani yang megah, hingga pantai tersembunyi yang masih perawan.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
            {[
              { value: "20+", label: "Paket Tersedia"     },
              { value: "12+", label: "Destinasi Lombok"   },
              { value: "4.8★", label: "Rating Rata-rata"  },
              { value: "2000+", label: "Traveler Puas"    },
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
          {KEUNGGULAN.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-2 rounded-xl p-4 text-center"
              style={{
                background: "#fff",
                border: "1.5px solid rgba(20,52,164,0.10)",
                boxShadow: "0 2px 10px rgba(20,52,164,0.05)",
              }}
            >
              <span style={{ color: "#1434A4" }}>{icon}</span>
              <p className="text-[11px] font-bold leading-snug" style={{ color: "#1434A4" }}>{title}</p>
              <p className="text-[10px] leading-snug hidden sm:block" style={{ color: "#4050b5" }}>{desc}</p>
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
                Paket Wisata Lombok
              </span>
              <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
                Pilih Paket Liburan Impian Anda
              </h2>
            </div>
            <a href="#booking-form" className="text-xs font-semibold underline underline-offset-4" style={{ color: "#3d52c6" }}>
              Lihat Semua
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PACKAGES.map((pkg) => (
              <TourPackageCard key={pkg.name} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Destinasi Unggulan ── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-14">
        <div className="mb-6 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
            Jelajahi Lombok
          </span>
          <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
            Destinasi Ikonik Lombok
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { emoji: "🏝️", name: "Gili Trawangan",    tag: "Wisata Bahari",    desc: "Pulau partai Lombok, snorkeling & diving kelas dunia"      },
            { emoji: "🏔️", name: "Gunung Rinjani",    tag: "Petualangan",      desc: "Puncak tertinggi ke-2 Indonesia, 3.726 mdpl"              },
            { emoji: "🌅", name: "Pantai Kuta Lombok", tag: "Pantai Eksotis",   desc: "Pasir merica unik dengan air toska yang jernih"           },
            { emoji: "🏺", name: "Desa Sade",          tag: "Budaya Sasak",     desc: "Desa adat Suku Sasak, tradisi tenun & arsitektur khas"     },
            { emoji: "💧", name: "Benang Kelambu",     tag: "Wisata Alam",      desc: "Air terjun bertingkat di tengah hutan tropis lebat"       },
            { emoji: "🚤", name: "Gili Air",           tag: "Pulau Tenang",     desc: "Surga tenang tanpa kendaraan bermotor, cocok untuk santai" },
            { emoji: "🌊", name: "Senggigi",           tag: "Wisata Pantai",    desc: "Kawasan wisata utama dengan sunset paling menawan"        },
            { emoji: "🐠", name: "Tanjung Aan",        tag: "Pantai Premium",   desc: "Pantai berpasir butiran besar coklat & putih yang unik"   },
          ].map(({ emoji, name, tag, desc }) => (
            <a
              key={name}
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
                  {tag}
                </span>
                <p className="font-extrabold text-sm" style={{ color: "#1434A4" }}>{name}</p>
                <p className="mt-1 text-[10px] leading-snug" style={{ color: "#4050b5" }}>{desc}</p>
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
              Ulasan Traveler
            </span>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
              Apa Kata Mereka?
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {TESTIMONIALS.map(({ name, origin, pkg, rating, text }) => (
              <div
                key={name}
                className="rounded-2xl p-5"
                style={{
                  background: "#fff",
                  border: "1.5px solid rgba(20,52,164,0.10)",
                  boxShadow: "0 2px 10px rgba(20,52,164,0.06)",
                }}
              >
                <div className="flex text-yellow-400 mb-3 gap-0.5">
                  {Array.from({ length: rating }).map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#374151" }}>&ldquo;{text}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold text-white"
                    style={{ background: "#1434A4" }}
                  >
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: "#1434A4" }}>{name}</p>
                    <p className="text-[10px]" style={{ color: "#4050b5" }}>{origin} · {pkg}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cara Pesan ── */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-14">
        <div className="mb-8 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
            Panduan
          </span>
          <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
            Cara Pesan Paket Wisata
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-4">
          {[
            { step: "01", icon: <IconMap size={22} />,      title: "Pilih Destinasi",   desc: "Tentukan destinasi dan jenis wisata yang Anda inginkan"       },
            { step: "02", icon: <IconBeach size={22} />,    title: "Pilih Paket",       desc: "Bandingkan paket berdasarkan durasi, fasilitas, dan harga"    },
            { step: "03", icon: <IconHotel size={22} />,    title: "Konfirmasi",         desc: "Isi formulir booking dan lakukan pembayaran DP 30%"           },
            { step: "04", icon: <IconMountain size={22} />, title: "Berangkat!",         desc: "Tim kami menjemput di bandara dan siap menemani perjalanan"   },
          ].map(({ step, icon, title, desc }) => (
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
            Lombok Menanti Kedatangan Anda!
          </h2>
          <p className="mt-2 text-white/70 text-sm">
            Jangan tunda lagi. Pesan sekarang dan dapatkan harga terbaik untuk
            liburan impian Anda ke Lombok.
          </p>
          <a
            href="#booking-form"
            className="mt-6 inline-block rounded-full px-10 py-3.5 text-sm font-bold uppercase tracking-widest shadow-xl transition hover:scale-105"
            style={{ background: "#fff", color: "#1434A4" }}
          >
            Cari Paket Wisata
          </a>
        </div>
      </section>

    </div>
  );
}

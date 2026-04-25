import ShuttleBookingForm from "@/app/components/organism/ShuttleBookingForm";
import FaqItem from "@/app/components/moleculs/FaqItem";
import {
  IconCheck,
  IconArrow,
} from "@/app/components/atoms/BookingIcons";

const POPULAR_ROUTES = [
  { from: "Jakarta",    to: "Bandung",   duration: "3 Jam",   price: "Rp 85.000",  tag: "Terlaris" },
  { from: "Surabaya",   to: "Malang",    duration: "2 Jam",   price: "Rp 65.000",  tag: "Promo"    },
  { from: "Yogyakarta", to: "Solo",      duration: "1.5 Jam", price: "Rp 45.000",  tag: null       },
  { from: "Bali",       to: "Lombok",    duration: "4 Jam",   price: "Rp 120.000", tag: "Baru"     },
  { from: "Semarang",   to: "Solo",      duration: "2 Jam",   price: "Rp 55.000",  tag: null       },
  { from: "Medan",      to: "Parapat",   duration: "3.5 Jam", price: "Rp 95.000",  tag: "Populer"  },
];

const FAQS = [
  {
    q: "Bagaimana cara memesan shuttle?",
    a: "Isi form pemesanan di atas dengan kota asal, tujuan, tanggal, dan jumlah penumpang. Pilih jadwal tersedia lalu lakukan pembayaran.",
  },
  {
    q: "Berapa lama sebelum keberangkatan saya bisa memesan?",
    a: "Pemesanan dapat dilakukan hingga 1 jam sebelum jadwal keberangkatan. Disarankan memesan minimal H-1 untuk mendapatkan kursi terbaik.",
  },
  {
    q: "Apakah ada biaya bagasi tambahan?",
    a: "Setiap penumpang mendapat allowance bagasi 20 kg gratis. Bagasi tambahan dikenakan biaya Rp 5.000 per kg.",
  },
  {
    q: "Bisakah saya membatalkan atau reschedule tiket?",
    a: "Pembatalan dapat dilakukan maksimal 3 jam sebelum keberangkatan dengan pengembalian dana 80%. Reschedule gratis hingga 2 jam sebelum berangkat.",
  },
];

const KEUNTUNGAN = [
  { icon: "🕐", title: "Tepat Waktu",     desc: "Armada berangkat sesuai jadwal" },
  { icon: "🛡️", title: "Aman & Terjamin", desc: "Sopir berlisensi resmi & terlatih" },
  { icon: "💺", title: "Kursi Nyaman",    desc: "AC, kursi reclining, leg room luas" },
  { icon: "📍", title: "Antar Jemput",    desc: "Pick-up di lokasi yang ditentukan" },
];

const CARA_BOOKING = [
  { step: "01", title: "Pilih Rute",        desc: "Masukkan kota asal & tujuan serta tanggal keberangkatan" },
  { step: "02", title: "Pilih Jadwal",       desc: "Lihat daftar jadwal tersedia dan pilih yang sesuai" },
  { step: "03", title: "Isi Data Penumpang", desc: "Lengkapi nama, nomor HP, dan email untuk e-tiket" },
  { step: "04", title: "Bayar & Berangkat",  desc: "Lakukan pembayaran dan tunjukkan e-tiket saat naik" },
];

const KEUNGGULAN_LIST = [
  "Armada Toyota HiAce & Hiace Premio terbaru (max 3 tahun)",
  "Sopir profesional berlisensi B2 dengan pengalaman min 5 tahun",
  "Pelacakan real-time via aplikasi Travelita",
  "Asuransi perjalanan gratis untuk setiap penumpang",
  "Fasilitas WiFi on-board di semua armada",
  "Free mineral water & snack ringan di perjalanan >3 jam",
];

export default function ShuttleServiceTemplate() {
  return (
    <div className="min-h-screen" style={{ background: "#f5f6fb" }}>

      {/* ── Hero Banner ── */}
      <section
        className="relative overflow-hidden pt-24 pb-36"
        style={{ background: "linear-gradient(135deg, #1434A4 0%, #3d52c6 100%)" }}
      >
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full opacity-10"
          style={{ background: "#fff" }} />
        <div className="absolute bottom-0 left-1/4 w-56 h-56 rounded-full opacity-5"
          style={{ background: "#fff" }} />
        {[
          { top: "18%", left: "5%",  size: 8  },
          { top: "60%", left: "90%", size: 5  },
          { top: "35%", left: "78%", size: 10 },
          { top: "75%", left: "15%", size: 6  },
        ].map((d, i) => (
          <div key={i} className="absolute rounded-full opacity-20"
            style={{ top: d.top, left: d.left, width: d.size, height: d.size, background: "#fff" }} />
        ))}

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-2 text-xs text-white/60">
            <span>Beranda</span>
            <span>/</span>
            <span className="text-white/90 font-medium">Shuttle Service</span>
          </div>

          <div
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect x="4" y="8" width="28" height="16" rx="3" fill="white" fillOpacity="0.9" />
              <rect x="6" y="10" width="10" height="7" rx="1.5" fill="#1434A4" fillOpacity="0.6" />
              <rect x="20" y="10" width="10" height="7" rx="1.5" fill="#1434A4" fillOpacity="0.6" />
              <path d="M4 18v4a2 2 0 002 2h1v2h4v-2h14v2h4v-2h1a2 2 0 002-2v-4H4z"
                fill="white" fillOpacity="0.9" />
              <circle cx="10" cy="26" r="3" fill="#1434A4" />
              <circle cx="26" cy="26" r="3" fill="#1434A4" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Shuttle Service
          </h1>
          <p className="mt-3 text-base sm:text-lg text-white/75 max-w-xl mx-auto">
            Perjalanan nyaman antar kota dengan armada modern dan sopir berpengalaman.
            Harga terjangkau, tepat waktu, dan aman.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {[
              { value: "50+", label: "Rute Tersedia" },
              { value: "1.000+", label: "Penumpang/Bulan" },
              { value: "4.9★", label: "Rating" },
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
      <section id="booking-form" className="mx-auto max-w-4xl px-4 sm:px-6 -mt-20 relative z-10">
        <ShuttleBookingForm />
      </section>

      {/* ── Keuntungan ── */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {KEUNTUNGAN.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col items-center gap-2 rounded-xl p-5 text-center"
              style={{
                background: "#fff",
                border: "1.5px solid rgba(20,52,164,0.10)",
                boxShadow: "0 2px 12px rgba(20,52,164,0.05)",
              }}
            >
              <span className="text-2xl">{icon}</span>
              <p className="text-sm font-bold" style={{ color: "#1434A4" }}>{title}</p>
              <p className="text-[11px] leading-snug" style={{ color: "#4050b5" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Rute Populer ── */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 mt-12 pb-4">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
              Rute Populer
            </span>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
              Destinasi Favorit Penumpang
            </h2>
          </div>
          <a href="#" className="text-xs font-semibold underline underline-offset-4" style={{ color: "#3d52c6" }}>
            Lihat Semua
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR_ROUTES.map((route) => (
            <a
              key={`${route.from}-${route.to}`}
              href="#booking-form"
              className="group relative flex items-center gap-4 rounded-xl px-5 py-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: "#fff",
                border: "1.5px solid rgba(20,52,164,0.12)",
                boxShadow: "0 2px 8px rgba(20,52,164,0.05)",
              }}
            >
              {route.tag && (
                <span
                  className="absolute -top-2 right-3 rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                  style={{ background: "#1434A4" }}
                >
                  {route.tag}
                </span>
              )}
              <span className="text-lg" style={{ color: "#1434A4" }}>🚌</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 font-bold text-sm" style={{ color: "#1434A4" }}>
                  <span className="truncate">{route.from}</span>
                  <span className="shrink-0" style={{ color: "#3d52c6" }}><IconArrow /></span>
                  <span className="truncate">{route.to}</span>
                </div>
                <span className="text-[11px]" style={{ color: "#4050b5" }}>⏱ {route.duration}</span>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs" style={{ color: "#4050b5" }}>Mulai dari</p>
                <p className="text-sm font-extrabold" style={{ color: "#1434A4" }}>{route.price}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Cara Booking ── */}
      <section className="mt-14 py-14" style={{ background: "#eef0fb" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
              Panduan
            </span>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
              Cara Pesan Shuttle Service
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-4">
            {CARA_BOOKING.map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-extrabold text-white"
                  style={{ background: "#1434A4", boxShadow: "0 4px 14px rgba(20,52,164,0.30)" }}
                >
                  {step}
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

      {/* ── Keunggulan Layanan ── */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-14">
        <div className="mb-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
            Mengapa Kami
          </span>
          <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
            Keunggulan Shuttle Travelita
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {KEUNGGULAN_LIST.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0"><IconCheck /></span>
              <p className="text-sm leading-snug" style={{ color: "#3d3d5c" }}>{item}</p>
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
        style={{ background: "linear-gradient(135deg, #1434A4, #3d52c6)" }}
      >
        <div className="mx-auto max-w-xl px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Siap Untuk Perjalanan Anda?
          </h2>
          <p className="mt-2 text-white/70 text-sm">
            Pesan shuttle sekarang dan nikmati perjalanan yang nyaman bersama Travelita!
          </p>
          <a
            href="#booking-form"
            className="mt-6 inline-block rounded-full px-10 py-3.5 text-sm font-bold uppercase tracking-widest shadow-xl transition hover:scale-105"
            style={{ background: "#fff", color: "#1434A4" }}
          >
            Pesan Sekarang
          </a>
        </div>
      </section>

    </div>
  );
}

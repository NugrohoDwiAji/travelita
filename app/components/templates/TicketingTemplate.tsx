import TicketingBookingForm from "@/app/components/organism/TicketingBookingForm";
import FaqItem from "@/app/components/moleculs/FaqItem";

const POPULAR_DESTINATIONS = [
  { from: "Jakarta", to: "Bali",       price: "Rp 450.000", type: "Pesawat", icon: "✈️", tag: "Terlaris",   duration: "1.5 Jam"  },
  { from: "Jakarta", to: "Surabaya",   price: "Rp 280.000", type: "Pesawat", icon: "✈️", tag: "Promo",      duration: "1.25 Jam" },
  { from: "Jakarta", to: "Yogyakarta", price: "Rp 175.000", type: "Kereta",  icon: "🚂", tag: null,         duration: "7 Jam"    },
  { from: "Surabaya", to: "Bali",      price: "Rp 80.000",  type: "Kereta",  icon: "🚂", tag: "Populer",    duration: "4.5 Jam"  },
  { from: "Jakarta", to: "Bandung",    price: "Rp 55.000",  type: "Kereta",  icon: "🚂", tag: "Terjangkau", duration: "3 Jam"    },
  { from: "Bali",    to: "Lombok",     price: "Rp 75.000",  type: "Ferry",   icon: "⛴️", tag: "Baru",       duration: "4.5 Jam"  },
];

const PROMOS = [
  {
    title: "Flash Sale Pesawat",
    desc: "Diskon hingga 40% untuk penerbangan domestik pilihan",
    code: "FLASH40",
    badge: "Berakhir 20 Mar 2026",
    color: "#1434A4",
  },
  {
    title: "Kereta Akhir Pekan",
    desc: "Harga spesial setiap Jumat–Minggu untuk semua rute kereta",
    code: "WEEKEND",
    badge: "Setiap Minggu",
    color: "#0d2280",
  },
  {
    title: "Rute Baru Ferry Lombok",
    desc: "Rute Bali–Lombok perdana mulai Rp 75.000/penumpang",
    code: "FERRY75",
    badge: "Rute Baru!",
    color: "#3d52c6",
  },
];

const KEUNTUNGAN = [
  { icon: "🎫", title: "Harga Terbaik",     desc: "Bandingkan harga dari semua maskapai & operator" },
  { icon: "⚡", title: "Konfirmasi Instan", desc: "E-tiket terkirim ke email dalam 15 menit"         },
  { icon: "🔄", title: "Reschedule Mudah",  desc: "Ubah jadwal kapan saja melalui aplikasi Travelita"  },
  { icon: "🛡️", title: "Aman & Terpercaya", desc: "Sistem pembayaran terenkripsi & berlisensi resmi" },
];

const CARA_PESAN = [
  { step: "01", title: "Pilih Moda Transportasi", desc: "Pilih pesawat, kereta, bus, atau ferry sesuai kebutuhan" },
  { step: "02", title: "Isi Detail Perjalanan",   desc: "Masukkan rute, tanggal, jumlah penumpang, dan kelas"    },
  { step: "03", title: "Pilih & Bandingkan",      desc: "Lihat semua pilihan tersedia dan pilih yang paling sesuai" },
  { step: "04", title: "Bayar & Terima E-tiket",  desc: "Bayar dan e-tiket langsung dikirim ke email Anda"       },
];

const FAQS = [
  {
    q: "Bagaimana cara memesan tiket di Travelita?",
    a: "Pilih moda transportasi (Pesawat, Kereta, Bus, atau Ferry), isi kota asal & tujuan, tanggal, dan jumlah penumpang, lalu klik Cari Tiket. Setelah mendapat hasil, pilih tiket yang sesuai dan lakukan pembayaran.",
  },
  {
    q: "Apakah tiket yang dibeli bisa di-refund?",
    a: "Kebijakan refund bergantung pada maskapai/operator. Secara umum, tiket fleksibel dapat di-refund hingga 24 jam sebelum keberangkatan dengan potongan admin Rp 25.000.",
  },
  {
    q: "Berapa lama e-tiket dikirimkan setelah pembayaran?",
    a: "E-tiket akan dikirimkan ke email Anda dalam waktu maksimal 15 menit setelah pembayaran berhasil dikonfirmasi.",
  },
  {
    q: "Apakah ada biaya tambahan selain harga tiket?",
    a: "Harga tiket sudah termasuk pajak dan biaya layanan dasar. Biaya bagasi tambahan dan pemilihan kursi berbayar akan tertera secara transparan sebelum pembayaran.",
  },
  {
    q: "Bisakah saya memesan tiket untuk orang lain?",
    a: "Bisa. Pada saat mengisi data penumpang, masukkan nama dan data yang berbeda dari pemesan. Pastikan data sesuai identitas yang digunakan saat perjalanan.",
  },
];

export default function TicketingTemplate() {
  return (
    <div className="min-h-screen" style={{ background: "#f5f6fb" }}>

      {/* ── Hero Banner ── */}
      <section
        className="relative overflow-hidden pt-24 pb-40"
        style={{ background: "linear-gradient(135deg, #0d2280 0%, #1434A4 55%, #3d52c6 100%)" }}
      >
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-[0.08]"
          style={{ background: "#fff" }} />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full opacity-[0.05]"
          style={{ background: "#fff" }} />
        {[
          { top: "12%", left: "6%",  size: 8  },
          { top: "65%", left: "88%", size: 5  },
          { top: "30%", left: "80%", size: 11 },
          { top: "80%", left: "25%", size: 7  },
          { top: "45%", left: "3%",  size: 5  },
        ].map((d, i) => (
          <div key={i} className="absolute rounded-full opacity-20"
            style={{ top: d.top, left: d.left, width: d.size, height: d.size, background: "#fff" }} />
        ))}

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-2 text-xs text-white/60">
            <span>Beranda</span>
            <span>/</span>
            <span className="font-medium text-white/90">Ticketing</span>
          </div>

          {/* Ticket icon */}
          <div
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect x="3" y="10" width="30" height="16" rx="3"
                fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.5" />
              <circle cx="3" cy="18" r="3.5" fill="#1434A4" />
              <circle cx="33" cy="18" r="3.5" fill="#1434A4" />
              <line x1="3" y1="18" x2="33" y2="18"
                stroke="white" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M11 13v10M25 13v10"
                stroke="white" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Pesan Tiket Online
          </h1>
          <p className="mt-3 text-base sm:text-lg text-white/75 max-w-2xl mx-auto">
            Temukan dan pesan tiket pesawat, kereta, bus, dan ferry terbaik dengan harga
            transparan. Satu platform untuk semua moda transportasi Anda.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {[
              { value: "1.000+", label: "Rute Tersedia"    },
              { value: "50+",    label: "Partner Maskapai" },
              { value: "4.8★",   label: "Rating Pengguna"  },
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
        <TicketingBookingForm />
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

      {/* ── Destinasi Populer ── */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 mt-12">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
              Destinasi Populer
            </span>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
              Rute Favorit Pelancong
            </h2>
          </div>
          <a href="#" className="text-xs font-semibold underline underline-offset-4" style={{ color: "#3d52c6" }}>
            Lihat Semua
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR_DESTINATIONS.map((d) => (
            <a
              key={`${d.from}-${d.to}`}
              href="#booking-form"
              className="group relative flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: "#fff",
                border: "1.5px solid rgba(20,52,164,0.12)",
                boxShadow: "0 2px 8px rgba(20,52,164,0.05)",
              }}
            >
              {d.tag && (
                <span
                  className="absolute -top-2 right-3 rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                  style={{ background: "#1434A4" }}
                >
                  {d.tag}
                </span>
              )}
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl"
                style={{ background: "rgba(20,52,164,0.07)" }}
              >
                {d.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm truncate" style={{ color: "#1434A4" }}>
                  {d.from} → {d.to}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{ background: "rgba(20,52,164,0.07)", color: "#1434A4" }}
                  >
                    {d.type}
                  </span>
                  <span className="text-[11px]" style={{ color: "#4050b5" }}>⏱ {d.duration}</span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[10px]" style={{ color: "#4050b5" }}>Mulai dari</p>
                <p className="text-sm font-extrabold" style={{ color: "#1434A4" }}>{d.price}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Promo & Deals ── */}
      <section className="mt-14 py-14" style={{ background: "#eef0fb" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-6 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
              Penawaran Spesial
            </span>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
              Promo & Deals Terbaru
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {PROMOS.map((promo) => (
              <div
                key={promo.code}
                className="rounded-2xl p-5 text-white"
                style={{ background: `linear-gradient(135deg, ${promo.color}, #3d52c6)` }}
              >
                <span className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-white/20 mb-3">
                  {promo.badge}
                </span>
                <h3 className="text-base font-extrabold mb-1">{promo.title}</h3>
                <p className="text-xs text-white/75 leading-relaxed mb-4">{promo.desc}</p>
                <div
                  className="flex items-center justify-between rounded-lg px-3 py-2"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  <span className="text-xs text-white/70">Kode Promo</span>
                  <span className="font-extrabold text-sm tracking-widest">{promo.code}</span>
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
            Cara Memesan Tiket
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-4">
          {CARA_PESAN.map(({ step, title, desc }) => (
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
        style={{ background: "linear-gradient(135deg, #0d2280, #1434A4, #3d52c6)" }}
      >
        <div className="mx-auto max-w-xl px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Siap Merencanakan Perjalanan?
          </h2>
          <p className="mt-2 text-white/70 text-sm">
            Dapatkan harga terbaik untuk semua moda transportasi favoritmu.
          </p>
          <a
            href="#booking-form"
            className="mt-6 inline-block rounded-full px-10 py-3.5 text-sm font-bold uppercase tracking-widest shadow-xl transition hover:scale-105"
            style={{ background: "#fff", color: "#1434A4" }}
          >
            Cari Tiket Sekarang
          </a>
        </div>
      </section>

    </div>
  );
}

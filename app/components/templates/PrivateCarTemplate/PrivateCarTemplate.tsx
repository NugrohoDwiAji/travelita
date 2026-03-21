import PrivateCarBookingForm from "@/app/components/organism/PrivateCarBookingForm/PrivateCarBookingForm";
import FaqItem from "@/app/components/moleculs/FaqItem/FaqItem";

const FAQS = [
  {
    q: "Apakah harga sudah termasuk BBM dan tol?",
    a: "Belum. BBM dan biaya tol ditanggung oleh penyewa. Sopir akan memberikan struk tol untuk transparansi.",
  },
  {
    q: "Bisakah saya memilih sopir yang sama seperti sebelumnya?",
    a: "Bisa! Hubungi CS kami dan kami akan mengusahakan sopir yang sama jika tersedia di jadwal Anda.",
  },
  {
    q: "Apa yang terjadi jika perjalanan melebihi durasi yang dipesan?",
    a: "Perpanjangan dikenakan biaya overtime Rp 50.000/jam. Konfirmasi ke sopir atau CS kami terlebih dahulu.",
  },
  {
    q: "Apakah tersedia layanan untuk malam hari atau dini hari?",
    a: "Tersedia 24 jam. Pemesanan di luar jam kerja (22:00–06:00) dikenakan surcharge Rp 75.000.",
  },
  {
    q: "Bagaimana jika mobil mengalami masalah di tengah perjalanan?",
    a: "Kami menyediakan armada pengganti dalam waktu 60 menit khusus area kota besar. Seluruh biaya penggantian ditanggung Travelita.",
  },
];

const KEUNGGULAN = [
  { icon: "🧑‍✈️", title: "Sopir Profesional", desc: "Berlisensi, ramah, hafal rute" },
  { icon: "📱",   title: "Tracking Realtime",  desc: "Pantau posisi via aplikasi" },
  { icon: "🔒",   title: "Privasi Terjaga",    desc: "Tidak ada penumpang lain" },
  { icon: "⏰",   title: "On-demand 24 Jam",   desc: "Pesan kapan saja, siap jemput" },
];

const CARA_PESAN = [
  { step: "01", title: "Tentukan Kebutuhan",   desc: "Pilih tipe layanan, tanggal, jam jemput dan tujuan" },
  { step: "02", title: "Pilih Kendaraan",       desc: "Sesuaikan kapasitas dan kelas kendaraan dengan kebutuhan Anda" },
  { step: "03", title: "Isi Data & Konfirmasi", desc: "Lengkapi data pemesanan dan dapatkan konfirmasi instan" },
  { step: "04", title: "Sopir Siap Menjemput",  desc: "Sopir akan menghubungi 30 menit sebelum waktu penjemputan" },
];

const INKLUSIF = [
  "Sopir profesional berlisensi",
  "BBM (khusus paket dalam kota)",
  "Air mineral & tisu",
  "Asuransi penumpang",
  "WiFi on-board",
  "Parkir area jemput/antar",
];

const EKSKLUSIF = [
  "BBM untuk perjalanan antar kota",
  "Biaya tol & parkir destinasi",
  "Biaya masuk objek wisata",
  "Konsumsi sopir",
  "Overtime di luar durasi",
];

export default function PrivateCarTemplate() {
  return (
    <div className="min-h-screen" style={{ background: "#f5f6fb" }}>

      {/* ── Hero Banner ── */}
      <section
        className="relative overflow-hidden pt-24 pb-36"
        style={{ background: "linear-gradient(135deg, #0d2280 0%, #1434A4 50%, #3d52c6 100%)" }}
      >
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-[0.07]"
          style={{ background: "#fff" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-[0.05]"
          style={{ background: "#fff" }} />
        {[
          { top: "15%", left: "8%",  size: 9  },
          { top: "55%", left: "92%", size: 6  },
          { top: "28%", left: "75%", size: 12 },
          { top: "78%", left: "20%", size: 7  },
        ].map((d, i) => (
          <div key={i} className="absolute rounded-full opacity-20"
            style={{ top: d.top, left: d.left, width: d.size, height: d.size, background: "#fff" }} />
        ))}

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-2 text-xs text-white/60">
            <span>Beranda</span>
            <span>/</span>
            <span className="font-medium text-white/90">Private Car</span>
          </div>

          <div
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
          >
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <path d="M7 22l3-8h18l3 8" fill="white" fillOpacity="0.2" />
              <path d="M7 22l3-8h18l3 8H7z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
              <rect x="5" y="22" width="28" height="8" rx="2" fill="white" fillOpacity="0.85" />
              <circle cx="11" cy="32" r="3" fill="#1434A4" />
              <circle cx="27" cy="32" r="3" fill="#1434A4" />
              <rect x="9" y="17" width="7" height="4.5" rx="1" fill="#1434A4" fillOpacity="0.5" />
              <rect x="22" y="17" width="7" height="4.5" rx="1" fill="#1434A4" fillOpacity="0.5" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Private Car
          </h1>
          <p className="mt-3 text-base sm:text-lg text-white/75 max-w-xl mx-auto">
            Sewa mobil dengan sopir profesional. Fleksibel untuk dalam kota,
            antar kota, hingga airport transfer — kapan saja, ke mana saja.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {[
              { value: "200+", label: "Armada Aktif" },
              { value: "24/7", label: "Siap Melayani" },
              { value: "4.9★", label: "Rating Sopir" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-xl font-extrabold text-white">{value}</span>
                <span className="text-[11px] text-white/60 uppercase tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking Form + Detail Kendaraan ── */}
      <section id="booking-form" className="mx-auto max-w-4xl px-4 sm:px-6 -mt-20 relative z-10">
        <PrivateCarBookingForm />
      </section>

      {/* ── Keunggulan 4 kartu ── */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {KEUNGGULAN.map(({ icon, title, desc }) => (
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

      {/* ── Cara Pesan ── */}
      <section className="mt-14 py-14" style={{ background: "#eef0fb" }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
              Panduan
            </span>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
              Cara Memesan Private Car
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
        </div>
      </section>

      {/* ── Inklusi & Ekslusi ── */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-14">
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-base font-extrabold mb-4" style={{ color: "#1434A4" }}>
              ✅ Sudah Termasuk
            </h3>
            <div className="flex flex-col gap-2.5">
              {INKLUSIF.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-0.5">
                    <circle cx="9" cy="9" r="8" fill="#1434A4" fillOpacity="0.1" />
                    <path d="M5.5 9.5l2.5 2.5 4.5-5" stroke="#1434A4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm" style={{ color: "#3d3d5c" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-base font-extrabold mb-4" style={{ color: "#1434A4" }}>
              ❌ Belum Termasuk
            </h3>
            <div className="flex flex-col gap-2.5">
              {EKSKLUSIF.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-0.5">
                    <circle cx="9" cy="9" r="8" fill="#ef4444" fillOpacity="0.1" />
                    <path d="M6 6l6 6M12 6l-6 6" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="text-sm" style={{ color: "#3d3d5c" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
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
        style={{ background: "linear-gradient(135deg, #0d2280, #1434A4)" }}
      >
        <div className="mx-auto max-w-xl px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Butuh Mobil Dengan Sopir?
          </h2>
          <p className="mt-2 text-white/70 text-sm">
            Pesan private car Travelita sekarang — nyaman, aman, dan tepat waktu.
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

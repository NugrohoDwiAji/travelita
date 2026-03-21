import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-white">

      {/* Ornamen latar - Royal Blue #1434A4 */}

      {/* Filled orb kiri bawah */}
      <div
        className="absolute -bottom-28 -left-28 w-150 h-150 rounded-full -z-10"
        style={{ background: "rgba(20,52,164,0.07)" }}
      />
      {/* Filled orb kanan atas */}
      <div
        className="absolute -top-20 -right-20 w-100 h-100 rounded-full -z-10"
        style={{ background: "rgba(20,52,164,0.06)" }}
      />

      {/* Ring besar kiri */}
      <div
        className="absolute top-16 left-10 w-40 h-40 rounded-full -z-10"
        style={{ border: "3px solid rgba(20,52,164,0.18)" }}
      />
      {/* Ring kecil kanan bawah */}
      <div
        className="absolute bottom-24 right-16 w-24 h-24 rounded-full -z-10"
        style={{ border: "2px solid rgba(20,52,164,0.14)" }}
      />
      {/* Ring medium tengah kanan */}
      <div
        className="absolute top-1/3 right-32 w-16 h-16 rounded-full -z-10"
        style={{ border: "2px solid rgba(20,52,164,0.12)" }}
      />

      {/* Dot ornaments #1434A4 */}
      {[
        { top: "10%",  left: "6%",  size: 10, opacity: 0.25 },
        { top: "22%",  left: "80%", size: 7,  opacity: 0.18 },
        { top: "68%",  left: "88%", size: 12, opacity: 0.20 },
        { top: "78%",  left: "5%",  size: 8,  opacity: 0.22 },
        { top: "42%",  left: "92%", size: 6,  opacity: 0.15 },
        { top: "55%",  left: "2%",  size: 9,  opacity: 0.18 },
        { top: "32%",  left: "50%", size: 5,  opacity: 0.10 },
      ].map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full -z-10"
          style={{
            top: d.top, left: d.left,
            width: d.size, height: d.size,
            background: "#1434A4",
            opacity: d.opacity,
          }}
        />
      ))}

      {/* Concentric circles SVG - top right */}
      <svg
        className="absolute top-0 right-0 w-72 h-72 -z-10 opacity-5"
        viewBox="0 0 288 288"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="144" cy="144" r="130" stroke="#1434A4" strokeWidth="2" />
        <circle cx="144" cy="144" r="100" stroke="#1434A4" strokeWidth="1.5" />
        <circle cx="144" cy="144" r="68"  stroke="#1434A4" strokeWidth="1" />
      </svg>

      {/* Wave SVG bawah */}
      <svg
        className="absolute bottom-0 left-0 w-full -z-10"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,50 C360,90 1080,10 1440,50 L1440,80 L0,80 Z"
          fill="#eef0fb"
        />
      </svg>

      {/* Konten */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <span
          className="inline-block mb-6 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
          style={{
            border: "1.5px solid #1434A4",
            color: "#1434A4",
            background: "rgba(20,52,164,0.06)",
          }}
        >
          Explore &bull; Adventure &bull; Discover
        </span>

        <h1
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6"
          style={{ color: "#1434A4" }}
        >
          Jelajahi Dunia&nbsp;
          <span
            className="block"
            style={{
              background: "linear-gradient(90deg, #1434A4, #3d52c6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Bersama Travelita
          </span>
        </h1>

        <p
          className="mx-auto mb-10 max-w-2xl text-lg sm:text-xl leading-relaxed"
          style={{ color: "#4050b5" }}
        >
          Dari shuttle service harian hingga petualangan spear fishing di laut
          biru - kami menghadirkan pengalaman perjalanan yang tak terlupakan.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/booking"
            className="rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{ background: "#1434A4", color: "#ffffff" }}
          >
            Pesan Sekarang
          </Link>
          <Link
            href="/travel"
            className="rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105"
            style={{
              border: "2px solid #1434A4",
              color: "#1434A4",
              background: "transparent",
            }}
          >
            Lihat Paket
          </Link>
        </div>

        {/* Stats row */}
        <div
          className="mt-14 grid grid-cols-3 gap-4 divide-x rounded-2xl px-6 py-5 sm:px-10"
          style={{
            background: "#ffffff",
            border: "1.5px solid rgba(20,52,164,0.18)",
            boxShadow: "0 4px 32px rgba(20,52,164,0.08)",
          }}
        >
          {[
            { value: "10K+", label: "Pelanggan Puas" },
            { value: "50+",  label: "Destinasi" },
            { value: "5",   label: "Rating Layanan" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 px-2">
              <span
                className="text-2xl sm:text-3xl font-extrabold"
                style={{ color: "#1434A4" }}
              >
                {value}
              </span>
              <span
                className="text-[11px] sm:text-xs uppercase tracking-wider"
                style={{ color: "#4050b5" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
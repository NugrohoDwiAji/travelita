import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat py-10"
      style={{ backgroundImage: "url('/banner/banner.png')" }}
    >

         {/* Konten */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <span
          className="inline-block mb-6 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
          style={{
            border: "1.5px solid rgba(255,255,255,0.9)",
            color: "#ffffff",
            background: "rgba(255,255,255,0.12)",
          }}
        >
          Explore &bull; Adventure &bull; Discover
        </span>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6"
          style={{ color: "#ffffff" }}
        >
          Jelajahi Nusa Tenggara Barat&nbsp;
          <span className="block text-white">
            Bersama Travelita
          </span>
        </h1>

        <p
          className="mx-auto mb-10 max-w-2xl text-lg sm:text-xl leading-relaxed"
          style={{ color: "rgba(255,255,255,0.92)" }}
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
              border: "2px solid #fff",
              color: "#fff",
              background: "transparent",
            }}
          >
            Lihat Paket
          </Link>
        </div>

        {/* Stats row */}
        <div
          className="mt-14 grid grid-cols-3 gap-4 divide-x divide-white/25 rounded-2xl px-6 py-5 sm:px-10 backdrop-blur-sm"
          style={{
            background: "rgba(11, 25, 73, 0.55)",
            border: "1.5px solid rgba(255,255,255,0.35)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          }}
        >
          {[
            { value: "1000+", label: "Pelanggan Puas" },
            { value: "50+",  label: "Destinasi" },
            { value: "5",   label: "Rating Layanan" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 px-2">
              <span
                className="text-2xl sm:text-3xl font-extrabold"
                style={{ color: "#ffffff" }}
              >
                {value}
              </span>
              <span
                className="text-[11px] sm:text-xs uppercase tracking-wider"
                style={{ color: "rgba(255,255,255,0.92)" }}
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
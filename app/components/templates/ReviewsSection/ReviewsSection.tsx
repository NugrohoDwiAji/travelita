const REVIEWS = [
  {
    id: 1,
    name: "Andi Pratama",
    location: "Jakarta",
    service: "Private Car",
    avatar: "AP",
    rating: 5,
    comment:
      "Pelayanan sangat memuaskan! Sopirnya ramah dan tepat waktu. Mobil bersih dan nyaman. Pasti akan pakai lagi untuk perjalanan bisnis saya berikutnya.",
    date: "12 Feb 2026",
  },
  {
    id: 2,
    name: "Sari Dewi",
    location: "Surabaya",
    service: "Spear Fishing – Raja Ampat",
    avatar: "SD",
    rating: 5,
    comment:
      "Pengalaman spear fishing di Raja Ampat benar-benar luar biasa! Tim Travelita sangat profesional, perlengkapan lengkap, dan guide-nya sabar banget. 10/10 recommended!",
    date: "28 Jan 2026",
  },
  {
    id: 3,
    name: "Budi Santoso",
    location: "Bandung",
    service: "Shuttle Service",
    avatar: "BS",
    rating: 4,
    comment:
      "Shuttle service-nya on time dan harganya terjangkau. Armada bersih dan AC dingin. Hanya saja kursinya agak sempit untuk perjalanan jauh. Overall tetap recommended.",
    date: "5 Mar 2026",
  },
  {
    id: 4,
    name: "Rina Kusuma",
    location: "Bali",
    service: "Travel – Labuan Bajo",
    avatar: "RK",
    rating: 5,
    comment:
      "Paket Labuan Bajo dari Travelita sangat worth it! Itinerary tertata rapi, hotel pilihan bagus, dan pemandu wisata lokal yang informatif. Terima kasih Travelita!",
    date: "20 Feb 2026",
  },
  {
    id: 5,
    name: "Deni Firmansyah",
    location: "Makassar",
    service: "Ticketing",
    avatar: "DF",
    rating: 5,
    comment:
      "Proses booking tiket cepat dan mudah. CS-nya responsif waktu ada pertanyaan soal jadwal. Harga transparan, tidak ada biaya tersembunyi. Sangat puas!",
    date: "8 Mar 2026",
  },
  {
    id: 6,
    name: "Maya Anggraeni",
    location: "Yogyakarta",
    service: "Travel – Bali",
    avatar: "MA",
    rating: 5,
    comment:
      "Liburan ke Bali bareng keluarga jadi sangat menyenangkan berkat Travelita. Semua diurus dengan baik mulai dari transportasi sampai penginapan. Highly recommended!",
    date: "1 Mar 2026",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill={i < rating ? "#1434A4" : "none"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505L7 1z"
            stroke="#1434A4"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section
      className="py-20 lg:py-28 overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-12 text-center">
          <span
            className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.25em]"
            style={{ color: "#1434A4" }}
          >
            Testimoni Pelanggan
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold"
            style={{ color: "#1434A4" }}
          >
            Apa Kata Mereka&nbsp;
            <span
              style={{
                background: "linear-gradient(90deg, #1434A4, #3d52c6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Tentang Kami?
            </span>
          </h2>
          <p
            className="mt-3 text-sm sm:text-base max-w-xl mx-auto"
            style={{ color: "#4050b5" }}
          >
            Ribuan pelanggan telah mempercayai Travelita untuk perjalanan mereka.
            Inilah pengalaman nyata dari mereka.
          </p>
        </div>

        {/* Summary bar */}
        <div
          className="flex flex-wrap items-center justify-center gap-8 mb-12 rounded-2xl py-5 px-8"
          style={{
            background: "rgba(20,52,164,0.04)",
            border: "1.5px solid rgba(20,52,164,0.10)",
          }}
        >
          {[
            { value: "4.9", label: "Rating Rata-rata" },
            { value: "10K+", label: "Review Masuk" },
            { value: "98%", label: "Pelanggan Puas" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span
                className="text-2xl sm:text-3xl font-extrabold"
                style={{ color: "#1434A4" }}
              >
                {value}
              </span>
              <span
                className="text-xs uppercase tracking-wider"
                style={{ color: "#4050b5" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Review cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="flex flex-col gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                background: "#ffffff",
                border: "1.5px solid rgba(20,52,164,0.12)",
                boxShadow: "0 2px 16px rgba(20,52,164,0.06)",
              }}
            >
              {/* Top row: avatar + name + rating */}
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: "#1434A4" }}
                >
                  {review.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className="font-semibold text-sm leading-tight"
                    style={{ color: "#1434A4" }}
                  >
                    {review.name}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "#4050b5" }}
                  >
                    {review.location}
                  </p>
                  <div className="mt-1.5">
                    <StarRating rating={review.rating} />
                  </div>
                </div>
              </div>

              {/* Comment */}
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: "#3d3d5c" }}
              >
                &ldquo;{review.comment}&rdquo;
              </p>

              {/* Footer row: service + date */}
              <div
                className="flex items-center justify-between pt-3"
                style={{ borderTop: "1px solid rgba(20,52,164,0.08)" }}
              >
                <span
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                  style={{
                    background: "rgba(20,52,164,0.07)",
                    color: "#1434A4",
                  }}
                >
                  {review.service}
                </span>
                <span
                  className="text-[11px]"
                  style={{ color: "#4050b5" }}
                >
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p
            className="mb-4 text-sm"
            style={{ color: "#4050b5" }}
          >
            Bergabunglah dengan ribuan pelanggan yang sudah merasakan perbedaannya
          </p>
          <a
            href="/booking"
            className="inline-block rounded-full px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: "#1434A4" }}
          >
            Pesan Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}

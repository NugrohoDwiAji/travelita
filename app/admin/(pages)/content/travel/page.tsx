import { Metadata } from "next";
import AdminContentTemplate, {
  ServicePackage,
  FaqEntry,
} from "@/app/components/templates/AdminContentTemplate/AdminContentTemplate";

export const metadata: Metadata = { title: "Konten Wisata Travel – Admin Travelita" };

const PACKAGES: ServicePackage[] = [
  {
    id: "tr-1",
    name: "Gili Islands Explorer",
    description: "Jelajahi tiga gili cantik dalam satu paket",
    price: "Rp 1.450.000 / orang",
    features: "3H 2M menginap\nTransport speedboat\nSnorkeling equipment\nGuide lokal\nBreakfast termasuk",
    badge: "Terlaris",
    highlighted: true,
  },
  {
    id: "tr-2",
    name: "Rinjani Trekking",
    description: "Pendakian Gunung Rinjani dengan porter dan guide",
    price: "Rp 2.850.000 / orang",
    features: "4H 3M perjalanan\nGuide & porter\nMakan selama trekking\nPerlengkapan camping\nSertifikat pendakian",
    badge: "Populer",
    highlighted: false,
  },
  {
    id: "tr-3",
    name: "Lombok South Coast",
    description: "Menjelajahi pantai-pantai selatan Lombok",
    price: "Rp 875.000 / orang",
    features: "2H 1M perjalanan\nTransport mobil AC\nTiket masuk termasuk\nMakan siang seafood\nGuide berpengalaman",
    badge: "",
    highlighted: false,
  },
  {
    id: "tr-4",
    name: "Lombok Cultural Tour",
    description: "Mengenal budaya dan tradisi masyarakat Lombok",
    price: "Rp 450.000 / orang",
    features: "1 hari penuh\nKunjungi Desa Sade\nTenun Sasak workshop\nMasjid bersejarah\nMakan siang lokal",
    badge: "",
    highlighted: false,
  },
  {
    id: "tr-5",
    name: "Senggigi Premium Package",
    description: "Liburan santai di Senggigi dengan fasilitas bintang",
    price: "Rp 1.950.000 / orang",
    features: "3H 2M hotel bintang 4\nSunset cruise\nSPA 60 menit\nBreakfast & dinner\nFree airport transfer",
    badge: "Eksklusif",
    highlighted: false,
  },
];

const FAQS: FaqEntry[] = [
  {
    id: "trf-1",
    question: "Apakah harga sudah per orang atau per grup?",
    answer: "Harga yang tertera adalah per orang, sudah termasuk biaya guide, transport, dan makan sesuai deskripsi paket.",
  },
  {
    id: "trf-2",
    question: "Berapa minimal peserta per paket?",
    answer: "Minimal 2 orang untuk semua paket. Untuk 1 orang tersedia surcharge single supplement.",
  },
  {
    id: "trf-3",
    question: "Bagaimana sistem pembayaran dan DP?",
    answer: "DP 30% saat pemesanan, lunas H-3 sebelum tanggal keberangkatan.",
  },
  {
    id: "trf-4",
    question: "Apakah bisa request itinerary kustom?",
    answer: "Tentu! Hubungi kami untuk membuat paket wisata sesuai keinginan dan budget Anda.",
  },
];

export default function TravelContentPage() {
  return (
    <AdminContentTemplate
      serviceTitle="Wisata Travel"
      serviceIcon="🗺️"
      breadcrumb="Kelola Konten"
      initialGeneral={{
        badge: "Destinasi Terbaik di Lombok",
        title: "Paket Wisata Lombok & Gili Terbaik",
        subtitle: "Kenali Keindahan Lombok dari Tangan Lokal",
        description:
          "Nikmati berbagai paket wisata terkurasi di Lombok dan Gili dengan guide lokal berpengalaman. Dari trekking Rinjani hingga explore pantai selatan yang menakjubkan.",
        ctaPrimary: "Lihat Paket Wisata",
        ctaSecondary: "Konsultasi Gratis",
      }}
      initialPackages={PACKAGES}
      initialFaqs={FAQS}
    />
  );
}

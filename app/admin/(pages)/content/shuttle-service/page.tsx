import { Metadata } from "next";
import AdminContentTemplate, {
  ServicePackage,
  FaqEntry,
} from "@/app/components/admin/templates/AdminContentTemplate";

export const metadata: Metadata = { title: "Konten Shuttle Service – Admin Travelita" };

const PACKAGES: ServicePackage[] = [
  {
    id: "ss-1",
    name: "Shuttle Reguler",
    description: "Layanan shuttle antar-kota jadwal tetap",
    price: "Rp 75.000 / orang",
    features: "Armada AC nyaman\nSupir berpengalaman\nTepat waktu\nMaksimal 8 penumpang",
    badge: "Terlaris",
    highlighted: true,
  },
  {
    id: "ss-2",
    name: "Shuttle Executive",
    description: "Shuttle premium dengan kursi ekstra lega",
    price: "Rp 120.000 / orang",
    features: "Minibus premium\nWiFi gratis\nAir mineral\nKursi reclining",
    badge: "Premium",
    highlighted: false,
  },
  {
    id: "ss-3",
    name: "Shuttle Airport Express",
    description: "Khusus rute bandara tanpa transit",
    price: "Rp 95.000 / orang",
    features: "Direct ke bandara\nBantuan bagasi\nFlight tracking\nSupir standby",
    badge: "",
    highlighted: false,
  },
];

const FAQS: FaqEntry[] = [
  {
    id: "sf-1",
    question: "Berapa jam sebelum jadwal saya harus memesan?",
    answer: "Disarankan memesan minimal 2 jam sebelum keberangkatan untuk memastikan ketersediaan kursi.",
  },
  {
    id: "sf-2",
    question: "Apakah ada biaya pembatalan?",
    answer: "Pembatalan lebih dari 2 jam sebelum jadwal gratis. Kurang dari 2 jam dikenakan biaya 50%.",
  },
  {
    id: "sf-3",
    question: "Berapa batas maksimal bagasi?",
    answer: "Setiap penumpang diperbolehkan membawa 1 koper ukuran kabin (maks. 20 kg) dan 1 tas jinjing.",
  },
];

export default function ShuttleServiceContentPage() {
  return (
    <AdminContentTemplate
      serviceTitle="Shuttle Service"
      serviceIcon="🚐"
      breadcrumb="Kelola Konten"
      initialGeneral={{
        badge: "Jadwal Tetap & Terpercaya",
        title: "Shuttle Service Lombok Terbaik",
        subtitle: "Nyaman, Tepat Waktu, Harga Terjangkau",
        description:
          "Layanan shuttle antar-kota di Lombok dengan armada modern dan supir berpengalaman. Tersedia berbagai rute populer setiap hari.",
        ctaPrimary: "Pesan Shuttle",
        ctaSecondary: "Lihat Jadwal",
      }}
      initialPackages={PACKAGES}
      initialFaqs={FAQS}
    />
  );
}

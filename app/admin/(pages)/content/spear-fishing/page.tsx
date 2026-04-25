import { Metadata } from "next";
import AdminContentTemplate, {
  ServicePackage,
  FaqEntry,
} from "@/app/components/admin/templates/AdminContentTemplate";

export const metadata: Metadata = { title: "Konten Spear Fishing – Admin Travelita" };

const PACKAGES: ServicePackage[] = [
  {
    id: "sf-1",
    name: "Paket Pemula",
    description: "Pengalaman spear fishing pertamamu bersama instruktur",
    price: "Rp 450.000 / orang",
    features: "Instruktur bersertifikat\nPeralatan lengkap\nDurasi 3 jam\nSnorkeling gratis",
    badge: "Cocok untuk Pemula",
    highlighted: false,
  },
  {
    id: "sf-2",
    name: "Paket Advanced",
    description: "Untuk yang sudah berpengalaman snorkeling",
    price: "Rp 700.000 / orang",
    features: "Spot terbaik Lombok\nSpeargun disediakan\nFoto & video bawah laut\nDurasi 5 jam\nMakan siang termasuk",
    badge: "Terlaris",
    highlighted: true,
  },
  {
    id: "sf-3",
    name: "Paket Private Profesional",
    description: "Sesi privat eksklusif untuk pengalaman maksimal",
    price: "Rp 1.500.000 / sesi",
    features: "1 guide khusus\nSpot rahasia\nWaktu fleksibel\nFoto & video HD\nMakan siang & hasil tangkapan dimasak",
    badge: "Eksklusif",
    highlighted: false,
  },
];

const FAQS: FaqEntry[] = [
  {
    id: "sff-1",
    question: "Apakah saya perlu pengalaman menyelam sebelumnya?",
    answer: "Tidak wajib. Paket Pemula dirancang untuk orang yang sama sekali belum berpengalaman. Instruktur kami akan membimbing dari awal.",
  },
  {
    id: "sff-2",
    question: "Apakah aman untuk anak-anak?",
    answer: "Spear fishing direkomendasikan untuk usia 14 tahun ke atas. Untuk anak di bawah 16 tahun harus didampingi orang tua.",
  },
  {
    id: "sff-3",
    question: "Apa yang harus dibawa?",
    answer: "Cukup bawa pakaian renang dan sunscreen reef-safe. Semua peralatan (masker, fins, speargun) sudah disediakan.",
  },
  {
    id: "sff-4",
    question: "Bagaimana jika cuaca buruk?",
    answer: "Aktivitas akan dijadwalkan ulang tanpa biaya tambahan jika kondisi cuaca tidak memungkinkan untuk keselamatan.",
  },
];

export default function SpearFishingContentPage() {
  return (
    <AdminContentTemplate
      serviceTitle="Spear Fishing"
      serviceIcon="🤿"
      breadcrumb="Kelola Konten"
      initialGeneral={{
        badge: "Petualangan Bawah Laut Lombok",
        title: "Spear Fishing Terbaik di Lombok",
        subtitle: "Rasakan Sensasi Berburu Ikan di Laut Biru Lombok",
        description:
          "Pengalaman spear fishing tak terlupakan di perairan jernih Lombok bersama instruktur bersertifikat. Cocok untuk pemula hingga profesional.",
        ctaPrimary: "Booking Sekarang",
        ctaSecondary: "Lihat Paket",
      }}
      initialPackages={PACKAGES}
      initialFaqs={FAQS}
    />
  );
}

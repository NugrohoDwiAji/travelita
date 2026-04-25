import { Metadata } from "next";
import AdminContentTemplate, {
  ServicePackage,
  FaqEntry,
} from "@/app/components/admin/templates/AdminContentTemplate";

export const metadata: Metadata = { title: "Konten Private Car – Admin Travelita" };

const PACKAGES: ServicePackage[] = [
  {
    id: "pc-1",
    name: "Half Day (4 Jam)",
    description: "Sewa mobil privat untuk perjalanan setengah hari",
    price: "Mulai Rp 350.000",
    features: "Bebas tujuan dalam kota\nSupir + BBM termasuk\nAC & nyaman\nMaksimal 6 penumpang",
    badge: "Populer",
    highlighted: false,
  },
  {
    id: "pc-2",
    name: "Full Day (8 Jam)",
    description: "Sewa mobil privat seharian penuh",
    price: "Mulai Rp 600.000",
    features: "Bebas tujuan wisata\nSupir berpengalaman\nBBM termasuk\nParking fee tidak termasuk",
    badge: "Terlaris",
    highlighted: true,
  },
  {
    id: "pc-3",
    name: "Antar Jemput Airport",
    description: "Layanan khusus dari / ke bandara",
    price: "Rp 200.000 / trip",
    features: "Tepat waktu\nBantuan bagasi\nFlight tracking\nSupir siap 24 jam",
    badge: "",
    highlighted: false,
  },
];

const FAQS: FaqEntry[] = [
  {
    id: "pf-1",
    question: "Apakah bisa sewa lebih dari 8 jam?",
    answer: "Bisa, biaya lembur Rp 60.000 per jam setelah durasi sewa habis.",
  },
  {
    id: "pf-2",
    question: "Apakah supir mengerti rute wisata Lombok?",
    answer: "Ya, semua supir kami adalah warga lokal yang hafal rute wisata dan dapat memberikan rekomendasi destinasi.",
  },
  {
    id: "pf-3",
    question: "Jenis kendaraan apa yang tersedia?",
    answer: "Kami menyediakan Avanza, Xenia, Innova, dan Alphard untuk kebutuhan privat maupun keluarga.",
  },
];

export default function PrivateCarContentPage() {
  return (
    <AdminContentTemplate
      serviceTitle="Private Car"
      serviceIcon="🚗"
      breadcrumb="Kelola Konten"
      initialGeneral={{
        badge: "Armada Lengkap & Terpercaya",
        title: "Sewa Mobil Private di Lombok",
        subtitle: "Fleksibel, Nyaman, Harga Transparan",
        description:
          "Nikmati kebebasan berkeliling Lombok dengan mobil privat berpengemudi. Tersedia berbagai pilihan armada untuk grup kecil hingga keluarga besar.",
        ctaPrimary: "Pesan Sekarang",
        ctaSecondary: "Lihat Armada",
      }}
      initialPackages={PACKAGES}
      initialFaqs={FAQS}
    />
  );
}

import { Metadata } from "next";
import AdminContentTemplate, {
  ServicePackage,
  FaqEntry,
} from "@/app/components/templates/AdminContentTemplate/AdminContentTemplate";

export const metadata: Metadata = { title: "Konten Ticketing – Admin Travelita" };

const PACKAGES: ServicePackage[] = [
  {
    id: "tk-1",
    name: "Tiket Pesawat Economy",
    description: "Pemesanan tiket pesawat kelas ekonomi semua maskapai",
    price: "Sesuai tarif maskapai",
    features: "Semua maskapai domestik\nKonfirmasi instan\nE-Ticket via email/WA\nCheck-in online assist",
    badge: "Terlaris",
    highlighted: true,
  },
  {
    id: "tk-2",
    name: "Tiket Pesawat Business",
    description: "Pemesanan tiket pesawat kelas bisnis",
    price: "Sesuai tarif maskapai",
    features: "Maskapai premium\nAkses lounge\nBagasi ekstra\nPriority boarding",
    badge: "Premium",
    highlighted: false,
  },
  {
    id: "tk-3",
    name: "Tiket Bus Antar Kota",
    description: "Tiket bus AKAP untuk rute antar provinsi",
    price: "Mulai Rp 80.000",
    features: "Berbagai PO bus\nKursi AC & non-AC\nPemesanan mudah\nTiket dikirim ke WA",
    badge: "",
    highlighted: false,
  },
  {
    id: "tk-4",
    name: "Tiket Kapal Ferry",
    description: "Tiket penyeberangan ferry reguler dan cepat",
    price: "Mulai Rp 50.000",
    features: "Rute Bali–Lombok PP\nFerry cepat (speedboat)\nKelas ekonomi & VIP\nTepat jadwal",
    badge: "",
    highlighted: false,
  },
];

const FAQS: FaqEntry[] = [
  {
    id: "tf-1",
    question: "Berapa lama proses konfirmasi tiket?",
    answer: "Tiket pesawat dan ferry dikonfirmasi dalam 15–30 menit setelah pembayaran. Bus AKAP dalam 1 jam.",
  },
  {
    id: "tf-2",
    question: "Apakah bisa reschedule atau refund?",
    answer: "Kebijakan reschedule dan refund mengikuti aturan maskapai/operator masing-masing. Kami membantu prosesnya.",
  },
  {
    id: "tf-3",
    question: "Metode pembayaran apa yang diterima?",
    answer: "Transfer bank (BCA, BRI, Mandiri), GoPay, OVO, DANA, dan kartu kredit/debit.",
  },
];

export default function TicketingContentPage() {
  return (
    <AdminContentTemplate
      serviceTitle="Ticketing"
      serviceIcon="🎫"
      breadcrumb="Kelola Konten"
      initialGeneral={{
        badge: "Semua Moda Transportasi",
        title: "Pesan Tiket Perjalanan Mudah",
        subtitle: "Pesawat, Bus, dan Ferry dalam Satu Platform",
        description:
          "Layanan pemesanan tiket terlengkap untuk semua moda transportasi. Proses cepat, konfirmasi instan, dan harga terbaik.",
        ctaPrimary: "Cari Tiket",
        ctaSecondary: "Lihat Jadwal",
      }}
      initialPackages={PACKAGES}
      initialFaqs={FAQS}
    />
  );
}

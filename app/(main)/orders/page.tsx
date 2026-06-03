import OrderBookingTemplate from "@/app/components/templates/orderBookingTemplate"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pesanan Saya - Travelita",
  description: "Lihat dan kelola pesanan perjalanan Anda dengan mudah di Travelita. Cek status, detail, dan riwayat pemesanan Anda dalam satu tempat.",
};

export default function page() {
  return <OrderBookingTemplate />;
}

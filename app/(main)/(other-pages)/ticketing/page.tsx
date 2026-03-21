import { Metadata } from "next";
import TicketingTemplate from "@/app/components/templates/TicketingTemplate/TicketingTemplate";

export const metadata: Metadata = {
  title: "Ticketing  Travelita",
  description: "Pesan tiket pesawat, kereta, bus, dan ferry dengan harga terbaik. Konfirmasi instan dan e-tiket langsung ke email Anda.",
};

export default function TicketingPage() {
  return <TicketingTemplate />;
}

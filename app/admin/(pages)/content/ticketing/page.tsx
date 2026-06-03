import { Metadata } from "next";
import AdminTicketingContent from "@/app/components/admin/organism/AdminTicketingContent";

export const metadata: Metadata = { title: "Konten Ticketing – Admin Travelita" };

export default function TicketingContentPage() {
  return <AdminTicketingContent />;
}

import { Metadata } from "next";
import AdminShuttleContent from "@/app/components/admin/organism/AdminShuttleContent";

export const metadata: Metadata = { title: "Konten Shuttle Service – Admin Travelita" };

export default function ShuttleServiceContentPage() {
  return <AdminShuttleContent />;
}

import { Metadata } from "next";
import AdminSpearFishingContent from "@/app/components/admin/organism/AdminSpearFishingContent";

export const metadata: Metadata = { title: "Konten Spear Fishing – Admin Travelita" };

export default function SpearFishingContentPage() {
  return <AdminSpearFishingContent />;
}

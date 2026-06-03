import { Metadata } from "next";
import AdminPrivateCarContent from "@/app/components/admin/organism/AdminPrivateCarContent";

export const metadata: Metadata = { title: "Konten Private Car – Admin Travelita" };

export default function PrivateCarContentPage() {
  return <AdminPrivateCarContent />;
}

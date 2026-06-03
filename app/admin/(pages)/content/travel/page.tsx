import { Metadata } from "next";
import AdminTravelContent from "@/app/components/admin/organism/AdminTravelContent";

export const metadata: Metadata = { title: "Konten Wisata Travel – Admin Travelita" };

export default function TravelContentPage() {
  return <AdminTravelContent />;
}

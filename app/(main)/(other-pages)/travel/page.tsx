import { Metadata } from "next";
import TravelTemplate from "@/app/components/templates/TravelTemplate";
import { getContent } from "@/app/actions/content";

export const metadata: Metadata = {
  title: "Paket Wisata Bali-Nusra - Travelita",
  description:
    "Temukan paket wisata terbaik di Bali, NTB, dan NTT. Guide lokal berpengalaman, harga terjangkau, dan destinasi terkurasi.",
};

export default async function TravelPage() {
  const { data: content } = await getContent("TRIP");
  return <TravelTemplate content={content ?? undefined} />;
}


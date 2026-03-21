import { Metadata } from "next";
import TravelTemplate from "@/app/components/templates/TravelTemplate/TravelTemplate";

export const metadata: Metadata = {
  title: "Paket Wisata Lombok – Travelita",
  description:
    "Temukan paket wisata terbaik ke Lombok — Gili Islands, Gunung Rinjani, Pantai Kuta, dan destinasi eksotis lainnya. Guide lokal berpengalaman, harga terjangkau.",
};

export default function TravelPage() {
  return <TravelTemplate />;
}

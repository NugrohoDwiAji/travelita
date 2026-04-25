import { Metadata } from "next";
import PrivateCarTemplate from "@/app/components/templates/PrivateCarTemplate";

export const metadata: Metadata = {
  title: "Private Car  Travelita",
  description: "Sewa mobil dengan sopir profesional. Dalam kota, antar kota, dan airport transfer bersama Travelita.",
};

export default function PrivateCarPage() {
  return <PrivateCarTemplate />;
}

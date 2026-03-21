import { Metadata } from "next";
import ShuttleServiceTemplate from "@/app/components/templates/ShuttleServiceTemplate/ShuttleServiceTemplate";

export const metadata: Metadata = {
  title: "Shuttle Service  Travelita",
  description: "Layanan shuttle antar kota nyaman, tepat waktu, dan terjangkau bersama Travelita.",
};

export default function ShuttleServicePage() {
  return <ShuttleServiceTemplate />;
}

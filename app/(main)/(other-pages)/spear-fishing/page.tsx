import { Metadata } from "next";
import SpearFishingTemplate from "@/app/components/templates/SpearFishingTemplate/SpearFishingTemplate";

export const metadata: Metadata = {
  title: "Spear Fishing Adventure – Travelita",
  description:
    "Trip spear fishing di spot terbaik Indonesia — Raja Ampat, Wakatobi, Nusa Penida, dan lainnya. Dipandu instruktur bersertifikat AIDA, peralatan lengkap tersedia.",
};

export default function SpearFishingPage() {
  return <SpearFishingTemplate />;
}

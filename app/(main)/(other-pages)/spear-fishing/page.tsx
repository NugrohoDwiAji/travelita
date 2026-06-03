import { Metadata } from "next";
import { BookingType } from "@prisma/client";
import SpearFishingTemplate from "@/app/components/templates/SpearFishingTemplate";
import { getContent, getServiceSpots } from "@/app/actions/content";

export const metadata: Metadata = {
  title: "Spear Fishing Adventure – Travelita",
  description:
    "Trip spear fishing di spot terbaik Bali-Nusra seperti Nusa Penida, Gili, Komodo, dan Alor. Dipandu instruktur berpengalaman, peralatan lengkap tersedia.",
};

export default async function SpearFishingPage() {
  const [contentResult, spotsResult] = await Promise.all([
    getContent(BookingType.SPEAR_CAR),
    getServiceSpots(BookingType.SPEAR_CAR),
  ]);

  const spots = spotsResult.data?.map((spot) => ({
    name: spot.name,
    region: spot.region,
    depth: spot.depth,
    price: `Rp ${Math.round(spot.price).toLocaleString("id-ID")}`,
    fish: spot.fish ?? undefined,
    level: spot.level ?? undefined,
    tag: spot.tag ?? undefined,
    isBestSeller: spot.isBestSeller,
  })) ?? [];

  return (
    <SpearFishingTemplate
      content={contentResult.data ?? undefined}
      spots={spots}
    />
  );
}

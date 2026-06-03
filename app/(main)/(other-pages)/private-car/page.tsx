import { Metadata } from "next";
import PrivateCarTemplate from "@/app/components/templates/PrivateCarTemplate";
import { getContent, getPrivateCarPricing } from "@/app/actions/content";

export const metadata: Metadata = {
  title: "Private Car  Travelita",
  description: "Sewa mobil dengan sopir profesional. Dalam kota, antar kota, dan airport transfer bersama Travelita.",
};

export default async function PrivateCarPage() {
  const [contentResult, pricingResult] = await Promise.all([
    getContent("PRIVATE_CAR"),
    getPrivateCarPricing(),
  ]);

  return (
    <PrivateCarTemplate
      content={contentResult.data ?? undefined}
      pricing={pricingResult.success ? pricingResult.data : undefined}
    />
  );
}

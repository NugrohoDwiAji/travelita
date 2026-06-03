import { ContentInput } from "@/app/actions/content";
import type { TourPackageCardProps } from "@/app/components/moleculs/TourPackageCard";
import type { PackageCardProps } from "@/app/components/moleculs/PackageCard";

const TRAVEL_ICONS = ["🏝️", "🏔️", "🌅", "🏺", "💧", "🌊", "🌴", "🚤"];
const PACKAGE_ICONS = ["🚗", "🧭", "⛵", "🎣", "🧳", "🏝️", "🏕️", "🌊"];

export function parseFeatureLines(features: string) {
  return features
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/,00$/, "");
}

function getDuration(description?: string | null) {
  if (!description) return "1 Hari";
  const match = description.match(/(\d+\s*(Hari|hari|H|h|Jam|jam|M|m))/);
  return match ? match[0] : "1 Hari";
}

function getDestinations(description?: string | null) {
  if (!description) return ["Destinasi pilihan"];
  const parts = description
    .split(/[.,]/)
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.length ? parts.slice(0, 3) : ["Destinasi pilihan"];
}

export function toTourPackageCardProps(
  pkg: ContentInput["packages"][number],
  index: number,
): Omit<TourPackageCardProps, "href"> {
  const features = parseFeatureLines(pkg.features);

  return {
    name: pkg.name,
    duration: getDuration(pkg.description),
    price: formatRupiah(pkg.price),
    image: TRAVEL_ICONS[index % TRAVEL_ICONS.length],
    badge: pkg.badge ?? undefined,
    highlight: pkg.highlighted ?? false,
    rating: 4.8 + ((index % 3) * 0.05),
    reviewCount: 120 + index * 32,
    destinations: getDestinations(pkg.description),
    inclusions: features.map((text) => ({ text, included: true })),
  };
}

export function toPackageCardProps(
  pkg: ContentInput["packages"][number],
  index: number,
): Omit<PackageCardProps, "href"> {
  return {
    name: pkg.name,
    level: pkg.description ?? "Detail Paket",
    price: formatRupiah(pkg.price),
    priceNote: "/ orang",
    features: parseFeatureLines(pkg.features).map((text) => ({ text })),
    badge: pkg.badge ?? undefined,
    highlight: pkg.highlighted ?? false,
    icon: PACKAGE_ICONS[index % PACKAGE_ICONS.length],
  };
}

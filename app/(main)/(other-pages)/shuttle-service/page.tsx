import { Metadata } from "next";
import ShuttleServiceTemplate from "@/app/components/templates/ShuttleServiceTemplate";
import { getContent, getServiceRoutes } from "@/app/actions/content";

export const metadata: Metadata = {
  title: "Shuttle Service  Travelita",
  description: "Layanan shuttle antar kota nyaman, tepat waktu, dan terjangkau bersama Travelita.",
};

export default async function ShuttleServicePage() {
  const [contentResult, routesResult] = await Promise.all([
    getContent("SHUTTLE"),
    getServiceRoutes("SHUTTLE"),
  ]);

  const routes = routesResult.data?.map(r => ({
    from: r.from,
    to: r.to,
    duration: r.duration,
    price: `Rp ${Math.round(r.price).toLocaleString("id-ID")}`,
    tag: r.tag,
  })) ?? undefined;

  return <ShuttleServiceTemplate content={contentResult.data ?? undefined} routes={routes} />;
}

import { Metadata } from "next";
import TicketingTemplate from "@/app/components/templates/TicketingTemplate";
import { getContent, getServiceRoutes } from "@/app/actions/content";

export const metadata: Metadata = {
  title: "Ticketing  Travelita",
  description: "Pesan tiket pesawat, kereta, bus, dan ferry dengan harga terbaik. Konfirmasi instan dan e-tiket langsung ke email Anda.",
};

export default async function TicketingPage() {
  const [contentResult, routesResult] = await Promise.all([
    getContent("TICKET"),
    getServiceRoutes("TICKET"),
  ]);

  const routes = routesResult.data?.map(r => ({
    from: r.from,
    to: r.to,
    duration: r.duration,
    price: `Rp ${Math.round(r.price).toLocaleString("id-ID")}`,
    tag: r.tag,
    type: r.type,
    icon: r.icon,
  })) ?? undefined;

  return <TicketingTemplate content={contentResult.data ?? undefined} routes={routes} />;
}

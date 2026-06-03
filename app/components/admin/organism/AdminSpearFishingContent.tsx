"use client";

import { useEffect, useState } from "react";
import AdminContentTemplate, {
  type GeneralInfo,
  type ServicePackage,
  type FaqEntry,
  type ServiceRoute,
  type ServiceSpot,
} from "@/app/components/admin/templates/AdminContentTemplate";
import { getServiceContent, getServiceRoutes, getServiceSpots } from "@/app/actions/content";
import { BookingType } from "@prisma/client";

export default function AdminSpearFishingContent() {
  const [general, setGeneral] = useState<Partial<GeneralInfo>>({});
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [faqs, setFaqs] = useState<FaqEntry[]>([]);
  const [routes, setRoutes] = useState<ServiceRoute[]>([]);
  const [spots, setSpots] = useState<ServiceSpot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getServiceContent(BookingType.SPEAR_CAR),
      getServiceRoutes(BookingType.SPEAR_CAR),
      getServiceSpots(BookingType.SPEAR_CAR),
    ]).then(([contentRes, routesRes, spotsRes]) => {
      const data = contentRes.data;
      if (data) {
        setGeneral({
          badge: data.badge || "",
          title: data.title,
          subtitle: data.subtitle || "",
          description: data.description,
          ctaPrimary: data.ctaPrimary || "",
          ctaSecondary: data.ctaSecondary || "",
        });
        if (data.packages?.length) {
          setPackages(data.packages.map((p) => ({
            ...p,
            price: p.price.toString(),
            badge: p.badge || "",
            description: p.description || "",
          })));
        }
        if (data.faqs?.length) setFaqs(data.faqs);
      }
      if (routesRes.success && routesRes.data) {
        setRoutes(routesRes.data.map((r) => ({
          ...r,
          price: r.price.toString(),
          tag: r.tag || "",
          type: r.type || "",
          icon: r.icon || "",
        })));
      }
      if (spotsRes.success && spotsRes.data) {
        setSpots(spotsRes.data.map((spot) => ({
          ...spot,
          price: spot.price.toString(),
          fish: spot.fish || "",
          level: spot.level || "",
          tag: spot.tag || "",
        })));
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="p-6 lg:p-8" style={{ background: "#f5f6fb", minHeight: "100vh" }}>
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1434A4] border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <AdminContentTemplate
      serviceType={BookingType.SPEAR_CAR}
      serviceTitle="Spear Fishing"
      serviceIcon="🤿"
      breadcrumb="Kelola Konten"
      initialGeneral={general}
      initialPackages={packages}
      initialFaqs={faqs}
      initialRoutes={routes}
      initialSpots={spots}
      showRoutesTab={false}
      showSpotsTab={true}
    />
  );
}

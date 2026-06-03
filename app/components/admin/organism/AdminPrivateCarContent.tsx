"use client";

import { useEffect, useState } from "react";
import AdminContentTemplate, {
  type GeneralInfo,
  type ServicePackage,
  type FaqEntry,
} from "@/app/components/admin/templates/AdminContentTemplate";
import { getServiceContent, getPrivateCarPricing } from "@/app/actions/content";
import { BookingType } from "@prisma/client";
import {
  DEFAULT_PRICING,
  type PrivateCarPricing,
} from "@/app/components/admin/moleculs/AdminPrivateCarPricingTab";

export default function AdminPrivateCarContent() {
  const [general, setGeneral] = useState<Partial<GeneralInfo>>({});
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [faqs, setFaqs] = useState<FaqEntry[]>([]);
  const [pricing, setPricing] = useState<PrivateCarPricing>(DEFAULT_PRICING);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getServiceContent(BookingType.PRIVATE_CAR),
      getPrivateCarPricing(),
    ]).then(([contentRes, pricingRes]) => {
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
      if (pricingRes.success && pricingRes.data) {
        setPricing(pricingRes.data);
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
      serviceType={BookingType.PRIVATE_CAR}
      serviceTitle="Private Car"
      serviceIcon="🚗"
      breadcrumb="Kelola Konten"
      initialGeneral={general}
      initialPackages={packages}
      initialFaqs={faqs}
      initialRoutes={[]}
      showRoutesTab={false}
      showPricingTab={true}
      initialPricing={pricing}
    />
  );
}

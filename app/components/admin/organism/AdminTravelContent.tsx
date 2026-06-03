"use client";

import { useEffect, useState } from "react";
import AdminContentTemplate, {
  type GeneralInfo,
  type ServicePackage,
  type FaqEntry,
} from "@/app/components/admin/templates/AdminContentTemplate";
import { getServiceContent } from "@/app/actions/content";

export default function AdminTravelContent() {
  const [general, setGeneral] = useState<Partial<GeneralInfo>>({});
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [faqs, setFaqs] = useState<FaqEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServiceContent("TRIP").then((res) => {
      const data = res.data;
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
      serviceType="TRIP"
      serviceTitle="Wisata Travel"
      serviceIcon="🗺️"
      breadcrumb="Kelola Konten"
      initialGeneral={general}
      initialPackages={packages}
      initialFaqs={faqs}
      initialRoutes={[]}
    />
  );
}

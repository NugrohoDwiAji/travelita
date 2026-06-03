"use client";

import { useState, useTransition } from "react";
import { BookingType } from "@prisma/client";
import { updateServiceContent, updateServiceRoutes, updateServiceSpots, updatePrivateCarPricing, type ContentInput, type RouteInput, type SpotInput } from "@/app/actions/content";

/* ─── Molecules ──────────────────────────────────────────── */
import AdminTabBar from "@/app/components/admin/moleculs/AdminTabBar";
import AdminSavedToast from "@/app/components/admin/moleculs/AdminSavedToast";
import AdminGeneralTab from "@/app/components/admin/moleculs/AdminGeneralTab";
import AdminPackagesTab from "@/app/components/admin/moleculs/AdminPackagesTab";
import AdminFaqTab from "@/app/components/admin/moleculs/AdminFaqTab";
import AdminRoutesTab from "@/app/components/admin/moleculs/AdminRoutesTab";
import AdminSpotsTab from "@/app/components/admin/moleculs/AdminSpotsTab";
import AdminPrivateCarPricingTab, {
  type PrivateCarPricing,
  DEFAULT_PRICING,
} from "@/app/components/admin/moleculs/AdminPrivateCarPricingTab";

/* ─── Types ──────────────────────────────────────────────── */
export interface GeneralInfo {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string;
  badge: string;
  highlighted: boolean;
}

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

export interface ServiceRoute {
  id: string;
  from: string;
  to: string;
  duration: string;
  price: string;
  tag: string;
  type?: string;
  icon?: string;
  order: number;
}

export interface ServiceSpot {
  id: string;
  name: string;
  region: string;
  depth: string;
  price: string;
  fish: string;
  level: string;
  tag: string;
  order: number;
  isBestSeller: boolean;
}

export interface AdminContentTemplateProps {
  serviceType: BookingType;
  serviceTitle: string;
  serviceIcon: string;
  breadcrumb?: string;
  initialGeneral?: Partial<GeneralInfo>;
  initialPackages?: ServicePackage[];
  initialFaqs?: FaqEntry[];
  initialRoutes?: ServiceRoute[];
  initialSpots?: ServiceSpot[];
  showRoutesTab?: boolean;
  showSpotsTab?: boolean;
  showPricingTab?: boolean;
  initialPricing?: PrivateCarPricing;
}

type Tab = "general" | "packages" | "faq" | "routes" | "spots" | "pricing";

/* ─── Defaults ───────────────────────────────────────────── */
const DEFAULT_GENERAL: GeneralInfo = {
  badge: "",
  title: "",
  subtitle: "",
  description: "",
  ctaPrimary: "Pesan Sekarang",
  ctaSecondary: "Pelajari Lebih Lanjut",
};

/* ─── Main Template ──────────────────────────────────────── */
export default function AdminContentTemplate({
  serviceType,
  serviceTitle,
  serviceIcon,
  breadcrumb = "Kelola Konten",
  initialGeneral,
  initialPackages = [],
  initialFaqs = [],
  initialRoutes = [],
  initialSpots = [],
  showRoutesTab = true,
  showSpotsTab = false,
  showPricingTab = false,
  initialPricing,
}: AdminContentTemplateProps) {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState<Tab>("general");
  const [general, setGeneral] = useState<GeneralInfo>({ ...DEFAULT_GENERAL, ...initialGeneral });
  const [packages, setPackages] = useState<ServicePackage[]>(initialPackages);
  const [faqs, setFaqs] = useState<FaqEntry[]>(initialFaqs);
  const [routes, setRoutes] = useState<ServiceRoute[]>(initialRoutes);
  const [spots, setSpots] = useState<ServiceSpot[]>(initialSpots);
  const [pricing, setPricing] = useState<PrivateCarPricing>(
    initialPricing ?? DEFAULT_PRICING
  );
  const [savedVisible, setSavedVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSave = () => {
    setErrorMessage(null);

    if (tab === "routes") {
      const payload: RouteInput[] = routes.map((r) => ({
        id: r.id.length === 7 ? undefined : r.id,
        from: r.from,
        to: r.to,
        duration: r.duration,
        price: typeof r.price === "string" ? Number(r.price.replace(/[^0-9.-]+/g, "")) : r.price,
        tag: r.tag || null,
        type: r.type || null,
        icon: r.icon || null,
        order: r.order,
      }));

      startTransition(async () => {
        const result = await updateServiceRoutes(serviceType, payload);
        if (result.success) {
          setSavedVisible(true);
          setTimeout(() => setSavedVisible(false), 2500);
          if (result.data) {
            setRoutes(result.data.map((r) => ({
              ...r,
              price: r.price.toString(),
              tag: r.tag || "",
              type: r.type || "",
              icon: r.icon || "",
            })));
          }
        } else {
          setErrorMessage(result.error || "Gagal menyimpan rute.");
        }
      });
      return;
    }

    if (tab === "pricing") {
      startTransition(async () => {
        const result = await updatePrivateCarPricing(pricing);
        if (result.success) {
          setSavedVisible(true);
          setTimeout(() => setSavedVisible(false), 2500);
          if (result.data) {
            setPricing(result.data);
          }
        } else {
          setErrorMessage(result.error || "Gagal menyimpan harga.");
        }
      });
      return;
    }

    if (tab === "spots") {
      const payload: SpotInput[] = spots.map((spot) => ({
        id: spot.id.length === 7 ? undefined : spot.id,
        name: spot.name,
        region: spot.region,
        depth: spot.depth,
        price: typeof spot.price === "string" ? Number(spot.price.replace(/[^0-9.-]+/g, "")) : spot.price,
        fish: spot.fish || null,
        level: spot.level || null,
        tag: spot.tag || null,
        order: spot.order,
        isBestSeller: spot.isBestSeller,
      }));

      startTransition(async () => {
        const result = await updateServiceSpots(serviceType, payload);
        if (result.success) {
          setSavedVisible(true);
          setTimeout(() => setSavedVisible(false), 2500);
          if (result.data) {
            setSpots(result.data.map((spot) => ({
              ...spot,
              price: spot.price.toString(),
              fish: spot.fish || "",
              level: spot.level || "",
              tag: spot.tag || "",
            })));
          }
        } else {
          setErrorMessage(result.error || "Gagal menyimpan spot.");
        }
      });
      return;
    }

    const payload: ContentInput = {
      ...general,
      packages: packages.map((p) => ({
        ...p,
        id: p.id.length === 7 ? undefined : p.id,
        price: typeof p.price === "string" ? Number(p.price.replace(/[^0-9.-]+/g, "")) : p.price,
      })),
      faqs: faqs.map((f) => ({
        ...f,
        id: f.id.length === 7 ? undefined : f.id,
      })),
    };

    startTransition(async () => {
      const result = await updateServiceContent(serviceType, payload);
      if (result.success) {
        setSavedVisible(true);
        setTimeout(() => setSavedVisible(false), 2500);
        if (result.data) {
          const data = result.data as {
            packages?: Array<Omit<ServicePackage, "price"> & { price: number }>;
            faqs?: FaqEntry[];
          };
          if (data.packages) {
            setPackages(data.packages.map((p) => ({ ...p, price: p.price.toString() })));
          }
          if (data.faqs) {
            setFaqs(data.faqs);
          }
        }
      } else {
        setErrorMessage(result.error || "Gagal menyimpan perubahan.");
      }
    });
  };

  const tabs = [
    { key: "general", label: "Informasi Umum" },
    { key: "packages", label: "Paket & Penawaran", count: packages.length },
    { key: "faq", label: "FAQ", count: faqs.length },
    ...(showRoutesTab ? [{ key: "routes", label: "Biaya Rute", count: routes.length }] : []),
    ...(showSpotsTab ? [{ key: "spots", label: "Spot", count: spots.length }] : []),
    ...(showPricingTab ? [{ key: "pricing", label: "Harga Sewa" }] : []),
  ];

  return (
    <div className="p-6 lg:p-8" style={{ background: "#f5f6fb", minHeight: "100vh" }}>
      {/* Page header */}
      <div className="mb-6">
        <p className="text-xs font-semibold mb-1" style={{ color: "#4050b5" }}>
          {breadcrumb}
        </p>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{serviceIcon}</span>
          <h1 className="text-2xl font-extrabold" style={{ color: "#0d2280" }}>
            Konten {serviceTitle}
          </h1>
        </div>
        <p className="mt-1 text-sm" style={{ color: "#6b7280" }}>
          Kelola informasi, paket, dan FAQ yang ditampilkan pada halaman layanan.
        </p>
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600 border border-red-100 flex items-center justify-between">
          <span>⚠️ {errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="text-red-400 hover:text-red-600">×</button>
        </div>
      )}

      {/* Tab bar */}
      <AdminTabBar tabs={tabs} activeTab={tab} onTabChange={(k) => setTab(k as Tab)} disabled={isPending} />

      {/* Tab content */}
      <div
        className="rounded-2xl p-6"
        style={{ background: "#fff", boxShadow: "0 2px 16px rgba(20,52,164,0.07)" }}
      >
        {tab === "general" && (
          <AdminGeneralTab data={general} onChange={setGeneral} onSave={handleSave} loading={isPending} />
        )}
        {tab === "packages" && (
          <AdminPackagesTab packages={packages} onChange={setPackages} onSave={handleSave} loading={isPending} />
        )}
        {tab === "faq" && (
          <AdminFaqTab faqs={faqs} onChange={setFaqs} onSave={handleSave} loading={isPending} />
        )}
        {tab === "routes" && (
          <AdminRoutesTab routes={routes} onChange={setRoutes} onSave={handleSave} loading={isPending} />
        )}
        {tab === "spots" && (
          <AdminSpotsTab spots={spots} onChange={setSpots} onSave={handleSave} loading={isPending} />
        )}
        {tab === "pricing" && (
          <AdminPrivateCarPricingTab pricing={pricing} onChange={setPricing} onSave={handleSave} loading={isPending} />
        )}
      </div>

      <AdminSavedToast visible={savedVisible} />
    </div>
  );
}

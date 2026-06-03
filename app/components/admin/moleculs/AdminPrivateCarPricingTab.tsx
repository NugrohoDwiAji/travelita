"use client";

import AdminField, { inputCls, inputStyle } from "./AdminField";
import AdminSaveButton from "./AdminSaveButton";

export interface PrivateCarPricing {
  basePrice: number;
  fullDayMultiplier: number;
}

const DEFAULT_PRICING: PrivateCarPricing = {
  basePrice: 350000,
  fullDayMultiplier: 1.8,
};

export { DEFAULT_PRICING };

export default function AdminPrivateCarPricingTab({
  pricing,
  onChange,
  onSave,
  loading,
}: {
  pricing: PrivateCarPricing;
  onChange: (p: PrivateCarPricing) => void;
  onSave: () => void;
  loading?: boolean;
}) {
  const updateBasePrice = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num >= 0) {
      onChange({ ...pricing, basePrice: num });
    }
  };

  const updateMultiplier = (value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num) && num > 0) {
      onChange({ ...pricing, fullDayMultiplier: num });
    }
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

  const fullDayPrice = Math.round(pricing.basePrice * pricing.fullDayMultiplier);

  return (
    <div className="flex flex-col gap-6">
      {/* Base Price */}
      <div
        className="rounded-2xl border p-5"
        style={{ borderColor: "rgba(20,52,164,0.12)", background: "rgba(20,52,164,0.02)" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🚐</span>
          <h3 className="text-sm font-bold" style={{ color: "#0d2280" }}>
            Harga Dasar (MPV)
          </h3>
        </div>
        <AdminField label="Harga Dasar per 12 Jam">
          <input
            type="number"
            min="0"
            step="10000"
            className={inputCls}
            style={inputStyle}
            value={pricing.basePrice}
            onChange={(e) => updateBasePrice(e.target.value)}
            placeholder="cth: 350000"
          />
          <p className="mt-1.5 text-[11px]" style={{ color: "#6b7280" }}>
            Harga untuk durasi 12 jam (standar)
          </p>
        </AdminField>
      </div>

      {/* Full Day Multiplier */}
      <div
        className="rounded-2xl border p-5"
        style={{ borderColor: "rgba(20,52,164,0.12)", background: "rgba(20,52,164,0.02)" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">⏱️</span>
          <h3 className="text-sm font-bold" style={{ color: "#0d2280" }}>
            Pengaturan Durasi
          </h3>
        </div>
        <AdminField label="Multiplier Full Day (24 Jam)">
          <input
            type="number"
            step="0.1"
            min="1"
            className={inputCls}
            style={inputStyle}
            value={pricing.fullDayMultiplier}
            onChange={(e) => updateMultiplier(e.target.value)}
            placeholder="cth: 1.8"
          />
          <p className="mt-1.5 text-[11px]" style={{ color: "#6b7280" }}>
            Harga Full Day = Harga Dasar × Multiplier ini
          </p>
        </AdminField>
      </div>

      {/* Preview */}
      <div
        className="rounded-2xl border p-5"
        style={{ borderColor: "rgba(20,52,164,0.12)", background: "#fff" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">💰</span>
          <h3 className="text-sm font-bold" style={{ color: "#0d2280" }}>
            Preview Harga
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            className="rounded-xl p-4"
            style={{ background: "rgba(20,52,164,0.04)", border: "1px solid rgba(20,52,164,0.10)" }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "#4050b5" }}>
              Full Day (24 Jam)
            </p>
            <p className="text-xl font-extrabold" style={{ color: "#1434A4" }}>
              {formatCurrency(fullDayPrice)}
            </p>
            <p className="text-[11px] mt-1" style={{ color: "#6b7280" }}>
              {formatCurrency(pricing.basePrice)} × {pricing.fullDayMultiplier}
            </p>
          </div>
          <div
            className="rounded-xl p-4"
            style={{ background: "rgba(20,52,164,0.04)", border: "1px solid rgba(20,52,164,0.10)" }}
          >
            <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "#4050b5" }}>
              Multi-hari (per hari)
            </p>
            <p className="text-xl font-extrabold" style={{ color: "#1434A4" }}>
              {formatCurrency(pricing.basePrice)}/hari
            </p>
            <p className="text-[11px] mt-1" style={{ color: "#6b7280" }}>
              Contoh 3 hari = {formatCurrency(pricing.basePrice * 3)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <AdminSaveButton onClick={onSave} loading={loading} />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { IconPlus, IconTrash, IconEdit } from "@/app/components/admin/atoms/AdminIcons";
import AdminField, { inputCls, inputStyle } from "./AdminField";
import AdminSaveButton from "./AdminSaveButton";
import type { ServiceSpot } from "@/app/components/admin/templates/AdminContentTemplate";

const uid = () => Math.random().toString(36).slice(2, 9);

export default function AdminSpotsTab({
  spots,
  onChange,
  onSave,
  loading,
}: {
  spots: ServiceSpot[];
  onChange: (spots: ServiceSpot[]) => void;
  onSave: () => void;
  loading?: boolean;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const update = (id: string, patch: Partial<ServiceSpot>) =>
    onChange(spots.map((spot) => (spot.id === id ? { ...spot, ...patch } : spot)));

  const remove = (id: string) => {
    onChange(spots.filter((spot) => spot.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const addNew = () => {
    const id = uid();
    onChange([
      ...spots,
      {
        id,
        name: "",
        region: "",
        depth: "",
        price: "",
        fish: "",
        level: "",
        tag: "",
        order: spots.length,
        isBestSeller: false,
      },
    ]);
    setEditingId(id);
  };

  return (
    <div className="flex flex-col gap-4">
      {spots.length === 0 && (
        <p className="text-sm text-center py-8" style={{ color: "#9ca3af" }}>
          Belum ada spot. Klik &ldquo;Tambah Spot&rdquo; untuk mulai.
        </p>
      )}

      {spots.map((spot, idx) => (
        <div
          key={spot.id}
          className="rounded-2xl border overflow-hidden"
          style={{ border: "1.5px solid #e5e7eb", background: "#fff" }}
        >
          <div
            className="flex items-center justify-between px-5 py-3.5"
            style={{ background: "#f9fafb", borderBottom: "1px solid #f3f4f6" }}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-extrabold text-white"
                style={{ background: "#1434A4" }}
              >
                {idx + 1}
              </span>
              <span className="font-semibold text-sm" style={{ color: "#111827" }}>
                {spot.name || "Spot baru"}
              </span>
              {spot.tag && (
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                  style={{ background: "rgba(20,52,164,0.1)", color: "#1434A4" }}
                >
                  {spot.tag}
                </span>
              )}
              {spot.isBestSeller && (
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                  style={{ background: "rgba(251,146,60,0.1)", color: "#ea580c" }}
                >
                  ⭐ Best Seller
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditingId(editingId === spot.id ? null : spot.id)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
                style={{ background: "rgba(20,52,164,0.08)", color: "#1434A4" }}
              >
                <IconEdit size={13} />
                {editingId === spot.id ? "Tutup" : "Edit"}
              </button>
              <button
                type="button"
                onClick={() => remove(spot.id)}
                className="flex h-7 w-7 items-center justify-center rounded-lg transition-all"
                style={{ background: "rgba(220,38,38,0.08)", color: "#dc2626" }}
              >
                <IconTrash size={13} />
              </button>
            </div>
          </div>

          {editingId === spot.id && (
            <div className="p-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <AdminField label="Nama Spot">
                <input className={inputCls} style={inputStyle} value={spot.name} onChange={(e) => update(spot.id, { name: e.target.value })} placeholder="cth: Nusa Penida" />
              </AdminField>
              <AdminField label="Lokasi / Region">
                <input className={inputCls} style={inputStyle} value={spot.region} onChange={(e) => update(spot.id, { region: e.target.value })} placeholder="cth: Bali" />
              </AdminField>
              <AdminField label="Kedalaman">
                <input className={inputCls} style={inputStyle} value={spot.depth} onChange={(e) => update(spot.id, { depth: e.target.value })} placeholder="cth: 10-30 meter" />
              </AdminField>
              <AdminField label="Harga per Orang">
                <input className={inputCls} style={inputStyle} value={spot.price} onChange={(e) => update(spot.id, { price: e.target.value })} placeholder="cth: 850000" />
              </AdminField>
              <AdminField label="Ikan yang Ditemui">
                <input className={inputCls} style={inputStyle} value={spot.fish} onChange={(e) => update(spot.id, { fish: e.target.value })} placeholder="cth: Tuna, Barracuda, GT" />
              </AdminField>
              <AdminField label="Level">
                <input className={inputCls} style={inputStyle} value={spot.level} onChange={(e) => update(spot.id, { level: e.target.value })} placeholder="cth: Pemula, Menengah, Lanjutan" />
              </AdminField>
              <AdminField label="Label / Tag (opsional)">
                <input className={inputCls} style={inputStyle} value={spot.tag} onChange={(e) => update(spot.id, { tag: e.target.value })} placeholder="cth: Populer, Best Seller" />
              </AdminField>
              <AdminField label="Urutan">
                <input type="number" className={inputCls} style={inputStyle} value={spot.order} onChange={(e) => update(spot.id, { order: parseInt(e.target.value) || 0 })} placeholder="0" />
              </AdminField>
              <AdminField label="Best Seller?">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={spot.isBestSeller || false} 
                    onChange={(e) => update(spot.id, { isBestSeller: e.target.checked })}
                    className="w-4 h-4 rounded"
                    style={{ accentColor: "#1434A4" }}
                  />
                  <span className="text-sm" style={{ color: "#6b7280" }}>Tandai sebagai Best Seller</span>
                </label>
              </AdminField>
            </div>
          )}

          {editingId !== spot.id && (
            <div className="px-5 py-3 flex flex-wrap items-center gap-6 text-xs" style={{ color: "#6b7280" }}>
              <span>{spot.region || "-"}</span>
              <span>{spot.depth || "-"}</span>
              <span>Rp {spot.price || "0"}</span>
              {spot.fish && <span>{spot.fish}</span>}
              {spot.level && <span>{spot.level}</span>}
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addNew}
        className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed py-3.5 text-sm font-semibold transition-all"
        style={{ borderColor: "#d1d5db", color: "#6b7280" }}
      >
        <IconPlus size={16} />
        Tambah Spot
      </button>

      <div className="flex justify-end pt-2">
        <AdminSaveButton onClick={onSave} loading={loading} />
      </div>
    </div>
  );
}

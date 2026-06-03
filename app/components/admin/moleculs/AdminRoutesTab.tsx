"use client";

import { useState } from "react";
import { IconPlus, IconTrash, IconEdit } from "@/app/components/admin/atoms/AdminIcons";
import AdminField, { inputCls, inputStyle } from "./AdminField";
import AdminSaveButton from "./AdminSaveButton";
import type { ServiceRoute } from "@/app/components/admin/templates/AdminContentTemplate";

const uid = () => Math.random().toString(36).slice(2, 9);

export default function AdminRoutesTab({
  routes,
  onChange,
  onSave,
  loading,
}: {
  routes: ServiceRoute[];
  onChange: (r: ServiceRoute[]) => void;
  onSave: () => void;
  loading?: boolean;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const update = (id: string, patch: Partial<ServiceRoute>) =>
    onChange(routes.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const remove = (id: string) => {
    onChange(routes.filter((r) => r.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const addNew = () => {
    const id = uid();
    onChange([
      ...routes,
      { id, from: "", to: "", duration: "", price: "", tag: "", type: "", icon: "", order: routes.length },
    ]);
    setEditingId(id);
  };

  return (
    <div className="flex flex-col gap-4">
      {routes.length === 0 && (
        <p className="text-sm text-center py-8" style={{ color: "#9ca3af" }}>
          Belum ada rute. Klik &ldquo;Tambah Rute&rdquo; untuk mulai.
        </p>
      )}

      {routes.map((route, idx) => (
        <div
          key={route.id}
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
                {route.from || "?"} → {route.to || "?"}
              </span>
              {route.tag && (
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                  style={{ background: "rgba(20,52,164,0.1)", color: "#1434A4" }}
                >
                  {route.tag}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditingId(editingId === route.id ? null : route.id)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
                style={{ background: "rgba(20,52,164,0.08)", color: "#1434A4" }}
              >
                <IconEdit size={13} />
                {editingId === route.id ? "Tutup" : "Edit"}
              </button>
              <button
                type="button"
                onClick={() => remove(route.id)}
                className="flex h-7 w-7 items-center justify-center rounded-lg transition-all"
                style={{ background: "rgba(220,38,38,0.08)", color: "#dc2626" }}
              >
                <IconTrash size={13} />
              </button>
            </div>
          </div>

          {editingId === route.id && (
            <div className="p-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <AdminField label="Kota Asal">
                <input className={inputCls} style={inputStyle} value={route.from} onChange={(e) => update(route.id, { from: e.target.value })} placeholder="cth: Mataram" />
              </AdminField>
              <AdminField label="Kota Tujuan">
                <input className={inputCls} style={inputStyle} value={route.to} onChange={(e) => update(route.id, { to: e.target.value })} placeholder="cth: Senggigi" />
              </AdminField>
              <AdminField label="Durasi">
                <input className={inputCls} style={inputStyle} value={route.duration} onChange={(e) => update(route.id, { duration: e.target.value })} placeholder="cth: 1 Jam" />
              </AdminField>
              <AdminField label="Harga">
                <input className={inputCls} style={inputStyle} value={route.price} onChange={(e) => update(route.id, { price: e.target.value })} placeholder="cth: Rp 100.000" />
              </AdminField>
              <AdminField label="Label / Tag (opsional)">
                <input className={inputCls} style={inputStyle} value={route.tag || ""} onChange={(e) => update(route.id, { tag: e.target.value })} placeholder="cth: Terlaris, Promo" />
              </AdminField>
              <AdminField label="Tipe Transportasi (opsional)">
                <input className={inputCls} style={inputStyle} value={route.type || ""} onChange={(e) => update(route.id, { type: e.target.value })} placeholder="cth: Ferry, Bus, Pesawat" />
              </AdminField>
              <AdminField label="Urutan">
                <input type="number" className={inputCls} style={inputStyle} value={route.order} onChange={(e) => update(route.id, { order: parseInt(e.target.value) || 0 })} placeholder="0" />
              </AdminField>
            </div>
          )}

          {editingId !== route.id && (
            <div className="px-5 py-3 flex items-center gap-6 text-xs" style={{ color: "#6b7280" }}>
              <span>⏱ {route.duration || "—"}</span>
              <span>💰 {route.price || "—"}</span>
              {route.type && <span>🚌 {route.type}</span>}
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
        Tambah Rute
      </button>

      <div className="flex justify-end pt-2">
        <AdminSaveButton onClick={onSave} loading={loading} />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { IconPlus, IconTrash, IconEdit } from "@/app/components/admin/atoms/AdminIcons";
import AdminField, { inputCls, inputStyle } from "./AdminField";
import AdminSaveButton from "./AdminSaveButton";
import type { ServicePackage } from "@/app/components/admin/templates/AdminContentTemplate";

const uid = () => Math.random().toString(36).slice(2, 9);

export default function AdminPackagesTab({
  packages,
  onChange,
  onSave,
  loading,
}: {
  packages: ServicePackage[];
  onChange: (p: ServicePackage[]) => void;
  onSave: () => void;
  loading?: boolean;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const update = (id: string, patch: Partial<ServicePackage>) =>
    onChange(packages.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const remove = (id: string) => {
    onChange(packages.filter((p) => p.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const addNew = () => {
    const id = uid();
    onChange([
      ...packages,
      { id, name: "", description: "", price: "", features: "", badge: "", highlighted: false },
    ]);
    setEditingId(id);
  };

  return (
    <div className="flex flex-col gap-4">
      {packages.length === 0 && (
        <p className="text-sm text-center py-8" style={{ color: "#9ca3af" }}>
          Belum ada paket. Klik &ldquo;Tambah Paket&rdquo; untuk mulai.
        </p>
      )}

      {packages.map((pkg, idx) => (
        <div
          key={pkg.id}
          className="rounded-2xl border overflow-hidden"
          style={{
            border: pkg.highlighted ? "1.5px solid #1434A4" : "1.5px solid #e5e7eb",
            background: "#fff",
          }}
        >
          <div
            className="flex items-center justify-between px-5 py-3.5"
            style={{ background: pkg.highlighted ? "rgba(20,52,164,0.04)" : "#f9fafb", borderBottom: "1px solid #f3f4f6" }}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-extrabold text-white"
                style={{ background: "#1434A4" }}
              >
                {idx + 1}
              </span>
              <span className="font-semibold text-sm" style={{ color: "#111827" }}>
                {pkg.name || "Paket Baru"}
              </span>
              {pkg.badge && (
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                  style={{ background: "rgba(20,52,164,0.1)", color: "#1434A4" }}
                >
                  {pkg.badge}
                </span>
              )}
              {pkg.highlighted && (
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                  style={{ background: "rgba(234,179,8,0.15)", color: "#ca8a04" }}
                >
                  ★ Unggulan
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditingId(editingId === pkg.id ? null : pkg.id)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
                style={{ background: "rgba(20,52,164,0.08)", color: "#1434A4" }}
              >
                <IconEdit size={13} />
                {editingId === pkg.id ? "Tutup" : "Edit"}
              </button>
              <button
                type="button"
                onClick={() => remove(pkg.id)}
                className="flex h-7 w-7 items-center justify-center rounded-lg transition-all"
                style={{ background: "rgba(220,38,38,0.08)", color: "#dc2626" }}
              >
                <IconTrash size={13} />
              </button>
            </div>
          </div>

          {editingId === pkg.id && (
            <div className="p-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <AdminField label="Nama Paket">
                <input className={inputCls} style={inputStyle} value={pkg.name} onChange={(e) => update(pkg.id, { name: e.target.value })} placeholder="cth: Paket Reguler" />
              </AdminField>
              <AdminField label="Harga">
                <input className={inputCls} style={inputStyle} value={pkg.price} onChange={(e) => update(pkg.id, { price: e.target.value })} placeholder="cth: Rp 150.000" />
              </AdminField>
              <AdminField label="Deskripsi Singkat">
                <input className={inputCls} style={inputStyle} value={pkg.description} onChange={(e) => update(pkg.id, { description: e.target.value })} placeholder="Deskripsi singkat paket..." />
              </AdminField>
              <AdminField label="Badge / Label (opsional)">
                <input className={inputCls} style={inputStyle} value={pkg.badge} onChange={(e) => update(pkg.id, { badge: e.target.value })} placeholder="cth: Terlaris, Baru" />
              </AdminField>
              <div className="sm:col-span-2">
                <AdminField label="Fitur / Keunggulan (satu per baris)">
                  <textarea
                    rows={4}
                    className={inputCls}
                    style={{ ...inputStyle, resize: "vertical" }}
                    value={pkg.features}
                    onChange={(e) => update(pkg.id, { features: e.target.value })}
                    placeholder={"AC & wifi gratis\nSupir berpengalaman\nArmada terbaru"}
                  />
                </AdminField>
              </div>
              <div className="sm:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    className="relative h-5 w-9 rounded-full transition-all"
                    style={{ background: pkg.highlighted ? "#1434A4" : "#d1d5db" }}
                    onClick={() => update(pkg.id, { highlighted: !pkg.highlighted })}
                  >
                    <div
                      className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all"
                      style={{ left: pkg.highlighted ? "18px" : "2px" }}
                    />
                  </div>
                  <span className="text-sm font-medium" style={{ color: "#374151" }}>
                    Tandai sebagai paket unggulan
                  </span>
                </label>
              </div>
            </div>
          )}

          {editingId !== pkg.id && (
            <div className="px-5 py-3 flex items-center gap-6 text-xs" style={{ color: "#6b7280" }}>
              <span>💰 {pkg.price || "—"}</span>
              <span>📝 {pkg.description || "Belum ada deskripsi"}</span>
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
        Tambah Paket
      </button>

      <div className="flex justify-end pt-2">
        <AdminSaveButton onClick={onSave} loading={loading} />
      </div>
    </div>
  );
}

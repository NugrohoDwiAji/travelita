"use client";

import AdminField, { inputCls, inputStyle } from "./AdminField";
import AdminSaveButton from "./AdminSaveButton";
import type { GeneralInfo } from "@/app/components/admin/templates/AdminContentTemplate";

export default function AdminGeneralTab({
  data,
  onChange,
  onSave,
  loading,
}: {
  data: GeneralInfo;
  onChange: (d: GeneralInfo) => void;
  onSave: () => void;
  loading?: boolean;
}) {
  const set = (key: keyof GeneralInfo) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => onChange({ ...data, [key]: e.target.value });

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AdminField label="Badge / Tag Hero">
          <input className={inputCls} style={inputStyle} value={data.badge} onChange={set("badge")} placeholder="cth: Layanan Terpercaya" />
        </AdminField>
        <AdminField label="Teks Tombol Utama (CTA)">
          <input className={inputCls} style={inputStyle} value={data.ctaPrimary} onChange={set("ctaPrimary")} placeholder="cth: Pesan Sekarang" />
        </AdminField>
      </div>

      <AdminField label="Judul Utama (Hero Title)">
        <input className={inputCls} style={inputStyle} value={data.title} onChange={set("title")} placeholder="cth: Shuttle Service Terbaik di Lombok" />
      </AdminField>

      <AdminField label="Sub-judul (Hero Subtitle)">
        <input className={inputCls} style={inputStyle} value={data.subtitle} onChange={set("subtitle")} placeholder="cth: Nyaman, Tepat Waktu, Terjangkau" />
      </AdminField>

      <AdminField label="Deskripsi Layanan">
        <textarea
          rows={4}
          className={inputCls}
          style={{ ...inputStyle, resize: "vertical" }}
          value={data.description}
          onChange={set("description")}
          placeholder="Deskripsi singkat layanan yang akan ditampilkan di halaman utama..."
        />
      </AdminField>

      <AdminField label="Teks Tombol Sekunder">
        <input className={inputCls} style={inputStyle} value={data.ctaSecondary} onChange={set("ctaSecondary")} placeholder="cth: Lihat Jadwal" />
      </AdminField>

      <div className="flex justify-end pt-2">
        <AdminSaveButton onClick={onSave} loading={loading} />
      </div>
    </div>
  );
}

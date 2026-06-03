"use client";

import { IconSave } from "@/app/components/admin/atoms/AdminIcons";

export default function AdminSaveButton({
  onClick,
  loading,
  disabled,
}: {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-extrabold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        background: "linear-gradient(90deg, #0d2280 0%, #1434A4 100%)",
        boxShadow: loading ? "none" : "0 4px 14px rgba(20,52,164,0.30)",
      }}
    >
      {loading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        <IconSave size={15} />
      )}
      {loading ? "Menyimpan..." : "Simpan Perubahan"}
    </button>
  );
}

"use client";

import { useTranslations } from "next-intl";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

interface BookingConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
  title?: string;
  price?: number | null;
  loading?: boolean;
  children: React.ReactNode;
}

export default function BookingConfirmDialog({
  open,
  onClose,
  onConfirm,
  onCancel,
  title,
  price,
  loading,
  children,
}: BookingConfirmDialogProps) {
  const t = useTranslations("components.shuttleConfirm");

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-md animate-in zoom-in-95 fade-in duration-200 rounded-2xl shadow-2xl"
        style={{ background: "#fff", border: "1.5px solid rgba(20,52,164,0.10)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between rounded-t-2xl px-6 py-4"
          style={{ background: "linear-gradient(90deg, #1434A4, #3d52c6)" }}
        >
          <h3 className="text-lg font-bold text-white">
            {title || t("title")}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition hover:bg-white/20 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M5 5l8 8M13 5l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {children}

          {price !== null && price !== undefined && (
            <div
              className="flex items-center justify-between rounded-xl p-4"
              style={{ background: "#eef0fb" }}
            >
              <span className="text-sm font-semibold" style={{ color: "#4050b5" }}>
                {t("totalPrice")}
              </span>
              <span className="text-lg font-bold" style={{ color: "#1434A4" }}>
                {formatPrice(price)}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-3 px-6 pb-6">
          <button
            type="button"
            onClick={onCancel ?? onClose}
            disabled={loading}
            className="flex-1 rounded-xl border py-3 text-sm font-semibold transition hover:bg-gray-50 active:scale-[0.98] disabled:opacity-50"
            style={{ borderColor: "rgba(20,52,164,0.20)", color: "#4050b5" }}
          >
            {t("cancel")}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-xl py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
            style={{ background: "linear-gradient(90deg, #1434A4, #3d52c6)" }}
          >
            {loading ? "Memproses..." : t("confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}

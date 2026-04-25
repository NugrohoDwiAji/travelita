"use client";

import {
  IconLocation,
  IconCalendar,
  IconClock,
  IconPerson,
  IconArrow,
} from "@/app/components/atoms/BookingIcons";

export interface ShuttleConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: {
    tripType: string;
    from: string;
    to: string;
    dateGo: string;
    timeGo: string;
    dateBack?: string;
    timeBack?: string;
    passengers: number;
    price: number | null;
  };
}

function formatDate(dateStr: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(timeStr: string) {
  if (!timeStr) return "-";
  return timeStr.replace(":", ".");
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function ShuttleConfirmDialog({
  open,
  onClose,
  onConfirm,
  data,
}: ShuttleConfirmDialogProps) {
  if (!open) return null;

  const isRoundTrip = data.tripType === "Pulang Pergi";
  const totalPrice = data.price
    ? data.price * data.passengers * (isRoundTrip ? 2 : 1)
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Card */}
      <div
        className="relative w-full max-w-md animate-in zoom-in-95 fade-in duration-200 rounded-2xl shadow-2xl"
        style={{ background: "#fff", border: "1.5px solid rgba(20,52,164,0.10)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between rounded-t-2xl px-6 py-4"
          style={{ background: "linear-gradient(90deg, #1434A4, #3d52c6)" }}
        >
          <h3 className="text-lg font-bold text-white">Konfirmasi Pesanan</h3>
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

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Trip type badge */}
          <div className="flex justify-center">
            <span
              className="rounded-full px-4 py-1 text-xs font-semibold"
              style={{ background: "#eef0fb", color: "#1434A4" }}
            >
              {data.tripType}
            </span>
          </div>

          {/* Route */}
          <div
            className="flex items-center gap-3 rounded-xl p-4"
            style={{ background: "#f8f9ff" }}
          >
            <span style={{ color: "#1434A4" }}><IconLocation /></span>
            <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm font-medium min-w-0">
              <span className="truncate" style={{ color: "#1434A4" }}>{data.from}</span>
              <span className="hidden sm:block" style={{ color: "#1434A4" }}><IconArrow /></span>
              <span className="sm:hidden text-[10px] font-semibold uppercase" style={{ color: "#4050b5" }}>→</span>
              <span className="truncate" style={{ color: "#1434A4" }}>{data.to}</span>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Pergi */}
            <DetailItem
              icon={<IconCalendar />}
              label="Tanggal Pergi"
              value={formatDate(data.dateGo)}
            />
            <DetailItem
              icon={<IconClock />}
              label="Jam Pergi"
              value={formatTime(data.timeGo)}
            />

            {/* Pulang (jika PP) */}
            {isRoundTrip && (
              <>
                <DetailItem
                  icon={<IconCalendar />}
                  label="Tanggal Pulang"
                  value={formatDate(data.dateBack || "")}
                />
                <DetailItem
                  icon={<IconClock />}
                  label="Jam Pulang"
                  value={formatTime(data.timeBack || "")}
                />
              </>
            )}

            {/* Penumpang */}
            <DetailItem
              icon={<IconPerson />}
              label="Penumpang"
              value={`${data.passengers} orang`}
            />
          </div>

          {/* Price */}
          {totalPrice !== null && (
            <div
              className="flex items-center justify-between rounded-xl p-4"
              style={{ background: "#eef0fb" }}
            >
              <span className="text-sm font-semibold" style={{ color: "#4050b5" }}>
                Total Harga
              </span>
              <span className="text-lg font-bold" style={{ color: "#1434A4" }}>
                {formatPrice(totalPrice)}
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border py-3 text-sm font-semibold transition hover:bg-gray-50 active:scale-[0.98]"
            style={{ borderColor: "rgba(20,52,164,0.20)", color: "#4050b5" }}
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-xl py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110 active:scale-[0.98]"
            style={{ background: "linear-gradient(90deg, #1434A4, #3d52c6)" }}
          >
            Pesan
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2 rounded-lg p-2.5" style={{ background: "#f8f9ff" }}>
      <span className="mt-0.5" style={{ color: "#1434A4" }}>{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#4050b5" }}>
          {label}
        </p>
        <p className="text-sm font-medium truncate" style={{ color: "#1434A4" }}>
          {value}
        </p>
      </div>
    </div>
  );
}

"use client";

import { BookingRecord } from "@/app/types/booking";
import { STATUS_STYLES, normalizeStatus } from "@/app/components/admin/atoms/bookingStatusConfig";

interface BookingDetailPopupProps {
  row: BookingRecord;
  onClose: () => void;
}

function StatusBadge({ status }: { status: ReturnType<typeof normalizeStatus> }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.PENDING;
  return (
    <span
      className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold"
      style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  );
}

export default function BookingDetailPopup({ row, onClose }: BookingDetailPopupProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(15,23,42,0.45)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl p-5"
        style={{
          background: "#fff",
          border: "1.5px solid rgba(20,52,164,0.14)",
          boxShadow: "0 24px 42px rgba(15,23,42,0.22)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p
              className="text-[11px] font-bold uppercase tracking-wider"
              style={{ color: "#4050b5" }}
            >
              Detail Pesanan
            </p>
            <h3 className="text-base font-extrabold" style={{ color: "#0d2280" }}>
              {row.id}
            </h3>
          </div>
          <StatusBadge status={normalizeStatus(String(row.status))} />
        </div>

        {/* Fields */}
        <div className="max-h-[60vh] space-y-2 overflow-y-auto pr-1">
          {Object.entries(row).map(([key, value]) => (
            <div
              key={key}
              className="flex items-start justify-between gap-3 rounded-lg px-3 py-2"
              style={{ background: "#f7f8ff" }}
            >
              <p
                className="shrink-0 text-[11px] font-semibold uppercase"
                style={{ color: "#4050b5" }}
              >
                {key.replace(/_/g, " ")}
              </p>
              <p className="text-right text-xs" style={{ color: "#1f2937" }}>
                {String(value ?? "-")}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-xs font-bold transition"
            style={{ background: "rgba(20,52,164,0.08)", color: "#1434A4" }}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useTransition } from "react";
import { BookingRecord, BookingStatus } from "@/app/types/booking";
import {
  STATUS_STYLES,
  STATUS_OPTIONS,
  normalizeStatus,
} from "@/app/components/admin/atoms/bookingStatusConfig";
import { updateBookingStatusById } from "@/app/actions/booking";

interface BookingEditStatusPopupProps {
  row: BookingRecord;
  onClose: () => void;
  onSave: (bookingId: string, status: BookingStatus) => void;
}

export default function BookingEditStatusPopup({
  row,
  onClose,
  onSave,
}: BookingEditStatusPopupProps) {
  const [selected, setSelected] = useState<BookingStatus>(
    normalizeStatus(String(row.status))
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    setErrorMsg(null);

    if (!row.bookingDbId) {
      // Data statis / belum terhubung DB — update lokal saja
      onSave(row.id, selected);
      onClose();
      return;
    }

    startTransition(async () => {
      const result = await updateBookingStatusById({
        bookingId: row.bookingDbId as number,
        status: selected,
      });

      if (result.error) {
        setErrorMsg(result.error);
        return;
      }

      onSave(row.id, selected);
      onClose();
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(15,23,42,0.45)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl p-5"
        style={{
          background: "#fff",
          border: "1.5px solid rgba(20,52,164,0.14)",
          boxShadow: "0 24px 42px rgba(15,23,42,0.22)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <p
          className="text-[11px] font-bold uppercase tracking-wider"
          style={{ color: "#4050b5" }}
        >
          Edit Pesanan
        </p>
        <h3 className="mt-1 text-base font-extrabold" style={{ color: "#0d2280" }}>
          {row.id}
        </h3>
        <p className="mt-1 text-xs" style={{ color: "#4b5563" }}>
          {row.name}
        </p>

        {/* Status select */}
        <div className="mt-4">
          <label
            className="mb-1 block text-[11px] font-semibold uppercase"
            style={{ color: "#4050b5" }}
          >
            Ubah Status Pesanan
          </label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value as BookingStatus)}
            disabled={isPending}
            className="w-full rounded-xl px-3 py-2 text-xs outline-none disabled:opacity-60"
            style={{ border: "1.5px solid rgba(20,52,164,0.15)", color: "#0d2280" }}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {STATUS_STYLES[status].label}
              </option>
            ))}
          </select>
        </div>

        {/* Error */}
        {errorMsg && (
          <p
            className="mt-3 rounded-lg px-3 py-2 text-[11px] font-medium"
            style={{ background: "rgba(239,68,68,0.08)", color: "#dc2626" }}
          >
            {errorMsg}
          </p>
        )}

        {/* Footer */}
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={isPending}
            className="rounded-lg px-4 py-2 text-xs font-bold transition disabled:opacity-50"
            style={{ background: "rgba(20,52,164,0.08)", color: "#1434A4" }}
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={isPending}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold text-white transition hover:brightness-110 disabled:opacity-60"
            style={{ background: "linear-gradient(90deg, #1434A4, #3d52c6)" }}
          >
            {isPending && (
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {isPending ? "Menyimpan..." : "Simpan Status"}
          </button>
        </div>
      </div>
    </div>
  );
}

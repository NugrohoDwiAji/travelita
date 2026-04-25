"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import OrderBookingDetailPopup from "@/app/components/moleculs/OrderBookingDetailPopup";
import { updateBookingStatusById } from "@/app/actions/booking";

type BookingStatus = "PENDING" | "PROCESSING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
type DateValue = Date | string;

type BookingSummary = {
  id: number;
  type: string;
  status: string;
  createdAt: DateValue;
  updatedAt: DateValue;
};

type ShuttleDetail = {
  shuttleType: string;
  from: string;
  to: string;
  leavingTime: DateValue;
  returnTime: DateValue | null;
  passengerCount: number;
  description: string;
};

type OrderBookingCardProps = {
  booking: BookingSummary;
  totalBiaya: number | null;
  shuttleDetail: ShuttleDetail | null;
  onCancelOrder?: (bookingId: number) => void;
};

function getStatusColor(status: BookingStatus) {
  switch (status) {
    case "PENDING":
      return {
        label: "Pending",
        badgeClass: "bg-amber-100 text-amber-700 border-amber-200",
        dotClass: "bg-amber-500",
      };
    case "PROCESSING":
      return {
        label: "Processing",
        badgeClass: "bg-sky-100 text-sky-700 border-sky-200",
        dotClass: "bg-sky-500",
      };
    case "CONFIRMED":
      return {
        label: "Confirmed",
        badgeClass: "bg-indigo-100 text-indigo-700 border-indigo-200",
        dotClass: "bg-indigo-500",
      };
    case "COMPLETED":
      return {
        label: "Completed",
        badgeClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
        dotClass: "bg-emerald-500",
      };
    case "CANCELLED":
      return {
        label: "Cancelled",
        badgeClass: "bg-rose-100 text-rose-700 border-rose-200",
        dotClass: "bg-rose-500",
      };
    default:
      return {
        label: status,
        badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
        dotClass: "bg-slate-500",
      };
  }
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

export default function OrderBookingCard({
  booking,
  totalBiaya,
  shuttleDetail,
}: OrderBookingCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const statusMeta = getStatusColor(booking.status as BookingStatus);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const compactDescription = shuttleDetail?.description?.trim() || "Deskripsi belum tersedia";
  const isCancelDisabled =
    booking.status === "CANCELLED" ||
    booking.status === "COMPLETED" ||
    isPending;

  function handleCancelClick() {
    setConfirmCancel(true);
    setCancelError(null);
  }

  function handleConfirmCancel() {
    startTransition(async () => {
      const result = await updateBookingStatusById({
        bookingId: booking.id,
        status: "CANCELLED",
      });
      if (result.error) {
        setCancelError(result.error);
      } else {
        setConfirmCancel(false);
        router.refresh();
      }
    });
  }

  return (
    <>
      <div className="relative mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <span
          className={`absolute right-3 top-2 z-10 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold ${statusMeta.badgeClass}`}
        >
          <span className={`h-2 w-2 rounded-full ${statusMeta.dotClass}`} />
          {statusMeta.label}
        </span>

        <div className="relative grid grid-cols-[auto_auto_minmax(0,1fr)_auto_auto_auto] items-center gap-3 pr-28 sm:pr-25">
          <p className="text-sm font-bold text-slate-900">#{booking.id}</p>

          <p className="text-sm font-semibold text-slate-600">{booking.type}</p>

          <p className="truncate px-1 sm:px-3 text-sm font-semibold text-slate-700">{compactDescription}</p>

          <p className="text-sm font-bold text-[#1434A4] text-right">
            {totalBiaya !== null ? formatCurrency(totalBiaya) : "Belum tersedia"}
          </p>

          <button
            type="button"
            onClick={() => setIsPopupOpen(true)}
            className="rounded-lg bg-[#1434A4] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0f2b8f] "
          >
            Detail
          </button>

          <button
            type="button"
            onClick={handleCancelClick}
            disabled={isCancelDisabled}
            className="rounded-lg border border-rose-300 bg-white px-4 py-2 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400 disabled:hover:bg-white"
          >
            {isPending ? "Membatalkan..." : "Batalkan Pesanan"}
          </button>
          
        </div>

        {/* Konfirmasi pembatalan inline */}
        {confirmCancel && (
          <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4">
            <p className="text-sm font-semibold text-rose-700">
              Yakin ingin membatalkan pesanan #{booking.id}?
            </p>
            {cancelError && (
              <p className="mt-1 text-xs text-rose-600">{cancelError}</p>
            )}
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={handleConfirmCancel}
                disabled={isPending}
                className="rounded-lg bg-rose-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
              >
                {isPending ? "Memproses..." : "Ya, Batalkan"}
              </button>
              <button
                type="button"
                onClick={() => { setConfirmCancel(false); setCancelError(null); }}
                disabled={isPending}
                className="rounded-lg border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-60"
              >
                Tidak
              </button>
            </div>
          </div>
        )}
      </div>

      <OrderBookingDetailPopup
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        booking={booking}
        shuttleDetail={shuttleDetail}
        statusMeta={statusMeta}
      />
    </>
  );
}
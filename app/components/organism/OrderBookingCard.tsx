"use client";

import { useState, useTransition } from "react";
import OrderBookingDetailPopup from "@/app/components/moleculs/OrderBookingDetailPopup";
import { updateBookingStatusById } from "@/app/actions/booking";
import { BookingListItem } from "@/app/types/booking";
import type { ShuttleBookingDetail } from "@/app/types/booking";
import type { BookingStatus } from "@/app/types/booking";
import { useTranslations } from "next-intl";

type OrderBookingCardProps = {
  booking: BookingListItem;
  shuttleDetail: ShuttleBookingDetail | null;
  onCancelOrder?: (bookingId: number) => void;
};

function getStatusColor(status: BookingStatus, t: (key: string) => string) {
  switch (status) {
    case "PENDING":
      return {
        label: t("common.orderStatus.pending"),
        badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
        dotClass: "bg-amber-400",
      };
    case "PROCESSING":
      return {
        label: t("common.orderStatus.processing"),
        badgeClass: "bg-sky-50 text-sky-700 border-sky-200",
        dotClass: "bg-sky-500",
      };
    case "CONFIRMED":
      return {
        label: t("common.orderStatus.confirmed"),
        badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
        dotClass: "bg-indigo-500",
      };
    case "COMPLETED":
      return {
        label: t("common.orderStatus.completed"),
        badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
        dotClass: "bg-emerald-500",
      };
    case "CANCELLED":
      return {
        label: t("common.orderStatus.cancelled"),
        badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
        dotClass: "bg-rose-500",
      };
    default:
      return {
        label: status,
        badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
        dotClass: "bg-slate-400",
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

function getBookingTypeLabel(type: string, t: (key: string) => string) {
  const labels: Record<string, string> = {
    SHUTTLE: t("common.bookingTypes.shuttle"),
    TRIP: t("common.bookingTypes.trip"),
    PRIVATE_CAR: t("common.bookingTypes.privateCar"),
    SPEAR_CAR: t("common.bookingTypes.spearFishing"),
    TICKET: t("common.bookingTypes.ticket"),
  };
  return labels[type] ?? type;
}

export default function OrderBookingCard({
  booking,
  shuttleDetail,
}: OrderBookingCardProps) {
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const statusMeta = getStatusColor(booking.status as BookingStatus, t);
  const bookingTypeLabel = getBookingTypeLabel(booking.type, t);
  const compactDescription =
    shuttleDetail?.description?.trim() ||
    (shuttleDetail
      ? `${shuttleDetail.from} → ${shuttleDetail.to}`
      : bookingTypeLabel);
  const isCancelDisabled =
    booking.status === "CANCELLED" ||
    booking.status === "COMPLETED" ||
    isPending;

  function handleConfirmCancel() {
    startTransition(async () => {
      const result = await updateBookingStatusById({
        bookingId: booking.id,
        status: "CANCELLED",
      });
      if (result.error) {
        setCancelError(result.error);
      } else {
        window.location.reload();
      }
    });
  }

  return (
    <>
      <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-slate-800">
              #{booking.id}
            </span>
            <span className="rounded-full bg-[#1434A4]/8 px-2.5 py-0.5 text-xs font-semibold text-[#1434A4]">
              {bookingTypeLabel}
            </span>
          </div>
          {/* Status badge */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusMeta.badgeClass}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${statusMeta.dotClass}`}
            />
            {statusMeta.label}
          </span>
        </div>

        {/* Description + price */}
        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="truncate text-sm text-slate-600">
            {compactDescription}
          </p>
          <p className="shrink-0 text-sm font-bold text-[#1434A4]">
            {shuttleDetail !== null
              ? formatCurrency(shuttleDetail.price)
              : t("orders.card.confirmAdminPrice")}
          </p>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-slate-100" />

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPopupOpen(true)}
            className="rounded-xl bg-[#1434A4] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0f2b8f]"
          >
            {t("orders.card.viewDetailButton")}
          </button>
          <button
            type="button"
            onClick={() => {
              setConfirmCancel(true);
              setCancelError(null);
            }}
            disabled={isCancelDisabled}
            className="rounded-xl border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
          >
            {isPending
              ? t("orders.card.cancelButtonLoading")
              : t("orders.card.cancelButton")}
          </button>
        </div>

        {/* Konfirmasi pembatalan */}
        {confirmCancel && (
          <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4">
            <p className="text-sm font-semibold text-rose-700">
              {t("orders.card.cancelConfirm.text", { id: booking.id })}
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
                {isPending
                  ? t("orders.card.cancelConfirm.confirmButtonLoading")
                  : t("orders.card.cancelConfirm.confirmButton")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmCancel(false);
                  setCancelError(null);
                }}
                disabled={isPending}
                className="rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-60"
              >
                {t("orders.card.cancelConfirm.declineButton")}
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

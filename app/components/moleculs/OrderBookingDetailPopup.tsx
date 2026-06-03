"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { updateComfirmPayment } from "@/app/actions/shuttleService";
import { BookingListItem, ShuttleBookingDetail } from "@/app/types/booking";

type DateValue = Date | string;

type StatusMeta = {
  label: string;
  badgeClass: string;
  dotClass: string;
};

type OrderBookingDetailPopupProps = {
  open: boolean;
  onClose: () => void;
  booking: BookingListItem;
  shuttleDetail: ShuttleBookingDetail | null;
  statusMeta: StatusMeta;
};

function formatDate(value: DateValue) {
  if (!(value instanceof Date)) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(value);
}

function getBookingTypeLabel(type: string, tCommon: (key: string) => string) {
  const labels: Record<string, string> = {
    SHUTTLE: "Shuttle",
    TRIP: tCommon("bookingTypes.trip"),
    PRIVATE_CAR: tCommon("bookingTypes.privateCar"),
    SPEAR_CAR: "Spear Fishing",
    TICKET: tCommon("bookingTypes.ticket"),
  };
  return labels[type] ?? type;
}

function InfoCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</p>
      <div className="mt-1.5 text-sm font-semibold text-slate-800">{value}</div>
    </div>
  );
}

export default function OrderBookingDetailPopup({
  open,
  onClose,
  booking,
  shuttleDetail,
  statusMeta,
}: OrderBookingDetailPopupProps) {
  const t = useTranslations("components.orderDetail");
  const tCommon = useTranslations("common");
  const [payment, setPayment] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePaymentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPayment(file);
    if (file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSavePayment = async () => {
    if (!payment) {
      alert(t("uploadSelectFirst"));
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("bookingId", booking.id.toString());
      formData.append("paymentProof", payment);
      const result = await updateComfirmPayment(formData);
      if (result.success) {
        alert(t("uploadSuccess"));
      } else {
        alert(result.message || t("uploadError"));
      }
    } catch (error) {
      console.error("Error uploading payment proof:", error);
      alert(t("uploadGenericError"));
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const bookingTypeLabel = getBookingTypeLabel(booking.type, tCommon);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl">

        {/* Header stripe */}
        <div className="sticky top-0 z-10 rounded-t-3xl bg-[#1434A4] px-6 py-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-200">
                {t("title")}
              </p>
              <h3 className="mt-1 text-xl font-extrabold text-white">
                #{booking.id}
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/15 px-3 py-0.5 text-xs font-semibold text-white">
                  {bookingTypeLabel}
                </span>
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${statusMeta.badgeClass}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${statusMeta.dotClass}`} />
                  {statusMeta.label}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
              aria-label={t("closeLabel")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6">

          {/* Timestamps */}
          <div className="grid grid-cols-2 gap-3">
            <InfoCard label={t("createdLabel")} value={formatDate(booking.createdAt || "-")} />
            <InfoCard label={t("updatedLabel")} value={formatDate(booking.updatedAt || "-")} />
          </div>

          {/* No shuttle detail warning */}
          {!shuttleDetail && (
            <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-800">
                {t("adminConfirmNote", { bookingType: bookingTypeLabel })}
              </p>
              <p className="mt-1 text-xs text-amber-700">
                {t("contactAdminNote")}
              </p>
              <a
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo Admin, saya ingin konfirmasi pesanan #${booking.id} (${bookingTypeLabel}).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1fb85a]"
              >
                {t("chatAdminWhatsApp")}
              </a>
            </div>
          )}

          {/* Shuttle detail grid */}
          {shuttleDetail && (
            <>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <InfoCard
                  label={t("routeLabel")}
                  value={
                    <span className="flex items-center gap-1.5">
                      {shuttleDetail.from}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5 shrink-0 text-slate-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                      {shuttleDetail.to}
                    </span>
                  }
                />
                <InfoCard label={t("shuttleTypeLabel")} value={shuttleDetail.shuttleType} />
                <InfoCard label={t("departureLabel")} value={formatDate(shuttleDetail.leavingTime)} />
                <InfoCard
                  label={t("returnLabel")}
                  value={shuttleDetail.returnTime ? formatDate(shuttleDetail.returnTime) : "-"}
                />
                <InfoCard label={t("passengerLabel")} value={`${shuttleDetail.passengerCount} ${t("passengerUnit")}`} />
              </div>

              {shuttleDetail.description && (
                <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{t("descriptionLabel")}</p>
                  <p className="mt-1.5 text-sm text-slate-700">{shuttleDetail.description}</p>
                </div>
              )}
            </>
          )}

          {/* Bukti Pembayaran */}
          <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              {t("paymentProofLabel")}
            </p>

            {booking.paymentProof ? (
              <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={booking.paymentProof}
                  alt="Bukti pembayaran"
                  className="max-h-64 w-full object-contain"
                />
              </div>
            ) : (
              <div className="mt-3">
                <label
                  htmlFor="payment-proof"
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-white px-4 py-8 text-center transition hover:border-[#1434A4]/40 hover:bg-blue-50/30"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-slate-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{t("uploadPrompt")}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{t("uploadFormat")}</p>
                  </div>
                  <input
                    id="payment-proof"
                    type="file"
                    accept="image/*,.pdf"
                    className="sr-only"
                    onChange={handlePaymentUpload}
                  />
                </label>

                {/* Preview */}
                {preview && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preview} alt="Preview" className="max-h-48 w-full object-contain" />
                  </div>
                )}

                {payment && (
                  <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1434A4]/8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4 text-[#1434A4]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                      </div>
                      <p className="truncate text-xs font-medium text-slate-700">{payment.name}</p>
                    </div>
                    <button
                      onClick={handleSavePayment}
                      disabled={loading}
                      className="ml-3 shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <svg className="h-3.5 w-3.5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          {t("saving")}
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3.5 w-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          {t("saveButton")}
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo Admin, saya ingin konfirmasi pesanan #${booking.id}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1fb85a]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.54 0 .24 5.3.24 11.82c0 2.08.54 4.11 1.57 5.9L0 24l6.47-1.7a11.78 11.78 0 0 0 5.58 1.42h.01c6.51 0 11.81-5.3 11.81-11.82 0-3.16-1.23-6.13-3.35-8.42ZM12.06 21.7h-.01a9.8 9.8 0 0 1-4.99-1.36l-.36-.21-3.84 1.01 1.03-3.74-.24-.38a9.81 9.81 0 0 1-1.51-5.2c0-5.42 4.41-9.84 9.84-9.84 2.63 0 5.1 1.02 6.95 2.88a9.76 9.76 0 0 1 2.89 6.95c0 5.43-4.41 9.85-9.76 9.85Zm5.4-7.34c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.46-.89-.8-1.5-1.79-1.67-2.09-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.65-.94-2.26-.25-.6-.5-.52-.68-.53h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.23 5.14 4.52.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.08-.13-.28-.2-.58-.35Z" />
              </svg>
              {t("chatAdminButton")}
            </a>
            <a
              href={`/payment/${booking.id}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1434A4] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0f2b8f]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              {t("viewPaymentDetail")}
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
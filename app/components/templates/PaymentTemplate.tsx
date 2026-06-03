"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBookingById } from "@/app/actions/booking";
import type { BookingListItem } from "@/app/types/booking";
import { useTranslations } from "next-intl";

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

type PaymentStatus = "PENDING" | "CONFIRMED" | string;

function PaymentStatusBanner({
  status,
  t,
}: {
  status: PaymentStatus;
  t: (key: string) => string;
}) {
  const isPending = status === "PENDING";
  const isConfirmed = status === "CONFIRMED";

  if (isConfirmed) {
    return (
      <div className="mb-6 rounded-2xl bg-emerald-500 p-5 text-center shadow-lg animate-in fade-in slide-in-from-top-4">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h1 className="text-lg font-bold text-white sm:text-xl">
          {t("payment.status.confirmed.title")}
        </h1>
        <p className="mt-1 text-sm text-emerald-100">
          {t("payment.status.confirmed.subtext")}
        </p>
        <span className="mt-3 inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-semibold text-white">
          {t("payment.status.confirmed.badge")}
        </span>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="mb-6 rounded-2xl bg-amber-500 p-5 text-center shadow-lg animate-in fade-in slide-in-from-top-4">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-amber-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <h1 className="text-lg font-bold text-white sm:text-xl">
          {t("payment.status.pending.title")}
        </h1>
        <p className="mt-1 text-sm text-amber-100">
          {t("payment.status.pending.subtext")}
        </p>
        <span className="mt-3 inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-semibold text-white">
          {t("payment.status.pending.badge")}
        </span>
      </div>
    );
  }

  // fallback
  return (
    <div className="mb-6 rounded-2xl bg-slate-500 p-5 text-center shadow-lg animate-in fade-in slide-in-from-top-4">
      <h1 className="text-lg font-bold text-white sm:text-xl">
        {t("payment.status.fallback.title")}
      </h1>
      <p className="mt-1 text-sm text-slate-100">{status}</p>
    </div>
  );
}

export default function PaymentTemplate({ bookingId }: { bookingId: string }) {
  const t = useTranslations();
  const router = useRouter();
  const [booking, setBooking] = useState<BookingListItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      setIsLoading(true);
      try {
        const result = await getBookingById(Number(bookingId));
        if (result.error) {
          setError(result.error);
        } else {
          setBooking(result.data as BookingListItem);
        }
      } catch {
        setError(t("payment.errorFetchFailed"));
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId, t]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-4 py-16 sm:px-6 lg:px-10">
        <div className="text-center text-slate-500">
          {t("payment.loadingText")}
        </div>
      </main>
    );
  }

  if (error || !booking) {
    return (
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-50 px-4 py-16 sm:px-6 lg:px-10">
        <div className="w-full max-w-md rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
          <p className="mb-4 font-semibold text-rose-600">
            {error || t("payment.errorNotFound")}
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="rounded-lg bg-rose-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            {t("payment.backToOrdersButton")}
          </button>
        </div>
      </main>
    );
  }

  const paymentAccount = {
    bank: "Bank Mandiri",
    number: "1610015123909",
    holder: "FURQAN IHWANI KALIA",
  };

  // Sesuaikan field status dari data booking Anda
  const paymentStatus: PaymentStatus = booking.status ?? "PENDING";

  const bookingTypeLabel = getBookingTypeLabel(booking.type, t);
  const isCustomPrice =
    !booking.shuttleBooking?.price || booking.shuttleBooking.price === 0;
  const compactDescription =
    booking.shuttleBooking?.description?.trim() ||
    (booking.shuttleBooking
      ? `${booking.shuttleBooking.from} → ${booking.shuttleBooking.to}`
      : bookingTypeLabel);

  return (
    <main className="min-h-screen w-full bg-slate-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-2xl">
        {/* Status Banner */}
        <PaymentStatusBanner status={paymentStatus} t={t} />

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          {/* Header stripe */}
          <div className="bg-[#1434A4] px-6 py-5 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
              {t("payment.orderDetail.sectionLabel")}
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs text-blue-300">
                  {t("payment.orderDetail.orderIdLabel")}
                </p>
                <p className="text-2xl font-extrabold text-white">
                  #{booking.id}
                </p>
              </div>
              <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white">
                {bookingTypeLabel}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Deskripsi */}
            <div className="mb-6 rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                {t("payment.orderDetail.serviceLabel")}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-700">
                {compactDescription}
              </p>
            </div>

            {/* Instruksi Pembayaran */}
            <div className="mb-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#1434A4]">
                {t("payment.instructions.heading")}
              </p>
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-xs text-slate-500">
                  {t("payment.instructions.transferLabel")}
                </p>
                <div className="mt-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#1434A4]">
                    {paymentAccount.bank}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <p className="text-2xl font-black tracking-wider text-slate-900 sm:text-3xl">
                      {paymentAccount.number}
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paymentAccount.number);
                        alert(t("payment.instructions.copiedAlert"));
                      }}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#1434A4] shadow-sm transition hover:bg-blue-100"
                      title={t("payment.instructions.copyButtonTitle")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-4 w-4"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">
                    {t("payment.instructions.accountHolderPrefix")}{" "}
                    <span className="font-semibold text-slate-700">
                      {paymentAccount.holder}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Total Pembayaran */}
            <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                  {t("payment.total.label")}
                </p>
                <p className="mt-1 text-2xl font-black text-slate-900">
                  {isCustomPrice
                    ? t("payment.total.customPriceText")
                    : formatCurrency(booking.shuttleBooking!.price)}
                </p>
              </div>
              {!isCustomPrice && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1434A4]/8 text-[#1434A4]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Konfirmasi Harga (custom price) */}
            {isCustomPrice && (
              <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-semibold text-amber-800">
                  {t("payment.customPrice.noticeTitle")}
                </p>
                <p className="mt-1 text-xs text-amber-700">
                  {t("payment.customPrice.noticeBody", {
                    type: bookingTypeLabel,
                  })}
                </p>
                <a
                  href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                    t("payment.customPrice.whatsappMessage", {
                      id: booking.id,
                      type: bookingTypeLabel,
                    }),
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1fb85a]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.54 0 .24 5.3.24 11.82c0 2.08.54 4.11 1.57 5.9L0 24l6.47-1.7a11.78 11.78 0 0 0 5.58 1.42h.01c6.51 0 11.81-5.3 11.81-11.82 0-3.16-1.23-6.13-3.35-8.42ZM12.06 21.7h-.01a9.8 9.8 0 0 1-4.99-1.36l-.36-.21-3.84 1.01 1.03-3.74-.24-.38a9.81 9.81 0 0 1-1.51-5.2c0-5.42 4.41-9.84 9.84-9.84 2.63 0 5.1 1.02 6.95 2.88a9.76 9.76 0 0 1 2.89 6.95c0 5.43-4.41 9.85-9.76 9.85Zm5.4-7.34c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.46-.89-.8-1.5-1.79-1.67-2.09-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.65-.94-2.26-.25-.6-.5-.52-.68-.53h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.23 5.14 4.52.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.08-.13-.28-.2-.58-.35Z" />
                  </svg>
                  {t("payment.customPrice.chatAdminButton")}
                </a>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => router.push("/orders")}
                className="w-full rounded-xl bg-[#1434A4] py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#0f278a]"
              >
                {t("payment.cta.viewOrdersButton")}
              </button>
            </div>

            <p className="mt-5 text-center text-xs text-slate-400">
              {t("payment.cta.uploadProofNote")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

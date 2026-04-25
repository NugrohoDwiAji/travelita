type DateValue = Date | string;

type BookingSummary = {
  id: number;
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

type StatusMeta = {
  label: string;
  badgeClass: string;
  dotClass: string;
};

type OrderBookingDetailPopupProps = {
  open: boolean;
  onClose: () => void;
  booking: BookingSummary;
  shuttleDetail: ShuttleDetail | null;
  statusMeta: StatusMeta;
};

function formatDate(value: DateValue) {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function OrderBookingDetailPopup({
  open,
  onClose,
  booking,
  shuttleDetail,
  statusMeta,
}: OrderBookingDetailPopupProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Detail Pemesanan</p>
            <h3 className="mt-1 text-lg font-bold text-slate-900">#{booking.id}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Tutup
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Status</p>
            <span
              className={`mt-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${statusMeta.badgeClass}`}
            >
              <span className={`h-2 w-2 rounded-full ${statusMeta.dotClass}`} />
              {statusMeta.label}
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Dibuat</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{formatDate(booking.createdAt)}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Diupdate</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{formatDate(booking.updatedAt)}</p>
          </div>

          {shuttleDetail && (
            <>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Rute</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {shuttleDetail.from} - {shuttleDetail.to}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Tipe Shuttle</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{shuttleDetail.shuttleType}</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Berangkat</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{formatDate(shuttleDetail.leavingTime)}</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Pulang</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {shuttleDetail.returnTime ? formatDate(shuttleDetail.returnTime) : "-"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Penumpang</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{shuttleDetail.passengerCount}</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                <label
                  htmlFor="payment-proof"
                  className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
                >
                  Bukti Pembayaran
                </label>
                <input
                  id="payment-proof"
                  type="file"
                  accept="image/*,.pdf"
                  className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-[#1434A4] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-[#0f2b8f]"
                />
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Deskripsi</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{shuttleDetail.description}</p>
              </div>

              <div className="sm:col-span-2">
                <a
                  href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo Admin, saya ingin konfirmasi pesanan #${booking.id}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1fb85a]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.54 0 .24 5.3.24 11.82c0 2.08.54 4.11 1.57 5.9L0 24l6.47-1.7a11.78 11.78 0 0 0 5.58 1.42h.01c6.51 0 11.81-5.3 11.81-11.82 0-3.16-1.23-6.13-3.35-8.42ZM12.06 21.7h-.01a9.8 9.8 0 0 1-4.99-1.36l-.36-.21-3.84 1.01 1.03-3.74-.24-.38a9.81 9.81 0 0 1-1.51-5.2c0-5.42 4.41-9.84 9.84-9.84 2.63 0 5.1 1.02 6.95 2.88a9.76 9.76 0 0 1 2.89 6.95c0 5.43-4.41 9.85-9.76 9.85Zm5.4-7.34c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.46-.89-.8-1.5-1.79-1.67-2.09-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.65-.94-2.26-.25-.6-.5-.52-.68-.53h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.23 5.14 4.52.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.08-.13-.28-.2-.58-.35Z" />
                  </svg>
                  Chat Admin via WhatsApp
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

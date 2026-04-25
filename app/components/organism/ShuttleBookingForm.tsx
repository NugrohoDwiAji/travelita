"use client";

import { useState, useTransition } from "react";
import CitySelect from "@/app/components/moleculs/CitySelect";
import Counter from "@/app/components/atoms/Counter";
import {
  IconLocation,
  IconCalendar,
  IconClock,
  IconPerson,
  IconSwap,
} from "@/app/components/atoms/BookingIcons";
import ShuttleConfirmDialog from "@/app/components/moleculs/ShuttleConfirmDialog";
import AlertDialog from "@/app/components/moleculs/AlertDialog";
import { postShuttleBooking } from "@/app/actions/shuttleService";
import { shuttleData } from "@/app/utils/city";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const TRIP_TYPES = ["Sekali Jalan", "Pulang Pergi"];

function getRoutePrice(from: string, to: string): number | null {
  const rates = shuttleData.rates as Record<string, number>;
  return rates[`${from}-${to}`] ?? rates[`${to}-${from}`] ?? null;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function ShuttleBookingForm() {
  const [isSubmitting, startTransition] = useTransition();
  const [tripType, setTripType]         = useState(0);
  const [from, setFrom]                 = useState("");
  const [to, setTo]                     = useState("");
  const [dateGo, setDateGo]             = useState("");
  const [timeGo, setTimeGo]             = useState("");
  const [dateBack, setDateBack]         = useState("");
  const [timeBack, setTimeBack]         = useState("");
  const [passengers, setPassengers]     = useState(1);
  const [submitted, setSubmitted]       = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [showPaymentCard, setShowPaymentCard] = useState(false);
  const [alertMsg, setAlertMsg]         = useState<{ title: string; message: string; variant: "warning" | "error" | "success"; redirectTo?: string } | null>(null);
  const {data:session, status} = useSession();
  const router = useRouter();

  // 2. Cek status loading (opsional tapi disarankan)
  if (status === "loading") return <p>Memuat data...</p>;

  const isLoggedIn = !!session?.user;
  const role = session?.user?.role;

  const today = new Date().toISOString().split("T")[0];

  function swapCities() {
    setFrom(to);
    setTo(from);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setShowPaymentCard(false);
    setShowConfirm(true);
  }

  function handleCloseAlert() {
    const redirectTo = alertMsg?.redirectTo;
    setAlertMsg(null);

    if (redirectTo) {
      router.push(redirectTo);
    }
  }

  function handleConfirm() {
    if (!isLoggedIn) {
      setAlertMsg({
        title: "Login Diperlukan",
        message: "Silakan masuk terlebih dahulu untuk melanjutkan pemesanan.",
        variant: "warning",
        redirectTo: "/signin",
      });
      setShowConfirm(false);
      return;
    }

    if (role === "ADMIN") {
      setAlertMsg({
        title: "Akses Ditolak",
        message: "Akun admin tidak dapat melakukan pemesanan shuttle.",
        variant: "error",
      });
      setShowConfirm(false);
      return;
    }

    const priceToSubmit = totalEstimate ?? unitPrice;
    if (!priceToSubmit) {
      setAlertMsg({
        title: "Rute Tidak Tersedia",
        message: "Harga untuk rute ini belum tersedia. Silakan pilih rute lain.",
        variant: "error",
      });
      setShowConfirm(false);
      return;
    }

    const leavingTime = new Date(`${dateGo}T${timeGo}`).toISOString();
    const returnTime = tripType === 1 && dateBack && timeBack
      ? new Date(`${dateBack}T${timeBack}`).toISOString()
      : undefined;

    setShowConfirm(false);

    startTransition(async () => {
      const result = await postShuttleBooking({
        shuttleType: tripType === 1 ? "ROUND_TRIP" : "ONE_WAY",
        from,
        to,
        leavingTime,
        returnTime,
        passengerCount: passengers,
        price: String(priceToSubmit),
        description: `${TRIP_TYPES[tripType]} ${from} ke ${to} untuk ${passengers} penumpang`,
      });

      if (result.error) {
        setShowPaymentCard(false);
        setAlertMsg({
          title: "Pemesanan Gagal",
          message: result.error,
          variant: "error",
        });
        return;
      }

      setShowPaymentCard(true);
      setSubmitted(true);
      setAlertMsg({
        title: "Pemesanan Berhasil",
        message: result.message || "Pemesanan shuttle berhasil disimpan.",
        variant: "success",
      });
      setTimeout(() => setSubmitted(false), 3000);
      router.refresh();
    });
  }

  const unitPrice = getRoutePrice(from, to);
  const multiplier = tripType === 1 ? 2 : 1;
  const totalEstimate = unitPrice ? unitPrice * passengers * multiplier : null;

  const paymentAccount = {
    bank: "Bank BCA",
    number: "1234567890",
    holder: "PT Travelita Nusantara",
  };

  return (
    <div
      className="rounded-2xl p-6 sm:p-8 shadow-2xl"
      style={{ background: "#fff", border: "1.5px solid rgba(20,52,164,0.10)" }}
    >
      {/* Trip type tabs */}
      <div className="mb-6 flex gap-1 rounded-xl p-1" style={{ background: "#eef0fb" }}>
        {TRIP_TYPES.map((t, i) => (
          <button
            key={t}
            type="button"
            onClick={() => setTripType(i)}
            className="flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200"
            style={
              tripType === i
                ? { background: "#1434A4", color: "#fff", boxShadow: "0 2px 8px rgba(20,52,164,0.25)" }
                : { background: "transparent", color: "#4050b5" }
            }
          >
            {t}
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch}>
        {/* Origin / Destination */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 sm:gap-0">
          <CitySelect
            label="Dari"
            icon={<IconLocation />}
            value={from}
            onChange={setFrom}
            placeholder="Kota asal…"
            cities={shuttleData.locations}
          />

          {/* Swap button */}
          <div className="flex items-end justify-center sm:px-3 pb-0 sm:pb-0.75">
            <button
              type="button"
              onClick={swapCities}
              className="flex h-10 w-10 items-center justify-center rounded-full border transition hover:scale-110 active:scale-95"
              style={{ borderColor: "#1434A4", color: "#1434A4", background: "#eef0fb" }}
              title="Tukar kota"
            >
              <IconSwap />
            </button>
          </div>

          <CitySelect
            label="Ke"
            icon={<IconLocation />}
            value={to}
            onChange={setTo}
            placeholder="Kota tujuan…"
            cities={shuttleData.locations}
          />
        </div>

        {/* Dates + Times + Passengers */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Tanggal Pergi */}
          <div className="flex flex-col">
            <label className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#4050b5" }}>
              Tanggal Pergi
            </label>
            <div
              className="flex items-center gap-2 rounded-xl border px-4 py-3.5 transition hover:border-blue-400"
              style={{ borderColor: "rgba(20,52,164,0.20)", background: "#fff" }}
            >
              <span style={{ color: "#1434A4" }}><IconCalendar /></span>
              <input
                type="date"
                min={today}
                value={dateGo}
                onChange={(e) => setDateGo(e.target.value)}
                required
                className="flex-1 bg-transparent text-sm font-medium outline-none"
                style={{ color: "#1434A4" }}
              />
            </div>
          </div>

          {/* Jam Pergi */}
          <div className="flex flex-col">
            <label className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#4050b5" }}>
              Jam Pergi
            </label>
            <div
              className="flex items-center gap-2 rounded-xl border px-4 py-3.5 transition hover:border-blue-400"
              style={{ borderColor: "rgba(20,52,164,0.20)", background: "#fff" }}
            >
              <span style={{ color: "#1434A4" }}><IconClock /></span>
              <input
                type="time"
                value={timeGo}
                onChange={(e) => setTimeGo(e.target.value)}
                required
                className="flex-1 bg-transparent text-sm font-medium outline-none"
                style={{ color: "#1434A4" }}
              />
            </div>
          </div>

          {/* Tanggal Pulang */}
          <div className={`flex flex-col transition-all duration-300 ${tripType === 0 ? "opacity-40 pointer-events-none" : ""}`}>
            <label className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#4050b5" }}>
              Tanggal Pulang
            </label>
            <div
              className="flex items-center gap-2 rounded-xl border px-4 py-3.5 transition hover:border-blue-400"
              style={{ borderColor: "rgba(20,52,164,0.20)", background: "#fff" }}
            >
              <span style={{ color: "#1434A4" }}><IconCalendar /></span>
              <input
                type="date"
                min={dateGo || today}
                value={dateBack}
                onChange={(e) => setDateBack(e.target.value)}
                disabled={tripType === 0}
                className="flex-1 bg-transparent text-sm font-medium outline-none"
                style={{ color: "#1434A4" }}
              />
            </div>
          </div>

          {/* Jam Pulang */}
          <div className={`flex flex-col transition-all duration-300 ${tripType === 0 ? "opacity-40 pointer-events-none" : ""}`}>
            <label className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#4050b5" }}>
              Jam Pulang
            </label>
            <div
              className="flex items-center gap-2 rounded-xl border px-4 py-3.5 transition hover:border-blue-400"
              style={{ borderColor: "rgba(20,52,164,0.20)", background: "#fff" }}
            >
              <span style={{ color: "#1434A4" }}><IconClock /></span>
              <input
                type="time"
                value={timeBack}
                onChange={(e) => setTimeBack(e.target.value)}
                disabled={tripType === 0}
                className="flex-1 bg-transparent text-sm font-medium outline-none"
                style={{ color: "#1434A4" }}
              />
            </div>
          </div>

          {/* Penumpang */}
          <div className="flex flex-col">
            <label className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#4050b5" }}>
              Penumpang
            </label>
            <div
              className="flex items-center gap-2 rounded-xl border px-4 py-3.5"
              style={{ borderColor: "rgba(20,52,164,0.20)", background: "#fff" }}
            >
              <span style={{ color: "#1434A4" }}><IconPerson /></span>
              <div className="flex flex-1 items-center justify-between">
                <span className="text-sm font-medium" style={{ color: "#4050b5" }}>
                  {passengers} Penumpang
                </span>
                <Counter value={passengers} onChange={setPassengers} />
              </div>
            </div>
          </div>
        </div>

        {/* Estimasi Biaya */}
        {(() => {
          const isReady = from && to && dateGo && timeGo && (tripType === 0 || (dateBack && timeBack));

          if (!isReady) return null;

          return (
            <div
              className="mt-4 overflow-hidden rounded-xl transition-all duration-300 animate-in fade-in slide-in-from-top-2"
              style={{ border: "1.5px solid rgba(20,52,164,0.12)", background: "#f8f9ff" }}
            >
              <div className="px-5 py-4">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#4050b5" }}>
                  Estimasi Biaya
                </p>

                <div className="space-y-2">
                  {/* Harga per orang */}
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: "#4050b5" }}>
                      Harga per orang {tripType === 1 ? "(sekali jalan)" : ""}
                    </span>
                    <span className="font-semibold" style={{ color: "#1434A4" }}>
                      {unitPrice ? formatPrice(unitPrice) : "Rute tidak tersedia"}
                    </span>
                  </div>

                  {/* Jumlah penumpang */}
                  {unitPrice && (
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: "#4050b5" }}>
                        {passengers} penumpang × {tripType === 1 ? "2 perjalanan" : "1 perjalanan"}
                      </span>
                      <span className="font-semibold" style={{ color: "#1434A4" }}>
                        × {passengers * multiplier}
                      </span>
                    </div>
                  )}
                </div>

                {/* Divider + Total */}
                {totalEstimate !== null && (
                  <>
                    <div className="my-3 h-px" style={{ background: "rgba(20,52,164,0.10)" }} />
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold" style={{ color: "#4050b5" }}>
                        Total Estimasi
                      </span>
                      <span className="text-lg font-bold" style={{ color: "#1434A4" }}>
                        {formatPrice(totalEstimate)}
                      </span>
                    </div>
                  </>
                )}

                {!unitPrice && (
                  <p className="mt-2 text-xs" style={{ color: "#94a3b8" }}>
                    Harga untuk rute ini belum tersedia. Silakan hubungi kami untuk info lebih lanjut.
                  </p>
                )}
              </div>
            </div>
          );
        })()}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-5 w-full rounded-xl py-4 text-base font-bold uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:brightness-110 hover:shadow-xl active:scale-[0.99]"
          style={{ background: "linear-gradient(90deg, #1434A4, #3d52c6)" }}
        >
          {isSubmitting ? "Menyimpan Pemesanan..." : submitted ? "✓ Pemesanan Tersimpan" : "Cari Jadwal Shuttle"}
        </button>

        {showPaymentCard && (
          <div
            className="mt-5 overflow-hidden rounded-xl border animate-in fade-in slide-in-from-bottom-2 duration-300"
            style={{ borderColor: "rgba(20,52,164,0.20)", background: "#f8f9ff" }}
          >
            <div className="px-5 py-4">
              <p
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "#4050b5" }}
              >
                Detail Pembayaran
              </p>

              <div className="mt-3 rounded-xl border bg-white px-4 py-3" style={{ borderColor: "rgba(20,52,164,0.16)" }}>
                <p className="text-xs" style={{ color: "#4050b5" }}>Transfer ke Rekening</p>
                <p className="mt-1 text-sm font-semibold" style={{ color: "#1434A4" }}>
                  {paymentAccount.bank}
                </p>
                <p className="text-2xl font-extrabold tracking-wider" style={{ color: "#1434A4" }}>
                  {paymentAccount.number}
                </p>
                <p className="text-sm" style={{ color: "#4050b5" }}>
                  A/N {paymentAccount.holder}
                </p>
              </div>

              <div className="mt-3 space-y-2 rounded-xl border bg-white px-4 py-3 text-sm" style={{ borderColor: "rgba(20,52,164,0.16)", color: "#4050b5" }}>
                <div className="flex items-center justify-between">
                  <span>Total Dibayar</span>
                  <span className="font-bold" style={{ color: "#1434A4" }}>
                    {totalEstimate ? formatPrice(totalEstimate) : "Menunggu estimasi"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Batas Pembayaran</span>
                  <span className="font-semibold" style={{ color: "#1434A4" }}>24 Jam</span>
                </div>
                <div className="h-px" style={{ background: "rgba(20,52,164,0.10)" }} />
                <p className="text-xs">
                  Setelah transfer, simpan bukti pembayaran lalu konfirmasi ke admin agar pesanan diproses.
                </p>
              </div>
            </div>
          </div>
        )}
      </form>

      <ShuttleConfirmDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        data={{
          tripType: TRIP_TYPES[tripType],
          from,
          to,
          dateGo,
          timeGo,
          dateBack,
          timeBack,
          passengers,
          price: getRoutePrice(from, to),
         
        }}
      />

      {alertMsg && (
        <AlertDialog
          open={!!alertMsg}
          onClose={handleCloseAlert}
          title={alertMsg.title}
          message={alertMsg.message}
          variant={alertMsg.variant}
          onAction={handleCloseAlert}
        />
      )}
    </div>
  );
}

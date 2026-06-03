"use client";

import { useState, useTransition } from "react";
import CitySelect from "@/app/components/moleculs/CitySelect";
import Counter from "@/app/components/atoms/Counter";
import AlertDialog from "@/app/components/moleculs/AlertDialog";
import BookingConfirmDialog from "@/app/components/moleculs/BookingConfirmDialog";
import { postServiceBooking } from "@/app/actions/serviceBooking";
import { baliNusraLocations } from "@/app/utils/city";
import { useRouter } from "next/navigation";
import {
  IconLocation,
  IconCalendar,
  IconClock,
  IconPerson,
} from "@/app/components/atoms/BookingIcons";
import { DEFAULT_PRICING } from "@/app/components/admin/moleculs/AdminPrivateCarPricingTab";
import type { PrivateCarPricing } from "@/app/components/admin/moleculs/AdminPrivateCarPricingTab";

interface LocalCarType {
  id: string;
  name: string;
  examples: string;
  seats: string;
  luggage: string;
  icon: string;
  price: string;
  unit: string;
  basePrice: number;
  highlights: string[];
}

const CAR_TYPE_DETAILS: Omit<LocalCarType, "price" | "basePrice" | "id" | "name" | "icon" | "unit"> = {
  examples: "Avanza, Xenia, Innova",
  seats: "6–7 Penumpang",
  luggage: "2–3 Koper",
  highlights: ["Cocok untuk keluarga", "Bagasi luas", "AC double blower"],
};

function buildCarType(pricing: PrivateCarPricing): LocalCarType {
  return {
    ...CAR_TYPE_DETAILS,
    id: "mpv",
    name: "MPV / Minivan",
    icon: "🚐",
    price: `Rp ${pricing.basePrice.toLocaleString("id-ID")}`,
    unit: "/ 12 jam",
    basePrice: pricing.basePrice,
  };
}

function buildDurations(multiplier: number) {
  return [
    { label: "Full Day (24 Jam)", value: "24", note: "Fleksibel penuh", multiplier },
    { label: "Multi-hari", value: "multi", note: "2 hari+", multiplier: 1 },
  ];
}

interface PrivateCarBookingFormProps {
  pricing?: PrivateCarPricing;
}

export default function PrivateCarBookingForm({ pricing }: PrivateCarBookingFormProps) {
  const initialPricing = pricing ?? DEFAULT_PRICING;
  const [isSubmitting, startTransition] = useTransition();
  const carData = buildCarType(initialPricing);
  const durations = buildDurations(initialPricing.fullDayMultiplier);
  const [selectedDuration, setSelectedDuration] = useState("24");
  const [pickup, setPickup] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [days, setDays] = useState(2);
  const [passengers, setPassengers] = useState(1);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [alertMsg, setAlertMsg] = useState<{
    title: string;
    message: string;
    variant: "warning" | "error" | "success";
    redirectTo?: string;
  } | null>(null);
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0];
  const durData = durations.find((d) => d.value === selectedDuration);

  const multiplier = selectedDuration === "multi" ? days : durData?.multiplier || 0;
  const estimated = new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", maximumFractionDigits: 0,
  }).format(carData.basePrice * multiplier);

  function handleCloseAlert() {
    const redirectTo = alertMsg?.redirectTo;
    setAlertMsg(null);
    if (redirectTo) router.push(redirectTo);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowConfirm(true);
  }

  function handleConfirm() {
    const needsLogin = alertMsg?.redirectTo === "/signin";
    if (!needsLogin && alertMsg) {
      setAlertMsg(null);
    }

    const serviceDate = new Date(`${date}T${time}`).toISOString();

    startTransition(async () => {
      const result = await postServiceBooking({
        type: "PRIVATE_CAR",
        from: pickup,
        to: pickup,
        serviceDate,
        passengerCount: passengers,
        price: carData.basePrice * multiplier,
        description: [
          "Dalam Area",
          carData.name,
          selectedDuration === "multi" ? `${days} hari` : durData?.label,
          note ? `Catatan: ${note}` : "",
        ].filter(Boolean).join(" | "),
      });

      setShowConfirm(false);

      if (result.error) {
        const needsLogin = result.error.toLowerCase().includes("login");
        setAlertMsg({
          title: needsLogin ? "Login Diperlukan" : "Pemesanan Gagal",
          message: result.error,
          variant: needsLogin ? "warning" : "error",
          redirectTo: needsLogin ? "/signin" : undefined,
        });
        return;
      }

      setSubmitted(true);
      router.push(`/payment/${result.data?.bookingId}`);
    });
  }

  return (
    <>
      <div
        className="rounded-2xl p-6 sm:p-8 shadow-2xl"
        style={{ background: "#fff", border: "1.5px solid rgba(20,52,164,0.10)" }}
      >
        {/* Label service type — hanya Dalam Area, non-interaktif */}
        <div className="mb-6">
          <span
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
            style={{ background: "rgba(20,52,164,0.07)", color: "#1434A4" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            Dalam Area
          </span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Lokasi Jemput saja */}
          <CitySelect
            label="Lokasi Jemput"
            icon={<IconLocation />}
            value={pickup}
            onChange={setPickup}
            placeholder="Alamat / kota penjemputan…"
            cities={baliNusraLocations}
          />

          {/* Date + Time + Passengers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#4050b5" }}>
                Tanggal
              </label>
              <div
                className="flex items-center gap-2 rounded-xl border px-4 py-3.5 transition hover:border-blue-400"
                style={{ borderColor: "rgba(20,52,164,0.20)", background: "#fff" }}
              >
                <span style={{ color: "#1434A4" }}><IconCalendar /></span>
                <input
                  type="date"
                  min={today}
                  value={date}
                  required
                  onChange={(e) => setDate(e.target.value)}
                  className="flex-1 bg-transparent text-sm font-medium outline-none"
                  style={{ color: "#1434A4" }}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#4050b5" }}>
                Jam Jemput
              </label>
              <div
                className="flex items-center gap-2 rounded-xl border px-4 py-3.5 transition hover:border-blue-400"
                style={{ borderColor: "rgba(20,52,164,0.20)", background: "#fff" }}
              >
                <span style={{ color: "#1434A4" }}><IconClock /></span>
                <input
                  type="time"
                  value={time}
                  required
                  onChange={(e) => setTime(e.target.value)}
                  className="flex-1 bg-transparent text-sm font-medium outline-none"
                  style={{ color: "#1434A4" }}
                />
              </div>
            </div>

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
                    {passengers} Orang
                  </span>
                  <Counter value={passengers} onChange={setPassengers} />
                </div>
              </div>
            </div>
          </div>

          {/* Durasi sewa */}
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#4050b5" }}>
              Durasi Sewa
            </label>
            <div className="grid grid-cols-2 gap-3">
              {durations.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setSelectedDuration(d.value)}
                  className="rounded-xl border py-3 px-3 text-center transition-all duration-200"
                  style={
                    selectedDuration === d.value
                      ? { borderColor: "#1434A4", background: "rgba(20,52,164,0.06)", color: "#1434A4" }
                      : { borderColor: "rgba(20,52,164,0.15)", background: "#fff", color: "#4050b5" }
                  }
                >
                  <p className="text-sm font-bold">{d.label}</p>
                  <p className="text-[10px] mt-0.5 opacity-70">{d.note}</p>
                </button>
              ))}
            </div>
            {selectedDuration === "multi" && (
              <div className="mt-3 flex items-center gap-3">
                <span className="text-sm" style={{ color: "#4050b5" }}>Jumlah hari:</span>
                <Counter value={days} onChange={setDays} min={2} max={30} />
                <span className="text-sm font-semibold" style={{ color: "#1434A4" }}>{days} hari</span>
              </div>
            )}
          </div>

          {/* Catatan */}
          <div className="flex flex-col">
            <label className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#4050b5" }}>
              Catatan / Permintaan Khusus{" "}
              <span className="normal-case font-normal">(opsional)</span>
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Contoh: butuh kursi bayi, perlu papan nama, dll."
              className="rounded-xl border px-4 py-3 text-sm outline-none resize-none transition focus:shadow-sm placeholder:text-gray-400"
              style={{ borderColor: "rgba(20,52,164,0.20)", color: "#1434A4", background: "#fff" }}
            />
          </div>

          {/* Estimasi harga */}
          <div
            className="flex items-center justify-between rounded-xl px-5 py-4"
            style={{ background: "rgba(20,52,164,0.05)", border: "1.5px solid rgba(20,52,164,0.12)" }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#4050b5" }}>
                Estimasi Harga
              </p>
              <p className="text-[11px] mt-0.5" style={{ color: "#4050b5" }}>
                {carData.name} · {selectedDuration === "multi" ? `${days} hari` : durData?.label}
              </p>
            </div>
            <p className="text-xl font-extrabold" style={{ color: "#1434A4" }}>{estimated}</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl py-4 text-base font-bold uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:brightness-110 hover:shadow-xl active:scale-[0.99]"
            style={{ background: "linear-gradient(90deg, #1434A4, #3d52c6)" }}
          >
            {isSubmitting ? "Menyimpan Pemesanan..." : submitted ? "Pemesanan Terkirim" : "Cek Ketersediaan & Pesan"}
          </button>

          <p className="text-center text-[11px]" style={{ color: "#4050b5" }}>
            Harga belum termasuk BBM & tol · Konfirmasi dalam 15 menit
          </p>
        </form>
      </div>

      <BookingConfirmDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        onCancel={() => window.location.reload()}
        price={carData.basePrice * multiplier}
      >
        <div className="space-y-3">
          <div className="flex justify-center">
            <span
              className="rounded-full px-4 py-1 text-xs font-semibold"
              style={{ background: "#eef0fb", color: "#1434A4" }}
            >
              Dalam Area - {carData.name}
            </span>
          </div>

          <div
            className="flex items-center gap-3 rounded-xl p-4"
            style={{ background: "#f8f9ff" }}
          >
            <span style={{ color: "#1434A4" }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg></span>
            <span className="text-sm font-medium" style={{ color: "#1434A4" }}>{pickup}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <DetailItem icon={<IconCalendar />} label="Tanggal" value={new Date(date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} />
            <DetailItem icon={<IconClock />} label="Jam Jemput" value={time} />
            <DetailItem icon={<IconPerson />} label="Penumpang" value={`${passengers} Orang`} />
            <DetailItem icon={<IconCalendar />} label="Durasi" value={selectedDuration === "multi" ? `${days} hari` : "Full Day (24 Jam)"} />
          </div>

          {note && (
            <div className="rounded-lg p-3 text-sm" style={{ background: "#f8f9ff", color: "#4050b5" }}>
              <span className="font-semibold">Catatan:</span> {note}
            </div>
          )}
        </div>
      </BookingConfirmDialog>

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
    </>
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
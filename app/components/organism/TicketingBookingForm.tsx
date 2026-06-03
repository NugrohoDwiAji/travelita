"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import CitySelect from "@/app/components/moleculs/CitySelect";
import AlertDialog from "@/app/components/moleculs/AlertDialog";
import BookingConfirmDialog from "@/app/components/moleculs/BookingConfirmDialog";
import PassengerSelector, {
  PassengerCounts,
} from "@/app/components/moleculs/PassengerSelector";
import {
  IconLocation,
  IconCalendar,
  IconSwap,
  IconPerson,
} from "@/app/components/atoms/BookingIcons";
import {
  IconPlaneFlight,
  IconBusTransport,
  IconFerryBoat,
  IconSeatClass,
} from "@/app/components/atoms/TicketIcons";
import { postServiceBooking } from "@/app/actions/serviceBooking";
import { baliNusraAirports, baliNusraLocations, baliNusraPorts } from "@/app/utils/city";

type TicketTypeId = "plane" | "bus" | "ferry";

const TICKET_TYPES: { id: TicketTypeId; label: string; icon: React.ReactNode }[] = [
  { id: "plane", label: "Pesawat", icon: <IconPlaneFlight size={18} /> },
  { id: "bus", label: "Bus", icon: <IconBusTransport size={18} /> },
  { id: "ferry", label: "Ferry", icon: <IconFerryBoat size={18} /> },
];

const TRIP_TYPES = ["Sekali Jalan", "Pulang Pergi"];

const CITIES: Record<TicketTypeId, string[]> = {
  plane: baliNusraAirports,
  bus: baliNusraLocations,
  ferry: baliNusraPorts,
};

const CLASSES: Record<TicketTypeId, string[]> = {
  plane: ["Ekonomi", "Bisnis", "First Class"],
  bus: ["Regular", "Executive", "Double Decker"],
  ferry: ["Ekonomi", "VIP", "Suite"],
};

export default function TicketingBookingForm() {
  const [isSubmitting, startTransition] = useTransition();
  const [ticketType, setTicketType] = useState<TicketTypeId>("plane");
  const [tripType, setTripType] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [dateGo, setDateGo] = useState("");
  const [dateBack, setDateBack] = useState("");
  const [passengers, setPassengers] = useState<PassengerCounts>({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [seatClass, setSeatClass] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [alertMsg, setAlertMsg] = useState<{ title: string; message: string; variant: "warning" | "error" | "success"; redirectTo?: string } | null>(null);
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0];
  const currentLabel = TICKET_TYPES.find((t) => t.id === ticketType)?.label ?? "";

  function handleTicketTypeChange(id: TicketTypeId) {
    setTicketType(id);
    setFrom("");
    setTo("");
    setSeatClass(0);
  }

  function swapCities() {
    setFrom(to);
    setTo(from);
  }

  function handleCloseAlert() {
    const redirectTo = alertMsg?.redirectTo;
    setAlertMsg(null);
    if (redirectTo) router.push(redirectTo);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setShowConfirm(true);
  }

  function handleConfirm() {
    const totalPassengers = passengers.adults + passengers.children + passengers.infants;
    const returnDate = tripType === 1 && dateBack ? new Date(`${dateBack}T00:00`).toISOString() : undefined;

    startTransition(async () => {
      const result = await postServiceBooking({
        type: "TICKET",
        from,
        to,
        serviceDate: new Date(`${dateGo}T00:00`).toISOString(),
        returnDate,
        passengerCount: totalPassengers,
        price: 0,
        description: [
          currentLabel,
          TRIP_TYPES[tripType],
          CLASSES[ticketType][seatClass],
          `${passengers.adults} dewasa, ${passengers.children} anak, ${passengers.infants} bayi`,
        ].join(" | "),
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
    <div
      className="rounded-2xl p-6 sm:p-8 shadow-2xl"
      style={{ background: "#fff", border: "1.5px solid rgba(20,52,164,0.10)" }}
    >
      <div className="mb-5 flex gap-1 rounded-xl p-1" style={{ background: "#eef0fb" }}>
        {TICKET_TYPES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => handleTicketTypeChange(t.id)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200"
            style={
              ticketType === t.id
                ? { background: "#1434A4", color: "#fff", boxShadow: "0 2px 8px rgba(20,52,164,0.25)" }
                : { background: "transparent", color: "#4050b5" }
            }
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      <div className="mb-5 flex gap-2">
        {TRIP_TYPES.map((t, i) => (
          <button
            key={t}
            type="button"
            onClick={() => setTripType(i)}
            className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200"
            style={
              tripType === i
                ? { background: "rgba(20,52,164,0.08)", color: "#1434A4", border: "1.5px solid #1434A4" }
                : { background: "transparent", color: "#4050b5", border: "1.5px solid rgba(20,52,164,0.20)" }
            }
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-full border-2 transition-colors"
              style={{
                borderColor: tripType === i ? "#1434A4" : "#b0bbeb",
                background: tripType === i ? "#1434A4" : "transparent",
              }}
            />
            {t}
          </button>
        ))}
      </div>

      <form onSubmit={handleSearch}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 sm:gap-0">
          <CitySelect
            label="Dari"
            icon={<IconLocation />}
            value={from}
            onChange={setFrom}
            placeholder="Kota / bandara asal..."
            cities={CITIES[ticketType]}
          />
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
            placeholder="Kota / bandara tujuan..."
            cities={CITIES[ticketType]}
          />
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#4050b5" }}>
              Tanggal Pergi
            </label>
            <div className="flex items-center gap-2 rounded-xl border px-4 py-3.5 transition hover:border-blue-400" style={{ borderColor: "rgba(20,52,164,0.20)", background: "#fff" }}>
              <span style={{ color: "#1434A4" }}><IconCalendar /></span>
              <input
                type="date"
                min={today}
                value={dateGo}
                required
                onChange={(e) => setDateGo(e.target.value)}
                className="flex-1 bg-transparent text-sm font-medium outline-none"
                style={{ color: "#1434A4" }}
              />
            </div>
          </div>

          <div className={`flex flex-col transition-all duration-300 ${tripType === 0 ? "opacity-40 pointer-events-none" : ""}`}>
            <label className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#4050b5" }}>
              Tanggal Pulang
            </label>
            <div className="flex items-center gap-2 rounded-xl border px-4 py-3.5 transition hover:border-blue-400" style={{ borderColor: "rgba(20,52,164,0.20)", background: "#fff" }}>
              <span style={{ color: "#1434A4" }}><IconCalendar /></span>
              <input
                type="date"
                min={dateGo || today}
                value={dateBack}
                disabled={tripType === 0}
                required={tripType === 1}
                onChange={(e) => setDateBack(e.target.value)}
                className="flex-1 bg-transparent text-sm font-medium outline-none"
                style={{ color: "#1434A4" }}
              />
            </div>
          </div>

          <PassengerSelector value={passengers} onChange={setPassengers} />
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <span style={{ color: "#1434A4" }}><IconSeatClass /></span>
            <label className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#4050b5" }}>
              Kelas
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            {CLASSES[ticketType].map((cls, i) => (
              <button
                key={cls}
                type="button"
                onClick={() => setSeatClass(i)}
                className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200"
                style={
                  seatClass === i
                    ? { background: "#1434A4", color: "#fff", boxShadow: "0 2px 8px rgba(20,52,164,0.25)" }
                    : { background: "#eef0fb", color: "#4050b5" }
                }
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-xl py-4 text-base font-bold uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:brightness-110 hover:shadow-xl active:scale-[0.99]"
          style={{ background: "linear-gradient(90deg, #1434A4, #3d52c6)" }}
        >
          {isSubmitting ? "Menyimpan Permintaan..." : submitted ? "Permintaan Terkirim" : `Cari Tiket ${currentLabel}`}
        </button>
      </form>

      <BookingConfirmDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        onCancel={() => window.location.reload()}
        price={0}
      >
        <div className="space-y-3">
          <div className="flex justify-center">
            <span
              className="rounded-full px-4 py-1 text-xs font-semibold"
              style={{ background: "#eef0fb", color: "#1434A4" }}
            >
              {currentLabel} - {TRIP_TYPES[tripType]}
            </span>
          </div>

          <div
            className="flex items-center gap-3 rounded-xl p-4"
            style={{ background: "#f8f9ff" }}
          >
            <span style={{ color: "#1434A4" }}><IconLocation /></span>
            <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm font-medium min-w-0">
              <span className="truncate" style={{ color: "#1434A4" }}>{from}</span>
              <span className="text-[10px] font-semibold uppercase" style={{ color: "#4050b5" }}>→</span>
              <span className="truncate" style={{ color: "#1434A4" }}>{to}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <DetailItem icon={<IconCalendar />} label="Tanggal Pergi" value={new Date(dateGo).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} />
            {tripType === 1 && dateBack && (
              <DetailItem icon={<IconCalendar />} label="Tanggal Pulang" value={new Date(dateBack).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} />
            )}
            <DetailItem icon={<IconPerson />} label="Penumpang" value={`${passengers.adults + passengers.children + passengers.infants} Orang`} />
            <DetailItem icon={<IconLocation />} label="Kelas" value={CLASSES[ticketType][seatClass]} />
          </div>
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

"use client";

import { useState } from "react";
import CitySelect from "@/app/components/moleculs/CitySelect/CitySelect";
import PassengerSelector, {
  PassengerCounts,
} from "@/app/components/moleculs/PassengerSelector/PassengerSelector";
import {
  IconLocation,
  IconCalendar,
  IconSwap,
} from "@/app/components/atoms/BookingIcons/BookingIcons";
import {
  IconPlaneFlight,
  IconTrainRail,
  IconBusTransport,
  IconFerryBoat,
  IconSeatClass,
} from "@/app/components/atoms/TicketIcons/TicketIcons";

type TicketTypeId = "plane" | "train" | "bus" | "ferry";

const TICKET_TYPES: { id: TicketTypeId; label: string; icon: React.ReactNode }[] = [
  { id: "plane", label: "Pesawat", icon: <IconPlaneFlight size={18} /> },
  { id: "train", label: "Kereta",  icon: <IconTrainRail size={18} />   },
  { id: "bus",   label: "Bus",     icon: <IconBusTransport size={18} /> },
  { id: "ferry", label: "Ferry",   icon: <IconFerryBoat size={18} />   },
];

const TRIP_TYPES = ["Sekali Jalan", "Pulang Pergi"];

const CITIES: Record<TicketTypeId, string[]> = {
  plane: [
    "Jakarta (CGK)", "Jakarta (HLP)", "Bali (DPS)", "Surabaya (SUB)",
    "Yogyakarta (JOG)", "Medan (KNO)", "Makassar (UPG)", "Balikpapan (BPN)",
    "Semarang (SRG)", "Palembang (PLM)", "Pekanbaru (PKU)", "Padang (PDG)",
    "Banjarmasin (BDJ)", "Lombok (LOP)", "Manado (MDC)", "Batam (BTH)",
    "Solo (SOC)", "Pontianak (PNK)", "Ambon (AMQ)", "Jayapura (DJJ)",
  ],
  train: [
    "Jakarta (Gambir)", "Jakarta (Pasar Senen)", "Bandung",
    "Surabaya (Gubeng)", "Surabaya (Pasar Turi)", "Yogyakarta",
    "Solo (Balapan)", "Semarang (Tawang)", "Purwokerto",
    "Malang", "Cirebon", "Tasikmalaya", "Jember", "Banyuwangi",
    "Blitar", "Kediri", "Madiun",
  ],
  bus: [
    "Jakarta", "Bandung", "Surabaya", "Malang", "Yogyakarta", "Solo",
    "Semarang", "Denpasar", "Mataram", "Medan", "Palembang",
    "Lampung", "Jambi", "Padang", "Pekanbaru", "Bukittinggi",
  ],
  ferry: [
    "Bali (Gilimanuk)", "Banyuwangi (Ketapang)", "Lombok (Lembar)",
    "Bali (Padangbai)", "Batam (Harbour Bay)", "Batam (Sekupang)",
    "Bintan", "Tanjung Pinang", "Surabaya (Tanjung Perak)",
    "Makassar", "Balikpapan", "Tarakan", "Semarang (Tanjung Emas)",
  ],
};

const CLASSES: Record<TicketTypeId, string[]> = {
  plane: ["Ekonomi", "Bisnis", "First Class"],
  train: ["Ekonomi", "Bisnis", "Eksekutif"],
  bus:   ["Regular", "Executive", "Double Decker"],
  ferry: ["Ekonomi", "VIP", "Suite"],
};

export default function TicketingBookingForm() {
  const [ticketType, setTicketType] = useState<TicketTypeId>("plane");
  const [tripType, setTripType]     = useState(0);
  const [from, setFrom]             = useState("");
  const [to, setTo]                 = useState("");
  const [dateGo, setDateGo]         = useState("");
  const [dateBack, setDateBack]     = useState("");
  const [passengers, setPassengers] = useState<PassengerCounts>({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [seatClass, setSeatClass]   = useState(0);
  const [submitted, setSubmitted]   = useState(false);

  const today = new Date().toISOString().split("T")[0];

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

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  const currentLabel = TICKET_TYPES.find((t) => t.id === ticketType)?.label ?? "";

  return (
    <div
      className="rounded-2xl p-6 sm:p-8 shadow-2xl"
      style={{ background: "#fff", border: "1.5px solid rgba(20,52,164,0.10)" }}
    >
      {/* Ticket type tabs */}
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

      {/* Trip type radio */}
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
        {/* Origin / Destination */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 sm:gap-0">
          <CitySelect
            label="Dari"
            icon={<IconLocation />}
            value={from}
            onChange={setFrom}
            placeholder="Kota / bandara asal…"
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
            placeholder="Kota / bandara tujuan…"
            cities={CITIES[ticketType]}
          />
        </div>

        {/* Dates + Passengers */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Tanggal Pergi */}
          <div className="flex flex-col">
            <label
              className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: "#4050b5" }}
            >
              Tanggal Pergi
            </label>
            <div
              className="flex items-center gap-2 rounded-xl border px-4 py-3.5 transition hover:border-blue-400"
              style={{ borderColor: "rgba(20,52,164,0.20)", background: "#fff" }}
            >
              <span style={{ color: "#1434A4" }}>
                <IconCalendar />
              </span>
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

          {/* Tanggal Pulang */}
          <div
            className={`flex flex-col transition-all duration-300 ${
              tripType === 0 ? "opacity-40 pointer-events-none" : ""
            }`}
          >
            <label
              className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: "#4050b5" }}
            >
              Tanggal Pulang
            </label>
            <div
              className="flex items-center gap-2 rounded-xl border px-4 py-3.5 transition hover:border-blue-400"
              style={{ borderColor: "rgba(20,52,164,0.20)", background: "#fff" }}
            >
              <span style={{ color: "#1434A4" }}>
                <IconCalendar />
              </span>
              <input
                type="date"
                min={dateGo || today}
                value={dateBack}
                disabled={tripType === 0}
                onChange={(e) => setDateBack(e.target.value)}
                className="flex-1 bg-transparent text-sm font-medium outline-none"
                style={{ color: "#1434A4" }}
              />
            </div>
          </div>

          {/* Penumpang */}
          <PassengerSelector value={passengers} onChange={setPassengers} />
        </div>

        {/* Kelas */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <span style={{ color: "#1434A4" }}>
              <IconSeatClass />
            </span>
            <label
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: "#4050b5" }}
            >
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
                    ? {
                        background: "#1434A4",
                        color: "#fff",
                        boxShadow: "0 2px 8px rgba(20,52,164,0.25)",
                      }
                    : { background: "#eef0fb", color: "#4050b5" }
                }
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 w-full rounded-xl py-4 text-base font-bold uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:brightness-110 hover:shadow-xl active:scale-[0.99]"
          style={{ background: "linear-gradient(90deg, #1434A4, #3d52c6)" }}
        >
          {submitted ? "✓ Mencari Tiket…" : `Cari Tiket ${currentLabel}`}
        </button>
      </form>
    </div>
  );
}

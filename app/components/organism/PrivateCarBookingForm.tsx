"use client";

import { useState } from "react";
import CitySelect from "@/app/components/moleculs/CitySelect";
import Counter from "@/app/components/atoms/Counter";
import {
  IconLocation,
  IconCalendar,
  IconClock,
  IconPerson,
} from "@/app/components/atoms/BookingIcons";

const CITIES = [
  "Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi",
  "Bandung", "Surabaya", "Malang", "Yogyakarta", "Solo",
  "Semarang", "Bali (Denpasar)", "Lombok", "Medan",
  "Makassar", "Palembang", "Pekanbaru", "Batam", "Padang",
];

export const CAR_TYPES = [
  {
    id: "mpv",
    name: "MPV / Minivan",
    examples: "Avanza, Xenia, Innova",
    seats: "6–7 Penumpang",
    luggage: "2–3 Koper",
    icon: "🚐",
    price: "Rp 350.000",
    unit: "/ 12 jam",
    basePrice: 350000,
    highlights: ["Cocok untuk keluarga", "Bagasi luas", "AC double blower"],
  },
  {
    id: "sedan",
    name: "Sedan Premium",
    examples: "Camry, Accord, Teana",
    seats: "3–4 Penumpang",
    luggage: "1–2 Koper",
    icon: "🚗",
    price: "Rp 550.000",
    unit: "/ 12 jam",
    basePrice: 550000,
    highlights: ["Interior mewah", "Cocok meeting/bisnis", "Tinted glass"],
  },
  {
    id: "suv",
    name: "SUV / Crossover",
    examples: "Fortuner, Pajero, CX-5",
    seats: "6–7 Penumpang",
    luggage: "3–4 Koper",
    icon: "🚙",
    price: "Rp 650.000",
    unit: "/ 12 jam",
    basePrice: 650000,
    highlights: ["Medan pegunungan & offroad", "Ground clearance tinggi", "Kabin lega"],
  },
  {
    id: "hiace",
    name: "Hi-Ace Premio",
    examples: "Toyota Hi-Ace Premio",
    seats: "10–12 Penumpang",
    luggage: "4–6 Koper",
    icon: "🚌",
    price: "Rp 850.000",
    unit: "/ 12 jam",
    basePrice: 850000,
    highlights: ["Rombongan besar", "Kursi captain seat", "Bagasi bawah"],
  },
];

const DURATIONS = [
  { label: "6 Jam",            value: "6",     note: "Dalam kota",      multiplier: 0.6 },
  { label: "12 Jam",           value: "12",    note: "Antar kota dekat", multiplier: 1   },
  { label: "Full Day (24 Jam)", value: "24",   note: "Fleksibel penuh",  multiplier: 1.8 },
  { label: "Multi-hari",       value: "multi", note: "2 hari+",          multiplier: 1   },
];

const SERVICE_TYPES = ["Dalam Kota", "Antar Kota", "Airport Transfer"];

export default function PrivateCarBookingForm() {
  const [serviceType, setServiceType]       = useState(0);
  const [selectedCar, setSelectedCar]       = useState("mpv");
  const [selectedDuration, setSelectedDuration] = useState("12");
  const [pickup, setPickup]                 = useState("");
  const [dropoff, setDropoff]               = useState("");
  const [date, setDate]                     = useState("");
  const [time, setTime]                     = useState("");
  const [days, setDays]                     = useState(2);
  const [passengers, setPassengers]         = useState(1);
  const [note, setNote]                     = useState("");
  const [submitted, setSubmitted]           = useState(false);

  const today   = new Date().toISOString().split("T")[0];
  const carData = CAR_TYPES.find((c) => c.id === selectedCar)!;
  const durData = DURATIONS.find((d) => d.value === selectedDuration)!;

  const multiplier = selectedDuration === "multi" ? days : durData.multiplier;
  const estimated  = new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", maximumFractionDigits: 0,
  }).format(carData.basePrice * multiplier);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
  <>
    <div
      className="rounded-2xl p-6 sm:p-8 shadow-2xl"
      style={{ background: "#fff", border: "1.5px solid rgba(20,52,164,0.10)" }}
    >
      {/* Service type tabs */}
      <div className="mb-6 flex gap-1 rounded-xl p-1" style={{ background: "#eef0fb" }}>
        {SERVICE_TYPES.map((t, i) => (
          <button
            key={t}
            type="button"
            onClick={() => setServiceType(i)}
            className="flex-1 rounded-lg py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200"
            style={
              serviceType === i
                ? { background: "#1434A4", color: "#fff", boxShadow: "0 2px 8px rgba(20,52,164,0.25)" }
                : { background: "transparent", color: "#4050b5" }
            }
          >
            {t}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Pickup / Dropoff */}
        <div className="flex flex-col sm:flex-row gap-4">
          <CitySelect
            label="Lokasi Jemput"
            icon={<IconLocation />}
            value={pickup}
            onChange={setPickup}
            placeholder="Alamat / kota penjemputan…"
            cities={CITIES}
          />
          {serviceType !== 0 && (
            <CitySelect
              label="Lokasi Tujuan"
              icon={<IconLocation />}
              value={dropoff}
              onChange={setDropoff}
              placeholder="Alamat / kota tujuan…"
              cities={CITIES}
            />
          )}
        </div>

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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DURATIONS.map((d) => (
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

        {/* Tipe kendaraan */}
        <div>
          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#4050b5" }}>
            Tipe Kendaraan
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CAR_TYPES.map((car) => (
              <button
                key={car.id}
                type="button"
                onClick={() => setSelectedCar(car.id)}
                className="flex items-start gap-4 rounded-xl border p-4 text-left transition-all duration-200"
                style={
                  selectedCar === car.id
                    ? { borderColor: "#1434A4", background: "rgba(20,52,164,0.05)", boxShadow: "0 0 0 3px rgba(20,52,164,0.10)" }
                    : { borderColor: "rgba(20,52,164,0.15)", background: "#fff" }
                }
              >
                <span
                  className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2"
                  style={{ borderColor: selectedCar === car.id ? "#1434A4" : "#b0bbeb" }}
                >
                  {selectedCar === car.id && (
                    <span className="h-2 w-2 rounded-full" style={{ background: "#1434A4" }} />
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{car.icon}</span>
                    <p className="font-bold text-sm" style={{ color: "#1434A4" }}>{car.name}</p>
                  </div>
                  <p className="text-[11px] mt-0.5" style={{ color: "#4050b5" }}>{car.examples}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{ background: "rgba(20,52,164,0.07)", color: "#1434A4" }}>
                      👥 {car.seats}
                    </span>
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{ background: "rgba(20,52,164,0.07)", color: "#1434A4" }}>
                      🧳 {car.luggage}
                    </span>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs" style={{ color: "#4050b5" }}>Mulai</p>
                  <p className="font-extrabold text-sm" style={{ color: "#1434A4" }}>{car.price}</p>
                  <p className="text-[10px]" style={{ color: "#4050b5" }}>{car.unit}</p>
                </div>
              </button>
            ))}
          </div>
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
              {carData.name} · {selectedDuration === "multi" ? `${days} hari` : durData.label}
            </p>
          </div>
          <p className="text-xl font-extrabold" style={{ color: "#1434A4" }}>{estimated}</p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl py-4 text-base font-bold uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:brightness-110 hover:shadow-xl active:scale-[0.99]"
          style={{ background: "linear-gradient(90deg, #1434A4, #3d52c6)" }}
        >
          {submitted ? "✓ Memeriksa Ketersediaan…" : "Cek Ketersediaan & Pesan"}
        </button>

        <p className="text-center text-[11px]" style={{ color: "#4050b5" }}>
          Harga belum termasuk BBM & tol · Konfirmasi dalam 15 menit
        </p>
      </form>
    </div>

    {/* ── Detail kendaraan terpilih ── */}
    <div className="mt-12">
      <div className="mb-4">
        <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#1434A4" }}>
          Kendaraan Dipilih
        </span>
        <h2 className="mt-1 text-xl sm:text-2xl font-extrabold" style={{ color: "#1434A4" }}>
          {carData.icon} {carData.name}
        </h2>
      </div>
      <div
        className="rounded-2xl p-6 grid sm:grid-cols-2 gap-6"
        style={{ background: "#fff", border: "1.5px solid rgba(20,52,164,0.10)" }}
      >
        <div>
          <p className="text-sm font-semibold mb-3" style={{ color: "#4050b5" }}>Spesifikasi</p>
          <div className="flex flex-col gap-2">
            {[
              ["Contoh Armada", carData.examples],
              ["Kapasitas",     carData.seats],
              ["Bagasi",        carData.luggage],
              ["Harga Dasar",   `${carData.price} ${carData.unit}`],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between text-sm">
                <span style={{ color: "#4050b5" }}>{k}</span>
                <span className="font-semibold" style={{ color: "#1434A4" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold mb-3" style={{ color: "#4050b5" }}>Keunggulan</p>
          <div className="flex flex-col gap-2">
            {[...carData.highlights, "Asuransi perjalanan inklusif", "WiFi on-board"].map((h) => (
              <div key={h} className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="8" fill="#1434A4" fillOpacity="0.1" />
                  <path d="M5.5 9.5l2.5 2.5 4.5-5" stroke="#1434A4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm" style={{ color: "#3d3d5c" }}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

"use client";

import { useState } from "react";
import CitySelect from "@/app/components/moleculs/CitySelect/CitySelect";
import Counter from "@/app/components/atoms/Counter/Counter";
import {
  IconLocation,
  IconCalendar,
  IconPerson,
  IconSwap,
} from "@/app/components/atoms/BookingIcons/BookingIcons";

const CITIES = [
  "Jakarta", "Bandung", "Surabaya", "Malang", "Yogyakarta", "Solo",
  "Semarang", "Bali (Denpasar)", "Lombok", "Medan", "Makassar",
  "Palembang", "Pekanbaru", "Batam", "Padang",
];

const TRIP_TYPES = ["Sekali Jalan", "Pulang Pergi"];

export default function ShuttleBookingForm() {
  const [tripType, setTripType]         = useState(0);
  const [from, setFrom]                 = useState("");
  const [to, setTo]                     = useState("");
  const [dateGo, setDateGo]             = useState("");
  const [dateBack, setDateBack]         = useState("");
  const [passengers, setPassengers]     = useState(1);
  const [submitted, setSubmitted]       = useState(false);

  const today = new Date().toISOString().split("T")[0];

  function swapCities() {
    setFrom(to);
    setTo(from);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

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
            cities={CITIES}
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
            cities={CITIES}
          />
        </div>

        {/* Dates + Passengers */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
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

        {/* Submit */}
        <button
          type="submit"
          className="mt-5 w-full rounded-xl py-4 text-base font-bold uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:brightness-110 hover:shadow-xl active:scale-[0.99]"
          style={{ background: "linear-gradient(90deg, #1434A4, #3d52c6)" }}
        >
          {submitted ? "✓ Mencari Jadwal…" : "Cari Jadwal Shuttle"}
        </button>
      </form>
    </div>
  );
}

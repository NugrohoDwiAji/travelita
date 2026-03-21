"use client";

import { useState } from "react";
import Counter from "@/app/components/atoms/Counter/Counter";
import {
  IconCalendar,
  IconPerson,
} from "@/app/components/atoms/BookingIcons/BookingIcons";
import {
  IconCompass,
  IconMask,
  IconSpear,
} from "@/app/components/atoms/SpearFishingIcons/SpearFishingIcons";

const LOCATIONS = [
  { id: "raja-ampat",    name: "Raja Ampat",       region: "Papua Barat",  level: "Semua Level" },
  { id: "bunaken",       name: "Bunaken",           region: "Sulawesi Utara", level: "Semua Level" },
  { id: "komodo",        name: "Komodo",            region: "NTT",          level: "Menengah–Ahli" },
  { id: "wakatobi",      name: "Wakatobi",          region: "Sulawesi Tenggara", level: "Semua Level" },
  { id: "derawan",       name: "Kepulauan Derawan", region: "Kalimantan Timur", level: "Pemula–Menengah" },
  { id: "alor",          name: "Alor",              region: "NTT",          level: "Menengah–Ahli" },
  { id: "nusa-penida",   name: "Nusa Penida",       region: "Bali",         level: "Semua Level" },
  { id: "banda",         name: "Kepulauan Banda",   region: "Maluku",       level: "Menengah–Ahli" },
];

const PACKAGES = ["Pemula", "Menengah", "Profesional"] as const;
type PackageLevel = (typeof PACKAGES)[number];

const DURATIONS = [
  { label: "Half Day (4 Jam)",  value: "half",  note: "Cocok untuk pemula" },
  { label: "Full Day (8 Jam)",  value: "full",  note: "Paling populer"     },
  { label: "2 Hari 1 Malam",   value: "2d1n",  note: "Paket lengkap"      },
  { label: "3 Hari 2 Malam",   value: "3d2n",  note: "Pengalaman penuh"   },
];

const EQUIPMENT_OPTIONS = [
  { id: "mask",   label: "Masker & Snorkel" },
  { id: "fins",   label: "Fins / Sirip"     },
  { id: "wetsuit",label: "Wetsuit"          },
  { id: "spear",  label: "Senapan Panah"    },
  { id: "camera", label: "Action Camera"    },
];

export default function SpearFishingBookingForm() {
  const [location, setLocation]     = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedPkg, setSelectedPkg]   = useState<PackageLevel>("Pemula");
  const [duration, setDuration]         = useState("full");
  const [date, setDate]                 = useState("");
  const [participants, setParticipants] = useState(1);
  const [equipment, setEquipment]       = useState<string[]>([]);
  const [note, setNote]                 = useState("");
  const [submitted, setSubmitted]       = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const filteredLocations = LOCATIONS.filter((l) =>
    l.name.toLowerCase().includes(location.toLowerCase()) ||
    l.region.toLowerCase().includes(location.toLowerCase())
  );

  function toggleEquipment(id: string) {
    setEquipment((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div
      className="rounded-2xl p-6 sm:p-8 shadow-2xl"
      style={{ background: "#fff", border: "1.5px solid rgba(20,52,164,0.10)" }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Lokasi */}
        <div className="relative">
          <label
            className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: "#4050b5" }}
          >
            Lokasi Spear Fishing
          </label>
          <div
            className="flex items-center gap-2 rounded-xl border px-4 py-3.5 transition hover:border-blue-400 cursor-pointer"
            style={{ borderColor: "rgba(20,52,164,0.20)", background: "#fff" }}
            onClick={() => setLocationOpen((o) => !o)}
          >
            <span style={{ color: "#1434A4" }}><IconCompass /></span>
            <input
              className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-gray-400"
              style={{ color: "#1434A4" }}
              placeholder="Cari spot favorit Anda…"
              value={location}
              onChange={(e) => { setLocation(e.target.value); setLocationOpen(true); }}
              onFocus={() => setLocationOpen(true)}
            />
          </div>
          {locationOpen && filteredLocations.length > 0 && (
            <div
              className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl shadow-xl"
              style={{ border: "1.5px solid rgba(20,52,164,0.15)", background: "#fff" }}
            >
              {filteredLocations.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-blue-50"
                  onMouseDown={() => { setLocation(loc.name); setLocationOpen(false); }}
                >
                  <span style={{ color: "#1434A4" }}><IconWavePlaceholder /></span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#1434A4" }}>{loc.name}</p>
                    <p className="text-[10px]" style={{ color: "#4050b5" }}>
                      {loc.region} · {loc.level}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Paket & Tanggal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Level paket */}
          <div>
            <label
              className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: "#4050b5" }}
            >
              Level Paket
            </label>
            <div
              className="flex gap-1 rounded-xl p-1"
              style={{ background: "#eef0fb" }}
            >
              {PACKAGES.map((pkg) => (
                <button
                  key={pkg}
                  type="button"
                  onClick={() => setSelectedPkg(pkg)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-semibold transition-all duration-200"
                  style={
                    selectedPkg === pkg
                      ? { background: "#1434A4", color: "#fff", boxShadow: "0 2px 8px rgba(20,52,164,0.25)" }
                      : { background: "transparent", color: "#4050b5" }
                  }
                >
                  <span style={{ lineHeight: 1 }}>
                    {pkg === "Pemula" && <IconMask size={14} />}
                    {pkg === "Menengah" && <IconSpear size={14} />}
                    {pkg === "Profesional" && <IconCompass size={14} />}
                  </span>
                  {pkg}
                </button>
              ))}
            </div>
          </div>

          {/* Tanggal */}
          <div className="flex flex-col">
            <label
              className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: "#4050b5" }}
            >
              Tanggal Keberangkatan
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
        </div>

        {/* Durasi */}
        <div>
          <label
            className="mb-2 block text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: "#4050b5" }}
          >
            Durasi Trip
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DURATIONS.map((d) => (
              <button
                key={d.value}
                type="button"
                onClick={() => setDuration(d.value)}
                className="rounded-xl border py-3 px-3 text-center transition-all duration-200"
                style={
                  duration === d.value
                    ? { borderColor: "#1434A4", background: "rgba(20,52,164,0.06)", color: "#1434A4" }
                    : { borderColor: "rgba(20,52,164,0.15)", background: "#fff", color: "#4050b5" }
                }
              >
                <p className="text-xs font-bold">{d.label}</p>
                <p className="text-[10px] mt-0.5 opacity-70">{d.note}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Peserta */}
        <div className="flex flex-col">
          <label
            className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: "#4050b5" }}
          >
            Jumlah Peserta
          </label>
          <div
            className="flex items-center gap-2 rounded-xl border px-4 py-3.5"
            style={{ borderColor: "rgba(20,52,164,0.20)", background: "#fff" }}
          >
            <span style={{ color: "#1434A4" }}><IconPerson /></span>
            <div className="flex flex-1 items-center justify-between">
              <span className="text-sm font-medium" style={{ color: "#4050b5" }}>
                {participants} Peserta
              </span>
              <Counter value={participants} onChange={setParticipants} max={12} />
            </div>
          </div>
          <p className="mt-1 text-[11px]" style={{ color: "#4050b5" }}>
            Maks. 12 peserta per sesi · Privat tersedia
          </p>
        </div>

        {/* Sewa Peralatan */}
        <div>
          <label
            className="mb-2 block text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: "#4050b5" }}
          >
            Sewa Peralatan{" "}
            <span className="normal-case font-normal">(opsional)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {EQUIPMENT_OPTIONS.map((eq) => (
              <button
                key={eq.id}
                type="button"
                onClick={() => toggleEquipment(eq.id)}
                className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200"
                style={
                  equipment.includes(eq.id)
                    ? { background: "#1434A4", color: "#fff", boxShadow: "0 2px 8px rgba(20,52,164,0.22)" }
                    : { background: "#eef0fb", color: "#4050b5" }
                }
              >
                {eq.label}
              </button>
            ))}
          </div>
        </div>

        {/* Catatan */}
        <div className="flex flex-col">
          <label
            className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: "#4050b5" }}
          >
            Catatan / Permintaan Khusus{" "}
            <span className="normal-case font-normal">(opsional)</span>
          </label>
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Contoh: ada anggota rombongan yang belum bisa renang, perlu instruktur ekstra, dll."
            className="rounded-xl border px-4 py-3 text-sm outline-none resize-none transition placeholder:text-gray-400"
            style={{ borderColor: "rgba(20,52,164,0.20)", color: "#1434A4", background: "#fff" }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl py-4 text-base font-bold uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:brightness-110 hover:shadow-xl active:scale-[0.99]"
          style={{ background: "linear-gradient(90deg, #1434A4, #3d52c6)" }}
        >
          {submitted ? "✓ Mengirim Permintaan…" : "Booking Trip Sekarang"}
        </button>
        <p className="text-center text-[11px]" style={{ color: "#4050b5" }}>
          Gratis konsultasi dengan guide profesional · Konfirmasi dalam 1 jam
        </p>
      </form>
    </div>
  );
}

/* small inline placeholder for location list icon */
function IconWavePlaceholder() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M1 8c1-.8 2-1 3-1s2 .8 3 1 2-1 3-1 2 .8 3 1"
        stroke="#1434A4"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

"use client";

import { useState } from "react";
import Counter from "@/app/components/atoms/Counter/Counter";
import { IconCalendar, IconPerson, IconChevron } from "@/app/components/atoms/BookingIcons/BookingIcons";
import { IconMap, IconMountain, IconBeach } from "@/app/components/atoms/TravelIcons/TravelIcons";

const TOUR_TYPES = [
  { id: "adventure", label: "Adventure", icon: <IconMountain size={16} /> },
  { id: "beach",     label: "Pantai",    icon: <IconBeach size={16} />    },
  { id: "cultural",  label: "Budaya",    icon: <IconMap size={16} />      },
  { id: "all",       label: "Semua",     icon: null                        },
] as const;

const DURATIONS = [
  { id: "1d",   label: "1 Hari"  },
  { id: "2d1n", label: "2H 1M"   },
  { id: "3d2n", label: "3H 2M"   },
  { id: "4d3n", label: "4H 3M"   },
  { id: "5d4n", label: "5H 4M"   },
] as const;

const DESTINATIONS = [
  { name: "Semua Destinasi Lombok", region: "" },
  { name: "Senggigi",               region: "Lombok Barat"  },
  { name: "Gili Trawangan",         region: "Lombok Utara"  },
  { name: "Gili Air",               region: "Lombok Utara"  },
  { name: "Gili Meno",              region: "Lombok Utara"  },
  { name: "Gunung Rinjani",         region: "Lombok Timur"  },
  { name: "Pink Beach",             region: "Lombok Timur"  },
  { name: "Pantai Kuta Lombok",     region: "Lombok Tengah" },
  { name: "Pantai Tanjung Aan",     region: "Lombok Tengah" },
  { name: "Desa Sade",              region: "Lombok Tengah" },
  { name: "Air Terjun Benang Kelambu", region: "Lombok Tengah" },
  { name: "Pantai Mawun",           region: "Lombok Tengah" },
];

type TourType = typeof TOUR_TYPES[number]["id"];
type Duration = typeof DURATIONS[number]["id"];

export default function TravelBookingForm() {
  const [tourType, setTourType]           = useState<TourType>("all");
  const [destination, setDestination]     = useState(DESTINATIONS[0].name);
  const [destOpen, setDestOpen]           = useState(false);
  const [date, setDate]                   = useState("");
  const [duration, setDuration]           = useState<Duration>("3d2n");
  const [adults, setAdults]               = useState(2);
  const [children, setChildren]           = useState(0);
  const [participantOpen, setParticipantOpen] = useState(false);
  const [submitted, setSubmitted]         = useState(false);

  const totalPax = adults + children;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-6 sm:p-8"
      style={{
        background: "#fff",
        border: "1.5px solid rgba(20,52,164,0.13)",
        boxShadow: "0 8px 40px rgba(20,52,164,0.12)",
      }}
    >
      <h2
        className="mb-1 text-lg font-extrabold"
        style={{ color: "#1434A4" }}
      >
        Cari Paket Wisata Lombok
      </h2>
      <p className="mb-6 text-xs" style={{ color: "#4050b5" }}>
        Pilih destinasi, durasi, dan tanggal perjalanan Anda
      </p>

      {/* Tour Type Tabs */}
      <div className="mb-6">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: "#4050b5" }}>
          Jenis Wisata
        </p>
        <div className="flex flex-wrap gap-2">
          {TOUR_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTourType(t.id)}
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all"
              style={
                tourType === t.id
                  ? { background: "#1434A4", color: "#fff", boxShadow: "0 4px 12px rgba(20,52,164,0.25)" }
                  : { background: "rgba(20,52,164,0.07)", color: "#1434A4" }
              }
            >
              {t.icon && <span style={{ color: tourType === t.id ? "#fff" : "#1434A4" }}>{t.icon}</span>}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Destination */}
        <div className="relative">
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest" style={{ color: "#4050b5" }}>
            Destinasi
          </label>
          <button
            type="button"
            onClick={() => setDestOpen(!destOpen)}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition"
            style={{
              background: "#f8f9ff",
              border: "1.5px solid rgba(20,52,164,0.15)",
              color: "#1434A4",
            }}
          >
            <span className="flex items-center gap-2">
              <IconMap size={16} />
              <span className="font-medium truncate">{destination}</span>
            </span>
            <IconChevron open={destOpen} />
          </button>

          {destOpen && (
            <div
              className="absolute z-30 mt-1 w-full rounded-xl overflow-y-auto"
              style={{
                maxHeight: 260,
                background: "#fff",
                border: "1.5px solid rgba(20,52,164,0.15)",
                boxShadow: "0 8px 32px rgba(20,52,164,0.15)",
              }}
            >
              {DESTINATIONS.map((d) => (
                <button
                  key={d.name}
                  type="button"
                  onClick={() => { setDestination(d.name); setDestOpen(false); }}
                  className="flex w-full items-start gap-3 px-4 py-3 text-left text-sm transition hover:bg-blue-50"
                >
                  <div>
                    <p className="font-semibold leading-tight" style={{ color: "#1434A4" }}>{d.name}</p>
                    {d.region && <p className="text-[10px]" style={{ color: "#4050b5" }}>{d.region}</p>}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tanggal */}
        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest" style={{ color: "#4050b5" }}>
            Tanggal Mulai
          </label>
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: "#f8f9ff", border: "1.5px solid rgba(20,52,164,0.15)" }}
          >
            <span style={{ color: "#1434A4" }}><IconCalendar /></span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: "#1434A4" }}
            />
          </div>
        </div>

        {/* Durasi */}
        <div>
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest" style={{ color: "#4050b5" }}>
            Durasi
          </label>
          <div className="flex flex-wrap gap-2">
            {DURATIONS.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDuration(d.id)}
                className="rounded-lg px-3 py-2 text-xs font-semibold transition-all"
                style={
                  duration === d.id
                    ? { background: "#1434A4", color: "#fff" }
                    : { background: "rgba(20,52,164,0.07)", color: "#1434A4" }
                }
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Peserta */}
        <div className="relative">
          <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest" style={{ color: "#4050b5" }}>
            Peserta
          </label>
          <button
            type="button"
            onClick={() => setParticipantOpen(!participantOpen)}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition"
            style={{
              background: "#f8f9ff",
              border: "1.5px solid rgba(20,52,164,0.15)",
              color: "#1434A4",
            }}
          >
            <span className="flex items-center gap-2">
              <IconPerson />
              <span className="font-medium">{totalPax} Peserta</span>
              <span className="text-[10px]" style={{ color: "#4050b5" }}>
                ({adults} dewasa{children > 0 ? `, ${children} anak` : ""})
              </span>
            </span>
            <IconChevron open={participantOpen} />
          </button>

          {participantOpen && (
            <div
              className="absolute z-30 mt-1 w-full rounded-xl p-4"
              style={{
                background: "#fff",
                border: "1.5px solid rgba(20,52,164,0.15)",
                boxShadow: "0 8px 32px rgba(20,52,164,0.15)",
              }}
            >
              {[
                { label: "Dewasa", sub: "≥ 12 tahun", value: adults,   onChange: setAdults,   min: 1 },
                { label: "Anak",   sub: "2–11 tahun", value: children, onChange: setChildren, min: 0 },
              ].map(({ label, sub, value, onChange, min }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b last:border-b-0" style={{ borderColor: "rgba(20,52,164,0.08)" }}>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#1434A4" }}>{label}</p>
                    <p className="text-[10px]" style={{ color: "#4050b5" }}>{sub}</p>
                  </div>
                  <Counter value={value} onChange={onChange} min={min} max={20} />
                </div>
              ))}
              <button
                type="button"
                onClick={() => setParticipantOpen(false)}
                className="mt-3 w-full rounded-lg py-2 text-xs font-bold transition hover:brightness-110"
                style={{ background: "#1434A4", color: "#fff" }}
              >
                Selesai
              </button>
            </div>
          )}
        </div>
      </div>

      {submitted && (
        <div
          className="mt-4 rounded-xl px-4 py-3 text-sm font-semibold text-center"
          style={{ background: "rgba(20,52,164,0.08)", color: "#1434A4" }}
        >
          ✅ Permintaan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda.
        </div>
      )}

      <button
        type="submit"
        className="mt-6 w-full rounded-xl py-3.5 text-sm font-extrabold uppercase tracking-widest shadow-lg transition-all hover:brightness-110 hover:scale-[1.01] active:scale-[0.99]"
        style={{ background: "linear-gradient(90deg, #1434A4, #3d52c6)", color: "#fff" }}
      >
        Cari Paket Sekarang
      </button>
    </form>
  );
}

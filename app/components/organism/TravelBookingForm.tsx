"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Counter from "@/app/components/atoms/Counter";
import { IconCalendar, IconClock, IconPerson, IconChevron } from "@/app/components/atoms/BookingIcons";
import { IconMap, IconMountain, IconBeach } from "@/app/components/atoms/TravelIcons";
import AlertDialog from "@/app/components/moleculs/AlertDialog";
import BookingConfirmDialog from "@/app/components/moleculs/BookingConfirmDialog";
import { postServiceBooking } from "@/app/actions/serviceBooking";

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
  { name: "Semua Destinasi Bali-Nusra", region: "" },
  { name: "Ubud",                    region: "Bali" },
  { name: "Nusa Penida",             region: "Bali" },
  { name: "Sanur",                   region: "Bali" },
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
  { name: "Labuan Bajo",             region: "Flores" },
  { name: "Pulau Komodo",            region: "NTT" },
  { name: "Waerebo",                 region: "Flores" },
  { name: "Kelimutu",                region: "Ende" },
  { name: "Pantai Nihiwatu",         region: "Sumba" },
];

type TourType = typeof TOUR_TYPES[number]["id"];
type Duration = typeof DURATIONS[number]["id"];

export default function TravelBookingForm() {
  const [isSubmitting, startTransition] = useTransition();
  const [tourType, setTourType]           = useState<TourType>("all");
  const [destination, setDestination]     = useState(DESTINATIONS[0].name);
  const [destOpen, setDestOpen]           = useState(false);
  const [date, setDate]                   = useState("");
  const [duration, setDuration]           = useState<Duration>("3d2n");
  const [adults, setAdults]               = useState(2);
  const [children, setChildren]           = useState(0);
  const [participantOpen, setParticipantOpen] = useState(false);
  const [submitted, setSubmitted]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [alertMsg, setAlertMsg] = useState<{ title: string; message: string; variant: "warning" | "error" | "success"; redirectTo?: string } | null>(null);
  const router = useRouter();

  const totalPax = adults + children;

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
    startTransition(async () => {
      const result = await postServiceBooking({
        type: "TRIP",
        from: "Bali-Nusra",
        to: destination,
        serviceDate: new Date(`${date}T08:00`).toISOString(),
        passengerCount: totalPax,
        price: 0,
        description: [
          `Jenis: ${tourType}`,
          `Durasi: ${duration}`,
          `${adults} dewasa, ${children} anak`,
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
        Cari Paket Wisata Bali-Nusra
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
        disabled={isSubmitting}
        className="mt-6 w-full rounded-xl py-3.5 text-sm font-extrabold uppercase tracking-widest shadow-lg transition-all hover:brightness-110 hover:scale-[1.01] active:scale-[0.99]"
        style={{ background: "linear-gradient(90deg, #1434A4, #3d52c6)", color: "#fff" }}
      >
        {isSubmitting ? "Menyimpan Permintaan..." : "Cari Paket Sekarang"}
      </button>

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
              Paket Wisata - {TOUR_TYPES.find((t) => t.id === tourType)?.label}
            </span>
          </div>

          <div
            className="flex items-center gap-3 rounded-xl p-4"
            style={{ background: "#f8f9ff" }}
          >
            <span style={{ color: "#1434A4" }}><IconMap size={16} /></span>
            <span className="text-sm font-medium" style={{ color: "#1434A4" }}>{destination}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <DetailItem icon={<IconCalendar />} label="Tanggal Mulai" value={new Date(date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} />
            <DetailItem icon={<IconClock />} label="Durasi" value={DURATIONS.find((d) => d.id === duration)?.label || duration} />
            <DetailItem icon={<IconPerson />} label="Peserta" value={`${totalPax} Orang (${adults} dewasa${children > 0 ? `, ${children} anak` : ""})`} />
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
    </form>
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

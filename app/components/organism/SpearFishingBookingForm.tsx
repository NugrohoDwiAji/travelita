"use client";

import { useState, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import Counter from "@/app/components/atoms/Counter";
import AlertDialog from "@/app/components/moleculs/AlertDialog";
import BookingConfirmDialog from "@/app/components/moleculs/BookingConfirmDialog";
import { IconCalendar, IconClock, IconPerson } from "@/app/components/atoms/BookingIcons";
import { IconCompass } from "@/app/components/atoms/SpearFishingIcons";
import { postServiceBooking } from "@/app/actions/serviceBooking";

export interface SpotData {
  name: string;
  region: string;
  depth: string;
  price: string;
  fish?: string;
  level?: string;
  tag?: string;
}

interface SpearFishingBookingFormProps {
  initialSpot?: SpotData | null;
  spots?: SpotData[];
}

const DURATIONS = [
  { label: "Full Day (8 Jam)", value: "full", note: "Paling populer" },
  { label: "Multi-hari", value: "multi", note: "2 hari+" },
];

function parsePriceValue(priceStr: string): number {
  const numeric = priceStr.replace(/[^0-9]/g, "");
  return parseInt(numeric, 10) || 0;
}

export default function SpearFishingBookingForm({ initialSpot, spots = [] }: SpearFishingBookingFormProps) {
  const [isSubmitting, startTransition] = useTransition();
  const [location, setLocation] = useState(initialSpot?.name ?? "");
  const [locationOpen, setLocationOpen] = useState(false);
  const [duration, setDuration] = useState("full");
  const [days, setDays] = useState(2);
  const [date, setDate] = useState("");
  const [participants, setParticipants] = useState(1);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [alertMsg, setAlertMsg] = useState<{ title: string; message: string; variant: "warning" | "error" | "success"; redirectTo?: string } | null>(null);
  const router = useRouter();

  const today = new Date().toISOString().split("T")[0];

  const spotList = useMemo(() => spots.length > 0 ? spots : [], [spots]);

  const selectedSpotData = useMemo(() => {
    if (!location) return null;
    return spotList.find(
      (s) => s.name.toLowerCase() === location.toLowerCase()
    ) ?? null;
  }, [location, spotList]);

  const spotPrice = selectedSpotData ? parsePriceValue(selectedSpotData.price) : 0;

  const filteredLocations = spotList.filter((item) =>
    item.name.toLowerCase().includes(location.toLowerCase()) ||
    item.region.toLowerCase().includes(location.toLowerCase())
  );

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
        type: "SPEAR_CAR",
        from: "Bali-Nusra",
        to: location,
        serviceDate: new Date(`${date}T08:00`).toISOString(),
        passengerCount: participants,
        price: spotPrice,
        description: [
          `Durasi: ${duration}${duration === "multi" ? ` (${days} hari)` : ""}`,
          spotPrice > 0 ? `Harga: Rp ${spotPrice.toLocaleString("id-ID")}` : "",
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
    <div className="rounded-2xl p-6 sm:p-8 shadow-2xl" style={{ background: "#fff", border: "1.5px solid rgba(20,52,164,0.10)" }}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="relative">
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#4050b5" }}>
            Spot Spear Fishing
          </label>
          <div className="flex items-center gap-2 rounded-xl border px-4 py-3.5 transition hover:border-blue-400 cursor-pointer" style={{ borderColor: "rgba(20,52,164,0.20)", background: "#fff" }} onClick={() => setLocationOpen((open) => !open)}>
            <span style={{ color: "#1434A4" }}><IconCompass /></span>
            <input
              required
              className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-gray-400"
              style={{ color: "#1434A4" }}
              placeholder="Cari spot Bali-Nusra..."
              value={location}
              onChange={(e) => { setLocation(e.target.value); setLocationOpen(true); }}
              onFocus={() => setLocationOpen(true)}
            />
          </div>
          {locationOpen && filteredLocations.length > 0 && (
            <div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl shadow-xl" style={{ border: "1.5px solid rgba(20,52,164,0.15)", background: "#fff" }}>
              {filteredLocations.map((spot) => (
                <button
                  key={spot.name}
                  type="button"
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-blue-50"
                  onMouseDown={() => { setLocation(spot.name); setLocationOpen(false); }}
                >
                  <span style={{ color: "#1434A4" }}><IconWavePlaceholder /></span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: "#1434A4" }}>{spot.name}</p>
                    <p className="text-[10px]" style={{ color: "#4050b5" }}>{spot.region}{spot.level ? ` - ${spot.level}` : ""}</p>
                  </div>
                  {parsePriceValue(spot.price) > 0 && (
                    <span className="text-xs font-bold whitespace-nowrap" style={{ color: "#1434A4" }}>
                      {spot.price}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#4050b5" }}>
            Tanggal Keberangkatan
          </label>
          <div className="flex items-center gap-2 rounded-xl border px-4 py-3.5 transition hover:border-blue-400" style={{ borderColor: "rgba(20,52,164,0.20)", background: "#fff" }}>
            <span style={{ color: "#1434A4" }}><IconCalendar /></span>
            <input type="date" min={today} value={date} required onChange={(e) => setDate(e.target.value)} className="flex-1 bg-transparent text-sm font-medium outline-none" style={{ color: "#1434A4" }} />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#4050b5" }}>
            Durasi Trip
          </label>
          <div className="grid grid-cols-2 gap-3">
            {DURATIONS.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setDuration(item.value)}
                className="rounded-xl border py-3 px-3 text-center transition-all duration-200"
                style={duration === item.value ? { borderColor: "#1434A4", background: "rgba(20,52,164,0.06)", color: "#1434A4" } : { borderColor: "rgba(20,52,164,0.15)", background: "#fff", color: "#4050b5" }}
              >
                <p className="text-xs font-bold">{item.label}</p>
                <p className="text-[10px] mt-0.5 opacity-70">{item.note}</p>
              </button>
            ))}
          </div>
          {duration === "multi" && (
            <div className="mt-3 flex items-center gap-3">
              <span className="text-sm" style={{ color: "#4050b5" }}>Jumlah hari:</span>
              <Counter value={days} onChange={setDays} min={2} max={14} />
              <span className="text-sm font-semibold" style={{ color: "#1434A4" }}>{days} hari</span>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#4050b5" }}>
            Jumlah Peserta
          </label>
          <div className="flex items-center gap-2 rounded-xl border px-4 py-3.5" style={{ borderColor: "rgba(20,52,164,0.20)", background: "#fff" }}>
            <span style={{ color: "#1434A4" }}><IconPerson /></span>
            <div className="flex flex-1 items-center justify-between">
              <span className="text-sm font-medium" style={{ color: "#4050b5" }}>{participants} Peserta</span>
              <Counter value={participants} onChange={setParticipants} max={12} />
            </div>
          </div>
          <p className="mt-1 text-[11px]" style={{ color: "#4050b5" }}>Maks. 12 peserta per sesi - privat tersedia</p>
        </div>

        {spotPrice > 0 && (
          <div
            className="flex items-center justify-between rounded-xl px-5 py-4"
            style={{ background: "rgba(20,52,164,0.05)", border: "1.5px solid rgba(20,52,164,0.12)" }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#4050b5" }}>
                Harga Spot
              </p>
              <p className="text-[11px] mt-0.5" style={{ color: "#4050b5" }}>
                {selectedSpotData?.name || location}
              </p>
            </div>
            <p className="text-xl font-extrabold" style={{ color: "#1434A4" }}>
              Rp {spotPrice.toLocaleString("id-ID")}
            </p>
          </div>
        )}

        <div className="flex flex-col">
          <label className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#4050b5" }}>
            Catatan / Permintaan Khusus <span className="normal-case font-normal">(opsional)</span>
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl py-4 text-base font-bold uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:brightness-110 hover:shadow-xl active:scale-[0.99]"
          style={{ background: "linear-gradient(90deg, #1434A4, #3d52c6)" }}
        >
          {isSubmitting ? "Menyimpan Permintaan..." : submitted ? "Permintaan Terkirim" : "Booking Trip Sekarang"}
        </button>
        <p className="text-center text-[11px]" style={{ color: "#4050b5" }}>
          Gratis konsultasi dengan guide profesional - konfirmasi dalam 1 jam
        </p>
      </form>

      <BookingConfirmDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        onCancel={() => window.location.reload()}
        price={spotPrice}
      >
        <div className="space-y-3">
          <div className="flex justify-center">
            <span
              className="rounded-full px-4 py-1 text-xs font-semibold"
              style={{ background: "#eef0fb", color: "#1434A4" }}
            >
              Spear Fishing
            </span>
          </div>

          <div
            className="flex items-center gap-3 rounded-xl p-4"
            style={{ background: "#f8f9ff" }}
          >
            <span style={{ color: "#1434A4" }}><IconCompass /></span>
            <span className="text-sm font-medium" style={{ color: "#1434A4" }}>{location}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <DetailItem icon={<IconCalendar />} label="Tanggal" value={new Date(date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} />
            <DetailItem icon={<IconClock />} label="Durasi" value={duration === "multi" ? `${days} hari` : "Full Day (8 Jam)"} />
            <DetailItem icon={<IconPerson />} label="Peserta" value={`${participants} Orang`} />
            {spotPrice > 0 && (
              <DetailItem
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                }
                label="Harga"
                value={`Rp ${spotPrice.toLocaleString("id-ID")}`}
              />
            )}
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

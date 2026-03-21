"use client";

import { useState } from "react";
import Counter from "@/app/components/atoms/Counter/Counter";
import { IconPerson } from "@/app/components/atoms/BookingIcons/BookingIcons";

export interface PassengerCounts {
  adults: number;
  children: number;
  infants: number;
}

interface Props {
  value: PassengerCounts;
  onChange: (v: PassengerCounts) => void;
}

export default function PassengerSelector({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const total = value.adults + value.children + value.infants;
  const label = [
    `${value.adults} Dewasa`,
    value.children > 0 ? `${value.children} Anak` : "",
    value.infants > 0 ? `${value.infants} Bayi` : "",
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="relative flex-1">
      <label
        className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider"
        style={{ color: "#4050b5" }}
      >
        Penumpang
      </label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer items-center gap-2 rounded-xl border px-4 py-3.5 transition hover:border-blue-400"
        style={{ borderColor: "rgba(20,52,164,0.20)", background: "#fff" }}
      >
        <span style={{ color: "#1434A4" }}>
          <IconPerson />
        </span>
        <span className="flex-1 text-left text-sm font-medium" style={{ color: "#1434A4" }}>
          {label}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          style={{ color: "#4050b5" }}
        >
          <path
            d="M3 5l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-1 w-full rounded-xl shadow-xl"
          style={{ border: "1.5px solid rgba(20,52,164,0.15)", background: "#fff" }}
        >
          <div className="p-4 flex flex-col gap-4">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold" style={{ color: "#1434A4" }}>
                  Dewasa
                </p>
                <p className="text-[10px]" style={{ color: "#4050b5" }}>
                  Usia 12 tahun ke atas
                </p>
              </div>
              <Counter
                value={value.adults}
                onChange={(v) => onChange({ ...value, adults: v })}
                min={1}
              />
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold" style={{ color: "#1434A4" }}>
                  Anak-anak
                </p>
                <p className="text-[10px]" style={{ color: "#4050b5" }}>
                  Usia 2–11 tahun
                </p>
              </div>
              <Counter
                value={value.children}
                onChange={(v) => onChange({ ...value, children: v })}
                min={0}
              />
            </div>

            {/* Infants */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold" style={{ color: "#1434A4" }}>
                  Bayi
                </p>
                <p className="text-[10px]" style={{ color: "#4050b5" }}>
                  Usia di bawah 2 tahun
                </p>
              </div>
              <Counter
                value={value.infants}
                onChange={(v) => onChange({ ...value, infants: v })}
                min={0}
              />
            </div>
          </div>

          <div
            className="border-t px-4 py-3"
            style={{ borderColor: "rgba(20,52,164,0.10)" }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full rounded-lg py-2 text-sm font-bold text-white transition hover:brightness-110"
              style={{ background: "#1434A4" }}
            >
              Selesai · {total} Penumpang
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { IconLocation } from "@/app/components/atoms/BookingIcons/BookingIcons";

interface CitySelectProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  cities: string[];
}

export default function CitySelect({
  label,
  icon,
  value,
  onChange,
  placeholder,
  cities,
}: CitySelectProps) {
  const [open, setOpen] = useState(false);
  const filtered = cities.filter((c) =>
    c.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="relative flex-1">
      <label
        className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider"
        style={{ color: "#4050b5" }}
      >
        {label}
      </label>
      <div
        className="flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-3.5 transition hover:border-blue-400"
        style={{ borderColor: "rgba(20,52,164,0.20)", background: "#fff" }}
        onClick={() => setOpen((o) => !o)}
      >
        <span style={{ color: "#1434A4" }}>{icon}</span>
        <input
          className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-gray-400"
          style={{ color: "#1434A4" }}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
      </div>
      {open && filtered.length > 0 && (
        <div
          className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl shadow-xl"
          style={{ border: "1.5px solid rgba(20,52,164,0.15)", background: "#fff" }}
        >
          {filtered.map((city) => (
            <button
              key={city}
              type="button"
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-blue-50"
              style={{ color: "#1434A4" }}
              onMouseDown={() => {
                onChange(city);
                setOpen(false);
              }}
            >
              <span className="opacity-50">
                <IconLocation />
              </span>
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

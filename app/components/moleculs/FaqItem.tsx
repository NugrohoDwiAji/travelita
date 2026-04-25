"use client";

import { useState } from "react";
import { IconChevron } from "@/app/components/atoms/BookingIcons";

interface FaqItemProps {
  q: string;
  a: string;
}

export default function FaqItem({ q, a }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{ border: "1.5px solid rgba(20,52,164,0.12)" }}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-sm font-semibold" style={{ color: "#1434A4" }}>
          {q}
        </span>
        <span style={{ color: "#1434A4" }}>
          <IconChevron open={open} />
        </span>
      </button>
      {open && (
        <div
          className="px-5 pb-4 text-sm leading-relaxed"
          style={{ color: "#4050b5" }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

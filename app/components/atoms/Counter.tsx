"use client";

interface CounterProps {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}

export default function Counter({ value, onChange, min = 1, max = 20 }: CounterProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-7 w-7 items-center justify-center rounded-full border font-bold transition hover:bg-blue-50"
        style={{ borderColor: "#1434A4", color: "#1434A4" }}
      >
        −
      </button>
      <span className="w-4 text-center font-semibold" style={{ color: "#1434A4" }}>
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-7 w-7 items-center justify-center rounded-full border font-bold transition hover:bg-blue-50"
        style={{ borderColor: "#1434A4", color: "#1434A4" }}
      >
        +
      </button>
    </div>
  );
}

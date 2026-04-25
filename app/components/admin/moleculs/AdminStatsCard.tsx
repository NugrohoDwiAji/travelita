import React from "react";

interface AdminStatsCardProps {
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  icon: React.ReactNode;
  accentColor?: string;
}

export default function AdminStatsCard({
  label,
  value,
  change,
  positive = true,
  icon,
  accentColor = "#1434A4",
}: AdminStatsCardProps) {
  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: "#fff",
        border: "1.5px solid rgba(20,52,164,0.10)",
        boxShadow: "0 2px 10px rgba(20,52,164,0.05)",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `${accentColor}18` }}
        >
          <span style={{ color: accentColor }}>{icon}</span>
        </div>
        {change && (
          <span
            className="flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold"
            style={{
              background: positive ? "rgba(34,197,94,0.10)" : "rgba(239,68,68,0.10)",
              color: positive ? "#16a34a" : "#dc2626",
            }}
          >
            {positive ? "↑" : "↓"} {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-extrabold leading-none" style={{ color: "#0d2280" }}>
        {value}
      </p>
      <p className="mt-1.5 text-xs font-medium" style={{ color: "#4050b5" }}>
        {label}
      </p>
    </div>
  );
}

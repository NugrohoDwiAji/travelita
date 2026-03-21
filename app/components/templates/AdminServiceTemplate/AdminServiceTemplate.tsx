import React from "react";
import AdminStatsCard from "@/app/components/moleculs/AdminStatsCard/AdminStatsCard";
import AdminBookingsTable, {
  BookingRecord,
  ColumnDef,
} from "@/app/components/organism/AdminBookingsTable/AdminBookingsTable";
import {
  IconBookings,
  IconPending,
  IconUsers,
  IconRevenue,
} from "@/app/components/atoms/AdminIcons/AdminIcons";

interface StatItem {
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  accentColor?: string;
}

interface AdminServiceTemplateProps {
  serviceTitle: string;
  serviceIcon: string;
  breadcrumb?: string;
  stats?: StatItem[];
  columns: ColumnDef[];
  bookings: BookingRecord[];
}

function defaultStats(bookings: BookingRecord[]): StatItem[] {
  const total     = bookings.length;
  const pending   = bookings.filter((b) => b.status === "pending").length;
  const confirmed = bookings.filter((b) => b.status === "confirmed" || b.status === "completed").length;
  const revenue   = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => {
      const n = Number(b.amount.replace(/[^0-9]/g, ""));
      return sum + n;
    }, 0);
  const revenueStr = "Rp " + (revenue / 1_000_000).toFixed(1) + " Jt";

  return [
    { label: "Total Booking",   value: total,       accentColor: "#1434A4", positive: true  },
    { label: "Menunggu",        value: pending,     accentColor: "#d97706", positive: false  },
    { label: "Selesai/Konfirm", value: confirmed,   accentColor: "#16a34a", positive: true  },
    { label: "Pendapatan",      value: revenueStr,  accentColor: "#9333ea", positive: true  },
  ];
}

export default function AdminServiceTemplate({
  serviceTitle,
  serviceIcon,
  breadcrumb = "Layanan",
  stats,
  columns,
  bookings,
}: AdminServiceTemplateProps) {
  const displayStats = stats ?? defaultStats(bookings);
  const statIcons    = [
    <IconBookings size={18} key="b" />,
    <IconPending size={18} key="p" />,
    <IconUsers size={18} key="u" />,
    <IconRevenue size={18} key="r" />,
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="mb-1 flex items-center gap-1.5 text-[11px]" style={{ color: "#4050b5" }}>
            <span>Dashboard</span>
            <span>/</span>
            <span>{breadcrumb}</span>
            <span>/</span>
            <span className="font-semibold" style={{ color: "#1434A4" }}>{serviceTitle}</span>
          </div>
          <h1 className="flex items-center gap-2 text-xl font-extrabold" style={{ color: "#0d2280" }}>
            <span>{serviceIcon}</span>
            {serviceTitle}
          </h1>
        </div>

        <button
          className="rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow transition hover:brightness-110"
          style={{ background: "linear-gradient(90deg, #1434A4, #3d52c6)", color: "#fff" }}
        >
          + Tambah Booking
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {displayStats.map((s, i) => (
          <AdminStatsCard
            key={s.label}
            label={s.label}
            value={s.value}
            change={s.change}
            positive={s.positive}
            icon={statIcons[i % statIcons.length]}
            accentColor={s.accentColor}
          />
        ))}
      </div>

      {/* Table */}
      <div>
        <h2 className="mb-3 text-sm font-extrabold" style={{ color: "#0d2280" }}>
          Daftar Booking
        </h2>
        <AdminBookingsTable columns={columns} data={bookings} />
      </div>
    </div>
  );
}

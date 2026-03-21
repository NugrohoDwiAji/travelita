import Link from "next/link";
import AdminStatsCard from "@/app/components/moleculs/AdminStatsCard/AdminStatsCard";
import {
  IconBookings,
  IconRevenue,
  IconUsers,
  IconPending,
  IconShuttle,
  IconCar,
  IconTicket,
  IconFishAdmin,
  IconMapAdmin,
  IconTrendUp,
  IconChevronRight,
} from "@/app/components/atoms/AdminIcons/AdminIcons";

const GLOBAL_STATS = [
  { label: "Total Booking",   value: "1.284",     change: "12.5%", positive: true,  icon: <IconBookings size={18} />, accentColor: "#1434A4" },
  { label: "Pendapatan",      value: "Rp 487 Jt", change: "8.3%",  positive: true,  icon: <IconRevenue size={18} />,  accentColor: "#16a34a" },
  { label: "Pelanggan Baru",  value: "342",        change: "5.1%",  positive: true,  icon: <IconUsers size={18} />,    accentColor: "#9333ea" },
  { label: "Menunggu",        value: "48",         change: "3 baru", positive: false, icon: <IconPending size={18} />, accentColor: "#d97706" },
];

const SERVICE_CARDS = [
  { href: "/admin/shuttle-service", label: "Shuttle Service", icon: <IconShuttle size={22} />, bookings: 312, revenue: "Rp 87 Jt",  color: "#1434A4", pending: 8  },
  { href: "/admin/private-car",     label: "Private Car",     icon: <IconCar size={22} />,     bookings: 198, revenue: "Rp 156 Jt", color: "#7c3aed", pending: 12 },
  { href: "/admin/ticketing",       label: "Ticketing",       icon: <IconTicket size={22} />,  bookings: 487, revenue: "Rp 98 Jt",  color: "#0891b2", pending: 21 },
  { href: "/admin/spear-fishing",   label: "Spear Fishing",   icon: <IconFishAdmin size={22} />,bookings: 143, revenue: "Rp 78 Jt",  color: "#059669", pending: 4  },
  { href: "/admin/travel",          label: "Wisata Travel",   icon: <IconMapAdmin size={22} />, bookings: 144, revenue: "Rp 68 Jt",  color: "#dc2626", pending: 3  },
];

const RECENT = [
  { id: "#TRV-0091", name: "Rina Sari",     service: "Spear Fishing", date: "14 Mar 2026", amount: "Rp 1.500.000", status: "confirmed" },
  { id: "#SHT-0542", name: "Budi Santoso",  service: "Shuttle",       date: "14 Mar 2026", amount: "Rp 320.000",   status: "pending"   },
  { id: "#TKT-1102", name: "Dewi Kartika",  service: "Ticketing",     date: "13 Mar 2026", amount: "Rp 850.000",   status: "completed" },
  { id: "#CAR-0289", name: "Ahmad Fauzi",   service: "Private Car",   date: "13 Mar 2026", amount: "Rp 1.200.000", status: "confirmed" },
  { id: "#TRV-0090", name: "Siti Rahayu",   service: "Wisata Travel", date: "12 Mar 2026", amount: "Rp 1.450.000", status: "pending"   },
];

const STATUS_MAP: Record<string, { bg: string; color: string; label: string }> = {
  pending:   { bg: "rgba(245,158,11,0.12)", color: "#d97706", label: "Menunggu"     },
  confirmed: { bg: "rgba(59,130,246,0.12)", color: "#2563eb", label: "Dikonfirmasi" },
  completed: { bg: "rgba(34,197,94,0.12)",  color: "#16a34a", label: "Selesai"      },
  cancelled: { bg: "rgba(239,68,68,0.12)",  color: "#dc2626", label: "Dibatalkan"   },
};

export default function AdminDashboardTemplate() {
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-extrabold" style={{ color: "#0d2280" }}>
            Dashboard Admin
          </h1>
          <p className="mt-0.5 text-xs capitalize" style={{ color: "#4050b5" }}>
            {today}
          </p>
        </div>
        <div
          className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold"
          style={{ background: "#fff", border: "1.5px solid rgba(20,52,164,0.12)", color: "#1434A4" }}
        >
          <IconTrendUp size={14} />
          Bulan ini berjalan baik 🎉
        </div>
      </div>

      {/* Global Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {GLOBAL_STATS.map((s) => (
          <AdminStatsCard key={s.label} {...s} />
        ))}
      </div>

      {/* Service Overview */}
      <div>
        <h2 className="mb-3 text-sm font-extrabold" style={{ color: "#0d2280" }}>
          Ringkasan Per Layanan
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {SERVICE_CARDS.map(({ href, label, icon, bookings, revenue, color, pending }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: "#fff",
                border: "1.5px solid rgba(20,52,164,0.10)",
                boxShadow: "0 2px 8px rgba(20,52,164,0.05)",
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${color}18` }}
                >
                  <span style={{ color }}>{icon}</span>
                </div>
                {pending > 0 && (
                  <span
                    className="rounded-full px-2 py-0.5 text-[9px] font-extrabold"
                    style={{ background: "rgba(245,158,11,0.12)", color: "#d97706" }}
                  >
                    {pending} pending
                  </span>
                )}
              </div>
              <p className="text-[11px] font-bold" style={{ color: "#4050b5" }}>{label}</p>
              <p className="text-lg font-extrabold" style={{ color: "#0d2280" }}>{bookings}</p>
              <p className="text-[10px] font-medium" style={{ color: "#22c55e" }}>{revenue}</p>
              <div
                className="mt-2 flex items-center gap-1 text-[10px] font-semibold"
                style={{ color }}
              >
                Kelola <IconChevronRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Bookings */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-extrabold" style={{ color: "#0d2280" }}>
            Booking Terbaru
          </h2>
          <Link
            href="/admin/shuttle-service"
            className="text-[11px] font-semibold underline underline-offset-2"
            style={{ color: "#1434A4" }}
          >
            Lihat semua
          </Link>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "#fff",
            border: "1.5px solid rgba(20,52,164,0.10)",
            boxShadow: "0 2px 10px rgba(20,52,164,0.05)",
          }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "#f5f6fb", borderBottom: "1.5px solid rgba(20,52,164,0.08)" }}>
                {["ID Booking", "Pelanggan", "Layanan", "Tanggal", "Jumlah", "Status"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-[10px] font-extrabold uppercase tracking-wider"
                    style={{ color: "#4050b5" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT.map((r, i) => {
                const s = STATUS_MAP[r.status] ?? STATUS_MAP.pending;
                return (
                  <tr
                    key={r.id}
                    className="hover:bg-blue-50/40 transition"
                    style={{ borderBottom: i < RECENT.length - 1 ? "1px solid rgba(20,52,164,0.06)" : "none" }}
                  >
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-[11px] font-bold" style={{ color: "#1434A4" }}>{r.id}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs font-semibold" style={{ color: "#374151" }}>{r.name}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs" style={{ color: "#4050b5" }}>{r.service}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs" style={{ color: "#374151" }}>{r.date}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs font-semibold" style={{ color: "#16a34a" }}>{r.amount}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-bold"
                        style={{ background: s.bg, color: s.color }}
                      >
                        {s.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

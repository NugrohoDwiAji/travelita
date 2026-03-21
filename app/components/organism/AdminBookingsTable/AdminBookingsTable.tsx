"use client";

import { useState, useMemo } from "react";
import { IconSearch, IconFilter, IconEye, IconEdit } from "@/app/components/atoms/AdminIcons/AdminIcons";

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled" | "processing";

export interface BookingRecord {
  id: string;
  name: string;
  phone: string;
  date: string;
  status: BookingStatus;
  amount: string;
  [key: string]: string | number | undefined;
}

export interface ColumnDef {
  key: string;
  label: string;
  className?: string;
  render?: (value: string | number | undefined, row: BookingRecord) => React.ReactNode;
}

interface AdminBookingsTableProps {
  columns: ColumnDef[];
  data: BookingRecord[];
}

const STATUS_STYLES: Record<BookingStatus, { bg: string; color: string; label: string }> = {
  pending:    { bg: "rgba(245,158,11,0.12)", color: "#d97706", label: "Menunggu"    },
  confirmed:  { bg: "rgba(59,130,246,0.12)", color: "#2563eb", label: "Dikonfirmasi" },
  completed:  { bg: "rgba(34,197,94,0.12)",  color: "#16a34a", label: "Selesai"     },
  cancelled:  { bg: "rgba(239,68,68,0.12)",  color: "#dc2626", label: "Dibatalkan"  },
  processing: { bg: "rgba(168,85,247,0.12)", color: "#9333ea", label: "Diproses"    },
};

const PAGE_SIZE = 8;

export default function AdminBookingsTable({ columns, data }: AdminBookingsTableProps) {
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatus] = useState<BookingStatus | "all">("all");
  const [page, setPage]           = useState(1);

  const filtered = useMemo(() => {
    let rows = data;
    if (statusFilter !== "all") rows = rows.filter((r) => r.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q) ||
          r.phone.includes(q)
      );
    }
    return rows;
  }, [data, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function StatusBadge({ status }: { status: BookingStatus }) {
    const s = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
    return (
      <span
        className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold"
        style={{ background: s.bg, color: s.color }}
      >
        {s.label}
      </span>
    );
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#fff",
        border: "1.5px solid rgba(20,52,164,0.10)",
        boxShadow: "0 2px 12px rgba(20,52,164,0.06)",
      }}
    >
      {/* Toolbar */}
      <div
        className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
        style={{ borderBottom: "1.5px solid rgba(20,52,164,0.08)" }}
      >
        {/* Search */}
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 w-full sm:max-w-xs"
          style={{ background: "#f5f6fb", border: "1.5px solid rgba(20,52,164,0.12)" }}
        >
          <IconSearch size={15} className="shrink-0" style={{ color: "#4050b5" }} />
          <input
            type="text"
            placeholder="Cari nama, ID, telepon..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="flex-1 bg-transparent text-xs outline-none"
            style={{ color: "#1434A4" }}
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <IconFilter size={14} style={{ color: "#4050b5" }} />
          {(["all", "pending", "confirmed", "completed", "cancelled"] as const).map((s) => (
            <button
              key={s}
              onClick={() => { setStatus(s); setPage(1); }}
              className="rounded-full px-3 py-1 text-[10px] font-bold capitalize transition"
              style={
                statusFilter === s
                  ? { background: "#1434A4", color: "#fff" }
                  : { background: "rgba(20,52,164,0.07)", color: "#4050b5" }
              }
            >
              {s === "all" ? "Semua" : STATUS_STYLES[s as BookingStatus].label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-150 text-sm">
          <thead>
            <tr style={{ background: "#f5f6fb", borderBottom: "1.5px solid rgba(20,52,164,0.08)" }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left text-[10px] font-extrabold uppercase tracking-wider ${col.className ?? ""}`}
                  style={{ color: "#4050b5" }}
                >
                  {col.label}
                </th>
              ))}
              <th
                className="px-4 py-3 text-left text-[10px] font-extrabold uppercase tracking-wider"
                style={{ color: "#4050b5" }}
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-12 text-center text-sm"
                  style={{ color: "#4050b5" }}
                >
                  Tidak ada data yang sesuai
                </td>
              </tr>
            ) : (
              pageData.map((row, i) => (
                <tr
                  key={row.id}
                  className="transition hover:bg-blue-50/40"
                  style={{
                    borderBottom: i < pageData.length - 1 ? "1px solid rgba(20,52,164,0.06)" : "none",
                  }}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={`px-4 py-3.5 ${col.className ?? ""}`}>
                      {col.key === "status" ? (
                        <StatusBadge status={row.status} />
                      ) : col.key === "amount" ? (
                        <span className="font-semibold text-xs" style={{ color: "#16a34a" }}>
                          {row[col.key] ?? "—"}
                        </span>
                      ) : (
                        <span className="text-xs" style={{ color: "#374151" }}>
                          {row[col.key] ?? "—"}
                        </span>
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-blue-50"
                        style={{ color: "#1434A4" }}
                        title="Lihat detail"
                      >
                        <IconEye size={14} />
                      </button>
                      <button
                        className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-blue-50"
                        style={{ color: "#3d52c6" }}
                        title="Edit"
                      >
                        <IconEdit size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderTop: "1.5px solid rgba(20,52,164,0.08)" }}
      >
        <p className="text-[11px]" style={{ color: "#4050b5" }}>
          {filtered.length} data ditemukan
        </p>
        <div className="flex items-center gap-1">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold transition disabled:opacity-30"
            style={{ background: "rgba(20,52,164,0.07)", color: "#1434A4" }}
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold transition"
              style={
                page === p
                  ? { background: "#1434A4", color: "#fff" }
                  : { background: "rgba(20,52,164,0.07)", color: "#1434A4" }
              }
            >
              {p}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold transition disabled:opacity-30"
            style={{ background: "rgba(20,52,164,0.07)", color: "#1434A4" }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

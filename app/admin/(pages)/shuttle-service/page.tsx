import { Metadata } from "next";
import AdminServiceTemplate from "@/app/components/admin/templates/AdminServiceTemplate";
import type { BookingStatus, ColumnDef, BookingRecord } from "@/app/types/booking";
import { getShuttleBookingsByUserAndStatus } from "@/app/actions/shuttleService";

export const metadata: Metadata = { title: "Shuttle Service – Admin Travelita" };

const COLUMNS: ColumnDef[] = [
  { key: "id",         label: "ID"          },
  { key: "name",       label: "Pelanggan"   },
  { key: "phone",      label: "Telepon"     },
  { key: "route",      label: "Rute"        },
  { key: "date",       label: "Tanggal"     },
  { key: "time",       label: "Jam"         },
  { key: "passengers", label: "Penumpang"   },
  { key: "amount",     label: "Total" },
  { key: "status",     label: "Status"      },
];

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(value);
}

function formatTime(value: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(value);
}

function toTableStatus(status: string): BookingStatus {
  const normalized = status.toLowerCase();
  if (
    normalized === "pending" ||
    normalized === "confirmed" ||
    normalized === "completed" ||
    normalized === "cancelled" ||
    normalized === "processing"
  ) {
    return normalized as BookingStatus;
  }
  return "pending" as BookingStatus;
}

export default async function ShuttleAdminPage() {
  const result = await getShuttleBookingsByUserAndStatus();

  const bookings: BookingRecord[] =
    result && "success" in result && result.success
      ? result.data.map((item) => {
          const shuttle = item.shuttleBooking;
          const leavingDate = shuttle?.leavingTime ? new Date(shuttle.leavingTime) : null;

          return {
            id: `#SHT-${String(item.id).padStart(4, "0")}`,
            bookingDbId: item.id,
            name: item.user?.name ?? "-",
            phone: "-",
            route: shuttle ? `${shuttle.from} → ${shuttle.to}` : "-",
            date: leavingDate ? formatDate(leavingDate) : "-",
            time: leavingDate ? formatTime(leavingDate) : "-",
            passengers: shuttle ? String(shuttle.passengerCount) : "-",
            amount: shuttle ? formatRupiah(shuttle.price) : "Rp 0",
            status: toTableStatus(item.status),
          };
        })
      : [];

  return (
    <AdminServiceTemplate
      serviceTitle="Shuttle Service"
      serviceIcon="🚐"
      breadcrumb="Layanan"
      columns={COLUMNS}
      bookings={bookings}
    />
  );
}

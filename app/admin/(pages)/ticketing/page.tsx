import { Metadata } from "next";
import AdminServiceTemplate from "@/app/components/admin/templates/AdminServiceTemplate";
import { ColumnDef } from "@/app/types/booking";
import { getServiceBookingsByType } from "@/app/actions/serviceBooking";

export const metadata: Metadata = { title: "Ticketing - Admin Travelita" };

const COLUMNS: ColumnDef[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Pelanggan" },
  { key: "phone", label: "Telepon" },
  { key: "route", label: "Moda & Rute" },
  { key: "date", label: "Tanggal" },
  { key: "passengers", label: "Penumpang" },
  { key: "amount", label: "Total" },
  { key: "status", label: "Status" },
];

export default async function TicketingAdminPage() {
  const result = await getServiceBookingsByType("TICKET");

  return (
    <AdminServiceTemplate
      serviceTitle="Ticketing"
      serviceIcon="Ticket"
      breadcrumb="Layanan"
      columns={COLUMNS}
      bookings={result.success ? result.data : []}
    />
  );
}

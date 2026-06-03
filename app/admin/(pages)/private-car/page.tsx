import { Metadata } from "next";
import AdminServiceTemplate from "@/app/components/admin/templates/AdminServiceTemplate";
import { ColumnDef } from "@/app/types/booking";
import { getServiceBookingsByType } from "@/app/actions/serviceBooking";

export const metadata: Metadata = { title: "Private Car - Admin Travelita" };

const COLUMNS: ColumnDef[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Pelanggan" },
  { key: "phone", label: "Telepon" },
  { key: "route", label: "Layanan" },
  { key: "time", label: "Jam Jemput" },
  { key: "date", label: "Tanggal" },
  { key: "amount", label: "Total" },
  { key: "status", label: "Status" },
];

export default async function PrivateCarAdminPage() {
  const result = await getServiceBookingsByType("PRIVATE_CAR");

  return (
    <AdminServiceTemplate
      serviceTitle="Private Car"
      serviceIcon="Car"
      breadcrumb="Layanan"
      columns={COLUMNS}
      bookings={result.success ? result.data : []}
    />
  );
}

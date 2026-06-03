import { Metadata } from "next";
import AdminServiceTemplate from "@/app/components/admin/templates/AdminServiceTemplate";
import { ColumnDef } from "@/app/types/booking";
import { getServiceBookingsByType } from "@/app/actions/serviceBooking";

export const metadata: Metadata = { title: "Wisata Travel - Admin Travelita" };

const COLUMNS: ColumnDef[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Pelanggan" },
  { key: "phone", label: "Telepon" },
  { key: "route", label: "Destinasi & Paket" },
  { key: "date", label: "Tanggal" },
  { key: "time", label: "Waktu" },
  { key: "passengers", label: "Peserta" },
  { key: "amount", label: "Total" },
  { key: "status", label: "Status" },
];

export default async function TravelAdminPage() {
  const result = await getServiceBookingsByType("TRIP");

  return (
    <AdminServiceTemplate
      serviceTitle="Wisata Travel"
      serviceIcon="Travel"
      breadcrumb="Layanan"
      columns={COLUMNS}
      bookings={result.success ? result.data : []}
    />
  );
}

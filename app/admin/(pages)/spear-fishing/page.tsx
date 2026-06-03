import { Metadata } from "next";
import AdminServiceTemplate from "@/app/components/admin/templates/AdminServiceTemplate";
import { ColumnDef } from "@/app/types/booking";
import { getServiceBookingsByType } from "@/app/actions/serviceBooking";

export const metadata: Metadata = { title: "Spear Fishing - Admin Travelita" };

const COLUMNS: ColumnDef[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Peserta" },
  { key: "phone", label: "Telepon" },
  { key: "route", label: "Lokasi" },
  { key: "date", label: "Tanggal" },
  { key: "time", label: "Waktu" },
  { key: "passengers", label: "Peserta" },
  { key: "amount", label: "Total" },
  { key: "status", label: "Status" },
];

export default async function SpearFishingAdminPage() {
  const result = await getServiceBookingsByType("SPEAR_CAR");

  return (
    <AdminServiceTemplate
      serviceTitle="Spear Fishing"
      serviceIcon="Spear"
      breadcrumb="Layanan"
      columns={COLUMNS}
      bookings={result.success ? result.data : []}
    />
  );
}

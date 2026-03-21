import { Metadata } from "next";
import AdminServiceTemplate from "@/app/components/templates/AdminServiceTemplate/AdminServiceTemplate";
import { BookingRecord, ColumnDef } from "@/app/components/organism/AdminBookingsTable/AdminBookingsTable";

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

const DATA: BookingRecord[] = [
  { id: "#SHT-0541", name: "Budi Santoso",    phone: "081234567890", route: "Lombok → Mataram",  date: "15 Mar 2026", time: "08:00", passengers: "2", amount: "Rp 320.000",  status: "pending"   },
  { id: "#SHT-0540", name: "Citra Dewi",      phone: "081345678901", route: "Mataram → Senggigi",date: "15 Mar 2026", time: "09:30", passengers: "3", amount: "Rp 480.000",  status: "confirmed" },
  { id: "#SHT-0539", name: "Dian Pratama",    phone: "081456789012", route: "Senggigi → Gili",   date: "14 Mar 2026", time: "10:00", passengers: "1", amount: "Rp 185.000",  status: "completed" },
  { id: "#SHT-0538", name: "Eko Saputro",     phone: "081567890123", route: "Lombok → Mataram",  date: "14 Mar 2026", time: "07:00", passengers: "4", amount: "Rp 640.000",  status: "completed" },
  { id: "#SHT-0537", name: "Fajar Nugroho",   phone: "081678901234", route: "Mataram → Bandara", date: "13 Mar 2026", time: "05:30", passengers: "2", amount: "Rp 350.000",  status: "confirmed" },
  { id: "#SHT-0536", name: "Gita Lestari",    phone: "081789012345", route: "Bandara → Senggigi",date: "13 Mar 2026", time: "14:00", passengers: "3", amount: "Rp 450.000",  status: "completed" },
  { id: "#SHT-0535", name: "Hendra Wijaya",   phone: "081890123456", route: "Gili → Mataram",    date: "12 Mar 2026", time: "16:00", passengers: "2", amount: "Rp 370.000",  status: "cancelled" },
  { id: "#SHT-0534", name: "Indah Permata",   phone: "081901234567", route: "Lombok → Mataram",  date: "12 Mar 2026", time: "08:30", passengers: "1", amount: "Rp 160.000",  status: "completed" },
  { id: "#SHT-0533", name: "Joko Susanto",    phone: "082012345678", route: "Mataram → Senggigi",date: "11 Mar 2026", time: "11:00", passengers: "5", amount: "Rp 800.000",  status: "confirmed" },
  { id: "#SHT-0532", name: "Kartika Sari",    phone: "082123456789", route: "Senggigi → Lombok", date: "11 Mar 2026", time: "15:00", passengers: "2", amount: "Rp 320.000",  status: "completed" },
  { id: "#SHT-0531", name: "Lutfi Hakim",     phone: "082234567890", route: "Mataram → Bandara", date: "10 Mar 2026", time: "04:00", passengers: "3", amount: "Rp 525.000",  status: "completed" },
  { id: "#SHT-0530", name: "Maya Putri",      phone: "082345678901", route: "Bandara → Mataram", date: "10 Mar 2026", time: "12:00", passengers: "4", amount: "Rp 560.000",  status: "pending"   },
];

export default function ShuttleAdminPage() {
  return (
    <AdminServiceTemplate
      serviceTitle="Shuttle Service"
      serviceIcon="🚐"
      breadcrumb="Layanan"
      columns={COLUMNS}
      bookings={DATA}
    />
  );
}

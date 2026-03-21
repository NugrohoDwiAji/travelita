import { Metadata } from "next";
import AdminServiceTemplate from "@/app/components/templates/AdminServiceTemplate/AdminServiceTemplate";
import { BookingRecord, ColumnDef } from "@/app/components/organism/AdminBookingsTable/AdminBookingsTable";

export const metadata: Metadata = { title: "Spear Fishing – Admin Travelita" };

const COLUMNS: ColumnDef[] = [
  { key: "id",           label: "ID"           },
  { key: "name",         label: "Peserta"      },
  { key: "phone",        label: "Telepon"      },
  { key: "location",     label: "Lokasi"       },
  { key: "package",      label: "Paket"        },
  { key: "date",         label: "Tanggal"      },
  { key: "duration",     label: "Durasi"       },
  { key: "participants", label: "Peserta"      },
  { key: "amount",       label: "Total" },
  { key: "status",       label: "Status"       },
];

const DATA: BookingRecord[] = [
  { id: "#SPF-0091", name: "Rina Sari",       phone: "081234567893", location: "Raja Ampat",    package: "Menengah",   date: "20 Mar 2026", duration: "Full Day",  participants: "2", amount: "Rp 3.000.000",  status: "confirmed"  },
  { id: "#SPF-0090", name: "Samuel Tan",      phone: "081345678904", location: "Bunaken",        package: "Pemula",     date: "19 Mar 2026", duration: "Half Day",  participants: "3", amount: "Rp 2.550.000",  status: "pending"    },
  { id: "#SPF-0089", name: "Tania Wijaya",    phone: "081456789015", location: "Nusa Penida",    package: "Menengah",   date: "18 Mar 2026", duration: "Full Day",  participants: "1", amount: "Rp 1.500.000",  status: "confirmed"  },
  { id: "#SPF-0088", name: "Umar Salim",      phone: "081567890126", location: "Komodo",         package: "Profesional",date: "17 Mar 2026", duration: "2D 1N",     participants: "2", amount: "Rp 5.600.000",  status: "completed"  },
  { id: "#SPF-0087", name: "Vera Kusuma",     phone: "081678901237", location: "Wakatobi",       package: "Menengah",   date: "16 Mar 2026", duration: "Full Day",  participants: "4", amount: "Rp 6.000.000",  status: "completed"  },
  { id: "#SPF-0086", name: "Wahyu Purnomo",   phone: "081789012348", location: "Gili Trawangan", package: "Pemula",     date: "15 Mar 2026", duration: "Half Day",  participants: "2", amount: "Rp 1.700.000",  status: "confirmed"  },
  { id: "#SPF-0085", name: "Xena Putri",      phone: "081890123459", location: "Kepulauan Banda",package: "Profesional",date: "14 Mar 2026", duration: "3D 2N",     participants: "1", amount: "Rp 2.800.000",  status: "cancelled"  },
  { id: "#SPF-0084", name: "Yoga Irawan",     phone: "081901234570", location: "Raja Ampat",     package: "Menengah",   date: "13 Mar 2026", duration: "Full Day",  participants: "3", amount: "Rp 4.500.000",  status: "completed"  },
  { id: "#SPF-0083", name: "Zara Safitri",    phone: "082012345671", location: "Alor",           package: "Pemula",     date: "12 Mar 2026", duration: "Half Day",  participants: "2", amount: "Rp 1.700.000",  status: "completed"  },
  { id: "#SPF-0082", name: "Arif Budiono",    phone: "082123456782", location: "Derawan",        package: "Menengah",   date: "11 Mar 2026", duration: "Full Day",  participants: "2", amount: "Rp 3.000.000",  status: "pending"    },
];

export default function SpearFishingAdminPage() {
  return (
    <AdminServiceTemplate
      serviceTitle="Spear Fishing"
      serviceIcon="🎣"
      breadcrumb="Layanan"
      columns={COLUMNS}
      bookings={DATA}
    />
  );
}

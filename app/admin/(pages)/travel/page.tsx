import { Metadata } from "next";
import AdminServiceTemplate from "@/app/components/templates/AdminServiceTemplate/AdminServiceTemplate";
import { BookingRecord, ColumnDef } from "@/app/components/organism/AdminBookingsTable/AdminBookingsTable";

export const metadata: Metadata = { title: "Wisata Travel – Admin Travelita" };

const COLUMNS: ColumnDef[] = [
  { key: "id",           label: "ID"           },
  { key: "name",         label: "Pelanggan"    },
  { key: "phone",        label: "Telepon"      },
  { key: "package",      label: "Paket"        },
  { key: "destination",  label: "Destinasi"    },
  { key: "date",         label: "Tanggal"      },
  { key: "duration",     label: "Durasi"       },
  { key: "participants", label: "Peserta"      },
  { key: "amount",       label: "Total" },
  { key: "status",       label: "Status"       },
];

const DATA: BookingRecord[] = [
  { id: "#TRV-0091", name: "Rina Sari",       phone: "081234567893", package: "Gili Islands Explorer",    destination: "Gili Trawangan", date: "22 Mar 2026", duration: "3H 2M", participants: "2", amount: "Rp 2.900.000",  status: "confirmed"  },
  { id: "#TRV-0090", name: "Siti Rahayu",     phone: "081345678904", package: "Rinjani Trekking",         destination: "Gunung Rinjani", date: "21 Mar 2026", duration: "4H 3M", participants: "4", amount: "Rp 11.400.000", status: "pending"    },
  { id: "#TRV-0089", name: "Tono Wibowo",     phone: "081456789015", package: "Lombok South Coast",       destination: "Pantai Kuta",    date: "20 Mar 2026", duration: "2H 1M", participants: "3", amount: "Rp 2.625.000",  status: "confirmed"  },
  { id: "#TRV-0088", name: "Uma Surya",        phone: "081567890126", package: "Lombok Cultural Tour",     destination: "Desa Sade",      date: "19 Mar 2026", duration: "1 Hari",participants: "5", amount: "Rp 2.250.000",  status: "completed"  },
  { id: "#TRV-0087", name: "Vino Pratama",    phone: "081678901237", package: "Senggigi Premium Package", destination: "Senggigi",       date: "18 Mar 2026", duration: "3H 2M", participants: "2", amount: "Rp 3.900.000",  status: "completed"  },
  { id: "#TRV-0086", name: "Wulan Sari",      phone: "081789012348", package: "Air Terjun & Alam Tengah", destination: "Benang Kelambu", date: "17 Mar 2026", duration: "2H 1M", participants: "4", amount: "Rp 2.720.000",  status: "confirmed"  },
  { id: "#TRV-0085", name: "Xandra Meilani",  phone: "081890123459", package: "Gili Islands Explorer",    destination: "Gili Air",       date: "16 Mar 2026", duration: "3H 2M", participants: "2", amount: "Rp 2.900.000",  status: "cancelled"  },
  { id: "#TRV-0084", name: "Yusuf Hakim",     phone: "081901234570", package: "Rinjani Trekking",         destination: "Sembalun",       date: "15 Mar 2026", duration: "4H 3M", participants: "3", amount: "Rp 8.550.000",  status: "completed"  },
  { id: "#TRV-0083", name: "Zahra Putri",     phone: "082012345671", package: "Lombok South Coast",       destination: "Tanjung Aan",    date: "14 Mar 2026", duration: "2H 1M", participants: "2", amount: "Rp 1.750.000",  status: "completed"  },
  { id: "#TRV-0082", name: "Andi Kusuma",     phone: "082123456782", package: "Lombok Cultural Tour",     destination: "Masjid Beleq",   date: "13 Mar 2026", duration: "1 Hari",participants: "6", amount: "Rp 2.700.000",  status: "pending"    },
];

export default function TravelAdminPage() {
  return (
    <AdminServiceTemplate
      serviceTitle="Wisata Travel"
      serviceIcon="🗺️"
      breadcrumb="Layanan"
      columns={COLUMNS}
      bookings={DATA}
    />
  );
}

import { Metadata } from "next";
import AdminServiceTemplate from "@/app/components/templates/AdminServiceTemplate/AdminServiceTemplate";
import { BookingRecord, ColumnDef } from "@/app/components/organism/AdminBookingsTable/AdminBookingsTable";

export const metadata: Metadata = { title: "Private Car – Admin Travelita" };

const COLUMNS: ColumnDef[] = [
  { key: "id",       label: "ID"         },
  { key: "name",     label: "Pelanggan"  },
  { key: "phone",    label: "Telepon"    },
  { key: "service",  label: "Layanan"    },
  { key: "car",      label: "Kendaraan"  },
  { key: "date",     label: "Tanggal"    },
  { key: "duration", label: "Durasi"     },
  { key: "amount",   label: "Total" },
  { key: "status",   label: "Status"     },
];

const DATA: BookingRecord[] = [
  { id: "#CAR-0289", name: "Ahmad Fauzi",     phone: "081234567891", service: "Airport Transfer", car: "Toyota Avanza",  date: "15 Mar 2026", duration: "1 Hari",  amount: "Rp 1.200.000", status: "confirmed"  },
  { id: "#CAR-0288", name: "Bella Amelia",    phone: "081345678902", service: "Rental Harian",    car: "Suzuki Ertiga",  date: "15 Mar 2026", duration: "2 Hari",  amount: "Rp 1.600.000", status: "pending"    },
  { id: "#CAR-0287", name: "Chandra Putra",   phone: "081456789013", service: "Wisata Lombok",    car: "Toyota Innova",  date: "14 Mar 2026", duration: "3 Hari",  amount: "Rp 2.850.000", status: "completed"  },
  { id: "#CAR-0286", name: "Diana Rahayu",    phone: "081567890124", service: "Antar Jemput",     car: "Honda Jazz",     date: "14 Mar 2026", duration: "4 Jam",   amount: "Rp 480.000",   status: "completed"  },
  { id: "#CAR-0285", name: "Evan Setiawan",   phone: "081678901235", service: "Wedding",          car: "Toyota Alphard", date: "13 Mar 2026", duration: "8 Jam",   amount: "Rp 4.500.000", status: "confirmed"  },
  { id: "#CAR-0284", name: "Farida Hanum",    phone: "081789012346", service: "Airport Transfer", car: "Daihatsu Xenia", date: "13 Mar 2026", duration: "1 Trip",  amount: "Rp 950.000",   status: "completed"  },
  { id: "#CAR-0283", name: "Gilang Kresna",   phone: "081890123457", service: "Rental Harian",    car: "Mitsubishi Xpander",date: "12 Mar 2026", duration: "1 Hari",  amount: "Rp 750.000", status: "cancelled" },
  { id: "#CAR-0282", name: "Hesty Budiarti",  phone: "081901234568", service: "Wisata Lombok",    car: "Toyota Avanza",  date: "12 Mar 2026", duration: "2 Hari",  amount: "Rp 1.400.000", status: "completed"  },
  { id: "#CAR-0281", name: "Iqbal Maulana",   phone: "082012345679", service: "Airport Transfer", car: "Honda Freed",    date: "11 Mar 2026", duration: "1 Trip",  amount: "Rp 1.100.000", status: "confirmed"  },
  { id: "#CAR-0280", name: "Jasmine Putri",   phone: "082123456780", service: "Rental Harian",    car: "Toyota Innova",  date: "11 Mar 2026", duration: "3 Hari",  amount: "Rp 2.250.000", status: "completed"  },
];

export default function PrivateCarAdminPage() {
  return (
    <AdminServiceTemplate
      serviceTitle="Private Car"
      serviceIcon="🚗"
      breadcrumb="Layanan"
      columns={COLUMNS}
      bookings={DATA}
    />
  );
}

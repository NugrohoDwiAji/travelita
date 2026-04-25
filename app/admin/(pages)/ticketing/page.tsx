import { Metadata } from "next";
import AdminServiceTemplate from "@/app/components/admin/templates/AdminServiceTemplate";
import { BookingRecord, ColumnDef } from "@/app/components/admin/organism/AdminBookingsTable";

export const metadata: Metadata = { title: "Ticketing – Admin Travelita" };

const COLUMNS: ColumnDef[] = [
  { key: "id",         label: "ID"          },
  { key: "name",       label: "Pelanggan"   },
  { key: "phone",      label: "Telepon"     },
  { key: "mode",       label: "Moda"        },
  { key: "route",      label: "Rute"        },
  { key: "date",       label: "Tanggal"     },
  { key: "passengers", label: "Penumpang"   },
  { key: "ticketClass",label: "Kelas"       },
  { key: "amount",     label: "Total" },
  { key: "status",     label: "Status"      },
];

const DATA: BookingRecord[] = [
  { id: "#TKT-1102", name: "Dewi Kartika",    phone: "081234567892", mode: "✈️ Pesawat", route: "CGK → AMI",  date: "18 Mar 2026", passengers: "2", ticketClass: "Ekonomi", amount: "Rp 1.740.000", status: "completed"  },
  { id: "#TKT-1101", name: "Eko Prasetyo",    phone: "081345678903", mode: "🚂 Kereta",  route: "SBY → JKT",  date: "17 Mar 2026", passengers: "1", ticketClass: "Eksekutif",amount: "Rp 420.000",  status: "confirmed"  },
  { id: "#TKT-1100", name: "Fitri Handayani", phone: "081456789014", mode: "✈️ Pesawat", route: "DPS → CGK",  date: "16 Mar 2026", passengers: "4", ticketClass: "Ekonomi", amount: "Rp 3.200.000", status: "pending"    },
  { id: "#TKT-1099", name: "Gunawan Hadi",    phone: "081567890125", mode: "🚌 Bus",     route: "SBY → MLG",  date: "15 Mar 2026", passengers: "3", ticketClass: "VIP",     amount: "Rp 420.000",  status: "confirmed"  },
  { id: "#TKT-1098", name: "Hana Permata",    phone: "081678901236", mode: "⛴️ Ferry",   route: "LBK → SBY",  date: "15 Mar 2026", passengers: "2", ticketClass: "Biasa",   amount: "Rp 380.000",  status: "completed"  },
  { id: "#TKT-1097", name: "Irwan Saleh",     phone: "081789012347", mode: "✈️ Pesawat", route: "AMI → CGK",  date: "14 Mar 2026", passengers: "1", ticketClass: "Bisnis",  amount: "Rp 2.100.000", status: "completed"  },
  { id: "#TKT-1096", name: "Julia Sari",      phone: "081890123458", mode: "🚂 Kereta",  route: "JKT → YOG",  date: "14 Mar 2026", passengers: "2", ticketClass: "Bisnis",  amount: "Rp 740.000",  status: "cancelled"  },
  { id: "#TKT-1095", name: "Kevin Kurniawan", phone: "081901234569", mode: "✈️ Pesawat", route: "CGK → SUB",  date: "13 Mar 2026", passengers: "3", ticketClass: "Ekonomi", amount: "Rp 1.950.000", status: "completed"  },
  { id: "#TKT-1094", name: "Lilis Suryani",   phone: "082012345670", mode: "🚌 Bus",     route: "MLG → SBY",  date: "13 Mar 2026", passengers: "1", ticketClass: "Eksekutif",amount: "Rp 95.000",   status: "confirmed"  },
  { id: "#TKT-1093", name: "Mario Santoso",   phone: "082123456781", mode: "⛴️ Ferry",   route: "MKS → BTG",  date: "12 Mar 2026", passengers: "4", ticketClass: "VIP",     amount: "Rp 940.000",  status: "pending"    },
  { id: "#TKT-1092", name: "Nadia Kurnia",    phone: "082234567892", mode: "✈️ Pesawat", route: "SUB → DPS",  date: "12 Mar 2026", passengers: "2", ticketClass: "Ekonomi", amount: "Rp 1.460.000", status: "completed"  },
  { id: "#TKT-1091", name: "Oscar Putra",     phone: "082345678903", mode: "🚂 Kereta",  route: "YOG → SBY",  date: "11 Mar 2026", passengers: "1", ticketClass: "Eksekutif",amount: "Rp 380.000",  status: "completed"  },
];

export default function TicketingAdminPage() {
  return (
    <AdminServiceTemplate
      serviceTitle="Ticketing"
      serviceIcon="🎫"
      breadcrumb="Layanan"
      columns={COLUMNS}
      bookings={DATA}
    />
  );
}

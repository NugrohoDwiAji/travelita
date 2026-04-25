import { Metadata } from "next";
import AdminDashboardTemplate from "@/app/components/admin/templates/AdminDashboardTemplate";

export const metadata: Metadata = { title: "Dashboard – Admin Travelita" };

export default function AdminPage() {
  return <AdminDashboardTemplate />;
}

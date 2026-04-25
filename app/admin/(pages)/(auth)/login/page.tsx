import { Metadata } from "next";
import AdminSignInTemplate from "@/app/components/admin/templates/AdminSignInTemplate";

export const metadata: Metadata = {
  title: "Admin Login – Travelita",
};

export default function AdminSignInPage() {
  return <AdminSignInTemplate />;
}

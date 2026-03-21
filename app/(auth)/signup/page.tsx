import { Metadata } from "next";
import SignUpTemplate from "@/app/components/templates/SignUpTemplate/SignUpTemplate";

export const metadata: Metadata = {
  title: "Daftar – Travelita",
  description: "Buat akun Travelita dan mulai petualanganmu hari ini.",
};

export default function SignUpPage() {
  return <SignUpTemplate />;
}

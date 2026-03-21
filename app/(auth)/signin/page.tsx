import { Metadata } from "next";
import SignInTemplate from "@/app/components/templates/SignInTemplate/SignInTemplate";

export const metadata: Metadata = {
  title: "Masuk – Travelita",
  description: "Masuk ke akun Travelita-mu dan lanjutkan petualanganmu.",
};

export default function SignInPage() {
  return <SignInTemplate />;
}


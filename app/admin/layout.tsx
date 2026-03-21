import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import AdminSidebar from "@/app/components/organism/AdminSidebar/AdminSidebar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin – Travelita",
  description: "Panel admin Travelita",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen" style={{ background: "#f5f6fb" }}>
          <AdminSidebar />
          <div className="lg:pl-60">
            <main className="min-h-screen">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}

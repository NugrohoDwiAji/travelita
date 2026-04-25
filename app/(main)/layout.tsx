import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/app/components/organism/Header";
import AuthProvider from "@/app/context/AuthProvider";
import UnderConstructionBanner from "@/app/components/moleculs/UnderConstructionBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travelita – Travel & Adventure",
  description:
    "Platform perjalanan terpercaya: shuttle service, private car, ticketing, spear fishing, dan paket travel terbaik di Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <UnderConstructionBanner />
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

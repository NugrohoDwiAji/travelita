import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/app/components/organism/Header";
import AuthProvider from "@/app/context/AuthProvider";
import WhatsAppButton from "@/app/components/molecules/WhatsAppButton";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <Header />
            {children}
            <WhatsAppButton />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

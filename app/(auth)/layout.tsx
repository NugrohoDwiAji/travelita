import React from "react";
import "../globals.css";
import AuthProvider from "@/app/context/AuthProvider";
import UnderConstructionBanner from "@/app/components/moleculs/UnderConstructionBanner";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="pt-8">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <UnderConstructionBanner />
            {children}
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React, { Suspense } from "react";
import { ClientIntlProvider } from "@/components/client-intl-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "西尾文明暦",
  description:
    "西尾文明暦——每月的第一天，都变成上个月的第 32日），由@西尾夕香 开创的特殊历法。在这个独特的时间体系中，每个月的第一天都被赋予了特殊的意义。",
  icons: "/nishiokun.png",
  openGraph: {
    images: "/og.png",
  },
  alternates: {
    canonical: "/",
    languages: {
      zh: "/",
      ja: "/?lang=ja",
    },
  },
  metadataBase: new URL("https://nishio.chilfish.top"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
          <ClientIntlProvider>{children}</ClientIntlProvider>
        </Suspense>
      </body>
    </html>
  );
}

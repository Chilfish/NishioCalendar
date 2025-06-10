import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";

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
  description: "西尾文明暦——每月的第一天，都变成上个月的第 32日（或根据上个月天数而定），由@西尾夕香开创的特殊历法。在这个独特的时间体系中，每个月的第一天都被赋予了特殊的意义。",
  icons: '/nishiokun.png',
  openGraph: {
    images: '/og.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      data-theme="light"
      lang="zh"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

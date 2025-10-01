import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { Geist, Geist_Mono } from 'next/font/google'
import { redirect } from 'next/navigation'
import React from 'react'
import { routing } from '@/i18n/routing'
import '../globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '西尾文明暦',
  description:
    '西尾文明暦——每月的第一天，都变成上个月的第 32日），由@西尾夕香 开创的特殊历法。在这个独特的时间体系中，每个月的第一天都被赋予了特殊的意义。',
  icons: '/nishiokun.png',
  openGraph: {
    images: '/og.png',
  },
  alternates: {
    canonical: '/',
    languages: {
      zh: '/zh',
      ja: '/ja',
    },
  },
  metadataBase: new URL('https://nishio.chilfish.top'),
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    redirect(`/zh`)
  }

  return (
    <html data-theme="light" lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}

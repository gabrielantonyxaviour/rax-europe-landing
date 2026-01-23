import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { AppWrapper } from "@/components/app-wrapper";
import { SITE_SEO } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: SITE_SEO.home.title,
  description: SITE_SEO.home.description,
  keywords: [...SITE_SEO.keywords],
  authors: [{ name: SITE_SEO.companyName }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `https://${SITE_SEO.domain}`,
    siteName: SITE_SEO.companyName,
    title: SITE_SEO.home.title,
    description: SITE_SEO.home.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_SEO.home.title,
    description: SITE_SEO.home.description,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <AppWrapper>{children}</AppWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

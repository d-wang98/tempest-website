import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getLocale } from "next-intl/server";
import { StructuredData } from "@/components/StructuredData";
import { SITE_URL, OG_IMAGE } from "@/lib/seo";

const zalandoSans = localFont({
  src: "../public/assets/fonts/ZalandoSans-Variable.ttf",
  variable: "--font-zalando",
  display: "swap",
  weight: "300 900",
});

const zalandoSansSemiExpanded = localFont({
  src: "../public/assets/fonts/ZalandoSansSemiExpanded-VariableFont_wght.ttf",
  variable: "--font-zalando-expanded",
  display: "swap",
  weight: "300 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Tempest: Stablecoin Payments for Modern Business",
  description:
    "Tempest is the non-custodial stablecoin orchestration layer that makes cross-border payments simple, trusted, and enterprise-ready.",
  applicationName: "Tempest",
  icons: {
    icon: "/assets/images/logo_only.png",
    shortcut: "/assets/images/logo_only.png",
    apple: "/assets/images/logo_only.png",
  },
  openGraph: {
    type: "website",
    siteName: "Tempest",
    url: SITE_URL,
    title: "Tempest: Stablecoin Payments for Modern Business",
    description:
      "The non-custodial stablecoin orchestration layer for modern business. Accept, pay, and reconcile across any chain.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Tempest" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Tempest_Pay",
    title: "Tempest: Stablecoin Payments for Modern Business",
    description: "The non-custodial stablecoin orchestration layer for modern business.",
    images: [OG_IMAGE],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${zalandoSans.variable} ${zalandoSansSemiExpanded.variable}`}>
      <body>
        {children}
        <StructuredData />
      </body>
    </html>
  );
}

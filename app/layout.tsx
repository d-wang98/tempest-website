import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Default body/UI font — normal width, full weight range
const zalandoSans = localFont({
  src: "../public/assets/fonts/ZalandoSans-Variable.ttf",
  variable: "--font-zalando",
  display: "swap",
  weight: "300 900",
});

// Logo-only font — semi-expanded width
const zalandoSansSemiExpanded = localFont({
  src: "../public/assets/fonts/ZalandoSansSemiExpanded-VariableFont_wght.ttf",
  variable: "--font-zalando-expanded",
  display: "swap",
  weight: "300 900",
});

export const metadata: Metadata = {
  icons: { icon: "/assets/images/logo_only.png" },
  title: "Tempest — Stablecoin Payments for Modern Business",
  description:
    "Tempest is the non-custodial stablecoin orchestration layer that makes cross-chain payments simple, trusted, and enterprise-ready.",
  openGraph: {
    title: "Tempest — Stablecoin Payments for Modern Business",
    description:
      "Non-custodial stablecoin payments. Enterprise-ready. Built for scale.",
    siteName: "Tempest",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${zalandoSans.variable} ${zalandoSansSemiExpanded.variable}`}>
      <body>{children}</body>
    </html>
  );
}

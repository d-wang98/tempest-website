import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getLocale } from "next-intl/server";

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
  icons: { icon: "/assets/images/logo_only.png" },
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
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tempest",
  description: "Stablecoin payments, orchestrated.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

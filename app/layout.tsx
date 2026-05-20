import type { Metadata } from "next";
import { ReactNode } from "react";

import "./globals.css";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: "Leviva Travel and Tours | Tanzania, Zanzibar, Botswana Safaris",
    template: "%s | Leviva Travel and Tours",
  },
  description:
    "Book custom Tanzania safaris, Zanzibar beach holidays, Botswana wilderness trips, and East Africa tours with Leviva Travel and Tours.",
  keywords: [
    "Tanzania safari",
    "Zanzibar tours",
    "Botswana safari",
    "East Africa travel",
    "Leviva Travel and Tours",
    "Serengeti safari",
    "Ngorongoro tour",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Leviva Travel and Tours",
    description:
      "High-touch safari, beach, and East Africa tour planning for travelers from China, USA, Europe, South Korea, Australia, and New Zealand.",
    url: siteConfig.baseUrl,
    siteName: "Leviva Travel and Tours",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

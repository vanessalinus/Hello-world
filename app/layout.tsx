import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { contact } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.levivatravel.co.tz";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Leviva Travel and Tours | Tanzania, Zanzibar, Botswana Safaris",
    template: "%s | Leviva Travel and Tours",
  },
  description:
    "Book tailor-made Tanzania safaris, Zanzibar beach holidays, Botswana wilderness trips, and East Africa tours for travelers from China, USA, Europe, South Korea, Australia, and New Zealand.",
  keywords: [
    "Tanzania safari",
    "Zanzibar travel",
    "Botswana safari",
    "East Africa tours",
    "Serengeti migration",
    "Leviva Travel and Tours",
  ],
  authors: [{ name: "Leviva Investments", url: siteUrl }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Leviva Travel and Tours",
    description:
      "Tailor-made Tanzania, Zanzibar, Botswana, and East Africa travel designed for high-confidence booking.",
    url: siteUrl,
    siteName: "Leviva Travel and Tours",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leviva Travel and Tours",
    description:
      "Tanzania safaris, Zanzibar beach holidays, Botswana wilderness, and East Africa extensions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#146c43",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Leviva Travel and Tours",
    url: siteUrl,
    email: contact.email,
    telephone: contact.phone,
    areaServed: ["Tanzania", "Zanzibar", "Botswana", "Kenya", "Rwanda", "Uganda"],
    knowsAbout: [
      "Tanzania safari",
      "Zanzibar beach holidays",
      "Botswana safari",
      "East Africa tours",
    ],
  };

  return (
    <html lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          type="application/ld+json"
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { LocaleProvider } from "@/context/LocaleContext";
import { SITE } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE.name} | Tanzania, Zanzibar, Botswana & East Africa`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.tagline,
  keywords: [
    "Tanzania safari",
    "Zanzibar beach",
    "Botswana Okavango",
    "East Africa tours",
    "Serengeti",
    "Leviva Travel",
  ],
  openGraph: {
    title: SITE.name,
    description: SITE.tagline,
    url: siteUrl,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: SITE.name,
  description: SITE.tagline,
  url: siteUrl,
  email: SITE.email,
  telephone: SITE.phoneDisplay,
  areaServed: [
    "Tanzania",
    "Zanzibar",
    "Botswana",
    "Kenya",
    "Rwanda",
    "Uganda",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${fraunces.variable} ${dmSans.className} antialiased`}
      >
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FloatingActions } from "@/components/floating-actions";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} – East Africa Safaris, Zanzibar & Botswana Tours`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [
    "Tanzania safari",
    "Serengeti migration tour",
    "Zanzibar beach holiday",
    "Botswana Okavango safari",
    "Kilimanjaro climb",
    "East Africa tours",
    "Leviva Travel",
    "Leviva Investments"
  ],
  openGraph: {
    title: `${siteConfig.name}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
        width: 1600,
        height: 900,
        alt: "Serengeti sunset with elephants"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: "#2d6635"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Arusha",
      addressLocality: "Arusha",
      addressCountry: "TZ"
    },
    areaServed: [
      "Tanzania",
      "Zanzibar",
      "Botswana",
      "Kenya",
      "Rwanda",
      "Uganda"
    ],
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.youtube
    ]
  };

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-ivory text-savanna-950 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}

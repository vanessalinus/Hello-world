import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppWidget from "@/components/shared/WhatsAppWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Leviva Travel & Tours | Tanzania Safari, Zanzibar, Botswana",
    template: "%s | Leviva Travel & Tours",
  },
  description:
    "East Africa's premier safari company. Luxury Tanzania safaris, Zanzibar beach holidays, Botswana Okavango Delta, Kilimanjaro climbs, and Rwanda gorilla trekking. Expert guides, 4.9★ rating. Book your dream safari today!",
  keywords: [
    "Tanzania safari",
    "Zanzibar tours",
    "Serengeti safari",
    "Kilimanjaro climb",
    "Botswana safari",
    "East Africa tours",
    "Africa travel",
    "wildlife safari",
    "luxury safari",
    "Tanzania tours",
    "wildebeest migration",
    "Ngorongoro crater",
    "Rwanda gorilla trekking",
    "safari from China",
    "safari from Korea",
    "Leviva Travel",
  ],
  authors: [{ name: "Leviva Travel & Tours" }],
  creator: "Leviva Travel & Tours",
  publisher: "Leviva Investments Ltd",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://levivainvestments.co.tz",
    siteName: "Leviva Travel & Tours",
    title: "Leviva Travel & Tours | Tanzania Safari & East Africa Adventures",
    description:
      "Experience the magic of East Africa with Leviva Travel. Tanzania safaris, Zanzibar beaches, Botswana wilderness. 4.9★ rated. Book now!",
    images: [
      {
        url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Serengeti Safari - Leviva Travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leviva Travel & Tours | East Africa Safari Experts",
    description: "Tanzania safaris, Zanzibar beaches, Botswana. 4.9★ rated safari company.",
    images: ["https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80"],
  },
  alternates: {
    canonical: "https://levivainvestments.co.tz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#f08518" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Leviva Travel & Tours",
              description:
                "East Africa's premier safari and travel company specializing in Tanzania, Zanzibar, Botswana, and Rwanda",
              url: "https://levivainvestments.co.tz",
              telephone: "+255758996047",
              email: "info@levivainvestments.co.tz",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Arusha",
                addressCountry: "TZ",
              },
              sameAs: [],
              priceRange: "$$$",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "500",
                bestRating: "5",
                worstRating: "1",
              },
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}

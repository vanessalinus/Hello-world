import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Leviva Travel & Tours | East Africa Safari Experts",
    template: "%s | Leviva Travel & Tours",
  },
  description:
    "Discover East Africa with Leviva Travel & Tours — expert-guided safaris in Tanzania, Zanzibar, Botswana, Kenya & Rwanda. Serengeti migrations, Kilimanjaro treks, beach retreats & more. Book your dream African adventure today!",
  keywords: [
    "Tanzania safari",
    "Serengeti migration",
    "Kilimanjaro trek",
    "Zanzibar beach holiday",
    "Botswana safari",
    "Okavango Delta",
    "East Africa tours",
    "African safari",
    "Ngorongoro Crater",
    "gorilla trekking Rwanda",
    "Maasai Mara safari",
    "luxury safari Tanzania",
    "budget safari Tanzania",
    "Tanzania tour operator",
    "Leviva travel",
  ],
  authors: [{ name: "Leviva Investments Co. Ltd" }],
  creator: "Leviva Travel & Tours",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://levivainvestments.co.tz",
    siteName: "Leviva Travel & Tours",
    title: "Leviva Travel & Tours | East Africa Safari Experts",
    description:
      "Expert-guided safaris, mountain treks, and beach retreats across Tanzania, Zanzibar, Botswana & East Africa. Book your dream African adventure!",
    images: [
      {
        url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "East Africa Safari with Leviva Travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leviva Travel & Tours | East Africa Safari Experts",
    description:
      "Discover East Africa's most extraordinary destinations with Leviva Travel & Tours.",
  },
  robots: {
    index: true,
    follow: true,
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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ec7a14" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

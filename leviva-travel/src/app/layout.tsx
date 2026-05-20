import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Leviva Travel & Tours — Unforgettable African Safaris",
    template: "%s | Leviva Travel & Tours",
  },
  description:
    "Experience Tanzania, Zanzibar, Botswana & East Africa with Leviva Travel & Tours. Expert-guided safaris, beach holidays, Kilimanjaro treks & gorilla trekking. Book your dream African adventure today.",
  keywords: [
    "Tanzania safari",
    "Zanzibar holiday",
    "Serengeti migration",
    "Kilimanjaro trek",
    "Botswana safari",
    "East Africa tours",
    "African safari",
    "Ngorongoro crater",
    "gorilla trekking",
    "Okavango Delta",
    "Leviva Travel",
    "Tanzania tour operator",
  ],
  openGraph: {
    title: "Leviva Travel & Tours — Unforgettable African Safaris",
    description:
      "Expert-guided safaris in Tanzania, Zanzibar, Botswana & East Africa. 15,000+ happy travelers. Book now!",
    url: "https://levivainvestments.co.tz",
    siteName: "Leviva Travel & Tours",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: "Leviva Travel & Tours | Tanzania, Zanzibar, Botswana, and East Africa",
    template: "%s | Leviva Travel & Tours",
  },
  description:
    "Leviva Travel & Tours offers conversion-focused safari, beach, and East Africa journeys covering Tanzania, Zanzibar, Botswana, and surrounding destinations.",
  keywords: [
    "Tanzania safari",
    "Zanzibar holidays",
    "Botswana safari",
    "East Africa travel",
    "Leviva Travel and Tours",
    "African honeymoon packages",
    "Serengeti safari",
  ],
  openGraph: {
    title: "Leviva Travel & Tours",
    description:
      "Safari, beach, and multi-country East Africa journeys built for high booking conversion.",
    url: company.siteUrl,
    siteName: company.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leviva Travel & Tours",
    description:
      "Tanzania, Zanzibar, Botswana, and East Africa holidays that turn interest into inquiries.",
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
      <body className="min-h-full bg-white text-slate-950">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

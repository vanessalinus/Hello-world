import type { Metadata } from "next";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { AppShell } from "@/components/layout/AppShell";
import { SITE } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Leviva Travel & Tours | East Africa & Botswana Safaris",
    template: "%s | Leviva Travel & Tours",
  },
  description:
    "Luxury safaris in Tanzania, Zanzibar, Botswana, Kenya, Uganda & Rwanda. Tailored for travelers from China, USA, Europe, South Korea, Australia & New Zealand. Book your free quote today.",
  keywords: [
    "Tanzania safari",
    "Zanzibar tours",
    "Botswana Okavango",
    "Kilimanjaro trek",
    "East Africa travel",
    "China safari tours",
    "luxury Africa tours",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    title: "Leviva Travel & Tours — East Africa & Botswana",
    description:
      "Premium safaris and tours for international travelers. Free quote within 24 hours.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <JsonLd />
        <LocaleProvider>
          <AppShell>{children}</AppShell>
        </LocaleProvider>
      </body>
    </html>
  );
}

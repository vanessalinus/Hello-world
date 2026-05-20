import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.levivatravel.com"),
  title: "Leviva Travel & Tours | Tanzania, Zanzibar, Botswana & East Africa Safaris",
  description:
    "Book tailor-made Tanzania, Zanzibar, Botswana, and East Africa trips with Leviva Travel & Tours. Designed for travelers from China, the USA, Europe, South Korea, Australia, and New Zealand.",
  keywords: [
    "Leviva Travel & Tours",
    "Tanzania safari",
    "Zanzibar tours",
    "Botswana safari",
    "East Africa travel",
    "African safari booking",
  ],
  openGraph: {
    title: "Leviva Travel & Tours",
    description:
      "Tailor-made safaris, beach holidays, and East Africa journeys designed to convert interest into confirmed bookings.",
    url: "https://www.levivatravel.com",
    siteName: "Leviva Travel & Tours",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leviva Travel & Tours",
    description:
      "Tanzania, Zanzibar, Botswana, and East Africa journeys planned for modern international travelers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}

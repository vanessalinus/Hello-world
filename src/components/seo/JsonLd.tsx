import { SITE } from "@/lib/utils";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE.name,
    description:
      "Luxury safaris and tours in Tanzania, Zanzibar, Botswana, and East Africa for international travelers.",
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    areaServed: [
      "Tanzania",
      "Zanzibar",
      "Botswana",
      "Kenya",
      "Uganda",
      "Rwanda",
      "China",
      "United States",
      "Europe",
      "South Korea",
      "Australia",
      "New Zealand",
    ],
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Arusha",
      addressCountry: "TZ",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

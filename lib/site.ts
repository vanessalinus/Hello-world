export const siteConfig = {
  name: "Leviva Travel & Tours",
  legalName: "Leviva Investments Ltd.",
  shortName: "Leviva",
  description:
    "Award-winning East African safari operator crafting bespoke trips to Tanzania, Zanzibar, Botswana, Kenya, Rwanda and Uganda. Trusted by travellers from China, the USA, Europe, South Korea, Australia and New Zealand.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.levivatravel.com",
  contact: {
    email: process.env.NEXT_PUBLIC_EMAIL || "info@levivainvestments.co.tz",
    phone: process.env.NEXT_PUBLIC_PHONE || "+255758996047",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "255758996047",
    address: "Arusha · Dar es Salaam · Zanzibar, Tanzania"
  },
  social: {
    instagram: "https://instagram.com/levivatravel",
    facebook: "https://facebook.com/levivatravel",
    youtube: "https://youtube.com/@levivatravel",
    tiktok: "https://tiktok.com/@levivatravel",
    wechat: "LevivaTravel"
  },
  sourceMarkets: [
    { code: "CN", label: "China", flag: "🇨🇳" },
    { code: "US", label: "USA", flag: "🇺🇸" },
    { code: "EU", label: "Europe", flag: "🇪🇺" },
    { code: "KR", label: "South Korea", flag: "🇰🇷" },
    { code: "AU", label: "Australia", flag: "🇦🇺" },
    { code: "NZ", label: "New Zealand", flag: "🇳🇿" }
  ],
  languages: ["English", "中文 (Mandarin)", "한국어", "Deutsch", "Français", "Italiano", "Español"],
  trustBadges: [
    "TATO Licensed Operator",
    "Tanzania Tourist Board Registered",
    "IATA Affiliated",
    "Kilimanjaro Porters Assistance Project (KPAP) Partner",
    "Travelife Sustainability Member"
  ],
  guaranteeBullets: [
    "Best-price guarantee on every itinerary",
    "Flexible free cancellation up to 30 days",
    "24/7 in-destination support team",
    "100% financial protection on deposits",
    "Carbon-offset on every booking"
  ]
};

export type SourceMarket = (typeof siteConfig.sourceMarkets)[number];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/tours", label: "Safaris & Tours" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" }
];

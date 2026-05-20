export const SITE = {
  name: "Leviva Travel & Tours",
  legalName: "Leviva Investments",
  tagline: "East Africa safaris & island escapes — crafted for global travellers.",
  email: "info@levivainvestments.co.tz",
  phoneDisplay: "+255 758 996 047",
  phoneE164: "+255758996047",
  whatsappE164: "255758996047",
  url: "https://levivatravel.com",
} as const;

export const SOURCE_MARKETS = [
  { id: "china", label: "China", flag: "🇨🇳" },
  { id: "usa", label: "United States", flag: "🇺🇸" },
  { id: "europe", label: "Europe", flag: "🇪🇺" },
  { id: "south_korea", label: "South Korea", flag: "🇰🇷" },
  { id: "australia", label: "Australia", flag: "🇦🇺" },
  { id: "new_zealand", label: "New Zealand", flag: "🇳🇿" },
  { id: "other", label: "Other", flag: "🌍" },
] as const;

export type SourceMarketId = (typeof SOURCE_MARKETS)[number]["id"];

export interface Destination {
  slug: string;
  country: string;
  headline: string;
  summary: string;
  highlights: string[];
  image: string;
  bestTime: string;
}

export const DESTINATIONS: Destination[] = [
  {
    slug: "tanzania",
    country: "Tanzania",
    headline: "Serengeti, Ngorongoro & Kilimanjaro",
    summary:
      "Big-five safaris, Great Migration river crossings, and volcanic calderas — Tanzania is the definitive East Africa wildlife experience.",
    highlights: [
      "Serengeti National Park",
      "Ngorongoro Crater",
      "Tarangire elephant country",
      "Optional Kilimanjaro extensions",
    ],
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e763b01b2?auto=format&fit=crop&w=1600&q=80",
    bestTime: "June–October & January–February (calving)",
  },
  {
    slug: "zanzibar",
    country: "Zanzibar",
    headline: "Spice islands & turquoise lagoons",
    summary:
      "Post-safari relaxation in Stone Town UNESCO heritage, pristine beaches of the north & east coast, and world-class diving.",
    highlights: [
      "Stone Town culture & cuisine",
      "Mnemba & Pemba diving",
      "Private beach resorts",
      "Seamless fly-in from Dar or Arusha",
    ],
    image:
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1600&q=80",
    bestTime: "June–October & December–March",
  },
  {
    slug: "botswana",
    country: "Botswana",
    headline: "Okavango Delta & exclusive camps",
    summary:
      "Low-volume, high-value wilderness: mokoro glides, predator-rich concessions, and the elephant corridors of Chobe.",
    highlights: [
      "Okavango Delta water camps",
      "Chobe River boating",
      "Makgadikgadi salt pans",
      "Fly-circuit logistics handled end-to-end",
    ],
    image:
      "https://images.unsplash.com/photo-1564760055776-d63b17a55c44?auto=format&fit=crop&w=1600&q=80",
    bestTime: "May–October (peak flood varies by year)",
  },
  {
    slug: "kenya",
    country: "Kenya",
    headline: "Masai Mara & Laikipia conservancies",
    summary:
      "Classic savannah drama with private conservancies for night drives, walking safaris, and fewer vehicles at sightings.",
    highlights: [
      "Masai Mara National Reserve",
      "Private conservancies",
      "Big cat research zones",
      "Nairobi hub connections",
    ],
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
    bestTime: "July–October (Migration) & green season value",
  },
  {
    slug: "rwanda",
    country: "Rwanda",
    headline: "Gorilla trekking & lakes",
    summary:
      "Volcanoes National Park gorilla permits, golden monkeys, and serene Lake Kivu — pair with a Tanzania circuit for contrast.",
    highlights: [
      "Gorilla & golden monkey permits",
      "Kigali logistics & genocide memorial",
      "Lake Kivu boutique stays",
      "East Africa multi-country routing",
    ],
    image:
      "https://images.unsplash.com/photo-1591824438708-ce405f369ba2?auto=format&fit=crop&w=1600&q=80",
    bestTime: "June–September & mid-December–February",
  },
  {
    slug: "uganda",
    country: "Uganda",
    headline: "Primates & the Nile",
    summary:
      "Bwindi gorillas, Kibale chimpanzees, and Murchison Falls — ideal for active travellers seeking depth beyond the vehicle.",
    highlights: [
      "Bwindi Impenetrable Forest",
      "Chimp trekking in Kibale",
      "Murchison Falls boat cruises",
      "Source of the Nile excursions",
    ],
    image:
      "https://images.unsplash.com/photo-1605557206979-9e3e0cf73888?auto=format&fit=crop&w=1600&q=80",
    bestTime: "June–September & December–February",
  },
];

export function getDestination(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

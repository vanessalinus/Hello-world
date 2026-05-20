import {
  Binoculars,
  CalendarCheck,
  Camera,
  Globe2,
  HeartHandshake,
  Map,
  MessageCircle,
  Plane,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

export const contact = {
  email: "info@levivainvestments.co.tz",
  phone: "+255758996047",
  phoneDisplay: "+255 758 996 047",
  whatsappUrl:
    "https://wa.me/255758996047?text=Hello%20Leviva%20Travel%20and%20Tours%2C%20I%20would%20like%20to%20plan%20an%20East%20Africa%20trip.",
};

export const navItems = [
  { label: "Destinations", href: "#destinations" },
  { label: "Safari Packages", href: "#packages" },
  { label: "Why Leviva", href: "#why-leviva" },
  { label: "Reviews", href: "#reviews" },
  { label: "Booking", href: "#booking" },
];

export const priorityMarkets = [
  "China",
  "USA",
  "Europe",
  "South Korea",
  "Australia",
  "New Zealand",
];

export const destinations = [
  {
    name: "Tanzania Safaris",
    region: "Serengeti, Ngorongoro, Tarangire, Lake Manyara",
    summary:
      "Private and small-group safaris built around the Great Migration, Big Five wildlife, cultural visits, and premium lodges or tented camps.",
    highlights: ["Great Migration routes", "Big Five game drives", "Maasai cultural experiences"],
    imageTone: "from-amber-500 via-orange-600 to-stone-950",
  },
  {
    name: "Zanzibar Beach Escapes",
    region: "Stone Town, Nungwi, Kendwa, Paje, Mnemba",
    summary:
      "Oceanfront relaxation after safari, spice tours, dhow cruises, diving, honeymoon stays, and family-friendly resorts.",
    highlights: ["Safari and beach combos", "Spice Island experiences", "Honeymoon upgrades"],
    imageTone: "from-cyan-400 via-teal-600 to-slate-950",
  },
  {
    name: "Botswana Wilderness",
    region: "Okavango Delta, Chobe, Moremi, Makgadikgadi",
    summary:
      "Low-density luxury wilderness with mokoro canoe safaris, elephant-rich river cruises, and remote fly-in camps.",
    highlights: ["Okavango Delta camps", "Chobe elephants", "Fly-in luxury safaris"],
    imageTone: "from-emerald-500 via-lime-700 to-zinc-950",
  },
  {
    name: "East Africa Extensions",
    region: "Kenya, Rwanda, Uganda, Victoria Falls routes",
    summary:
      "Cross-border itineraries for guests who want gorilla trekking, Masai Mara wildlife, primate tracking, or Victoria Falls add-ons.",
    highlights: ["Kenya and Tanzania circuits", "Gorilla trekking add-ons", "Victoria Falls extensions"],
    imageTone: "from-violet-500 via-fuchsia-700 to-slate-950",
  },
];

export const packages = [
  {
    title: "Serengeti Migration Signature",
    duration: "8 days",
    price: "From USD 3,450 pp",
    idealFor: "Wildlife photographers, couples, first-time safari guests",
    route: "Arusha - Tarangire - Ngorongoro - Serengeti - Arusha",
    conversionNote: "Best booked early for peak migration camps.",
    inclusions: ["Private 4x4 safari vehicle", "Professional guide", "Park fees", "Full-board lodges"],
  },
  {
    title: "Tanzania Safari and Zanzibar Honeymoon",
    duration: "10 days",
    price: "From USD 4,250 pp",
    idealFor: "Honeymooners and anniversary trips",
    route: "Arusha - Ngorongoro - Serengeti - Zanzibar",
    conversionNote: "Includes room decoration and beach upgrade options.",
    inclusions: ["Safari lodge stays", "Zanzibar resort", "Domestic flights", "Private transfers"],
  },
  {
    title: "Family Friendly Tanzania Adventure",
    duration: "7 days",
    price: "From USD 2,750 pp",
    idealFor: "Families from USA, Europe, Australia, and New Zealand",
    route: "Arusha - Lake Manyara - Ngorongoro - Tarangire",
    conversionNote: "Kid-friendly pacing and flexible meal planning.",
    inclusions: ["Family rooms", "Shorter game drives", "Guide briefings", "Emergency support"],
  },
  {
    title: "Botswana Delta and Chobe Luxury",
    duration: "9 days",
    price: "From USD 6,900 pp",
    idealFor: "Luxury travelers and repeat safari guests",
    route: "Maun - Okavango Delta - Moremi - Chobe - Kasane",
    conversionNote: "Limited lodge availability makes early inquiry important.",
    inclusions: ["Fly-in logistics", "Mokoro safari", "Boat safaris", "Premium wilderness camps"],
  },
  {
    title: "China Friendly East Africa Private Tour",
    duration: "11 days",
    price: "Custom quote",
    idealFor: "Private groups, families, and incentive travel from China",
    route: "Kilimanjaro - Serengeti - Ngorongoro - Zanzibar",
    conversionNote: "Chinese-speaking guide support can be arranged on request.",
    inclusions: ["Private itinerary", "Dietary planning", "Airport VIP assistance", "Shopping and culture stops"],
  },
  {
    title: "Korea to Zanzibar and Serengeti Escape",
    duration: "9 days",
    price: "Custom quote",
    idealFor: "South Korean honeymooners, friends, and small groups",
    route: "Dar es Salaam or Kilimanjaro - Serengeti - Zanzibar",
    conversionNote: "Designed for efficient long-haul flight connections.",
    inclusions: ["Boutique lodges", "Beach resort choices", "Photo stops", "Private transfers"],
  },
];

export const whyLeviva = [
  {
    title: "Fast expert planning",
    body: "Every inquiry is matched with a consultant who understands safari seasons, beach combinations, visas, and long-haul flight timing.",
    icon: CalendarCheck,
  },
  {
    title: "High-trust local operations",
    body: "Tanzania-based coordination gives guests reliable ground support, vetted guides, and responsive help from arrival to departure.",
    icon: ShieldCheck,
  },
  {
    title: "Built for global travelers",
    body: "Trip design considers China, USA, Europe, South Korea, Australia, and New Zealand traveler expectations, payment planning, and pacing.",
    icon: Globe2,
  },
  {
    title: "Conversion-first booking flow",
    body: "Clear packages, visible contact options, WhatsApp booking, and a short inquiry form reduce friction for ready-to-book guests.",
    icon: HeartHandshake,
  },
];

export const sellingPoints = [
  { label: "Private safari planning", icon: Binoculars },
  { label: "Safari and beach combinations", icon: Plane },
  { label: "Photo-ready itineraries", icon: Camera },
  { label: "Groups, families, and honeymooners", icon: Users },
  { label: "Tailor-made East Africa routes", icon: Map },
  { label: "Fast WhatsApp follow-up", icon: MessageCircle },
];

export const testimonials = [
  {
    quote:
      "The Serengeti and Zanzibar plan felt effortless. Leviva understood exactly what our family needed after a long flight from the USA.",
    guest: "Alicia M.",
    market: "United States",
  },
  {
    quote:
      "We wanted a private safari with luxury lodges and strong photo opportunities. The itinerary was thoughtful and very responsive.",
    guest: "Min-jun K.",
    market: "South Korea",
  },
  {
    quote:
      "Botswana and Tanzania were combined beautifully. Clear communication before booking gave us confidence.",
    guest: "Sophie R.",
    market: "Europe",
  },
];

export const trustStats = [
  { value: "24h", label: "target response time" },
  { value: "6+", label: "priority source markets" },
  { value: "4", label: "core destination regions" },
  { value: "100%", label: "tailor-made itineraries" },
];

export const processSteps = [
  {
    title: "Tell us your dream trip",
    body: "Share dates, budget, traveler count, preferred comfort level, and must-see experiences.",
  },
  {
    title: "Receive a tailored proposal",
    body: "Leviva recommends routes, lodges, transfers, and add-ons matched to your travel style.",
  },
  {
    title: "Confirm and travel confidently",
    body: "Your consultant coordinates final logistics and keeps support available throughout the journey.",
  },
];

export const starIcon = Star;
export const sparkleIcon = Sparkles;

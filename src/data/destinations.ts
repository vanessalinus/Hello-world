import { Destination } from "@/types";

export const destinations: Destination[] = [
  {
    id: "1",
    slug: "serengeti",
    name: "Serengeti National Park",
    country: "Tanzania",
    description:
      "The Serengeti is one of the world's most iconic safari destinations, covering 14,750 sq km of endless plains. Famous for the Great Wildebeest Migration – the largest movement of land mammals on Earth – the Serengeti also hosts the Big Five and a staggering diversity of wildlife year-round. The name 'Serengeti' derives from the Maasai word 'Siringet', meaning 'endless plains'.",
    coverImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=80",
      "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=1200&q=80",
    ],
    highlights: [
      "Great Wildebeest Migration (July-October)",
      "Big Five – lion, leopard, elephant, buffalo, rhino",
      "Hot air balloon safaris",
      "Maasai culture",
      "Over 500 bird species",
    ],
    bestTime: "June to October (dry season)",
    climate: "Tropical with distinct wet and dry seasons",
    featured: true,
  },
  {
    id: "2",
    slug: "zanzibar",
    name: "Zanzibar",
    country: "Tanzania",
    description:
      "Zanzibar is a semi-autonomous archipelago off Tanzania's coast, often called the 'Spice Island' or 'Blue Island'. Stone Town, a UNESCO World Heritage Site, reflects a rich history of Arab, Persian, Indian, and European influences. The island's white sand beaches, turquoise waters, and vibrant coral reefs make it one of the Indian Ocean's finest destinations.",
    coverImage: "https://images.unsplash.com/photo-1586335963805-4ae6c0f14f43?w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
    ],
    highlights: [
      "Stone Town UNESCO World Heritage Site",
      "Pristine white sand beaches",
      "Mnemba Atoll snorkeling and diving",
      "Spice farms – cloves, vanilla, cinnamon",
      "Sunset dhow cruises",
      "Dolphin watching at Kizimkazi",
    ],
    bestTime: "June to October, December to February",
    climate: "Tropical and warm year-round (24-30°C)",
    featured: true,
  },
  {
    id: "3",
    slug: "ngorongoro",
    name: "Ngorongoro Crater",
    country: "Tanzania",
    description:
      "The Ngorongoro Crater is the world's largest intact volcanic caldera and a UNESCO World Heritage Site. Formed some 2.5 million years ago when a giant volcano erupted and collapsed, the 260 sq km crater floor is home to over 25,000 animals – including the world's highest density of predators. It's one of the best places in Africa to see all the Big Five.",
    coverImage: "https://images.unsplash.com/photo-1551021794-03be4ec0a028?w=1200&q=80",
    images: [],
    highlights: [
      "World's largest intact volcanic caldera",
      "25,000+ animals on the crater floor",
      "Highest predator density in Africa",
      "Black rhino viewing",
      "Lake Magadi flamingos",
    ],
    bestTime: "Year-round (coolest June-July)",
    climate: "Cool and misty at rim, warm on crater floor",
    featured: true,
  },
  {
    id: "4",
    slug: "okavango-delta",
    name: "Okavango Delta",
    country: "Botswana",
    description:
      "The Okavango Delta is the world's largest inland delta, a UNESCO World Heritage Site that floods seasonally to create an extraordinary network of channels, lagoons, and islands. This pristine wilderness supports an exceptional diversity of wildlife and offers some of Africa's most exclusive safari experiences via traditional mokoro dugout canoe.",
    coverImage: "https://images.unsplash.com/photo-1551887373-6edba6dacbb1?w=1200&q=80",
    images: [],
    highlights: [
      "Mokoro (dugout canoe) safaris",
      "Walking safaris on Delta islands",
      "Exceptional bird diversity",
      "Exclusive luxury camps",
      "World Heritage Site status",
    ],
    bestTime: "July to October (highest water)",
    climate: "Semi-arid with seasonal flooding",
    featured: true,
  },
  {
    id: "5",
    slug: "kilimanjaro",
    name: "Mount Kilimanjaro",
    country: "Tanzania",
    description:
      "Mount Kilimanjaro is Africa's highest peak at 5,895m (19,341ft) and the world's tallest free-standing mountain. The volcanic massif rises dramatically from the surrounding plains and is topped by permanent glaciers. Kilimanjaro is one of the 'Seven Summits' and can be climbed without technical equipment, making it accessible to determined trekkers.",
    coverImage: "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=1200&q=80",
    images: [],
    highlights: [
      "Africa's highest peak – 5,895m",
      "World's tallest free-standing mountain",
      "Five distinct climate zones",
      "Multiple climbing routes",
      "Glaciers near the summit",
    ],
    bestTime: "January-March, June-October",
    climate: "Varies dramatically by altitude",
    featured: true,
  },
  {
    id: "6",
    slug: "chobe",
    name: "Chobe National Park",
    country: "Botswana",
    description:
      "Chobe National Park in northern Botswana is famous for having Africa's highest concentration of elephants, with over 120,000 roaming the park. The Chobe River offers spectacular boat safaris where hippos, crocodiles, and elephants are frequently seen drinking and swimming. The park also hosts large herds of cape buffalo and abundant predators.",
    coverImage: "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=1200&q=80",
    images: [],
    highlights: [
      "Highest elephant concentration in Africa",
      "Spectacular boat safaris on Chobe River",
      "Cape buffalo herds",
      "Hippos and Nile crocodiles",
      "Proximity to Victoria Falls",
    ],
    bestTime: "May to October (dry season)",
    climate: "Hot and dry in peak season",
    featured: false,
  },
];

export const getFeaturedDestinations = (): Destination[] =>
  destinations.filter((d) => d.featured);
export const getDestinationBySlug = (slug: string): Destination | undefined =>
  destinations.find((d) => d.slug === slug);

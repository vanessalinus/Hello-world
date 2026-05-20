import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedTour = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  durationDays: number;
  priceUsd: number;
  heroImage: string;
  gallery: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: number; title: string; details: string }[];
  difficulty: string;
  category: string;
  featured: boolean;
  ratingAvg: number;
  reviewsCount: number;
};

type SeedDestination = {
  slug: string;
  name: string;
  country: string;
  tagline: string;
  description: string;
  heroImage: string;
  highlights: string[];
  tours: SeedTour[];
};

const destinations: SeedDestination[] = [
  {
    slug: "tanzania",
    name: "Tanzania",
    country: "Tanzania",
    tagline: "The cradle of safari — Serengeti, Ngorongoro & Kilimanjaro.",
    description:
      "Home to the Great Migration, snow-capped Kilimanjaro and the volcanic Ngorongoro Crater, Tanzania is the ultimate East African safari destination.",
    heroImage:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1920&q=80",
    highlights: [
      "Great Wildebeest Migration",
      "Ngorongoro Crater Big Five",
      "Mount Kilimanjaro treks",
      "Maasai cultural visits",
      "Tarangire elephant herds"
    ],
    tours: [
      {
        slug: "serengeti-migration-classic",
        title: "Serengeti Great Migration Classic Safari",
        summary:
          "7-day luxury safari tracking the wildebeest migration across the Serengeti, with Ngorongoro Crater and Tarangire.",
        description:
          "Experience the spectacle of 1.5 million wildebeest on the move. Stay in premium tented camps positioned along the migration route with expert driver-guides, dawn game drives and optional hot-air balloon flights.",
        durationDays: 7,
        priceUsd: 3490,
        heroImage:
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1549366021-9f761d040a94?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80"
        ],
        inclusions: [
          "All park fees & government taxes",
          "4x4 pop-up roof safari vehicle",
          "Professional English/Mandarin-speaking guide on request",
          "Full board accommodation in luxury tented camps",
          "Airport transfers in Arusha / Kilimanjaro"
        ],
        exclusions: [
          "International flights",
          "Tanzania visa (USD 50–100)",
          "Travel insurance",
          "Tips & personal extras"
        ],
        itinerary: [
          { day: 1, title: "Arrival in Arusha", details: "Meet & greet at Kilimanjaro International Airport, transfer to boutique lodge." },
          { day: 2, title: "Tarangire National Park", details: "Game drive among giant baobabs and elephant herds." },
          { day: 3, title: "Central Serengeti", details: "Cross the Rift Valley into the endless plains of the Serengeti." },
          { day: 4, title: "Migration Tracking", details: "Full-day game drive following the herds; optional balloon safari." },
          { day: 5, title: "Northern Serengeti", details: "Mara River crossings (Jul–Oct) and big-cat sightings." },
          { day: 6, title: "Ngorongoro Crater", details: "Descend into the crater for guaranteed Big Five viewing." },
          { day: 7, title: "Departure", details: "Transfer to airport for international departure." }
        ],
        difficulty: "Easy",
        category: "Safari",
        featured: true,
        ratingAvg: 4.9,
        reviewsCount: 218
      },
      {
        slug: "kilimanjaro-machame-route",
        title: "Kilimanjaro Trek – Machame Route",
        summary:
          "7-day trek to Africa's highest summit (5,895m) on the scenic Whiskey Route with expert mountain crew.",
        description:
          "Summit Uhuru Peak with KPAP-certified porters, full-board mountain catering and acclimatisation built into every day.",
        durationDays: 7,
        priceUsd: 2390,
        heroImage:
          "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=1600&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1589308078058-3cfe9a23e1e9?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1518131672697-613becd4fab5?auto=format&fit=crop&w=1200&q=80"
        ],
        inclusions: [
          "All park & rescue fees",
          "Certified guides + porters (KPAP partner)",
          "Mountain tents & sleeping mats",
          "Full board on the mountain",
          "Pulse oximeter health checks"
        ],
        exclusions: ["Flights", "Visa", "Personal climbing gear", "Tips"],
        itinerary: [
          { day: 1, title: "Machame Gate → Machame Camp", details: "Rainforest trek, 11 km, 5–7 hrs." },
          { day: 2, title: "Machame → Shira Camp", details: "Moorland zone, 5 km, 4–6 hrs." },
          { day: 3, title: "Shira → Lava Tower → Barranco", details: "Acclimatisation day to 4,630m." },
          { day: 4, title: "Barranco → Karanga", details: "Barranco Wall scramble." },
          { day: 5, title: "Karanga → Barafu Base Camp", details: "Rest before midnight push." },
          { day: 6, title: "Summit Day", details: "Uhuru Peak 5,895m then descend to Mweka Camp." },
          { day: 7, title: "Mweka → Gate", details: "Final descent, certificates & transfer." }
        ],
        difficulty: "Challenging",
        category: "Trekking",
        featured: true,
        ratingAvg: 4.8,
        reviewsCount: 152
      }
    ]
  },
  {
    slug: "zanzibar",
    name: "Zanzibar",
    country: "Tanzania",
    tagline: "Spice Island beaches, dhow sunsets and Stone Town heritage.",
    description:
      "White-sand beaches, turquoise Indian Ocean waters and a UNESCO-listed Stone Town make Zanzibar the perfect safari add-on or honeymoon escape.",
    heroImage:
      "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=1920&q=80",
    highlights: [
      "Nungwi & Kendwa beaches",
      "Stone Town heritage tour",
      "Spice farm experience",
      "Mnemba Atoll snorkelling",
      "Sunset dhow cruises"
    ],
    tours: [
      {
        slug: "zanzibar-beach-honeymoon",
        title: "Zanzibar Beach & Honeymoon Escape",
        summary:
          "5-night all-inclusive beach stay with Stone Town tour, spice farm and sunset dhow cruise.",
        description:
          "Relax on Zanzibar's powder-white sands with daily breakfasts, romantic beach dinners and curated cultural excursions.",
        durationDays: 6,
        priceUsd: 1490,
        heroImage:
          "https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?auto=format&fit=crop&w=1600&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1572869869884-1d10bd9b8a7e?auto=format&fit=crop&w=1200&q=80"
        ],
        inclusions: [
          "5 nights beachfront resort",
          "Daily breakfast & 3 candle-lit dinners",
          "Stone Town & Spice Farm tour",
          "Sunset dhow cruise",
          "All transfers"
        ],
        exclusions: ["International flights", "Visa", "Travel insurance"],
        itinerary: [
          { day: 1, title: "Arrival Zanzibar", details: "Private transfer to beachfront resort, welcome cocktail." },
          { day: 2, title: "Stone Town & Spice Farm", details: "Guided heritage walk, spice tasting lunch." },
          { day: 3, title: "Beach Day", details: "Optional snorkelling at Mnemba Atoll." },
          { day: 4, title: "Sunset Dhow Cruise", details: "Traditional sailing with seafood platter." },
          { day: 5, title: "Leisure Day", details: "Spa, kite surfing or diving." },
          { day: 6, title: "Departure", details: "Transfer to ZNZ airport." }
        ],
        difficulty: "Easy",
        category: "Beach",
        featured: true,
        ratingAvg: 4.9,
        reviewsCount: 187
      }
    ]
  },
  {
    slug: "botswana",
    name: "Botswana",
    country: "Botswana",
    tagline: "Okavango Delta, Chobe elephants and Kalahari wilderness.",
    description:
      "Botswana offers exclusive, low-impact safaris through the world's largest inland delta and the elephant capital of Africa.",
    heroImage:
      "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=1920&q=80",
    highlights: [
      "Okavango Delta mokoro safaris",
      "Chobe River elephant herds",
      "Kalahari star beds",
      "Moremi Game Reserve",
      "Fly-in luxury camps"
    ],
    tours: [
      {
        slug: "okavango-chobe-fly-in",
        title: "Okavango Delta & Chobe Fly-In Safari",
        summary:
          "8-day premium fly-in safari combining Okavango water safaris with Chobe river cruises.",
        description:
          "Light aircraft transfers, traditional mokoro rides and luxurious tented suites overlooking elephant-packed waterholes.",
        durationDays: 8,
        priceUsd: 5890,
        heroImage:
          "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?auto=format&fit=crop&w=1600&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1516496636080-14fb876e029d?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=1200&q=80"
        ],
        inclusions: [
          "All inter-camp flights",
          "Luxury full board accommodation",
          "Twice daily game activities",
          "Park & conservation fees",
          "House drinks"
        ],
        exclusions: ["International flights to Maun", "Premium imported drinks", "Gratuities"],
        itinerary: [
          { day: 1, title: "Arrive Maun", details: "Charter flight to first delta camp." },
          { day: 2, title: "Okavango Mokoro Safari", details: "Traditional dugout canoe through reed channels." },
          { day: 3, title: "Moremi Game Reserve", details: "Big cat and wild dog tracking." },
          { day: 4, title: "Fly to Chobe", details: "Afternoon boat cruise on the Chobe River." },
          { day: 5, title: "Chobe National Park", details: "Land & water based game viewing." },
          { day: 6, title: "Linyanti Wildlife Reserve", details: "Predator-rich private concession." },
          { day: 7, title: "Kalahari Stars", details: "Sleep-out under desert skies." },
          { day: 8, title: "Departure", details: "Light aircraft to Maun for connection." }
        ],
        difficulty: "Easy",
        category: "Luxury Safari",
        featured: true,
        ratingAvg: 5.0,
        reviewsCount: 96
      }
    ]
  },
  {
    slug: "kenya",
    name: "Kenya",
    country: "Kenya",
    tagline: "Maasai Mara, Amboseli elephants beneath Kilimanjaro.",
    description:
      "Combine the legendary Maasai Mara with Amboseli's iconic Kilimanjaro backdrop on a quintessential Kenyan safari.",
    heroImage:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80",
    highlights: ["Maasai Mara Big Five", "Amboseli elephants", "Lake Nakuru flamingos", "Samburu culture"],
    tours: [
      {
        slug: "kenya-mara-amboseli",
        title: "Maasai Mara & Amboseli Discovery",
        summary: "6-day classic Kenya safari with Mara, Amboseli and a Maasai village visit.",
        description:
          "Drive through the Great Rift Valley to two of Kenya's most celebrated parks with experienced guides and quality lodges.",
        durationDays: 6,
        priceUsd: 2390,
        heroImage:
          "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1600&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1549366021-9f761d040a94?auto=format&fit=crop&w=1200&q=80"
        ],
        inclusions: ["Park fees", "Full board lodging", "4x4 with pop-up roof", "English guide"],
        exclusions: ["Flights", "Visa", "Tips"],
        itinerary: [
          { day: 1, title: "Nairobi → Amboseli", details: "Afternoon game drive." },
          { day: 2, title: "Amboseli", details: "Full day with Kilimanjaro views." },
          { day: 3, title: "Lake Naivasha", details: "Boat ride & Crescent Island walk." },
          { day: 4, title: "Maasai Mara", details: "Afternoon game drive." },
          { day: 5, title: "Mara", details: "Full day game viewing & village visit." },
          { day: 6, title: "Return Nairobi", details: "Drive back & transfer." }
        ],
        difficulty: "Easy",
        category: "Safari",
        featured: false,
        ratingAvg: 4.8,
        reviewsCount: 134
      }
    ]
  },
  {
    slug: "rwanda",
    name: "Rwanda",
    country: "Rwanda",
    tagline: "Gorilla trekking in the Volcanoes National Park.",
    description:
      "Track endangered mountain gorillas through bamboo forests and experience Rwanda's renaissance of culture and conservation.",
    heroImage:
      "https://images.unsplash.com/photo-1581281863883-2469417a1668?auto=format&fit=crop&w=1920&q=80",
    highlights: ["Gorilla trekking", "Golden monkey tracking", "Lake Kivu", "Kigali heritage"],
    tours: [
      {
        slug: "rwanda-gorilla-trek",
        title: "Rwanda Gorilla Trekking Experience",
        summary: "4-day gorilla trekking adventure including Kigali tour and Lake Kivu relaxation.",
        description: "One face-to-face hour with a habituated gorilla family in the misty Virunga slopes.",
        durationDays: 4,
        priceUsd: 3290,
        heroImage:
          "https://images.unsplash.com/photo-1547721064-da6cfb341d50?auto=format&fit=crop&w=1600&q=80",
        gallery: [],
        inclusions: ["Gorilla permit (USD 1,500)", "All transfers", "Full board lodging", "Park ranger fees"],
        exclusions: ["Flights", "Visa", "Tips"],
        itinerary: [
          { day: 1, title: "Kigali Arrival", details: "City tour + genocide memorial." },
          { day: 2, title: "Volcanoes NP", details: "Transfer to lodge, briefing." },
          { day: 3, title: "Gorilla Trek", details: "Full-day trek with rangers." },
          { day: 4, title: "Departure", details: "Return to Kigali airport." }
        ],
        difficulty: "Moderate",
        category: "Wildlife",
        featured: false,
        ratingAvg: 4.9,
        reviewsCount: 71
      }
    ]
  },
  {
    slug: "uganda",
    name: "Uganda",
    country: "Uganda",
    tagline: "The Pearl of Africa — chimpanzees, gorillas and the Nile.",
    description:
      "Uganda packs gorillas, chimps, tree-climbing lions and the source of the Nile into one extraordinary itinerary.",
    heroImage:
      "https://images.unsplash.com/photo-1601233220312-0ad7e208a8e8?auto=format&fit=crop&w=1920&q=80",
    highlights: ["Bwindi gorillas", "Kibale chimpanzees", "Queen Elizabeth NP", "Murchison Falls"],
    tours: [
      {
        slug: "uganda-primates-safari",
        title: "Uganda Primates & Wildlife Safari",
        summary: "8-day primate-focused itinerary across Uganda's iconic parks.",
        description: "Gorilla & chimpanzee trekking combined with savannah game drives and Nile boat trips.",
        durationDays: 8,
        priceUsd: 3890,
        heroImage:
          "https://images.unsplash.com/photo-1547721064-da6cfb341d50?auto=format&fit=crop&w=1600&q=80",
        gallery: [],
        inclusions: ["Gorilla & chimp permits", "Full board", "Driver-guide", "Park fees"],
        exclusions: ["Flights", "Visa", "Tips"],
        itinerary: [
          { day: 1, title: "Entebbe Arrival", details: "Overnight at lakeside hotel." },
          { day: 2, title: "Kibale Forest", details: "Transfer & briefing." },
          { day: 3, title: "Chimp Trekking", details: "Morning trek + crater lakes." },
          { day: 4, title: "Queen Elizabeth NP", details: "Kazinga Channel boat cruise." },
          { day: 5, title: "Ishasha", details: "Tree-climbing lion search." },
          { day: 6, title: "Bwindi", details: "Transfer to gorilla lodge." },
          { day: 7, title: "Gorilla Trek", details: "Unforgettable hour with gorillas." },
          { day: 8, title: "Return Kampala", details: "Fly to Entebbe." }
        ],
        difficulty: "Moderate",
        category: "Wildlife",
        featured: false,
        ratingAvg: 4.8,
        reviewsCount: 58
      }
    ]
  }
];

const reviews = [
  { author: "Jennifer M.", country: "United States", rating: 5, comment: "Leviva orchestrated the safari of a lifetime. Our guide Hassan spotted a leopard within the first hour!", tourSlug: "serengeti-migration-classic" },
  { author: "Liu Wei", country: "China", rating: 5, comment: "完美的旅行体验！导游会说中文，行程非常专业。", tourSlug: "serengeti-migration-classic" },
  { author: "Hans & Petra", country: "Germany", rating: 5, comment: "Flawless logistics from Kilimanjaro Airport to Zanzibar beach. Highly recommended.", tourSlug: "zanzibar-beach-honeymoon" },
  { author: "Sophie L.", country: "France", rating: 5, comment: "Le voyage de nos rêves. Botswana est magique avec Leviva.", tourSlug: "okavango-chobe-fly-in" },
  { author: "Min-jun K.", country: "South Korea", rating: 5, comment: "킬리만자로 등반 완벽한 가이드! 정상 도전 성공했습니다.", tourSlug: "kilimanjaro-machame-route" },
  { author: "Emily R.", country: "Australia", rating: 5, comment: "Worth every dollar. Camps were stunning and the wildlife encounters unreal.", tourSlug: "okavango-chobe-fly-in" },
  { author: "Tom & Sarah", country: "New Zealand", rating: 5, comment: "From booking to departure, Leviva were responsive, transparent and warm.", tourSlug: "zanzibar-beach-honeymoon" }
];

async function main() {
  console.log("Seeding Leviva Travel database...");

  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.tour.deleteMany();
  await prisma.destination.deleteMany();

  for (const dest of destinations) {
    const created = await prisma.destination.create({
      data: {
        slug: dest.slug,
        name: dest.name,
        country: dest.country,
        tagline: dest.tagline,
        description: dest.description,
        heroImage: dest.heroImage,
        highlights: JSON.stringify(dest.highlights)
      }
    });

    for (const tour of dest.tours) {
      await prisma.tour.create({
        data: {
          slug: tour.slug,
          title: tour.title,
          summary: tour.summary,
          description: tour.description,
          durationDays: tour.durationDays,
          priceUsd: tour.priceUsd,
          heroImage: tour.heroImage,
          gallery: JSON.stringify(tour.gallery),
          inclusions: JSON.stringify(tour.inclusions),
          exclusions: JSON.stringify(tour.exclusions),
          itinerary: JSON.stringify(tour.itinerary),
          difficulty: tour.difficulty,
          category: tour.category,
          featured: tour.featured,
          ratingAvg: tour.ratingAvg,
          reviewsCount: tour.reviewsCount,
          destinationId: created.id
        }
      });
    }
  }

  for (const review of reviews) {
    await prisma.review.create({ data: review });
  }

  console.log("Done seeding.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

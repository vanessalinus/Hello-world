import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tours = [
  {
    slug: "serengeti-great-migration",
    title: "Serengeti Great Migration Safari",
    destination: "Tanzania",
    region: "Northern Circuit",
    durationDays: 7,
    priceFromUsd: 2890,
    description:
      "Witness the world's greatest wildlife spectacle on the Serengeti plains. Expert guides, luxury tented camps, and seamless logistics from Arusha.",
    highlights: JSON.stringify([
      "Big Five game drives",
      "Ngorongoro Crater descent",
      "Luxury bush camps",
      "Private 4x4 vehicle",
    ]),
    imageUrl:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80",
    featured: true,
    maxGroupSize: 8,
    difficulty: "easy",
  },
  {
    slug: "zanzibar-beach-safari-combo",
    title: "Zanzibar Beach & Safari Combo",
    destination: "Zanzibar",
    region: "Indian Ocean",
    durationDays: 10,
    priceFromUsd: 3290,
    description:
      "Combine Stone Town heritage, spice tours, and pristine white-sand beaches with an optional mainland safari extension.",
    highlights: JSON.stringify([
      "Stone Town UNESCO tour",
      "Mnemba snorkeling",
      "Beach resort stay",
      "Spice farm experience",
    ]),
    imageUrl:
      "https://images.unsplash.com/photo-1548013146-7249f5a7868f?w=1200&q=80",
    featured: true,
    maxGroupSize: 12,
    difficulty: "easy",
  },
  {
    slug: "kilimanjaro-machame-route",
    title: "Kilimanjaro Machame Route Trek",
    destination: "Tanzania",
    region: "Kilimanjaro",
    durationDays: 8,
    priceFromUsd: 2450,
    description:
      "Summit Africa's highest peak via the scenic Machame Route with certified guides, porters, and acclimatization built in.",
    highlights: JSON.stringify([
      "Certified mountain guides",
      "All park fees included",
      "Quality camping equipment",
      "Pre-trek briefing",
    ]),
    imageUrl:
      "https://images.unsplash.com/photo-1609198092458-38a293a7f9f2?w=1200&q=80",
    featured: true,
    maxGroupSize: 10,
    difficulty: "challenging",
  },
  {
    slug: "okavango-delta-luxury",
    title: "Okavango Delta Luxury Safari",
    destination: "Botswana",
    region: "Okavango",
    durationDays: 6,
    priceFromUsd: 4590,
    description:
      "Mokoro canoe excursions, walking safaris, and exclusive camps in Botswana's pristine wetland wilderness.",
    highlights: JSON.stringify([
      "Mokoro delta excursions",
      "Walking safaris",
      "Fly-in camp access",
      "Expert naturalists",
    ]),
    imageUrl:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=80",
    featured: true,
    maxGroupSize: 6,
    difficulty: "moderate",
  },
  {
    slug: "maasai-mara-kenya-safari",
    title: "Maasai Mara Kenya Safari",
    destination: "Kenya",
    region: "East Africa",
    durationDays: 5,
    priceFromUsd: 2190,
    description:
      "Cross-border excellence: iconic Mara river crossings, Maasai village visits, and boutique lodge accommodation.",
    highlights: JSON.stringify([
      "River crossing season",
      "Maasai cultural visit",
      "Hot air balloon option",
      "Boutique lodges",
    ]),
    imageUrl:
      "https://images.unsplash.com/photo-1523805009345-744b1f0f2f1f?w=1200&q=80",
    featured: false,
    maxGroupSize: 10,
    difficulty: "easy",
  },
  {
    slug: "gorilla-trekking-uganda",
    title: "Uganda Gorilla Trekking Expedition",
    destination: "Uganda",
    region: "East Africa",
    durationDays: 4,
    priceFromUsd: 2750,
    description:
      "Once-in-a-lifetime mountain gorilla encounters in Bwindi Impenetrable Forest with permits and expert trackers arranged.",
    highlights: JSON.stringify([
      "Gorilla permits secured",
      "Bwindi forest trek",
      "Community lodge stays",
      "Birding opportunities",
    ]),
    imageUrl:
      "https://images.unsplash.com/photo-1551632811-97410a6d0b66?w=1200&q=80",
    featured: false,
    maxGroupSize: 6,
    difficulty: "moderate",
  },
  {
    slug: "rwanda-golden-monkeys",
    title: "Rwanda Primates & Volcanoes",
    destination: "Rwanda",
    region: "East Africa",
    durationDays: 5,
    priceFromUsd: 2980,
    description:
      "Gorilla and golden monkey trekking in Volcanoes National Park plus Kigali genocide memorial and city culture.",
    highlights: JSON.stringify([
      "Volcanoes NP trekking",
      "Kigali city tour",
      "Eco-lodge accommodation",
      "Conservation briefing",
    ]),
    imageUrl:
      "https://images.unsplash.com/photo-1535083787815-9ae6d282b1d4?w=1200&q=80",
    featured: false,
    maxGroupSize: 8,
    difficulty: "moderate",
  },
  {
    slug: "tarangire-manyara-family",
    title: "Tarangire & Manyara Family Safari",
    destination: "Tanzania",
    region: "Northern Circuit",
    durationDays: 4,
    priceFromUsd: 1650,
    description:
      "Perfect for families: elephant herds of Tarangire, tree-climbing lions of Manyara, and child-friendly guides.",
    highlights: JSON.stringify([
      "Family-friendly guides",
      "Elephant super herds",
      "Lake Manyara flamingos",
      "Flexible pacing",
    ]),
    imageUrl:
      "https://images.unsplash.com/photo-1504177847864-41bdac7d2c5e?w=1200&q=80",
    featured: false,
    maxGroupSize: 14,
    difficulty: "easy",
  },
];

async function main() {
  await prisma.booking.deleteMany();
  await prisma.tour.deleteMany();

  for (const tour of tours) {
    await prisma.tour.create({ data: tour });
  }

  console.log(`Seeded ${tours.length} tours`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

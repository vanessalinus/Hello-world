export const company = {
  name: "Leviva Travel & Tours",
  legalName: "Leviva Investments Co. Ltd.",
  email: "info@levivainvestments.co.tz",
  phone: "+255758996047",
  phoneHref: "tel:+255758996047",
  whatsappHref: "https://wa.me/255758996047",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.levivainvestments.co.tz",
  headquarters: "Dar es Salaam, Tanzania",
};

export type Destination = {
  slug: string;
  name: string;
  country: string;
  region: string;
  summary: string;
  idealDuration: string;
  seasonalWindow: string;
  priceFrom: string;
  heroGradient: string;
  bestFor: string[];
  highlights: string[];
  experiences: string[];
  samplePlan: string[];
  seoDescription: string;
};

export const destinations: Destination[] = [
  {
    slug: "zanzibar",
    name: "Zanzibar",
    country: "Tanzania",
    region: "Indian Ocean coast",
    summary:
      "A beach and culture escape with Stone Town heritage, spice farms, reef experiences, and premium resorts that fit honeymoons and post-safari recovery.",
    idealDuration: "4 to 6 nights",
    seasonalWindow: "June to October and December to February",
    priceFrom: "From USD 580 per person",
    heroGradient: "from-cyan-500 via-sky-500 to-indigo-700",
    bestFor: ["Honeymoons", "Beach add-ons", "Wellness retreats"],
    highlights: [
      "Private transfers and fast-track island logistics",
      "Stone Town walking, dining, and heritage storytelling",
      "Dhow cruises, reef snorkeling, and beach clubs",
      "Flexible pairing with Tanzania safari circuits",
    ],
    experiences: [
      "Luxury beach hideaways in Nungwi, Paje, and Matemwe",
      "Spice farm and culture tours for families and first-time visitors",
      "Sunset dhow charters and couples dining experiences",
    ],
    samplePlan: [
      "Arrival meet-and-greet with private resort transfer",
      "Stone Town history, spice trail, and rooftop dinner",
      "Full-day reef or sandbank experience with premium picnic",
      "Free beach day, spa, or kitesurfing option",
    ],
    seoDescription:
      "Book Zanzibar holidays with Leviva Travel & Tours for beach escapes, honeymoon packages, Stone Town experiences, and safari-to-sea itineraries.",
  },
  {
    slug: "serengeti-ngorongoro",
    name: "Serengeti and Ngorongoro",
    country: "Tanzania",
    region: "Northern safari circuit",
    summary:
      "The flagship Tanzania safari route for wildlife density, the Great Migration, and high-end lodge experiences that convert first-time dream trips into confirmed bookings.",
    idealDuration: "5 to 8 nights",
    seasonalWindow: "Year-round, with migration peaks varying by month",
    priceFrom: "From USD 1,950 per person",
    heroGradient: "from-amber-500 via-orange-500 to-rose-700",
    bestFor: ["First safari", "Luxury couples", "Family milestones"],
    highlights: [
      "Big Five game drives and migration positioning strategy",
      "Handpicked camps and lodges across budget tiers",
      "Crater floor safari with expert private guiding",
      "Quick fly-in or drive-in combinations from Arusha",
    ],
    experiences: [
      "Hot air balloon upgrades and champagne bush breakfasts",
      "Photographic safari planning around seasonal movement",
      "Family-friendly pacing with child-focused guides",
    ],
    samplePlan: [
      "Arrival in Arusha with safari briefing and lodge night",
      "Tarangire or Manyara transition game drive",
      "Two or more Serengeti nights for wildlife density",
      "Ngorongoro crater safari and departure or Zanzibar extension",
    ],
    seoDescription:
      "Plan a Serengeti and Ngorongoro safari with Leviva for migration viewing, private guides, premium lodges, and seamless Tanzania safari logistics.",
  },
  {
    slug: "tarangire-manyara",
    name: "Tarangire and Lake Manyara",
    country: "Tanzania",
    region: "Northern Tanzania",
    summary:
      "A short-stay safari option with elephant herds, baobab landscapes, and easy access from Arusha for corporate groups, families, and quick East Africa breaks.",
    idealDuration: "2 to 4 nights",
    seasonalWindow: "June to October for dry-season density",
    priceFrom: "From USD 820 per person",
    heroGradient: "from-emerald-500 via-lime-500 to-yellow-600",
    bestFor: ["Short safaris", "Families", "Conference extensions"],
    highlights: [
      "Excellent value for quick Tanzania safari itineraries",
      "High elephant sightings and scenic baobab backdrops",
      "Easy combination with Zanzibar or Serengeti circuits",
      "Flexible lodge choices from stylish to budget-friendly",
    ],
    experiences: [
      "Birding and photography itineraries around seasonal lakes",
      "Family pacing with shorter drive times and relaxed check-ins",
      "Private sundowners and bush lunches",
    ],
    samplePlan: [
      "Arusha arrival with next-day Tarangire game drive",
      "Lake Manyara scenic circuit and village add-on",
      "Optional Ngorongoro upgrade before departure",
    ],
    seoDescription:
      "Discover Tarangire and Lake Manyara safari packages with Leviva for short Tanzania wildlife breaks, family trips, and Zanzibar combinations.",
  },
  {
    slug: "kilimanjaro-and-materuni",
    name: "Kilimanjaro and Materuni",
    country: "Tanzania",
    region: "Kilimanjaro region",
    summary:
      "A soft-adventure route that combines mountain scenery, coffee culture, waterfalls, and acclimatization-friendly extensions for active travelers.",
    idealDuration: "3 to 7 nights",
    seasonalWindow: "January to March and June to October",
    priceFrom: "From USD 690 per person",
    heroGradient: "from-slate-500 via-blue-600 to-sky-700",
    bestFor: ["Adventure travelers", "Corporate groups", "Active couples"],
    highlights: [
      "Mountain-focused planning with comfort-first logistics",
      "Day hikes, coffee tours, and community experiences",
      "Can extend into summit attempts or safari circuits",
      "Strong fit for South Korean and European active travelers",
    ],
    experiences: [
      "Machame and Marangu route planning support",
      "Materuni waterfall and Chagga cultural experience",
      "Recovery stays in Moshi or Arusha before onward travel",
    ],
    samplePlan: [
      "Airport transfer to Moshi with briefing",
      "Materuni hike, coffee experience, and waterfall picnic",
      "Kilimanjaro day hike or national park add-on",
      "Safari or Zanzibar extension",
    ],
    seoDescription:
      "Explore Kilimanjaro and Materuni tours with Leviva for active East Africa travel, coffee experiences, waterfalls, and custom mountain extensions.",
  },
  {
    slug: "nyerere-ruaha",
    name: "Nyerere and Ruaha",
    country: "Tanzania",
    region: "Southern Tanzania",
    summary:
      "A more exclusive, lower-traffic safari pairing for travelers who want strong wildlife, river activities, and premium privacy away from the busiest northern parks.",
    idealDuration: "5 to 7 nights",
    seasonalWindow: "June to October",
    priceFrom: "From USD 2,150 per person",
    heroGradient: "from-teal-500 via-emerald-600 to-green-800",
    bestFor: ["Repeat safari guests", "Luxury privacy", "Photographers"],
    highlights: [
      "Boat safaris, walking safaris, and intimate camps",
      "Excellent for luxury guests seeking quieter routes",
      "Pairs well with Dar es Salaam and Zanzibar arrivals",
      "High guiding quality with stronger exclusivity",
    ],
    experiences: [
      "Fly-in safari planning with premium bush camps",
      "Walking safari upgrades led by specialist guides",
      "Quiet honeymoon and anniversary journeys",
    ],
    samplePlan: [
      "Dar es Salaam arrival and light aircraft connection",
      "Nyerere river safari and private game drives",
      "Ruaha bush stay for big-cat and landscape focus",
      "Beach recovery in Zanzibar or direct international exit",
    ],
    seoDescription:
      "Book Nyerere and Ruaha luxury safaris with Leviva for private bush camps, boat safaris, and less-crowded Tanzania wildlife experiences.",
  },
  {
    slug: "okavango-chobe",
    name: "Okavango and Chobe",
    country: "Botswana",
    region: "Southern Africa extension",
    summary:
      "A premium Botswana add-on for travelers seeking fly-in luxury camps, exceptional guiding, and a multi-country safari built around exclusivity.",
    idealDuration: "4 to 7 nights",
    seasonalWindow: "May to October",
    priceFrom: "From USD 3,250 per person",
    heroGradient: "from-violet-500 via-fuchsia-500 to-rose-700",
    bestFor: ["Luxury safaris", "Repeat Africa travelers", "High-end fly-in trips"],
    highlights: [
      "Elite lodge partnerships and air transfer coordination",
      "Best fit for high-spend USA, Australia, and Europe markets",
      "Excellent add-on after Tanzania or Zanzibar",
      "Strong wildlife and polished service delivery",
    ],
    experiences: [
      "Mokoro channels, bush flights, and private viewing decks",
      "Chobe river cruises and elephant concentration zones",
      "Multi-country safari planning with seamless ticketing support",
    ],
    samplePlan: [
      "International or regional connection into Botswana",
      "Okavango camp stay with water and land activities",
      "Chobe extension with river safari and luxury lodge finish",
      "Exit via Kasane or connect back through East Africa",
    ],
    seoDescription:
      "Extend East Africa with Botswana safari packages through Leviva, including Okavango Delta fly-in camps, Chobe cruises, and luxury multi-country planning.",
  },
];

export const featuredItineraries = [
  {
    title: "Tanzania Bush and Zanzibar Beach",
    duration: "8 nights",
    priceFrom: "From USD 2,640 per person",
    idealFor: "Honeymoons and first-time East Africa trips",
    destinations: ["Serengeti", "Ngorongoro", "Zanzibar"],
    summary:
      "The highest-converting route for couples and milestone travelers who want iconic safari moments followed by ocean downtime.",
  },
  {
    title: "Family Safari Starter Circuit",
    duration: "5 nights",
    priceFrom: "From USD 1,480 per person",
    idealFor: "Families and school-holiday bookings",
    destinations: ["Tarangire", "Manyara", "Ngorongoro"],
    summary:
      "Balanced drive times, family-capable lodges, and enough wildlife density to keep children engaged without overloading the schedule.",
  },
  {
    title: "Botswana and Tanzania Grand Safari",
    duration: "10 nights",
    priceFrom: "From USD 5,950 per person",
    idealFor: "Luxury travelers from the USA, Europe, and Australia",
    destinations: ["Okavango", "Chobe", "Serengeti"],
    summary:
      "A premium two-country safari with fly-in convenience, high-end camps, and private-led wildlife experiences.",
  },
];

export const sourceMarkets = [
  {
    market: "China",
    headline: "Mandarin-friendly planning and premium pacing",
    description:
      "We can tailor meal planning, shopping stops, comfort-first logistics, and shorter transition times for Chinese leisure groups and high-value FIT travelers.",
  },
  {
    market: "USA",
    headline: "Bucket-list safaris with polished logistics",
    description:
      "American travelers typically convert best on milestone trips, luxury add-ons, and full-service itineraries with fast communication and clear upgrade paths.",
  },
  {
    market: "Europe",
    headline: "Flexible safari depth with strong cultural immersion",
    description:
      "European guests often want a balance of wildlife, authenticity, sustainability, and smart value across boutique and premium stays.",
  },
  {
    market: "South Korea",
    headline: "Adventure-ready itineraries with smooth execution",
    description:
      "Active trips, photogenic landscapes, and well-planned pacing for small groups work well for South Korean travelers exploring Kilimanjaro and safari combinations.",
  },
  {
    market: "Australia and New Zealand",
    headline: "Long-haul journeys that maximize every flight",
    description:
      "We build longer, richer itineraries with smart stopovers, luxury safari depth, and beach recovery that justify the distance from Oceania.",
  },
];

export const trustSignals = [
  {
    title: "Fast response sales flow",
    description:
      "Website leads are captured instantly with qualification data so Leviva can follow up quickly with a tailored itinerary.",
  },
  {
    title: "Built for multi-market conversion",
    description:
      "Copy, packages, and trip structures are tuned for China, USA, Europe, South Korea, and Australia-New Zealand source markets.",
  },
  {
    title: "Flexible trip design",
    description:
      "Safari, beach, mountain, and Botswana extensions can be combined without forcing travelers into one rigid package style.",
  },
];

export const salesProcess = [
  {
    step: "01",
    title: "Capture qualified intent",
    description:
      "The planner form collects source market, dates, budget, traveler count, and preferred destinations so each response feels specific from the first reply.",
  },
  {
    step: "02",
    title: "Recommend the right route",
    description:
      "Leviva can quickly propose a high-fit safari, beach, or multi-country itinerary using the lead details and preferred experience style.",
  },
  {
    step: "03",
    title: "Close with confidence",
    description:
      "Trust builders, transparent package framing, and clear contact options help move visitors from browsing to confirmed inquiry.",
  },
];

export const testimonials = [
  {
    name: "Emily and Jordan",
    market: "USA honeymoon travelers",
    quote:
      "Leviva turned our safari dream into a seamless trip. The Serengeti and Zanzibar combination felt premium from the first reply to the final airport transfer.",
  },
  {
    name: "Sofia M.",
    market: "Europe family holiday",
    quote:
      "The route pacing was ideal for our children, and the team adjusted the lodges and game drives exactly to what we needed.",
  },
  {
    name: "Min-Jun Park",
    market: "South Korea adventure guest",
    quote:
      "Communication was fast, professional, and very clear. The Kilimanjaro region extension and safari add-on worked perfectly together.",
  },
];

export const faqs = [
  {
    question: "Can Leviva combine safari and beach in one itinerary?",
    answer:
      "Yes. Tanzania safari and Zanzibar beach combinations are one of the strongest conversion paths on the site, and they can be tailored for couples, families, and premium guests.",
  },
  {
    question: "Do you arrange Botswana extensions?",
    answer:
      "Yes. Leviva can design Botswana add-ons such as Okavango and Chobe for travelers who want a premium multi-country Africa trip after East Africa.",
  },
  {
    question: "How quickly do you respond to booking inquiries?",
    answer:
      "The website is configured to capture qualified booking leads immediately so the team can follow up quickly with a customized proposal.",
  },
  {
    question: "Can you support travelers from China, the USA, Europe, South Korea, and Australia-New Zealand?",
    answer:
      "Yes. The site and trip planner are structured around those source markets, with itinerary framing and service options tuned for their travel preferences.",
  },
];

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Book a Trip", href: "/book" },
];

export function getDestination(slug: string) {
  return destinations.find((destination) => destination.slug === slug);
}

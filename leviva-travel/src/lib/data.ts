export interface Tour {
  id: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  highlights: string[];
  included: string[];
  itinerary: { day: string; title: string; description: string }[];
  rating: number;
  reviews: number;
  category: "safari" | "beach" | "cultural" | "adventure" | "luxury";
  featured: boolean;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  country: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  highlights: string[];
  bestTime: string;
  tours: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  flag: string;
  text: string;
  rating: number;
  tour: string;
  avatar: string;
}

export const destinations: Destination[] = [
  {
    id: "tanzania",
    name: "Tanzania",
    slug: "tanzania",
    country: "Tanzania",
    tagline: "Where the Wild Roams Free",
    description:
      "Experience the iconic Serengeti, witness the Great Migration, and summit Kilimanjaro — Africa's highest peak.",
    longDescription:
      "Tanzania is home to some of Africa's most iconic landscapes and wildlife experiences. From the endless plains of the Serengeti to the collapsed volcanic wonder of the Ngorongoro Crater, every moment is extraordinary. Watch millions of wildebeest thunder across the savannah during the Great Migration, spot the Big Five in their natural habitat, and experience the warm hospitality of the Maasai people. Whether you choose to summit Mount Kilimanjaro, explore the ancient rock art of Kondoa, or relax in luxury tented camps under starlit skies, Tanzania delivers an unforgettable African adventure.",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80",
    highlights: [
      "Serengeti National Park — Great Migration",
      "Ngorongoro Crater — World Heritage Site",
      "Mount Kilimanjaro — Africa's Highest Peak",
      "Tarangire National Park — Elephant Haven",
      "Lake Manyara — Flamingo Paradise",
      "Maasai Cultural Experiences",
    ],
    bestTime: "June to October (Dry Season), January to February (Calving Season)",
    tours: ["serengeti-migration", "kilimanjaro-trek", "northern-circuit"],
  },
  {
    id: "zanzibar",
    name: "Zanzibar",
    slug: "zanzibar",
    country: "Tanzania",
    tagline: "The Spice Island Paradise",
    description:
      "Pristine white-sand beaches, turquoise waters, historic Stone Town, and the intoxicating aroma of spices await you.",
    longDescription:
      "Zanzibar is a tropical archipelago off the coast of Tanzania that enchants every visitor. Wander through the UNESCO-listed Stone Town with its labyrinthine alleys, ornate carved doors, and vibrant bazaars. Relax on some of the world's most beautiful beaches with powdery white sand and crystal-clear turquoise waters. Dive into vibrant coral reefs, swim with dolphins off Mnemba Island, and explore the island's fascinating spice plantations. As the sun sets, enjoy fresh seafood at the legendary Forodhani Gardens night market. Zanzibar is the perfect blend of adventure, culture, and relaxation.",
    image:
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&q=80",
    highlights: [
      "Stone Town — UNESCO World Heritage Site",
      "Nungwi & Kendwa — Pristine Beaches",
      "Mnemba Island — Snorkeling Paradise",
      "Spice Tours — Clove, Vanilla & Cinnamon",
      "Jozani Forest — Red Colobus Monkeys",
      "Prison Island — Giant Tortoises",
    ],
    bestTime: "June to October & December to February",
    tours: ["zanzibar-beach", "stone-town-spice", "zanzibar-honeymoon"],
  },
  {
    id: "botswana",
    name: "Botswana",
    slug: "botswana",
    country: "Botswana",
    tagline: "Africa's Last Eden",
    description:
      "Explore the Okavango Delta, track wildlife in Chobe, and experience untouched wilderness in exclusive luxury.",
    longDescription:
      "Botswana represents the pinnacle of African safari luxury and conservation. The Okavango Delta, a UNESCO World Heritage Site, is the world's largest inland delta — a labyrinth of lagoons, channels, and islands teeming with wildlife. Glide through crystal-clear waters in a traditional mokoro canoe, spotting hippos, crocodiles, and elephants. In Chobe National Park, witness the largest concentration of elephants on the continent. The Makgadikgadi Salt Pans offer surreal landscapes and meerkat encounters. Botswana's low-volume, high-value tourism model ensures exclusive, uncrowded experiences in pristine wilderness.",
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=80",
    highlights: [
      "Okavango Delta — Mokoro Safaris",
      "Chobe National Park — Elephant Capital",
      "Makgadikgadi Pans — Salt Flat Adventures",
      "Central Kalahari — Desert Wilderness",
      "Moremi Game Reserve — Premier Wildlife",
      "Luxury Fly-In Safari Camps",
    ],
    bestTime: "May to October (Dry Season)",
    tours: ["okavango-delta", "chobe-luxury", "botswana-highlights"],
  },
  {
    id: "east-africa",
    name: "East Africa",
    slug: "east-africa",
    country: "Multiple Countries",
    tagline: "The Cradle of Safari",
    description:
      "Combine Kenya's Masai Mara, Uganda's mountain gorillas, and Rwanda's lush volcanoes in one epic journey.",
    longDescription:
      "East Africa is the birthplace of the safari experience, offering an extraordinary tapestry of wildlife, landscapes, and cultures. Track endangered mountain gorillas through the misty forests of Uganda and Rwanda. Witness the dramatic river crossings of the wildebeest migration in Kenya's Masai Mara. Explore the flamingo-fringed shores of Lake Nakuru, cruise the Nile through Murchison Falls, and discover the pristine beaches of the Swahili Coast. Multi-country itineraries let you experience the best of each nation, from the snow-capped Rwenzoris to the soda lakes of the Great Rift Valley.",
    image:
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=1200&q=80",
    highlights: [
      "Kenya — Masai Mara & Amboseli",
      "Uganda — Mountain Gorilla Trekking",
      "Rwanda — Volcanoes National Park",
      "Multi-Country Safari Circuits",
      "Great Rift Valley Lakes",
      "Cultural Immersion Experiences",
    ],
    bestTime: "Year-round (varies by country and activity)",
    tours: ["gorilla-trekking", "kenya-tanzania-combo", "east-africa-grand"],
  },
];

export const tours: Tour[] = [
  {
    id: "serengeti-migration",
    title: "Great Migration Safari",
    destination: "Tanzania",
    duration: "7 Days / 6 Nights",
    price: 3200,
    originalPrice: 3800,
    image:
      "https://images.unsplash.com/photo-1535338454528-1b5c8e9b30fa?w=800&q=80",
    description:
      "Witness one of nature's greatest spectacles — over two million wildebeest and zebra crossing the Serengeti plains in their annual migration.",
    highlights: [
      "Witness river crossings at the Mara River",
      "Big Five game drives in the Serengeti",
      "Ngorongoro Crater floor tour",
      "Luxury tented camp accommodation",
      "Expert Maasai naturalist guide",
      "Sundowner cocktails on the savannah",
    ],
    included: [
      "Airport transfers & domestic flights",
      "All park entrance fees",
      "Full-board luxury tented camps",
      "Private 4x4 safari vehicle with pop-up roof",
      "Professional English-speaking guide",
      "Complimentary binoculars for use during safari",
      "Flying Doctors emergency evacuation insurance",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Arusha",
        description:
          "Welcome at Kilimanjaro International Airport. Transfer to your luxury lodge with views of Mount Meru. Evening briefing and welcome dinner.",
      },
      {
        day: "Day 2",
        title: "Tarangire National Park",
        description:
          "Morning drive to Tarangire, famous for its ancient baobab trees and large elephant herds. Full day of game driving with picnic lunch.",
      },
      {
        day: "Day 3",
        title: "Ngorongoro Crater",
        description:
          "Descend into the world's largest intact volcanic caldera. Spot lion, rhino, flamingo, and hippo on the crater floor. Picnic lunch with crater views.",
      },
      {
        day: "Day 4-5",
        title: "Central Serengeti",
        description:
          "Two full days exploring the Seronera Valley, the heart of the Serengeti. Morning and afternoon game drives tracking the Big Five.",
      },
      {
        day: "Day 6",
        title: "Northern Serengeti & Mara River",
        description:
          "Fly to the northern Serengeti to witness the dramatic Mara River crossings. Watch thousands of wildebeest brave crocodile-infested waters.",
      },
      {
        day: "Day 7",
        title: "Departure",
        description:
          "Final morning game drive, then bush flight back to Arusha. Transfer to Kilimanjaro Airport for your departure flight.",
      },
    ],
    rating: 4.9,
    reviews: 247,
    category: "safari",
    featured: true,
  },
  {
    id: "kilimanjaro-trek",
    title: "Mount Kilimanjaro Expedition",
    destination: "Tanzania",
    duration: "8 Days / 7 Nights",
    price: 2800,
    originalPrice: 3300,
    image:
      "https://images.unsplash.com/photo-1621414050946-1b936a78571e?w=800&q=80",
    description:
      "Summit Africa's highest peak (5,895m) via the scenic Machame Route. An epic trek through five distinct climate zones.",
    highlights: [
      "Summit Uhuru Peak at sunrise",
      "Trek through rainforest, moorland & alpine desert",
      "Experienced mountain crew with high safety standards",
      "Acclimatization-focused itinerary",
      "Certificate of achievement",
      "Pre-climb medical check",
    ],
    included: [
      "Airport transfers",
      "All park & rescue fees",
      "Professional mountain guide & assistant guides",
      "Porters, cook & camp crew",
      "All meals on the mountain",
      "Quality camping equipment",
      "Oxygen & first aid kit",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Machame Gate to Machame Camp",
        description:
          "Drive to Machame Gate (1,800m). Trek through lush montane rainforest to Machame Camp (3,000m). 5-6 hours hiking.",
      },
      {
        day: "Day 2",
        title: "Shira Camp",
        description:
          "Ascend through the heather zone to the Shira Plateau (3,840m). Stunning views of Kibo peak. 4-5 hours hiking.",
      },
      {
        day: "Day 3",
        title: "Lava Tower to Barranco Camp",
        description:
          "Climb to Lava Tower (4,630m) for acclimatization, then descend to Barranco Camp (3,960m). 6-7 hours.",
      },
      {
        day: "Day 4",
        title: "Barranco to Karanga Camp",
        description:
          "Scale the Barranco Wall — the trek's most dramatic section. Continue to Karanga Camp (4,035m). 4-5 hours.",
      },
      {
        day: "Day 5",
        title: "Karanga to Barafu Camp",
        description:
          "Short ascent to high camp at Barafu (4,640m). Rest and prepare for summit night. 3-4 hours.",
      },
      {
        day: "Day 6",
        title: "Summit Night — Uhuru Peak",
        description:
          "Midnight start. Summit Uhuru Peak (5,895m) at sunrise. Descend to Millennium Camp. 12-14 hours.",
      },
      {
        day: "Day 7",
        title: "Descent to Mweka Gate",
        description:
          "Final descent through rainforest to Mweka Gate. Transfer to hotel in Moshi. Celebration dinner.",
      },
      {
        day: "Day 8",
        title: "Departure",
        description:
          "Transfer to Kilimanjaro Airport or optional Zanzibar extension.",
      },
    ],
    rating: 4.8,
    reviews: 189,
    category: "adventure",
    featured: true,
  },
  {
    id: "zanzibar-beach",
    title: "Zanzibar Beach Escape",
    destination: "Zanzibar",
    duration: "5 Days / 4 Nights",
    price: 1500,
    originalPrice: 1900,
    image:
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
    description:
      "Unwind on pristine white-sand beaches, snorkel vibrant coral reefs, and explore the historic alleys of Stone Town.",
    highlights: [
      "Luxury beachfront resort accommodation",
      "Snorkeling at Mnemba Atoll",
      "Stone Town guided walking tour",
      "Spice plantation visit",
      "Sunset dhow cruise",
      "Forodhani Gardens food tour",
    ],
    included: [
      "Airport transfers",
      "Luxury beachfront accommodation (half board)",
      "Stone Town walking tour",
      "Spice tour with lunch",
      "Snorkeling trip to Mnemba",
      "Sunset dhow cruise with seafood BBQ",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival — Stone Town",
        description:
          "Arrive at Zanzibar Airport. Guided tour of Stone Town — visit the House of Wonders, Old Fort, and winding alleys. Overnight in a boutique hotel.",
      },
      {
        day: "Day 2",
        title: "Spice Tour & Beach Transfer",
        description:
          "Morning spice plantation tour. Afternoon transfer to Nungwi beach resort. Relax and enjoy the turquoise waters.",
      },
      {
        day: "Day 3",
        title: "Mnemba Atoll Snorkeling",
        description:
          "Boat trip to Mnemba Atoll — one of East Africa's best snorkeling spots. Spot dolphins, sea turtles, and tropical fish.",
      },
      {
        day: "Day 4",
        title: "Beach Day & Sunset Dhow Cruise",
        description:
          "Free morning to relax or enjoy water sports. Evening sunset dhow cruise with seafood BBQ and tropical cocktails.",
      },
      {
        day: "Day 5",
        title: "Departure",
        description:
          "Leisurely breakfast. Transfer to Zanzibar Airport for your departure flight.",
      },
    ],
    rating: 4.9,
    reviews: 312,
    category: "beach",
    featured: true,
  },
  {
    id: "okavango-delta",
    title: "Okavango Delta Explorer",
    destination: "Botswana",
    duration: "6 Days / 5 Nights",
    price: 4500,
    originalPrice: 5200,
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
    description:
      "Glide through the world's largest inland delta in a mokoro canoe, staying in exclusive fly-in camps surrounded by pristine wilderness.",
    highlights: [
      "Mokoro canoe excursions through lily-pad channels",
      "Walking safaris with Bushmen trackers",
      "Game drives in Moremi Game Reserve",
      "Exclusive luxury fly-in camps",
      "Helicopter scenic flight over the delta",
      "Night game drives with spotlight",
    ],
    included: [
      "Scenic bush flights (Maun–Delta–Maun)",
      "Luxury fly-in camp accommodation (full board)",
      "All game activities (drives, walks, mokoro)",
      "Expert safari guides & trackers",
      "Premium wines, spirits & beverages",
      "Park & concession fees",
      "Laundry service",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Maun — Fly to Delta",
        description:
          "Arrive at Maun Airport. Scenic bush flight over the delta to your luxury island camp. Afternoon mokoro excursion.",
      },
      {
        day: "Day 2",
        title: "Delta Exploration",
        description:
          "Morning walking safari on a delta island. Afternoon mokoro trip through papyrus channels. Sundowner drinks on the water.",
      },
      {
        day: "Day 3",
        title: "Moremi Game Reserve",
        description:
          "Transfer to Moremi. Full-day game drive exploring the reserve's diverse habitats — floodplains, forests, and lagoons.",
      },
      {
        day: "Day 4",
        title: "Moremi Wildlife Encounters",
        description:
          "Morning and afternoon game drives. Track predators, wild dogs, and large herds of buffalo. Night drive after dinner.",
      },
      {
        day: "Day 5",
        title: "Helicopter Flight & Farewell",
        description:
          "Scenic helicopter flight over the delta. Afternoon at leisure in camp. Farewell bush dinner under the stars.",
      },
      {
        day: "Day 6",
        title: "Departure",
        description:
          "Final morning game walk. Bush flight to Maun. Connect with your onward flight.",
      },
    ],
    rating: 5.0,
    reviews: 98,
    category: "luxury",
    featured: true,
  },
  {
    id: "gorilla-trekking",
    title: "Mountain Gorilla Encounter",
    destination: "Uganda & Rwanda",
    duration: "5 Days / 4 Nights",
    price: 3800,
    image:
      "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
    description:
      "Trek through misty mountain forests to spend a magical hour with endangered mountain gorillas in their natural habitat.",
    highlights: [
      "Two gorilla trekking permits included",
      "Track golden monkeys in bamboo forests",
      "Visit a local community project",
      "Expert wildlife trackers & guides",
      "Luxury eco-lodge accommodation",
      "Cultural dance performance",
    ],
    included: [
      "Two gorilla trekking permits (worth $1,500 each)",
      "Golden monkey trekking permit",
      "Luxury eco-lodge accommodation (full board)",
      "Private 4x4 vehicle & driver-guide",
      "All park entrance fees",
      "Community village visit",
      "Airport transfers",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Kigali",
        description:
          "Arrive at Kigali International Airport. Transfer to your lodge in Volcanoes National Park area. Afternoon at leisure.",
      },
      {
        day: "Day 2",
        title: "First Gorilla Trek",
        description:
          "Morning briefing at park HQ. Trek into the bamboo and hagenia forests to find a gorilla family. Spend one hour observing these gentle giants.",
      },
      {
        day: "Day 3",
        title: "Golden Monkey Trek & Community Visit",
        description:
          "Morning golden monkey trekking. Afternoon visit to a local community project supporting conservation through sustainable livelihoods.",
      },
      {
        day: "Day 4",
        title: "Second Gorilla Trek",
        description:
          "Second gorilla trekking experience with a different family group. Afternoon at leisure or optional hike to Dian Fossey's tomb.",
      },
      {
        day: "Day 5",
        title: "Departure",
        description:
          "Transfer to Kigali. Optional city tour including the Genocide Memorial. Transfer to airport for departure.",
      },
    ],
    rating: 5.0,
    reviews: 156,
    category: "adventure",
    featured: true,
  },
  {
    id: "northern-circuit",
    title: "Tanzania Northern Circuit",
    destination: "Tanzania",
    duration: "10 Days / 9 Nights",
    price: 4200,
    originalPrice: 4900,
    image:
      "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80",
    description:
      "The ultimate Tanzania safari covering all major northern parks — Tarangire, Lake Manyara, Ngorongoro, and the Serengeti.",
    highlights: [
      "Five national parks & conservation areas",
      "Big Five guaranteed sightings",
      "Hot air balloon over the Serengeti",
      "Maasai village visit",
      "Luxury lodges & tented camps",
      "Optional Kilimanjaro day hike",
    ],
    included: [
      "All park & conservation fees",
      "Luxury lodge & tented camp accommodation",
      "Private 4x4 safari vehicle",
      "Professional English-speaking guide",
      "Full-board meals & selected beverages",
      "Hot air balloon safari",
      "Airport transfers & inter-park drives",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Arusha",
        description:
          "Welcome at Kilimanjaro Airport. Transfer to luxury lodge. Rest and acclimatize.",
      },
      {
        day: "Day 2-3",
        title: "Tarangire National Park",
        description:
          "Explore Tarangire with its iconic baobabs and massive elephant herds. Sundowner drives and night game drives.",
      },
      {
        day: "Day 4",
        title: "Lake Manyara",
        description:
          "Game drive in Lake Manyara National Park. Famous for tree-climbing lions and flocks of flamingo.",
      },
      {
        day: "Day 5-6",
        title: "Ngorongoro Conservation Area",
        description:
          "Full day on the crater floor. Visit a Maasai boma. Explore the Empakaai Crater on foot.",
      },
      {
        day: "Day 7-9",
        title: "Serengeti National Park",
        description:
          "Three full days in the Serengeti. Hot air balloon at sunrise. Game drives in multiple zones following the migration.",
      },
      {
        day: "Day 10",
        title: "Departure",
        description:
          "Morning flight to Arusha. Transfer to airport or optional Zanzibar extension.",
      },
    ],
    rating: 4.9,
    reviews: 203,
    category: "safari",
    featured: false,
  },
  {
    id: "zanzibar-honeymoon",
    title: "Zanzibar Romantic Getaway",
    destination: "Zanzibar",
    duration: "7 Days / 6 Nights",
    price: 2800,
    image:
      "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80",
    description:
      "An exclusive romantic escape on Zanzibar's most beautiful beaches with private dining, spa treatments, and sunset cruises.",
    highlights: [
      "Private overwater bungalow",
      "Couples spa treatment",
      "Private sunset dhow cruise",
      "Candlelit dinner on the beach",
      "Dolphin swimming excursion",
      "Private Stone Town tour",
    ],
    included: [
      "Airport transfers",
      "Luxury overwater villa (full board)",
      "Couples spa session",
      "Private sunset cruise with champagne",
      "Beach dinner setup",
      "Dolphin trip",
      "Stone Town private tour",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Welcome",
        description:
          "Arrive in Zanzibar. Private transfer to your exclusive overwater villa. Welcome champagne and tropical fruit platter.",
      },
      {
        day: "Day 2",
        title: "Stone Town Romance",
        description:
          "Private guided tour of Stone Town. Rooftop lunch overlooking the Indian Ocean. Afternoon at the resort.",
      },
      {
        day: "Day 3",
        title: "Spa & Relaxation",
        description:
          "Morning couples spa treatment with Zanzibar spice oils. Afternoon on the beach. Candlelit dinner setup on the sand.",
      },
      {
        day: "Day 4",
        title: "Dolphin Excursion",
        description:
          "Morning dolphin swimming trip. Afternoon snorkeling on a sandbank. Sunset cocktails at the resort.",
      },
      {
        day: "Day 5",
        title: "Beach Day",
        description:
          "Full day at leisure. Enjoy water sports, beach walks, or simply relax in your private villa.",
      },
      {
        day: "Day 6",
        title: "Sunset Cruise & Farewell",
        description:
          "Free morning. Afternoon private sunset dhow cruise with champagne and seafood. Farewell dinner at the resort.",
      },
      {
        day: "Day 7",
        title: "Departure",
        description:
          "Leisurely breakfast. Transfer to Zanzibar Airport.",
      },
    ],
    rating: 5.0,
    reviews: 87,
    category: "luxury",
    featured: false,
  },
  {
    id: "chobe-luxury",
    title: "Chobe River Safari",
    destination: "Botswana",
    duration: "4 Days / 3 Nights",
    price: 3200,
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    description:
      "Cruise the Chobe River among Africa's largest elephant herds and stay in a luxury riverside lodge.",
    highlights: [
      "Boat safaris on the Chobe River",
      "Photography-focused game drives",
      "Africa's largest elephant population",
      "Luxury riverside lodge",
      "Sunset river cruises",
      "Optional day trip to Victoria Falls",
    ],
    included: [
      "Transfers from Kasane Airport",
      "Luxury riverside lodge (full board)",
      "Two boat safaris",
      "Two game drives",
      "Park fees",
      "Premium beverages",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & River Cruise",
        description:
          "Arrive at Kasane. Transfer to riverside lodge. Afternoon sunset boat safari on the Chobe River.",
      },
      {
        day: "Day 2",
        title: "Full Day Chobe",
        description:
          "Morning game drive in Chobe National Park. Afternoon boat safari. Evening at leisure in the lodge.",
      },
      {
        day: "Day 3",
        title: "Photography Safari",
        description:
          "Dedicated photography game drive at golden hour. Afternoon boat cruise. Bush dinner under the stars.",
      },
      {
        day: "Day 4",
        title: "Departure",
        description:
          "Morning at leisure. Transfer to Kasane Airport or optional Victoria Falls extension.",
      },
    ],
    rating: 4.8,
    reviews: 134,
    category: "luxury",
    featured: false,
  },
  {
    id: "kenya-tanzania-combo",
    title: "Kenya & Tanzania Grand Safari",
    destination: "Kenya & Tanzania",
    duration: "12 Days / 11 Nights",
    price: 5500,
    originalPrice: 6200,
    image:
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    description:
      "The ultimate East African safari combining Kenya's Masai Mara with Tanzania's Serengeti and Ngorongoro in one epic journey.",
    highlights: [
      "Masai Mara & Serengeti — both sides of the migration",
      "Ngorongoro Crater floor tour",
      "Amboseli with Kilimanjaro backdrop",
      "Lake Nakuru flamingos",
      "Cross-border safari experience",
      "Luxury camps throughout",
    ],
    included: [
      "All border crossing logistics",
      "Park fees in both countries",
      "Luxury lodge & camp accommodation",
      "Private safari vehicles in each country",
      "Professional guides in each country",
      "Full-board meals",
      "Domestic flights where needed",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Nairobi",
        description:
          "Welcome at JKIA. Transfer to your Nairobi hotel. Evening briefing and welcome dinner.",
      },
      {
        day: "Day 2-3",
        title: "Amboseli National Park",
        description:
          "Drive to Amboseli. Game drives with views of Kilimanjaro. Spot elephants, lions, and cheetahs.",
      },
      {
        day: "Day 4-5",
        title: "Lake Nakuru & Lake Naivasha",
        description:
          "Flamingos at Lake Nakuru. Boat ride on Lake Naivasha. Crescent Island walking safari.",
      },
      {
        day: "Day 6-8",
        title: "Masai Mara",
        description:
          "Three days in the legendary Masai Mara. Hot air balloon optional. Big Five game drives.",
      },
      {
        day: "Day 9-10",
        title: "Serengeti National Park",
        description:
          "Cross into Tanzania. Explore the endless Serengeti plains. Morning and evening game drives.",
      },
      {
        day: "Day 11",
        title: "Ngorongoro Crater",
        description:
          "Full-day Ngorongoro Crater tour. Spot black rhino. Picnic lunch on the crater floor.",
      },
      {
        day: "Day 12",
        title: "Departure",
        description:
          "Drive to Arusha. Transfer to Kilimanjaro Airport for your departure flight.",
      },
    ],
    rating: 4.9,
    reviews: 176,
    category: "safari",
    featured: false,
  },
  {
    id: "stone-town-spice",
    title: "Stone Town & Spice Experience",
    destination: "Zanzibar",
    duration: "3 Days / 2 Nights",
    price: 800,
    image:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80",
    description:
      "Dive deep into Zanzibar's rich history and aromatic spice heritage with guided tours, food experiences, and cultural immersion.",
    highlights: [
      "Expert-led Stone Town walking tour",
      "Spice farm visit with cooking class",
      "Forodhani night market food tour",
      "Visit the Anglican Cathedral & slave chambers",
      "Traditional henna painting",
      "Boutique heritage hotel stay",
    ],
    included: [
      "Airport transfers",
      "Boutique heritage hotel (B&B)",
      "Stone Town guided walking tour",
      "Spice farm tour with lunch & cooking class",
      "Forodhani food tour",
      "All entrance fees",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Stone Town Immersion",
        description:
          "Arrive in Zanzibar. Afternoon walking tour of Stone Town — the Old Fort, House of Wonders, and the labyrinth of alleys. Evening at Forodhani Gardens night market.",
      },
      {
        day: "Day 2",
        title: "Spice & Culture",
        description:
          "Morning spice farm visit with hands-on cooking class. Afternoon free to explore art galleries, shops, and cafés. Optional henna session.",
      },
      {
        day: "Day 3",
        title: "Departure",
        description:
          "Morning visit to the Anglican Cathedral and slave chambers. Transfer to airport or extend to beach.",
      },
    ],
    rating: 4.7,
    reviews: 228,
    category: "cultural",
    featured: false,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Emily & James Chen",
    country: "China",
    flag: "🇨🇳",
    text: "Our Serengeti safari with Leviva was the trip of a lifetime. The migration crossing was beyond anything we imagined. Our guide Jackson was incredibly knowledgeable and made us feel completely safe. We can't wait to return for Kilimanjaro!",
    rating: 5,
    tour: "Great Migration Safari",
    avatar: "EC",
  },
  {
    id: "2",
    name: "Sarah Mitchell",
    country: "USA",
    flag: "🇺🇸",
    text: "Zanzibar was pure magic. The combination of Stone Town's history and Nungwi's beaches made for the perfect vacation. Leviva's attention to detail — the surprise beach dinner, the private dhow cruise — elevated everything.",
    rating: 5,
    tour: "Zanzibar Beach Escape",
    avatar: "SM",
  },
  {
    id: "3",
    name: "Klaus & Anna Weber",
    country: "Germany",
    flag: "🇩🇪",
    text: "We've been on safaris in South Africa and Kenya, but the Okavango Delta with Leviva was something else entirely. The mokoro rides, the walking safaris — it felt like we had the wilderness all to ourselves. Truly exclusive.",
    rating: 5,
    tour: "Okavango Delta Explorer",
    avatar: "KW",
  },
  {
    id: "4",
    name: "Park Ji-hoon",
    country: "South Korea",
    flag: "🇰🇷",
    text: "킬리만자로 등반은 인생에서 가장 도전적이면서도 보람 있는 경험이었습니다. Leviva 팀의 전문적인 안내와 세심한 배려 덕분에 안전하게 정상에 도달할 수 있었습니다. The Kilimanjaro trek was the most rewarding challenge of my life. Summit sunrise was unforgettable.",
    rating: 5,
    tour: "Mount Kilimanjaro Expedition",
    avatar: "PJ",
  },
  {
    id: "5",
    name: "David & Claire Thompson",
    country: "Australia",
    flag: "🇦🇺",
    text: "We brought our two teenagers on the Northern Circuit safari and everyone loved it. From Ngorongoro to the Serengeti, every day was an adventure. The hot air balloon was the highlight — floating over the plains at sunrise!",
    rating: 5,
    tour: "Tanzania Northern Circuit",
    avatar: "DT",
  },
  {
    id: "6",
    name: "Sophie Laurent",
    country: "France",
    flag: "🇫🇷",
    text: "Gorilla trekking in Rwanda was an emotional, life-changing experience. Being so close to these majestic creatures, watching a silverback play with his baby — I cried with joy. Leviva arranged everything perfectly.",
    rating: 5,
    tour: "Mountain Gorilla Encounter",
    avatar: "SL",
  },
  {
    id: "7",
    name: "Tom & Mia Edwards",
    country: "New Zealand",
    flag: "🇳🇿",
    text: "The Kenya-Tanzania combo was incredible value. Seeing both sides of the migration, the Ngorongoro Crater, and Amboseli with Kilimanjaro in the background — all seamlessly connected. Leviva made the cross-border logistics effortless.",
    rating: 5,
    tour: "Kenya & Tanzania Grand Safari",
    avatar: "TE",
  },
  {
    id: "8",
    name: "Li Wei & Zhang Mei",
    country: "China",
    flag: "🇨🇳",
    text: "我们的蜜月之旅在桑给巴尔度过了完美的一周。私人别墅、沙滩晚餐和日落帆船之旅都令人难忘。Leviva让这一切变得如此特别。Our honeymoon in Zanzibar was absolute perfection. Private villa, beach dinners, sunset cruise — every detail was special.",
    rating: 5,
    tour: "Zanzibar Romantic Getaway",
    avatar: "LW",
  },
];

export const stats = [
  { label: "Happy Travelers", value: "15,000+" },
  { label: "Safari Tours", value: "500+" },
  { label: "Years of Experience", value: "12+" },
  { label: "Countries Covered", value: "8" },
];

export const whyChooseUs = [
  {
    title: "Local Expertise",
    description:
      "Born and raised in Tanzania, our guides know every trail, every waterhole, and every secret spot that the big operators miss.",
    icon: "compass",
  },
  {
    title: "Tailored Experiences",
    description:
      "No cookie-cutter tours. Every itinerary is customized to your interests, pace, and budget — from budget camping to ultra-luxury.",
    icon: "sparkles",
  },
  {
    title: "Safety First",
    description:
      "Licensed by the Tanzania Tourist Board, fully insured, with emergency evacuation coverage and 24/7 support on every trip.",
    icon: "shield",
  },
  {
    title: "Sustainable Tourism",
    description:
      "We reinvest in local communities, employ local staff, and follow responsible wildlife viewing practices that protect our natural heritage.",
    icon: "leaf",
  },
  {
    title: "Multilingual Guides",
    description:
      "Our guides speak English, Swahili, Mandarin, French, and Korean — ensuring every guest feels at home on their African adventure.",
    icon: "globe",
  },
  {
    title: "Best Price Guarantee",
    description:
      "Direct booking means no middleman markups. If you find a lower price for the same itinerary, we'll match it — guaranteed.",
    icon: "tag",
  },
];

export interface Tour {
  id: string;
  slug: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  currency: string;
  groupSize: string;
  difficulty: string;
  description: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: string; title: string; description: string }[];
  imageUrl: string;
  gallery: string[];
  featured: boolean;
  rating: number;
  reviewCount: number;
  category: string;
}

export const tours: Tour[] = [
  {
    id: "1",
    slug: "serengeti-migration-safari",
    title: "The Great Serengeti Migration Safari",
    destination: "Tanzania",
    duration: "7 Days / 6 Nights",
    price: 3200,
    currency: "USD",
    groupSize: "2-12 travelers",
    difficulty: "Easy",
    description:
      "Witness the awe-inspiring Great Migration in the Serengeti — one of nature's most spectacular events. Over two million wildebeest, zebras, and gazelles traverse the endless plains in search of fresh grazing. This 7-day safari takes you deep into the heart of Tanzania's most iconic national park, with expert guides, luxury tented camps, and once-in-a-lifetime wildlife encounters.",
    highlights: [
      "Witness the Great Wildebeest Migration river crossings",
      "Big Five game drives in the Serengeti",
      "Sunrise hot air balloon safari option",
      "Visit to Ngorongoro Crater — the world's largest caldera",
      "Luxury tented camp accommodations",
      "Expert Maasai and naturalist guides",
    ],
    inclusions: [
      "Airport transfers and all ground transportation",
      "Professional English-speaking safari guide",
      "All park entrance and conservation fees",
      "Full-board accommodation in luxury tented camps",
      "Daily game drives in 4x4 safari vehicles",
      "Bottled water during game drives",
      "Flying Doctors emergency evacuation insurance",
    ],
    exclusions: [
      "International flights",
      "Travel and medical insurance",
      "Visa fees",
      "Tips and gratuities",
      "Hot air balloon safari (optional add-on)",
      "Personal expenses and souvenirs",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Arusha",
        description:
          "Arrive at Kilimanjaro International Airport. Meet and greet by your Leviva guide. Transfer to your luxury lodge in Arusha. Welcome dinner with safari briefing.",
      },
      {
        day: "Day 2",
        title: "Arusha to Serengeti National Park",
        description:
          "Early morning flight to the Serengeti. Afternoon game drive through the central Serengeti plains. Spot lions, leopards, elephants, and vast herds of wildebeest. Settle into your luxury tented camp.",
      },
      {
        day: "Day 3",
        title: "Full Day Serengeti Safari",
        description:
          "Full day exploring the Serengeti ecosystem. Follow the migration herds across the plains. Witness dramatic predator-prey interactions. Picnic lunch in the bush. Evening sundowner drinks.",
      },
      {
        day: "Day 4",
        title: "Serengeti — Migration River Crossings",
        description:
          "Head to the northern Serengeti near the Mara River. Witness the heart-stopping river crossings as thousands of wildebeest brave crocodile-infested waters. An unforgettable spectacle of nature.",
      },
      {
        day: "Day 5",
        title: "Serengeti to Ngorongoro",
        description:
          "Morning game drive in the Serengeti. Afternoon transfer to the Ngorongoro Conservation Area. Check into your lodge on the crater rim with breathtaking views.",
      },
      {
        day: "Day 6",
        title: "Ngorongoro Crater Descent",
        description:
          "Descend 600 meters into the Ngorongoro Crater — a UNESCO World Heritage Site. This extinct volcanic caldera hosts the densest concentration of wildlife in Africa. Spot black rhinos, flamingos, and the Big Five.",
      },
      {
        day: "Day 7",
        title: "Departure",
        description:
          "After breakfast, transfer back to Arusha. Optional cultural visit to a Maasai village. Airport transfer for your departure flight. Karibu tena — welcome back anytime!",
      },
    ],
    imageUrl: "/images/tours/serengeti-migration.jpg",
    gallery: [
      "/images/tours/serengeti-1.jpg",
      "/images/tours/serengeti-2.jpg",
      "/images/tours/serengeti-3.jpg",
    ],
    featured: true,
    rating: 4.9,
    reviewCount: 247,
    category: "Safari",
  },
  {
    id: "2",
    slug: "kilimanjaro-summit-trek",
    title: "Mount Kilimanjaro Summit Trek",
    destination: "Tanzania",
    duration: "8 Days / 7 Nights",
    price: 2800,
    currency: "USD",
    groupSize: "2-10 travelers",
    difficulty: "Challenging",
    description:
      "Conquer Africa's highest peak at 5,895 meters via the scenic Machame Route — known as the 'Whiskey Route.' This 8-day trek takes you through five distinct climate zones, from lush rainforest to arctic glaciers, culminating in a breathtaking summit sunrise above the clouds.",
    highlights: [
      "Summit Uhuru Peak — Africa's highest point at 5,895m",
      "Trek through 5 climate zones in one mountain",
      "Scenic Machame Route with stunning ridgeline walks",
      "Professional mountain guides and porters",
      "Sunrise views from the Roof of Africa",
      "Certificate of achievement upon summit",
    ],
    inclusions: [
      "Airport transfers",
      "Professional mountain guide and assistant guides",
      "Porters for gear and supplies",
      "All park and rescue fees",
      "Quality mountain tents and dining tent",
      "All meals on the mountain",
      "Pre and post-climb hotel accommodation",
    ],
    exclusions: [
      "International flights",
      "Travel and altitude insurance",
      "Personal climbing gear",
      "Tips for guides and porters",
      "Visa fees",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Briefing",
        description:
          "Arrive in Moshi. Equipment check and climb briefing with your head guide. Rest and prepare for the adventure ahead.",
      },
      {
        day: "Day 2",
        title: "Machame Gate to Machame Camp",
        description:
          "Drive to Machame Gate (1,800m). Begin your trek through the lush montane rainforest. Arrive at Machame Camp (3,000m).",
      },
      {
        day: "Day 3",
        title: "Machame Camp to Shira Camp",
        description:
          "Ascend through the heath zone with giant heathers. Reach Shira Plateau (3,840m) with views of Kibo Peak.",
      },
      {
        day: "Day 4",
        title: "Shira Camp to Barranco Camp",
        description:
          "Climb to Lava Tower (4,630m) for acclimatization, then descend to Barranco Camp (3,960m). 'Climb high, sleep low' strategy.",
      },
      {
        day: "Day 5",
        title: "Barranco Wall to Karanga Camp",
        description:
          "Scale the famous Barranco Wall — the most exciting section of the climb. Continue to Karanga Camp (3,995m).",
      },
      {
        day: "Day 6",
        title: "Karanga to Barafu Base Camp",
        description:
          "Short trek to Barafu Camp (4,673m) — the summit base camp. Rest, eat, and prepare for the midnight summit attempt.",
      },
      {
        day: "Day 7",
        title: "Summit Day — Uhuru Peak!",
        description:
          "Midnight start. Push through the arctic zone under the stars. Reach Stella Point, then Uhuru Peak (5,895m) for sunrise. Celebrate, then descend to Mweka Camp.",
      },
      {
        day: "Day 8",
        title: "Descent & Celebration",
        description:
          "Final descent through the rainforest to Mweka Gate. Receive your summit certificate. Transfer back to Moshi. Celebration dinner!",
      },
    ],
    imageUrl: "/images/tours/kilimanjaro-summit.jpg",
    gallery: [],
    featured: true,
    rating: 4.8,
    reviewCount: 189,
    category: "Trekking",
  },
  {
    id: "3",
    slug: "zanzibar-beach-spice-retreat",
    title: "Zanzibar Beach & Spice Island Retreat",
    destination: "Zanzibar",
    duration: "5 Days / 4 Nights",
    price: 1500,
    currency: "USD",
    groupSize: "2-16 travelers",
    difficulty: "Easy",
    description:
      "Discover the enchanting Spice Island of Zanzibar — where turquoise waters meet white sand beaches and centuries of history blend Swahili, Arab, and Indian cultures. From the UNESCO World Heritage Stone Town to pristine beach resorts, this retreat offers the perfect blend of culture, relaxation, and adventure.",
    highlights: [
      "UNESCO World Heritage Stone Town guided walking tour",
      "Traditional spice plantation tour",
      "Snorkeling in the crystal-clear Indian Ocean",
      "Sunset dhow cruise with seafood dinner",
      "Pristine Nungwi and Kendwa Beach relaxation",
      "Jozani Forest — home of the rare Red Colobus monkey",
    ],
    inclusions: [
      "Airport transfers and all ground transportation",
      "4 nights beachfront resort accommodation",
      "Daily breakfast and selected meals",
      "Stone Town guided walking tour",
      "Spice plantation tour with lunch",
      "Sunset dhow cruise",
      "Snorkeling equipment and boat trip",
    ],
    exclusions: [
      "International and domestic flights",
      "Travel insurance",
      "Visa fees",
      "Tips and gratuities",
      "Personal expenses",
      "Additional water sports",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Stone Town",
        description:
          "Arrive at Zanzibar Airport. Transfer to your boutique hotel in Stone Town. Afternoon free to explore the narrow streets, bazaars, and Forodhani night food market.",
      },
      {
        day: "Day 2",
        title: "Stone Town & Spice Tour",
        description:
          "Morning guided walking tour of Stone Town — visit the Old Fort, House of Wonders, and slave market memorial. Afternoon spice plantation tour tasting fresh spices.",
      },
      {
        day: "Day 3",
        title: "Transfer to Beach Resort",
        description:
          "Transfer to your luxury beach resort in Nungwi. Afternoon at leisure on pristine white sand beaches. Optional water sports available.",
      },
      {
        day: "Day 4",
        title: "Snorkeling & Sunset Cruise",
        description:
          "Morning snorkeling trip to Mnemba Atoll — swim with sea turtles and tropical fish. Afternoon at the resort. Evening sunset dhow cruise with fresh seafood dinner.",
      },
      {
        day: "Day 5",
        title: "Jozani Forest & Departure",
        description:
          "Visit Jozani Forest to see the endemic Red Colobus monkeys. Transfer to the airport for your departure. Kwaheri!",
      },
    ],
    imageUrl: "/images/tours/zanzibar-beach.jpg",
    gallery: [],
    featured: true,
    rating: 4.9,
    reviewCount: 312,
    category: "Beach & Culture",
  },
  {
    id: "4",
    slug: "botswana-okavango-delta-safari",
    title: "Botswana Okavango Delta Luxury Safari",
    destination: "Botswana",
    duration: "6 Days / 5 Nights",
    price: 4500,
    currency: "USD",
    groupSize: "2-8 travelers",
    difficulty: "Easy",
    description:
      "Experience the untouched wilderness of the Okavango Delta — the world's largest inland delta and a UNESCO World Heritage Site. Glide through crystal-clear channels in a traditional mokoro canoe, track big game on foot, and enjoy exclusive luxury camp accommodations in one of Africa's last great wildernesses.",
    highlights: [
      "Mokoro canoe safari through the Okavango Delta",
      "Walking safaris with expert Bushmen trackers",
      "Game drives in Moremi Game Reserve",
      "Exceptional birdwatching — 400+ species",
      "Exclusive luxury tented camp with private plunge pool",
      "Night game drives for nocturnal wildlife",
    ],
    inclusions: [
      "Light aircraft transfers from Maun",
      "5 nights luxury tented camp accommodation",
      "All meals, drinks, and house wines",
      "Daily game activities — drives, walks, mokoro",
      "Professional safari guides",
      "Park fees and conservation levies",
      "Laundry service",
    ],
    exclusions: [
      "International flights to Maun",
      "Visa fees",
      "Travel insurance",
      "Premium wines and spirits",
      "Gratuities",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in the Okavango Delta",
        description:
          "Fly from Maun into the heart of the Delta by light aircraft. Scenic flight over the waterways. Arrive at your luxury tented camp. Afternoon mokoro canoe excursion.",
      },
      {
        day: "Day 2",
        title: "Morning Walk & Afternoon Drive",
        description:
          "Guided walking safari through the Delta islands. Track elephants, buffalo, and antelopes on foot. Afternoon 4x4 game drive. Sundowners by the lagoon.",
      },
      {
        day: "Day 3",
        title: "Full Day Moremi Game Reserve",
        description:
          "Full day excursion to Moremi Game Reserve. Incredible concentrations of wildlife. Spot wild dogs, lions, and leopards. Bush picnic lunch.",
      },
      {
        day: "Day 4",
        title: "Delta Waterways",
        description:
          "Spend the day exploring the Delta by mokoro and motorboat. Exceptional birdwatching. Hippo and crocodile spotting. Fish for bream and tigerfish.",
      },
      {
        day: "Day 5",
        title: "Bush Walk & Night Drive",
        description:
          "Morning bush walk learning tracking and medicinal plants. Afternoon at leisure by the pool. Night game drive to spot owls, genets, and lions on the hunt.",
      },
      {
        day: "Day 6",
        title: "Departure",
        description:
          "Final morning activity. Light aircraft transfer back to Maun for your onward journey.",
      },
    ],
    imageUrl: "/images/tours/okavango-delta.jpg",
    gallery: [],
    featured: true,
    rating: 5.0,
    reviewCount: 98,
    category: "Safari",
  },
  {
    id: "5",
    slug: "tarangire-lake-manyara-safari",
    title: "Tarangire & Lake Manyara Safari Adventure",
    destination: "Tanzania",
    duration: "4 Days / 3 Nights",
    price: 1800,
    currency: "USD",
    groupSize: "2-12 travelers",
    difficulty: "Easy",
    description:
      "Explore two of Tanzania's most underrated gems — Tarangire National Park with its ancient baobab trees and massive elephant herds, and Lake Manyara famous for its tree-climbing lions and flamingo-lined shores. Perfect as a short safari or add-on to a Serengeti expedition.",
    highlights: [
      "Tarangire's massive elephant herds — up to 300 in one sighting",
      "Ancient baobab tree landscapes",
      "Lake Manyara's tree-climbing lions",
      "Millions of flamingos on the lake shore",
      "Night game drive in Tarangire",
      "Maasai cultural village visit",
    ],
    inclusions: [
      "Airport pickup and drop-off in Arusha",
      "Professional safari guide",
      "4x4 Land Cruiser with pop-up roof",
      "All park fees",
      "Full-board lodge accommodation",
      "Bottled water on safari",
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Visa fees",
      "Tips and gratuities",
      "Personal expenses",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arusha to Tarangire",
        description:
          "Morning departure from Arusha. Drive to Tarangire National Park. Afternoon game drive among baobab trees and elephant herds. Check into your lodge.",
      },
      {
        day: "Day 2",
        title: "Full Day Tarangire",
        description:
          "Full day exploring Tarangire. Visit the Silale Swamps and Tarangire River. Night game drive to spot nocturnal predators. Bush dinner under the stars.",
      },
      {
        day: "Day 3",
        title: "Lake Manyara National Park",
        description:
          "Drive to Lake Manyara. Game drive through the groundwater forest. Search for tree-climbing lions. View flamingos on the alkaline lake. Overnight at the lake.",
      },
      {
        day: "Day 4",
        title: "Return to Arusha",
        description:
          "Optional early morning game drive. Visit a Maasai village for a cultural experience. Return to Arusha. Airport transfer.",
      },
    ],
    imageUrl: "/images/tours/tarangire-safari.jpg",
    gallery: [],
    featured: false,
    rating: 4.7,
    reviewCount: 156,
    category: "Safari",
  },
  {
    id: "6",
    slug: "chobe-victoria-falls-adventure",
    title: "Chobe National Park & Victoria Falls",
    destination: "Botswana",
    duration: "5 Days / 4 Nights",
    price: 3500,
    currency: "USD",
    groupSize: "2-10 travelers",
    difficulty: "Easy",
    description:
      "Combine the incredible wildlife of Chobe National Park — home to Africa's largest elephant population — with the thundering majesty of Victoria Falls. This cross-border adventure between Botswana and Zimbabwe delivers two iconic African experiences in one unforgettable trip.",
    highlights: [
      "Chobe River sunset boat cruise",
      "50,000+ elephants in Chobe National Park",
      "Victoria Falls — one of the Seven Natural Wonders",
      "Optional bungee jumping and white water rafting",
      "Game drives along the Chobe riverfront",
      "Authentic African lodge experiences",
    ],
    inclusions: [
      "All transfers and cross-border assistance",
      "3 nights Chobe lodge, 1 night Victoria Falls hotel",
      "Daily game drives and boat cruises",
      "Victoria Falls guided tour",
      "All park fees",
      "Most meals included",
    ],
    exclusions: [
      "International flights",
      "Visa fees for Botswana and Zimbabwe",
      "Travel insurance",
      "Optional activities at Victoria Falls",
      "Tips and personal expenses",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival at Chobe",
        description:
          "Arrive at Kasane Airport. Transfer to your riverside lodge. Afternoon Chobe River boat cruise — elephants bathing, hippos, and spectacular sunset.",
      },
      {
        day: "Day 2",
        title: "Full Day Chobe Safari",
        description:
          "Early morning game drive along the Chobe riverfront. Return for lunch. Afternoon boat safari on the Chobe River. Huge herds of elephants and buffalo.",
      },
      {
        day: "Day 3",
        title: "Chobe Exploration",
        description:
          "Drive deeper into Chobe's interior. Savuti Marsh area for predator sightings. Lions, leopards, and hyenas. Picnic lunch in the park.",
      },
      {
        day: "Day 4",
        title: "Transfer to Victoria Falls",
        description:
          "Morning border crossing to Zimbabwe. Guided tour of Victoria Falls — feel the spray, hear the thunder. Afternoon free for optional adventure activities.",
      },
      {
        day: "Day 5",
        title: "Departure",
        description:
          "Free morning for last-minute activities or shopping. Transfer to Victoria Falls Airport for departure.",
      },
    ],
    imageUrl: "/images/tours/chobe-victoria.jpg",
    gallery: [],
    featured: false,
    rating: 4.8,
    reviewCount: 134,
    category: "Safari & Adventure",
  },
  {
    id: "7",
    slug: "rwanda-gorilla-trekking",
    title: "Rwanda Mountain Gorilla Trekking Experience",
    destination: "Rwanda",
    duration: "4 Days / 3 Nights",
    price: 3800,
    currency: "USD",
    groupSize: "2-8 travelers",
    difficulty: "Moderate",
    description:
      "Come face to face with the majestic mountain gorillas in the misty Volcanoes National Park of Rwanda. With fewer than 1,000 left in the wild, this is a rare and deeply moving wildlife encounter. Trek through bamboo forests to sit among a gorilla family — an experience that will change your perspective forever.",
    highlights: [
      "Face-to-face encounter with mountain gorillas",
      "Trek through the Virunga volcanic mountains",
      "Visit the Dian Fossey Gorilla Fund research center",
      "Golden monkey trekking experience",
      "Kigali city tour and genocide memorial",
      "Intore cultural dance performance",
    ],
    inclusions: [
      "All transfers in a 4x4 vehicle",
      "Gorilla trekking permit (worth $1,500)",
      "Golden monkey trekking permit",
      "3 nights premium lodge accommodation",
      "All meals",
      "English-speaking guide",
      "Kigali city tour",
    ],
    exclusions: [
      "International flights",
      "Rwanda visa",
      "Travel insurance",
      "Tips and porter fees",
      "Personal hiking gear",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Kigali",
        description:
          "Arrive at Kigali International Airport. Afternoon Kigali city tour including the Genocide Memorial. Transfer to your lodge near Volcanoes National Park.",
      },
      {
        day: "Day 2",
        title: "Mountain Gorilla Trekking",
        description:
          "Early morning briefing at park headquarters. Trek into the bamboo forest to find a habituated gorilla family. Spend one magical hour observing these gentle giants. Return to lodge. Afternoon Intore dance performance.",
      },
      {
        day: "Day 3",
        title: "Golden Monkey Trek & Dian Fossey",
        description:
          "Morning golden monkey trekking — playful and photogenic primates. Afternoon hike to the Dian Fossey research camp and her grave site. Evening farewell dinner.",
      },
      {
        day: "Day 4",
        title: "Departure",
        description:
          "Transfer back to Kigali. Optional craft shopping at Caplaki. Airport transfer for your departure.",
      },
    ],
    imageUrl: "/images/tours/gorilla-trekking.jpg",
    gallery: [],
    featured: true,
    rating: 5.0,
    reviewCount: 87,
    category: "Wildlife & Trekking",
  },
  {
    id: "8",
    slug: "maasai-mara-amboseli-kenya",
    title: "Kenya's Maasai Mara & Amboseli Safari",
    destination: "Kenya",
    duration: "6 Days / 5 Nights",
    price: 2900,
    currency: "USD",
    groupSize: "2-12 travelers",
    difficulty: "Easy",
    description:
      "Experience Kenya's two most legendary parks: the Maasai Mara — famed for its Big Five and wildebeest crossings — and Amboseli with its iconic views of Mount Kilimanjaro and massive elephant herds. This classic East African safari delivers unforgettable wildlife and stunning landscapes.",
    highlights: [
      "Big Five game drives in the Maasai Mara",
      "Mount Kilimanjaro views from Amboseli",
      "Maasai cultural village visit",
      "Option to witness the Great Migration (July-October)",
      "Luxury lodge and tented camp stays",
      "Exclusive game drives with expert Maasai guides",
    ],
    inclusions: [
      "All ground transportation in 4x4 vehicles",
      "Professional English-speaking guide",
      "All park and conservancy fees",
      "5 nights lodge/tented camp accommodation",
      "All meals on safari",
      "Game drives as per itinerary",
    ],
    exclusions: [
      "International flights",
      "Kenya visa",
      "Travel insurance",
      "Tips and gratuities",
      "Optional Mara balloon safari",
      "Personal expenses",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Nairobi to Amboseli",
        description:
          "Depart Nairobi and drive south to Amboseli National Park. Afternoon game drive with views of Mount Kilimanjaro. Check into your lodge.",
      },
      {
        day: "Day 2",
        title: "Full Day Amboseli",
        description:
          "Full day exploring Amboseli. Massive elephant herds against the Kilimanjaro backdrop. Visit Observation Hill for panoramic views. Sunset game drive.",
      },
      {
        day: "Day 3",
        title: "Amboseli to Maasai Mara",
        description:
          "Drive through the Great Rift Valley to the Maasai Mara. Arrive in time for an afternoon game drive. Settle into your luxury tented camp.",
      },
      {
        day: "Day 4",
        title: "Full Day Maasai Mara",
        description:
          "Full day game drives in the Mara ecosystem. Incredible predator-prey action. Lions, cheetahs, and leopards. Visit a Maasai village.",
      },
      {
        day: "Day 5",
        title: "Mara — Migration & Bush Walk",
        description:
          "Morning game drive focusing on the Mara River. Optional balloon safari at dawn. Afternoon guided bush walk with Maasai warriors.",
      },
      {
        day: "Day 6",
        title: "Return to Nairobi",
        description:
          "Final morning game drive. Drive back to Nairobi via the Great Rift Valley viewpoint. Airport drop-off.",
      },
    ],
    imageUrl: "/images/tours/maasai-mara.jpg",
    gallery: [],
    featured: false,
    rating: 4.8,
    reviewCount: 203,
    category: "Safari",
  },
];

export const destinations = [
  {
    slug: "tanzania",
    name: "Tanzania",
    tagline: "The Land of Kilimanjaro & Serengeti",
    description:
      "Tanzania is East Africa's crown jewel — home to the Serengeti, Mount Kilimanjaro, the Ngorongoro Crater, and the idyllic island of Zanzibar. From the Great Migration to pristine Indian Ocean beaches, Tanzania offers the ultimate African experience.",
    imageUrl: "/images/destinations/tanzania.jpg",
    highlights: [
      "Serengeti National Park — The Great Migration",
      "Mount Kilimanjaro — Africa's highest peak",
      "Ngorongoro Crater — The Eighth Wonder of the World",
      "Zanzibar — The Spice Island",
      "Tarangire & Lake Manyara National Parks",
      "Ruaha & Selous — Off-the-beaten-path wilderness",
    ],
    tourCount: 4,
  },
  {
    slug: "zanzibar",
    name: "Zanzibar",
    tagline: "The Exotic Spice Island",
    description:
      "Zanzibar is a tropical paradise just off the coast of Tanzania. Its UNESCO-listed Stone Town, turquoise beaches, vibrant coral reefs, and spice plantations make it one of the Indian Ocean's most captivating destinations. The perfect post-safari retreat.",
    imageUrl: "/images/destinations/zanzibar.jpg",
    highlights: [
      "Stone Town — UNESCO World Heritage Site",
      "Pristine beaches of Nungwi and Paje",
      "World-class snorkeling and diving",
      "Spice plantation tours",
      "Jozani Forest and Red Colobus monkeys",
      "Traditional dhow sailing",
    ],
    tourCount: 1,
  },
  {
    slug: "botswana",
    name: "Botswana",
    tagline: "Africa's Last Wilderness Frontier",
    description:
      "Botswana is synonymous with exclusive, low-impact, high-value safari experiences. The Okavango Delta, Chobe National Park, and the vast Kalahari Desert offer some of the most pristine and game-rich wilderness areas left on Earth.",
    imageUrl: "/images/destinations/botswana.jpg",
    highlights: [
      "Okavango Delta — UNESCO World Heritage Site",
      "Chobe National Park — Africa's largest elephant herds",
      "Makgadikgadi Salt Pans",
      "Central Kalahari Game Reserve",
      "Exclusive luxury safari camps",
      "Mokoro canoe safaris",
    ],
    tourCount: 2,
  },
  {
    slug: "kenya",
    name: "Kenya",
    tagline: "The Classic Safari Destination",
    description:
      "Kenya pioneered the African safari experience and remains one of the continent's most beloved destinations. The Maasai Mara, Amboseli, and Mount Kenya offer legendary wildlife encounters and stunning landscapes that define East Africa.",
    imageUrl: "/images/destinations/kenya.jpg",
    highlights: [
      "Maasai Mara — The Great Migration crossing",
      "Amboseli — Kilimanjaro views and elephants",
      "Samburu — Unique northern wildlife",
      "Nairobi National Park",
      "Lamu Archipelago",
      "Lake Nakuru flamingos",
    ],
    tourCount: 1,
  },
  {
    slug: "rwanda",
    name: "Rwanda",
    tagline: "The Land of a Thousand Hills",
    description:
      "Rwanda has emerged as one of Africa's most remarkable destinations. Mountain gorilla trekking in Volcanoes National Park is a bucket-list experience, and the country's stunning green hills, vibrant culture, and remarkable conservation story make it truly special.",
    imageUrl: "/images/destinations/rwanda.jpg",
    highlights: [
      "Mountain Gorilla Trekking",
      "Volcanoes National Park",
      "Nyungwe Forest — Chimpanzee tracking",
      "Kigali — Africa's cleanest city",
      "Akagera National Park — Big Five",
      "Lake Kivu relaxation",
    ],
    tourCount: 1,
  },
];

export const testimonials = [
  {
    id: "1",
    name: "Sarah Chen",
    country: "China",
    avatar: "/images/testimonials/avatar-1.jpg",
    rating: 5,
    text: "Leviva made our Serengeti dream come true! The organization was flawless, our guide Joseph was incredible, and the tented camps were beyond luxury. Seeing the Great Migration up close was the most breathtaking experience of our lives. We'll be back for Kilimanjaro!",
    tour: "Serengeti Migration Safari",
  },
  {
    id: "2",
    name: "James & Emily Roberts",
    country: "USA",
    avatar: "/images/testimonials/avatar-2.jpg",
    rating: 5,
    text: "From the moment we landed in Arusha, everything was taken care of. The Leviva team is professional, knowledgeable, and genuinely passionate about East Africa. Our Zanzibar beach retreat was paradise. Highly recommend for American travelers!",
    tour: "Zanzibar Beach & Spice Retreat",
  },
  {
    id: "3",
    name: "Hans & Ingrid Mueller",
    country: "Germany",
    avatar: "/images/testimonials/avatar-3.jpg",
    rating: 5,
    text: "We've been on safaris in South Africa and Namibia, but Tanzania with Leviva was something else entirely. The Ngorongoro Crater alone was worth the trip. Incredibly well organized and the value for money is outstanding.",
    tour: "Serengeti Migration Safari",
  },
  {
    id: "4",
    name: "Kim Min-jun",
    country: "South Korea",
    avatar: "/images/testimonials/avatar-4.jpg",
    rating: 5,
    text: "킬리만자로 정상에 서는 것은 인생 최고의 경험이었습니다. Leviva's Kilimanjaro team was outstanding — professional, encouraging, and they made safety the top priority. The summit sunrise was worth every step. Thank you Leviva!",
    tour: "Kilimanjaro Summit Trek",
  },
  {
    id: "5",
    name: "Oliver & Sophie Thompson",
    country: "Australia",
    avatar: "/images/testimonials/avatar-5.jpg",
    rating: 5,
    text: "As Australians, we thought we knew wildlife — but nothing prepares you for Africa. The Okavango Delta mokoro safari was magical, and coming face to face with elephants from a canoe was unreal. Leviva's attention to detail is second to none.",
    tour: "Okavango Delta Luxury Safari",
  },
  {
    id: "6",
    name: "Marie Dubois",
    country: "France",
    avatar: "/images/testimonials/avatar-6.jpg",
    rating: 5,
    text: "Le gorille trekking au Rwanda était extraordinaire! Meeting the mountain gorillas was the most emotional wildlife experience imaginable. Leviva handled all the permits and logistics perfectly. C'est magnifique!",
    tour: "Rwanda Gorilla Trekking",
  },
];

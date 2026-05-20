import { Testimonial, TourPackage } from "./types.js";

export const packages: TourPackage[] = [
  {
    id: "tz-serengeti-migration",
    title: "Great Migration Safari - Northern Tanzania",
    destination: "Tanzania",
    durationDays: 7,
    priceFromUsd: 3490,
    highlights: [
      "Serengeti game drives with expert guides",
      "Ngorongoro Crater wildlife day",
      "Private airport and lodge transfers",
    ],
    idealForMarkets: ["USA", "Europe", "Australia", "New Zealand"],
  },
  {
    id: "zanzibar-luxury-beach",
    title: "Zanzibar Luxury Beach and Culture Escape",
    destination: "Zanzibar",
    durationDays: 5,
    priceFromUsd: 1990,
    highlights: [
      "Stone Town heritage walk",
      "Spice farm and dhow sunset cruise",
      "5-star beachfront stay",
    ],
    idealForMarkets: ["China", "South Korea", "Europe", "USA"],
  },
  {
    id: "botswana-premium-delta",
    title: "Botswana Delta and Chobe Premium Safari",
    destination: "Botswana",
    durationDays: 8,
    priceFromUsd: 5190,
    highlights: [
      "Okavango Delta mokoro safari",
      "Chobe riverfront wildlife cruise",
      "Luxury camp and bush flights",
    ],
    idealForMarkets: ["USA", "Europe", "Australia", "New Zealand"],
  },
  {
    id: "east-africa-signature",
    title: "East Africa Signature Circuit",
    destination: "Tanzania, Kenya and Rwanda",
    durationDays: 10,
    priceFromUsd: 6290,
    highlights: [
      "Serengeti and Masai Mara wildlife tracking",
      "Optional gorilla permit support",
      "Dedicated multilingual trip concierge",
    ],
    idealForMarkets: [
      "China",
      "USA",
      "Europe",
      "South Korea",
      "Australia",
      "New Zealand",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "review-1",
    guestName: "Minghao L.",
    sourceMarket: "China",
    quote:
      "Leviva handled visas, flights, and every transfer. Zanzibar and Serengeti were seamless and premium.",
    trip: "Zanzibar + Serengeti",
  },
  {
    id: "review-2",
    guestName: "Sophie R.",
    sourceMarket: "Europe",
    quote:
      "The team knew exactly how to pace our safari for photography and comfort. Booking support was fast and clear.",
    trip: "Northern Tanzania Safari",
  },
  {
    id: "review-3",
    guestName: "Ethan K.",
    sourceMarket: "Australia",
    quote:
      "Botswana with Leviva was world class. Clear communication, no hidden costs, and incredible guides.",
    trip: "Botswana Delta and Chobe",
  },
];

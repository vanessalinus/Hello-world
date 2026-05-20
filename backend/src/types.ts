export const sourceMarkets = [
  "China",
  "USA",
  "Europe",
  "South Korea",
  "Australia",
  "New Zealand",
] as const;

export type SourceMarket = (typeof sourceMarkets)[number];

export type TourPackage = {
  id: string;
  title: string;
  destination: string;
  durationDays: number;
  priceFromUsd: number;
  highlights: string[];
  idealForMarkets: SourceMarket[];
};

export type Testimonial = {
  id: string;
  guestName: string;
  sourceMarket: SourceMarket;
  quote: string;
  trip: string;
};

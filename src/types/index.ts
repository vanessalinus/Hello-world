export interface Tour {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  duration: number;
  groupSize: number;
  price: number;
  currency: string;
  category: TourCategory;
  difficulty: Difficulty;
  destinations: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  images: string[];
  coverImage: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals: string[];
  accommodation: string;
  activities?: string[];
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  description: string;
  coverImage: string;
  images: string[];
  highlights: string[];
  bestTime: string;
  climate?: string;
  featured: boolean;
}

export interface Review {
  id: string;
  tourId: string;
  name: string;
  country: string;
  rating: number;
  title: string;
  content: string;
  featured: boolean;
}

export interface BookingFormData {
  tourId: string;
  startDate: string;
  adults: number;
  children: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  nationality?: string;
  dietaryRequirements?: string;
  specialRequests?: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone?: string;
  country?: string;
  tourInterest?: string;
  travelDates?: string;
  groupSize?: string;
  budget?: string;
  message: string;
}

export type TourCategory =
  | "SAFARI"
  | "BEACH"
  | "MOUNTAIN"
  | "CULTURAL"
  | "ADVENTURE"
  | "WILDLIFE"
  | "HONEYMOON"
  | "FAMILY"
  | "LUXURY"
  | "BUDGET";

export type Difficulty = "EASY" | "MODERATE" | "CHALLENGING" | "STRENUOUS";

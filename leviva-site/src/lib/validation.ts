import { z } from "zod";

const marketOptions = [
  "China",
  "USA",
  "Europe",
  "South Korea",
  "Australia and New Zealand",
  "Other",
] as const;

const accommodationOptions = [
  "Boutique",
  "Premium",
  "Luxury",
  "Ultra-luxury",
] as const;

const interestOptions = [
  "Safari",
  "Beach",
  "Honeymoon",
  "Family travel",
  "Adventure",
  "Culture",
  "Wellness",
  "Luxury",
] as const;

const destinationOptions = [
  "Zanzibar",
  "Serengeti and Ngorongoro",
  "Tarangire and Lake Manyara",
  "Kilimanjaro and Materuni",
  "Nyerere and Ruaha",
  "Okavango and Chobe",
] as const;

export const bookingSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  email: z.email("Please enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a phone or WhatsApp number."),
  sourceMarket: z.enum(marketOptions),
  residenceCountry: z
    .string()
    .trim()
    .min(2, "Please enter your country of residence."),
  travelerCount: z
    .number({
      error: "Please tell us how many travelers are joining.",
    })
    .int()
    .min(1, "At least one traveler is required.")
    .max(20, "For larger groups, please contact Leviva directly."),
  tripLength: z
    .string()
    .trim()
    .min(3, "Please share your preferred trip length."),
  startDate: z.string().trim().optional(),
  destinations: z
    .array(z.enum(destinationOptions))
    .min(1, "Please choose at least one destination."),
  interests: z.array(z.enum(interestOptions)).min(1, "Select at least one interest."),
  budgetRange: z
    .string()
    .trim()
    .min(3, "Please select or describe your budget range."),
  accommodationStyle: z.enum(accommodationOptions),
  notes: z.string().trim().max(1200).optional(),
  consent: z.literal(true, {
    error: "Consent is required before sending your trip request.",
  }),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const bookingFieldOptions = {
  marketOptions,
  accommodationOptions,
  interestOptions,
  destinationOptions,
};

import { z } from "zod";

export const leadSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(160),
  phone: z.string().trim().min(6, "Please include your phone or WhatsApp number.").max(60),
  country: z.string().trim().min(2, "Please enter your country.").max(80),
  destination: z.string().trim().min(2, "Please select a destination.").max(120),
  travelMonth: z.string().trim().min(2, "Please share your target travel month.").max(80),
  travelers: z.coerce.number().int().min(1).max(80),
  budget: z.string().trim().min(2, "Please choose a budget range.").max(80),
  message: z.string().trim().min(10, "Please tell us a little about your trip.").max(1500),
  sourceMarket: z.string().trim().min(2).max(80),
  honeypot: z.string().max(0).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;

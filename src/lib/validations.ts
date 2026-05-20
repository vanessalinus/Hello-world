import { z } from "zod";

export const bookingSchema = z.object({
  tourId: z.string().optional(),
  tourTitle: z.string().min(1, "Tour is required"),
  destination: z.string().min(1, "Destination is required"),
  startDate: z.string().refine((d) => !isNaN(Date.parse(d)), "Invalid date"),
  travelers: z.coerce.number().int().min(1).max(30),
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(6, "Phone is required"),
  country: z.string().min(2, "Country is required"),
  market: z.string().min(2),
  specialRequests: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
  market: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email(),
  market: z.string().optional(),
});

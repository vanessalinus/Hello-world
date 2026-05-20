import { z } from "zod";
import { sourceMarkets } from "./types.js";

const email = z.string().email("Please provide a valid email.");

export const inquirySchema = z.object({
  fullName: z.string().min(2).max(120),
  email,
  phone: z.string().min(7).max(25),
  sourceMarket: z.enum(sourceMarkets),
  destinationInterest: z.string().min(2).max(150),
  travelMonth: z.string().min(3).max(40),
  travelers: z.number().int().min(1).max(20),
  budgetRange: z.string().min(2).max(60),
  message: z.string().min(15).max(1000),
});

export const bookingSchema = z.object({
  packageId: z.string().min(2).max(100),
  fullName: z.string().min(2).max(120),
  email,
  phone: z.string().min(7).max(25),
  sourceMarket: z.enum(sourceMarkets),
  travelers: z.number().int().min(1).max(20),
  preferredStartDate: z.string().min(6).max(30),
  specialRequests: z.string().max(1000).optional().default(""),
});

export type InquiryPayload = z.infer<typeof inquirySchema>;
export type BookingPayload = z.infer<typeof bookingSchema>;

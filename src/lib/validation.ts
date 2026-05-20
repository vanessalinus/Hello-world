import { z } from "zod";

export const inquirySchema = z.object({
  type: z.enum(["BOOKING", "CONTACT"]).default("BOOKING"),
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a reachable phone number.")
    .max(30)
    .optional()
    .or(z.literal("")),
  departureMarket: z
    .string()
    .trim()
    .min(2, "Please tell us where you are travelling from.")
    .max(60),
  destination: z.string().trim().min(2, "Choose a destination.").max(80),
  travelMonth: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}$/u, "Select an approximate travel month.")
    .optional()
    .or(z.literal("")),
  travelers: z.coerce
    .number()
    .int()
    .min(1, "At least one traveller is required.")
    .max(20, "For larger groups, contact us directly.")
    .optional(),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Tell us about your trip so we can tailor it properly.")
    .max(1200),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

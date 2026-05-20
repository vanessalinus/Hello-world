import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateBookingReference(): string {
  const prefix = "LV";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export const SITE = {
  name: "Leviva Travel & Tours",
  tagline: "East Africa & Botswana — Crafted for World Travelers",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@levivainvestments.co.tz",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+255758996047",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "255758996047",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://leviva-travel.com",
};

export const MARKETS = [
  { code: "cn", label: "China", flag: "🇨🇳" },
  { code: "us", label: "United States", flag: "🇺🇸" },
  { code: "eu", label: "Europe", flag: "🇪🇺" },
  { code: "kr", label: "South Korea", flag: "🇰🇷" },
  { code: "au", label: "Australia", flag: "🇦🇺" },
  { code: "nz", label: "New Zealand", flag: "🇳🇿" },
] as const;

export type MarketCode = (typeof MARKETS)[number]["code"];

export const DESTINATIONS = [
  "Tanzania",
  "Zanzibar",
  "Botswana",
  "Kenya",
  "Uganda",
  "Rwanda",
] as const;

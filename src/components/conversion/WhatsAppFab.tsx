"use client";

import Link from "next/link";
import { SITE } from "@/lib/site";

export function WhatsAppFab() {
  const href = `https://wa.me/${SITE.whatsappE164}?text=${encodeURIComponent(
    "Hi Leviva — I am on your website and would like to plan a trip.",
  )}`;
  return (
    <a
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-600 md:bottom-8"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <svg aria-hidden className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.52 3.48A11.87 11.87 0 0012.05 0C5.55 0 .21 5.34.21 11.91c0 2.1.55 4.15 1.6 5.96L0 24l6.28-1.65a11.8 11.8 0 005.76 1.47h.01c6.5 0 11.84-5.34 11.84-11.91 0-3.18-1.24-6.17-3.37-8.43zM12.06 21.6h-.01a9.4 9.4 0 01-4.78-1.3l-.34-.2-3.98 1.04 1.06-3.88-.22-.35a9.43 9.43 0 01-1.44-5.01c0-5.2 4.24-9.43 9.45-9.43 2.52 0 4.89.98 6.67 2.77a9.36 9.36 0 012.76 6.66c0 5.2-4.24 9.44-9.46 9.44zm5.18-7.07c-.28-.14-1.67-.82-1.92-.91-.26-.1-.45-.14-.63.14-.18.28-.7.91-.86 1.1-.16.18-.32.2-.6.07a7.35 7.35 0 01-2.15-1.33 8.12 8.12 0 01-1.5-1.87c-.15-.28 0-.43.12-.56.12-.12.28-.32.42-.48.14-.16.18-.28.28-.47.09-.18.05-.35-.02-.49-.07-.14-.63-1.52-.86-2.08-.23-.54-.46-.46-.63-.47l-.54-.01c-.18 0-.49.07-.75.35-.26.28-1 1-1 2.43s1.02 2.82 1.16 3.01c.14.18 2 3.06 4.84 4.29.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.67-.68 1.9-1.34.24-.66.24-1.23.17-1.35-.07-.11-.25-.18-.53-.32z" />
      </svg>
    </a>
  );
}

"use client";

import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function FloatingActions() {
  const waMsg = encodeURIComponent(
    "Hi Leviva Travel! I'd like to plan a safari. Please share more details."
  );
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <a
        href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${waMsg}`}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">WhatsApp us</span>
      </a>
      <a
        href={`tel:${siteConfig.contact.phone}`}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-sunset-500 text-white shadow-cta transition hover:scale-105 hover:bg-sunset-600 sm:hidden"
        aria-label="Call Leviva"
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  );
}

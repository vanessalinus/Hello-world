"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/utils";
import { type Locale, t } from "@/lib/i18n";

interface StickyCTAProps {
  locale: Locale;
}

export function StickyCTA({ locale }: StickyCTAProps) {
  const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hi Leviva! I'd like a free safari quote."
  )}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-safari-200 bg-white/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button variant="whatsapp" size="sm" className="w-full">
            <MessageCircle className="h-4 w-4" />
            {t(locale, "cta.whatsapp")}
          </Button>
        </a>
        <Link href="/book" className="flex-1">
          <Button size="sm" className="w-full">
            {t(locale, "nav.book")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

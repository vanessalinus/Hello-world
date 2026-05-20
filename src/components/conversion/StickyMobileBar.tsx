"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";

export function StickyMobileBar() {
  const { copy } = useLocale();
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <Link
          className="flex-1 rounded-full border border-stone-200 py-3 text-center text-sm font-semibold text-stone-800"
          href="/book"
        >
          {copy.nav.book}
        </Link>
        <Link
          className="flex-1 rounded-full bg-amber-600 py-3 text-center text-sm font-semibold text-white shadow-sm"
          href="/book"
        >
          {copy.hero.primary}
        </Link>
      </div>
    </div>
  );
}

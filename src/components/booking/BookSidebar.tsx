"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { SITE } from "@/lib/site";

export function BookSidebar() {
  const { copy } = useLocale();
  return (
    <div className="max-w-xl shrink-0 lg:pt-2">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">
        Leviva · conversion-focused brief
      </p>
      <h1 className="mt-3 font-display text-4xl text-stone-900 sm:text-5xl">
        {copy.book.title}
      </h1>
      <p className="mt-4 text-stone-600">{copy.book.subtitle}</p>
      <ul className="mt-8 space-y-3 text-sm text-stone-700">
        <li className="flex gap-2">
          <span className="text-amber-600">✓</span>
          One form replaces scattered DMs — fewer missed details.
        </li>
        <li className="flex gap-2">
          <span className="text-amber-600">✓</span>
          Budget band + month = meaningful first-pass matching.
        </li>
        <li className="flex gap-2">
          <span className="text-amber-600">✓</span>
          WhatsApp opt-in speeds follow-up across time zones.
        </li>
      </ul>
      <div className="mt-10 rounded-2xl border border-stone-200 bg-white p-5 text-sm text-stone-700 shadow-sm">
        <p className="font-semibold text-stone-900">Direct lines</p>
        <p className="mt-2">
          <a className="text-amber-800 hover:underline" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
        </p>
        <p className="mt-1">
          <a className="text-amber-800 hover:underline" href={`tel:${SITE.phoneE164}`}>
            {SITE.phoneDisplay}
          </a>
        </p>
        <Link
          className="mt-4 inline-block text-sm font-semibold text-amber-800 hover:underline"
          href="/contact"
        >
          {copy.nav.contact} page →
        </Link>
      </div>
    </div>
  );
}

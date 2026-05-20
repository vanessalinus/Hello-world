"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";

export function ConversionStrip() {
  const { copy } = useLocale();
  return (
    <div className="bg-amber-600 py-4 text-center text-sm font-medium text-white">
      {copy.cta.strip}
    </div>
  );
}

export function FinalCTA() {
  const { copy } = useLocale();
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-stone-50 px-6 py-12 text-center shadow-inner sm:px-12">
        <h2 className="font-display text-3xl text-stone-900 sm:text-4xl">
          {copy.cta.finalTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-stone-600">{copy.cta.finalBody}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-stone-900 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-stone-800 sm:w-auto"
            href="/book"
          >
            {copy.hero.primary}
          </Link>
          <Link
            className="inline-flex w-full max-w-xs items-center justify-center rounded-full border border-stone-300 bg-white px-8 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-50 sm:w-auto"
            href="/contact"
          >
            {copy.nav.contact}
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useLocale } from "@/context/LocaleContext";
import { SOURCE_MARKETS } from "@/lib/site";

export function SourceMarkets() {
  const { copy } = useLocale();
  return (
    <section className="border-y border-stone-200 bg-amber-50/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:flex lg:items-center lg:gap-16 lg:px-8 lg:py-20">
        <div className="max-w-xl flex-1">
          <h2 className="font-display text-3xl text-stone-900 sm:text-4xl">
            {copy.markets.title}
          </h2>
          <p className="mt-3 text-stone-700">{copy.markets.body}</p>
        </div>
        <div className="mt-8 flex flex-1 flex-wrap gap-2 lg:mt-0 lg:justify-end">
          {SOURCE_MARKETS.filter((m) => m.id !== "other").map((m) => (
            <span
              key={m.id}
              className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-white px-4 py-2 text-sm font-medium text-stone-800 shadow-sm"
            >
              <span aria-hidden>{m.flag}</span>
              {m.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

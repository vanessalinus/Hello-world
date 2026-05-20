"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { SITE } from "@/lib/site";

export function Hero() {
  const { copy } = useLocale();
  return (
    <section className="relative overflow-hidden bg-stone-950">
      <div className="absolute inset-0">
        <Image
          alt="Sunset over the African savannah"
          className="object-cover opacity-60"
          fill
          priority
          sizes="100vw"
          src="https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=2000&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-stone-900/20" />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28 lg:px-8">
        <div className="max-w-xl space-y-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/90">
            {copy.hero.kicker}
          </p>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {copy.hero.title}
          </h1>
          <p className="text-base leading-relaxed text-stone-200 sm:text-lg">
            {copy.hero.subtitle}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-center text-sm font-semibold text-stone-950 shadow-lg shadow-amber-900/30 transition hover:bg-amber-400"
              href="/book"
            >
              {copy.hero.primary}
            </Link>
            <a
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              href={`https://wa.me/${SITE.whatsappE164}`}
              rel="noreferrer"
              target="_blank"
            >
              {copy.hero.secondary}
            </a>
          </div>
          <ul className="flex flex-wrap gap-4 pt-2 text-xs text-stone-300">
            <li className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              ATOL-style clarity on inclusions
            </li>
            <li className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Fly-in / road hybrid routing
            </li>
            <li className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Zanzibar add-ons
            </li>
          </ul>
        </div>
        <div className="hidden lg:block" />
      </div>
    </section>
  );
}

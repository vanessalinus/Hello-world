"use client";

import { Hero } from "@/components/home/Hero";
import { useLocale } from "@/components/providers/LocaleProvider";

export function HeroClient() {
  const { locale } = useLocale();
  return <Hero locale={locale} />;
}

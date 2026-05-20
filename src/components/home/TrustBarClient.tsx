"use client";

import { TrustBar } from "@/components/home/TrustBar";
import { useLocale } from "@/components/providers/LocaleProvider";

export function TrustBarClient() {
  const { locale } = useLocale();
  return <TrustBar locale={locale} />;
}

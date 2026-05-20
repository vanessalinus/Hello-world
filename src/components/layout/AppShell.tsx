"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { useLocale } from "@/components/providers/LocaleProvider";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { locale, setLocale } = useLocale();

  return (
    <>
      <Header locale={locale} onLocaleChange={setLocale} />
      <main className="min-h-screen pb-20 md:pb-0">{children}</main>
      <Footer locale={locale} />
      <StickyCTA locale={locale} />
    </>
  );
}

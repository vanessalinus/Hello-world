import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { type Locale, t } from "@/lib/i18n";
import { MARKETS } from "@/lib/utils";

interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=85"
        alt="Serengeti safari at golden hour"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="gradient-hero absolute inset-0" />

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-4 flex flex-wrap gap-2">
            {MARKETS.map((m) => (
              <span
                key={m.code}
                className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
              >
                {m.flag} {m.label}
              </span>
            ))}
          </div>

          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {t(locale, "hero.title")}
          </h1>
          <p className="mt-6 text-lg text-safari-100 sm:text-xl">{t(locale, "hero.subtitle")}</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/book">
              <Button size="lg" className="w-full sm:w-auto animate-pulse-soft">
                {t(locale, "hero.cta")}
              </Button>
            </Link>
            <Link href="/tours">
              <Button variant="outline" size="lg" className="w-full border-white/40 text-white hover:bg-white/10 sm:w-auto">
                {t(locale, "hero.secondary")}
              </Button>
            </Link>
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-safari-200">
            <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
            {t(locale, "cta.freeQuote")} · No payment required
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/utils";
import { type Locale, t } from "@/lib/i18n";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";

const navLinks = [
  { href: "/tours", key: "nav.tours" as const },
  { href: "/destinations", key: "nav.destinations" as const },
  { href: "/about", key: "nav.about" as const },
  { href: "/contact", key: "nav.contact" as const },
];

interface HeaderProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export function Header({ locale, onLocaleChange }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-safari-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 flex-col">
          <span className="font-display text-xl font-bold tracking-tight text-forest-800 sm:text-2xl">
            Leviva
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-safari-500 sm:text-xs">
            Travel & Tours
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-safari-700 transition hover:text-terracotta-500"
            >
              {t(locale, link.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitcher locale={locale} onChange={onLocaleChange} />
          <a
            href={`tel:${SITE.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-1 text-sm text-safari-600 hover:text-forest-700"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden lg:inline">{SITE.phone}</span>
          </a>
          <Link href="/book">
            <Button size="sm">{t(locale, "nav.book")}</Button>
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-safari-700 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-safari-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 font-medium text-safari-800"
                onClick={() => setOpen(false)}
              >
                {t(locale, link.key)}
              </Link>
            ))}
            <LocaleSwitcher locale={locale} onChange={onLocaleChange} />
            <Link href="/book" onClick={() => setOpen(false)}>
              <Button className="w-full">{t(locale, "nav.book")}</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

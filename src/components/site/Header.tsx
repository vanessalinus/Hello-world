"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { SITE } from "@/lib/site";

const locales = [
  { id: "en" as const, label: "EN" },
  { id: "zh" as const, label: "中文" },
  { id: "ko" as const, label: "한국어" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { copy, locale, setLocale } = useLocale();

  const linkClass = (href: string) =>
    `rounded-md px-3 py-2 text-sm font-medium transition hover:bg-stone-100 ${
      pathname === href ? "text-amber-900" : "text-stone-700"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link className="flex flex-col leading-tight" href="/">
          <span className="font-display text-xl tracking-tight text-stone-900 sm:text-2xl">
            Leviva
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-800 sm:text-xs">
            Travel & Tours
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link className={linkClass("/")} href="/">
            {copy.nav.home}
          </Link>
          <Link className={linkClass("/destinations")} href="/destinations">
            {copy.nav.destinations}
          </Link>
          <Link className={linkClass("/book")} href="/book">
            {copy.nav.book}
          </Link>
          <Link className={linkClass("/contact")} href="/contact">
            {copy.nav.contact}
          </Link>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <div className="flex rounded-full border border-stone-200 bg-stone-50 p-0.5">
            {locales.map((l) => (
              <button
                key={l.id}
                type="button"
                className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                  locale === l.id
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-500 hover:text-stone-800"
                }`}
                onClick={() => setLocale(l.id)}
              >
                {l.label}
              </button>
            ))}
          </div>
          <a
            className="rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
            href={`https://wa.me/${SITE.whatsappE164}?text=${encodeURIComponent(
              "Hi Leviva — I would like help planning an East Africa trip.",
            )}`}
            rel="noreferrer"
            target="_blank"
          >
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-stone-200 p-2 text-stone-700 md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
            {open ? (
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            ) : (
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div className="border-t border-stone-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            <Link
              className="rounded-md px-3 py-2 text-sm font-medium text-stone-800"
              href="/"
              onClick={() => setOpen(false)}
            >
              {copy.nav.home}
            </Link>
            <Link
              className="rounded-md px-3 py-2 text-sm font-medium text-stone-800"
              href="/destinations"
              onClick={() => setOpen(false)}
            >
              {copy.nav.destinations}
            </Link>
            <Link
              className="rounded-md px-3 py-2 text-sm font-medium text-stone-800"
              href="/book"
              onClick={() => setOpen(false)}
            >
              {copy.nav.book}
            </Link>
            <Link
              className="rounded-md px-3 py-2 text-sm font-medium text-stone-800"
              href="/contact"
              onClick={() => setOpen(false)}
            >
              {copy.nav.contact}
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {locales.map((l) => (
              <button
                key={l.id}
                type="button"
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                  locale === l.id
                    ? "border-amber-600 bg-amber-50 text-amber-900"
                    : "border-stone-200 text-stone-600"
                }`}
                onClick={() => {
                  setLocale(l.id);
                  setOpen(false);
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
          <a
            className="mt-4 flex w-full items-center justify-center rounded-full bg-amber-600 py-3 text-sm font-semibold text-white"
            href={`https://wa.me/${SITE.whatsappE164}`}
            rel="noreferrer"
            target="_blank"
          >
            WhatsApp
          </a>
        </div>
      ) : null}
    </header>
  );
}

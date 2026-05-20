import Link from "next/link";

import { company, navigation } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/92 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-sm font-bold text-slate-950">
            LT
          </div>
          <div>
            <p className="text-base font-semibold">{company.name}</p>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Tanzania and East Africa
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-200 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={company.phoneHref}
            className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5 md:inline-flex"
          >
            Call Leviva
          </a>
          <Link
            href="/book"
            className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 md:px-5"
          >
            Plan trip
          </Link>
        </div>
      </div>
    </header>
  );
}

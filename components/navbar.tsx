"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-savanna-100 bg-ivory/85 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Leviva home">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-acacia-700 font-display text-white">
            L
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-savanna-900">
            Leviva <span className="text-sunset-500">Travel</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-savanna-800 transition hover:text-sunset-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="flex items-center gap-2 text-sm font-medium text-savanna-800 hover:text-sunset-500"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.contact.phone}
          </a>
          <Link href="/book" className="btn-primary !py-2 !px-5 text-sm">
            Plan My Trip
          </Link>
        </div>

        <button
          aria-label="Toggle navigation"
          className="rounded-md p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-savanna-100 bg-ivory transition-all",
          open ? "max-h-[480px]" : "max-h-0"
        )}
      >
        <div className="container flex flex-col gap-1 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-base font-medium text-savanna-900 hover:bg-savanna-100"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/book" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full">
            Plan My Trip
          </Link>
        </div>
      </div>
    </header>
  );
}

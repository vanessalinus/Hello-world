"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const destinations = [
  { name: "Tanzania", href: "/destinations/tanzania" },
  { name: "Zanzibar", href: "/destinations/zanzibar" },
  { name: "Botswana", href: "/destinations/botswana" },
  { name: "East Africa", href: "/destinations/east-africa" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <div>
              <span className="text-xl font-bold text-stone-900 tracking-tight">
                Leviva
              </span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-amber-600 -mt-1">
                Travel & Tours
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-stone-700 hover:text-amber-600 font-medium transition-colors"
            >
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setDestOpen(true)}
              onMouseLeave={() => setDestOpen(false)}
            >
              <button className="flex items-center gap-1 text-stone-700 hover:text-amber-600 font-medium transition-colors">
                Destinations <ChevronDown className="w-4 h-4" />
              </button>
              {destOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-stone-100 py-2 fade-in">
                  {destinations.map((d) => (
                    <Link
                      key={d.href}
                      href={d.href}
                      className="block px-4 py-3 text-stone-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                    >
                      {d.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/tours"
              className="text-stone-700 hover:text-amber-600 font-medium transition-colors"
            >
              Tours
            </Link>
            <Link
              href="/about"
              className="text-stone-700 hover:text-amber-600 font-medium transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-stone-700 hover:text-amber-600 font-medium transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+255758996047"
              className="flex items-center gap-2 text-stone-600 hover:text-amber-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">+255 758 996 047</span>
            </a>
            <Link
              href="/book"
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all hover:shadow-lg booking-pulse"
            >
              Book Now
            </Link>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-stone-800" />
            ) : (
              <Menu className="w-6 h-6 text-stone-800" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-stone-100 fade-in">
          <div className="px-4 py-4 space-y-1">
            <Link
              href="/"
              className="block py-3 px-4 text-stone-700 hover:bg-amber-50 rounded-lg font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <div className="py-2 px-4 text-xs uppercase tracking-wider text-stone-400 font-semibold">
              Destinations
            </div>
            {destinations.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="block py-3 px-8 text-stone-600 hover:bg-amber-50 rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                {d.name}
              </Link>
            ))}
            <Link
              href="/tours"
              className="block py-3 px-4 text-stone-700 hover:bg-amber-50 rounded-lg font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Tours
            </Link>
            <Link
              href="/about"
              className="block py-3 px-4 text-stone-700 hover:bg-amber-50 rounded-lg font-medium"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block py-3 px-4 text-stone-700 hover:bg-amber-50 rounded-lg font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 border-t border-stone-100 space-y-3">
              <a
                href="tel:+255758996047"
                className="flex items-center gap-2 px-4 py-2 text-stone-600"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">+255 758 996 047</span>
              </a>
              <Link
                href="/book"
                className="block text-center bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-semibold mx-4"
                onClick={() => setMobileOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

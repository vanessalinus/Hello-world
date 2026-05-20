"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    label: "Tours",
    href: "/tours",
    children: [
      { label: "All Safari Tours", href: "/tours" },
      { label: "Serengeti Safari", href: "/tours/serengeti-wildebeest-migration-safari" },
      { label: "Zanzibar Beach", href: "/tours/zanzibar-beach-paradise" },
      { label: "Kilimanjaro Climb", href: "/tours/kilimanjaro-summit-climb" },
      { label: "Botswana Safari", href: "/tours/botswana-okavango-delta-safari" },
      { label: "Honeymoon Packages", href: "/tours/honeymoon-zanzibar-safari" },
    ],
  },
  {
    label: "Destinations",
    href: "/destinations",
    children: [
      { label: "Tanzania", href: "/destinations/serengeti" },
      { label: "Zanzibar", href: "/destinations/zanzibar" },
      { label: "Botswana", href: "/destinations/okavango-delta" },
      { label: "Rwanda", href: "/destinations" },
      { label: "Kilimanjaro", href: "/destinations/kilimanjaro" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      )}
    >
      {/* Top bar */}
      <div className={cn(
        "hidden md:flex items-center justify-between px-6 py-2 text-sm transition-all duration-300",
        scrolled ? "bg-brand-600 text-white" : "bg-black/30 text-white"
      )}>
        <div className="flex items-center gap-6">
          <a
            href="mailto:info@levivainvestments.co.tz"
            className="hover:text-brand-200 transition-colors flex items-center gap-1"
          >
            ✉ info@levivainvestments.co.tz
          </a>
          <a
            href="tel:+255758996047"
            className="hover:text-brand-200 transition-colors flex items-center gap-1"
          >
            <Phone size={13} /> +255 758 996 047
          </a>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span>🇨🇳 中文</span>
          <span>🇬🇧 English</span>
          <span>🇰🇷 한국어</span>
          <span>🇩🇪 Deutsch</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg",
            scrolled ? "bg-brand-600" : "bg-brand-500"
          )}>
            L
          </div>
          <div>
            <div className={cn(
              "font-display font-bold text-lg leading-tight",
              scrolled ? "text-gray-900" : "text-white"
            )}>
              Leviva Travel
            </div>
            <div className={cn(
              "text-xs tracking-widest uppercase",
              scrolled ? "text-brand-600" : "text-brand-300"
            )}>
              & Tours
            </div>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className={cn(
                  "flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm",
                  scrolled
                    ? "text-gray-700 hover:text-brand-600 hover:bg-brand-50"
                    : "text-white hover:text-brand-300 hover:bg-white/10"
                )}
              >
                {link.label}
                {link.children && <ChevronDown size={14} className="mt-0.5" />}
              </Link>

              {link.children && activeDropdown === link.label && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className={cn(
              "text-sm font-medium transition-colors",
              scrolled ? "text-gray-600 hover:text-brand-600" : "text-white hover:text-brand-300"
            )}
          >
            Get Free Quote
          </Link>
          <Link
            href="/booking"
            className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "md:hidden p-2 rounded-lg transition-colors",
            scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
          )}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-700 font-medium hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 border-l-2 border-brand-100 pl-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-brand-600 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-gray-100">
              <Link
                href="/booking"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Book Your Safari Now
              </Link>
              <div className="mt-3 text-center">
                <a href="tel:+255758996047" className="text-sm text-gray-600">
                  📞 +255 758 996 047
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

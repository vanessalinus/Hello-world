import Link from "next/link";
import { Mail, MapPin, Phone, Instagram, Facebook, Youtube } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/site";
import { NewsletterForm } from "@/components/newsletter-form";

export function Footer() {
  return (
    <footer className="mt-16 bg-savanna-950 text-savanna-100">
      <div className="container grid gap-12 py-14 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-acacia-500 font-display text-white">
              L
            </span>
            <div>
              <p className="font-display text-xl font-bold text-white">Leviva Travel</p>
              <p className="text-xs uppercase tracking-widest text-savanna-300">
                {siteConfig.legalName}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-savanna-200">
            East Africa's curated safari & beach specialists. Serving travellers from China, USA,
            Europe, South Korea, Australia and New Zealand.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full bg-savanna-900 p-2 hover:bg-acacia-600">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-full bg-savanna-900 p-2 hover:bg-acacia-600">
              <Facebook className="h-4 w-4" />
            </a>
            <a href={siteConfig.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="rounded-full bg-savanna-900 p-2 hover:bg-acacia-600">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-white">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-savanna-200 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/book" className="text-savanna-200 hover:text-white">Booking</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-savanna-200">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-acacia-300" />
              <span>{siteConfig.contact.address}</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-acacia-300" />
              <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-acacia-300" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white break-all">
                {siteConfig.contact.email}
              </a>
            </li>
          </ul>
          <div className="mt-5 text-xs uppercase tracking-widest text-savanna-300">
            Languages spoken
          </div>
          <div className="mt-2 text-sm text-savanna-200">
            {siteConfig.languages.join(" · ")}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold text-white">Travel inspiration</h4>
          <p className="mt-4 text-sm text-savanna-200">
            Subscribe for exclusive offers, migration calendars and last-minute departures.
          </p>
          <div className="mt-4">
            <NewsletterForm dark />
          </div>
        </div>
      </div>

      <div className="border-t border-savanna-900">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-savanna-300 md:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <p>
            Designed for travellers from 🇨🇳 🇺🇸 🇪🇺 🇰🇷 🇦🇺 🇳🇿 — Karibu Africa.
          </p>
        </div>
      </div>
    </footer>
  );
}

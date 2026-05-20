import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { SITE, MARKETS, DESTINATIONS } from "@/lib/utils";
import { type Locale, t } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    "Hello Leviva! I am interested in planning a safari to East Africa."
  )}`;

  return (
    <footer className="border-t border-safari-200 bg-safari-950 text-safari-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-bold text-white">Leviva</p>
            <p className="mt-2 text-sm text-safari-300">{t(locale, "footer.tagline")}</p>
            <div className="mt-6 space-y-3 text-sm">
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2 hover:text-terracotta-400"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {SITE.email}
              </a>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 hover:text-terracotta-400"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {SITE.phone}
              </a>
              <p className="flex items-start gap-2 text-safari-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                Arusha & Dar es Salaam, Tanzania
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">Destinations</h3>
            <ul className="mt-4 space-y-2 text-sm text-safari-300">
              {DESTINATIONS.map((d) => (
                <li key={d}>
                  <Link href={`/destinations#${d.toLowerCase()}`} className="hover:text-white">
                    {d}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">Traveler Regions</h3>
            <ul className="mt-4 space-y-2 text-sm text-safari-300">
              {MARKETS.map((m) => (
                <li key={m.code}>
                  {m.flag} {m.label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-safari-300">
              <li>
                <Link href="/tours" className="hover:text-white">
                  All Tours
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-white">
                  Book a Safari
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-safari-800 pt-8 text-sm text-safari-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Leviva Travel & Tours. All rights reserved.</p>
          <p>Licensed tour operator · ATOL-ready partnerships · Fully insured vehicles</p>
        </div>
      </div>
    </footer>
  );
}

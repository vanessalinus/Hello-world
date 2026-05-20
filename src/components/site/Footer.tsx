import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
        <div className="max-w-md space-y-4">
          <p className="font-display text-2xl text-stone-900">{SITE.name}</p>
          <p className="text-sm leading-relaxed text-stone-600">
            Tailored East Africa itineraries with clear inclusions, realistic
            driving times, and camps matched to your budget band.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Contact
            </p>
            <ul className="mt-3 space-y-2 text-sm text-stone-700">
              <li>
                <a
                  className="hover:text-amber-900"
                  href={`mailto:${SITE.email}`}
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-amber-900"
                  href={`tel:${SITE.phoneE164.replace(/\s/g, "")}`}
                >
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  className="font-medium text-amber-900 hover:underline"
                  href={`https://wa.me/${SITE.whatsappE164}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  WhatsApp (fastest)
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Explore
            </p>
            <ul className="mt-3 space-y-2 text-sm text-stone-700">
              <li>
                <Link className="hover:text-amber-900" href="/destinations">
                  Destinations
                </Link>
              </li>
              <li>
                <Link className="hover:text-amber-900" href="/book">
                  Plan a trip
                </Link>
              </li>
              <li>
                <Link className="hover:text-amber-900" href="/privacy">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-stone-200 bg-stone-100/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</span>
          <span className="text-stone-400">
            A travel brand of Leviva Investments — Tanzania.
          </span>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

import { company, navigation } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.3fr_0.8fr_0.9fr] lg:px-8">
        <div>
          <p className="text-lg font-semibold">{company.name}</p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
            Conversion-focused safari, beach, and multi-country East Africa
            journeys designed for travelers from China, the USA, Europe, South
            Korea, Australia, and New Zealand.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
            Explore
          </p>
          <div className="mt-4 space-y-3 text-sm text-slate-200">
            {navigation.map((item) => (
              <div key={item.href}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
            Contact
          </p>
          <div className="mt-4 space-y-3 text-sm text-slate-200">
            <p>{company.headquarters}</p>
            <a href={`mailto:${company.email}`} className="block hover:text-white">
              {company.email}
            </a>
            <a href={company.phoneHref} className="block hover:text-white">
              {company.phone}
            </a>
            <a href={company.whatsappHref} className="block hover:text-white">
              WhatsApp Leviva
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

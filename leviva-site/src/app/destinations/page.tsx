import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { destinations } from "@/lib/content";

export const metadata = {
  title: "Destinations",
  description:
    "Explore Tanzania, Zanzibar, Botswana, and East Africa destination pages designed for safari, beach, honeymoon, and adventure bookings.",
};

export default function DestinationsPage() {
  return (
    <main className="bg-white">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">
            Leviva destinations
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            Tanzania, Zanzibar, Botswana, and the journeys most likely to book
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            This destination hub gives Leviva a stronger way to present trip
            options, show ideal trip length, and move travelers into the booking
            funnel with clearer decisions.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading
          eyebrow="Browse by route"
          title="Destination stories with pricing anchors and conversion-focused detail"
          description="Each page is structured to answer the core booking questions: where to go, how long to stay, what the trip feels like, and what to do next."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {destinations.map((destination) => (
            <article
              key={destination.slug}
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg shadow-slate-200/60"
            >
              <div
                className={`bg-gradient-to-br ${destination.heroGradient} p-8 text-white`}
              >
                <p className="text-sm uppercase tracking-[0.22em] text-white/80">
                  {destination.country} - {destination.region}
                </p>
                <h2 className="mt-3 text-3xl font-semibold">{destination.name}</h2>
                <p className="mt-4 text-sm leading-7 text-white/90">
                  {destination.summary}
                </p>
              </div>
              <div className="p-8">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Stay
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-950">
                      {destination.idealDuration}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Best window
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-950">
                      {destination.seasonalWindow}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Guide price
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-950">
                      {destination.priceFrom}
                    </p>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-600">
                  {destination.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-teal-600" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-medium text-slate-700">
                    Best for: {destination.bestFor.join(", ")}
                  </p>
                  <Link
                    href={`/destinations/${destination.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700"
                  >
                    View destination
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

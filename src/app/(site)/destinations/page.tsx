import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { DESTINATIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Tanzania, Zanzibar, Botswana, and broader East Africa — sample routings for international travellers.",
};

export default function DestinationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl text-stone-900 sm:text-5xl">
          Destinations we live in
        </h1>
        <p className="mt-4 text-lg text-stone-600">
          Each page outlines realistic pacing, best seasons, and how we typically
          combine bush and beach for guests arriving from Asia, North America,
          Europe, or Oceania.
        </p>
      </header>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {DESTINATIONS.map((d) => (
          <Link
            key={d.slug}
            className="group flex overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md"
            href={`/destinations/${d.slug}`}
          >
            <div className="relative w-2/5 min-h-[200px] shrink-0">
              <Image
                alt={d.headline}
                className="object-cover"
                fill
                sizes="40vw"
                src={d.image}
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                {d.country}
              </p>
              <h2 className="mt-1 font-display text-2xl text-stone-900">
                {d.headline}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-stone-600">
                {d.summary}
              </p>
              <span className="mt-auto pt-4 text-sm font-semibold text-amber-800 group-hover:underline">
                Open destination guide
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

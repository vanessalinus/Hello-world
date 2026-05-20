import Link from "next/link";
import Image from "next/image";
import { DESTINATIONS } from "@/lib/site";

export function DestinationShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl text-stone-900 sm:text-4xl">
          Signature destinations
        </h2>
        <p className="mt-3 text-stone-600">
          Start with Tanzania and Zanzibar, add Botswana for water camps, or
          stitch a multi-country primate extension — routing is optimised for
          intercontinental arrivals.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DESTINATIONS.map((d) => (
          <Link
            key={d.slug}
            className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            href={`/destinations/${d.slug}`}
          >
            <div className="relative aspect-[4/3]">
              <Image
                alt={d.headline}
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                src={d.image}
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                {d.country}
              </p>
              <h3 className="font-display text-xl text-stone-900">{d.headline}</h3>
              <p className="line-clamp-3 text-sm text-stone-600">{d.summary}</p>
              <span className="mt-auto pt-3 text-sm font-semibold text-amber-800 group-hover:underline">
                View sample routing →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

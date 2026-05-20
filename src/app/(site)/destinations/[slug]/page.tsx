import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DESTINATIONS, getDestination } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return {};
  return {
    title: `${d.country} — ${d.headline}`,
    description: d.summary,
    openGraph: {
      title: `${d.country} with Leviva`,
      description: d.summary,
      images: [{ url: d.image }],
    },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();

  return (
    <article className="pb-16">
      <div className="relative h-[min(70vh,520px)] w-full">
        <Image
          alt={d.headline}
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src={d.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
        <div className="absolute bottom-0 mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
            {d.country}
          </p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl text-white sm:text-5xl">
            {d.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-200">{d.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              className="rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-stone-950 shadow-lg hover:bg-amber-400"
              href="/book"
            >
              Request a routed quote
            </Link>
            <Link
              className="rounded-full border border-white/40 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
              href="/destinations"
            >
              All destinations
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl text-stone-900">How we structure trips</h2>
          <ul className="mt-4 space-y-3 text-stone-700">
            {d.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-stone-600">
            International routings differ by origin — we factor jet-lag buffers,
            single-entry vs multi-entry visas when combining countries, and
            realistic domestic flight timing (early Tanzanian departures are
            common).
          </p>
        </div>
        <aside className="h-fit rounded-2xl border border-amber-200 bg-amber-50/60 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-900">
            Seasonality snapshot
          </p>
          <p className="mt-3 text-sm text-stone-800">{d.bestTime}</p>
          <p className="mt-4 text-xs text-stone-600">
            Final lodge availability and pricing are confirmed at proposal stage —
            this window is indicative only.
          </p>
        </aside>
      </div>
    </article>
  );
}

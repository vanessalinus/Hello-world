import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TourCard } from "@/components/tour-card";
import { parseJSON } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

export const revalidate = 600;

export async function generateStaticParams() {
  const destinations = await prisma.destination.findMany({ select: { slug: true } });
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const destination = await prisma.destination.findUnique({ where: { slug: params.slug } });
  if (!destination) return { title: "Destination not found" };
  return {
    title: `${destination.name} Tours & Safaris`,
    description: destination.tagline
  };
}

export default async function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const destination = await prisma.destination.findUnique({
    where: { slug: params.slug },
    include: { tours: { include: { destination: true }, orderBy: { priceUsd: "asc" } } }
  });

  if (!destination) notFound();

  const highlights = parseJSON<string[]>(destination.highlights, []);

  return (
    <div>
      <section className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <Image src={destination.heroImage} alt={destination.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="container relative flex h-full flex-col justify-end pb-12 text-white">
          <p className="text-sm uppercase tracking-widest text-savanna-200">{destination.country}</p>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{destination.name}</h1>
          <p className="mt-2 max-w-2xl text-lg text-white/90">{destination.tagline}</p>
        </div>
      </section>

      <section className="container py-14">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <article className="prose prose-savanna max-w-none">
            <h2 className="font-display text-2xl font-bold text-savanna-900">About {destination.name}</h2>
            <p className="text-savanna-800">{destination.description}</p>
          </article>
          <aside className="rounded-2xl bg-acacia-50 p-6">
            <h3 className="font-display text-xl font-bold text-savanna-900">Highlights</h3>
            <ul className="mt-4 space-y-2 text-sm text-savanna-800">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-acacia-700" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="container pb-16">
        <h2 className="section-heading mb-8">Tours in {destination.name}</h2>
        {destination.tours.length === 0 ? (
          <p className="text-savanna-700">More tours coming soon — contact us for a custom itinerary.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destination.tours.map((t) => (
              <TourCard
                key={t.id}
                tour={{
                  slug: t.slug,
                  title: t.title,
                  summary: t.summary,
                  durationDays: t.durationDays,
                  priceUsd: t.priceUsd,
                  ratingAvg: t.ratingAvg,
                  reviewsCount: t.reviewsCount,
                  heroImage: t.heroImage,
                  category: t.category,
                  destination: { slug: t.destination.slug, name: t.destination.name }
                }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

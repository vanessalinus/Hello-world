import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { TourCard } from "@/components/tour-card";

export const metadata: Metadata = {
  title: "All Safaris & Tours",
  description:
    "Explore every Leviva Travel safari and tour across Tanzania, Zanzibar, Botswana, Kenya, Rwanda and Uganda."
};

export const revalidate = 600;

export default async function ToursPage({
  searchParams
}: {
  searchParams: { destination?: string; category?: string };
}) {
  const tours = await prisma.tour.findMany({
    where: {
      destination: searchParams.destination
        ? { slug: searchParams.destination }
        : undefined,
      category: searchParams.category || undefined
    },
    include: { destination: true },
    orderBy: { priceUsd: "asc" }
  });

  const categories = Array.from(new Set(tours.map((t) => t.category)));

  return (
    <div className="container py-14">
      <div className="mb-10 max-w-3xl">
        <span className="section-eyebrow">Safaris &amp; tours</span>
        <h1 className="section-heading">Ready-to-book itineraries</h1>
        <p className="mt-2 text-savanna-700">
          Every itinerary can be fully customised — talk to a designer for free.
        </p>
      </div>

      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span key={c} className="chip">{c}</span>
          ))}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((t) => (
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
    </div>
  );
}

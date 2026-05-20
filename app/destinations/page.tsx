import type { Metadata } from "next";
import { DestinationCard } from "@/components/destination-card";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Destinations — Tanzania, Zanzibar, Botswana & East Africa",
  description:
    "Browse our curated East and Southern African destinations: Tanzania, Zanzibar, Botswana, Kenya, Rwanda and Uganda."
};

export const revalidate = 600;

export default async function DestinationsPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { tours: true } } }
  });

  return (
    <div className="container py-14">
      <div className="mb-10 max-w-3xl">
        <span className="section-eyebrow">Destinations</span>
        <h1 className="section-heading">Where would you like to go?</h1>
        <p className="mt-2 text-savanna-700">
          Curated by destination experts on the ground in Tanzania. Each destination can be enjoyed
          on its own or combined into a multi-country itinerary.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((d) => (
          <DestinationCard
            key={d.id}
            destination={{
              slug: d.slug,
              name: d.name,
              country: d.country,
              tagline: d.tagline,
              heroImage: d.heroImage,
              tourCount: d._count.tours
            }}
          />
        ))}
      </div>
    </div>
  );
}

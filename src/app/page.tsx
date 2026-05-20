import { HeroClient } from "@/components/home/HeroClient";
import { TrustBarClient } from "@/components/home/TrustBarClient";
import { DestinationsPreview } from "@/components/home/DestinationsPreview";
import { ConversionSection } from "@/components/home/ConversionSection";
import { Testimonials } from "@/components/home/Testimonials";
import { TourCard } from "@/components/tours/TourCard";
import { getTours } from "@/lib/tours";
import Link from "next/link";
import { HomeClient } from "@/components/home/HomeClient";

export default async function HomePage() {
  const featuredTours = await getTours({ featured: true });

  return (
    <>
      <HomeClient />
      <HeroClient />
      <TrustBarClient />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-3xl font-bold text-safari-950 sm:text-4xl">
                Featured Safaris
              </h2>
              <p className="mt-2 text-safari-600">
                Our most booked experiences — limited seasonal availability.
              </p>
            </div>
            <Link
              href="/tours"
              className="font-medium text-terracotta-600 hover:text-terracotta-500"
            >
              View all tours →
            </Link>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} featured />
            ))}
          </div>
        </div>
      </section>
      <DestinationsPreview />
      <ConversionSection />
      <Testimonials />
    </>
  );
}

import { TourCard } from "@/components/tours/TourCard";
import { getTours } from "@/lib/tours";
import Link from "next/link";

export const metadata = {
  title: "Safari Tours & Packages",
  description:
    "Browse Leviva's Tanzania, Zanzibar, Botswana, and East Africa safari packages. Book your adventure today.",
};

export default async function ToursPage() {
  const tours = await getTours();

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-safari-950 sm:text-5xl">
            Safari Tours & Packages
          </h1>
          <p className="mt-4 text-lg text-safari-600">
            Handcrafted itineraries for international travelers. All prices shown are
            starting rates per person — custom quotes available for your group.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {["All", "Tanzania", "Zanzibar", "Botswana", "Kenya", "Uganda", "Rwanda"].map(
            (filter) => (
              <span
                key={filter}
                className="rounded-full bg-safari-200 px-4 py-1.5 text-sm font-medium text-safari-800"
              >
                {filter}
              </span>
            )
          )}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} featured={tour.featured} />
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-forest-800 p-8 text-center text-white sm:p-12">
          <h2 className="font-display text-2xl font-bold">Can&apos;t find your perfect tour?</h2>
          <p className="mx-auto mt-3 max-w-xl text-safari-200">
            We design fully custom private safaris. Tell us your dates, budget, and interests.
          </p>
          <Link
            href="/book"
            className="mt-6 inline-flex rounded-full bg-terracotta-500 px-8 py-3 font-semibold hover:bg-terracotta-600"
          >
            Request Custom Itinerary
          </Link>
        </div>
      </div>
    </div>
  );
}

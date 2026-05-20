import type { Metadata } from "next";
import TourCard from "@/components/TourCard";
import { tours } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tour Packages",
  description:
    "Browse all Leviva Travel tour packages — Tanzania safaris, Zanzibar beach holidays, Botswana luxury camps, Kilimanjaro treks, and East Africa adventures.",
};

export default function ToursPage() {
  const categories = [
    { key: "all", label: "All Tours" },
    { key: "safari", label: "Safari" },
    { key: "beach", label: "Beach" },
    { key: "adventure", label: "Adventure" },
    { key: "luxury", label: "Luxury" },
    { key: "cultural", label: "Cultural" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl font-bold mb-4">Our Tour Packages</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            From budget-friendly group safaris to exclusive luxury fly-in camps
            — find your perfect African adventure.
          </p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((cat) => (
              <span
                key={cat.key}
                className="px-5 py-2 rounded-full bg-white border border-stone-200 text-stone-700 font-medium text-sm hover:bg-amber-50 hover:border-amber-300 cursor-pointer transition-colors"
              >
                {cat.label}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

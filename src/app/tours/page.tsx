import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, Users, Star, Filter, ArrowRight } from "lucide-react";
import { tours } from "@/data/tours";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "All Safari Tours | Tanzania, Zanzibar, Botswana & East Africa",
  description:
    "Browse all Leviva Travel safari tours – Serengeti, Zanzibar, Kilimanjaro, Botswana Okavango, Rwanda gorillas. Filter by destination, duration, and budget.",
};

const categories = [
  { label: "All Tours", value: "all" },
  { label: "Safari", value: "SAFARI" },
  { label: "Beach", value: "BEACH" },
  { label: "Mountain", value: "MOUNTAIN" },
  { label: "Wildlife", value: "WILDLIFE" },
  { label: "Honeymoon", value: "HONEYMOON" },
  { label: "Family", value: "FAMILY" },
];

const categoryColors: Record<string, string> = {
  SAFARI: "bg-amber-100 text-amber-800",
  BEACH: "bg-blue-100 text-blue-800",
  MOUNTAIN: "bg-gray-100 text-gray-800",
  WILDLIFE: "bg-green-100 text-green-800",
  HONEYMOON: "bg-pink-100 text-pink-800",
  FAMILY: "bg-purple-100 text-purple-800",
  CULTURAL: "bg-orange-100 text-orange-800",
  ADVENTURE: "bg-red-100 text-red-800",
  LUXURY: "bg-yellow-100 text-yellow-800",
  BUDGET: "bg-teal-100 text-teal-800",
};

export default function ToursPage({
  searchParams,
}: {
  searchParams: { category?: string; destination?: string; q?: string };
}) {
  const { category = "all", destination, q } = searchParams;

  const filtered = tours.filter((tour) => {
    if (category && category !== "all" && tour.category !== category) return false;
    if (destination && !tour.destinations.some((d) => d.toLowerCase().includes(destination.toLowerCase()))) return false;
    if (q && !tour.title.toLowerCase().includes(q.toLowerCase()) && !tour.description.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-gray-900 pt-28 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
              East Africa Safari Tours
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover {tours.length} extraordinary adventures across Tanzania, Zanzibar,
              Botswana, Rwanda, and beyond. Every tour is fully customizable.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
            {categories.map((cat) => (
              <Link
                key={cat.value}
                href={cat.value === "all" ? "/tours" : `/tours?category=${cat.value}`}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === cat.value || (cat.value === "all" && !category)
                    ? "bg-brand-500 text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600">
            Showing <strong>{filtered.length}</strong> tours
            {q && <span className="ml-1">for "<em>{q}</em>"</span>}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Filter size={14} />
            <span>Sort: Featured first</span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No tours found for your search.</p>
            <Link href="/tours" className="text-brand-600 mt-4 inline-block">
              View all tours →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((tour) => (
              <Link
                key={tour.id}
                href={`/tours/${tour.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={tour.coverImage}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[tour.category] || "bg-gray-100 text-gray-800"}`}>
                      {tour.category}
                    </span>
                    {tour.featured && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-500 text-white">
                        FEATURED
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                    {tour.rating} ({tour.reviewCount})
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="font-bold text-gray-900 text-lg leading-snug mb-2 group-hover:text-brand-600 transition-colors">
                    {tour.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{tour.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-brand-400" />
                      {tour.duration} days
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} className="text-brand-400" />
                      Max {tour.groupSize}
                    </span>
                    <span className="capitalize text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                      {tour.difficulty.toLowerCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-500">From</span>
                      <div className="text-2xl font-bold text-brand-600">
                        {formatPrice(tour.price, tour.currency)}
                      </div>
                      <span className="text-xs text-gray-400">per person</span>
                    </div>
                    <span className="flex items-center gap-1 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                      View Details <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Custom tour CTA */}
      <div className="bg-brand-50 py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-gray-600 mb-8">
            We specialize in fully customized safaris. Tell us your dream and we'll make it happen.
            Private groups, special occasions, multi-country adventures – nothing is too complex.
          </p>
          <Link
            href="/contact"
            className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
          >
            Request a Custom Tour
          </Link>
        </div>
      </div>
    </div>
  );
}

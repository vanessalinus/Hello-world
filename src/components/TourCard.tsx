import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Tour } from "@/data/tours";

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden card-shadow">
      <div className="relative h-64 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{
            backgroundImage: `url(${getTourImage(tour.slug)})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full">
            {tour.category}
          </span>
          {tour.featured && (
            <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
              Featured
            </span>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-1 text-yellow-400 text-sm">
            {"★".repeat(Math.floor(tour.rating))}
            <span className="text-white ml-1">
              {tour.rating} ({tour.reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {tour.destination}
          <span className="mx-1">•</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {tour.duration}
        </div>

        <h3
          className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {tour.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tour.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-sm text-gray-500">From</span>
            <div className="text-2xl font-bold text-primary-600">
              {formatPrice(tour.price)}
            </div>
            <span className="text-xs text-gray-400">per person</span>
          </div>
          <Link
            href={`/tours/${tour.slug}`}
            className="btn-primary !py-3 !px-5 text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

function getTourImage(slug: string): string {
  const images: Record<string, string> = {
    "serengeti-migration-safari":
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
    "kilimanjaro-summit-trek":
      "https://images.unsplash.com/photo-1621414050946-1b936a78491d?auto=format&fit=crop&w=800&q=80",
    "zanzibar-beach-spice-retreat":
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80",
    "botswana-okavango-delta-safari":
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    "tarangire-lake-manyara-safari":
      "https://images.unsplash.com/photo-1535338454528-1b22dc20be8e?auto=format&fit=crop&w=800&q=80",
    "chobe-victoria-falls-adventure":
      "https://images.unsplash.com/photo-1568454537842-d933259bb258?auto=format&fit=crop&w=800&q=80",
    "rwanda-gorilla-trekking":
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=800&q=80",
    "maasai-mara-amboseli-kenya":
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=80",
  };
  return images[slug] || "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80";
}

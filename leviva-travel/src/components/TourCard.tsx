import Link from "next/link";
import { Star, Clock, MapPin } from "lucide-react";
import type { Tour } from "@/lib/data";

export default function TourCard({ tour }: { tour: Tour }) {
  const discount = tour.originalPrice
    ? Math.round(((tour.originalPrice - tour.price) / tour.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-stone-100">
      <div className="relative overflow-hidden">
        <div
          className="h-64 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
          style={{ backgroundImage: `url(${tour.image})` }}
        />
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
            {discount}% OFF
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-stone-800 text-sm font-semibold px-3 py-1 rounded-full capitalize">
          {tour.category}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-stone-500 mb-3">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {tour.destination}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {tour.duration}
          </span>
        </div>
        <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-amber-600 transition-colors">
          {tour.title}
        </h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {tour.description}
        </p>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(tour.rating)
                    ? "text-amber-400 fill-amber-400"
                    : "text-stone-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-stone-500">
            {tour.rating} ({tour.reviews} reviews)
          </span>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <div>
            <span className="text-sm text-stone-500">From</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-emerald-600">
                ${tour.price.toLocaleString()}
              </span>
              {tour.originalPrice && (
                <span className="text-sm text-stone-400 line-through">
                  ${tour.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-xs text-stone-500">per person</span>
          </div>
          <Link
            href={`/tours/${tour.id}`}
            className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all hover:shadow-lg"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

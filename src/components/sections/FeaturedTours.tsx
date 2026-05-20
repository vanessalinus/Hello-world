"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Users, Star, ArrowRight, Flame } from "lucide-react";
import { Tour } from "@/types";
import { formatPrice } from "@/lib/utils";

interface FeaturedToursProps {
  tours: Tour[];
}

export default function FeaturedTours({ tours }: FeaturedToursProps) {
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

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Flame size={14} />
            Most Popular Tours
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Unforgettable East Africa Experiences
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handcrafted safari adventures across Tanzania, Zanzibar, Botswana, and Rwanda.
            Each journey is tailored to create memories that last a lifetime.
          </p>
        </div>

        {/* Tour grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.slice(0, 6).map((tour, index) => (
            <Link
              key={tour.id}
              href={`/tours/${tour.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={tour.coverImage}
                  alt={tour.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      categoryColors[tour.category] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {tour.category}
                  </span>
                  {index === 0 && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-500 text-white">
                      BESTSELLER
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                  <Star size={11} className="text-yellow-400 fill-yellow-400" />
                  {tour.rating} ({tour.reviewCount})
                </div>

                {/* Duration on image */}
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="text-xs text-white/70">{tour.destinations.join(", ")}</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-lg leading-snug mb-1 group-hover:text-brand-600 transition-colors">
                  {tour.title}
                </h3>
                {tour.subtitle && (
                  <p className="text-sm text-gray-500 mb-3">{tour.subtitle}</p>
                )}

                {/* Highlights */}
                <ul className="space-y-1 mb-4">
                  {tour.highlights.slice(0, 2).map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-brand-500 mt-0.5">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Meta */}
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

                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500">From</span>
                    <div className="text-2xl font-bold text-brand-600">
                      {formatPrice(tour.price, tour.currency)}
                    </div>
                    <span className="text-xs text-gray-400">per person</span>
                  </div>
                  <span className="flex items-center gap-1 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                    Book Now
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-12">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 border-2 border-brand-500 text-brand-600 hover:bg-brand-500 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
          >
            View All Tours
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { Destination } from "@/types";

interface DestinationsSectionProps {
  destinations: Destination[];
}

export default function DestinationsSection({ destinations }: DestinationsSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
            <MapPin size={14} />
            Our Destinations
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Discover East Africa's Greatest Wonders
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From the endless plains of the Serengeti to the turquoise waters of Zanzibar
            and the pristine wilderness of Botswana's Okavango Delta
          </p>
        </div>

        {/* Destination grid - asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Large featured destination */}
          {destinations[0] && (
            <Link
              href={`/destinations/${destinations[0].slug}`}
              className="md:col-span-7 group relative h-80 md:h-[480px] rounded-2xl overflow-hidden"
            >
              <Image
                src={destinations[0].coverImage}
                alt={destinations[0].name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-brand-300 text-sm mb-2">
                  <MapPin size={14} />
                  {destinations[0].country}
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-2">
                  {destinations[0].name}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2 mb-3">
                  {destinations[0].description.substring(0, 100)}...
                </p>
                <div className="flex items-center gap-2 text-brand-300 font-semibold text-sm">
                  Explore
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          )}

          {/* Right column */}
          <div className="md:col-span-5 flex flex-col gap-4">
            {destinations.slice(1, 3).map((dest) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.slug}`}
                className="group relative h-56 rounded-2xl overflow-hidden"
              >
                <Image
                  src={dest.coverImage}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-1 text-brand-300 text-xs mb-1">
                    <MapPin size={11} />
                    {dest.country}
                  </div>
                  <h3 className="text-xl font-display font-bold text-white">{dest.name}</h3>
                  <div className="flex items-center gap-1 text-brand-300 font-medium text-xs mt-1">
                    Explore <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom row */}
          {destinations.slice(3, 6).map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.slug}`}
              className="md:col-span-4 group relative h-52 rounded-2xl overflow-hidden"
            >
              <Image
                src={dest.coverImage}
                alt={dest.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-1 text-brand-300 text-xs mb-1">
                  <MapPin size={11} />
                  {dest.country}
                </div>
                <h3 className="text-lg font-bold text-white">{dest.name}</h3>
                <p className="text-white/70 text-xs">Best time: {dest.bestTime}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold"
          >
            View All Destinations
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { destinations } from "@/data/destinations";

export const metadata: Metadata = {
  title: "East Africa Destinations | Tanzania, Zanzibar, Botswana & More",
  description:
    "Explore East Africa's greatest destinations with Leviva Travel. Serengeti, Zanzibar, Ngorongoro Crater, Okavango Delta, Kilimanjaro and more.",
};

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 pt-28 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
            East Africa Destinations
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover the world's most extraordinary wildlife destinations, from Tanzania's
            endless plains to Botswana's watery wilderness
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={dest.coverImage}
                  alt={dest.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                  {dest.country}
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-1 text-brand-300 text-xs mb-1">
                    <MapPin size={11} />
                    {dest.country}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-brand-600 transition-colors">
                  {dest.name}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {dest.description.substring(0, 120)}...
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Clock size={14} className="text-brand-400" />
                  Best time: {dest.bestTime}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {dest.highlights.slice(0, 3).map((h) => (
                    <span key={h} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {h}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-brand-600 font-semibold text-sm">
                  Explore Destination
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

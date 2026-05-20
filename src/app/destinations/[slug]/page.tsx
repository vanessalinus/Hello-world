import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Sun, Clock, ChevronRight, CheckCircle, ArrowRight } from "lucide-react";
import { getDestinationBySlug, destinations } from "@/data/destinations";
import { tours } from "@/data/tours";
import { formatPrice } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dest = getDestinationBySlug(params.slug);
  if (!dest) return { title: "Destination Not Found" };
  return {
    title: `${dest.name}, ${dest.country} | Leviva Travel`,
    description: dest.description.substring(0, 160),
    openGraph: {
      title: `${dest.name} | East Africa`,
      description: dest.description.substring(0, 160),
      images: [{ url: dest.coverImage, width: 1200, height: 630, alt: dest.name }],
    },
  };
}

export default function DestinationPage({ params }: Props) {
  const dest = getDestinationBySlug(params.slug);
  if (!dest) notFound();

  const relatedTours = tours.filter((t) =>
    t.destinations.some((d) => d.toLowerCase().includes(dest.name.toLowerCase().split(" ")[0]))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-[65vh] min-h-[500px] overflow-hidden">
        <Image
          src={dest.coverImage}
          alt={dest.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 md:px-8 pb-12 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <Link href="/destinations" className="hover:text-white">Destinations</Link>
            <ChevronRight size={14} />
            <span className="text-white">{dest.name}</span>
          </div>
          <div className="flex items-center gap-2 text-brand-300 text-sm mb-3">
            <MapPin size={14} />
            {dest.country}
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-3">
            {dest.name}
          </h1>
          <div className="flex items-center gap-6 text-white/80 text-sm">
            <span className="flex items-center gap-1">
              <Sun size={14} className="text-yellow-400" />
              Best time: {dest.bestTime}
            </span>
            {dest.climate && (
              <span className="flex items-center gap-1">
                <Clock size={14} className="text-brand-300" />
                {dest.climate}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {dest.name}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{dest.description}</p>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dest.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-brand-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related tours */}
            {relatedTours.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Tours to {dest.name}
                </h2>
                <div className="space-y-4">
                  {relatedTours.map((tour) => (
                    <Link
                      key={tour.id}
                      href={`/tours/${tour.slug}`}
                      className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:border-brand-200 hover:bg-brand-50/50 transition-colors group"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={tour.coverImage}
                          alt={tour.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                          {tour.title}
                        </h3>
                        <div className="text-sm text-gray-500 mt-1">
                          {tour.duration} days · From {formatPrice(tour.price)}
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-brand-400 flex-shrink-0 self-center group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick facts */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Quick Facts</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Country</span>
                  <span className="font-medium text-gray-900">{dest.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Best Time</span>
                  <span className="font-medium text-gray-900 text-right max-w-36">{dest.bestTime}</span>
                </div>
                {dest.climate && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Climate</span>
                    <span className="font-medium text-gray-900 text-right max-w-36">{dest.climate}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Visa info */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-3">Visa Information</h3>
              <p className="text-sm text-gray-600 mb-3">
                Most nationalities require a visa to enter Tanzania/Botswana.
                eVisa available online for many countries (approx. $50 USD).
              </p>
              <p className="text-xs text-gray-500">
                Our team will provide full visa guidance when you book.
              </p>
            </div>

            {/* CTA */}
            <div className="bg-brand-600 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">
                Plan Your {dest.name} Adventure
              </h3>
              <p className="text-brand-100 text-sm mb-4">
                Get a personalized itinerary and quote from our {dest.country} specialists.
              </p>
              <Link
                href={`/contact?destination=${encodeURIComponent(dest.name)}`}
                className="block text-center bg-white text-brand-600 hover:bg-brand-50 px-4 py-3 rounded-xl font-semibold text-sm transition-colors mb-2"
              >
                Request Free Quote
              </Link>
              <a
                href={`https://wa.me/255758996047?text=${encodeURIComponent(`Hi! I'm interested in visiting ${dest.name} in ${dest.country}. Can you help plan my trip?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-[#25D366] hover:bg-[#22c55e] text-white px-4 py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

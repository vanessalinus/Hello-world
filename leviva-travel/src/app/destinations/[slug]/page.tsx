import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Star,
  CheckCircle,
} from "lucide-react";
import TourCard from "@/components/TourCard";
import { destinations, tours } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) return { title: "Not Found" };
  return {
    title: `${dest.name} Tours & Safaris`,
    description: dest.description,
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) notFound();

  const destTours = tours.filter((t) =>
    t.destination.toLowerCase().includes(dest.name.toLowerCase()) ||
    dest.tours.includes(t.id)
  );

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dest.image})` }}
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">{dest.country}</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-4">
              {dest.name}
            </h1>
            <p className="text-2xl text-amber-300 font-medium mb-4">
              {dest.tagline}
            </p>
            <p className="text-xl text-white/90 max-w-2xl">
              {dest.description}
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-6">
                About {dest.name}
              </h2>
              <p className="text-stone-600 leading-relaxed text-lg mb-8">
                {dest.longDescription}
              </p>
              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl">
                <Calendar className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-stone-900">Best Time to Visit</p>
                  <p className="text-stone-600">{dest.bestTime}</p>
                </div>
              </div>
            </div>
            <div className="bg-stone-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-stone-900 mb-6">
                Highlights
              </h3>
              <ul className="space-y-4">
                {dest.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-stone-700">{h}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/book"
                className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-semibold transition-all hover:shadow-lg"
              >
                Book {dest.name} Tour <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tours */}
      {destTours.length > 0 && (
        <section className="py-20 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-stone-900 mb-10">
              {dest.name} Tour Packages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-amber-500 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">
            Dream of {dest.name}?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Let us craft your perfect {dest.name} itinerary. Free quote — no
            obligation, no hidden costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-white text-amber-600 hover:bg-amber-50 px-8 py-4 rounded-full font-bold text-lg transition-all"
            >
              Get Free Quote
            </Link>
            <a
              href="https://wa.me/255758996047"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-bold text-lg transition-all"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

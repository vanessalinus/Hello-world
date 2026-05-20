import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Users, MapPin, Check } from "lucide-react";
import { getTourBySlug, parseHighlights } from "@/lib/tours";
import { formatUsd } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) return { title: "Tour Not Found" };
  return {
    title: tour.title,
    description: tour.description,
  };
}

export default async function TourDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) notFound();

  const highlights = parseHighlights(tour.highlights);

  return (
    <article>
      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src={tour.imageUrl}
          alt={tour.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-safari-950/80 to-transparent" />
        <div className="absolute bottom-0 mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-safari-200">
            {tour.destination} · {tour.region}
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl">
            {tour.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-lg text-safari-700">{tour.description}</p>

            <h2 className="mt-10 font-display text-2xl font-bold text-safari-950">
              Tour Highlights
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-safari-700">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-forest-700" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl bg-safari-100 p-6">
              <h3 className="font-semibold text-safari-950">What&apos;s typically included</h3>
              <ul className="mt-3 space-y-2 text-sm text-safari-700">
                <li>• Professional English-speaking guide</li>
                <li>• Park fees and conservation levies</li>
                <li>• Accommodation as per itinerary tier</li>
                <li>• Meals on safari days (full board at camps)</li>
                <li>• Airport transfers on tour start/end dates</li>
                <li>• 24/7 Leviva support via WhatsApp</li>
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-safari-200 bg-white p-6 shadow-lg">
              <p className="text-sm text-safari-500">Starting from</p>
              <p className="font-display text-4xl font-bold text-terracotta-600">
                {formatUsd(tour.priceFromUsd)}
                <span className="text-base font-normal text-safari-500"> / person</span>
              </p>

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-safari-700">
                  <Calendar className="h-4 w-4 text-safari-500" />
                  {tour.durationDays} days / {tour.durationDays - 1} nights
                </div>
                <div className="flex items-center gap-2 text-safari-700">
                  <Users className="h-4 w-4 text-safari-500" />
                  Max group size: {tour.maxGroupSize}
                </div>
                <div className="flex items-center gap-2 text-safari-700">
                  <MapPin className="h-4 w-4 text-safari-500" />
                  Difficulty: {tour.difficulty}
                </div>
              </dl>

              <div className="mt-6 space-y-3">
                <Link
                  href={`/book?tour=${tour.slug}`}
                  className="block w-full rounded-full bg-terracotta-500 py-3.5 text-center font-semibold text-white transition hover:bg-terracotta-600"
                >
                  Book This Tour
                </Link>
                <Link
                  href="/contact"
                  className="block w-full rounded-full border border-safari-300 py-3.5 text-center font-medium text-safari-800 transition hover:bg-safari-50"
                >
                  Ask a Question
                </Link>
              </div>

              <p className="mt-4 text-center text-xs text-safari-500">
                ✓ Free quote · ✓ No payment now · ✓ Response in 24h
              </p>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatUsd, parseJSON } from "@/lib/utils";
import { Star, Clock, MapPin, CheckCircle2, XCircle, Award } from "lucide-react";
import { BookingForm } from "@/components/booking-form";

export const revalidate = 600;

export async function generateStaticParams() {
  const tours = await prisma.tour.findMany({ select: { slug: true } });
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const tour = await prisma.tour.findUnique({ where: { slug: params.slug } });
  if (!tour) return { title: "Tour not found" };
  return {
    title: `${tour.title} — from ${formatUsd(tour.priceUsd)}`,
    description: tour.summary
  };
}

export default async function TourDetailPage({ params }: { params: { slug: string } }) {
  const tour = await prisma.tour.findUnique({
    where: { slug: params.slug },
    include: { destination: true }
  });
  if (!tour) notFound();

  const itinerary = parseJSON<{ day: number; title: string; details: string }[]>(
    tour.itinerary,
    []
  );
  const inclusions = parseJSON<string[]>(tour.inclusions, []);
  const exclusions = parseJSON<string[]>(tour.exclusions, []);
  const gallery = parseJSON<string[]>(tour.gallery, []);

  return (
    <div>
      <section className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <Image src={tour.heroImage} alt={tour.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="container relative flex h-full flex-col justify-end pb-10 text-white">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="chip !bg-acacia-700/90 !text-white">{tour.category}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 backdrop-blur">
              <MapPin className="h-4 w-4" /> {tour.destination.name}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 backdrop-blur">
              <Clock className="h-4 w-4" /> {tour.durationDays} days
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 backdrop-blur">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {tour.ratingAvg.toFixed(1)} ({tour.reviewsCount})
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{tour.title}</h1>
          <p className="mt-2 max-w-2xl text-lg text-white/90">{tour.summary}</p>
        </div>
      </section>

      <section className="container py-14">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <article>
            <h2 className="font-display text-2xl font-bold text-savanna-900">Overview</h2>
            <p className="mt-3 text-savanna-800">{tour.description}</p>

            <h3 className="mt-10 font-display text-xl font-bold text-savanna-900">Itinerary</h3>
            <ol className="mt-4 space-y-4 border-l-2 border-acacia-300 pl-6">
              {itinerary.map((step) => (
                <li key={step.day} className="relative">
                  <span className="absolute -left-[34px] mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-acacia-700 text-xs font-bold text-white">
                    {step.day}
                  </span>
                  <h4 className="font-display text-lg font-bold text-savanna-900">{step.title}</h4>
                  <p className="text-sm text-savanna-700">{step.details}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-acacia-50 p-6">
                <h3 className="font-display text-lg font-bold text-acacia-800">What's included</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {inclusions.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-acacia-700" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-red-50 p-6">
                <h3 className="font-display text-lg font-bold text-red-700">Not included</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {exclusions.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <XCircle className="mt-0.5 h-4 w-4 text-red-600" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {gallery.length > 0 && (
              <div className="mt-10">
                <h3 className="font-display text-xl font-bold text-savanna-900">Gallery</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {gallery.map((g) => (
                    <div key={g} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image src={g} alt={tour.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-savanna-500">from</p>
                  <p className="font-display text-3xl font-bold text-sunset-600">
                    {formatUsd(tour.priceUsd)}
                  </p>
                  <p className="text-xs text-savanna-600">per person · sharing</p>
                </div>
                <span className="rounded-full bg-acacia-100 px-3 py-1 text-xs font-semibold text-acacia-800">
                  Best price guarantee
                </span>
              </div>

              <div className="mt-5 border-t border-savanna-100 pt-5">
                <BookingForm tourSlug={tour.slug} tourTitle={tour.title} pricePerPerson={tour.priceUsd} />
              </div>

              <ul className="mt-6 space-y-2 text-xs text-savanna-700">
                <li className="flex items-center gap-2"><Award className="h-4 w-4 text-acacia-600" /> Free cancellation 30 days out</li>
                <li className="flex items-center gap-2"><Award className="h-4 w-4 text-acacia-600" /> 24/7 in-country support</li>
                <li className="flex items-center gap-2"><Award className="h-4 w-4 text-acacia-600" /> Pay via wire, card, Alipay or WeChat Pay</li>
              </ul>
            </div>

            <div className="mt-4 rounded-2xl bg-savanna-50 p-5 text-sm text-savanna-800">
              <p className="font-semibold">Need a different date or custom itinerary?</p>
              <p className="mt-1">
                <Link className="text-sunset-600 underline" href="/contact">
                  Speak to a destination expert
                </Link>
                {" "}— free trip planning service.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

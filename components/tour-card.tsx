import Link from "next/link";
import Image from "next/image";
import { Star, Clock, MapPin, ArrowRight } from "lucide-react";
import { formatUsd } from "@/lib/utils";

export type TourCardData = {
  slug: string;
  title: string;
  summary: string;
  durationDays: number;
  priceUsd: number;
  ratingAvg: number;
  reviewsCount: number;
  heroImage: string;
  category: string;
  destination: { slug: string; name: string };
};

export function TourCard({ tour }: { tour: TourCardData }) {
  return (
    <article className="card group flex flex-col">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="chip !bg-acacia-700/90 !text-white">{tour.category}</span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div className="flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-xs backdrop-blur">
            <MapPin className="h-3.5 w-3.5" /> {tour.destination.name}
          </div>
          <div className="flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-xs backdrop-blur">
            <Clock className="h-3.5 w-3.5" /> {tour.durationDays} days
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-1 text-sm text-savanna-700">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{tour.ratingAvg.toFixed(1)}</span>
          <span className="text-savanna-500">({tour.reviewsCount} reviews)</span>
        </div>
        <h3 className="font-display text-lg font-bold text-savanna-900 group-hover:text-sunset-600">
          {tour.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-savanna-700">{tour.summary}</p>

        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-savanna-500">from</p>
            <p className="font-display text-2xl font-bold text-sunset-600">
              {formatUsd(tour.priceUsd)}
              <span className="ml-1 text-xs font-medium text-savanna-600">/ person</span>
            </p>
          </div>
          <Link
            href={`/tours/${tour.slug}`}
            className="inline-flex items-center gap-1 rounded-full bg-savanna-900 px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-sunset-500"
          >
            View <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

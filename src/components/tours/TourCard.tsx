import Image from "next/image";
import Link from "next/link";
import { Calendar, Users, MapPin } from "lucide-react";
import { formatUsd } from "@/lib/utils";
import { parseHighlights } from "@/lib/tours";
import type { Tour } from "@prisma/client";

interface TourCardProps {
  tour: Tour;
  featured?: boolean;
}

export function TourCard({ tour, featured }: TourCardProps) {
  const highlights = parseHighlights(tour.highlights).slice(0, 2);

  return (
    <article
      className={`group overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl ${
        featured ? "ring-2 ring-terracotta-400/50" : ""
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={tour.imageUrl}
          alt={tour.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {featured && (
          <span className="absolute left-3 top-3 rounded-full bg-terracotta-500 px-3 py-1 text-xs font-semibold text-white">
            Best Seller
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-forest-800/90 px-3 py-1 text-xs font-medium text-white">
          From {formatUsd(tour.priceFromUsd)}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1 text-sm text-safari-500">
          <MapPin className="h-3.5 w-3.5" />
          {tour.destination} · {tour.region}
        </div>
        <h3 className="mt-2 font-display text-xl font-semibold text-safari-950 group-hover:text-forest-700">
          <Link href={`/tours/${tour.slug}`}>{tour.title}</Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-safari-600">{tour.description}</p>

        <ul className="mt-3 flex flex-wrap gap-2">
          {highlights.map((h) => (
            <li
              key={h}
              className="rounded-full bg-safari-100 px-2.5 py-0.5 text-xs text-safari-700"
            >
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between border-t border-safari-100 pt-4 text-sm text-safari-600">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {tour.durationDays} days
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            Max {tour.maxGroupSize}
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            href={`/tours/${tour.slug}`}
            className="flex-1 rounded-full border border-safari-300 py-2.5 text-center text-sm font-medium text-safari-800 transition hover:bg-safari-50"
          >
            View Details
          </Link>
          <Link
            href={`/book?tour=${tour.slug}`}
            className="flex-1 rounded-full bg-terracotta-500 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-terracotta-600"
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}

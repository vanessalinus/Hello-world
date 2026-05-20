import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export type DestinationCardData = {
  slug: string;
  name: string;
  country: string;
  tagline: string;
  heroImage: string;
  tourCount?: number;
};

export function DestinationCard({ destination }: { destination: DestinationCardData }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative block h-72 overflow-hidden rounded-2xl shadow-card"
    >
      <Image
        src={destination.heroImage}
        alt={destination.name}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="text-xs uppercase tracking-widest text-savanna-200">{destination.country}</p>
        <h3 className="font-display text-2xl font-bold">{destination.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-white/85">{destination.tagline}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sunset-300 transition group-hover:gap-2">
          Explore tours <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

import { tours } from "@/data/tours";
import TourCard from "./TourCard";
import Link from "next/link";

export default function FeaturedTours() {
  const featuredTours = tours.filter((t) => t.featured).slice(0, 4);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-14">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-widest">
            Handpicked Adventures
          </span>
          <h2 className="heading-2 text-gray-900 mt-3 mb-4">
            Our Most Popular Tours
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            From the Great Migration to mountain summits and tropical beaches —
            discover East Africa&apos;s most extraordinary experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/tours" className="btn-outline text-lg">
            View All Tours
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

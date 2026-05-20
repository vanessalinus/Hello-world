import Link from "next/link";
import { destinations } from "@/data/tours";

const destImages: Record<string, string> = {
  tanzania:
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
  zanzibar:
    "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80",
  botswana:
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
  kenya:
    "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=80",
  rwanda:
    "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=800&q=80",
};

export default function DestinationsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-14">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-widest">
            Where Dreams Come Alive
          </span>
          <h2 className="heading-2 text-gray-900 mt-3 mb-4">
            Explore Our Destinations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            East Africa is a tapestry of incredible landscapes, cultures, and
            wildlife. Each destination tells a unique story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.slice(0, 3).map((dest, index) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className={`group relative rounded-2xl overflow-hidden ${
                index === 0 ? "md:col-span-2 md:row-span-2 min-h-[400px]" : "min-h-[250px]"
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${destImages[dest.slug]})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <h3
                  className="text-2xl sm:text-3xl font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {dest.name}
                </h3>
                <p className="text-gray-200 text-sm mb-3">{dest.tagline}</p>
                <span className="inline-flex items-center text-primary-300 text-sm font-semibold group-hover:text-primary-200 transition-colors">
                  Explore {dest.tourCount} tours
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
                </span>
              </div>
            </Link>
          ))}

          {destinations.slice(3).map((dest) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className="group relative rounded-2xl overflow-hidden min-h-[250px]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${destImages[dest.slug]})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3
                  className="text-xl font-bold text-white mb-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {dest.name}
                </h3>
                <p className="text-gray-200 text-sm mb-2">{dest.tagline}</p>
                <span className="inline-flex items-center text-primary-300 text-sm font-semibold">
                  Explore tours →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

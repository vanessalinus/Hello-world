import { Metadata } from "next";
import Link from "next/link";
import { destinations } from "@/data/tours";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore East Africa's most spectacular destinations — Tanzania, Zanzibar, Botswana, Kenya & Rwanda. Discover safari parks, tropical islands, mountain peaks, and pristine wilderness.",
};

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

export default function DestinationsPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="relative z-10 container-custom text-center">
          <h1 className="heading-1 text-white mb-4">Our Destinations</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From the Serengeti plains to tropical Zanzibar beaches — discover
            East Africa&apos;s most captivating destinations.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="space-y-16">
            {destinations.map((dest, index) => (
              <div
                key={dest.slug}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 !== 0 ? "lg:direction-rtl" : ""
                }`}
              >
                <div className={index % 2 !== 0 ? "lg:order-2" : ""}>
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="block relative rounded-2xl overflow-hidden h-[350px] sm:h-[400px] group"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${destImages[dest.slug]})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <span className="px-4 py-2 bg-primary-600 text-white text-sm font-bold rounded-full">
                        {dest.tourCount} {dest.tourCount === 1 ? "Tour" : "Tours"} Available
                      </span>
                    </div>
                  </Link>
                </div>
                <div className={index % 2 !== 0 ? "lg:order-1" : ""}>
                  <span className="text-primary-600 font-semibold text-sm uppercase tracking-widest">
                    {dest.tagline}
                  </span>
                  <h2 className="heading-2 text-gray-900 mt-2 mb-4">{dest.name}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {dest.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {dest.highlights.slice(0, 4).map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-primary-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {h}
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="btn-primary"
                  >
                    Explore {dest.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

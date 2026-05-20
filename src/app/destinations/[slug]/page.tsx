import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { destinations, tours } from "@/data/tours";
import TourCard from "@/components/TourCard";

const destImages: Record<string, string> = {
  tanzania:
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2000&q=80",
  zanzibar:
    "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=2000&q=80",
  botswana:
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=80",
  kenya:
    "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=2000&q=80",
  rwanda:
    "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=2000&q=80",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) return { title: "Destination Not Found" };

  return {
    title: `${dest.name} - ${dest.tagline}`,
    description: dest.description.slice(0, 160),
  };
}

export function generateStaticParams() {
  return destinations.map((dest) => ({ slug: dest.slug }));
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) notFound();

  const destTours = tours.filter(
    (t) => t.destination.toLowerCase() === dest.name.toLowerCase()
  );

  return (
    <>
      <section className="relative pt-24 pb-0">
        <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${destImages[dest.slug]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
            <div className="container-custom">
              <span className="text-primary-300 font-semibold text-sm uppercase tracking-widest">
                {dest.tagline}
              </span>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {dest.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {dest.description}
            </p>

            <h2 className="heading-3 text-gray-900 mb-6">Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {dest.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-primary-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {destTours.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="heading-2 text-gray-900 mb-8">
              Tours in {dest.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {destTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-2 text-gray-900 mb-4">
            Ready to Explore {dest.name}?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Let us help you plan the perfect {dest.name} adventure. Contact
            our experts for a free personalized itinerary.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/booking" className="btn-primary text-lg">
              Plan Your {dest.name} Trip
            </Link>
            <a
              href={`https://wa.me/255758996047?text=${encodeURIComponent(
                `Hi Leviva! I'm interested in traveling to ${dest.name}. Can you help me plan?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline !border-green-600 !text-green-600 hover:!bg-green-600 hover:!text-white text-lg"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

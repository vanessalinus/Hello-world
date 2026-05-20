import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tours } from "@/data/tours";
import { formatPrice } from "@/lib/utils";
import BookingForm from "@/components/BookingForm";

const tourImages: Record<string, string> = {
  "serengeti-migration-safari":
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2000&q=80",
  "kilimanjaro-summit-trek":
    "https://images.unsplash.com/photo-1621414050946-1b936a78491d?auto=format&fit=crop&w=2000&q=80",
  "zanzibar-beach-spice-retreat":
    "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=2000&q=80",
  "botswana-okavango-delta-safari":
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=80",
  "tarangire-lake-manyara-safari":
    "https://images.unsplash.com/photo-1535338454528-1b22dc20be8e?auto=format&fit=crop&w=2000&q=80",
  "chobe-victoria-falls-adventure":
    "https://images.unsplash.com/photo-1568454537842-d933259bb258?auto=format&fit=crop&w=2000&q=80",
  "rwanda-gorilla-trekking":
    "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=2000&q=80",
  "maasai-mara-amboseli-kenya":
    "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=2000&q=80",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = tours.find((t) => t.slug === slug);
  if (!tour) return { title: "Tour Not Found" };

  return {
    title: tour.title,
    description: tour.description.slice(0, 160),
    openGraph: {
      title: tour.title,
      description: tour.description.slice(0, 160),
      images: [tourImages[tour.slug] || ""],
    },
  };
}

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export default async function TourDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = tours.find((t) => t.slug === slug);

  if (!tour) notFound();

  return (
    <>
      <section className="relative pt-24 pb-0">
        <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${tourImages[tour.slug]})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
            <div className="container-custom">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full">
                  {tour.category}
                </span>
                <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                  {tour.destination}
                </span>
              </div>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {tour.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-white/90 text-sm">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {tour.duration}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {tour.groupSize}
                </span>
                <span className="flex items-center gap-2">
                  {"★".repeat(Math.floor(tour.rating))}{" "}
                  {tour.rating} ({tour.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="heading-3 text-gray-900 mb-4">Overview</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {tour.description}
                </p>
              </div>

              <div>
                <h2 className="heading-3 text-gray-900 mb-6">Tour Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tour.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-primary-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="heading-3 text-gray-900 mb-6">Day-by-Day Itinerary</h2>
                <div className="space-y-6">
                  {tour.itinerary.map((day, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="shrink-0">
                        <div className="w-16 h-16 rounded-xl bg-primary-100 flex flex-col items-center justify-center">
                          <span className="text-xs text-primary-600 font-bold uppercase">
                            {day.day.split(" ")[0]}
                          </span>
                          <span className="text-xl font-bold text-primary-700">
                            {day.day.split(" ")[1]}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 pb-6 border-b border-gray-100 last:border-0">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">
                          {day.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {day.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-3">
                    {tour.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
                        <svg className="w-4 h-4 text-green-500 shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Not Included
                  </h3>
                  <ul className="space-y-3">
                    {tour.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
                        <svg className="w-4 h-4 text-red-400 shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                  <div className="text-center mb-6">
                    <span className="text-sm text-gray-500">From</span>
                    <div className="text-4xl font-bold text-primary-600">
                      {formatPrice(tour.price)}
                    </div>
                    <span className="text-gray-500">per person</span>
                  </div>

                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-medium">{tour.duration}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">Group Size</span>
                      <span className="font-medium">{tour.groupSize}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">Difficulty</span>
                      <span className="font-medium">{tour.difficulty}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-500">Rating</span>
                      <span className="font-medium text-yellow-600">
                        {"★".repeat(Math.floor(tour.rating))} {tour.rating}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/booking?tour=${tour.slug}`}
                    className="btn-primary w-full text-center text-lg"
                  >
                    Book This Tour
                  </Link>

                  <a
                    href={`https://wa.me/255758996047?text=${encodeURIComponent(
                      `Hi Leviva! I'm interested in the "${tour.title}" tour. Please send me more details.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.47,14.38c-.29-.15-1.7-.84-1.97-.94s-.45-.15-.64.15-.74.94-.91,1.13-.33.22-.62.07a7.82,7.82,0,0,1-2.3-1.42,8.6,8.6,0,0,1-1.59-1.98c-.17-.29,0-.44.13-.59s.29-.33.44-.5a2,2,0,0,0,.29-.49.54.54,0,0,0,0-.5c-.07-.15-.64-1.54-.88-2.11s-.46-.48-.64-.49h-.54a1.05,1.05,0,0,0-.76.35,3.18,3.18,0,0,0-1,2.36,5.52,5.52,0,0,0,1.16,2.93,12.63,12.63,0,0,0,4.86,4.29,16.26,16.26,0,0,0,1.62.6,3.89,3.89,0,0,0,1.79.11,2.93,2.93,0,0,0,1.92-1.35,2.37,2.37,0,0,0,.17-1.35C17.94,14.6,17.76,14.53,17.47,14.38Z" />
                    </svg>
                    Inquire on WhatsApp
                  </a>

                  <p className="text-center text-xs text-gray-400 mt-4">
                    Free consultation • No booking fees • 24/7 support
                  </p>
                </div>

                <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100">
                  <h4 className="font-bold text-gray-900 mb-3">
                    Need Help Planning?
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Our travel experts are here to customize this tour to your
                    preferences and budget.
                  </p>
                  <a
                    href="mailto:info@levivainvestments.co.tz"
                    className="text-primary-600 font-semibold text-sm hover:underline"
                  >
                    info@levivainvestments.co.tz
                  </a>
                  <br />
                  <a
                    href="tel:+255758996047"
                    className="text-primary-600 font-semibold text-sm hover:underline"
                  >
                    +255 758 996 047
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50" id="book">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="heading-2 text-gray-900 mb-4">
                Book This Tour
              </h2>
              <p className="text-gray-600 text-lg">
                Fill out the form below and our team will get back to you
                within 24 hours with a personalized quote.
              </p>
            </div>
            <BookingForm tourSlug={tour.slug} tourTitle={tour.title} />
          </div>
        </div>
      </section>
    </>
  );
}

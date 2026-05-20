import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Star,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  ArrowRight,
  Calendar,
  Shield,
  Phone,
} from "lucide-react";
import BookingForm from "@/components/BookingForm";
import { tours } from "@/lib/data";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return tours.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tour = tours.find((t) => t.id === id);
  if (!tour) return { title: "Not Found" };
  return {
    title: `${tour.title} — ${tour.destination}`,
    description: tour.description,
  };
}

export default async function TourDetailPage({ params }: Props) {
  const { id } = await params;
  const tour = tours.find((t) => t.id === id);
  if (!tour) notFound();

  const discount = tour.originalPrice
    ? Math.round(
        ((tour.originalPrice - tour.price) / tour.originalPrice) * 100
      )
    : 0;

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${tour.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 text-white w-full">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {discount > 0 && (
              <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                {discount}% OFF
              </span>
            )}
            <span className="bg-white/20 backdrop-blur-sm text-sm font-medium px-3 py-1 rounded-full capitalize">
              {tour.category}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">{tour.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-white/90">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-5 h-5" /> {tour.destination}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-5 h-5" /> {tour.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />{" "}
              {tour.rating} ({tour.reviews} reviews)
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <p className="text-lg text-stone-700 leading-relaxed mb-10">
                {tour.description}
              </p>

              {/* Highlights */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-stone-900 mb-6">
                  Tour Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tour.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl"
                    >
                      <Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="text-stone-700">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-stone-900 mb-6">
                  Day-by-Day Itinerary
                </h2>
                <div className="space-y-6">
                  {tour.itinerary.map((day, i) => (
                    <div
                      key={i}
                      className="flex gap-4 p-6 bg-stone-50 rounded-xl border border-stone-100"
                    >
                      <div className="w-16 h-16 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm text-center leading-tight">
                          {day.day}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-stone-900 mb-1">
                          {day.title}
                        </h3>
                        <p className="text-stone-600 leading-relaxed">
                          {day.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included */}
              <div>
                <h2 className="text-2xl font-bold text-stone-900 mb-6">
                  What&apos;s Included
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tour.included.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-stone-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Booking */}
            <div>
              <div className="sticky top-24 space-y-6">
                <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-sm text-stone-500">From</span>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-emerald-600">
                          ${tour.price.toLocaleString()}
                        </span>
                        {tour.originalPrice && (
                          <span className="text-lg text-stone-400 line-through">
                            ${tour.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-stone-500">per person</span>
                    </div>
                    {discount > 0 && (
                      <span className="bg-red-100 text-red-600 text-sm font-bold px-3 py-1 rounded-full">
                        Save ${(tour.originalPrice! - tour.price).toLocaleString()}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/book?tour=${tour.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg booking-pulse mb-3"
                  >
                    Book This Tour <ArrowRight className="w-5 h-5" />
                  </Link>
                  <a
                    href={`https://wa.me/255758996047?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(tour.title)}%20tour.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition-all"
                  >
                    WhatsApp Inquiry
                  </a>
                  <p className="text-center text-sm text-stone-500 mt-3">
                    No payment now — get a free personalized quote
                  </p>
                </div>

                <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
                  <h3 className="font-bold text-stone-900 mb-4">
                    Need Help Deciding?
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-stone-600">
                      <Phone className="w-4 h-4 text-amber-500" />
                      <a href="tel:+255758996047" className="hover:text-amber-600">
                        +255 758 996 047
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-stone-600">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      <span>Responds within 2 hours</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-600">
                      <Shield className="w-4 h-4 text-amber-500" />
                      <span>Free cancellation up to 30 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

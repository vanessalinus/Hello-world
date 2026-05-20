import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Users,
  Star,
  MapPin,
  CheckCircle,
  XCircle,
  ChevronRight,
  Phone,
  MessageCircle,
  Calendar,
} from "lucide-react";
import { getTourBySlug, tours } from "@/data/tours";
import { formatPrice } from "@/lib/utils";
import BookingWidget from "@/components/booking/BookingWidget";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tour = getTourBySlug(params.slug);
  if (!tour) return { title: "Tour Not Found" };
  return {
    title: `${tour.title} | ${tour.duration} Days | Leviva Travel`,
    description: tour.description.substring(0, 160),
    openGraph: {
      title: tour.title,
      description: tour.description.substring(0, 160),
      images: [{ url: tour.coverImage, width: 1200, height: 630, alt: tour.title }],
    },
  };
}

const difficultyColors: Record<string, string> = {
  EASY: "bg-green-100 text-green-700",
  MODERATE: "bg-yellow-100 text-yellow-700",
  CHALLENGING: "bg-orange-100 text-orange-700",
  STRENUOUS: "bg-red-100 text-red-700",
};

export default function TourDetailPage({ params }: Props) {
  const tour = getTourBySlug(params.slug);
  if (!tour) notFound();

  const whatsappMsg = encodeURIComponent(
    `Hello Leviva Travel! I'm interested in the "${tour.title}" (${tour.duration} days). Could you provide more information and availability?`
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src={tour.coverImage}
          alt={tour.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex flex-col justify-end px-4 md:px-8 pb-12 max-w-7xl mx-auto w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <Link href="/tours" className="hover:text-white">Tours</Link>
            <ChevronRight size={14} />
            <span className="text-white">{tour.title}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-brand-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {tour.category}
            </span>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${difficultyColors[tour.difficulty]}`}>
              {tour.difficulty}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-2">
            {tour.title}
          </h1>
          {tour.subtitle && (
            <p className="text-white/80 text-xl mb-4">{tour.subtitle}</p>
          )}

          <div className="flex flex-wrap items-center gap-6 text-white">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="font-semibold">{tour.rating}</span>
              <span className="text-white/60">({tour.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-brand-300" />
              <span>{tour.duration} Days</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-brand-300" />
              <span>Max {tour.groupSize} Guests</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-brand-300" />
              <span>{tour.destinations.slice(0, 2).join(", ")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left – content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Overview</h2>
              <p className="text-gray-600 leading-relaxed">{tour.description}</p>

              {/* Destinations */}
              <div className="mt-6 flex flex-wrap gap-2">
                {tour.destinations.map((dest) => (
                  <span
                    key={dest}
                    className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    <MapPin size={12} className="text-brand-500" />
                    {dest}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tour.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-brand-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Day-by-Day Itinerary</h2>
              <div className="space-y-4">
                {tour.itinerary.map((day) => (
                  <div key={day.day} className="border border-gray-100 rounded-xl overflow-hidden">
                    <div className="flex items-center gap-4 p-4 bg-gray-50">
                      <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {day.day}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{day.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {day.meals.map((meal) => (
                            <span key={meal} className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              {meal}
                            </span>
                          ))}
                          <span className="text-xs text-gray-400">{day.accommodation}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm leading-relaxed">{day.description}</p>
                      {day.activities && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {day.activities.map((act) => (
                            <span key={act} className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full">
                              {act}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-500" />
                  What's Included
                </h2>
                <ul className="space-y-2">
                  {tour.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <XCircle size={20} className="text-red-400" />
                  What's Excluded
                </h2>
                <ul className="space-y-2">
                  {tour.exclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <XCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Photo gallery */}
            {tour.images.length > 1 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Photo Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {tour.images.map((img, i) => (
                    <div key={i} className="relative h-40 rounded-xl overflow-hidden">
                      <Image
                        src={img}
                        alt={`${tour.title} - photo ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right – booking widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <BookingWidget tour={tour} />

              {/* Quick contact */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Have Questions?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our team responds within 2 hours. We speak English, Mandarin, Korean, French, and German.
                </p>
                <div className="space-y-3">
                  <a
                    href={`https://wa.me/255758996047?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-xl font-semibold text-sm transition-colors hover:bg-[#22c55e] w-full justify-center"
                  >
                    <MessageCircle size={18} />
                    WhatsApp Chat
                  </a>
                  <a
                    href="tel:+255758996047"
                    className="flex items-center gap-3 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-semibold text-sm transition-colors hover:bg-gray-200 w-full justify-center"
                  >
                    <Phone size={18} />
                    +255 758 996 047
                  </a>
                  <Link
                    href="/contact"
                    className="flex items-center gap-3 border border-brand-400 text-brand-600 px-4 py-3 rounded-xl font-semibold text-sm transition-colors hover:bg-brand-50 w-full justify-center"
                  >
                    <Calendar size={18} />
                    Request Free Quote
                  </Link>
                </div>
              </div>

              {/* Trust badges */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Best price guarantee
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Free itinerary customization
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Emergency evacuation insurance
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Flexible cancellation policy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

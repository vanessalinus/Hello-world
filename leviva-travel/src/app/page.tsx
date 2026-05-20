import Link from "next/link";
import {
  Star,
  ArrowRight,
  Shield,
  Sparkles,
  Compass,
  Leaf,
  Globe,
  Tag,
  Users,
  Award,
  MapPin,
  Calendar,
} from "lucide-react";
import TourCard from "@/components/TourCard";
import TestimonialCard from "@/components/TestimonialCard";
import {
  tours,
  destinations,
  testimonials,
  stats,
  whyChooseUs,
} from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  compass: <Compass className="w-8 h-8" />,
  sparkles: <Sparkles className="w-8 h-8" />,
  shield: <Shield className="w-8 h-8" />,
  leaf: <Leaf className="w-8 h-8" />,
  globe: <Globe className="w-8 h-8" />,
  tag: <Tag className="w-8 h-8" />,
};

export default function HomePage() {
  const featuredTours = tours.filter((t) => t.featured);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-sm font-medium">
                Rated 4.9/5 by 15,000+ travelers
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Your African
              <br />
              <span className="text-amber-400">Adventure</span> Awaits
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              Tanzania safaris, Zanzibar beaches, Botswana luxury camps & East
              African gorilla treks — all crafted by local experts who call
              Africa home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tours"
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-xl booking-pulse"
              >
                Explore Tours <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg transition-all border border-white/30"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Search Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 transform translate-y-1/2">
            <div className="bg-white rounded-2xl shadow-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1.5">
                  <MapPin className="w-4 h-4 inline mr-1" /> Destination
                </label>
                <select className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-stone-800 bg-white focus:border-amber-500 outline-none">
                  <option>All Destinations</option>
                  <option>Tanzania</option>
                  <option>Zanzibar</option>
                  <option>Botswana</option>
                  <option>Kenya</option>
                  <option>Uganda & Rwanda</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1.5">
                  <Calendar className="w-4 h-4 inline mr-1" /> Travel Date
                </label>
                <input
                  type="month"
                  className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-stone-800 focus:border-amber-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-600 mb-1.5">
                  <Users className="w-4 h-4 inline mr-1" /> Travelers
                </label>
                <select className="w-full px-3 py-2.5 rounded-lg border border-stone-200 text-stone-800 bg-white focus:border-amber-500 outline-none">
                  <option>2 Travelers</option>
                  <option>1 Traveler</option>
                  <option>3 Travelers</option>
                  <option>4 Travelers</option>
                  <option>5+ Travelers</option>
                </select>
              </div>
              <Link
                href="/tours"
                className="bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-lg font-semibold text-center transition-all hover:shadow-lg"
              >
                Search Tours
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-stone-50 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-amber-600">
                  {stat.value}
                </p>
                <p className="text-stone-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">
              Explore Our Destinations
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              From the Serengeti's endless plains to Zanzibar's turquoise
              shores, discover East Africa's most breathtaking locations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.slug}`}
                className="group relative rounded-2xl overflow-hidden h-80"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${dest.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{dest.name}</h3>
                  <p className="text-white/80 text-sm">{dest.tagline}</p>
                  <span className="inline-flex items-center gap-1 text-amber-400 font-medium text-sm mt-3 group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-14 gap-4">
            <div>
              <h2 className="text-4xl font-bold text-stone-900 mb-2">
                Popular Tours
              </h2>
              <p className="text-lg text-stone-600">
                Our most-booked experiences, handpicked for you
              </p>
            </div>
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
            >
              View All Tours <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.slice(0, 6).map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">
              Why Travel With Leviva
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              We're not just a tour company — we're your personal connection to
              the heart of Africa.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="bg-stone-50 rounded-2xl p-8 hover:shadow-lg transition-shadow border border-stone-100"
              >
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-5">
                  {iconMap[item.icon]}
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Real stories from adventurers around the world — from China to New
              Zealand, America to South Korea.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 6).map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 text-stone-400">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8" />
              <div>
                <p className="text-sm font-semibold text-stone-700">
                  Licensed
                </p>
                <p className="text-xs">Tanzania Tourist Board</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-8 h-8" />
              <div>
                <p className="text-sm font-semibold text-stone-700">
                  Top Rated
                </p>
                <p className="text-xs">TripAdvisor 2024</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-8 h-8" />
              <div>
                <p className="text-sm font-semibold text-stone-700">
                  15,000+
                </p>
                <p className="text-xs">Happy Travelers</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-8 h-8" />
              <div>
                <p className="text-sm font-semibold text-stone-700">
                  Multilingual
                </p>
                <p className="text-xs">EN · 中文 · 한국어 · FR</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1535338454528-1b5c8e9b30fa?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-stone-900/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready for the Adventure of a Lifetime?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get a free, no-obligation quote tailored to your dream African
            safari. Our experts respond within 2 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-xl booking-pulse"
            >
              Get Your Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/255758996047?text=Hello%20Leviva!%20I'm%20interested%20in%20booking%20a%20tour."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

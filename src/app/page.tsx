import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import QuickBookingBar from "@/components/sections/QuickBookingBar";
import FeaturedTours from "@/components/sections/FeaturedTours";
import DestinationsSection from "@/components/sections/DestinationsSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TravelSources from "@/components/sections/TravelSources";
import { getFeaturedTours } from "@/data/tours";
import { getFeaturedDestinations } from "@/data/destinations";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Leviva Travel & Tours | Tanzania Safari, Zanzibar & East Africa",
  description:
    "Book your dream East Africa safari with Leviva Travel. Serengeti, Zanzibar, Botswana, Kilimanjaro & more. Expert guides, 4.9★ rated. Serving travelers from China, USA, Europe, Korea, Australia & NZ.",
};

export default function HomePage() {
  const featuredTours = getFeaturedTours();
  const featuredDestinations = getFeaturedDestinations();

  return (
    <>
      <HeroSection />
      <QuickBookingBar />

      {/* USP Strip */}
      <div className="bg-brand-600 py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-white text-sm font-medium">
            <span className="flex items-center gap-2">✅ Free Itinerary Planning</span>
            <span className="hidden md:block text-white/30">|</span>
            <span className="flex items-center gap-2">✅ Best Price Guarantee</span>
            <span className="hidden md:block text-white/30">|</span>
            <span className="flex items-center gap-2">✅ Multilingual Guides</span>
            <span className="hidden md:block text-white/30">|</span>
            <span className="flex items-center gap-2">✅ 24/7 WhatsApp Support</span>
            <span className="hidden md:block text-white/30">|</span>
            <span className="flex items-center gap-2">✅ Flexible Booking</span>
          </div>
        </div>
      </div>

      <FeaturedTours tours={featuredTours} />
      <DestinationsSection destinations={featuredDestinations} />
      <WhyChooseUs />
      <TestimonialsSection />
      <TravelSources />

      {/* Final CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Your African Adventure Awaits
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact our expert team to start planning your bespoke East Africa journey.
            We respond within 2 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="bg-brand-500 hover:bg-brand-600 text-white px-10 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg"
            >
              Book Your Safari Now
            </Link>
            <Link
              href="/contact"
              className="border-2 border-gray-300 text-gray-700 hover:border-brand-400 hover:text-brand-600 px-10 py-4 rounded-xl font-bold text-lg transition-colors"
            >
              Request Free Quote
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 mt-10 text-sm text-gray-500">
            <a href="tel:+255758996047" className="flex items-center gap-2 hover:text-brand-600">
              <Phone size={16} /> +255 758 996 047
            </a>
            <a href="mailto:info@levivainvestments.co.tz" className="flex items-center gap-2 hover:text-brand-600">
              <Mail size={16} /> info@levivainvestments.co.tz
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

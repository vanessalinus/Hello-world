import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import FeaturedTours from "@/components/FeaturedTours";
import DestinationsSection from "@/components/DestinationsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import NewsletterSection from "@/components/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <FeaturedTours />
      <DestinationsSection />
      <WhyChooseUs />
      <TestimonialsSection />
      <CTASection />
      <NewsletterSection />
    </>
  );
}

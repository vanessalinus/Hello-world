import { ConversionStrip, FinalCTA } from "@/components/sections/ConversionBlocks";
import { DestinationShowcase } from "@/components/sections/DestinationShowcase";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { SourceMarkets } from "@/components/sections/SourceMarkets";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustStrip } from "@/components/sections/TrustStrip";

export default function HomePage() {
  return (
    <>
      <ConversionStrip />
      <Hero />
      <TrustStrip />
      <DestinationShowcase />
      <SourceMarkets />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}

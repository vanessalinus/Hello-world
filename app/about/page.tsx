import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { ShieldCheck, Globe2, Leaf, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Leviva Travel & Tours",
  description:
    "Locally-owned East African safari specialists operating in Tanzania, Zanzibar, Botswana, Kenya, Rwanda and Uganda."
};

const values = [
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Trust by design",
    copy: "Licensed by the Tanzania Tourist Board (TTB), TATO and IATA. Every deposit is financially protected."
  },
  {
    icon: <Globe2 className="h-6 w-6" />,
    title: "Truly multilingual",
    copy: "Mandarin, Korean, German, French, Italian and Spanish-speaking guides available on request."
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "Conservation first",
    copy: "Travelife member, KPAP porter welfare partner. 1% of every booking funds local conservation."
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Award-winning",
    copy: "TripAdvisor Travellers' Choice, Safari Bookings 5-star operator and Booking.com Travel Sustainable Level 3."
  }
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative isolate h-[50vh] min-h-[340px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1502943693086-33b5b1cfdf2f?auto=format&fit=crop&w=1920&q=80"
          alt="Maasai warriors at sunset"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-savanna-950/65" />
        <div className="container relative flex h-full flex-col items-start justify-end pb-10 text-white">
          <span className="section-eyebrow !text-sunset-300">About us</span>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            Locally owned. Globally connected. <span className="text-savanna-200">Africa, your way.</span>
          </h1>
        </div>
      </section>

      <section className="container grid gap-10 py-14 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold text-savanna-900">Karibu to Leviva.</h2>
          <p className="mt-4 text-savanna-800">
            Leviva Travel &amp; Tours is the safari division of <strong>{siteConfig.legalName}</strong>,
            an Arusha-headquartered Tanzanian company with a quarter-century of combined experience
            crafting bespoke African journeys.
          </p>
          <p className="mt-4 text-savanna-800">
            Our team of trip designers, drivers, mountain guides and beach concierges live in the
            destinations we sell. That means insider access, real-time advice, and tightly
            controlled quality from your first email to the moment we wave you off at the airport.
          </p>
          <p className="mt-4 text-savanna-800">
            We're proudly chosen by travellers from China 🇨🇳, the USA 🇺🇸, Europe 🇪🇺, South Korea 🇰🇷,
            Australia 🇦🇺 and New Zealand 🇳🇿 — and we tailor every aspect of the journey, from
            multilingual guides to dietary needs and payment preferences, to make your trip
            effortlessly comfortable.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl bg-white p-5 shadow-card">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-acacia-700 text-white">
                {v.icon}
              </div>
              <h3 className="mt-3 font-display text-lg font-bold text-savanna-900">{v.title}</h3>
              <p className="mt-1 text-sm text-savanna-700">{v.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-acacia-50/60 py-14">
        <div className="container grid gap-8 md:grid-cols-3 text-center">
          <div>
            <p className="font-display text-4xl font-bold text-acacia-800">25k+</p>
            <p className="text-savanna-700">happy travellers since founding</p>
          </div>
          <div>
            <p className="font-display text-4xl font-bold text-acacia-800">6</p>
            <p className="text-savanna-700">East &amp; Southern African destinations</p>
          </div>
          <div>
            <p className="font-display text-4xl font-bold text-acacia-800">7</p>
            <p className="text-savanna-700">languages spoken in-house</p>
          </div>
        </div>
      </section>
    </div>
  );
}

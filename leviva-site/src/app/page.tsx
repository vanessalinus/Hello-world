import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Globe2,
  MapPinned,
  MessageCircle,
  Plane,
  PhoneCall,
  ShieldCheck,
  Star,
} from "lucide-react";

import { BookingForm } from "@/components/booking-form";
import { SectionHeading } from "@/components/section-heading";
import {
  company,
  destinations,
  faqs,
  featuredItineraries,
  salesProcess,
  sourceMarkets,
  testimonials,
  trustSignals,
} from "@/lib/content";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: company.name,
  url: company.siteUrl,
  telephone: company.phone,
  email: company.email,
  areaServed: [
    "Tanzania",
    "Zanzibar",
    "Botswana",
    "East Africa",
    "China",
    "USA",
    "Europe",
    "South Korea",
    "Australia",
    "New Zealand",
  ],
  makesOffer: destinations.map((destination) => ({
    "@type": "Offer",
    name: destination.name,
    description: destination.summary,
  })),
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const spotlightDestinations = destinations.slice(0, 4);

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="bg-white text-slate-950">
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.24),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.24),_transparent_25%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                <Star className="h-4 w-4 text-amber-300" />
                Tanzania, Zanzibar, Botswana, and East Africa journeys built to
                convert browsers into booked guests
              </div>

              <h1 className="mt-8 text-4xl font-semibold tracking-tight text-white md:text-6xl">
                High-conversion safari and beach journeys for Leviva Travel &
                Tours
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                A ready-to-publish full-stack website designed to win inquiries
                from China, the USA, Europe, South Korea, Australia, and New
                Zealand with stronger destination storytelling, smarter booking
                forms, and faster lead capture.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                >
                  Start planning my trip
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={company.whatsappHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Leviva
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    value: "6 flagship routes",
                    label: "Safari, beach, adventure, and Botswana extensions",
                  },
                  {
                    value: "5 source markets",
                    label: "Tailored messaging for priority audiences",
                  },
                  {
                    value: "24/7 inquiry flow",
                    label: "Lead capture that works even outside office hours",
                  },
                ].map((metric) => (
                  <div
                    key={metric.value}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5"
                  >
                    <p className="text-lg font-semibold text-white">{metric.value}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-teal-400/30 via-transparent to-amber-300/20 blur-3xl" />
              <div className="relative rounded-[2rem] border border-white/10 bg-white/95 p-3 text-slate-950 shadow-2xl shadow-black/30">
                <BookingForm compact />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-3 lg:px-8">
            {[
              {
                icon: ShieldCheck,
                title: "Trust-building design",
                description:
                  "Conversion-focused layout with clear calls to action, social proof, and strong destination detail.",
              },
              {
                icon: Clock3,
                title: "Fast-response lead flow",
                description:
                  "Website inquiries are validated and stored instantly so Leviva can quote quickly.",
              },
              {
                icon: Globe2,
                title: "International-market fit",
                description:
                  "Messaging is shaped around the countries Leviva wants to attract most.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-200 p-6">
                <item.icon className="h-8 w-8 text-teal-700" />
                <h2 className="mt-4 text-xl font-semibold text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="Top destinations"
            title="Focus the story on Tanzania, Zanzibar, Botswana, and East Africa's highest-value trips"
            description="Every destination page is written to support discovery, reassure premium travelers, and guide visitors into Leviva's booking funnel."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {spotlightDestinations.map((destination) => (
              <article
                key={destination.slug}
                className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg shadow-slate-200/60"
              >
                <div
                  className={`bg-gradient-to-br ${destination.heroGradient} p-8 text-white`}
                >
                  <p className="text-sm uppercase tracking-[0.22em] text-white/80">
                    {destination.country} - {destination.region}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold">{destination.name}</h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/85">
                    {destination.summary}
                  </p>
                </div>
                <div className="p-8">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Ideal stay
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        {destination.idealDuration}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Season
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        {destination.seasonalWindow}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Package guide
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        {destination.priceFrom}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-600">
                    {destination.highlights.slice(0, 3).map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-teal-600" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-medium text-slate-700">
                      Best for: {destination.bestFor.join(", ")}
                    </p>
                    <Link
                      href={`/destinations/${destination.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700"
                    >
                      Explore destination
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <SectionHeading
              eyebrow="Conversion packages"
              title="Package concepts that help visitors choose faster"
              description="Instead of leaving travelers overwhelmed, Leviva can guide them toward proven journeys with clear fit, duration, and pricing anchors."
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {featuredItineraries.map((trip) => (
                <article
                  key={trip.title}
                  className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.22em] text-teal-700">
                        {trip.duration}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold text-slate-950">
                        {trip.title}
                      </h3>
                    </div>
                    <Plane className="h-8 w-8 text-amber-500" />
                  </div>
                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    {trip.summary}
                  </p>
                  <div className="mt-6 rounded-3xl bg-slate-50 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Ideal for
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {trip.idealFor}
                    </p>
                    <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
                      Destinations
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                      {trip.destinations.join(", ")}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-950">
                      {trip.priceFrom}
                    </p>
                    <Link
                      href="/book"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700"
                    >
                      Request itinerary
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="Priority source markets"
            title="The website is built around the audiences Leviva wants most"
            description="Copy, offers, and trip design cues have been tuned to attract and reassure travelers from the priority regions named in the brief."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {sourceMarkets.map((market) => (
              <article
                key={market.market}
                className="rounded-[2rem] border border-slate-200 p-6"
              >
                <p className="text-sm uppercase tracking-[0.22em] text-teal-700">
                  {market.market}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-slate-950">
                  {market.headline}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {market.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-slate-950 text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <SectionHeading
                eyebrow="Why this site converts"
                title="Website mechanics that help Leviva close more bookings"
                description="The build is not just attractive. It is structured around lead quality, response speed, and destination clarity."
                invert
              />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {trustSignals.map((signal) => (
                <article
                  key={signal.title}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="text-xl font-semibold text-white">{signal.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {signal.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="Sales process"
            title="A booking journey designed to reduce friction"
            description="From hero CTA to inquiry submission, each step is built to shorten the gap between inspiration and human follow-up."
            align="center"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {salesProcess.map((item) => (
              <article
                key={item.step}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
                  Step {item.step}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <SectionHeading
              eyebrow="Traveler proof"
              title="Testimonials that reinforce credibility and value"
              description="Social proof makes a strong difference for premium and long-haul travel decisions, especially for first-time Africa guests."
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="rounded-[2rem] border border-slate-200 bg-white p-8"
                >
                  <Star className="h-7 w-7 text-amber-500" />
                  <p className="mt-6 text-base leading-8 text-slate-700">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-8">
                    <p className="font-semibold text-slate-950">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.market}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                eyebrow="Frequently asked questions"
                title="Answer objections before they stop the booking"
                description="High-conversion travel sites anticipate uncertainty around trip combinations, response speed, and destination fit."
              />
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-[2rem] border border-slate-200 bg-white p-6"
                >
                  <summary className="cursor-pointer list-none text-lg font-semibold text-slate-950">
                    {faq.question}
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-teal-700 to-slate-950 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-100">
                Final CTA
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Ready for Leviva to turn interest into confirmed bookings?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-slate-100">
                Publish the site, connect the domain and email settings, and use
                the trip planner to start receiving structured safari and beach
                inquiries immediately.
              </p>
              <div className="mt-8 space-y-4 text-sm text-slate-100">
                <p className="flex items-center gap-3">
                  <MapPinned className="h-5 w-5 text-amber-300" />
                  {company.headquarters}
                </p>
                <p className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-amber-300" />
                  {company.email}
                </p>
                <p className="flex items-center gap-3">
                  <PhoneCall className="h-5 w-5 text-amber-300" />
                  {company.phone}
                </p>
              </div>
            </div>

            <BookingForm />
          </div>
        </section>

        <a
          href={company.whatsappHref}
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-emerald-900/20 transition hover:bg-emerald-400"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp now
        </a>
      </main>
    </>
  );
}

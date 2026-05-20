import {
  ArrowRight,
  BadgeCheck,
  CalendarRange,
  Globe2,
  Landmark,
  MapPinned,
  Mountain,
  PalmTree,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Sunset,
  Users2,
} from "lucide-react";

import { BookingForm } from "@/components/booking-form";

const stats = [
  { value: "Tailor-made", label: "itineraries built around your market, budget, and travel season" },
  { value: "Fast follow-up", label: "clear lead capture for higher booking conversion" },
  { value: "East Africa experts", label: "Tanzania, Zanzibar, Botswana, and multi-country journeys" },
];

const destinations = [
  {
    title: "Tanzania Safari",
    icon: Mountain,
    description:
      "Serengeti, Ngorongoro, Tarangire, and Lake Manyara journeys built for wildlife-first travelers who want smooth logistics and high-value guiding.",
    bestFor: "USA, Europe, Australia, New Zealand",
    highlights: ["Big Five game drives", "Private guides", "Family and honeymoon options"],
  },
  {
    title: "Zanzibar Escape",
    icon: PalmTree,
    description:
      "A high-conversion add-on for safari leads: combine beach downtime, spice tours, Stone Town culture, and premium oceanfront stays.",
    bestFor: "China, South Korea, Europe",
    highlights: ["Safari + beach combos", "Romantic stays", "Short extension packages"],
  },
  {
    title: "Botswana Luxury Safari",
    icon: Sunset,
    description:
      "For premium travelers seeking exclusivity, fly-in camps, and exceptional wildlife viewing in the Okavango Delta and Chobe regions.",
    bestFor: "USA, Europe, Australia",
    highlights: ["Fly-in safaris", "Luxury camps", "Exclusive wildlife areas"],
  },
  {
    title: "East Africa Multi-Country",
    icon: Globe2,
    description:
      "Long-haul travelers can maximize value with curated routes across Tanzania, Zanzibar, Kenya, Rwanda, Uganda, and beyond.",
    bestFor: "USA, Europe, Australia, New Zealand",
    highlights: ["Regional flight planning", "Cross-border support", "Custom pacing"],
  },
];

const audienceFocus = [
  {
    market: "China",
    title: "Clear planning for first-time Africa travelers",
    description:
      "Lead with safety, clarity, and polished routing. Showcase Zanzibar add-ons, scenic lodges, and easy pre-arrival planning.",
  },
  {
    market: "USA",
    title: "Bucket-list safaris and milestone travel",
    description:
      "Promote once-in-a-lifetime wildlife journeys, premium comfort, and seamless long-haul itineraries with strong on-ground support.",
  },
  {
    market: "Europe",
    title: "Wildlife plus culture and value timing",
    description:
      "Highlight flexible shoulder-season trips, cultural experiences, and mix-and-match itineraries across East Africa.",
  },
  {
    market: "South Korea",
    title: "Efficient premium escapes",
    description:
      "Feature shorter but elevated journeys with reliable internal transfers, refined lodges, and memorable Zanzibar extensions.",
  },
  {
    market: "Australia & New Zealand",
    title: "Longer immersive itineraries",
    description:
      "Position East Africa as a multi-stop journey with deeper wildlife experiences, beach recovery time, and well-planned flight connections.",
  },
];

const conversionFeatures = [
  {
    title: "Single-page booking funnel",
    description:
      "High-intent travelers can discover destinations, compare fit, and request a quote without leaving the page.",
    icon: Sparkles,
  },
  {
    title: "Trust-first messaging",
    description:
      "Contact details, clear process, and region-specific travel planning reduce friction for international guests.",
    icon: ShieldCheck,
  },
  {
    title: "Market-specific positioning",
    description:
      "The site speaks directly to key visitor markets to improve lead quality and conversion intent.",
    icon: Users2,
  },
];

const bookingSteps = [
  "Submit your preferred destination, travel month, group size, and budget.",
  "Leviva reviews your brief and prepares a tailored itinerary with the best routing.",
  "Confirm your trip and receive support from planning through arrival in East Africa.",
];

const faqItems = [
  {
    question: "Can Leviva plan both safari and beach holidays?",
    answer:
      "Yes. Tanzania safari plus Zanzibar beach extensions are one of the strongest conversion drivers on the site and can be planned as one itinerary.",
  },
  {
    question: "Do you only serve Tanzania and Zanzibar?",
    answer:
      "No. Leviva focuses heavily on Tanzania and Zanzibar, while also offering Botswana and wider East Africa itineraries for multi-country travelers.",
  },
  {
    question: "Is the booking form suitable for premium travelers?",
    answer:
      "Yes. The form captures travel timing, budget, group size, and destination interest so Leviva can respond with the right level of service from mid-range to ultra-luxury.",
  },
  {
    question: "How should this website be hosted?",
    answer:
      "The best all-around option is Vercel for the Next.js app, with a managed PostgreSQL database from Neon or Supabase. Render and Railway are strong alternatives if you prefer app-plus-database hosting in one dashboard.",
  },
];

export default function HomePage() {
  const travelAgencySchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Leviva Travel & Tours",
    description:
      "Leviva Travel & Tours creates tailor-made trips across Tanzania, Zanzibar, Botswana, and East Africa.",
    email: "info@levivainvestments.co.tz",
    telephone: "+255758996047",
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
    url: "https://www.levivatravel.com",
  };

  return (
    <main className="pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <header className="sticky top-0 z-50 -mx-6 border-b border-white/10 bg-slate-950/80 px-6 backdrop-blur lg:-mx-8 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between py-4">
            <a href="#top" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-300 text-lg font-bold text-slate-950">
                L
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                  Leviva
                </p>
                <p className="text-base font-semibold text-white">Travel & Tours</p>
              </div>
            </a>

            <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
              <a href="#destinations" className="hover:text-white">
                Destinations
              </a>
              <a href="#why-leviva" className="hover:text-white">
                Why Leviva
              </a>
              <a href="#plan" className="hover:text-white">
                How it works
              </a>
              <a href="#faq" className="hover:text-white">
                FAQ
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="tel:+255758996047"
                className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-100 hover:border-amber-300 hover:text-amber-200 sm:inline-flex"
              >
                Call now
              </a>
              <a
                href="#booking"
                className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-200"
              >
                Book your trip
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </header>

        <section
          id="top"
          className="grid gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
              <BadgeCheck className="h-4 w-4" />
              Conversion-focused safari website ready for launch
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Tanzania, Zanzibar, Botswana, and East Africa journeys crafted to convert visitors into bookings.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Leviva Travel & Tours delivers tailor-made safari, beach, honeymoon, family, and premium travel experiences for visitors from China, the USA, Europe, South Korea, Australia, and New Zealand.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#booking"
                className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-200"
              >
                Get my custom itinerary
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="mailto:info@levivainvestments.co.tz"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-white hover:border-white/30"
              >
                Email Leviva
              </a>
            </div>

            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.value} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <dt className="text-lg font-semibold text-white">{item.value}</dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-300">{item.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div id="booking">
            <BookingForm />
          </div>
        </section>

        <section className="grid gap-6 border-y border-white/10 py-10 text-sm text-slate-300 md:grid-cols-3">
          {conversionFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title} className="flex gap-4 rounded-3xl bg-white/5 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-300/15 text-amber-200">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">{feature.title}</h2>
                  <p className="mt-2 leading-6 text-slate-300">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </section>

        <section id="destinations" className="py-20">
          <SectionHeading
            eyebrow="Top destinations"
            title="High-demand trips that help Leviva close more enquiries"
            description="Each destination card is written to match search intent and accelerate quote requests from international travelers."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {destinations.map((destination) => (
              <DestinationCard key={destination.title} {...destination} />
            ))}
          </div>
        </section>

        <section id="why-leviva" className="grid gap-10 py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <SectionHeading
              eyebrow="Why Leviva"
              title="A travel brand positioned to win more direct bookings"
              description="The messaging is designed to lower hesitation, increase trust, and move users faster from browsing to enquiry."
            />

            <ul className="mt-8 space-y-4 text-sm text-slate-300">
              <li className="flex gap-3">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                Tailor-made trip planning instead of generic packages
              </li>
              <li className="flex gap-3">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                Strong safari-to-beach upsell potential with Zanzibar extensions
              </li>
              <li className="flex gap-3">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                Contact-first design with email, call, and quote capture paths
              </li>
              <li className="flex gap-3">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                SEO-friendly destination sections and structured metadata
              </li>
            </ul>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {audienceFocus.map((item) => (
              <div key={item.market} className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                  {item.market}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 py-20 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-8">
            <SectionHeading
              eyebrow="Built for confidence"
              title="Content structure that supports faster decision-making"
              description="This site is optimized for travelers making high-value booking decisions from overseas."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <FeatureTile
                icon={MapPinned}
                title="Destination clarity"
                description="Separate positioning for Tanzania, Zanzibar, Botswana, and East Africa combinations."
              />
              <FeatureTile
                icon={CalendarRange}
                title="Season-aware planning"
                description="Travel month capture helps Leviva answer with relevant timing, routes, and availability."
              />
              <FeatureTile
                icon={Landmark}
                title="Premium-ready offers"
                description="Budget and group-size fields support both mid-range and high-end conversions."
              />
              <FeatureTile
                icon={PhoneCall}
                title="Immediate trust signals"
                description="Visible phone and email options reduce abandonment for high-intent users."
              />
            </div>
          </div>

          <div className="rounded-[2rem] border border-amber-300/15 bg-amber-300/8 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-200">
              Launch recommendations
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Best hosting options for this website
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-6 text-slate-200">
              <p>
                <span className="font-semibold text-white">1. Vercel + Neon/Supabase:</span> Best fit for this Next.js codebase, fast global delivery, smooth deployments, and reliable managed PostgreSQL.
              </p>
              <p>
                <span className="font-semibold text-white">2. Render:</span> Good when you want app hosting and a database in one place with a simple operational model.
              </p>
              <p>
                <span className="font-semibold text-white">3. Railway:</span> Great developer experience for full-stack deployments and quick environment setup.
              </p>
              <p>
                <span className="font-semibold text-white">4. Fly.io:</span> Strong choice if you want Docker-based control and multi-region performance.
              </p>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/50 p-5 text-sm text-slate-300">
              <p className="font-semibold text-white">Recommended production stack</p>
              <p className="mt-2">
                Host the Next.js app on <span className="text-amber-200">Vercel</span>, run the database on <span className="text-amber-200">Neon</span> or <span className="text-amber-200">Supabase</span>, and point your custom domain to the live app for publishing.
              </p>
            </div>
          </div>
        </section>

        <section id="plan" className="py-20">
          <SectionHeading
            eyebrow="How booking works"
            title="A simple 3-step flow designed to lift conversion"
            description="The page keeps the booking path short, clear, and persuasive for long-haul travel buyers."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {bookingSteps.map((step, index) => (
              <div key={step} className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-300 text-lg font-bold text-slate-950">
                  {index + 1}
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="py-20">
          <SectionHeading
            eyebrow="Frequently asked questions"
            title="Key answers before travelers submit an enquiry"
            description="These FAQs reduce friction and reinforce that Leviva is ready for real bookings and publishing."
          />

          <div className="mt-10 grid gap-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 open:border-amber-300/30 open:bg-white/8"
              >
                <summary className="cursor-pointer list-none text-lg font-semibold text-white">
                  {item.question}
                </summary>
                <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-emerald-400/10 via-slate-900 to-amber-300/10 px-8 py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-200">
                Ready to publish
              </p>
              <h2 className="mt-3 text-4xl font-semibold text-white">
                Leviva Travel & Tours now has a modern, hosting-ready conversion website.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                Launch it with a production database and domain, then start capturing Tanzania, Zanzibar, Botswana, and East Africa enquiries immediately.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:info@levivainvestments.co.tz"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-slate-950 hover:bg-slate-100"
              >
                info@levivainvestments.co.tz
              </a>
              <a
                href="tel:+255758996047"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 font-semibold text-white hover:border-white/40"
              >
                +255 758 996 047
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-8 text-slate-300">{description}</p>
    </div>
  );
}

function DestinationCard({
  title,
  icon: Icon,
  description,
  bestFor,
  highlights,
}: {
  title: string;
  icon: typeof Mountain;
  description: string;
  bestFor: string;
  highlights: string[];
}) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-300/15 text-amber-200">
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white">{title}</h3>
          <p className="text-sm text-amber-200">Best fit: {bestFor}</p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-300">{description}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {highlights.map((highlight) => (
          <li
            key={highlight}
            className="rounded-full border border-white/10 bg-slate-950/50 px-4 py-2 text-sm text-slate-200"
          >
            {highlight}
          </li>
        ))}
      </ul>
    </article>
  );
}

function FeatureTile({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof MapPinned;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-200">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
    </div>
  );
}

import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  Clock,
  Mail,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react";
import type { ReactNode } from "react";
import { BookingForm } from "@/components/BookingForm";
import {
  contact,
  destinations,
  packages,
  priorityMarkets,
  processSteps,
  sellingPoints,
  testimonials,
  trustStats,
  whyLeviva,
} from "@/lib/data";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <MarketFocus />
      <Destinations />
      <Packages />
      <WhyLeviva />
      <BookingSection />
      <Reviews />
      <HostingRecommendations />
      <FinalCta />
      <MobileStickyCta />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0b3b25] text-white">
      <div className="absolute inset-0 hero-grid opacity-60" />
      <div className="absolute -left-20 top-20 size-80 rounded-full bg-[#e8a317]/25 blur-3xl" />
      <div className="absolute bottom-0 right-0 size-96 rounded-full bg-emerald-400/20 blur-3xl" />

      <div className="section-shell relative grid gap-12 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-28">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white/90">
            <BadgeCheck className="size-4 text-[#e8a317]" />
            Tanzania based safari and beach specialists
          </div>
          <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Book East Africa with confidence.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
            Leviva Travel and Tours creates high-touch Tanzania safaris, Zanzibar beach
            holidays, Botswana wilderness trips, and East Africa extensions for travelers
            from China, USA, Europe, South Korea, Australia, and New Zealand.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="focus-ring inline-flex items-center justify-center rounded-full bg-[#e8a317] px-7 py-4 text-base font-black text-[#1c1605] shadow-2xl shadow-black/20 transition hover:bg-white"
              href="#booking"
            >
              Request a private quote
              <ArrowRight className="ml-2 size-5" />
            </a>
            <a
              className="focus-ring inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-4 text-base font-black text-white transition hover:bg-white hover:text-[#0b3b25]"
              href={contact.whatsappUrl}
            >
              <MessageCircle className="mr-2 size-5" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="mt-9 grid gap-3 text-sm text-white/70 sm:grid-cols-3">
            {["Private itineraries", "Local destination support", "Safari + beach experts"].map(
              (item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="size-4 text-[#e8a317]" />
                  {item}
                </div>
              ),
            )}
          </div>
        </div>

        <div className="glass-card relative overflow-hidden rounded-[2.5rem] p-4 text-[#152116]">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#f4c66b] via-[#a15c20] to-[#163f2c] p-6 text-white">
            <div className="flex items-center justify-between">
              <p className="rounded-full bg-white/20 px-4 py-2 text-xs font-black uppercase tracking-[0.22em]">
                Featured route
              </p>
              <div className="flex text-[#ffd76a]" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-4 fill-current" />
                ))}
              </div>
            </div>
            <div className="mt-28 rounded-[1.5rem] bg-black/30 p-5 backdrop-blur-md">
              <h2 className="text-3xl font-black">Serengeti to Zanzibar</h2>
              <p className="mt-3 text-sm leading-6 text-white/80">
                Combine migration game drives, Ngorongoro Crater, cultural experiences,
                and a beach finale designed for romantic trips, families, and private groups.
              </p>
            </div>
          </div>

          <div className="grid gap-3 p-4 sm:grid-cols-2">
            <MiniContact icon={<Phone className="size-4" />} label="Call" value={contact.phoneDisplay} />
            <MiniContact icon={<Mail className="size-4" />} label="Email" value={contact.email} />
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniContact({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#146c43]">
        {icon}
        {label}
      </div>
      <p className="mt-2 text-sm font-bold text-stone-800">{value}</p>
    </div>
  );
}

function TrustBar() {
  return (
    <section className="-mt-8 relative z-10">
      <div className="section-shell glass-card grid gap-4 rounded-[2rem] p-5 sm:grid-cols-2 lg:grid-cols-4">
        {trustStats.map((stat) => (
          <div key={stat.label} className="rounded-3xl bg-white p-5 text-center shadow-sm">
            <p className="text-3xl font-black text-[#146c43]">{stat.value}</p>
            <p className="mt-1 text-sm font-semibold text-stone-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MarketFocus() {
  return (
    <section className="section-shell py-20">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#146c43]">
            Priority source markets
          </p>
          <h2 className="mt-4 text-4xl font-black text-[#0b3b25] text-balance">
            Built for long-haul travelers who need clarity before they book.
          </h2>
          <p className="mt-4 text-lg leading-8 text-stone-600">
            The site emphasizes fast response, transparent trip styles, direct WhatsApp access,
            and packages shaped around the expectations of high-value travel markets.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {priorityMarkets.map((market) => (
            <div
              key={market}
              className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-lg font-black text-stone-900">{market}</span>
                <ChevronRight className="size-5 text-[#e8a317]" />
              </div>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                Private planning, easy contact, destination proof, and quote-first booking support.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Destinations() {
  return (
    <section className="bg-white py-20" id="destinations">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Destinations"
          title="Core routes across Tanzania, Zanzibar, Botswana, and East Africa."
          body="Each destination block is written to answer the questions guests ask before submitting a booking inquiry: what they will see, why it matters, and which trip style fits."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {destinations.map((destination) => (
            <article
              key={destination.name}
              className="overflow-hidden rounded-[2rem] border border-stone-200 bg-[#fffaf0] shadow-sm"
            >
              <div className={`h-48 bg-gradient-to-br ${destination.imageTone}`} />
              <div className="p-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#146c43]">
                  {destination.region}
                </p>
                <h3 className="mt-3 text-2xl font-black text-[#0b3b25]">{destination.name}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{destination.summary}</p>
                <div className="mt-5 grid gap-2">
                  {destination.highlights.map((highlight) => (
                    <p key={highlight} className="flex items-center gap-2 text-sm font-semibold">
                      <Check className="size-4 text-[#146c43]" />
                      {highlight}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section className="section-shell py-20" id="packages">
      <SectionHeader
        eyebrow="Safari packages"
        title="Trip ideas designed to turn interest into booking inquiries."
        body="Prices are positioned as starting guidance so Leviva can qualify budget, timing, comfort level, and availability before sending a final proposal."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {packages.map((tour) => (
          <article
            key={tour.title}
            className="flex flex-col rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#146c43]">
                {tour.duration}
              </span>
              <span className="text-sm font-black text-[#e08d00]">{tour.price}</span>
            </div>
            <h3 className="mt-5 text-2xl font-black text-[#0b3b25]">{tour.title}</h3>
            <p className="mt-3 text-sm font-semibold text-stone-500">{tour.idealFor}</p>
            <p className="mt-4 text-sm leading-6 text-stone-700">{tour.route}</p>
            <div className="mt-5 grid gap-2">
              {tour.inclusions.map((inclusion) => (
                <p key={inclusion} className="flex items-center gap-2 text-sm text-stone-700">
                  <Check className="size-4 shrink-0 text-[#146c43]" />
                  {inclusion}
                </p>
              ))}
            </div>
            <div className="mt-auto pt-6">
              <p className="rounded-2xl bg-[#fff7e8] p-4 text-sm font-bold text-[#7c4a00]">
                {tour.conversionNote}
              </p>
              <a
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#146c43] px-5 py-3 text-sm font-black text-white transition hover:bg-[#0b3b25]"
                href="#booking"
              >
                Customize this trip
                <ArrowRight className="ml-2 size-4" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function WhyLeviva() {
  return (
    <section className="bg-[#0b3b25] py-20 text-white" id="why-leviva">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Why Leviva"
          isDark
          title="A booking experience designed around trust, speed, and local expertise."
          body="The site gives guests immediate reasons to inquire and gives Leviva clean lead data for follow-up."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {whyLeviva.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-[2rem] border border-white/10 bg-white/10 p-6">
                <div className="grid size-12 place-items-center rounded-2xl bg-[#e8a317] text-[#1c1605]">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{item.body}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 grid gap-4 rounded-[2rem] bg-white p-5 text-[#152116] lg:grid-cols-6">
          {sellingPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div key={point.label} className="rounded-3xl bg-[#fff7e8] p-4">
                <Icon className="size-6 text-[#146c43]" />
                <p className="mt-3 text-sm font-black">{point.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BookingSection() {
  return (
    <section className="section-shell grid gap-10 py-20 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
      <div className="lg:sticky lg:top-28">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-[#146c43]">
          Conversion flow
        </p>
        <h2 className="mt-4 text-4xl font-black text-[#0b3b25] text-balance">
          Short inquiry form, direct contact, and fast next step.
        </h2>
        <p className="mt-4 text-lg leading-8 text-stone-600">
          High-intent travelers can request a private proposal without searching for contact
          details or navigating a complex checkout.
        </p>
        <div className="mt-8 grid gap-4">
          {processSteps.map((step, index) => (
            <div key={step.title} className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#146c43] text-sm font-black text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-black text-[#0b3b25]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{step.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BookingForm />
    </section>
  );
}

function Reviews() {
  return (
    <section className="bg-white py-20" id="reviews">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Guest proof"
          title="Social proof for premium source markets."
          body="Review cards help reduce hesitation and reinforce the promise of responsive, tailor-made planning."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.guest} className="rounded-[2rem] bg-[#fffaf0] p-7 shadow-sm">
              <div className="flex text-[#e8a317]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-5 text-lg font-bold leading-8 text-[#0b3b25]">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-stone-600">
                {testimonial.guest} - {testimonial.market}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function HostingRecommendations() {
  const hosts = [
    {
      name: "Vercel",
      bestFor: "Best overall for this Next.js stack",
      detail:
        "Fast global CDN, built-in serverless API routes for leads, preview deployments, SSL, analytics options, and simple custom domain setup.",
    },
    {
      name: "Netlify",
      bestFor: "Great marketing-site workflow",
      detail:
        "Strong CDN, forms and serverless functions, easy deploy previews, and straightforward domain/SSL management.",
    },
    {
      name: "Render",
      bestFor: "Simple full-stack hosting",
      detail:
        "Good if Leviva later adds a persistent backend service, database, or admin dashboard alongside the public website.",
    },
    {
      name: "AWS Amplify",
      bestFor: "Enterprise cloud path",
      detail:
        "Useful for teams already on AWS that want managed hosting, CDN, authentication, and deeper cloud integrations.",
    },
  ];

  return (
    <section className="section-shell py-20">
      <SectionHeader
        eyebrow="Publishing and hosting"
        title="Recommended hosting sites for launch."
        body="For this website, Vercel is the strongest first choice because it is optimized for Next.js and supports both frontend pages and backend API routes."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-4">
        {hosts.map((host) => (
          <article key={host.name} className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Clock className="size-5 text-[#146c43]" />
              <h3 className="text-xl font-black text-[#0b3b25]">{host.name}</h3>
            </div>
            <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-[#e08d00]">
              {host.bestFor}
            </p>
            <p className="mt-4 text-sm leading-6 text-stone-600">{host.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="section-shell pb-20">
      <div className="overflow-hidden rounded-[2.5rem] bg-[#146c43] p-8 text-white shadow-2xl shadow-emerald-950/20 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#e8a317]">
              Ready to publish
            </p>
            <h2 className="mt-4 text-4xl font-black text-balance">
              Launch Leviva with a premium booking-first travel website.
            </h2>
            <p className="mt-4 max-w-3xl text-white/75">
              Connect the lead API to a CRM or email automation webhook, point the domain,
              and begin collecting qualified safari and beach holiday inquiries.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              className="inline-flex items-center justify-center rounded-full bg-[#e8a317] px-7 py-4 text-base font-black text-[#1c1605] transition hover:bg-white"
              href="#booking"
            >
              Start booking inquiry
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 text-base font-black text-white transition hover:bg-white hover:text-[#146c43]"
              href={`mailto:${contact.email}`}
            >
              Email Leviva
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/40 bg-white/95 p-3 shadow-2xl backdrop-blur-xl sm:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a
          className="inline-flex items-center justify-center rounded-full bg-[#146c43] px-4 py-3 text-sm font-black text-white"
          href="#booking"
        >
          Get quote
        </a>
        <a
          className="inline-flex items-center justify-center rounded-full border border-[#146c43]/25 px-4 py-3 text-sm font-black text-[#146c43]"
          href={contact.whatsappUrl}
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}

function SectionHeader({
  body,
  eyebrow,
  isDark = false,
  title,
}: {
  body: string;
  eyebrow: string;
  isDark?: boolean;
  title: string;
}) {
  return (
    <div className="max-w-3xl">
      <p
        className={`text-sm font-black uppercase tracking-[0.24em] ${
          isDark ? "text-[#e8a317]" : "text-[#146c43]"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-4xl font-black text-balance sm:text-5xl ${
          isDark ? "text-white" : "text-[#0b3b25]"
        }`}
      >
        {title}
      </h2>
      <p className={`mt-4 text-lg leading-8 ${isDark ? "text-white/70" : "text-stone-600"}`}>
        {body}
      </p>
    </div>
  );
}

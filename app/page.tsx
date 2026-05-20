import Link from "next/link";
import { Hero } from "@/components/hero";
import { TourCard } from "@/components/tour-card";
import { DestinationCard } from "@/components/destination-card";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site";
import {
  ShieldCheck,
  Globe2,
  CalendarHeart,
  HeartHandshake,
  ArrowRight,
  Star,
  CheckCircle2,
  Sparkles
} from "lucide-react";

export const revalidate = 600;

async function loadData() {
  const [featuredTours, destinations, reviews] = await Promise.all([
    prisma.tour.findMany({
      where: { featured: true },
      include: { destination: true },
      orderBy: { priceUsd: "asc" },
      take: 6
    }),
    prisma.destination.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { tours: true } } }
    }),
    prisma.review.findMany({ orderBy: { createdAt: "desc" }, take: 6 })
  ]);
  return { featuredTours, destinations, reviews };
}

export default async function HomePage() {
  const { featuredTours, destinations, reviews } = await loadData();

  return (
    <>
      <Hero />

      {/* Trust strip */}
      <section className="border-y border-savanna-100 bg-white">
        <div className="container grid grid-cols-2 gap-6 py-6 text-center text-xs font-medium uppercase tracking-widest text-savanna-700 md:grid-cols-5">
          {siteConfig.trustBadges.map((b) => (
            <div key={b} className="flex items-center justify-center gap-2">
              <ShieldCheck className="h-4 w-4 text-acacia-600" />
              <span>{b}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Destinations */}
      <section className="container py-16">
        <div className="mb-10 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
          <div>
            <span className="section-eyebrow">Where we travel</span>
            <h2 className="section-heading">Iconic East &amp; Southern African destinations</h2>
            <p className="mt-2 max-w-2xl text-savanna-700">
              From the endless plains of the Serengeti to the spice islands of Zanzibar and the
              waterways of the Okavango Delta — we craft seamless multi-country journeys.
            </p>
          </div>
          <Link href="/destinations" className="hidden md:inline-flex btn-secondary">
            All destinations <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => (
            <DestinationCard
              key={d.id}
              destination={{
                slug: d.slug,
                name: d.name,
                country: d.country,
                tagline: d.tagline,
                heroImage: d.heroImage,
                tourCount: d._count.tours
              }}
            />
          ))}
        </div>
      </section>

      {/* Why choose Leviva */}
      <section className="bg-acacia-50/60 py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <span className="section-eyebrow">Why Leviva</span>
            <h2 className="section-heading">Booking direct = better trip, better price</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <ShieldCheck className="h-7 w-7" />,
                title: "Financial protection",
                copy: "Every deposit is held in an escrowed operator account. Travel insured & TATO licensed."
              },
              {
                icon: <Globe2 className="h-7 w-7" />,
                title: "Multilingual experts",
                copy: "English, 中文, 한국어, Deutsch, Français, Español. WeChat & WhatsApp support 24/7."
              },
              {
                icon: <CalendarHeart className="h-7 w-7" />,
                title: "Flexible & private",
                copy: "Free changes up to 30 days out. 100% private departures — no strangers in your vehicle."
              },
              {
                icon: <HeartHandshake className="h-7 w-7" />,
                title: "Local impact",
                copy: "Locally owned operator, KPAP-certified porter welfare, carbon-offset on every booking."
              }
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-6 shadow-card">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-acacia-700 text-white">
                  {item.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-savanna-900">{item.title}</h3>
                <p className="mt-2 text-sm text-savanna-700">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured tours */}
      <section className="container py-16">
        <div className="mb-10 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
          <div>
            <span className="section-eyebrow">Hand-picked itineraries</span>
            <h2 className="section-heading">Most-loved safari &amp; beach tours</h2>
            <p className="mt-2 max-w-2xl text-savanna-700">
              Pre-designed itineraries you can book in minutes — or use as a starting point for a
              fully tailored adventure.
            </p>
          </div>
          <Link href="/tours" className="hidden md:inline-flex btn-secondary">
            See all tours <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredTours.map((t) => (
            <TourCard
              key={t.id}
              tour={{
                slug: t.slug,
                title: t.title,
                summary: t.summary,
                durationDays: t.durationDays,
                priceUsd: t.priceUsd,
                ratingAvg: t.ratingAvg,
                reviewsCount: t.reviewsCount,
                heroImage: t.heroImage,
                category: t.category,
                destination: { slug: t.destination.slug, name: t.destination.name }
              }}
            />
          ))}
        </div>
      </section>

      {/* Source markets */}
      <section className="bg-savanna-900 py-16 text-white">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="section-eyebrow !text-sunset-400">Global travellers, local roots</span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Specialists for travellers from China, the US, Europe, South Korea, Australia and New
              Zealand.
            </h2>
            <p className="mt-4 text-savanna-200">
              We coordinate visa support, multi-lingual guides, dietary requirements (halal, kosher,
              vegan, Asian, Korean breakfast on request), international wire/Alipay/UnionPay
              payments and time-zone aware support so booking is effortless.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {siteConfig.sourceMarkets.map((m) => (
                <span
                  key={m.code}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm"
                >
                  <span className="text-lg">{m.flag}</span> {m.label}
                </span>
              ))}
            </div>
          </div>
          <ul className="space-y-4">
            {siteConfig.guaranteeBullets.map((b) => (
              <li key={b} className="flex items-start gap-3 rounded-xl bg-savanna-950/50 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-acacia-300" />
                <span className="text-savanna-100">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reviews */}
      <section className="container py-16">
        <div className="mb-10 text-center">
          <span className="section-eyebrow">Real stories</span>
          <h2 className="section-heading">Loved by travellers across 6 continents</h2>
          <div className="mt-3 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 font-semibold text-savanna-900">4.9</span>
            <span className="text-savanna-600">/ 5 from 1,200+ reviews</span>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-2xl bg-white p-6 shadow-card">
              <div className="mb-3 flex items-center gap-1">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-savanna-800">“{r.comment}”</p>
              <div className="mt-4 text-sm font-semibold text-savanna-900">
                {r.author}{" "}
                <span className="font-normal text-savanna-600">— {r.country}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80')"
          }}
        />
        <div className="absolute inset-0 -z-10 bg-savanna-950/70" />
        <div className="container py-20 text-center text-white">
          <Sparkles className="mx-auto mb-3 h-8 w-8 text-sunset-300" />
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Ready to start planning your African adventure?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/85">
            Tell us your dates, dream destinations and budget — we'll send a tailored itinerary
            within 12 hours. Zero obligation.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/book" className="btn-primary">
              Start my free quote
            </Link>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              WhatsApp us instead
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

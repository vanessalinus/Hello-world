import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import { SectionHeading } from "@/components/section-heading";
import { company, destinations, getDestination } from "@/lib/content";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return destinations.map((destination) => ({
    slug: destination.slug,
  }));
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);

  if (!destination) {
    return {
      title: "Destination not found",
    };
  }

  return {
    title: destination.name,
    description: destination.seoDescription,
    alternates: {
      canonical: `${company.siteUrl}/destinations/${destination.slug}`,
    },
  };
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = getDestination(slug);

  if (!destination) {
    notFound();
  }

  return (
    <main className="bg-white">
      <section className={`bg-gradient-to-br ${destination.heroGradient} text-white`}>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
            {destination.country} - {destination.region}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            {destination.name}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/90">
            {destination.summary}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Request this trip
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={company.whatsappHref}
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              WhatsApp Leviva
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Ideal stay
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-950">
              {destination.idealDuration}
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Best season
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-950">
              {destination.seasonalWindow}
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Price guide
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-950">
              {destination.priceFrom}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-4 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-10">
        <div>
          <SectionHeading
            eyebrow="Why travelers book this"
            title={`What makes ${destination.name} compelling`}
            description="The page structure helps Leviva communicate fit, trip style, and logistics clearly enough to turn interest into action."
          />

          <ul className="mt-8 space-y-4">
            {destination.highlights.map((highlight) => (
              <li
                key={highlight}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionHeading
            eyebrow="Best for"
            title="Traveler profiles that fit this route"
            description="Use these fit cues to shorten decision time for visitors comparing multiple destinations."
          />

          <div className="mt-8 flex flex-wrap gap-3">
            {destination.bestFor.map((profile) => (
              <span
                key={profile}
                className="rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-800"
              >
                {profile}
              </span>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] border border-slate-200 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
              Signature experiences
            </p>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
              {destination.experiences.map((experience) => (
                <li key={experience} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-amber-500" />
                  <span>{experience}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="Sample flow"
            title={`How a ${destination.name} itinerary can unfold`}
            description="Use the sample plan as a sales aid to make the destination feel tangible before Leviva sends the personalized quote."
            align="center"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {destination.samplePlan.map((day, index) => (
              <article
                key={day}
                className="rounded-[2rem] border border-slate-200 bg-white p-6"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
                  Stage {index + 1}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-700">{day}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="rounded-[2.5rem] bg-slate-950 px-8 py-12 text-white lg:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">
            Next step
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight">
            Ready for Leviva to build your {destination.name.toLowerCase()} trip?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
            Send the dates, group size, and preferred experience style through the
            booking planner. Leviva can then reply with a tailored safari or beach
            proposal instead of a generic quote.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
            >
              Start the booking planner
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={company.phoneHref}
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Call {company.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

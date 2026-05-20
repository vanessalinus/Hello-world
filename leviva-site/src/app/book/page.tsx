import { BookingForm } from "@/components/booking-form";
import { SectionHeading } from "@/components/section-heading";
import { company, featuredItineraries, sourceMarkets } from "@/lib/content";

export const metadata = {
  title: "Book a Trip",
  description:
    "Send a tailored trip request to Leviva Travel & Tours for Tanzania safari, Zanzibar beach, Botswana extensions, and East Africa journeys.",
};

export default function BookPage() {
  return (
    <main className="bg-white">
      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">
              Book with Leviva
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              Send your trip request and let Leviva tailor the itinerary
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              This planner captures the exact details needed to turn an inquiry
              into a confident proposal: source market, preferred destinations,
              dates, budget, and travel style.
            </p>
            <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-200">
                Direct contact
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Email: {company.email}
              </p>
              <p className="text-sm leading-7 text-slate-300">
                Phone / WhatsApp: {company.phone}
              </p>
            </div>
          </div>

          <BookingForm />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading
          eyebrow="What converts best"
          title="Popular trip types visitors can request"
          description="Keeping focused itinerary ideas close to the form helps travelers choose faster and submit with more clarity."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featuredItineraries.map((trip) => (
            <article
              key={trip.title}
              className="rounded-[2rem] border border-slate-200 p-8"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
                {trip.duration}
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                {trip.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {trip.summary}
              </p>
              <div className="mt-6 rounded-3xl bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Guide price
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-950">
                  {trip.priceFrom}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionHeading
            eyebrow="Market fit"
            title="Tailored for Leviva's priority inbound audiences"
            description="Source-market fields help the team respond with the right trip framing, pacing, and upsell strategy from the first message."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {sourceMarkets.map((market) => (
              <article
                key={market.market}
                className="rounded-[2rem] border border-slate-200 bg-white p-6"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
                  {market.market}
                </p>
                <h2 className="mt-4 text-xl font-semibold text-slate-950">
                  {market.headline}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {market.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

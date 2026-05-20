const quotes = [
  {
    quote:
      "Clear day-by-day pacing and honest guidance on where splurge camps actually earn their premium.",
    name: "Guest from California",
    trip: "Tanzania + Zanzibar",
  },
  {
    quote:
      "We appreciated the routing advice via the Gulf — less backtracking than our first safari elsewhere.",
    name: "Family from Seoul",
    trip: "Serengeti & Ngorongoro",
  },
  {
    quote:
      "WhatsApp answers during our travels made last-minute flight changes survivable.",
    name: "Couple from Sydney",
    trip: "Botswana fly-in circuit",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <h2 className="font-display text-3xl text-stone-900 sm:text-4xl">
        Why travellers choose Leviva
      </h2>
      <p className="mt-2 max-w-2xl text-stone-600">
        Social proof matters when you are wiring deposits across continents. Here
        is what recent guests highlight first.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {quotes.map((q) => (
          <figure
            key={q.name}
            className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
          >
            <blockquote className="flex-1 text-sm leading-relaxed text-stone-700">
              “{q.quote}”
            </blockquote>
            <figcaption className="mt-6 border-t border-stone-100 pt-4 text-sm">
              <p className="font-semibold text-stone-900">{q.name}</p>
              <p className="text-stone-500">{q.trip}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

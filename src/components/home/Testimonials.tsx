const testimonials = [
  {
    name: "Wei L.",
    market: "🇨🇳 China",
    text: "Leviva arranged our family Serengeti + Zanzibar trip flawlessly. Chinese-speaking coordinator was a huge plus.",
    tour: "Zanzibar Beach & Safari Combo",
  },
  {
    name: "Sarah M.",
    market: "🇺🇸 USA",
    text: "Best safari experience of my life. Transparent pricing, no hidden fees, and they handled every visa question.",
    tour: "Serengeti Great Migration",
  },
  {
    name: "Hans K.",
    market: "🇪🇺 Germany",
    text: "Okavango Delta luxury camp exceeded expectations. Professional guides and eco-conscious operations.",
    tour: "Okavango Delta Luxury",
  },
  {
    name: "Ji-hoon P.",
    market: "🇰🇷 South Korea",
    text: "Kilimanjaro summit with Leviva's team — safe, organized, and incredible porter support throughout.",
    tour: "Kilimanjaro Machame Route",
  },
  {
    name: "Emma T.",
    market: "🇦🇺 Australia",
    text: "From first WhatsApp message to landing in Arusha, everything was seamless. Highly recommend for Aussies.",
    tour: "Maasai Mara Kenya Safari",
  },
  {
    name: "James R.",
    market: "🇳🇿 New Zealand",
    text: "Gorilla trekking in Uganda was the highlight of our honeymoon. Leviva secured permits months ahead.",
    tour: "Uganda Gorilla Trekking",
  },
];

export function Testimonials() {
  return (
    <section className="bg-safari-100 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl font-bold text-safari-950 sm:text-4xl">
          Loved by Travelers Worldwide
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-safari-600">
          Real reviews from our core markets — China, USA, Europe, Korea, Australia & New Zealand.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="flex text-terracotta-500">★★★★★</div>
              <p className="mt-3 text-safari-700">&ldquo;{t.text}&rdquo;</p>
              <footer className="mt-4 border-t border-safari-100 pt-4">
                <p className="font-semibold text-safari-950">{t.name}</p>
                <p className="text-sm text-safari-500">{t.market}</p>
                <p className="mt-1 text-xs text-forest-700">{t.tour}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

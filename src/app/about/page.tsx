import Image from "next/image";
import Link from "next/link";
import { SITE, MARKETS } from "@/lib/utils";

export const metadata = {
  title: "About Us",
  description:
    "Leviva Travel & Tours — licensed Tanzania operator serving international safari travelers since day one.",
};

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="font-display text-4xl font-bold text-safari-950 sm:text-5xl">
              About Leviva Travel & Tours
            </h1>
            <p className="mt-6 text-lg text-safari-700">
              Leviva is a licensed Tanzania-based tour operator specializing in premium safaris,
              Kilimanjaro expeditions, Zanzibar beach holidays, and cross-border East Africa
              itineraries including Botswana.
            </p>
            <p className="mt-4 text-safari-700">
              We built our business around international travelers — particularly from{" "}
              {MARKETS.map((m) => m.label).join(", ")} — who demand transparent pricing,
              responsive communication across time zones, and seamless on-ground execution.
            </p>
            <Link
              href="/book"
              className="mt-8 inline-flex rounded-full bg-terracotta-500 px-8 py-3 font-semibold text-white hover:bg-terracotta-600"
            >
              Plan Your Safari
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1504177847864-41bdac7d2c5e?w=800&q=80"
              alt="Safari guide with guests"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { stat: "2,400+", label: "Happy travelers" },
            { stat: "8+", label: "Years experience" },
            { stat: "40+", label: "Expert guides" },
            { stat: "6", label: "International markets" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white p-6 text-center shadow-sm"
            >
              <p className="font-display text-4xl font-bold text-forest-800">{item.stat}</p>
              <p className="mt-2 text-sm text-safari-600">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-2xl bg-safari-100 p-8 sm:p-12">
          <h2 className="font-display text-2xl font-bold text-safari-950">Why choose Leviva?</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Licensed Tanzania tour operator with full insurance",
              "Dedicated coordinators for China, Korea & Western markets",
              "24/7 WhatsApp support before, during, and after your trip",
              "Transparent USD pricing with no hidden park fees",
              "Eco-conscious partners and community lodge options",
              "Flexible payment plans and multi-currency invoicing",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-safari-700">
                <span className="text-terracotta-500">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-safari-600">
            Contact us:{" "}
            <a href={`mailto:${SITE.email}`} className="text-terracotta-600 hover:underline">
              {SITE.email}
            </a>{" "}
            · {SITE.phone}
          </p>
        </div>
      </div>
    </div>
  );
}

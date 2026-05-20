import Link from "next/link";
import { MessageCircle, Calendar, CreditCard } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Tell us your dream safari",
    desc: "3-minute form or WhatsApp chat. Share dates, group size, and interests.",
  },
  {
    icon: Calendar,
    title: "Receive custom itinerary",
    desc: "Expert planners send a tailored quote within 24 hours — free, no obligation.",
  },
  {
    icon: CreditCard,
    title: "Secure your adventure",
    desc: "Flexible deposits, multi-currency invoicing, and ATOL-ready partner options.",
  },
];

export function ConversionSection() {
  return (
    <section className="bg-forest-800 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Book in 3 Simple Steps
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-safari-200">
            Designed for international travelers — minimal friction, maximum clarity.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-2xl bg-forest-700/50 p-8 text-center"
            >
              <span className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-terracotta-500 text-sm font-bold">
                {i + 1}
              </span>
              <step.icon className="mx-auto h-10 w-10 text-terracotta-400" />
              <h3 className="mt-4 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-safari-200">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/book"
            className="inline-flex rounded-full bg-terracotta-500 px-10 py-4 text-lg font-semibold text-white transition hover:bg-terracotta-600"
          >
            Start Your Free Quote →
          </Link>
        </div>
      </div>
    </section>
  );
}

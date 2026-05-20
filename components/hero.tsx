import Link from "next/link";
import { Star, ShieldCheck, Award } from "lucide-react";
import { QuickInquiryForm } from "@/components/quick-inquiry-form";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1920&q=80')"
        }}
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-hero-gradient" aria-hidden />

      <div className="container relative grid gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
        <div className="text-white animate-fade-up">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest backdrop-blur">
            <Award className="h-4 w-4" /> Award-winning East Africa specialists
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Tanzania, Zanzibar &amp; Botswana —
            <span className="block text-savanna-200">curated safari journeys.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">
            Tailor-made adventures for travellers from 🇨🇳 🇺🇸 🇪🇺 🇰🇷 🇦🇺 🇳🇿. Big-Five game drives,
            Kilimanjaro summits, Okavango Delta water safaris and palm-fringed beaches — booked
            directly with the operator on the ground.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="/tours" className="btn-primary">
              Explore Safaris
            </Link>
            <Link href="/book" className="btn-outline">
              Get Free Quote in 12h
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-white/90">
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-semibold">4.9/5</span>
              <span className="text-white/70">· 1,200+ travellers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-acacia-300" />
              <span>Licensed & financially protected</span>
            </div>
            <div className="hidden md:block">
              <span className="rounded bg-white/15 px-2 py-1 text-xs">TripAdvisor Travellers' Choice</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur lg:p-7 animate-fade-up">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-sunset-500">
              Free trip planner
            </p>
            <h2 className="font-display text-2xl font-bold text-savanna-900">
              Get a custom quote in 12 hours
            </h2>
            <p className="mt-1 text-sm text-savanna-700">
              No payment required. Speak with a destination expert today.
            </p>
          </div>
          <QuickInquiryForm />
        </div>
      </div>
    </section>
  );
}

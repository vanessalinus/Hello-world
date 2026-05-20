import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Globe,
  Shield,
  Users,
  Award,
  Target,
  Leaf,
} from "lucide-react";
import { stats } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Leviva Travel & Tours — a Tanzania-based tour operator with 12+ years of experience creating unforgettable African safari adventures for travelers worldwide.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[300px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl font-bold mb-4">About Leviva Travel</h1>
          <p className="text-xl text-white/90 max-w-xl">
            Born in Tanzania. Trusted worldwide. Your personal gateway to
            Africa&apos;s greatest adventures.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed text-lg">
                <p>
                  Leviva Travel & Tours was born from a deep love for East
                  Africa and a desire to share its wonders with the world. Based
                  in Arusha, Tanzania — the safari capital of Africa — we are a
                  team of passionate local experts who know every trail, every
                  waterhole, and every secret sunset viewpoint.
                </p>
                <p>
                  Over the past 12 years, we have guided more than 15,000
                  travelers from China, the United States, Europe, South Korea,
                  Australia, New Zealand, and beyond through some of the most
                  extraordinary landscapes on Earth.
                </p>
                <p>
                  We believe that travel should be transformative. Every
                  itinerary we create is tailored to our guests&apos; unique
                  interests, pace, and budget — because no two adventurers are
                  the same. Whether it&apos;s a once-in-a-lifetime Serengeti
                  migration safari, a romantic Zanzibar beach escape, or a
                  challenging Kilimanjaro summit, we pour our hearts into making
                  every trip extraordinary.
                </p>
              </div>
            </div>
            <div className="relative">
              <div
                className="rounded-2xl overflow-hidden h-[500px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80')",
                }}
              />
              <div className="absolute -bottom-6 -left-6 bg-amber-500 text-white rounded-2xl p-6 shadow-xl">
                <p className="text-3xl font-bold">12+</p>
                <p className="text-amber-100">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-amber-400">
                  {stat.value}
                </p>
                <p className="text-stone-300 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              These principles guide everything we do — from planning your
              itinerary to the moment you say goodbye.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Passion",
                desc: "We love what we do. That passion shines through in every safari, every sunset, and every guest interaction.",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Trust",
                desc: "Licensed, insured, and transparent. We earn your confidence through honesty and reliability.",
              },
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "Sustainability",
                desc: "We protect the wild places we love. Community-first tourism that preserves Africa for future generations.",
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Excellence",
                desc: "Every detail matters. From your first inquiry to your farewell dinner, we strive for perfection.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-8 text-center shadow-md border border-stone-100"
              >
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mx-auto mb-5">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">
                  {v.title}
                </h3>
                <p className="text-stone-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 rounded-3xl p-10 sm:p-16 text-center">
            <Globe className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              We Speak Your Language
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-8">
              Our multilingual team ensures travelers from around the world feel
              at home. We welcome guests in:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { lang: "English", flag: "🇬🇧" },
                { lang: "Swahili", flag: "🇹🇿" },
                { lang: "中文 (Chinese)", flag: "🇨🇳" },
                { lang: "한국어 (Korean)", flag: "🇰🇷" },
                { lang: "Français", flag: "🇫🇷" },
                { lang: "Deutsch", flag: "🇩🇪" },
              ].map((l) => (
                <div
                  key={l.lang}
                  className="bg-white rounded-xl px-6 py-3 shadow-sm border border-stone-100 flex items-center gap-2"
                >
                  <span className="text-2xl">{l.flag}</span>
                  <span className="font-medium text-stone-800">{l.lang}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-amber-500 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Planning?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Let our local experts craft the perfect African adventure for you.
            Free consultation — no strings attached.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 bg-white text-amber-600 hover:bg-amber-50 px-8 py-4 rounded-full font-bold text-lg transition-all"
          >
            Get Your Free Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}

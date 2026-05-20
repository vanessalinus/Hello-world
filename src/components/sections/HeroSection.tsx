"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Star, Shield, Award } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80",
    title: "Witness the Great",
    titleBold: "Wildebeest Migration",
    subtitle: "Serengeti National Park, Tanzania",
    cta: "Explore Serengeti Safaris",
    href: "/tours/serengeti-wildebeest-migration-safari",
  },
  {
    image: "https://images.unsplash.com/photo-1586335963805-4ae6c0f14f43?w=1920&q=80",
    title: "Paradise Found in",
    titleBold: "Zanzibar",
    subtitle: "Indian Ocean's Spice Island",
    cta: "Discover Zanzibar",
    href: "/tours/zanzibar-beach-paradise",
  },
  {
    image: "https://images.unsplash.com/photo-1551887373-6edba6dacbb1?w=1920&q=80",
    title: "Africa's Eden –",
    titleBold: "Okavango Delta",
    subtitle: "Botswana's Wilderness Jewel",
    cta: "Explore Botswana",
    href: "/tours/botswana-okavango-delta-safari",
  },
  {
    image: "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=1920&q=80",
    title: "Conquer the",
    titleBold: "Roof of Africa",
    subtitle: "Mount Kilimanjaro, Tanzania",
    cta: "Climb Kilimanjaro",
    href: "/tours/kilimanjaro-summit-climb",
  },
];

const stats = [
  { value: "500+", label: "Happy Travelers" },
  { value: "4.9★", label: "Average Rating" },
  { value: "15+", label: "Years Experience" },
  { value: "100%", label: "Safe Record" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background images */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.image}
            alt={s.subtitle}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pt-24">
        <div className="max-w-3xl">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Shield size={14} className="text-brand-300" />
            <span className="text-white text-sm font-medium">
              Tanzania's Most Trusted Safari Company
            </span>
            <Award size={14} className="text-yellow-400" />
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-4">
            {slide.title}{" "}
            <span className="text-brand-400">{slide.titleBold}</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 mb-2 font-light">{slide.subtitle}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-white/80 text-sm ml-1">Rated 4.9/5 by 500+ travelers</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={slide.href}
              className="group inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl"
            >
              {slide.cta}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Quick search hint */}
          <div className="mt-8 flex flex-wrap gap-2">
            {["Serengeti Safari", "Zanzibar Beach", "Kilimanjaro", "Botswana"].map((tag) => (
              <Link
                key={tag}
                href={`/tours?q=${encodeURIComponent(tag)}`}
                className="text-sm text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
            >
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/70 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-brand-400 w-8" : "bg-white/40 w-4"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs tracking-widest uppercase rotate-90 mb-2">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" />
      </div>
    </section>
  );
}

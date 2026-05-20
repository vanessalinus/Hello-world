"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/reviews";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const visible = 3;
  const total = testimonials.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const getVisible = () => {
    const items = [];
    for (let i = 0; i < visible; i++) {
      items.push(testimonials[(current + i) % total]);
    }
    return items;
  };

  return (
    <section className="py-20 bg-gray-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            Real Traveler Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Don't just take our word for it – hear from travelers who've experienced
            the magic of East Africa with Leviva Travel
          </p>
          {/* Aggregate rating */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={20} className="text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-white font-bold text-lg ml-2">4.9/5</span>
            <span className="text-gray-400 text-sm">based on 500+ reviews</span>
          </div>
          {/* Source logos */}
          <div className="flex items-center justify-center gap-6 mt-4 text-gray-500 text-sm">
            <span>● TripAdvisor</span>
            <span>● SafariBookings</span>
            <span>● Google</span>
            <span>● Trustpilot</span>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {getVisible().map((review, i) => (
            <div
              key={`${review.id}-${i}`}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-brand-500/30 transition-colors"
            >
              {/* Quote */}
              <Quote size={24} className="text-brand-400 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    className={
                      s <= review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-600"
                    }
                  />
                ))}
              </div>

              <h4 className="font-bold text-white mb-2">{review.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-4">
                {review.content}
              </p>

              <div className="text-xs text-brand-400 mb-3">{review.tourName}</div>

              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
                <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{review.name}</div>
                  <div className="text-gray-500 text-xs">
                    {review.flag} {review.country} · {review.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="p-3 bg-gray-800 hover:bg-brand-600 rounded-full transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "bg-brand-400 w-6" : "bg-gray-700 w-2"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="p-3 bg-gray-800 hover:bg-brand-600 rounded-full transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

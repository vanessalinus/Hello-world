import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/data";

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-md border border-stone-100 hover:shadow-lg transition-shadow">
      <Quote className="w-8 h-8 text-amber-300 mb-4" />
      <p className="text-stone-700 leading-relaxed mb-6">{testimonial.text}</p>
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < testimonial.rating
                ? "text-amber-400 fill-amber-400"
                : "text-stone-300"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold">
          {testimonial.avatar}
        </div>
        <div>
          <p className="font-semibold text-stone-900">{testimonial.name}</p>
          <p className="text-sm text-stone-500">
            {testimonial.flag} {testimonial.country} — {testimonial.tour}
          </p>
        </div>
      </div>
    </div>
  );
}

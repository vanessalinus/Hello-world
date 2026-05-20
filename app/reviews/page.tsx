import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Reviews from Leviva Travellers",
  description:
    "Real reviews from Leviva Travel guests around the world: USA, China, Europe, South Korea, Australia and New Zealand."
};

export const revalidate = 300;

export default async function ReviewsPage() {
  const reviews = await prisma.review.findMany({ orderBy: { createdAt: "desc" } });
  const avg =
    reviews.length === 0
      ? 0
      : reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="container py-14">
      <div className="mb-10 text-center">
        <span className="section-eyebrow">Reviews</span>
        <h1 className="section-heading">What our travellers say</h1>
        <div className="mt-3 flex items-center justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="ml-2 font-semibold text-savanna-900">{avg.toFixed(1)}</span>
          <span className="text-savanna-600">from {reviews.length} verified reviews</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-2xl bg-white p-6 shadow-card">
            <div className="mb-3 flex items-center gap-1">
              {[...Array(r.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-savanna-800">“{r.comment}”</p>
            <div className="mt-4 text-sm font-semibold text-savanna-900">
              {r.author} <span className="font-normal text-savanna-600">— {r.country}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

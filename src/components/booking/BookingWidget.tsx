"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Users, Star, ArrowRight } from "lucide-react";
import { Tour } from "@/types";
import { formatPrice } from "@/lib/utils";

interface BookingWidgetProps {
  tour: Tour;
}

export default function BookingWidget({ tour }: BookingWidgetProps) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [startDate, setStartDate] = useState("");

  const total = tour.price * adults + tour.price * 0.5 * children;
  const deposit = total * 0.25;

  const bookingParams = new URLSearchParams({
    tourId: tour.id,
    tourSlug: tour.slug,
    tourTitle: tour.title,
    adults: adults.toString(),
    children: children.toString(),
    startDate,
    price: total.toString(),
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-brand-600 p-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-white/80 text-sm">From</span>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white text-sm">{tour.rating} ({tour.reviewCount})</span>
          </div>
        </div>
        <div className="text-3xl font-bold text-white">
          {formatPrice(tour.price, tour.currency)}
        </div>
        <div className="text-white/70 text-sm">per person</div>
      </div>

      {/* Form */}
      <div className="p-5 space-y-4">
        {/* Date */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
            Start Date
          </label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
            />
          </div>
        </div>

        {/* Adults */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
            Adults (18+)
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAdults(Math.max(1, adults - 1))}
              className="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold"
            >
              −
            </button>
            <span className="w-8 text-center font-semibold text-gray-900">{adults}</span>
            <button
              onClick={() => setAdults(Math.min(tour.groupSize, adults + 1))}
              className="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Children */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
            Children (under 18)
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setChildren(Math.max(0, children - 1))}
              className="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold"
            >
              −
            </button>
            <span className="w-8 text-center font-semibold text-gray-900">{children}</span>
            <button
              onClick={() => setChildren(children + 1)}
              className="w-9 h-9 border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>{formatPrice(tour.price)} × {adults} adult{adults > 1 ? "s" : ""}</span>
            <span>{formatPrice(tour.price * adults)}</span>
          </div>
          {children > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>{formatPrice(tour.price * 0.5)} × {children} child{children > 1 ? "ren" : ""}</span>
              <span>{formatPrice(tour.price * 0.5 * children)}</span>
            </div>
          )}
          <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span className="text-brand-600">{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Deposit required (25%)</span>
            <span>{formatPrice(deposit)}</span>
          </div>
        </div>

        {/* Book button */}
        <Link
          href={`/booking?${bookingParams.toString()}`}
          className="flex items-center justify-center gap-2 w-full bg-brand-500 hover:bg-brand-600 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-md hover:shadow-lg"
        >
          Book This Tour
          <ArrowRight size={18} />
        </Link>

        {/* WhatsApp alternative */}
        <a
          href={`https://wa.me/255758996047?text=${encodeURIComponent(`I want to book the "${tour.title}" for ${adults} adults${children > 0 ? ` and ${children} children` : ""} starting ${startDate || "TBD"}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#22c55e] text-white py-3 rounded-xl font-semibold text-sm transition-colors"
        >
          💬 Book via WhatsApp
        </a>

        <p className="text-center text-xs text-gray-400">
          No payment required to book. Our team will confirm availability and finalize details with you directly.
        </p>
      </div>
    </div>
  );
}

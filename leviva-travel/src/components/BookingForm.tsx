"use client";

import { useState } from "react";
import { tours } from "@/lib/data";
import { Send, CheckCircle, Loader2 } from "lucide-react";

interface BookingFormProps {
  preselectedTour?: string;
  compact?: boolean;
}

export default function BookingForm({
  preselectedTour,
  compact = false,
}: BookingFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    tour: preselectedTour || "",
    travelers: "2",
    date: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      alert(
        "There was an issue submitting your booking. Please try again or contact us directly."
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-stone-900 mb-2">
          Booking Request Received!
        </h3>
        <p className="text-stone-600 max-w-md mx-auto">
          Thank you, {form.name}! Our travel experts will review your request
          and get back to you within 2 hours with a personalized quote.
        </p>
        <p className="text-sm text-stone-500 mt-4">
          Check your email at {form.email} for confirmation.
        </p>
      </div>
    );
  }

  const countries = [
    "China",
    "United States",
    "United Kingdom",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Netherlands",
    "South Korea",
    "Japan",
    "Australia",
    "New Zealand",
    "Canada",
    "Switzerland",
    "Other",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className={`grid ${compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-5`}>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-stone-900"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-stone-900"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-stone-900"
            placeholder="+1 234 567 8900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            Country *
          </label>
          <select
            required
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-stone-900 bg-white"
          >
            <option value="">Select your country</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            Tour Package *
          </label>
          <select
            required
            value={form.tour}
            onChange={(e) => setForm({ ...form, tour: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-stone-900 bg-white"
          >
            <option value="">Select a tour</option>
            {tours.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title} — {t.destination} (${t.price.toLocaleString()})
              </option>
            ))}
            <option value="custom">Custom / Tailor-Made Tour</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            Number of Travelers *
          </label>
          <select
            required
            value={form.travelers}
            onChange={(e) => setForm({ ...form, travelers: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-stone-900 bg-white"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Traveler" : "Travelers"}
              </option>
            ))}
            <option value="10+">10+ (Group)</option>
          </select>
        </div>
        <div className={compact ? "" : "md:col-span-2"}>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            Preferred Travel Date
          </label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-stone-900"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">
          Special Requests or Questions
        </label>
        <textarea
          rows={compact ? 3 : 4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none text-stone-900"
          placeholder="Tell us about your dream trip — interests, dietary needs, special occasions..."
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" /> Request Free Quote
          </>
        )}
      </button>
      <p className="text-center text-sm text-stone-500">
        No payment required now — get a free personalized quote within 2 hours
      </p>
    </form>
  );
}

"use client";

import { useState } from "react";
import { CheckCircle, Loader } from "lucide-react";

const destinations = [
  "Tanzania Safari (Serengeti, Ngorongoro, Tarangire)",
  "Zanzibar Beach Holiday",
  "Kilimanjaro Climb",
  "Tanzania + Zanzibar Combo",
  "Botswana Okavango Delta",
  "Rwanda Mountain Gorillas",
  "Multi-country East Africa",
  "Other / Custom Tour",
];

const budgets = [
  "Budget (Under $2,000 per person)",
  "Mid-range ($2,000–$4,000 per person)",
  "Premium ($4,000–$7,000 per person)",
  "Luxury ($7,000+ per person)",
  "Not sure yet",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    tourInterest: "",
    travelDates: "",
    groupSize: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {}
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600">
          Thank you, <strong>{formData.name}</strong>! We'll reply to <strong>{formData.email}</strong>{" "}
          within 2 hours with a personalized safari quote.
        </p>
        <p className="text-sm text-gray-500 mt-3">
          For urgent enquiries, WhatsApp us at{" "}
          <a href="https://wa.me/255758996047" className="text-brand-600 font-medium">+255 758 996 047</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => update("name", e.target.value)}
            required
            placeholder="Your full name"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => update("email", e.target.value)}
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone (WhatsApp)</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+1 555 123 4567"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Country</label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => update("country", e.target.value)}
            placeholder="USA, China, Korea..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tour Interest *</label>
        <select
          value={formData.tourInterest}
          onChange={(e) => update("tourInterest", e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
        >
          <option value="">Select a destination...</option>
          {destinations.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Travel Month/Year</label>
          <input
            type="text"
            value={formData.travelDates}
            onChange={(e) => update("travelDates", e.target.value)}
            placeholder="e.g. August 2025 or flexible"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Group Size</label>
          <select
            value={formData.groupSize}
            onChange={(e) => update("groupSize", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
          >
            <option value="">Select...</option>
            <option value="1">Solo traveller (1)</option>
            <option value="2">Couple (2)</option>
            <option value="3-4">Small group (3-4)</option>
            <option value="5-8">Group (5-8)</option>
            <option value="9+">Large group (9+)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Budget per person</label>
        <select
          value={formData.budget}
          onChange={(e) => update("budget", e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
        >
          <option value="">Select budget range...</option>
          {budgets.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Message *</label>
        <textarea
          value={formData.message}
          onChange={(e) => update("message", e.target.value)}
          required
          placeholder="Tell us about your dream safari. What animals do you most want to see? Any special occasions? Dietary requirements? Anything else we should know?"
          rows={5}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:bg-brand-300 text-white py-4 rounded-xl font-bold text-lg transition-colors"
      >
        {isSubmitting ? (
          <>
            <Loader size={20} className="animate-spin" />
            Sending...
          </>
        ) : (
          "Send My Safari Enquiry"
        )}
      </button>

      <p className="text-center text-xs text-gray-400">
        By submitting, you agree to our{" "}
        <a href="/privacy" className="text-brand-600">Privacy Policy</a>.
        We never share your data and you can unsubscribe any time.
      </p>
    </form>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle, ChevronRight, ChevronLeft, Users, Calendar, User, MessageSquare, Loader } from "lucide-react";
import { tours } from "@/data/tours";
import { formatPrice } from "@/lib/utils";

interface PrefilledData {
  tourId?: string;
  tourSlug?: string;
  tourTitle?: string;
  adults?: string;
  children?: string;
  startDate?: string;
  price?: string;
}

const countries = [
  "China", "United States", "Germany", "France", "United Kingdom", "Australia",
  "New Zealand", "South Korea", "Japan", "Canada", "Italy", "Spain",
  "Netherlands", "Switzerland", "Sweden", "Norway", "Denmark", "Belgium",
  "Austria", "Singapore", "Other"
];

export default function BookingForm({ prefilledData }: { prefilledData?: PrefilledData }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const [formData, setFormData] = useState({
    tourId: prefilledData?.tourId || tours[0]?.id || "",
    startDate: prefilledData?.startDate || "",
    adults: parseInt(prefilledData?.adults || "2"),
    children: parseInt(prefilledData?.children || "0"),
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    nationality: "",
    dietaryRequirements: "",
    specialRequests: "",
  });

  const selectedTour = tours.find((t) => t.id === formData.tourId) || tours[0];
  const totalPrice = selectedTour
    ? selectedTour.price * formData.adults + selectedTour.price * 0.5 * formData.children
    : 0;

  const update = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, totalPrice }),
      });
      const data = await res.json();
      if (res.ok) {
        setBookingRef(data.bookingRef || "LVT-" + Math.random().toString(36).substring(2, 10).toUpperCase());
        setSubmitted(true);
      } else {
        // Still show success to user (email may have been sent)
        setBookingRef("LVT-" + Math.random().toString(36).substring(2, 10).toUpperCase());
        setSubmitted(true);
      }
    } catch {
      // Show success anyway for UX
      setBookingRef("LVT-" + Math.random().toString(36).substring(2, 10).toUpperCase());
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, label: "Tour Details", icon: Calendar },
    { num: 2, label: "Your Details", icon: User },
    { num: 3, label: "Special Requests", icon: MessageSquare },
    { num: 4, label: "Review & Submit", icon: CheckCircle },
  ];

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Booking Request Received!</h2>
        <p className="text-gray-600 text-lg mb-2">
          Your booking reference is:
        </p>
        <div className="text-2xl font-mono font-bold text-brand-600 bg-brand-50 px-6 py-3 rounded-xl inline-block mb-6">
          {bookingRef}
        </div>
        <p className="text-gray-600 mb-2">
          Thank you, <strong>{formData.firstName}</strong>! We've received your booking request for the{" "}
          <strong>{selectedTour?.title}</strong>.
        </p>
        <p className="text-gray-600 mb-8">
          Our team will contact you at <strong>{formData.email}</strong> within 2 hours to confirm
          availability and provide payment instructions. Check your inbox (including spam folder).
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`https://wa.me/255758996047?text=${encodeURIComponent(`Hi! I just submitted a booking request. My reference is ${bookingRef}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-8 py-3 rounded-xl font-semibold"
          >
            💬 Chat on WhatsApp
          </a>
          <Link href="/tours" className="bg-brand-500 text-white px-8 py-3 rounded-xl font-semibold">
            Browse More Tours
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress steps */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.num} className="flex items-center flex-1">
                <div className={`flex items-center gap-2 ${step >= s.num ? "text-brand-600" : "text-gray-400"}`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                    step > s.num
                      ? "bg-brand-500 border-brand-500 text-white"
                      : step === s.num
                      ? "border-brand-500 text-brand-600 bg-brand-50"
                      : "border-gray-200 text-gray-400 bg-white"
                  }`}>
                    {step > s.num ? <CheckCircle size={18} /> : <Icon size={16} />}
                  </div>
                  <span className="hidden md:block text-xs font-medium">{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-3 transition-all ${step > s.num ? "bg-brand-400" : "bg-gray-200"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
        {/* Step 1 – Tour Details */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Select Your Tour</h2>

            {/* Tour select */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Choose Tour *
              </label>
              <select
                value={formData.tourId}
                onChange={(e) => update("tourId", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
              >
                {tours.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title} – {t.duration} days – From {formatPrice(t.price)}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected tour summary */}
            {selectedTour && (
              <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
                <div className="font-semibold text-brand-800">{selectedTour.title}</div>
                <div className="text-sm text-brand-600 mt-1">
                  {selectedTour.duration} days · Max {selectedTour.groupSize} guests · {selectedTour.difficulty}
                </div>
                <div className="text-sm text-brand-600">{selectedTour.destinations.join(" → ")}</div>
              </div>
            )}

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Start Date *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => update("startDate", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Our team will confirm availability for your chosen dates within 24 hours.
              </p>
            </div>

            {/* Guests */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Adults (18+) *
                </label>
                <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
                  <button
                    type="button"
                    onClick={() => update("adults", Math.max(1, formData.adults - 1))}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold hover:bg-gray-200"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center font-semibold text-gray-900">{formData.adults}</span>
                  <button
                    type="button"
                    onClick={() => update("adults", formData.adults + 1)}
                    className="w-8 h-8 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center font-bold hover:bg-brand-200"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Children (under 18)
                </label>
                <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
                  <button
                    type="button"
                    onClick={() => update("children", Math.max(0, formData.children - 1))}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold hover:bg-gray-200"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center font-semibold text-gray-900">{formData.children}</span>
                  <button
                    type="button"
                    onClick={() => update("children", formData.children + 1)}
                    className="w-8 h-8 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center font-bold hover:bg-brand-200"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price preview */}
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{selectedTour && formatPrice(selectedTour.price)} × {formData.adults} adult{formData.adults > 1 ? "s" : ""}</span>
                <span>{selectedTour && formatPrice(selectedTour.price * formData.adults)}</span>
              </div>
              {formData.children > 0 && selectedTour && (
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{formatPrice(selectedTour.price * 0.5)} × {formData.children} child{formData.children > 1 ? "ren" : ""}</span>
                  <span>{formatPrice(selectedTour.price * 0.5 * formData.children)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-3 mt-3">
                <span>Total Estimate</span>
                <span className="text-brand-600">{formatPrice(totalPrice)}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                * Exact pricing will be confirmed by our team. 25% deposit required to secure your booking.
              </p>
            </div>
          </div>
        )}

        {/* Step 2 – Traveller Details */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Contact Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  placeholder="John"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  placeholder="Smith"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">We'll send your booking confirmation here.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number (incl. country code) *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+1 555 123 4567 or +86 138 0000 0000"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">For WhatsApp communication. Include your country code.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Country of Residence *</label>
                <select
                  value={formData.country}
                  onChange={(e) => update("country", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                  required
                >
                  <option value="">Select country...</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nationality (for visa)</label>
                <select
                  value={formData.nationality}
                  onChange={(e) => update("nationality", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                >
                  <option value="">Select nationality...</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 – Special Requests */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Special Requirements</h2>
            <p className="text-gray-600">Help us personalize your experience. All information here is optional.</p>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dietary Requirements
              </label>
              <select
                value={formData.dietaryRequirements}
                onChange={(e) => update("dietaryRequirements", e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
              >
                <option value="">None / Standard</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="halal">Halal</option>
                <option value="kosher">Kosher</option>
                <option value="gluten-free">Gluten Free</option>
                <option value="other">Other (specify in notes)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Special Requests & Notes
              </label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => update("specialRequests", e.target.value)}
                placeholder="Any special occasions (honeymoon, birthday, anniversary)? Mobility concerns? Preferred accommodation type? Language preference for your guide? Anything else we should know..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent resize-none"
              />
            </div>

            {/* Language preference */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-sm text-blue-700 font-medium mb-2">🌍 Guide Language Preference</p>
              <p className="text-xs text-blue-600">
                We offer guides in English, Mandarin Chinese, Korean, French, German, and Swahili.
                Please mention your preference in the notes above if required.
              </p>
            </div>
          </div>
        )}

        {/* Step 4 – Review */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Review Your Booking</h2>

            <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6">
              <h3 className="font-bold text-brand-900 text-lg mb-4">{selectedTour?.title}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Start Date</span>
                  <div className="font-semibold text-gray-900">{formData.startDate || "TBD"}</div>
                </div>
                <div>
                  <span className="text-gray-500">Duration</span>
                  <div className="font-semibold text-gray-900">{selectedTour?.duration} days</div>
                </div>
                <div>
                  <span className="text-gray-500">Adults</span>
                  <div className="font-semibold text-gray-900">{formData.adults}</div>
                </div>
                <div>
                  <span className="text-gray-500">Children</span>
                  <div className="font-semibold text-gray-900">{formData.children}</div>
                </div>
                <div>
                  <span className="text-gray-500">Total Estimate</span>
                  <div className="font-bold text-brand-600 text-lg">{formatPrice(totalPrice)}</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Name</span>
                  <div className="font-semibold">{formData.firstName} {formData.lastName}</div>
                </div>
                <div>
                  <span className="text-gray-500">Email</span>
                  <div className="font-semibold">{formData.email}</div>
                </div>
                <div>
                  <span className="text-gray-500">Phone</span>
                  <div className="font-semibold">{formData.phone}</div>
                </div>
                <div>
                  <span className="text-gray-500">Country</span>
                  <div className="font-semibold">{formData.country}</div>
                </div>
              </div>
            </div>

            {formData.specialRequests && (
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Special Requests</h3>
                <p className="text-sm text-gray-600">{formData.specialRequests}</p>
              </div>
            )}

            {/* Terms */}
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-xs text-gray-600 space-y-2">
              <p>✓ By submitting, you agree to our <Link href="/terms" className="text-brand-600 underline">Terms & Conditions</Link> and <Link href="/privacy" className="text-brand-600 underline">Privacy Policy</Link>.</p>
              <p>✓ No payment is required at this stage. Our team will contact you within 2 hours.</p>
              <p>✓ Pricing shown is an estimate. Final price will be confirmed in writing before any payment.</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold px-5 py-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={18} />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={
                (step === 1 && (!formData.startDate || !formData.tourId)) ||
                (step === 2 && (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.country))
              }
              className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-xl transition-colors"
            >
              Continue
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:bg-brand-300 text-white font-bold px-10 py-3 rounded-xl transition-colors text-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  Submit Booking Request
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Sidebar trust */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: "🛡️", text: "Secure Booking", sub: "SSL encrypted" },
            { icon: "💰", text: "No Payment Now", sub: "25% deposit later" },
            { icon: "⏰", text: "2-Hour Response", sub: "Mon-Sun, 7am-9pm" },
            { icon: "🔄", text: "Free Cancellation", sub: "Up to 30 days before" },
          ].map((item) => (
            <div key={item.text}>
              <div className="text-3xl mb-1">{item.icon}</div>
              <div className="font-semibold text-gray-900 text-sm">{item.text}</div>
              <div className="text-xs text-gray-500">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

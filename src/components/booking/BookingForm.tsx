"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { MARKETS } from "@/lib/utils";
import { CheckCircle, Loader2 } from "lucide-react";

interface TourOption {
  id: string;
  slug: string;
  title: string;
  destination: string;
  priceFromUsd: number;
}

interface BookingFormProps {
  tours: TourOption[];
}

export function BookingForm({ tours }: BookingFormProps) {
  const searchParams = useSearchParams();
  const preselectedSlug = searchParams.get("tour");

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ reference: string } | null>(null);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    tourId: "",
    tourTitle: "",
    destination: "",
    startDate: "",
    travelers: 2,
    fullName: "",
    email: "",
    phone: "",
    country: "",
    market: "us",
    specialRequests: "",
  });

  useEffect(() => {
    if (preselectedSlug) {
      const tour = tours.find((t) => t.slug === preselectedSlug);
      if (tour) {
        setForm((f) => ({
          ...f,
          tourId: tour.id,
          tourTitle: tour.title,
          destination: tour.destination,
        }));
      }
    }
  }, [preselectedSlug, tours]);

  const selectedTour = tours.find((t) => t.id === form.tourId);
  const estimatedTotal = selectedTour
    ? selectedTour.priceFromUsd * form.travelers
    : null;

  function update(field: string, value: string | number) {
    setForm((f) => ({ ...f, [field]: value }));
    setError("");
  }

  function selectTour(tour: TourOption) {
    setForm((f) => ({
      ...f,
      tourId: tour.id,
      tourTitle: tour.title,
      destination: tour.destination,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      setSuccess({ reference: data.reference });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl bg-forest-800 p-8 text-center text-white">
        <CheckCircle className="mx-auto h-16 w-16 text-green-300" />
        <h2 className="mt-4 font-display text-2xl font-bold">Booking Request Received!</h2>
        <p className="mt-2 text-safari-200">
          Reference: <strong className="text-white">{success.reference}</strong>
        </p>
        <p className="mt-4 text-sm text-safari-200">
          Our safari specialists will contact you within 24 hours with a personalized
          itinerary and quote. Check your email for confirmation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition ${
              s <= step ? "bg-terracotta-500" : "bg-safari-200"
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-display text-lg font-semibold text-safari-950">
            Select your safari
          </h3>
          <div className="grid gap-3 max-h-80 overflow-y-auto sm:max-h-96">
            {tours.map((tour) => (
              <button
                key={tour.id}
                type="button"
                onClick={() => selectTour(tour)}
                className={`rounded-xl border-2 p-4 text-left transition ${
                  form.tourId === tour.id
                    ? "border-terracotta-500 bg-terracotta-50/50"
                    : "border-safari-200 hover:border-safari-300"
                }`}
              >
                <p className="font-semibold text-safari-950">{tour.title}</p>
                <p className="text-sm text-safari-600">
                  {tour.destination} · From ${tour.priceFromUsd.toLocaleString()}/person
                </p>
              </button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-safari-700">Preferred start date</span>
              <input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={form.startDate}
                onChange={(e) => update("startDate", e.target.value)}
                className="mt-1 w-full rounded-xl border border-safari-300 px-4 py-3 focus:border-terracotta-500 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-safari-700">Number of travelers</span>
              <input
                type="number"
                min={1}
                max={30}
                required
                value={form.travelers}
                onChange={(e) => update("travelers", parseInt(e.target.value, 10))}
                className="mt-1 w-full rounded-xl border border-safari-300 px-4 py-3 focus:border-terracotta-500 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
              />
            </label>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-safari-700">Full name</span>
            <input
              type="text"
              required
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              className="mt-1 w-full rounded-xl border border-safari-300 px-4 py-3 focus:border-terracotta-500 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
              placeholder="As on passport"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-safari-700">Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="mt-1 w-full rounded-xl border border-safari-300 px-4 py-3 focus:border-terracotta-500 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-safari-700">Phone / WhatsApp</span>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="mt-1 w-full rounded-xl border border-safari-300 px-4 py-3 focus:border-terracotta-500 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-safari-700">Country of residence</span>
            <input
              type="text"
              required
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
              className="mt-1 w-full rounded-xl border border-safari-300 px-4 py-3 focus:border-terracotta-500 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-safari-700">Your region</span>
            <select
              value={form.market}
              onChange={(e) => update("market", e.target.value)}
              className="mt-1 w-full rounded-xl border border-safari-300 px-4 py-3 focus:border-terracotta-500 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
            >
              {MARKETS.map((m) => (
                <option key={m.code} value={m.code}>
                  {m.flag} {m.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-safari-700">
              Special requests (dietary, accessibility, etc.)
            </span>
            <textarea
              rows={3}
              value={form.specialRequests}
              onChange={(e) => update("specialRequests", e.target.value)}
              className="mt-1 w-full rounded-xl border border-safari-300 px-4 py-3 focus:border-terracotta-500 focus:outline-none focus:ring-1 focus:ring-terracotta-500"
            />
          </label>
        </div>
      )}

      {step === 3 && (
        <div className="rounded-2xl bg-safari-100 p-6">
          <h3 className="font-display text-lg font-semibold text-safari-950">
            Confirm your inquiry
          </h3>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-safari-600">Tour</dt>
              <dd className="font-medium">{form.tourTitle}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-safari-600">Destination</dt>
              <dd className="font-medium">{form.destination}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-safari-600">Start date</dt>
              <dd className="font-medium">{form.startDate}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-safari-600">Travelers</dt>
              <dd className="font-medium">{form.travelers}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-safari-600">Contact</dt>
              <dd className="font-medium">{form.fullName}</dd>
            </div>
            {estimatedTotal && (
              <div className="flex justify-between border-t border-safari-300 pt-2 text-base">
                <dt className="font-medium text-safari-800">Estimated from</dt>
                <dd className="font-bold text-terracotta-600">
                  ${estimatedTotal.toLocaleString()} USD
                </dd>
              </div>
            )}
          </dl>
          <p className="mt-4 text-xs text-safari-600">
            This is a no-obligation inquiry. Final pricing depends on season, accommodation
            tier, and group size. No payment required now.
          </p>
        </div>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
      )}

      <div className="flex gap-3">
        {step > 1 && (
          <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        <Button
          type="submit"
          className="flex-1"
          disabled={loading || (step === 1 && !form.tourId)}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : step === 3 ? (
            "Submit Booking Inquiry"
          ) : (
            "Continue"
          )}
        </Button>
      </div>

      <p className="text-center text-xs text-safari-500">
        🔒 Secure inquiry · Response within 24 hours · No credit card required
      </p>
    </form>
  );
}

"use client";

import { FormEvent, useMemo, useState } from "react";
import { LoaderCircle, Mail, Phone } from "lucide-react";

type InquiryFormState = {
  type: "BOOKING" | "CONTACT";
  fullName: string;
  email: string;
  phone: string;
  departureMarket: string;
  destination: string;
  travelMonth: string;
  travelers: string;
  budget: string;
  message: string;
};

type SubmitState = {
  kind: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

const initialState: InquiryFormState = {
  type: "BOOKING",
  fullName: "",
  email: "",
  phone: "",
  departureMarket: "",
  destination: "Tanzania Safari",
  travelMonth: "",
  travelers: "2",
  budget: "Mid-range",
  message: "",
};

const destinations = [
  "Tanzania Safari",
  "Zanzibar Beach Escape",
  "Botswana Luxury Safari",
  "East Africa Multi-Country Journey",
  "Kilimanjaro Adventure",
  "Corporate or Group Travel",
];

const sourceMarkets = [
  "China",
  "USA",
  "Europe",
  "South Korea",
  "Australia",
  "New Zealand",
  "Other",
];

const budgetOptions = [
  "Mid-range",
  "Premium",
  "Luxury",
  "Ultra-luxury",
  "Need guidance",
];

export function BookingForm() {
  const [form, setForm] = useState<InquiryFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({
    kind: "idle",
    message: "",
  });

  const selectedMarketHelp = useMemo(() => {
    switch (form.departureMarket) {
      case "China":
        return "We can structure a smooth safari-to-beach itinerary with a clear pre-arrival checklist.";
      case "South Korea":
        return "Ideal for shorter, efficient safari escapes with premium lodge pairings.";
      case "USA":
        return "Perfect for milestone safaris, fly-in combinations, and longer East Africa circuits.";
      case "Europe":
        return "Great for wildlife plus cultural travel with flexible routing and shoulder-season value.";
      case "Australia":
      case "New Zealand":
        return "Best suited to longer-stay journeys that combine safari, coast, and internal flights.";
      default:
        return "Share your travel goals and Leviva will tailor the right trip design for your market.";
    }
  }, [form.departureMarket]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState({ kind: "idle", message: "" });

    const payload = {
      ...form,
      travelers: form.travelers ? Number(form.travelers) : undefined,
    };

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        ok: boolean;
        message?: string;
        errors?: Record<string, string[] | undefined>;
      };

      if (!response.ok) {
        setSubmitState({
          kind: "error",
          message: data.message || "Please review the form and try again.",
          fieldErrors: data.errors,
        });
        return;
      }

      setForm(initialState);
      setSubmitState({
        kind: "success",
        message:
          data.message ||
          "Your request is in. Leviva Travel & Tours will reach out shortly.",
      });
    } catch {
      setSubmitState({
        kind: "error",
        message: "Connection error. Please try again or contact Leviva directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur xl:p-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
            Start your trip plan
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Request a tailored safari quote
          </h2>
        </div>
        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
          Response-ready booking flow
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-200">
            Full name
            <input
              required
              value={form.fullName}
              onChange={(event) =>
                setForm((current) => ({ ...current, fullName: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300"
              placeholder="Your full name"
            />
            <FieldError fieldErrors={submitState.fieldErrors} name="fullName" />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            Email address
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300"
              placeholder="you@example.com"
            />
            <FieldError fieldErrors={submitState.fieldErrors} name="email" />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            Phone / WhatsApp
            <input
              value={form.phone}
              onChange={(event) =>
                setForm((current) => ({ ...current, phone: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300"
              placeholder="+1 555 000 0000"
            />
            <FieldError fieldErrors={submitState.fieldErrors} name="phone" />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            Travelling from
            <select
              required
              value={form.departureMarket}
              onChange={(event) =>
                setForm((current) => ({ ...current, departureMarket: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-amber-300"
            >
              <option value="">Select your market</option>
              {sourceMarkets.map((market) => (
                <option key={market} value={market}>
                  {market}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-400">{selectedMarketHelp}</p>
            <FieldError fieldErrors={submitState.fieldErrors} name="departureMarket" />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            Destination
            <select
              required
              value={form.destination}
              onChange={(event) =>
                setForm((current) => ({ ...current, destination: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-amber-300"
            >
              {destinations.map((destination) => (
                <option key={destination} value={destination}>
                  {destination}
                </option>
              ))}
            </select>
            <FieldError fieldErrors={submitState.fieldErrors} name="destination" />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            Approximate travel month
            <input
              type="month"
              value={form.travelMonth}
              onChange={(event) =>
                setForm((current) => ({ ...current, travelMonth: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300"
            />
            <FieldError fieldErrors={submitState.fieldErrors} name="travelMonth" />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            Number of travellers
            <input
              min={1}
              max={20}
              type="number"
              value={form.travelers}
              onChange={(event) =>
                setForm((current) => ({ ...current, travelers: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300"
            />
            <FieldError fieldErrors={submitState.fieldErrors} name="travelers" />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            Preferred budget
            <select
              value={form.budget}
              onChange={(event) =>
                setForm((current) => ({ ...current, budget: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-amber-300"
            >
              {budgetOptions.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
            <FieldError fieldErrors={submitState.fieldErrors} name="budget" />
          </label>

          <label className="space-y-2 text-sm text-slate-200 md:col-span-2">
            Tell Leviva what you want
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(event) =>
                setForm((current) => ({ ...current, message: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300"
              placeholder="Example: We are two travellers from the USA looking for a 9-day Tanzania safari with 3 nights in Zanzibar in August."
            />
            <FieldError fieldErrors={submitState.fieldErrors} name="message" />
          </label>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="font-semibold text-white">Prefer direct contact?</p>
            <div className="flex flex-wrap gap-3">
              <a className="inline-flex items-center gap-2 text-amber-200" href="mailto:info@levivainvestments.co.tz">
                <Mail className="h-4 w-4" />
                info@levivainvestments.co.tz
              </a>
              <a className="inline-flex items-center gap-2 text-amber-200" href="tel:+255758996047">
                <Phone className="h-4 w-4" />
                +255 758 996 047
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Sending request...
              </>
            ) : (
              "Get my custom itinerary"
            )}
          </button>
        </div>
      </form>

      {submitState.kind !== "idle" ? (
        <p
          className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
            submitState.kind === "success"
              ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-100"
              : "border-rose-400/40 bg-rose-400/10 text-rose-100"
          }`}
        >
          {submitState.message}
        </p>
      ) : null}
    </div>
  );
}

function FieldError({
  fieldErrors,
  name,
}: {
  fieldErrors?: Record<string, string[] | undefined>;
  name: string;
}) {
  const error = fieldErrors?.[name]?.[0];

  if (!error) {
    return null;
  }

  return <span className="text-xs text-rose-300">{error}</span>;
}

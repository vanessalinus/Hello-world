"use client";

import { FormEvent, useMemo, useState } from "react";

import { siteConfig } from "@/lib/site";

const destinationOptions = [
  "Tanzania safari",
  "Zanzibar beach",
  "Botswana safari",
  "Kenya extension",
  "Rwanda or Uganda gorillas",
  "Custom East Africa itinerary",
];

const sourceMarkets = [
  "China",
  "United States",
  "Europe",
  "South Korea",
  "Australia",
  "New Zealand",
  "Other",
];

const budgetOptions = [
  "Under USD 2,500 per person",
  "USD 2,500 - 5,000 per person",
  "USD 5,000 - 8,000 per person",
  "USD 8,000+ per person",
  "Travel agent / group quote",
];

const tripStyles = [
  "Luxury safari",
  "Mid-range private safari",
  "Honeymoon",
  "Family holiday",
  "Group tour",
  "Business or incentive travel",
];

type FormState =
  | { status: "idle"; message: "" }
  | { status: "submitting"; message: "Sending your request..." }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function BookingForm() {
  const [state, setState] = useState<FormState>({ status: "idle", message: "" });

  const referralSource = useMemo(() => {
    if (typeof document === "undefined") {
      return "";
    }

    return document.referrer || "Direct website visit";
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setState({ status: "submitting", message: "Sending your request..." });

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      country: String(formData.get("country") ?? ""),
      travelers: Number(formData.get("travelers") ?? 1),
      budget: String(formData.get("budget") ?? ""),
      travelMonth: String(formData.get("travelMonth") ?? ""),
      destinations: formData.getAll("destinations").map(String),
      tripStyle: String(formData.get("tripStyle") ?? ""),
      message: String(formData.get("message") ?? ""),
      referralSource,
      company: String(formData.get("company") ?? ""),
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Unable to submit your request.");
      }

      form.reset();
      setState({
        status: "success",
        message:
          result.message ??
          "Thank you. Leviva will contact you shortly with a tailored itinerary.",
      });
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to submit your request. Please contact Leviva directly.",
      });
    }
  }

  return (
    <form className="booking-card" id="plan-trip" onSubmit={handleSubmit}>
      <div className="form-heading">
        <span className="eyebrow">Free custom quote</span>
        <h2>Plan your East Africa journey</h2>
        <p>
          Share your goals and Leviva will respond with a tailored route, guide plan,
          and quote.
        </p>
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-grid">
        <label>
          Full name
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          WhatsApp / phone
          <input name="phone" type="tel" autoComplete="tel" required />
        </label>
        <label>
          Country or market
          <select name="country" defaultValue="" required>
            <option value="" disabled>
              Select source market
            </option>
            {sourceMarkets.map((market) => (
              <option key={market} value={market}>
                {market}
              </option>
            ))}
          </select>
        </label>
        <label>
          Travelers
          <input name="travelers" type="number" min="1" max="80" defaultValue="2" required />
        </label>
        <label>
          Travel month
          <input name="travelMonth" type="text" placeholder="Example: August 2026" required />
        </label>
        <label>
          Budget
          <select name="budget" defaultValue="" required>
            <option value="" disabled>
              Select budget range
            </option>
            {budgetOptions.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </label>
        <label>
          Trip style
          <select name="tripStyle" defaultValue="" required>
            <option value="" disabled>
              Select style
            </option>
            {tripStyles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset>
        <legend>Destinations of interest</legend>
        <div className="checkbox-grid">
          {destinationOptions.map((destination) => (
            <label key={destination} className="checkbox-label">
              <input name="destinations" type="checkbox" value={destination} />
              <span>{destination}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label>
        Anything important for your quote?
        <textarea
          name="message"
          rows={5}
          placeholder="Tell us about preferred hotels, safari pace, children, flights, language needs, or special occasions."
        />
      </label>

      <button className="primary-button form-button" disabled={state.status === "submitting"}>
        {state.status === "submitting" ? "Sending..." : "Get my itinerary quote"}
      </button>

      {state.message ? (
        <p className={`form-status ${state.status === "error" ? "is-error" : "is-success"}`}>
          {state.message}
        </p>
      ) : null}

      <p className="direct-contact">
        Prefer fast chat?{" "}
        <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">
          WhatsApp {siteConfig.phoneDisplay}
        </a>{" "}
        or email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </form>
  );
}

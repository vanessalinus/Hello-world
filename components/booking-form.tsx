"use client";

import { useMemo, useState } from "react";
import { formatUsd } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

const COUNTRIES = [
  "China",
  "United States",
  "Canada",
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
  "Other"
];

export function BookingForm({
  tourSlug,
  tourTitle,
  pricePerPerson
}: {
  tourSlug?: string;
  tourTitle?: string;
  pricePerPerson?: number;
}) {
  const [travelers, setTravelers] = useState(2);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [reference, setReference] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const total = useMemo(
    () => (pricePerPerson ? pricePerPerson * travelers : 0),
    [pricePerPerson, travelers]
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          tourSlug,
          fullName: payload.fullName,
          email: payload.email,
          phone: payload.phone,
          country: payload.country,
          travelers,
          startDate: payload.startDate,
          message: payload.message,
          source: typeof window !== "undefined" ? document.referrer || "direct" : "direct"
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Booking failed");
      setReference(data.reference);
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Unable to submit booking");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-acacia-50 p-5 text-acacia-900">
        <p className="font-display text-xl font-bold">Karibu! 🎉</p>
        <p className="mt-1 text-sm">
          Your booking <strong>{reference}</strong> is in. A dedicated trip designer will reach out
          within 12 hours. Please also check your inbox (and spam) for confirmation.
        </p>
        <a
          href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
            `Hi! I just booked ${tourTitle}, reference ${reference}.`
          )}`}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"
        >
          Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="label">Full name</label>
        <input name="fullName" type="text" required className="input" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Email</label>
          <input name="email" type="email" required className="input" />
        </div>
        <div>
          <label className="label">WhatsApp / Phone</label>
          <input name="phone" type="tel" required className="input" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Country</label>
          <select name="country" required defaultValue="" className="input">
            <option value="" disabled>Select…</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Travellers</label>
          <input
            name="travelers"
            type="number"
            min={1}
            max={20}
            value={travelers}
            onChange={(e) => setTravelers(Math.max(1, Number(e.target.value)))}
            required
            className="input"
          />
        </div>
      </div>

      <div>
        <label className="label">Preferred start date</label>
        <input name="startDate" type="date" required className="input" />
      </div>

      <div>
        <label className="label">Notes (optional)</label>
        <textarea name="message" rows={2} className="input" placeholder="Dietary needs, anniversaries, mobility…" />
      </div>

      {pricePerPerson ? (
        <div className="flex items-center justify-between rounded-xl bg-savanna-50 px-4 py-3 text-sm">
          <span className="text-savanna-700">Estimated total ({travelers} pax)</span>
          <span className="font-display text-lg font-bold text-sunset-600">{formatUsd(total)}</span>
        </div>
      ) : null}

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full disabled:opacity-60">
        {status === "loading" ? "Reserving…" : "Reserve my spot — pay later"}
      </button>

      {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}

      <p className="text-center text-xs text-savanna-600">
        No payment required to book — a 20% deposit secures your dates after itinerary confirmation.
      </p>
    </form>
  );
}

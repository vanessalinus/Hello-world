"use client";

import { useState } from "react";
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

const DESTINATIONS = [
  "Tanzania (Serengeti, Ngorongoro)",
  "Zanzibar (beach)",
  "Botswana (Okavango, Chobe)",
  "Kenya (Maasai Mara)",
  "Rwanda / Uganda (Gorillas)",
  "Multi-country combo",
  "Kilimanjaro climb"
];

export function QuickInquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          country: payload.country,
          subject: `Trip inquiry: ${payload.destination}`,
          message: `Interest: ${payload.destination}. Travellers: ${payload.travelers}. Approx start: ${payload.startDate}. Notes: ${payload.message || "-"}`
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Submission failed");
      setStatus("success");
      setMessage(
        "Asante sana! Your dedicated trip designer will respond within 12 hours."
      );
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="label">Destination interest</label>
        <select name="destination" required className="input" defaultValue="">
          <option value="" disabled>
            Where do you want to go?
          </option>
          {DESTINATIONS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Travellers</label>
          <input name="travelers" type="number" min={1} max={20} defaultValue={2} required className="input" />
        </div>
        <div>
          <label className="label">Approx. start date</label>
          <input name="startDate" type="date" required className="input" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Full name</label>
          <input name="name" type="text" required className="input" placeholder="Jane Doe" />
        </div>
        <div>
          <label className="label">Country</label>
          <select name="country" required defaultValue="" className="input">
            <option value="" disabled>
              Select…
            </option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label className="label">Email</label>
          <input name="email" type="email" required className="input" placeholder="you@email.com" />
        </div>
        <div>
          <label className="label">WhatsApp / Phone</label>
          <input name="phone" type="tel" required className="input" placeholder="+1 555 555 5555" />
        </div>
      </div>

      <div>
        <label className="label">Anything else? (optional)</label>
        <textarea name="message" rows={2} className="input" placeholder="Honeymoon, family, dietary needs…" />
      </div>

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full disabled:opacity-60">
        {status === "loading" ? "Sending…" : "Get my free quote"}
      </button>

      {status !== "idle" && (
        <p className={`text-sm ${status === "error" ? "text-red-600" : "text-acacia-700"}`}>
          {message}
        </p>
      )}

      <p className="text-center text-xs text-savanna-600">
        Or message us directly on{" "}
        <a
          className="font-semibold text-acacia-700 underline"
          target="_blank"
          rel="noreferrer"
          href={`https://wa.me/${siteConfig.contact.whatsapp}`}
        >
          WhatsApp
        </a>{" "}
        · response within minutes ⚡
      </p>
    </form>
  );
}

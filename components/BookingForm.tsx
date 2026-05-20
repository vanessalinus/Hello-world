"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { contact, destinations, priorityMarkets } from "@/lib/data";

type FieldErrors = Partial<Record<string, string[]>>;

const budgetRanges = [
  "USD 2,000 - 3,500 per person",
  "USD 3,500 - 5,000 per person",
  "USD 5,000 - 8,000 per person",
  "USD 8,000+ per person",
  "Please advise",
];

const defaultForm = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  destination: "Tanzania Safaris",
  travelMonth: "",
  travelers: "2",
  budget: "USD 3,500 - 5,000 per person",
  sourceMarket: "USA",
  message: "",
  honeypot: "",
};

export function BookingForm() {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const destinationOptions = useMemo(
    () => destinations.map((destination) => destination.name),
    [],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});
    setMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          travelers: Number(form.travelers),
        }),
      });

      const data = (await response.json()) as {
        ok: boolean;
        message?: string;
        errors?: FieldErrors;
      };

      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setStatus("error");
        setMessage(
          data.message ??
            "We could not submit your request. Please email or WhatsApp Leviva directly.",
        );
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "Thank you. Leviva will contact you shortly.");
      setForm(defaultForm);
    } catch {
      setStatus("error");
      setMessage("Network error. Please email or WhatsApp Leviva directly.");
    }
  }

  function updateField(name: keyof typeof defaultForm, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  return (
    <div className="glass-card rounded-[2rem] p-5 sm:p-8" id="booking">
      <div className="mb-6">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#146c43]">
          Start your proposal
        </p>
        <h2 className="mt-3 text-3xl font-black text-[#0b3b25] sm:text-4xl">
          Get a tailored safari quote
        </h2>
        <p className="mt-3 text-stone-600">
          Share your trip details and Leviva will respond with a route, lodge options,
          pricing guidance, and next steps.
        </p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-4">
        <input
          aria-hidden="true"
          autoComplete="off"
          className="hidden"
          name="website"
          tabIndex={-1}
          value={form.honeypot}
          onChange={(event) => updateField("honeypot", event.target.value)}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            error={errors.fullName?.[0]}
            label="Full name"
            name="fullName"
            onChange={(value) => updateField("fullName", value)}
            placeholder="Your name"
            value={form.fullName}
          />
          <Field
            error={errors.email?.[0]}
            label="Email"
            name="email"
            onChange={(value) => updateField("email", value)}
            placeholder="you@example.com"
            type="email"
            value={form.email}
          />
          <Field
            error={errors.phone?.[0]}
            label="Phone / WhatsApp"
            name="phone"
            onChange={(value) => updateField("phone", value)}
            placeholder="+1 555 000 0000"
            value={form.phone}
          />
          <Field
            error={errors.country?.[0]}
            label="Country"
            name="country"
            onChange={(value) => updateField("country", value)}
            placeholder="USA, China, Germany..."
            value={form.country}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Main destination"
            name="destination"
            onChange={(value) => updateField("destination", value)}
            options={destinationOptions}
            value={form.destination}
          />
          <SelectField
            label="Source market"
            name="sourceMarket"
            onChange={(value) => updateField("sourceMarket", value)}
            options={priorityMarkets}
            value={form.sourceMarket}
          />
          <Field
            error={errors.travelMonth?.[0]}
            label="Travel month"
            name="travelMonth"
            onChange={(value) => updateField("travelMonth", value)}
            placeholder="July 2026"
            value={form.travelMonth}
          />
          <Field
            error={errors.travelers?.[0]}
            label="Travelers"
            min="1"
            name="travelers"
            onChange={(value) => updateField("travelers", value)}
            type="number"
            value={form.travelers}
          />
        </div>

        <SelectField
          label="Budget range"
          name="budget"
          onChange={(value) => updateField("budget", value)}
          options={budgetRanges}
          value={form.budget}
        />

        <label className="grid gap-2 text-sm font-bold text-stone-700">
          Trip notes
          <textarea
            className="focus-ring min-h-32 resize-y rounded-2xl border border-stone-200 bg-white px-4 py-3 text-base font-medium text-stone-900 shadow-sm"
            name="message"
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Tell us your must-see destinations, lodge style, special occasion, dietary needs, or flights."
            value={form.message}
          />
          {errors.message?.[0] ? (
            <span className="text-xs font-semibold text-red-600">{errors.message[0]}</span>
          ) : null}
        </label>

        {message ? (
          <div
            className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
              status === "success"
                ? "bg-emerald-50 text-emerald-800"
                : "bg-red-50 text-red-700"
            }`}
          >
            {status === "success" ? <CheckCircle2 className="mr-2 inline size-4" /> : null}
            {message}
          </div>
        ) : null}

        <button
          className="focus-ring inline-flex items-center justify-center rounded-full bg-[#146c43] px-6 py-4 text-base font-black text-white shadow-xl shadow-emerald-950/20 transition hover:bg-[#0b3b25] disabled:cursor-not-allowed disabled:opacity-70"
          disabled={status === "submitting"}
          type="submit"
        >
          {status === "submitting" ? (
            <Loader2 className="mr-2 size-5 animate-spin" />
          ) : (
            <ArrowRight className="mr-2 size-5" />
          )}
          Request private quote
        </button>
      </form>

      <div className="mt-6 rounded-3xl bg-[#0b3b25] p-5 text-white">
        <p className="text-sm font-semibold text-white/75">Prefer direct contact?</p>
        <div className="mt-3 flex flex-col gap-3 text-sm font-bold sm:flex-row">
          <a className="hover:text-[#e8a317]" href={contact.whatsappUrl}>
            WhatsApp {contact.phoneDisplay}
          </a>
          <a className="hover:text-[#e8a317]" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  error?: string;
  label: string;
  min?: string;
  name: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  value: string;
};

function Field({
  error,
  label,
  min,
  name,
  onChange,
  placeholder,
  type = "text",
  value,
}: FieldProps) {
  return (
    <label className="grid gap-2 text-sm font-bold text-stone-700">
      {label}
      <input
        className="focus-ring rounded-2xl border border-stone-200 bg-white px-4 py-3 text-base font-medium text-stone-900 shadow-sm"
        min={min}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error ? <span className="text-xs font-semibold text-red-600">{error}</span> : null}
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  name: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
};

function SelectField({ label, name, onChange, options, value }: SelectFieldProps) {
  return (
    <label className="grid gap-2 text-sm font-bold text-stone-700">
      {label}
      <select
        className="focus-ring rounded-2xl border border-stone-200 bg-white px-4 py-3 text-base font-medium text-stone-900 shadow-sm"
        name={name}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

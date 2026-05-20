"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { DESTINATIONS, SOURCE_MARKETS, type SourceMarketId } from "@/lib/site";

const budgetOptions = [
  { value: "under_5000", label: "Under USD 5,000" },
  { value: "5000_10000", label: "USD 5,000 – 10,000" },
  { value: "10000_20000", label: "USD 10,000 – 20,000" },
  { value: "20000_plus", label: "USD 20,000+" },
  { value: "unsure", label: "Not sure yet" },
] as const;

function monthChoices(): string[] {
  const out: string[] = [];
  const now = new Date();
  for (let i = 0; i < 18; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    out.push(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
    );
  }
  return out;
}

export function InquiryForm({ compact }: { compact?: boolean }) {
  const { copy, locale } = useLocale();
  const months = useMemo(() => monthChoices(), []);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [homeRegion, setHomeRegion] = useState<SourceMarketId>("usa");
  const [destinations, setDestinations] = useState<string[]>(["tanzania"]);
  const [travelMonth, setTravelMonth] = useState(months[2] ?? months[0]);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [budgetBand, setBudgetBand] =
    useState<(typeof budgetOptions)[number]["value"]>("5000_10000");
  const [message, setMessage] = useState("");
  const [whatsappPreferred, setWhatsappPreferred] = useState(true);

  function toggleDestination(slug: string) {
    setDestinations((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug],
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorDetail(null);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          homeRegion,
          destinations,
          travelMonth,
          adults,
          children,
          budgetBand,
          message: message || undefined,
          whatsappPreferred,
          locale,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorDetail(data.error ?? "Request failed");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorDetail("network");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
        <p className="font-semibold">{copy.form.success}</p>
        <p className="mt-2 text-sm text-emerald-800">
          If you do not hear from us within one business day, please message us
          on WhatsApp — we never want a brief stuck in spam.
        </p>
      </div>
    );
  }

  return (
    <form
      className={`space-y-6 ${compact ? "max-w-xl" : "max-w-2xl"}`}
      onSubmit={onSubmit}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-stone-800">{copy.form.name}</span>
          <input
            required
            autoComplete="name"
            className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2.5 text-stone-900 shadow-sm outline-none ring-amber-500/30 focus:border-amber-500 focus:ring-4"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-stone-800">{copy.form.email}</span>
          <input
            required
            autoComplete="email"
            className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2.5 text-stone-900 shadow-sm outline-none ring-amber-500/30 focus:border-amber-500 focus:ring-4"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="font-medium text-stone-800">{copy.form.phone}</span>
        <input
          autoComplete="tel"
          className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2.5 text-stone-900 shadow-sm outline-none ring-amber-500/30 focus:border-amber-500 focus:ring-4"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <label className="block text-sm">
        <span className="font-medium text-stone-800">{copy.form.region}</span>
        <select
          required
          className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-stone-900 shadow-sm outline-none ring-amber-500/30 focus:border-amber-500 focus:ring-4"
          value={homeRegion}
          onChange={(e) =>
            setHomeRegion(e.target.value as SourceMarketId)
          }
        >
          {SOURCE_MARKETS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.flag} {m.label}
            </option>
          ))}
        </select>
      </label>
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-stone-800">
          {copy.form.destinations}
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {DESTINATIONS.map((d) => (
            <label
              key={d.slug}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-800"
            >
              <input
                checked={destinations.includes(d.slug)}
                className="h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                type="checkbox"
                onChange={() => toggleDestination(d.slug)}
              />
              {d.country}
            </label>
          ))}
        </div>
        {destinations.length === 0 ? (
          <p className="text-xs text-red-600">Select at least one destination.</p>
        ) : null}
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm sm:col-span-1">
          <span className="font-medium text-stone-800">{copy.form.month}</span>
          <select
            required
            className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-stone-900 shadow-sm outline-none ring-amber-500/30 focus:border-amber-500 focus:ring-4"
            value={travelMonth}
            onChange={(e) => setTravelMonth(e.target.value)}
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-stone-800">{copy.form.adults}</span>
          <input
            required
            className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2.5 text-stone-900 shadow-sm outline-none ring-amber-500/30 focus:border-amber-500 focus:ring-4"
            max={40}
            min={1}
            type="number"
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-stone-800">
            {copy.form.children}
          </span>
          <input
            className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2.5 text-stone-900 shadow-sm outline-none ring-amber-500/30 focus:border-amber-500 focus:ring-4"
            max={30}
            min={0}
            type="number"
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="font-medium text-stone-800">{copy.form.budget}</span>
        <select
          required
          className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-stone-900 shadow-sm outline-none ring-amber-500/30 focus:border-amber-500 focus:ring-4"
          value={budgetBand}
          onChange={(e) =>
            setBudgetBand(e.target.value as (typeof budgetOptions)[number]["value"])
          }
        >
          {budgetOptions.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        <span className="font-medium text-stone-800">{copy.form.message}</span>
        <textarea
          className="mt-1 min-h-[100px] w-full rounded-xl border border-stone-200 px-3 py-2.5 text-stone-900 shadow-sm outline-none ring-amber-500/30 focus:border-amber-500 focus:ring-4"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-800">
        <input
          checked={whatsappPreferred}
          className="h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
          type="checkbox"
          onChange={(e) => setWhatsappPreferred(e.target.checked)}
        />
        {copy.form.whatsapp}
      </label>
      {status === "error" ? (
        <p className="text-sm text-red-600">
          {copy.form.error}
          {errorDetail ? ` (${errorDetail})` : ""}
        </p>
      ) : null}
      <button
        className="w-full rounded-full bg-amber-600 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
        disabled={status === "loading" || destinations.length === 0}
        type="submit"
      >
        {status === "loading" ? copy.form.sending : copy.form.submit}
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { MARKETS } from "@/lib/utils";
import { Loader2, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    market: "us",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl bg-forest-800 p-8 text-center text-white">
        <CheckCircle className="mx-auto h-12 w-12 text-green-300" />
        <p className="mt-4 font-semibold">Message sent! We&apos;ll respond within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-safari-700">Name</span>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full rounded-xl border border-safari-300 px-4 py-3 focus:border-terracotta-500 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-safari-700">Email</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full rounded-xl border border-safari-300 px-4 py-3 focus:border-terracotta-500 focus:outline-none"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-medium text-safari-700">Phone (optional)</span>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="mt-1 w-full rounded-xl border border-safari-300 px-4 py-3 focus:border-terracotta-500 focus:outline-none"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-safari-700">Your region</span>
        <select
          value={form.market}
          onChange={(e) => setForm({ ...form, market: e.target.value })}
          className="mt-1 w-full rounded-xl border border-safari-300 px-4 py-3 focus:border-terracotta-500 focus:outline-none"
        >
          {MARKETS.map((m) => (
            <option key={m.code} value={m.code}>
              {m.flag} {m.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-medium text-safari-700">Subject</span>
        <input
          type="text"
          required
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="mt-1 w-full rounded-xl border border-safari-300 px-4 py-3 focus:border-terracotta-500 focus:outline-none"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-safari-700">Message</span>
        <textarea
          rows={5}
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="mt-1 w-full rounded-xl border border-safari-300 px-4 py-3 focus:border-terracotta-500 focus:outline-none"
        />
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Message"}
      </Button>
    </form>
  );
}

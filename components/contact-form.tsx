"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Submission failed");
      setStatus("success");
      setMessage("Asante sana! We'll get back to you within 12 hours.");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.message || "Unable to send.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Name</label>
          <input name="name" required className="input" />
        </div>
        <div>
          <label className="label">Country</label>
          <input name="country" className="input" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Email</label>
          <input name="email" type="email" required className="input" />
        </div>
        <div>
          <label className="label">Phone (optional)</label>
          <input name="phone" type="tel" className="input" />
        </div>
      </div>

      <div>
        <label className="label">Subject</label>
        <input name="subject" required className="input" placeholder="Custom safari, honeymoon, group…" />
      </div>

      <div>
        <label className="label">Message</label>
        <textarea name="message" rows={5} required className="input" />
      </div>

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full disabled:opacity-60">
        {status === "loading" ? "Sending…" : "Send message"}
      </button>

      {status !== "idle" && (
        <p className={`text-sm ${status === "error" ? "text-red-600" : "text-acacia-700"}`}>{message}</p>
      )}
    </form>
  );
}

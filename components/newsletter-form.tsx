"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Subscribe failed");
      setStatus("success");
      setMessage("Karibu! You're on the list — check your inbox for our migration calendar.");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.message || "Subscription failed. Try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className={cn(
          "input flex-1",
          dark && "bg-savanna-900 border-savanna-800 text-white placeholder:text-savanna-400"
        )}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary disabled:opacity-60"
      >
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </button>
      {status !== "idle" && (
        <p className={cn("text-xs sm:basis-full", status === "error" ? "text-red-400" : dark ? "text-acacia-300" : "text-acacia-700")}>
          {message}
        </p>
      )}
    </form>
  );
}

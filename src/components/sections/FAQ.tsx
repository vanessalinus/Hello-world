"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do you only work with luxury budgets?",
    a: "No. We map three bands — classic comfortable, premium small camps, and top-tier low-volume properties — then show where extra spend changes the experience versus where it is mostly aesthetics.",
  },
  {
    q: "How do payments work?",
    a: "Typical milestones: a modest planning deposit, lodge deposit schedule aligned to supplier invoices, and a pre-arrival balance. We document what each tranche covers.",
  },
  {
    q: "Can you help with visas and park permits?",
    a: "Yes. Requirements vary by nationality; we send a checklist early and coordinate e-visas or on-arrival pathways where applicable. Gorilla and chimp permits are time-sensitive — we flag windows.",
  },
  {
    q: "What if my international flight is delayed?",
    a: "We build buffer where it matters, keep driver/guide WhatsApp lines active, and re-sequence road or domestic flights when operators allow changes without penalties.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-stone-900 py-16 text-stone-100 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl sm:text-4xl">Questions that unblock bookings</h2>
        <p className="mt-3 text-stone-300">
          Addressing these early reduces inbox ping-pong and gets you a quote you
          can trust faster.
        </p>
        <dl className="mt-10 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="rounded-2xl border border-white/10 bg-white/5"
              >
                <dt>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-white sm:text-base"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                  >
                    {item.q}
                    <span className="text-amber-300">{isOpen ? "−" : "+"}</span>
                  </button>
                </dt>
                {isOpen ? (
                  <dd className="border-t border-white/10 px-5 pb-4 pt-2 text-sm leading-relaxed text-stone-300">
                    {item.a}
                  </dd>
                ) : null}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

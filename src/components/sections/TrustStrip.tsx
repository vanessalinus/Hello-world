"use client";

import { useLocale } from "@/context/LocaleContext";

export function TrustStrip() {
  const { copy } = useLocale();
  const items = [
    { key: "licensed", icon: "◎" },
    { key: "payments", icon: "◇" },
    { key: "support", icon: "☆" },
  ] as const;
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex items-start gap-3 rounded-2xl border border-stone-100 bg-stone-50/80 p-5"
          >
            <span className="text-lg text-amber-700" aria-hidden>
              {item.icon}
            </span>
            <p className="text-sm font-medium leading-snug text-stone-800">
              {copy.trust[item.key]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { LOCALES, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LocaleSwitcherProps {
  locale: Locale;
  onChange: (locale: Locale) => void;
}

export function LocaleSwitcher({ locale, onChange }: LocaleSwitcherProps) {
  return (
    <div className="flex gap-1 rounded-full bg-safari-100 p-1">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => onChange(l.code)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium transition",
            locale === l.code
              ? "bg-white text-forest-800 shadow-sm"
              : "text-safari-600 hover:text-safari-800"
          )}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

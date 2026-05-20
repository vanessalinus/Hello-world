"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { COPY, type Locale } from "@/lib/copy";

const STORAGE_KEY = "leviva_locale";

type CopyBundle = (typeof COPY)[Locale];

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  copy: CopyBundle;
} | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === "zh" || raw === "ko" || raw === "en") return raw;
  return "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate stored locale after SSR
    setLocaleState(readStoredLocale());
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang =
      l === "zh" ? "zh-Hans" : l === "ko" ? "ko" : "en";
  }, []);

  useEffect(() => {
    document.documentElement.lang =
      locale === "zh" ? "zh-Hans" : locale === "ko" ? "ko" : "en";
  }, [locale]);

  const copy = useMemo(() => COPY[locale], [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, copy }),
    [locale, setLocale, copy],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

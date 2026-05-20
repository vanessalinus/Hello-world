"use client";

import { useEffect } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";

/** Syncs locale from localStorage on mount */
export function HomeClient() {
  const { setLocale } = useLocale();

  useEffect(() => {
    const saved = localStorage.getItem("leviva-locale");
    if (saved === "en" || saved === "zh" || saved === "ko") {
      setLocale(saved);
    }
  }, [setLocale]);

  return null;
}

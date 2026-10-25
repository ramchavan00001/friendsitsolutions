"use client";
import { createContext, useContext } from "react";
import type { Locale } from "./config";
import type { UIDictionary } from "./dictionaries/en";

const I18nContext = createContext<{ locale: Locale; t: UIDictionary } | null>(null);

export function I18nProvider({ locale, t, children }: { locale: Locale; t: UIDictionary; children: React.ReactNode }) {
  return <I18nContext.Provider value={{ locale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

/** Translate a validation message (keyed by its English text), falling back to the original. */
export function useErrorText() {
  const { t } = useI18n();
  return (msg?: string) => (msg ? t.errors[msg] ?? msg : undefined);
}

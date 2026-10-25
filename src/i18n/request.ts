import "server-only";
import { cache } from "react";
import { defaultLocale, type Locale } from "./config";

/**
 * Per-request locale store. Each layout/page calls setLocale(params.locale) first, so nested
 * server components can read it without prop drilling.
 */
const store = cache(() => ({ locale: defaultLocale as Locale }));

export function setLocale(locale: Locale) {
  store().locale = locale;
}

export function getLocale(): Locale {
  return store().locale;
}

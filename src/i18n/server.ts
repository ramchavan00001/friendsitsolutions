import "server-only";
import { defaultLocale, isLocale, type Locale } from "./config";
import { setLocale } from "./request";

/** Resolve the [locale] route param, store it for this request and return it. */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : defaultLocale;
  setLocale(l);
  return l;
}

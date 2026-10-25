/** Supported languages. English is the default and is served without a URL prefix. */
export const locales = ["en", "hi", "mr", "de", "es", "fr", "ja"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, { native: string; english: string }> = {
  en: { native: "English", english: "English" },
  hi: { native: "हिन्दी", english: "Hindi" },
  mr: { native: "मराठी", english: "Marathi" },
  de: { native: "Deutsch", english: "German" },
  es: { native: "Español", english: "Spanish" },
  fr: { native: "Français", english: "French" },
  ja: { native: "日本語", english: "Japanese" },
};

/** BCP 47 tags for <html lang>, hreflang and date formatting. */
export const localeTags: Record<Locale, string> = {
  en: "en-IN",
  hi: "hi-IN",
  mr: "mr-IN",
  de: "de-DE",
  es: "es-ES",
  fr: "fr-FR",
  ja: "ja-JP",
};

export const ogLocales: Record<Locale, string> = {
  en: "en_IN",
  hi: "hi_IN",
  mr: "mr_IN",
  de: "de_DE",
  es: "es_ES",
  fr: "fr_FR",
  ja: "ja_JP",
};

export const LOCALE_COOKIE = "NEXT_LOCALE";

export const isLocale = (value: string | undefined): value is Locale => !!value && (locales as readonly string[]).includes(value);

/** Prefix an internal path with the locale (English stays unprefixed). */
export function localizePath(locale: Locale, path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Remove a leading locale segment: "/de/services" → "/services". */
export function stripLocale(pathname: string) {
  const seg = pathname.split("/")[1];
  if (isLocale(seg)) {
    const rest = pathname.slice(seg.length + 1);
    return rest === "" ? "/" : rest;
  }
  return pathname;
}

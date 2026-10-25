import type { Metadata } from "next";
import { site } from "@/content/site";
import { defaultLocale, localeTags, locales, localizePath, ogLocales, type Locale } from "@/i18n/config";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  /** Override the default dynamic OG image. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
  locale?: Locale;
};

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

/** Unique title/description, canonical, Open Graph and Twitter card for every page. */
export function buildMetadata({ title, description, path, image, type = "website", publishedTime, noIndex, locale = defaultLocale }: MetaInput): Metadata {
  const url = absoluteUrl(localizePath(locale, path));
  // hreflang alternates for every language, with English as x-default.
  const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [localeTags[l], absoluteUrl(localizePath(l, path))]));
  languages["x-default"] = absoluteUrl(path);
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: ogLocales[locale],
      type,
      ...(images && { images }),
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image && { images: [image] }),
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

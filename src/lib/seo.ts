import type { Metadata } from "next";
import { site } from "@/content/site";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  /** Override the default dynamic OG image. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

/** Unique title/description, canonical, Open Graph and Twitter card for every page. */
export function buildMetadata({ title, description, path, image, type = "website", publishedTime, noIndex }: MetaInput): Metadata {
  const url = absoluteUrl(path);
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_IN",
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

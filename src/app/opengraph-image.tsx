import { ogImage, ogSize } from "@/lib/og";
import { site } from "@/content/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default function Image() {
  return ogImage({ title: "Software, Cloud, Security & IT Support — all under one roof", kicker: site.tagline });
}

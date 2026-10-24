import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { blogCategories, blogTags } from "@/content/blog";
import { team } from "@/content/company";
import { locationPages } from "@/content/misc";
import { getCaseStudies, getJobs, getPosts } from "@/lib/cms";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, caseStudies, jobs] = await Promise.all([getPosts(), getCaseStudies(), getJobs()]);
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly", lastModified: Date = now) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });
  return [
    entry("/", 1, "weekly"),
    entry("/services", 0.9, "weekly"),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.9)),
    ...locationPages.map((l) => entry(`/locations/${l.slug}`, 0.8)),
    ...["/about", "/industries", "/portfolio", "/technologies", "/pricing", "/testimonials", "/faq", "/contact", "/get-a-quote", "/careers", "/book-a-meeting", "/support"].map((p) => entry(p, 0.7)),
    ...caseStudies.map((c) => entry(`/portfolio/${c.slug}`, 0.7)),
    entry("/blog", 0.8, "weekly"),
    ...posts.map((p) => entry(`/blog/${p.slug}`, 0.7, "monthly", new Date(p.updatedAt ?? p.publishedAt))),
    ...blogCategories.map((c) => entry(`/blog/category/${c.slug}`, 0.4, "weekly")),
    ...blogTags.map((t) => entry(`/blog/tag/${t.slug}`, 0.3, "weekly")),
    ...team.map((m) => entry(`/blog/author/${m.slug}`, 0.3)),
    ...jobs.map((j) => entry(`/careers/${j.slug}`, 0.6, "weekly")),
    ...["/privacy-policy", "/terms-and-conditions", "/refund-policy", "/cookie-policy"].map((p) => entry(p, 0.2, "yearly")),
  ];
}

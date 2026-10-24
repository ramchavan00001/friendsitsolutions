import "server-only";
import { blogPosts } from "@/content/blog";
import { caseStudies, testimonials } from "@/content/portfolio";
import { jobs, team } from "@/content/company";
import { services } from "@/content/services";
import type { BlogBlock, BlogPost, CaseStudy, Job, Service, TeamMember, Testimonial } from "@/content/types";

/**
 * Content access layer. When Sanity is configured (SANITY_PROJECT_ID), documents are fetched
 * from the Sanity CDN with ISR; otherwise the typed local content in /src/content is used.
 * Schemas in /cms/sanity/schemas mirror these TypeScript types one-to-one.
 */
const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? "production";
const apiVersion = "2025-01-01";

async function sanityFetch<T>(query: string, params: Record<string, string> = {}): Promise<T | null> {
  if (!projectId) return null;
  const url = new URL(`https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set("query", query);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(`$${k}`, JSON.stringify(v));
  try {
    const res = await fetch(url, {
      headers: process.env.SANITY_API_TOKEN ? { Authorization: `Bearer ${process.env.SANITY_API_TOKEN}` } : undefined,
      next: { revalidate: 300, tags: ["sanity"] },
    });
    if (!res.ok) throw new Error(`Sanity ${res.status}`);
    const json = (await res.json()) as { result: T };
    return json.result;
  } catch (e) {
    console.error("[cms] Sanity fetch failed, falling back to local content", e);
    return null;
  }
}

/** Use CMS results when present and non-empty, otherwise local content. */
async function withFallback<T>(query: string, local: T[]): Promise<T[]> {
  const remote = await sanityFetch<T[]>(query);
  return remote && remote.length ? remote : local;
}

type PortableBlock = { _type: string; style?: string; listItem?: string; children?: { text: string }[] };

/** Convert Sanity Portable Text into the simple block format the blog renderer uses. */
function portableToBlocks(body: PortableBlock[] | BlogBlock[]): BlogBlock[] {
  if (!body.length || !("_type" in body[0])) return body as BlogBlock[];
  const out: BlogBlock[] = [];
  for (const b of body as PortableBlock[]) {
    if (b._type !== "block") continue;
    const text = (b.children ?? []).map((c) => c.text).join("");
    if (b.listItem) {
      const last = out[out.length - 1];
      if (last?.type === "ul") last.items.push(text);
      else out.push({ type: "ul", items: [text] });
    } else if (b.style === "h2" || b.style === "h3") out.push({ type: b.style, text });
    else if (b.style === "blockquote") out.push({ type: "quote", text });
    else out.push({ type: "p", text });
  }
  return out;
}

export const getServices = (): Promise<Service[]> =>
  withFallback(`*[_type=="service"]|order(order asc){..., "slug": slug.current, "caseStudySlug": caseStudy->slug.current, "testimonialId": testimonial->_id}`, services);

export const getCaseStudies = (): Promise<CaseStudy[]> =>
  withFallback(`*[_type=="caseStudy"]|order(_createdAt desc){..., "slug": slug.current, "services": services[]->slug.current, "testimonialId": testimonial->_id}`, caseStudies);

export const getTestimonials = (): Promise<Testimonial[]> =>
  withFallback(`*[_type=="testimonial"]{..., "id": _id}`, testimonials);

export const getTeam = (): Promise<TeamMember[]> =>
  withFallback(`*[_type=="teamMember"]|order(order asc){..., "slug": slug.current}`, team);

export const getJobs = (): Promise<Job[]> =>
  withFallback(`*[_type=="job" && isOpen==true]|order(postedAt desc){..., "slug": slug.current}`, jobs);

export async function getPosts(): Promise<BlogPost[]> {
  const posts = await withFallback<BlogPost>(
    `*[_type=="post"]|order(publishedAt desc){..., "slug": slug.current, "authorSlug": author->slug.current, "category": category->title}`,
    blogPosts,
  );
  return posts.map((p) => ({ ...p, body: portableToBlocks(p.body) })).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPost(slug: string) {
  return (await getPosts()).find((p) => p.slug === slug);
}

export async function getAuthorName(slug: string) {
  return (await getTeam()).find((m) => m.slug === slug)?.name ?? "FriendsITSolutions Team";
}

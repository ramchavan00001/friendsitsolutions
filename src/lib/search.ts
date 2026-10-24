import "server-only";
import { services } from "@/content/services";
import { caseStudies } from "@/content/portfolio";
import { blogPosts } from "@/content/blog";
import { industries, jobs } from "@/content/company";
import { generalFaqs } from "@/content/misc";

export type SearchResult = { title: string; href: string; type: string; excerpt: string };

const staticPages: SearchResult[] = [
  { title: "About Us", href: "/about", type: "Page", excerpt: "Our story, mission, vision, values, team and certifications." },
  { title: "Pricing & Engagement Models", href: "/pricing", type: "Page", excerpt: "Fixed price, hourly, dedicated team and AMC plans." },
  { title: "Technologies", href: "/technologies", type: "Page", excerpt: "Our full technology stack." },
  { title: "Contact Us", href: "/contact", type: "Page", excerpt: "Phone, WhatsApp, email, office hours and map." },
  { title: "Get a Free Quote", href: "/get-a-quote", type: "Page", excerpt: "Request a free, itemised project estimate." },
  { title: "Support", href: "/support", type: "Page", excerpt: "Raise an IT support ticket." },
  { title: "Book a Meeting", href: "/book-a-meeting", type: "Page", excerpt: "Schedule a free consultation call." },
];

const index: (SearchResult & { body: string })[] = [
  ...services.map((s) => ({ title: s.title, href: `/services/${s.slug}`, type: "Service", excerpt: s.summary, body: [s.heroSubheadline, ...s.features.map((f) => f.title), ...s.technologies, ...s.faqs.map((f) => f.q)].join(" ") })),
  ...caseStudies.map((c) => ({ title: c.title, href: `/portfolio/${c.slug}`, type: "Case study", excerpt: c.summary, body: `${c.industry} ${c.challenge} ${c.solution} ${c.technologies.join(" ")}` })),
  ...blogPosts.map((p) => ({ title: p.title, href: `/blog/${p.slug}`, type: "Article", excerpt: p.excerpt, body: `${p.category} ${p.tags.join(" ")}` })),
  ...industries.map((i) => ({ title: `${i.name} IT solutions`, href: `/industries#${i.slug}`, type: "Industry", excerpt: i.description, body: i.solutions.join(" ") })),
  ...jobs.map((j) => ({ title: j.title, href: `/careers/${j.slug}`, type: "Job", excerpt: j.summary, body: `${j.department} ${j.requirements.join(" ")}` })),
  ...generalFaqs.flatMap((g) => g.items).map((f) => ({ title: f.q, href: "/faq", type: "FAQ", excerpt: f.a, body: "" })),
  ...staticPages.map((p) => ({ ...p, body: "" })),
];

export function siteSearch(q: string): SearchResult[] {
  const terms = q.toLowerCase().split(/\s+/).filter((t) => t.length > 1);
  if (!terms.length) return [];
  return index
    .map((item) => {
      const title = item.title.toLowerCase();
      const rest = `${item.excerpt} ${item.body}`.toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (title.includes(t)) score += 3;
        else if (rest.includes(t)) score += 1;
        else return null;
      }
      return { score, item };
    })
    .filter((x): x is { score: number; item: (typeof index)[number] } => x !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 30)
    .map(({ item }) => ({ title: item.title, href: item.href, type: item.type, excerpt: item.excerpt }));
}

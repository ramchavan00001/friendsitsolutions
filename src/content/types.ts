import type { IconName } from "@/components/icon";

export type FAQ = { q: string; a: string };
export type Feature = { title: string; description: string };
export type Step = { title: string; description: string };

export type ServiceCategory = "development" | "cloud" | "security" | "growth";

export type Service = {
  slug: string;
  title: string;
  category: ServiceCategory;
  icon: IconName;
  /** One-liner used on cards, the mega menu and meta descriptions. */
  summary: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  problems: string[];
  solution: string;
  features: Feature[];
  /** Falls back to the category's default process when omitted. */
  process?: Step[];
  technologies: string[];
  benefits: Feature[];
  /** e.g. "₹25,000". Omit to show "Get a custom quote". */
  startingPrice?: string;
  priceUnit?: string;
  caseStudySlug: string;
  testimonialId: string;
  /** Service-specific FAQs. Shared FAQs are appended automatically. */
  faqs: FAQ[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  services: string[]; // service slugs
  summary: string;
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  technologies: string[];
  duration: string;
  testimonialId?: string;
  placeholder: true;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  service: string;
  placeholder: true;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  linkedin?: string;
  placeholder: true;
};

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  authorSlug: string;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  body: BlogBlock[];
  placeholder: true;
};

export type Job = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  postedAt: string;
};

export type Industry = {
  slug: string;
  name: string;
  icon: IconName;
  description: string;
  solutions: string[];
};

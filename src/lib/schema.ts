import { site } from "@/content/site";
import type { BlogPost, FAQ, Service, Testimonial } from "@/content/types";
import { absoluteUrl } from "./seo";

const orgId = `${site.url}/#organization`;

const address = {
  "@type": "PostalAddress",
  streetAddress: site.streetAddress,
  addressLocality: site.city,
  addressRegion: site.state,
  postalCode: site.postalCode,
  addressCountry: "IN",
};

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": orgId,
  name: site.name,
  url: site.url,
  logo: absoluteUrl("/icon.svg"),
  slogan: site.tagline,
  description: site.description,
  foundingDate: String(site.founded),
  email: site.email,
  telephone: site.phone,
  address,
  sameAs: Object.values(site.social),
  contactPoint: [
    { "@type": "ContactPoint", telephone: site.phone, contactType: "sales", areaServed: ["IN", "Worldwide"], availableLanguage: ["English", "Hindi"] },
    { "@type": "ContactPoint", email: site.supportEmail, contactType: "technical support", areaServed: "IN" },
  ],
});

export const localBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#localbusiness`,
  name: site.name,
  image: absoluteUrl("/opengraph-image"),
  url: site.url,
  telephone: site.phone,
  email: site.email,
  priceRange: "₹₹",
  address,
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  areaServed: [{ "@type": "City", name: site.city }, { "@type": "Country", name: "India" }],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:30", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "16:00" },
  ],
  parentOrganization: { "@id": orgId },
});

export const serviceSchema = (service: Service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.title,
  serviceType: service.title,
  description: service.metaDescription,
  url: absoluteUrl(`/services/${service.slug}`),
  provider: { "@id": orgId },
  areaServed: ["India", "Worldwide"],
  ...(service.startingPrice && {
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: service.startingPrice.replace(/[^\d]/g, ""),
      description: `Starting from ${service.startingPrice}${service.priceUnit ? ` ${service.priceUnit}` : ""}`,
    },
  }),
});

export const faqSchema = (faqs: FAQ[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const articleSchema = (post: BlogPost, authorName: string) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.excerpt,
  datePublished: post.publishedAt,
  dateModified: post.updatedAt ?? post.publishedAt,
  url: absoluteUrl(`/blog/${post.slug}`),
  image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
  author: { "@type": "Person", name: authorName, url: absoluteUrl(`/blog/author/${post.authorSlug}`) },
  publisher: { "@id": orgId },
  keywords: post.tags.join(", "),
  articleSection: post.category,
});

export const reviewsSchema = (reviews: Testimonial[]) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": orgId,
  name: site.name,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1),
    reviewCount: reviews.length,
    bestRating: 5,
  },
  review: reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    reviewBody: r.quote,
    reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
  })),
});

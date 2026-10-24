import { defineField, defineType } from "sanity";
import { seoFields, slugField, titleDescription } from "./shared";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    slugField(),
    defineField({
      name: "category",
      type: "string",
      options: { list: [
        { title: "Software & Development", value: "development" },
        { title: "Cloud & Infrastructure", value: "cloud" },
        { title: "Security & Support", value: "security" },
        { title: "Data, AI & Growth", value: "growth" },
      ] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "icon", type: "string", description: "Icon key from src/components/icon.tsx (e.g. code, cloud, shield)" }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "summary", type: "text", rows: 2, validation: (r) => r.required().max(160) }),
    ...seoFields,
    defineField({ name: "heroHeadline", type: "string" }),
    defineField({ name: "heroSubheadline", type: "text", rows: 3 }),
    defineField({ name: "problems", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "solution", type: "text", rows: 4 }),
    titleDescription("features", "What's included"),
    titleDescription("process", "Process steps (optional — uses category default)"),
    defineField({ name: "technologies", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    titleDescription("benefits", "Benefits"),
    defineField({ name: "startingPrice", type: "string", description: "e.g. ₹25,000 — leave empty for 'Get quote'" }),
    defineField({ name: "priceUnit", type: "string", description: "e.g. /month" }),
    defineField({ name: "caseStudy", type: "reference", to: [{ type: "caseStudy" }] }),
    defineField({ name: "testimonial", type: "reference", to: [{ type: "testimonial" }] }),
    defineField({
      name: "faqs",
      type: "array",
      of: [{ type: "object", fields: [{ name: "q", title: "Question", type: "string" }, { name: "a", title: "Answer", type: "text" }] }],
      validation: (r) => r.min(3),
    }),
  ],
  preview: { select: { title: "title", subtitle: "category" } },
});

import { defineField, defineType } from "sanity";
import { slugField } from "./shared";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    slugField(),
    defineField({ name: "client", type: "string" }),
    defineField({ name: "industry", type: "string" }),
    defineField({ name: "services", type: "array", of: [{ type: "reference", to: [{ type: "service" }] }] }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string", validation: (r) => r.required() }] }),
    defineField({ name: "summary", type: "text", rows: 2 }),
    defineField({ name: "challenge", type: "text" }),
    defineField({ name: "solution", type: "text" }),
    defineField({
      name: "results",
      type: "array",
      of: [{ type: "object", fields: [{ name: "metric", type: "string" }, { name: "label", type: "string" }] }],
    }),
    defineField({ name: "technologies", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "duration", type: "string" }),
    defineField({ name: "testimonial", type: "reference", to: [{ type: "testimonial" }] }),
  ],
});

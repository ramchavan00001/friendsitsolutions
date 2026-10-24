import { defineField, defineType } from "sanity";
import { seoFields, slugField } from "./shared";

export const category = defineType({
  name: "category",
  title: "Blog category",
  type: "document",
  fields: [defineField({ name: "title", type: "string", validation: (r) => r.required() }), slugField()],
});

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    slugField(),
    defineField({ name: "excerpt", type: "text", rows: 3, validation: (r) => r.required().max(200) }),
    defineField({ name: "category", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "author", type: "reference", to: [{ type: "teamMember" }] }),
    defineField({ name: "publishedAt", type: "date", validation: (r) => r.required() }),
    defineField({ name: "updatedAt", type: "date" }),
    defineField({ name: "readingMinutes", type: "number" }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string" }] }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }, { title: "H2", value: "h2" }, { title: "H3", value: "h3" }, { title: "Quote", value: "blockquote" }] }],
    }),
    ...seoFields,
  ],
  orderings: [{ title: "Newest", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
});

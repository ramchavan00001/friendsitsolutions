import { defineField } from "sanity";

export const slugField = (source = "title") =>
  defineField({ name: "slug", type: "slug", options: { source, maxLength: 96 }, validation: (r) => r.required() });

export const seoFields = [
  defineField({ name: "metaTitle", type: "string", validation: (r) => r.max(65).warning("Keep titles under ~60 characters") }),
  defineField({ name: "metaDescription", type: "text", rows: 3, validation: (r) => r.max(160).warning("Keep descriptions under ~155 characters") }),
];

export const titleDescription = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [{ type: "object", fields: [{ name: "title", type: "string" }, { name: "description", type: "text", rows: 2 }] }],
  });

import { defineField, defineType } from "sanity";
import { slugField } from "./shared";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member / author",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    slugField("name"),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "photo", type: "image", options: { hotspot: true }, fields: [{ name: "alt", type: "string" }] }),
    defineField({ name: "bio", type: "text", rows: 3 }),
    defineField({ name: "expertise", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "linkedin", type: "url" }),
  ],
});

import { defineField, defineType } from "sanity";
import { slugField } from "./shared";

export const job = defineType({
  name: "job",
  title: "Job opening",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    slugField(),
    defineField({ name: "isOpen", type: "boolean", initialValue: true }),
    defineField({ name: "department", type: "string" }),
    defineField({ name: "location", type: "string", options: { list: ["On-site", "Hybrid", "Remote (India)"] } }),
    defineField({ name: "type", type: "string", options: { list: ["Full-time", "Part-time", "Internship", "Contract"] } }),
    defineField({ name: "experience", type: "string" }),
    defineField({ name: "summary", type: "text", rows: 2 }),
    defineField({ name: "responsibilities", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "requirements", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "niceToHave", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "postedAt", type: "date" }),
  ],
});

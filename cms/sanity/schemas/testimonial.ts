import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "company", type: "string" }),
    defineField({ name: "quote", type: "text", validation: (r) => r.required() }),
    defineField({ name: "rating", type: "number", initialValue: 5, validation: (r) => r.min(1).max(5) }),
    defineField({ name: "service", type: "string" }),
    defineField({ name: "approved", type: "boolean", description: "Client has approved publication", initialValue: false }),
  ],
  preview: { select: { title: "name", subtitle: "company" } },
});

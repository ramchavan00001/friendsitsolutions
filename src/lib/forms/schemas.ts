import { z } from "zod";

const name = z.string().trim().min(2, "Please enter your name").max(100);
const email = z.string().trim().email("Please enter a valid email").max(200);
const phone = z
  .string()
  .trim()
  .min(7, "Please enter a valid phone number")
  .max(20)
  .regex(/^[+\d][\d\s()-]+$/, "Please enter a valid phone number");
const optionalPhone = z.union([phone, z.literal("")]).optional();
const consent = z.literal(true, { errorMap: () => ({ message: "Please accept the privacy policy to continue" }) });

export const contactSchema = z.object({
  name,
  email,
  phone: optionalPhone,
  company: z.string().trim().max(150).optional(),
  service: z.string().trim().max(120).optional(),
  message: z.string().trim().min(10, "Tell us a little more (min 10 characters)").max(5000),
  source: z.string().max(50).optional(),
  consent,
});

export const budgetRanges = [
  "Under ₹50,000",
  "₹50,000 – ₹2 lakh",
  "₹2 lakh – ₹5 lakh",
  "₹5 lakh – ₹15 lakh",
  "₹15 lakh+",
  "Not sure yet",
] as const;

export const timelines = ["ASAP (within 2 weeks)", "1 – 3 months", "3 – 6 months", "6+ months", "Flexible"] as const;

export const quoteSchema = z.object({
  services: z.array(z.string().max(120)).min(1, "Select at least one service").max(10),
  projectType: z.enum(["New project", "Improve existing", "Ongoing support", "Consultation"]),
  description: z.string().trim().min(20, "Please describe your project (min 20 characters)").max(5000),
  budget: z.enum(budgetRanges, { errorMap: () => ({ message: "Select a budget range" }) }),
  timeline: z.enum(timelines, { errorMap: () => ({ message: "Select a timeline" }) }),
  name,
  email,
  phone,
  company: z.string().trim().max(150).optional(),
  preferredContact: z.enum(["Email", "Phone", "WhatsApp"]),
  consent,
});

export const careerSchema = z.object({
  position: z.string().trim().min(2).max(150),
  name,
  email,
  phone,
  experience: z.string().trim().min(1, "Enter your experience").max(50),
  currentLocation: z.string().trim().min(2, "Enter your location").max(100),
  noticePeriod: z.string().trim().max(50).optional(),
  linkedin: z.union([z.string().trim().url("Enter a valid URL"), z.literal("")]).optional(),
  portfolio: z.union([z.string().trim().url("Enter a valid URL"), z.literal("")]).optional(),
  coverLetter: z.string().trim().max(5000).optional(),
  consent,
});

export const supportSchema = z.object({
  name,
  email,
  phone: optionalPhone,
  company: z.string().trim().max(150).optional(),
  priority: z.enum(["Low", "Normal", "High", "Critical"]),
  category: z.enum(["Hardware", "Network", "Email / Microsoft 365 / Google", "Website / Hosting", "Software / Application", "Security", "Billing", "Other"]),
  subject: z.string().trim().min(5, "Enter a short subject").max(200),
  description: z.string().trim().min(10, "Describe the issue").max(5000),
  consent,
});

export const newsletterSchema = z.object({
  email,
});

export type ContactInput = z.infer<typeof contactSchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
export type CareerInput = z.infer<typeof careerSchema>;
export type SupportInput = z.infer<typeof supportSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const formSchemas = {
  contact: contactSchema,
  quote: quoteSchema,
  career: careerSchema,
  support: supportSchema,
  newsletter: newsletterSchema,
} as const;

export type FormType = keyof typeof formSchemas;

/** Upload rules per form. Files are validated again on the server. */
export const uploadRules: Partial<Record<FormType, { field: string; maxFiles: number; maxBytes: number; types: string[] }>> = {
  quote: {
    field: "attachments",
    maxFiles: 3,
    maxBytes: 5 * 1024 * 1024,
    types: ["application/pdf", "image/png", "image/jpeg", "image/webp", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/zip"],
  },
  career: {
    field: "resume",
    maxFiles: 1,
    maxBytes: 5 * 1024 * 1024,
    types: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  },
  support: {
    field: "attachments",
    maxFiles: 3,
    maxBytes: 5 * 1024 * 1024,
    types: ["application/pdf", "image/png", "image/jpeg", "image/webp", "text/plain"],
  },
};

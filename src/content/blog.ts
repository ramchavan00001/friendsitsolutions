import type { BlogPost } from "./types";
import { slugify } from "@/lib/utils";

// PLACEHOLDER posts — replace with real articles (or publish from the CMS).

export const blogPosts: BlogPost[] = [
  {
    slug: "how-much-does-a-website-cost-in-india",
    title: "How Much Does a Website Cost in India in 2026? A Transparent Guide",
    excerpt:
      "From ₹25,000 brochure sites to ₹10 lakh+ platforms — what actually drives website pricing and how to budget wisely.",
    category: "Web Development",
    tags: ["Website Cost", "Small Business", "WordPress", "Next.js"],
    authorSlug: "karan-verma",
    publishedAt: "2026-09-18",
    readingMinutes: 7,
    placeholder: true,
    body: [
      { type: "p", text: "\"How much will my website cost?\" is the first question almost every business owner asks us — and the honest answer is: it depends. But it shouldn't be a mystery. In this guide we break down exactly what drives the price so you can budget with confidence." },
      { type: "h2", text: "Typical website price ranges" },
      { type: "ul", items: [
        "Landing page: ₹15,000 – ₹40,000",
        "Small business website (5–10 pages): ₹25,000 – ₹80,000",
        "Corporate website with CMS and integrations: ₹80,000 – ₹3,00,000",
        "E-commerce store: ₹60,000 – ₹5,00,000+",
        "Custom web application or portal: ₹3,00,000 and above",
      ] },
      { type: "h2", text: "What drives the cost?" },
      { type: "h3", text: "1. Design: template vs custom" },
      { type: "p", text: "A customised template is faster and cheaper; a fully custom design costs more but differentiates your brand and is built around your conversion goals." },
      { type: "h3", text: "2. Features and integrations" },
      { type: "p", text: "Payment gateways, booking systems, CRM integrations, multi-language support and member areas all add development and testing time." },
      { type: "h3", text: "3. Content" },
      { type: "p", text: "Professional copywriting, photography and video make a big difference to results, and should be part of your budget." },
      { type: "h2", text: "Don't forget the running costs" },
      { type: "p", text: "Plan for domain renewal, hosting, SSL, business email and an annual maintenance plan. For a typical small business this is ₹8,000 – ₹30,000 per year." },
      { type: "quote", text: "The cheapest website is rarely the best value. Choose a partner who will still be there to support you a year from now." },
      { type: "h2", text: "Next steps" },
      { type: "p", text: "Write down your goals, must-have features and a rough budget, then ask for an itemised quote. Our team is happy to give you a free, no-obligation estimate." },
    ],
  },
  {
    slug: "cybersecurity-checklist-for-small-businesses",
    title: "The 12-Point Cybersecurity Checklist Every Small Business Needs",
    excerpt:
      "Most attacks on SMEs exploit simple gaps. Use this practical checklist to protect your data, money and reputation.",
    category: "Cybersecurity",
    tags: ["Cybersecurity", "SME", "DPDP Act", "Backup"],
    authorSlug: "rahul-deshmukh",
    publishedAt: "2026-08-27",
    readingMinutes: 6,
    placeholder: true,
    body: [
      { type: "p", text: "Small businesses are attractive targets precisely because attackers expect weaker defences. The good news: a handful of basic controls stop the vast majority of attacks." },
      { type: "h2", text: "The checklist" },
      { type: "ul", items: [
        "Turn on multi-factor authentication for email, banking and cloud apps",
        "Use a password manager and unique passwords",
        "Keep operating systems and software updated automatically",
        "Install managed endpoint protection on every device",
        "Configure a business-grade firewall",
        "Separate guest Wi-Fi from your business network",
        "Back up using the 3-2-1 rule — and test restores",
        "Set up SPF, DKIM and DMARC on your email domain",
        "Train staff to recognise phishing",
        "Limit admin rights to people who need them",
        "Encrypt laptops and mobile devices",
        "Have a written incident response plan",
      ] },
      { type: "h2", text: "What about the DPDP Act?" },
      { type: "p", text: "India's Digital Personal Data Protection Act requires organisations to implement reasonable security safeguards to protect personal data. The controls above are a strong foundation for compliance." },
      { type: "h2", text: "Get a free security health check" },
      { type: "p", text: "Not sure where you stand? Our team can run a quick assessment and give you a prioritised action list." },
    ],
  },
  {
    slug: "ai-chatbots-for-business-guide",
    title: "AI Chatbots for Business: Use Cases, Costs and How to Get Started",
    excerpt:
      "How modern AI assistants answer customers, qualify leads and automate support — and how to roll one out safely.",
    category: "AI & Automation",
    tags: ["AI", "Chatbots", "WhatsApp", "Automation"],
    authorSlug: "neha-patil",
    publishedAt: "2026-10-08",
    readingMinutes: 8,
    placeholder: true,
    body: [
      { type: "p", text: "Today's AI assistants understand natural language, answer from your own documents and can take actions like booking appointments or creating support tickets. Here's how businesses are using them." },
      { type: "h2", text: "Top use cases" },
      { type: "ul", items: [
        "24/7 customer support on your website and WhatsApp",
        "Lead qualification and appointment booking",
        "Order tracking and returns for e-commerce",
        "Internal knowledge assistants for HR and IT policies",
        "Document processing for invoices and forms",
      ] },
      { type: "h2", text: "How much does it cost?" },
      { type: "p", text: "A focused FAQ and lead-capture assistant typically starts around ₹50,000 to build, plus usage-based AI costs. More advanced agents that integrate with your CRM or ERP cost more but deliver bigger savings." },
      { type: "h2", text: "Rolling out safely" },
      { type: "ul", items: [
        "Ground answers in approved content to reduce errors",
        "Always provide a clear hand-off to a human",
        "Don't collect more personal data than you need",
        "Monitor conversations and improve continuously",
      ] },
      { type: "p", text: "Start with one high-volume use case, measure the impact, then expand. We'd be glad to help you identify the best place to begin." },
    ],
  },
];

export const blogCategories = Array.from(new Set(blogPosts.map((p) => p.category))).map((name) => ({
  name,
  slug: slugify(name),
}));

export const blogTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags))).map((name) => ({
  name,
  slug: slugify(name),
}));

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

export const sortedPosts = () =>
  [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

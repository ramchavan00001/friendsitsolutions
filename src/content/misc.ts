import type { FAQ } from "./types";
import { site } from "./site";

export const generalFaqs: { group: string; items: FAQ[] }[] = [
  {
    group: "Getting started",
    items: [
      { q: "What services does FriendsITSolutions offer?", a: "We're a full-service IT company: software, website and mobile app development, cloud and DevOps, cybersecurity, managed IT and helpdesk, networking, CCTV, hardware and AMC, AI and automation, data analytics, digital marketing, QA, consulting, staff augmentation and corporate training." },
      { q: "How do I get a quote?", a: "Use our Get a Free Quote form, call or WhatsApp us. We'll schedule a short consultation and send a detailed, itemised proposal — usually within 48 hours." },
      { q: "Is the first consultation really free?", a: "Yes. The initial consultation and estimate are completely free with no obligation." },
      { q: "Do you work with small businesses and individuals?", a: "Absolutely. We work with individuals, startups, SMEs, schools, hospitals and large enterprises — and tailor solutions to every budget." },
    ],
  },
  {
    group: "Projects & pricing",
    items: [
      { q: "What engagement models do you offer?", a: "Fixed price for well-defined projects, hourly (time & materials) for evolving scope, dedicated teams for long-term work, and AMC/managed-service plans for ongoing support." },
      { q: "What are your payment terms?", a: "Projects are typically billed in milestones (e.g. 30% advance, 40% mid-way, 30% on delivery). Monthly services are billed in advance. We accept bank transfer, UPI and cards; international clients can pay via wire or PayPal." },
      { q: "Do you sign NDAs?", a: "Yes. We're happy to sign an NDA before you share any confidential details." },
      { q: "How do you keep projects on time?", a: "Agile sprints, a dedicated project manager, weekly progress updates and a shared project board so you always know where things stand." },
    ],
  },
  {
    group: "Support",
    items: [
      { q: "Do you provide 24/7 support?", a: "Yes, for clients on managed-service and premium AMC plans. Standard support is available during business hours." },
      { q: "How do I raise a support ticket?", a: "Use the Support page, email our support address, WhatsApp us or log in to the client portal." },
      { q: "Do you offer on-site support?", a: `Yes — in ${site.city} and surrounding areas, and through partner engineers across major Indian cities.` },
    ],
  },
  {
    group: "Data & security",
    items: [
      { q: "How do you protect my data?", a: "We follow security best practices, sign NDAs, restrict access on a need-to-know basis and comply with India's Digital Personal Data Protection (DPDP) Act, 2023." },
      { q: "Who owns the code and designs you create?", a: "You do. Full intellectual property rights are transferred on final payment." },
    ],
  },
];

export const homeFaqs: FAQ[] = [
  generalFaqs[0].items[0],
  generalFaqs[0].items[1],
  generalFaqs[1].items[0],
  generalFaqs[2].items[0],
  generalFaqs[3].items[1],
  generalFaqs[0].items[3],
];

export const engagementModels = [
  {
    name: "Fixed Price",
    icon: "briefcase",
    bestFor: "Well-defined projects",
    price: "From ₹25,000",
    description: "Agreed scope, timeline and cost upfront. Ideal for websites, MVPs and clearly defined projects.",
    features: ["Fixed budget — no surprises", "Detailed scope & milestones", "Milestone-based payments", "Free warranty period"],
    cta: "Get a fixed quote",
  },
  {
    name: "Hourly / Time & Materials",
    icon: "clock",
    bestFor: "Evolving requirements",
    price: "From ₹1,200/hour",
    description: "Pay only for the hours worked. Great for ongoing enhancements, consulting and changing scope.",
    features: ["Maximum flexibility", "Weekly timesheets", "Start immediately", "Scale effort up or down"],
    cta: "Discuss hourly work",
    featured: false,
  },
  {
    name: "Dedicated Team",
    icon: "users",
    bestFor: "Long-term product work",
    price: "From ₹1,50,000/month",
    description: "Full-time developers, designers and QA working exclusively for you, managed your way.",
    features: ["Vetted, full-time talent", "Your processes and tools", "Free replacement", "Monthly contracts"],
    cta: "Build my team",
    featured: true,
  },
  {
    name: "AMC & Managed IT",
    icon: "shieldCheck",
    bestFor: "Ongoing IT support",
    price: "From ₹799/user/month",
    description: "Annual maintenance and managed services for hardware, networks, servers and software.",
    features: ["SLA-backed response", "Preventive maintenance", "Helpdesk & on-site visits", "Monthly reports"],
    cta: "Get an AMC plan",
  },
] as const;

export const amcPlans = [
  {
    name: "Essential",
    price: "₹1,499",
    unit: "/device/year",
    description: "For small offices and individuals.",
    features: ["2 preventive maintenance visits/year", "Unlimited remote support (business hours)", "Next-business-day on-site response", "Antivirus & OS update checks"],
  },
  {
    name: "Business",
    price: "₹799",
    unit: "/user/month",
    description: "Complete managed IT for growing teams.",
    features: ["Quarterly preventive maintenance", "Helpdesk via phone, email & WhatsApp", "4-hour on-site response", "Patch & endpoint management", "Microsoft 365 / Google Workspace admin", "Monthly IT health report"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "",
    description: "24/7 support for critical infrastructure.",
    features: ["24/7 monitoring & helpdesk", "Dedicated account manager", "2-hour critical on-site response", "Server, network & security management", "Backup & DR management", "Quarterly strategy reviews"],
  },
];

/** Local SEO landing pages. Add more cities or services as needed. */
export const locationPages = [
  {
    slug: `it-company-in-${site.city.toLowerCase()}`,
    title: `IT Company in ${site.city}`,
    headline: `Your friendly, full-service IT company in ${site.city}`,
    intro: `Businesses across ${site.city} trust FriendsITSolutions for software development, websites, managed IT support, networking, CCTV and cybersecurity — with local engineers who can be on-site fast.`,
    serviceSlugs: ["managed-it-services", "custom-software-development", "network-setup-management", "cctv-surveillance", "cybersecurity", "hardware-sales-repair-amc"],
  },
  {
    slug: `website-development-in-${site.city.toLowerCase()}`,
    title: `Website Development in ${site.city}`,
    headline: `Website design & development in ${site.city} that brings you customers`,
    intro: `We help ${site.city} businesses get fast, mobile-friendly, SEO-ready websites and online stores — designed locally, supported locally and built to rank on Google.`,
    serviceSlugs: ["website-design-development", "ecommerce-development", "ui-ux-design", "digital-marketing", "web-hosting-domain-email"],
  },
  {
    slug: `mobile-app-development-in-${site.city.toLowerCase()}`,
    title: `Mobile App Development in ${site.city}`,
    headline: `Android & iOS app development in ${site.city}`,
    intro: `From startup MVPs to enterprise apps, our ${site.city} team designs and builds high-quality Flutter, React Native and native mobile apps.`,
    serviceSlugs: ["mobile-app-development", "ui-ux-design", "saas-product-development", "api-development-integration"],
  },
];

export const mainNav = [
  { key: "services", label: "Services", href: "/services", mega: true },
  { key: "industries", label: "Industries", href: "/industries" },
  { key: "portfolio", label: "Portfolio", href: "/portfolio" },
  { key: "pricing", label: "Pricing", href: "/pricing" },
  { key: "about", label: "About", href: "/about" },
  { key: "blog", label: "Blog", href: "/blog" },
  { key: "careers", label: "Careers", href: "/careers" },
  { key: "contact", label: "Contact", href: "/contact" },
] as const;

export const footerLinks = {
  company: [
    { key: "about", label: "About Us", href: "/about" },
    { key: "portfolio", label: "Portfolio", href: "/portfolio" },
    { key: "testimonials", label: "Testimonials", href: "/testimonials" },
    { key: "careers", label: "Careers", href: "/careers" },
    { key: "blog", label: "Blog", href: "/blog" },
    { key: "contact", label: "Contact", href: "/contact" },
  ],
  resources: [
    { key: "industries", label: "Industries", href: "/industries" },
    { key: "technologies", label: "Technologies", href: "/technologies" },
    { key: "pricing", label: "Pricing", href: "/pricing" },
    { key: "faq", label: "FAQ", href: "/faq" },
    { key: "support", label: "Support Ticket", href: "/support" },
    { key: "portal", label: "Client Portal", href: "/client-portal" },
    { key: "book", label: "Book a Meeting", href: "/book-a-meeting" },
  ],
  legal: [
    { key: "privacy", label: "Privacy Policy", href: "/privacy-policy" },
    { key: "terms", label: "Terms & Conditions", href: "/terms-and-conditions" },
    { key: "refund", label: "Refund Policy", href: "/refund-policy" },
    { key: "cookies", label: "Cookie Policy", href: "/cookie-policy" },
  ],
} as const;

import type { CaseStudy, Testimonial } from "./types";

// PLACEHOLDER CONTENT — replace with real projects and client-approved testimonials.

export const caseStudies: CaseStudy[] = [
  {
    slug: "medicare-hospital-platform",
    title: "Digitising patient care for a 250-bed multi-speciality hospital",
    client: "MediCare Multispeciality Hospital (placeholder)",
    industry: "Healthcare",
    services: ["custom-software-development", "mobile-app-development", "cloud-services", "data-backup-disaster-recovery"],
    summary:
      "A unified hospital management system, patient app and secure cloud infrastructure that cut OPD waiting times by 45%.",
    challenge:
      "The hospital ran on a mix of paper files, a decade-old desktop billing tool and spreadsheets. Patients waited over an hour at OPD, doctors couldn't see previous records, and there was no reliable backup of medical data.",
    solution:
      "We built a cloud-based hospital management system covering registration, appointments, EMR, pharmacy, lab and billing; a patient app for booking and reports; and migrated everything to a secure, backed-up AWS environment aligned with DPDP requirements.",
    results: [
      { metric: "45%", label: "Reduction in OPD waiting time" },
      { metric: "100%", label: "Patient records digitised" },
      { metric: "30K+", label: "Patient app downloads" },
      { metric: "99.95%", label: "System uptime" },
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Flutter", "AWS", "Veeam"],
    duration: "7 months",
    testimonialId: "t1",
    placeholder: true,
  },
  {
    slug: "shopkart-ecommerce-growth",
    title: "Taking a regional retailer online — 3x revenue in 12 months",
    client: "ShopKart Lifestyle (placeholder)",
    industry: "Retail",
    services: ["ecommerce-development", "ui-ux-design", "digital-marketing", "ai-automation"],
    summary:
      "A headless Shopify store, WhatsApp AI assistant and performance marketing program that tripled online revenue.",
    challenge:
      "A popular 12-store fashion retailer had a slow WooCommerce site with a 78% cart-abandonment rate, no inventory sync with stores and almost no organic traffic.",
    solution:
      "We redesigned the shopping experience, rebuilt the store on Shopify with a Next.js storefront, synced inventory with their POS, launched a WhatsApp AI shopping assistant and ran SEO plus Google and Meta Ads campaigns.",
    results: [
      { metric: "3.1x", label: "Online revenue growth" },
      { metric: "-38%", label: "Cart abandonment" },
      { metric: "+210%", label: "Organic traffic" },
      { metric: "1.2s", label: "Average page load" },
    ],
    technologies: ["Shopify", "Next.js", "Razorpay", "Claude", "GA4", "Google Ads"],
    duration: "4 months build + ongoing growth",
    testimonialId: "t2",
    placeholder: true,
  },
  {
    slug: "edubright-campus-it",
    title: "Secure, connected campus for a 3,000-student school group",
    client: "EduBright International Schools (placeholder)",
    industry: "Education",
    services: ["network-setup-management", "cctv-surveillance", "managed-it-services", "web-hosting-domain-email"],
    summary:
      "Campus-wide Wi-Fi, 180-camera surveillance, Google Workspace for Education and managed IT support across three campuses.",
    challenge:
      "Three campuses had patchy Wi-Fi, ageing analogue CCTV with blind spots, staff using personal email addresses and no structured IT support.",
    solution:
      "We designed a segmented campus network with enterprise Wi-Fi, installed 180 IP cameras with central monitoring, rolled out Google Workspace for Education to 3,400 users and now provide on-site and remote managed IT under an annual contract.",
    results: [
      { metric: "180", label: "IP cameras with zero blind spots" },
      { metric: "3,400", label: "Users on Google Workspace" },
      { metric: "< 1 hr", label: "Average ticket resolution" },
      { metric: "40%", label: "Lower annual IT spend" },
    ],
    technologies: ["Aruba", "Fortinet", "Hikvision", "Google Workspace", "NinjaOne"],
    duration: "10 weeks + AMC",
    testimonialId: "t4",
    placeholder: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Dr. Ananya Kulkarni",
    role: "Medical Director",
    company: "MediCare Multispeciality Hospital",
    quote:
      "FriendsITSolutions understood hospital workflows better than any vendor we had spoken to. Our OPD runs smoothly, records are always available, and their support team responds within minutes.",
    rating: 5,
    service: "Custom Software Development",
    placeholder: true,
  },
  {
    id: "t2",
    name: "Rohit Mehta",
    role: "Founder",
    company: "ShopKart Lifestyle",
    quote:
      "Our new store is fast, beautiful and our online revenue has tripled. They feel like an extension of our team — honest advice, clear reports and they always deliver on time.",
    rating: 5,
    service: "E-commerce Development",
    placeholder: true,
  },
  {
    id: "t3",
    name: "Sarah Thompson",
    role: "CTO",
    company: "LearnLoop (UK)",
    quote:
      "We hired two dedicated developers and a QA engineer through FriendsITSolutions. Communication across time zones is seamless and the quality of work is excellent.",
    rating: 5,
    service: "IT Staff Augmentation",
    placeholder: true,
  },
  {
    id: "t4",
    name: "Fr. Joseph D'Souza",
    role: "Principal",
    company: "EduBright International Schools",
    quote:
      "The campus Wi-Fi and CCTV upgrade was completed during the summer break without disrupting anything. Teachers and parents have noticed the difference.",
    rating: 5,
    service: "Network Setup & CCTV",
    placeholder: true,
  },
  {
    id: "t5",
    name: "Vikram Iyer",
    role: "Managing Director",
    company: "Iyer Precision Components",
    quote:
      "The Odoo ERP and Power BI dashboards gave us real-time visibility into production and cash flow for the first time in 20 years of business.",
    rating: 5,
    service: "ERP & Data Analytics",
    placeholder: true,
  },
  {
    id: "t6",
    name: "Priya Nair",
    role: "Office Manager",
    company: "Nair & Associates, Chartered Accountants",
    quote:
      "From laptops to printers to email, they handle everything. One call and it's sorted — friendly people who actually pick up the phone.",
    rating: 5,
    service: "Hardware & AMC",
    placeholder: true,
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
export const getTestimonial = (id: string) => testimonials.find((t) => t.id === id);

/** REPLACE with real client logos (SVG/PNG in /public/clients). */
export const clientLogos = [
  "MediCare",
  "ShopKart",
  "EduBright",
  "Iyer Precision",
  "LearnLoop",
  "GreenLeaf Realty",
  "SwiftMove Logistics",
  "Nair & Associates",
  "UrbanStay Hotels",
  "FinEdge Capital",
];

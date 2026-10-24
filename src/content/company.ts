import type { Feature, Industry, Job, Step, TeamMember } from "./types";
import type { IconName } from "@/components/icon";

// PLACEHOLDER team — replace names, bios and add photos in /public/team/<slug>.webp
export const team: TeamMember[] = [
  {
    slug: "arjun-sharma",
    name: "Arjun Sharma",
    role: "Founder & CEO",
    bio: "15+ years building software and IT teams. Started FriendsITSolutions to give businesses a technology partner they can genuinely trust.",
    expertise: ["Strategy", "Enterprise Software", "Client Success"],
    linkedin: "https://www.linkedin.com/",
    placeholder: true,
  },
  {
    slug: "neha-patil",
    name: "Neha Patil",
    role: "Head of Engineering",
    bio: "Full-stack architect who has shipped SaaS products, mobile apps and large-scale cloud platforms for clients on four continents.",
    expertise: ["Architecture", "Cloud", "DevOps"],
    linkedin: "https://www.linkedin.com/",
    placeholder: true,
  },
  {
    slug: "rahul-deshmukh",
    name: "Rahul Deshmukh",
    role: "Head of Infrastructure & Security",
    bio: "Certified network and security engineer leading our managed IT, cybersecurity and on-site infrastructure teams.",
    expertise: ["Cybersecurity", "Networking", "Managed IT"],
    linkedin: "https://www.linkedin.com/",
    placeholder: true,
  },
  {
    slug: "sneha-joshi",
    name: "Sneha Joshi",
    role: "Design Lead",
    bio: "Product designer obsessed with making complex software simple and delightful for everyday users.",
    expertise: ["UI/UX", "Design Systems", "Research"],
    linkedin: "https://www.linkedin.com/",
    placeholder: true,
  },
  {
    slug: "karan-verma",
    name: "Karan Verma",
    role: "Growth & Marketing Lead",
    bio: "Performance marketer and SEO specialist helping clients turn websites into reliable lead-generation engines.",
    expertise: ["SEO", "Paid Ads", "Analytics"],
    linkedin: "https://www.linkedin.com/",
    placeholder: true,
  },
];

export const values: { title: string; description: string; icon: IconName }[] = [
  { title: "Friendship first", description: "We treat every client like a long-term friend: honest, approachable and always in your corner.", icon: "users" },
  { title: "Reliability", description: "We do what we say, when we say. Deadlines and SLAs are promises, not targets.", icon: "shieldCheck" },
  { title: "Transparency", description: "Clear pricing, open communication and no hidden surprises.", icon: "chat" },
  { title: "Craftsmanship", description: "Clean code, tidy cabling, thoughtful design — quality in every detail.", icon: "sparkles" },
  { title: "Continuous learning", description: "Technology moves fast. So do we, with certifications and constant upskilling.", icon: "graduation" },
  { title: "Customer outcomes", description: "We measure success by your results, not by hours billed.", icon: "rocket" },
];

// REPLACE with your real milestones
export const timeline: { year: string; title: string; description: string }[] = [
  { year: "2016", title: "Founded", description: "Started as a three-person IT support and web studio." },
  { year: "2018", title: "Software division", description: "Launched custom software and mobile app development." },
  { year: "2020", title: "Cloud & remote work", description: "Helped 80+ businesses move to the cloud during the pandemic." },
  { year: "2022", title: "Security practice", description: "Built a certified cybersecurity and VAPT team." },
  { year: "2024", title: "Global clients", description: "Serving clients across 12 countries." },
  { year: "2025", title: "AI & automation", description: "Launched AI agents, chatbots and automation services." },
];

// REPLACE with certifications you actually hold
export const certifications = [
  "ISO 9001:2015 (placeholder)",
  "ISO/IEC 27001 (placeholder)",
  "AWS Partner",
  "Microsoft Partner",
  "Google Workspace Partner",
  "MSME / Udyam Registered",
];

export const whyChooseUs: Feature[] = [
  { title: "Expert team", description: "Certified engineers, designers and consultants with years of hands-on experience." },
  { title: "Affordable pricing", description: "Enterprise-grade quality at prices that make sense for startups and SMEs." },
  { title: "24/7 support", description: "Round-the-clock help for critical systems — a real person, not a bot." },
  { title: "On-time delivery", description: "Agile milestones and weekly updates keep every project on schedule." },
  { title: "Transparent communication", description: "A dedicated manager, clear reports and no jargon." },
  { title: "Post-launch support", description: "Free warranty period plus flexible maintenance plans." },
];
export const whyChooseUsIcons: IconName[] = ["users", "coins", "headphones", "clock", "chat", "rocket"];

export const homeProcess: Step[] = [
  { title: "Discover", description: "Understand your goals" },
  { title: "Plan", description: "Scope & estimate" },
  { title: "Design", description: "Prototype & approve" },
  { title: "Develop", description: "Agile sprints" },
  { title: "Test", description: "Rigorous QA" },
  { title: "Launch", description: "Go live smoothly" },
  { title: "Support", description: "Grow together" },
];

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: "heart",
    description: "Hospital management systems, telemedicine apps and secure, compliant infrastructure for clinics, labs and hospitals.",
    solutions: ["Hospital & clinic management software", "Patient apps & telemedicine", "Secure medical data backup", "CCTV & network for hospitals"],
  },
  {
    slug: "education",
    name: "Education",
    icon: "graduation",
    description: "School ERPs, LMS platforms, campus Wi-Fi, CCTV and Google Workspace for Education.",
    solutions: ["School ERP & LMS", "Campus networks & Wi-Fi", "Smart classroom setup", "Google Workspace / Microsoft 365 for Education"],
  },
  {
    slug: "retail",
    name: "Retail & E-commerce",
    icon: "bag",
    description: "Online stores, POS integrations, inventory management and digital marketing for retailers and D2C brands.",
    solutions: ["E-commerce stores", "POS & inventory sync", "WhatsApp commerce", "Performance marketing"],
  },
  {
    slug: "finance",
    name: "Finance & Fintech",
    icon: "wallet",
    description: "Secure fintech apps, CA and accounting firm IT, compliance-ready infrastructure and VAPT.",
    solutions: ["Fintech app development", "VAPT & compliance", "Secure document management", "Managed IT for CA firms"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    icon: "factory",
    description: "ERP, production tracking, IoT dashboards and plant networks for manufacturers.",
    solutions: ["Odoo/custom ERP", "Production & quality dashboards", "Plant networking & CCTV", "Inventory & supply chain"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    icon: "home",
    description: "Property portals, CRM, virtual tours and lead-generation campaigns for builders and brokers.",
    solutions: ["Property listing portals", "Real estate CRM", "Lead-gen campaigns", "Site CCTV & access control"],
  },
  {
    slug: "logistics",
    name: "Logistics",
    icon: "truck",
    description: "Fleet tracking, warehouse management and route optimisation software.",
    solutions: ["Fleet & shipment tracking", "Warehouse management", "Driver apps", "API integrations with couriers"],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    icon: "hotel",
    description: "Booking engines, guest Wi-Fi, PMS integrations and digital marketing for hotels and restaurants.",
    solutions: ["Booking engines & websites", "Guest Wi-Fi & networks", "PMS/POS integrations", "Reputation & social marketing"],
  },
  {
    slug: "startups",
    name: "Startups",
    icon: "rocket",
    description: "MVPs, SaaS platforms and dedicated teams that help founders launch and scale quickly.",
    solutions: ["MVP development", "SaaS platforms", "Dedicated developers", "Cloud credits & setup"],
  },
];

export const technologies: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "Python", "Django", ".NET", "Java Spring", "PHP Laravel", "Go"] },
  { group: "Mobile", items: ["Flutter", "React Native", "Kotlin", "Swift"] },
  { group: "CMS & E-commerce", items: ["WordPress", "Shopify", "WooCommerce", "Sanity", "Strapi", "Webflow"] },
  { group: "Cloud & DevOps", items: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "GitHub Actions"] },
  { group: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase", "Firebase"] },
  { group: "AI & Data", items: ["Claude", "OpenAI", "LangChain", "Power BI", "Tableau", "BigQuery"] },
  { group: "Business Apps", items: ["Odoo", "Zoho", "Salesforce", "HubSpot", "Microsoft 365", "Google Workspace"] },
  { group: "Infrastructure & Security", items: ["Cisco", "Fortinet", "Sophos", "Aruba", "Hikvision", "Veeam"] },
];

export const jobs: Job[] = [
  {
    slug: "senior-full-stack-developer",
    title: "Senior Full-Stack Developer (React / Node.js)",
    department: "Engineering",
    location: "Hybrid",
    type: "Full-time",
    experience: "4–7 years",
    summary: "Lead the development of web platforms and SaaS products for clients in India and abroad.",
    responsibilities: [
      "Design and build scalable web applications with React, Next.js and Node.js",
      "Own features end-to-end — from technical design to deployment",
      "Review code and mentor junior developers",
      "Collaborate directly with clients and designers",
    ],
    requirements: [
      "4+ years of professional full-stack experience",
      "Strong TypeScript, React and Node.js skills",
      "Experience with PostgreSQL and REST/GraphQL APIs",
      "Good written and spoken English",
    ],
    niceToHave: ["AWS or Azure experience", "Experience with Next.js App Router", "Open-source contributions"],
    postedAt: "2026-10-01",
  },
  {
    slug: "flutter-developer",
    title: "Flutter Developer",
    department: "Engineering",
    location: "On-site",
    type: "Full-time",
    experience: "2–4 years",
    summary: "Build beautiful cross-platform mobile apps for healthcare, retail and startup clients.",
    responsibilities: [
      "Develop and maintain Flutter apps for Android and iOS",
      "Integrate REST APIs, Firebase and third-party SDKs",
      "Publish apps to the Play Store and App Store",
      "Write clean, testable code",
    ],
    requirements: ["2+ years of Flutter/Dart", "At least two published apps", "State management (Riverpod/Bloc)"],
    niceToHave: ["Native Android/iOS experience", "CI/CD for mobile"],
    postedAt: "2026-09-20",
  },
  {
    slug: "network-security-engineer",
    title: "Network & Security Engineer",
    department: "Infrastructure",
    location: "On-site",
    type: "Full-time",
    experience: "3–5 years",
    summary: "Design, deploy and support networks, firewalls and security solutions for our clients.",
    responsibilities: [
      "Install and configure switches, firewalls and wireless networks",
      "Perform vulnerability assessments and hardening",
      "Provide L2/L3 support to managed-service clients",
      "Document network designs and changes",
    ],
    requirements: ["CCNA or equivalent", "Hands-on Fortinet/Sophos firewall experience", "Willingness to travel to client sites"],
    niceToHave: ["CEH / Security+", "Cloud networking (AWS/Azure)"],
    postedAt: "2026-09-12",
  },
  {
    slug: "digital-marketing-executive",
    title: "Digital Marketing Executive (SEO & Ads)",
    department: "Marketing",
    location: "Remote (India)",
    type: "Full-time",
    experience: "1–3 years",
    summary: "Plan and run SEO, Google Ads and social campaigns that deliver leads for our clients.",
    responsibilities: [
      "Execute on-page and off-page SEO",
      "Manage Google and Meta Ads campaigns",
      "Prepare monthly performance reports",
      "Coordinate with content and design teams",
    ],
    requirements: ["1+ year in SEO/PPC", "Google Ads and GA4 knowledge", "Strong analytical skills"],
    niceToHave: ["Google Ads certification", "Experience with SEMrush/Ahrefs"],
    postedAt: "2026-10-10",
  },
];

export const perks: { title: string; description: string; icon: IconName }[] = [
  { title: "Learning budget", description: "Paid certifications, courses and conference tickets.", icon: "graduation" },
  { title: "Flexible work", description: "Hybrid options and flexible hours.", icon: "clock" },
  { title: "Health insurance", description: "Medical cover for you and your family.", icon: "heart" },
  { title: "Friendly culture", description: "No egos, lots of mentoring and team outings.", icon: "users" },
  { title: "Real impact", description: "Work on products used by thousands.", icon: "rocket" },
  { title: "Modern stack", description: "Latest tools, good laptops and AI assistants.", icon: "laptop" },
];

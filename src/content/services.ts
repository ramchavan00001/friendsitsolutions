import type { FAQ, Service, ServiceCategory, Step } from "./types";

export const serviceCategories: Record<
  ServiceCategory,
  { label: string; description: string; process: Step[] }
> = {
  development: {
    label: "Software & Development",
    description: "Websites, apps and custom software built around how your business actually works.",
    process: [
      { title: "Discover", description: "Workshops to understand your goals, users and constraints." },
      { title: "Plan", description: "Scope, milestones, architecture and a fixed or flexible estimate." },
      { title: "Design", description: "Wireframes and clickable prototypes you approve before we code." },
      { title: "Develop", description: "Agile sprints with demos every two weeks." },
      { title: "Test", description: "Manual and automated QA across devices and browsers." },
      { title: "Launch", description: "Zero-downtime deployment, training and handover." },
      { title: "Support", description: "Warranty period, then optional maintenance and growth plans." },
    ],
  },
  cloud: {
    label: "Cloud & Infrastructure",
    description: "Reliable, secure and cost-efficient infrastructure that scales with you.",
    process: [
      { title: "Assess", description: "Audit current infrastructure, workloads, costs and risks." },
      { title: "Design", description: "Target architecture with security, backup and cost guardrails." },
      { title: "Migrate / Build", description: "Phased rollout with rollback plans and minimal downtime." },
      { title: "Optimise", description: "Right-sizing, autoscaling and reserved-capacity savings." },
      { title: "Monitor & Support", description: "24/7 monitoring, alerting, patching and monthly reports." },
    ],
  },
  security: {
    label: "Security & Support",
    description: "Keep your people productive and your systems protected — on-site and remote.",
    process: [
      { title: "Site Survey / Audit", description: "We inspect your environment and document every gap." },
      { title: "Proposal", description: "A clear plan with hardware, software and service costs." },
      { title: "Implementation", description: "Certified engineers install and configure with minimal disruption." },
      { title: "Handover & Training", description: "Documentation and hands-on training for your staff." },
      { title: "Ongoing Support", description: "SLA-backed helpdesk, preventive maintenance and AMC." },
    ],
  },
  growth: {
    label: "Data, AI & Growth",
    description: "Turn data, automation and marketing into measurable business growth.",
    process: [
      { title: "Discover", description: "Understand goals, KPIs, data sources and current performance." },
      { title: "Strategy", description: "A roadmap with quick wins and long-term initiatives." },
      { title: "Build & Execute", description: "Implement models, dashboards, campaigns or programs." },
      { title: "Measure", description: "Track results against agreed KPIs with transparent reporting." },
      { title: "Improve", description: "Iterate every month based on data, not guesswork." },
    ],
  },
};

/** FAQs appended to every service page (service name is substituted in). */
export const sharedServiceFaqs = (title: string): FAQ[] => [
  {
    q: `How much does ${title} cost?`,
    a: "Pricing depends on scope, complexity and timelines. We share a transparent, itemised estimate after a free consultation — with fixed-price, hourly and dedicated-team options.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. We serve clients across India, the Middle East, Europe, the UK, the US and Australia, with overlapping working hours and English-speaking project managers.",
  },
  {
    q: "Will I get support after the project is complete?",
    a: "Every engagement includes a free warranty period. After that you can choose a flexible maintenance plan or an Annual Maintenance Contract (AMC) with SLA-backed response times.",
  },
];

export const services: Service[] = [
  // ───────────────────────── Software & Development ─────────────────────────
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    category: "development",
    icon: "code",
    summary: "Tailor-made software that automates your workflows and scales with your business.",
    metaTitle: "Custom Software Development Company in India",
    metaDescription:
      "Bespoke business software, portals and internal tools built by FriendsITSolutions. Agile delivery, transparent pricing and long-term support.",
    heroHeadline: "Software built around your business — not the other way round",
    heroSubheadline:
      "From internal tools to customer portals, we design and build secure, scalable software that removes manual work and gives you a competitive edge.",
    problems: [
      "Off-the-shelf tools don't fit your processes, so your team relies on spreadsheets and workarounds.",
      "Data is scattered across systems, making reporting slow and error-prone.",
      "Legacy software is expensive to maintain and impossible to extend.",
    ],
    solution:
      "We map your workflows, then build software that fits them precisely — integrated with the tools you already use, with clean code you fully own.",
    features: [
      { title: "Business process automation", description: "Replace repetitive manual steps with reliable workflows." },
      { title: "Web portals & dashboards", description: "Role-based portals for staff, customers, vendors and partners." },
      { title: "Legacy modernisation", description: "Re-platform old systems without losing data or history." },
      { title: "Third-party integrations", description: "Connect payment gateways, ERPs, CRMs, SMS and email." },
      { title: "Cloud-native architecture", description: "Scalable, secure deployments on AWS, Azure or GCP." },
      { title: "Full source-code ownership", description: "Your IP, your repository, documented and handed over." },
    ],
    technologies: ["React", "Next.js", "Node.js", ".NET", "Python", "PostgreSQL", "AWS", "Docker"],
    benefits: [
      { title: "Save hours every week", description: "Automation typically cuts manual effort by 30–60%." },
      { title: "Scale without friction", description: "Architecture designed for 10x growth from day one." },
      { title: "Better decisions", description: "Real-time reports from a single source of truth." },
      { title: "Lower long-term cost", description: "No per-seat licence fees for software you own." },
    ],
    startingPrice: "₹1,50,000",
    caseStudySlug: "medicare-hospital-platform",
    testimonialId: "t1",
    faqs: [
      { q: "How long does a custom software project take?", a: "A focused MVP usually takes 8–12 weeks. Larger platforms are delivered in phases so you start getting value early." },
      { q: "Who owns the source code?", a: "You do. On final payment we transfer full IP rights, repositories and documentation." },
      { q: "Can you take over an existing project from another vendor?", a: "Yes. We start with a code and architecture audit, then stabilise and extend the system." },
    ],
  },
  {
    slug: "website-design-development",
    title: "Website Design & Development",
    category: "development",
    icon: "globe",
    summary: "Fast, beautiful, SEO-ready websites — corporate sites, landing pages, WordPress and Shopify.",
    metaTitle: "Website Design & Development Company",
    metaDescription:
      "Professional website design and development — corporate websites, landing pages, WordPress and Shopify. Mobile-first, SEO-ready and fast.",
    heroHeadline: "Websites that look great and bring in business",
    heroSubheadline:
      "We design and build fast, mobile-first websites that rank on Google, build trust and turn visitors into enquiries.",
    problems: [
      "Your current website looks outdated and doesn't reflect the quality of your business.",
      "It loads slowly, breaks on mobile and doesn't show up on Google.",
      "Visitors leave without contacting you because the next step isn't clear.",
    ],
    solution:
      "We combine conversion-focused design, clean code and on-page SEO to deliver a website that works as your best salesperson — and that your team can update easily.",
    features: [
      { title: "Corporate & business websites", description: "Professional multi-page sites that build credibility." },
      { title: "High-converting landing pages", description: "Campaign pages optimised for leads and ad spend." },
      { title: "WordPress development", description: "Custom themes, plugins and easy content editing." },
      { title: "Shopify stores", description: "Themes, apps and integrations for online selling." },
      { title: "SEO & performance", description: "Core Web Vitals, schema markup and technical SEO built in." },
      { title: "Easy content management", description: "Update text, images and blog posts without a developer." },
    ],
    technologies: ["Next.js", "WordPress", "Shopify", "Webflow", "Tailwind CSS", "Figma", "Vercel"],
    benefits: [
      { title: "More enquiries", description: "Clear calls-to-action and trust signals on every page." },
      { title: "Found on Google", description: "SEO-ready structure and lightning-fast load times." },
      { title: "Perfect on every device", description: "Mobile-first layouts tested on real devices." },
      { title: "You stay in control", description: "Simple CMS training included with every launch." },
    ],
    startingPrice: "₹25,000",
    caseStudySlug: "shopkart-ecommerce-growth",
    testimonialId: "t2",
    faqs: [
      { q: "How long does it take to build a website?", a: "A 5–10 page business website typically takes 2–4 weeks from content sign-off. Landing pages can be live in under a week." },
      { q: "Do you provide content and images?", a: "Yes. Our copywriters and designers can create content, source licensed images and produce custom graphics." },
      { q: "Will my website be mobile-friendly and SEO-ready?", a: "Always. Every site is responsive, passes Core Web Vitals and includes on-page SEO, sitemaps and schema markup." },
    ],
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    category: "development",
    icon: "cart",
    summary: "Online stores that sell — Shopify, WooCommerce and custom headless commerce.",
    metaTitle: "E-commerce Website Development Services",
    metaDescription:
      "Shopify, WooCommerce and custom e-commerce development with payment gateways, inventory sync and conversion optimisation.",
    heroHeadline: "Launch an online store that sells around the clock",
    heroSubheadline:
      "From your first product to thousands of SKUs, we build e-commerce experiences that convert browsers into loyal customers.",
    problems: [
      "Your store has high cart abandonment and low conversion rates.",
      "Inventory, orders and shipping are managed manually across multiple tools.",
      "The site slows down during sales and festive peaks.",
    ],
    solution:
      "We build fast, secure storefronts with smooth checkout, integrated payments, inventory and logistics — plus analytics so you know exactly what's working.",
    features: [
      { title: "Shopify & WooCommerce stores", description: "Custom themes, apps and plugins tailored to your brand." },
      { title: "Headless commerce", description: "Blazing-fast Next.js storefronts for high-growth brands." },
      { title: "Payment gateways", description: "Razorpay, PayU, Stripe, PayPal, UPI and COD." },
      { title: "Inventory & ERP sync", description: "Real-time stock across warehouses and marketplaces." },
      { title: "Shipping integrations", description: "Shiprocket, Delhivery and courier APIs with tracking." },
      { title: "Conversion optimisation", description: "A/B tests, abandoned-cart flows and upsells." },
    ],
    technologies: ["Shopify", "WooCommerce", "Next.js", "Medusa", "Razorpay", "Stripe", "Algolia"],
    benefits: [
      { title: "Higher conversion", description: "Streamlined checkout and trust-building UX." },
      { title: "Less manual work", description: "Orders, stock and shipping fully automated." },
      { title: "Ready for peak sales", description: "Infrastructure that handles traffic spikes." },
      { title: "Sell everywhere", description: "Marketplace, social and WhatsApp commerce integrations." },
    ],
    startingPrice: "₹60,000",
    caseStudySlug: "shopkart-ecommerce-growth",
    testimonialId: "t2",
    faqs: [
      { q: "Shopify or WooCommerce — which is right for me?", a: "Shopify is ideal for fast launches and low maintenance; WooCommerce offers more flexibility and lower recurring fees. We recommend based on your catalogue, budget and growth plans." },
      { q: "Can you migrate my existing store?", a: "Yes. We migrate products, customers, orders and SEO URLs with redirects so you don't lose rankings." },
      { q: "Do you integrate with Amazon and Flipkart?", a: "Yes, we can sync products, inventory and orders with major marketplaces." },
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    category: "development",
    icon: "phone",
    summary: "Native and cross-platform apps for Android and iOS using Flutter and React Native.",
    metaTitle: "Mobile App Development Company — Android, iOS, Flutter",
    metaDescription:
      "Android, iOS, Flutter and React Native app development. From idea to App Store launch with UI/UX, backend APIs and ongoing support.",
    heroHeadline: "Apps your customers will love to use every day",
    heroSubheadline:
      "We design, build and launch high-performance Android and iOS apps — from MVPs for startups to enterprise apps used by thousands.",
    problems: [
      "You have a great app idea but no in-house team to build it.",
      "Your existing app is slow, crashes often and has poor reviews.",
      "Maintaining separate Android and iOS codebases is too expensive.",
    ],
    solution:
      "Our mobile team builds polished cross-platform or native apps with secure backends, analytics and push notifications — and handles store submission for you.",
    features: [
      { title: "Android & iOS apps", description: "Native Kotlin and Swift when performance is critical." },
      { title: "Cross-platform apps", description: "Flutter and React Native — one codebase, both stores." },
      { title: "App UI/UX design", description: "Intuitive, platform-appropriate interfaces." },
      { title: "Backend & APIs", description: "Scalable cloud backends, auth and admin panels." },
      { title: "Push notifications & analytics", description: "Firebase, OneSignal, Mixpanel and more." },
      { title: "App Store launch", description: "Store listings, ASO and submission handled end-to-end." },
    ],
    technologies: ["Flutter", "React Native", "Kotlin", "Swift", "Firebase", "Node.js", "Supabase"],
    benefits: [
      { title: "Faster time to market", description: "MVPs in as little as 8 weeks." },
      { title: "Lower cost", description: "Cross-platform saves up to 40% versus two native apps." },
      { title: "5-star experience", description: "Smooth performance and thoughtful design." },
      { title: "Grows with you", description: "Modular architecture for new features." },
    ],
    startingPrice: "₹1,20,000",
    caseStudySlug: "medicare-hospital-platform",
    testimonialId: "t3",
    faqs: [
      { q: "Should I build native or cross-platform?", a: "For most business apps, Flutter or React Native deliver near-native performance at lower cost. We recommend native for heavy graphics, AR or deep hardware access." },
      { q: "Do you publish the app on Google Play and the App Store?", a: "Yes. We prepare listings, screenshots and privacy details, and manage submission and review." },
      { q: "Can you sign an NDA before I share my idea?", a: "Absolutely. We are happy to sign an NDA before any detailed discussion." },
    ],
  },
  {
    slug: "saas-product-development",
    title: "SaaS Product Development",
    category: "development",
    icon: "layers",
    summary: "Multi-tenant SaaS platforms with subscriptions, billing and analytics — from MVP to scale.",
    metaTitle: "SaaS Product Development Services",
    metaDescription:
      "Build and scale your SaaS product with FriendsITSolutions — multi-tenant architecture, subscription billing, onboarding and analytics.",
    heroHeadline: "Turn your SaaS idea into a product customers pay for",
    heroSubheadline:
      "We partner with founders and product teams to validate, build and scale SaaS products with solid foundations.",
    problems: [
      "You need to launch quickly to validate the idea before funding runs out.",
      "Your MVP was built fast and now can't handle growing customers.",
      "Billing, permissions and multi-tenancy are eating your roadmap.",
    ],
    solution:
      "We bring a proven SaaS starter architecture — auth, tenancy, billing, roles and analytics — so your team focuses on features that differentiate you.",
    features: [
      { title: "MVP development", description: "Lean scope, fast iterations, real-user feedback." },
      { title: "Multi-tenant architecture", description: "Secure data isolation and per-tenant configuration." },
      { title: "Subscriptions & billing", description: "Stripe, Razorpay, trials, plans and invoicing." },
      { title: "Onboarding & analytics", description: "Product analytics and in-app guides to reduce churn." },
      { title: "APIs & integrations", description: "Public APIs, webhooks and a marketplace-ready platform." },
      { title: "Scale & reliability", description: "Observability, autoscaling and SOC2-friendly practices." },
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "AWS", "Kubernetes"],
    benefits: [
      { title: "Launch sooner", description: "Reusable foundations save months of build time." },
      { title: "Investor-ready", description: "Clean architecture and documentation for due diligence." },
      { title: "Lower churn", description: "Product analytics guide what to build next." },
      { title: "Built to scale", description: "From 10 to 10,000 tenants without a rewrite." },
    ],
    startingPrice: "₹3,00,000",
    caseStudySlug: "medicare-hospital-platform",
    testimonialId: "t3",
    faqs: [
      { q: "Can you work with our in-house team?", a: "Yes. We often work as an extension of the founding team, sharing standups, tools and code reviews." },
      { q: "Do you help with product strategy?", a: "Yes. We run discovery workshops to define personas, MVP scope, pricing and success metrics." },
      { q: "Which cloud do you recommend for SaaS?", a: "AWS is our default for flexibility; Vercel + Supabase works well for early-stage products. We choose based on scale, compliance and budget." },
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    category: "development",
    icon: "pen",
    summary: "Research-led, beautiful interfaces that are easy to use and convert better.",
    metaTitle: "UI/UX Design Services — Web & Mobile",
    metaDescription:
      "User research, wireframes, prototypes and design systems for websites, SaaS and mobile apps. Designs that are beautiful and easy to use.",
    heroHeadline: "Design that makes your product a joy to use",
    heroSubheadline:
      "We blend user research, clear information architecture and modern visual design to create products people understand instantly.",
    problems: [
      "Users get confused and abandon key flows like sign-up or checkout.",
      "Your product looks inconsistent because there's no design system.",
      "Developers keep guessing because designs are incomplete.",
    ],
    solution:
      "Our designers work from real user insight to produce tested prototypes and developer-ready design systems in Figma.",
    features: [
      { title: "User research & personas", description: "Interviews, surveys and analytics review." },
      { title: "Wireframes & user flows", description: "Map every journey before visual design." },
      { title: "Interactive prototypes", description: "Click-through Figma prototypes for testing." },
      { title: "Visual & brand design", description: "Modern, on-brand interfaces that build trust." },
      { title: "Design systems", description: "Reusable components, tokens and documentation." },
      { title: "Usability testing", description: "Validate designs with real users before build." },
    ],
    technologies: ["Figma", "FigJam", "Adobe XD", "Maze", "Hotjar", "Storybook"],
    benefits: [
      { title: "Higher conversion", description: "Remove friction from your most important flows." },
      { title: "Faster development", description: "Clear specs reduce rework and guesswork." },
      { title: "Consistent brand", description: "A design system keeps every screen aligned." },
      { title: "Happier users", description: "Better reviews, retention and referrals." },
    ],
    startingPrice: "₹40,000",
    caseStudySlug: "shopkart-ecommerce-growth",
    testimonialId: "t2",
    faqs: [
      { q: "Do you only design or also develop?", a: "Both. You can hire us for design only, or for end-to-end design and development." },
      { q: "What will I receive at the end?", a: "Figma files, a component library, a clickable prototype and developer hand-off specs." },
      { q: "Can you redesign an existing product?", a: "Yes. We start with a UX audit to find quick wins, then plan a phased redesign." },
    ],
  },
  {
    slug: "api-development-integration",
    title: "API Development & Integration",
    category: "development",
    icon: "plug",
    summary: "Secure REST and GraphQL APIs and integrations that connect all your systems.",
    metaTitle: "API Development & Integration Services",
    metaDescription:
      "REST and GraphQL API development, third-party integrations, payment gateways and middleware that connect your business systems.",
    heroHeadline: "Connect every system your business relies on",
    heroSubheadline:
      "We build secure, well-documented APIs and integrations so data flows automatically between your apps, partners and customers.",
    problems: [
      "Staff re-enter the same data into multiple systems every day.",
      "Partners and customers need access to your data but you have no API.",
      "Existing integrations break silently and nobody notices for days.",
    ],
    solution:
      "We design robust APIs with authentication, rate limiting, monitoring and documentation — and build integrations with retries and alerting so nothing gets lost.",
    features: [
      { title: "REST & GraphQL APIs", description: "Versioned, documented and secure by default." },
      { title: "Third-party integrations", description: "Payments, SMS, email, logistics, accounting and more." },
      { title: "Middleware & iPaaS", description: "Zapier, Make, n8n or custom integration layers." },
      { title: "Webhooks & real-time sync", description: "Event-driven updates across systems." },
      { title: "API security", description: "OAuth2, JWT, API keys, rate limits and audit logs." },
      { title: "Monitoring & alerting", description: "Know immediately when an integration fails." },
    ],
    technologies: ["Node.js", "Python", "GraphQL", "OpenAPI", "Postman", "n8n", "AWS Lambda"],
    benefits: [
      { title: "Zero double entry", description: "Data flows automatically and accurately." },
      { title: "New revenue channels", description: "Open your platform to partners securely." },
      { title: "Reliable operations", description: "Retries, queues and alerts prevent data loss." },
      { title: "Future-proof", description: "Swap tools without rebuilding everything." },
    ],
    startingPrice: "₹40,000",
    caseStudySlug: "medicare-hospital-platform",
    testimonialId: "t1",
    faqs: [
      { q: "Can you integrate with Tally, Zoho or SAP?", a: "Yes. We have integrated with Tally, Zoho, SAP, Salesforce, HubSpot, Shopify and many Indian payment and logistics providers." },
      { q: "Do you provide API documentation?", a: "Every API ships with OpenAPI/Swagger docs and a Postman collection." },
      { q: "How do you keep APIs secure?", a: "We use OAuth2 or signed keys, input validation, rate limiting, encryption in transit and audit logging." },
    ],
  },
  {
    slug: "erp-crm-solutions",
    title: "ERP & CRM Solutions",
    category: "development",
    icon: "workflow",
    summary: "Odoo, Zoho, Salesforce and custom ERP/CRM implementation and customisation.",
    metaTitle: "ERP & CRM Implementation — Odoo, Zoho, Salesforce",
    metaDescription:
      "ERP and CRM implementation, customisation and migration — Odoo, Zoho, Salesforce and custom solutions for growing businesses.",
    heroHeadline: "Run your entire business from one connected system",
    heroSubheadline:
      "We implement and customise ERP and CRM platforms so sales, inventory, accounts and operations finally work together.",
    problems: [
      "Sales, inventory and accounts live in separate tools that don't talk.",
      "Leads slip through the cracks because follow-ups aren't tracked.",
      "Month-end reporting takes days of manual reconciliation.",
    ],
    solution:
      "We pick the right platform for your size and budget, configure it to your processes, migrate your data and train your team for confident adoption.",
    features: [
      { title: "Odoo implementation", description: "Sales, inventory, manufacturing, HR and accounting." },
      { title: "Zoho One & Zoho CRM", description: "Setup, Deluge scripting and app integrations." },
      { title: "Salesforce", description: "Sales Cloud, Service Cloud and custom objects." },
      { title: "Custom ERP/CRM", description: "Purpose-built systems when packages don't fit." },
      { title: "Data migration", description: "Clean, validated migration from Excel or legacy tools." },
      { title: "Training & adoption", description: "Role-based training and post-go-live support." },
    ],
    technologies: ["Odoo", "Zoho", "Salesforce", "HubSpot", "Python", "PostgreSQL", "Power BI"],
    benefits: [
      { title: "One source of truth", description: "Every department works from the same data." },
      { title: "Faster sales cycles", description: "Automated follow-ups and clear pipelines." },
      { title: "Real-time visibility", description: "Live dashboards for stock, cash and performance." },
      { title: "GST-ready", description: "Indian tax, e-invoicing and e-way bill support." },
    ],
    startingPrice: "₹1,00,000",
    caseStudySlug: "medicare-hospital-platform",
    testimonialId: "t5",
    faqs: [
      { q: "Which ERP is best for a small business?", a: "Odoo and Zoho are excellent for SMEs thanks to modular pricing. We recommend after understanding your processes and budget." },
      { q: "How long does an ERP implementation take?", a: "Typically 6–16 weeks depending on modules, data volume and customisation." },
      { q: "Can you integrate the ERP with my website or e-commerce store?", a: "Yes. We sync products, orders, customers and inventory automatically." },
    ],
  },

  // ───────────────────────── Cloud & Infrastructure ─────────────────────────
  {
    slug: "cloud-services",
    title: "Cloud Services (AWS, Azure, GCP)",
    category: "cloud",
    icon: "cloud",
    summary: "Cloud migration, setup and cost optimisation on AWS, Azure and Google Cloud.",
    metaTitle: "Cloud Services — AWS, Azure & Google Cloud Consulting",
    metaDescription:
      "Cloud migration, architecture, managed cloud and cost optimisation on AWS, Microsoft Azure and Google Cloud Platform.",
    heroHeadline: "Move to the cloud with confidence — and pay less for it",
    heroSubheadline:
      "Our certified engineers plan, migrate and manage cloud infrastructure that's secure, resilient and right-sized for your budget.",
    problems: [
      "On-premise servers are ageing, costly and a single point of failure.",
      "Your cloud bill keeps growing and nobody knows why.",
      "Security and backups were set up quickly and never reviewed.",
    ],
    solution:
      "We design well-architected cloud environments, migrate in safe phases, and continuously optimise costs — often saving 20–40% on monthly bills.",
    features: [
      { title: "Cloud migration", description: "Lift-and-shift or re-architect with minimal downtime." },
      { title: "Cloud architecture", description: "Secure, highly available designs following best practice." },
      { title: "Cost optimisation", description: "Right-sizing, reserved instances and waste clean-up." },
      { title: "Managed cloud", description: "Monitoring, patching, backups and incident response." },
      { title: "Hybrid & multi-cloud", description: "Connect on-premise and multiple cloud providers." },
      { title: "Security & compliance", description: "IAM, encryption, logging and compliance guardrails." },
    ],
    technologies: ["AWS", "Microsoft Azure", "Google Cloud", "Terraform", "Kubernetes", "Docker", "CloudFlare"],
    benefits: [
      { title: "Lower costs", description: "Pay only for what you use, optimised monthly." },
      { title: "Higher uptime", description: "Multi-zone redundancy and automatic failover." },
      { title: "Work from anywhere", description: "Secure access for distributed teams." },
      { title: "Scale instantly", description: "Handle growth and seasonal spikes effortlessly." },
    ],
    startingPrice: "₹15,000",
    priceUnit: "/month (managed cloud)",
    caseStudySlug: "medicare-hospital-platform",
    testimonialId: "t1",
    faqs: [
      { q: "Which cloud provider should I choose?", a: "It depends on your existing tools, workloads, compliance and budget. Microsoft-heavy businesses often suit Azure; AWS has the broadest services; GCP excels at data and AI." },
      { q: "Will there be downtime during migration?", a: "We plan phased migrations with testing and rollback so most businesses experience little to no downtime." },
      { q: "Can you reduce my current cloud bill?", a: "Usually, yes. Our free cost review often finds 20–40% savings from idle resources, right-sizing and reserved capacity." },
    ],
  },
  {
    slug: "devops-ci-cd",
    title: "DevOps & CI/CD",
    category: "cloud",
    icon: "git",
    summary: "Automated build, test and deployment pipelines, containers and infrastructure as code.",
    metaTitle: "DevOps Services & CI/CD Pipeline Setup",
    metaDescription:
      "DevOps consulting, CI/CD pipelines, Docker, Kubernetes and infrastructure as code to ship faster with fewer failures.",
    heroHeadline: "Ship faster, break less",
    heroSubheadline:
      "We automate your build, test and release process so your team deploys confidently — multiple times a day if you want.",
    problems: [
      "Deployments are manual, stressful and only one person knows how.",
      "Bugs reach production because tests aren't run consistently.",
      "Environments drift apart, causing 'works on my machine' issues.",
    ],
    solution:
      "We implement CI/CD pipelines, containerisation and infrastructure as code with monitoring, so every release is repeatable, tested and reversible.",
    features: [
      { title: "CI/CD pipelines", description: "GitHub Actions, GitLab CI, Jenkins or Azure DevOps." },
      { title: "Containers & Kubernetes", description: "Docker, EKS, AKS, GKE and Helm charts." },
      { title: "Infrastructure as code", description: "Terraform and CloudFormation for reproducible environments." },
      { title: "Monitoring & logging", description: "Prometheus, Grafana, ELK and CloudWatch." },
      { title: "DevSecOps", description: "Automated dependency, secret and container scanning." },
      { title: "Release strategies", description: "Blue-green and canary deployments with instant rollback." },
    ],
    technologies: ["GitHub Actions", "GitLab CI", "Jenkins", "Docker", "Kubernetes", "Terraform", "Grafana"],
    benefits: [
      { title: "Faster releases", description: "From weekly to on-demand deployments." },
      { title: "Fewer incidents", description: "Automated tests and safe rollbacks." },
      { title: "Consistent environments", description: "Dev, staging and production stay in sync." },
      { title: "Less key-person risk", description: "Documented, automated processes." },
    ],
    startingPrice: "₹50,000",
    caseStudySlug: "medicare-hospital-platform",
    testimonialId: "t3",
    faqs: [
      { q: "Do we need Kubernetes?", a: "Not always. For many teams, managed container services or serverless are simpler and cheaper. We recommend what fits your scale." },
      { q: "Can you work with our existing Git provider?", a: "Yes — GitHub, GitLab, Bitbucket and Azure Repos are all supported." },
      { q: "Do you offer ongoing DevOps support?", a: "Yes, as a monthly retainer or a dedicated DevOps engineer." },
    ],
  },
  {
    slug: "web-hosting-domain-email",
    title: "Web Hosting, Domain & Business Email",
    category: "cloud",
    icon: "mail",
    summary: "Domains, secure hosting and Google Workspace or Microsoft 365 setup and migration.",
    metaTitle: "Web Hosting, Domain & Business Email Setup",
    metaDescription:
      "Domain registration, managed web hosting, SSL and business email setup with Google Workspace or Microsoft 365, including migration.",
    heroHeadline: "Professional email and rock-solid hosting, set up for you",
    heroSubheadline:
      "Get a branded email address, fast secure hosting and a domain that's managed properly — without the technical headaches.",
    problems: [
      "Your team uses Gmail or Yahoo addresses that don't look professional.",
      "Your website goes down and emails land in spam.",
      "Nobody knows who controls the domain or where renewals are billed.",
    ],
    solution:
      "We register and manage domains in your name, host your site on fast secure servers, and configure business email with proper SPF, DKIM and DMARC.",
    features: [
      { title: "Domain registration & DNS", description: "Registered in your name with renewal tracking." },
      { title: "Managed web hosting", description: "Fast SSD/cloud hosting with daily backups." },
      { title: "SSL certificates", description: "Free and premium SSL with auto-renewal." },
      { title: "Google Workspace setup", description: "Gmail, Drive, Meet and admin configuration." },
      { title: "Microsoft 365 setup", description: "Outlook, Teams, SharePoint and OneDrive." },
      { title: "Email migration", description: "Move mailboxes from any provider without loss." },
    ],
    technologies: ["Google Workspace", "Microsoft 365", "Cloudflare", "cPanel", "AWS Lightsail", "Vercel"],
    benefits: [
      { title: "Look professional", description: "you@yourcompany.com builds instant trust." },
      { title: "Better deliverability", description: "Correct DNS records keep you out of spam." },
      { title: "Peace of mind", description: "Monitoring, backups and renewals handled." },
      { title: "Collaborate easily", description: "Shared drives, calendars and video calls." },
    ],
    startingPrice: "₹4,999",
    priceUnit: "/year",
    caseStudySlug: "edubright-campus-it",
    testimonialId: "t4",
    faqs: [
      { q: "Google Workspace or Microsoft 365?", a: "Both are excellent. Google Workspace is simpler and browser-first; Microsoft 365 suits teams who rely on desktop Office apps. We help you choose." },
      { q: "Can you migrate our old emails?", a: "Yes. We migrate mailboxes, contacts and calendars with zero data loss." },
      { q: "Who will own the domain?", a: "You will. We always register domains in the client's name and share access." },
    ],
  },
  {
    slug: "server-management",
    title: "Server Management & Maintenance",
    category: "cloud",
    icon: "server",
    summary: "Proactive monitoring, patching, hardening and 24/7 support for Linux and Windows servers.",
    metaTitle: "Server Management & Maintenance Services",
    metaDescription:
      "24/7 server monitoring, patching, hardening, backup and support for Linux and Windows servers — on-premise and cloud.",
    heroHeadline: "Servers that stay up, secure and fast — 24/7",
    heroSubheadline:
      "We proactively monitor and maintain your Linux and Windows servers so issues get fixed before your users notice.",
    problems: [
      "Servers go down at night or on weekends with nobody watching.",
      "Security patches are months behind.",
      "Performance degrades and you don't know why.",
    ],
    solution:
      "Our NOC team monitors your servers around the clock, applies patches on schedule, hardens configurations and responds to incidents within SLA.",
    features: [
      { title: "24/7 monitoring", description: "Uptime, CPU, memory, disk and service checks." },
      { title: "Patch management", description: "Scheduled OS and software updates with testing." },
      { title: "Security hardening", description: "CIS benchmarks, firewalls and access control." },
      { title: "Backup management", description: "Automated, tested and off-site backups." },
      { title: "Performance tuning", description: "Web server, database and caching optimisation." },
      { title: "Incident response", description: "SLA-backed response with root-cause analysis." },
    ],
    technologies: ["Linux", "Windows Server", "Nginx", "Apache", "MySQL", "Zabbix", "Grafana"],
    benefits: [
      { title: "Maximum uptime", description: "99.9% uptime targets with proactive fixes." },
      { title: "Fewer breaches", description: "Up-to-date, hardened systems." },
      { title: "Predictable cost", description: "Fixed monthly plans per server." },
      { title: "Monthly reports", description: "Clear visibility into health and incidents." },
    ],
    startingPrice: "₹3,999",
    priceUnit: "/server/month",
    caseStudySlug: "edubright-campus-it",
    testimonialId: "t4",
    faqs: [
      { q: "Do you manage on-premise servers too?", a: "Yes. We manage physical, virtual and cloud servers, on-site or remotely." },
      { q: "What are your response times?", a: "Critical incidents: 30 minutes; high: 2 hours; normal: next business day — or custom SLAs for enterprise plans." },
      { q: "Can you manage control panels like cPanel or Plesk?", a: "Yes, along with Docker hosts, databases and web servers." },
    ],
  },

  // ───────────────────────── Security & Support ─────────────────────────
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    category: "security",
    icon: "shield",
    summary: "VAPT, firewalls, endpoint protection and security audits to keep threats out.",
    metaTitle: "Cybersecurity Services — VAPT, Firewall & Security Audit",
    metaDescription:
      "Vulnerability assessment and penetration testing (VAPT), firewall setup, endpoint protection, security audits and awareness training.",
    heroHeadline: "Protect your business before attackers find the gaps",
    heroSubheadline:
      "We find and fix vulnerabilities across your apps, network and devices — and help you stay compliant and secure.",
    problems: [
      "You don't know how exposed your systems are to attackers.",
      "Staff click on phishing emails and reuse weak passwords.",
      "Clients and regulators are asking for security certifications and audits.",
    ],
    solution:
      "Our certified security team tests your defences, prioritises fixes by risk, implements protection and trains your people — with clear, non-technical reports.",
    features: [
      { title: "VAPT", description: "Web, mobile, API, network and cloud penetration testing." },
      { title: "Firewall & UTM", description: "Fortinet, Sophos and pfSense setup and management." },
      { title: "Endpoint protection", description: "EDR/antivirus deployment and central management." },
      { title: "Security audits", description: "ISO 27001, DPDP and CERT-In readiness reviews." },
      { title: "Email security", description: "Anti-phishing, SPF/DKIM/DMARC and filtering." },
      { title: "Awareness training", description: "Phishing simulations and staff workshops." },
    ],
    technologies: ["Burp Suite", "Nessus", "OWASP ZAP", "Fortinet", "Sophos", "CrowdStrike", "Wazuh"],
    benefits: [
      { title: "Reduced risk", description: "Close vulnerabilities before they are exploited." },
      { title: "Compliance ready", description: "Evidence for audits, clients and regulators." },
      { title: "Customer trust", description: "Show you take data protection seriously." },
      { title: "Clear priorities", description: "Risk-ranked findings with fix guidance." },
    ],
    startingPrice: "₹35,000",
    caseStudySlug: "edubright-campus-it",
    testimonialId: "t5",
    faqs: [
      { q: "How often should we do VAPT?", a: "At least once a year and after every major release or infrastructure change. Regulated industries may need quarterly testing." },
      { q: "Will penetration testing disrupt our systems?", a: "We agree scope, timing and safe testing methods in advance. Production testing is carefully controlled." },
      { q: "Do you help fix the issues you find?", a: "Yes. We provide remediation support and a free re-test to verify fixes." },
    ],
  },
  {
    slug: "managed-it-services",
    title: "Managed IT Services & Helpdesk",
    category: "security",
    icon: "headphones",
    summary: "Your outsourced IT department — helpdesk, device management and proactive support.",
    metaTitle: "Managed IT Services & IT Helpdesk Support",
    metaDescription:
      "Outsourced IT support and managed services — helpdesk, device management, patching, user onboarding and SLA-backed on-site support.",
    heroHeadline: "A full IT department, without the overhead",
    heroSubheadline:
      "Our friendly helpdesk and field engineers keep your people productive with fast, SLA-backed support — remotely and on-site.",
    problems: [
      "Employees waste hours waiting for IT issues to be fixed.",
      "Hiring and retaining in-house IT staff is expensive.",
      "Devices, licences and accounts aren't tracked properly.",
    ],
    solution:
      "We become your IT team: a single number for every IT issue, proactive maintenance, asset tracking and a monthly report on everything we did.",
    features: [
      { title: "Helpdesk (L1–L3)", description: "Phone, email, WhatsApp and portal support." },
      { title: "On-site engineers", description: "Scheduled visits and emergency call-outs." },
      { title: "Device management", description: "Patching, antivirus and remote management for all devices." },
      { title: "User lifecycle", description: "Onboarding, offboarding and access management." },
      { title: "Asset & licence tracking", description: "Know what you own and when it renews." },
      { title: "Vendor management", description: "We deal with ISPs, OEMs and software vendors for you." },
    ],
    technologies: ["Microsoft Intune", "NinjaOne", "ManageEngine", "Freshdesk", "Microsoft 365", "Google Workspace"],
    benefits: [
      { title: "Predictable costs", description: "Fixed monthly fee per user or device." },
      { title: "Faster resolution", description: "Most tickets solved remotely within the hour." },
      { title: "Fewer issues", description: "Proactive maintenance prevents problems." },
      { title: "Focus on your business", description: "Leave the IT to us." },
    ],
    startingPrice: "₹799",
    priceUnit: "/user/month",
    caseStudySlug: "edubright-campus-it",
    testimonialId: "t4",
    faqs: [
      { q: "Do you provide on-site support?", a: "Yes, in our service city and nearby areas, plus partner engineers across major Indian cities." },
      { q: "What are your support hours?", a: "Standard plans cover business hours; premium plans include 24/7 support for critical systems." },
      { q: "Is there a minimum contract?", a: "Most clients start with a 12-month agreement; monthly plans are available for small teams." },
    ],
  },
  {
    slug: "network-setup-management",
    title: "Network Setup & Management",
    category: "security",
    icon: "network",
    summary: "LAN/WAN, enterprise Wi-Fi, VPN and structured cabling designed for speed and security.",
    metaTitle: "Network Setup & Management — LAN, WAN, Wi-Fi, VPN",
    metaDescription:
      "Office network design, structured cabling, enterprise Wi-Fi, firewalls, VPN and ongoing network management for businesses and campuses.",
    heroHeadline: "Fast, secure networks that just work",
    heroSubheadline:
      "From a 10-seat office to multi-site campuses, we design, install and manage networks your business can depend on.",
    problems: [
      "Wi-Fi drops in meeting rooms and slows to a crawl at peak times.",
      "Branches can't securely access head-office systems.",
      "Cabling is messy and undocumented, making faults hard to trace.",
    ],
    solution:
      "We survey your site, design the right topology, install certified cabling and equipment, and monitor the network so performance stays high.",
    features: [
      { title: "LAN & structured cabling", description: "Cat6/Cat6A and fibre with labelled, certified runs." },
      { title: "Enterprise Wi-Fi", description: "Heat-mapped coverage with seamless roaming." },
      { title: "WAN & SD-WAN", description: "Reliable connectivity between branches." },
      { title: "VPN & remote access", description: "Secure access for remote staff and sites." },
      { title: "Firewalls & VLANs", description: "Segmented, secure networks with guest isolation." },
      { title: "Network monitoring", description: "Proactive alerts and performance reports." },
    ],
    technologies: ["Cisco", "Aruba", "Ubiquiti", "TP-Link Omada", "Fortinet", "MikroTik", "PRTG"],
    benefits: [
      { title: "Full coverage", description: "Strong Wi-Fi in every corner of your premises." },
      { title: "Secure by design", description: "Segmentation keeps critical systems safe." },
      { title: "Less downtime", description: "Redundant links and proactive monitoring." },
      { title: "Documented", description: "Network diagrams and labelled infrastructure." },
    ],
    startingPrice: "₹20,000",
    caseStudySlug: "edubright-campus-it",
    testimonialId: "t4",
    faqs: [
      { q: "Do you do a site survey first?", a: "Yes. A site survey and Wi-Fi heat-map is the first step for every network project." },
      { q: "Can you work with our existing equipment?", a: "Where possible, yes. We'll tell you honestly what can be reused and what needs replacing." },
      { q: "Do you supply the hardware?", a: "Yes. We supply genuine hardware with OEM warranty at competitive prices." },
    ],
  },
  {
    slug: "cctv-surveillance",
    title: "CCTV & Surveillance Installation",
    category: "security",
    icon: "cctv",
    summary: "HD/IP CCTV, access control and remote monitoring for offices, schools, shops and homes.",
    metaTitle: "CCTV Camera Installation & Surveillance Systems",
    metaDescription:
      "HD and IP CCTV camera installation, NVR setup, mobile viewing, access control and AMC for offices, schools, hospitals, retail and homes.",
    heroHeadline: "Keep an eye on what matters — from anywhere",
    heroSubheadline:
      "We design and install reliable CCTV and access-control systems with crystal-clear video and mobile viewing.",
    problems: [
      "Blind spots leave key areas unmonitored.",
      "Old cameras produce grainy footage that's useless when you need it.",
      "You can't view cameras remotely or the recordings stop without warning.",
    ],
    solution:
      "We plan camera placement for full coverage, install quality HD/IP systems, configure secure remote viewing and maintain them under AMC.",
    features: [
      { title: "HD & IP cameras", description: "2MP to 8MP cameras with night vision." },
      { title: "NVR/DVR setup", description: "Reliable recording with the right storage retention." },
      { title: "Mobile & remote viewing", description: "Secure live view and playback on your phone." },
      { title: "Access control", description: "Biometric, RFID and face-recognition entry." },
      { title: "Video analytics", description: "Motion alerts, people counting and intrusion detection." },
      { title: "CCTV AMC", description: "Periodic health checks and quick repairs." },
    ],
    technologies: ["Hikvision", "CP Plus", "Dahua", "Axis", "Honeywell", "ZKTeco"],
    benefits: [
      { title: "Deter theft", description: "Visible cameras reduce incidents." },
      { title: "Evidence when needed", description: "Clear footage, reliably stored." },
      { title: "Peace of mind", description: "Watch your premises from anywhere." },
      { title: "Safer people", description: "Protect staff, students and patients." },
    ],
    startingPrice: "₹15,000",
    priceUnit: "(4-camera kit, installed)",
    caseStudySlug: "edubright-campus-it",
    testimonialId: "t4",
    faqs: [
      { q: "How many cameras do I need?", a: "It depends on the layout and the areas you want covered. Our free site survey gives you an exact recommendation." },
      { q: "How long is footage stored?", a: "Typically 15–30 days, depending on camera count, resolution and storage. We size it to your requirement." },
      { q: "Do you provide maintenance?", a: "Yes. Our CCTV AMC includes periodic checks, cleaning and priority repairs." },
    ],
  },
  {
    slug: "hardware-sales-repair-amc",
    title: "Hardware Sales, Repair & AMC",
    category: "security",
    icon: "laptop",
    summary: "Laptops, desktops, printers and servers — supplied, repaired and maintained under AMC.",
    metaTitle: "Computer Hardware Sales, Repair & AMC Services",
    metaDescription:
      "Laptop, desktop, printer and server sales, repair and annual maintenance contracts (AMC) for businesses, schools and individuals.",
    heroHeadline: "Reliable hardware and fast repairs, without the hassle",
    heroSubheadline:
      "We supply the right devices at the right price, fix them fast when they fail, and keep them healthy with affordable AMC plans.",
    problems: [
      "Broken laptops and printers bring work to a standstill.",
      "Buying hardware piecemeal means mismatched, unsupported devices.",
      "Repair shops are slow and you never know what you'll be charged.",
    ],
    solution:
      "We're your single point of contact for hardware — procurement, setup, repairs and preventive maintenance with clear, fixed pricing.",
    features: [
      { title: "Hardware procurement", description: "Laptops, desktops, servers, printers and peripherals." },
      { title: "Repairs & upgrades", description: "Chip-level repairs, SSD/RAM upgrades and data recovery." },
      { title: "Annual Maintenance Contracts", description: "Comprehensive and non-comprehensive AMC plans." },
      { title: "Printer & copier support", description: "Service, toner and maintenance." },
      { title: "Device setup & imaging", description: "Ready-to-use devices for new joiners." },
      { title: "E-waste disposal", description: "Certified, secure disposal of old devices." },
    ],
    technologies: ["Dell", "HP", "Lenovo", "Apple", "Canon", "Epson", "APC"],
    benefits: [
      { title: "Less downtime", description: "Fast turnaround and standby devices." },
      { title: "Better pricing", description: "Bulk rates from authorised distributors." },
      { title: "Longer device life", description: "Preventive maintenance saves money." },
      { title: "One vendor", description: "No more juggling multiple repair shops." },
    ],
    startingPrice: "₹1,499",
    priceUnit: "/device/year (AMC)",
    caseStudySlug: "edubright-campus-it",
    testimonialId: "t6",
    faqs: [
      { q: "Do you offer pickup and drop for repairs?", a: "Yes, within our service area. On-site repairs are available for AMC customers." },
      { q: "Do you sell to individuals too?", a: "Yes. We help individuals and families choose and set up laptops, desktops and home networks." },
      { q: "What's included in AMC?", a: "Preventive maintenance visits, unlimited breakdown calls, and — in comprehensive AMC — replacement of covered parts." },
    ],
  },
  {
    slug: "data-backup-disaster-recovery",
    title: "Data Backup & Disaster Recovery",
    category: "security",
    icon: "backup",
    summary: "Automated, encrypted backups and tested recovery plans so you never lose critical data.",
    metaTitle: "Data Backup & Disaster Recovery Solutions",
    metaDescription:
      "Automated cloud and on-premise backups, ransomware protection and disaster recovery planning with tested restore procedures.",
    heroHeadline: "Never lose a file — or a day of business — again",
    heroSubheadline:
      "We set up automated, encrypted backups and tested recovery plans so you can bounce back from hardware failure, ransomware or human error.",
    problems: [
      "Backups are manual, incomplete or never tested.",
      "A ransomware attack or disk failure could wipe out years of data.",
      "You don't know how long it would take to recover.",
    ],
    solution:
      "We implement the 3-2-1 backup strategy with immutable cloud copies, define recovery time objectives and run regular restore drills.",
    features: [
      { title: "Server & endpoint backup", description: "Automated backups for every critical device." },
      { title: "Microsoft 365 & Google backup", description: "Protect email, Drive, OneDrive and SharePoint." },
      { title: "Immutable cloud backup", description: "Ransomware-resistant off-site copies." },
      { title: "Disaster recovery planning", description: "Documented RTO/RPO and runbooks." },
      { title: "DR as a Service", description: "Spin up critical systems in the cloud within hours." },
      { title: "Restore testing", description: "Scheduled drills to prove backups work." },
    ],
    technologies: ["Veeam", "Acronis", "AWS Backup", "Azure Site Recovery", "Synology", "Backblaze B2"],
    benefits: [
      { title: "Business continuity", description: "Recover quickly from any incident." },
      { title: "Ransomware resilience", description: "Immutable copies attackers can't encrypt." },
      { title: "Compliance", description: "Retention policies for audits and DPDP." },
      { title: "Peace of mind", description: "Tested, monitored and reported monthly." },
    ],
    startingPrice: "₹2,999",
    priceUnit: "/month",
    caseStudySlug: "medicare-hospital-platform",
    testimonialId: "t1",
    faqs: [
      { q: "What is the 3-2-1 backup rule?", a: "Three copies of your data, on two different media, with one copy off-site. We add immutability for ransomware protection." },
      { q: "How quickly can we recover?", a: "We design to your RTO — from minutes for critical systems to a few hours for less critical data." },
      { q: "Are backups encrypted?", a: "Yes — encrypted in transit and at rest, with keys under your control." },
    ],
  },

  // ───────────────────────── Data, AI & Growth ─────────────────────────
  {
    slug: "ai-automation",
    title: "AI & Automation",
    category: "growth",
    icon: "bot",
    summary: "AI chatbots, AI agents and workflow automation that save time and delight customers.",
    metaTitle: "AI Development & Automation — Chatbots, AI Agents",
    metaDescription:
      "AI chatbots, AI agents, document processing and workflow automation using leading LLMs, integrated securely with your business systems.",
    heroHeadline: "Put AI to work in your business — practically and safely",
    heroSubheadline:
      "We build AI assistants, agents and automations that answer customers, process documents and handle repetitive tasks around the clock.",
    problems: [
      "Your team answers the same customer questions hundreds of times.",
      "Documents, invoices and emails are processed manually.",
      "You know AI could help but aren't sure where to start or how to do it securely.",
    ],
    solution:
      "We identify high-ROI use cases, build AI solutions grounded in your own data, and integrate them with your tools — with guardrails, privacy and human oversight built in.",
    features: [
      { title: "AI chatbots", description: "Website and WhatsApp assistants trained on your content." },
      { title: "AI agents", description: "Agents that take actions across your apps and data." },
      { title: "Workflow automation", description: "n8n, Make, Zapier and custom automation." },
      { title: "Document AI", description: "Extract data from invoices, forms and contracts." },
      { title: "RAG knowledge assistants", description: "Internal search over policies and documents." },
      { title: "AI strategy workshops", description: "Find and prioritise the best AI opportunities." },
    ],
    technologies: ["Claude", "OpenAI", "LangChain", "n8n", "Python", "Pinecone", "WhatsApp API"],
    benefits: [
      { title: "24/7 responses", description: "Instant answers for customers at any hour." },
      { title: "Hours saved", description: "Automate repetitive, rules-based work." },
      { title: "More leads", description: "Chatbots qualify and capture visitors." },
      { title: "Safe & private", description: "Guardrails, access control and audit logs." },
    ],
    startingPrice: "₹50,000",
    caseStudySlug: "shopkart-ecommerce-growth",
    testimonialId: "t3",
    faqs: [
      { q: "Is our data safe with AI?", a: "Yes. We use enterprise APIs that don't train on your data, apply access controls and can deploy in your own cloud." },
      { q: "Can the chatbot work on WhatsApp?", a: "Yes — via the official WhatsApp Business API, as well as your website, Instagram and Facebook." },
      { q: "How long does an AI project take?", a: "A focused chatbot or automation can go live in 2–4 weeks; complex agents take 6–12 weeks." },
    ],
  },
  {
    slug: "data-analytics-bi",
    title: "Data Analytics & BI Dashboards",
    category: "growth",
    icon: "chart",
    summary: "Power BI and Tableau dashboards that turn raw data into clear, real-time decisions.",
    metaTitle: "Data Analytics & BI Dashboards — Power BI, Tableau",
    metaDescription:
      "Business intelligence dashboards, data warehousing and analytics with Power BI and Tableau so leaders can make faster, better decisions.",
    heroHeadline: "See your whole business at a glance",
    heroSubheadline:
      "We connect your data sources and build interactive dashboards so you can spot trends, track KPIs and act faster.",
    problems: [
      "Reports are built manually in Excel and are outdated by the time they're shared.",
      "Different teams report different numbers for the same metric.",
      "Leaders lack real-time visibility into sales, operations and finance.",
    ],
    solution:
      "We build a reliable data pipeline and a single source of truth, then design dashboards tailored to each role — refreshed automatically.",
    features: [
      { title: "Power BI dashboards", description: "Interactive reports with drill-downs and alerts." },
      { title: "Tableau development", description: "Beautiful visual analytics for complex data." },
      { title: "Data warehousing", description: "BigQuery, Snowflake, Redshift or Azure Synapse." },
      { title: "ETL/ELT pipelines", description: "Automated data movement from all your sources." },
      { title: "KPI frameworks", description: "Define the metrics that actually matter." },
      { title: "Predictive analytics", description: "Forecast sales, demand and churn." },
    ],
    technologies: ["Power BI", "Tableau", "Looker Studio", "BigQuery", "Snowflake", "Python", "dbt"],
    benefits: [
      { title: "Faster decisions", description: "Live insights instead of week-old reports." },
      { title: "One version of truth", description: "Consistent metrics across teams." },
      { title: "Hours saved", description: "Automated reporting replaces manual work." },
      { title: "Spot opportunities", description: "Find trends and anomalies early." },
    ],
    startingPrice: "₹45,000",
    caseStudySlug: "shopkart-ecommerce-growth",
    testimonialId: "t5",
    faqs: [
      { q: "Power BI or Tableau?", a: "Power BI is cost-effective and integrates tightly with Microsoft 365; Tableau excels at advanced visualisation. We help you choose." },
      { q: "Can you connect to Tally, Zoho or our ERP?", a: "Yes. We connect to most databases, spreadsheets, ERPs, CRMs and marketing platforms." },
      { q: "Do you provide training?", a: "Yes — so your team can explore data and build simple reports themselves." },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    category: "growth",
    icon: "megaphone",
    summary: "SEO, Google Ads, social media and content marketing that drive measurable leads.",
    metaTitle: "Digital Marketing Agency — SEO, Google Ads, Social Media",
    metaDescription:
      "Results-driven digital marketing: SEO, local SEO, Google Ads, Meta Ads, social media management and content marketing with transparent reporting.",
    heroHeadline: "Get found, get chosen, get growing",
    heroSubheadline:
      "We combine SEO, paid ads, social media and content to bring you qualified leads — with monthly reports that show exactly what you get for your money.",
    problems: [
      "You're invisible on Google while competitors take your customers.",
      "Ad spend is rising but leads aren't.",
      "Social media is inconsistent and doesn't bring in business.",
    ],
    solution:
      "We build a data-driven marketing plan around your goals, execute across the right channels and optimise every month based on real results.",
    features: [
      { title: "Search engine optimisation", description: "Technical, on-page, content and link building." },
      { title: "Local SEO", description: "Google Business Profile and local rankings." },
      { title: "Google Ads (PPC)", description: "Search, Display, Shopping and YouTube campaigns." },
      { title: "Social media marketing", description: "Content, community and Meta/LinkedIn ads." },
      { title: "Content marketing", description: "Blogs, videos and lead magnets that convert." },
      { title: "Analytics & reporting", description: "GA4, conversion tracking and monthly reports." },
    ],
    technologies: ["Google Ads", "Meta Ads", "GA4", "Search Console", "SEMrush", "Ahrefs", "HubSpot"],
    benefits: [
      { title: "More qualified leads", description: "Target people ready to buy." },
      { title: "Lower cost per lead", description: "Continuous optimisation of spend." },
      { title: "Long-term visibility", description: "SEO compounds month after month." },
      { title: "Total transparency", description: "Clear reports and direct ad-account access." },
    ],
    startingPrice: "₹15,000",
    priceUnit: "/month",
    caseStudySlug: "shopkart-ecommerce-growth",
    testimonialId: "t2",
    faqs: [
      { q: "How long does SEO take to show results?", a: "Most businesses see meaningful movement in 3–6 months. Local SEO and paid ads can deliver leads much faster." },
      { q: "Do you guarantee first-page rankings?", a: "No honest agency can guarantee rankings. We guarantee transparent work, best practices and reporting tied to business outcomes." },
      { q: "Is ad spend included in your fee?", a: "No. Ad spend is paid directly to Google or Meta; our fee covers strategy, management and optimisation." },
    ],
  },
  {
    slug: "software-testing-qa",
    title: "Software Testing & QA",
    category: "growth",
    icon: "bug",
    summary: "Manual and automated testing for web, mobile and APIs so you release with confidence.",
    metaTitle: "Software Testing & QA Services — Manual & Automation",
    metaDescription:
      "Manual testing, test automation, performance, security and mobile app testing to release bug-free software faster.",
    heroHeadline: "Release with confidence, every single time",
    heroSubheadline:
      "Our QA engineers catch bugs before your users do — with manual, automated, performance and security testing.",
    problems: [
      "Customers report bugs that should have been caught earlier.",
      "Regression testing takes days and delays every release.",
      "The app slows down or crashes under real-world load.",
    ],
    solution:
      "We build a test strategy, automate regression suites in your CI pipeline, and run exploratory and performance testing on real devices.",
    features: [
      { title: "Manual & exploratory testing", description: "Human testers who think like users." },
      { title: "Test automation", description: "Playwright, Cypress, Selenium and Appium suites." },
      { title: "API testing", description: "Contract and integration tests for every endpoint." },
      { title: "Performance testing", description: "Load and stress tests with k6 and JMeter." },
      { title: "Mobile testing", description: "Real-device testing across Android and iOS." },
      { title: "Accessibility testing", description: "WCAG 2.1 AA audits and fixes." },
    ],
    technologies: ["Playwright", "Cypress", "Selenium", "Appium", "k6", "JMeter", "BrowserStack"],
    benefits: [
      { title: "Fewer production bugs", description: "Catch issues early when they're cheap to fix." },
      { title: "Faster releases", description: "Automated regression in minutes, not days." },
      { title: "Better reviews", description: "Stable apps keep users happy." },
      { title: "Independent view", description: "Objective QA separate from development." },
    ],
    startingPrice: "₹1,200",
    priceUnit: "/hour",
    caseStudySlug: "medicare-hospital-platform",
    testimonialId: "t3",
    faqs: [
      { q: "Can you test software built by another team?", a: "Yes. Independent QA is one of our most popular services." },
      { q: "Which tests should be automated?", a: "Stable, repetitive flows like login, checkout and core business logic are ideal. Exploratory testing stays manual." },
      { q: "Do you integrate tests into CI/CD?", a: "Yes. Automated suites run on every pull request and before each release." },
    ],
  },
  {
    slug: "it-consulting-digital-transformation",
    title: "IT Consulting & Digital Transformation",
    category: "growth",
    icon: "lightbulb",
    summary: "Technology strategy, roadmaps and vendor-neutral advice to modernise your business.",
    metaTitle: "IT Consulting & Digital Transformation Services",
    metaDescription:
      "Vendor-neutral IT consulting, technology roadmaps, digital transformation and virtual CTO services for SMEs and enterprises.",
    heroHeadline: "A clear technology roadmap for your next stage of growth",
    heroSubheadline:
      "Get honest, vendor-neutral advice from experienced consultants who help you invest in the right technology at the right time.",
    problems: [
      "Technology decisions are made ad-hoc without a long-term plan.",
      "You're overspending on tools that overlap or aren't used.",
      "Digital transformation feels overwhelming and risky.",
    ],
    solution:
      "We assess where you are, define where you need to be and build a prioritised, budgeted roadmap — then help you execute it.",
    features: [
      { title: "IT assessment", description: "Review systems, security, costs and skills." },
      { title: "Technology roadmap", description: "A prioritised, budgeted 12–36 month plan." },
      { title: "Virtual CTO / CIO", description: "Senior technology leadership on demand." },
      { title: "Process digitisation", description: "Move paper and spreadsheets to digital workflows." },
      { title: "Vendor selection", description: "Unbiased evaluation of software and suppliers." },
      { title: "Change management", description: "Help your people adopt new ways of working." },
    ],
    technologies: ["Microsoft 365", "Google Workspace", "AWS", "Azure", "Odoo", "Zoho", "Power BI"],
    benefits: [
      { title: "Smarter investments", description: "Spend on what moves the needle." },
      { title: "Reduced risk", description: "Phased plans with clear milestones." },
      { title: "Aligned teams", description: "Technology that supports business goals." },
      { title: "Competitive edge", description: "Modern systems that outpace competitors." },
    ],
    startingPrice: "₹2,500",
    priceUnit: "/hour",
    caseStudySlug: "edubright-campus-it",
    testimonialId: "t5",
    faqs: [
      { q: "Are you vendor-neutral?", a: "Yes. We recommend what's right for you and disclose any partner relationships upfront." },
      { q: "What is a virtual CTO?", a: "A senior technology leader who works with you part-time to guide strategy, teams and vendors — without a full-time salary." },
      { q: "Do you also implement the roadmap?", a: "Yes, we can implement end-to-end or support your internal team and other vendors." },
    ],
  },
  {
    slug: "it-staff-augmentation",
    title: "IT Staff Augmentation / Dedicated Developers",
    category: "growth",
    icon: "users",
    summary: "Hire vetted developers, designers, QA and DevOps engineers who work as part of your team.",
    metaTitle: "Hire Dedicated Developers — IT Staff Augmentation",
    metaDescription:
      "Hire dedicated developers, designers, QA and DevOps engineers from India. Flexible monthly contracts, vetted talent and quick onboarding.",
    heroHeadline: "Scale your team in days, not months",
    heroSubheadline:
      "Hire pre-vetted developers and engineers who work exclusively on your projects, in your time zone, under your direction.",
    problems: [
      "Hiring skilled developers takes months and costs a fortune.",
      "Project demand fluctuates, making full-time hires risky.",
      "Your roadmap is stalled for lack of specialist skills.",
    ],
    solution:
      "We match you with dedicated professionals from our team within days, handle HR and infrastructure, and replace anyone at no cost if they're not the right fit.",
    features: [
      { title: "Dedicated developers", description: "React, Node, Python, .NET, Java, PHP, Flutter and more." },
      { title: "Designers & QA", description: "UI/UX designers and manual/automation testers." },
      { title: "DevOps & cloud engineers", description: "AWS, Azure, Kubernetes and CI/CD." },
      { title: "Flexible engagement", description: "Full-time, part-time or hourly." },
      { title: "Time-zone overlap", description: "Working hours aligned to your team." },
      { title: "Free replacement", description: "Not the right fit? We replace at no extra cost." },
    ],
    technologies: ["React", "Node.js", "Python", "Java", ".NET", "Flutter", "AWS"],
    benefits: [
      { title: "Save up to 60%", description: "Versus local hiring costs in the US/UK." },
      { title: "Start in 48–72 hours", description: "Pre-vetted talent ready to go." },
      { title: "No HR overhead", description: "We handle payroll, laptops and benefits." },
      { title: "Scale up or down", description: "Monthly contracts, no long lock-in." },
    ],
    startingPrice: "₹1,50,000",
    priceUnit: "/developer/month",
    caseStudySlug: "medicare-hospital-platform",
    testimonialId: "t3",
    faqs: [
      { q: "Can I interview the developers?", a: "Yes. You interview and approve every team member before they start." },
      { q: "Who manages the developers?", a: "You do, day-to-day. We provide an account manager for HR, performance and escalation." },
      { q: "Is my code and data protected?", a: "Yes. NDAs, IP assignment and secure access policies are standard." },
    ],
  },
  {
    slug: "corporate-it-training",
    title: "Corporate IT Training",
    category: "growth",
    icon: "graduation",
    summary: "Hands-on training in cloud, cybersecurity, Microsoft 365, AI tools and programming.",
    metaTitle: "Corporate IT Training Programs",
    metaDescription:
      "Customised corporate IT training in cybersecurity awareness, Microsoft 365, cloud, AI tools, Excel and programming — online or on-site.",
    heroHeadline: "Upskill your team with practical, hands-on IT training",
    heroSubheadline:
      "Customised workshops and programs that help your people work smarter, stay secure and adopt new technology with confidence.",
    problems: [
      "Teams don't use the tools you've paid for to their full potential.",
      "Staff are the weakest link in your security.",
      "New technologies like AI are being adopted without proper guidance.",
    ],
    solution:
      "We assess skill gaps and deliver role-based, hands-on training online or on-site — with assessments and certificates to measure progress.",
    features: [
      { title: "Cybersecurity awareness", description: "Phishing, passwords, data protection and DPDP." },
      { title: "Microsoft 365 & Google Workspace", description: "Productivity, collaboration and Teams/Meet." },
      { title: "AI for business", description: "Using AI assistants safely and productively." },
      { title: "Cloud & DevOps", description: "AWS, Azure and CI/CD for technical teams." },
      { title: "Programming bootcamps", description: "Python, JavaScript and data analysis." },
      { title: "Advanced Excel & Power BI", description: "Formulas, automation and dashboards." },
    ],
    technologies: ["Microsoft 365", "Google Workspace", "AWS", "Azure", "Python", "Power BI", "Excel"],
    benefits: [
      { title: "More productive teams", description: "Get more from existing tools." },
      { title: "Fewer security incidents", description: "Staff who spot threats." },
      { title: "Confident adoption", description: "Smooth rollout of new systems." },
      { title: "Measurable progress", description: "Assessments and certificates." },
    ],
    startingPrice: "₹20,000",
    priceUnit: "/workshop",
    caseStudySlug: "edubright-campus-it",
    testimonialId: "t6",
    faqs: [
      { q: "Is training customised for our company?", a: "Yes. We tailor examples and exercises to your tools, workflows and industry." },
      { q: "Online or on-site?", a: "Both. We deliver live online sessions, on-site workshops and blended programs." },
      { q: "Do participants get certificates?", a: "Yes, after completing assessments." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const servicesByCategory = (Object.keys(serviceCategories) as ServiceCategory[]).map((key) => ({
  key,
  ...serviceCategories[key],
  services: services.filter((s) => s.category === key),
}));

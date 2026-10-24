import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { ClientLogos } from "@/components/sections/client-logos";
import { Stats } from "@/components/sections/stats";
import { SectionHeading } from "@/components/sections/section-heading";
import { PostCard } from "@/components/sections/cards";
import {
  EngagementModels,
  FaqSection,
  FeatureGrid,
  FeaturedCase,
  IndexList,
  IndustriesGrid,
  ProcessSteps,
  QuoteBlock,
  TechGrid,
} from "@/components/sections/blocks";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { site, yearsInBusiness } from "@/content/site";
import { servicesByCategory } from "@/content/services";
import { homeProcess, industries, technologies, whyChooseUs } from "@/content/company";
import { homeFaqs } from "@/content/misc";
import { getAuthorName, getCaseStudies, getPosts, getTestimonials } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { reviewsSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: `${site.name} — IT Company in ${site.city} | Software, Cloud & IT Support`,
  description: `${site.name} is a full-service IT company in ${site.city}, India: custom software, websites, mobile apps, cloud, cybersecurity, managed IT, AI and digital marketing. Get a free consultation.`,
  path: "/",
});

const homeTech = ["React", "Next.js", "Node.js", "Python", "Flutter", "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "WordPress", "Shopify", "Odoo", "Power BI", "Claude", "Fortinet"];

export default async function HomePage() {
  const [caseStudies, testimonials, posts] = await Promise.all([getCaseStudies(), getTestimonials(), getPosts()]);
  const latest = await Promise.all(posts.slice(0, 3).map(async (p) => ({ post: p, author: await getAuthorName(p.authorSlug) })));
  const featuredQuote = testimonials.find((t) => t.id === "t2") ?? testimonials[0];

  return (
    <>
      <JsonLd data={reviewsSchema(testimonials)} />
      <Hero founded={site.founded} />
      <Stats
        items={[
          { value: site.projectsDelivered, suffix: "+", label: "Projects delivered" },
          { value: site.clientsServed, suffix: "+", label: "Clients" },
          { value: yearsInBusiness, suffix: "+", label: "Years" },
          { value: site.teamSize, suffix: "+", label: "Specialists" },
          { value: 24, suffix: "/7", label: "Support", animate: false },
        ]}
      />
      <ClientLogos />

      <section className="section" id="services">
        <div className="container">
          <SectionHeading eyebrow="Expertise" title={<>Four practices.<br /><strong>One accountable partner.</strong></>} />
          <IndexList
            items={servicesByCategory.map((g) => ({
              title: g.label,
              description: `${g.description} ${g.services.length} services.`,
              href: `/services#${g.key}`,
            }))}
          />
          <div className="mt-10">
            <Button asChild variant="outline" size="lg"><Link href="/services">Explore all 26 services <ArrowRight /></Link></Button>
          </div>
        </div>
      </section>

      <section className="section bg-sage text-deep dark:bg-secondary dark:text-foreground">
        <div className="container">
          <SectionHeading eyebrow="Our approach" title={<>Expertise you can rely on.<br /><strong>Care you can feel.</strong></>} />
          <FeatureGrid items={whyChooseUs} />
          <div className="mt-16">
            <ProcessSteps steps={homeProcess} />
          </div>
        </div>
      </section>

      {caseStudies[0] && <FeaturedCase cs={caseStudies[0]} />}

      <section className="section">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Industries" title={<>Built for <strong>your sector.</strong></>} className="mb-0" />
            <Link href="/portfolio" className="tracking-[0.04em] text-gold-dark hover:underline dark:text-gold">View all case studies →</Link>
          </div>
          <IndustriesGrid items={industries.slice(0, 8)} />
        </div>
      </section>

      <section className="section border-t border-border pt-0 md:pt-0">
        <div className="container grid gap-10 pt-20 md:pt-28 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <SectionHeading eyebrow="Technologies" title={<>Proven tools, <strong>chosen for you.</strong></>} description="We pick the right technology for your goals — never the other way round." className="mb-0" />
          <div>
            <TechGrid items={homeTech} />
            <Link href="/technologies" className="mt-8 inline-block tracking-[0.04em] text-gold-dark hover:underline dark:text-gold">
              See our full stack ({technologies.reduce((n, g) => n + g.items.length, 0)}+ tools) →
            </Link>
          </div>
        </div>
      </section>

      <section className="section border-t border-border">
        <div className="container">
          {featuredQuote && <QuoteBlock t={featuredQuote} />}
          <p className="mt-10 text-center">
            <Link href="/testimonials" className="tracking-[0.04em] text-gold-dark hover:underline dark:text-gold">Read more client stories →</Link>
          </p>
        </div>
      </section>

      <section className="section bg-sage text-deep dark:bg-secondary dark:text-foreground">
        <div className="container">
          <SectionHeading eyebrow="Engagement models" title={<>Flexible ways <strong>to work together.</strong></>} />
          <EngagementModels />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Insights" title={<>Latest <strong>thinking.</strong></>} className="mb-0" />
            <Link href="/blog" className="tracking-[0.04em] text-gold-dark hover:underline dark:text-gold">All articles →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {latest.map(({ post, author }) => <PostCard key={post.slug} post={post} authorName={author} />)}
          </div>
        </div>
      </section>

      <FaqSection faqs={homeFaqs} description="Quick answers to the questions we hear most often." />
      <CtaBanner />
    </>
  );
}

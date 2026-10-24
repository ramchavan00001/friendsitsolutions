import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { ClientLogos } from "@/components/sections/client-logos";
import { Stats } from "@/components/sections/stats";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServicesTabs } from "@/components/sections/services-tabs";
import { CaseStudyCard, PostCard } from "@/components/sections/cards";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { EngagementModels, FaqSection, FeatureGrid, IndustriesGrid, ProcessSteps, TechGrid } from "@/components/sections/blocks";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { site, yearsInBusiness } from "@/content/site";
import { servicesByCategory } from "@/content/services";
import { homeProcess, industries, technologies, whyChooseUs, whyChooseUsIcons } from "@/content/company";
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
  const serviceGroups = servicesByCategory.map((g) => ({
    key: g.key,
    label: g.label,
    description: g.description,
    services: g.services.map(({ slug, title, summary, icon }) => ({ slug, title, summary, icon })),
  }));

  return (
    <>
      <JsonLd data={reviewsSchema(testimonials)} />
      <Hero projects={site.projectsDelivered} clients={site.clientsServed} />
      <ClientLogos />
      <Stats
        items={[
          { value: site.projectsDelivered, suffix: "+", label: "Projects delivered" },
          { value: site.clientsServed, suffix: "+", label: "Happy clients" },
          { value: yearsInBusiness, suffix: "+", label: "Years of experience" },
          { value: site.teamSize, suffix: "+", label: "Tech experts" },
          { value: 24, suffix: "/7", label: "Support hours" },
        ]}
      />

      <section className="section bg-secondary/40" id="services">
        <div className="container">
          <SectionHeading
            eyebrow="What we do"
            title={<>Every IT service your business needs, <span className="gradient-text">under one roof</span></>}
            description="Build, run, secure and grow — pick a category to explore 26 services delivered by one friendly, accountable team."
          />
          <ServicesTabs groups={serviceGroups} />
          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/services">Explore all services <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Why FriendsITSolutions"
            title="A technology partner that actually feels like a friend"
            description="Big-company expertise with small-company care. Here's what our clients value most."
          />
          <FeatureGrid items={whyChooseUs} icons={whyChooseUsIcons} />
        </div>
      </section>

      <section className="section bg-secondary/40">
        <div className="container">
          <SectionHeading eyebrow="How we work" title="A proven process from idea to impact" description="Clear steps, regular demos and zero surprises — so you always know what's happening." />
          <ProcessSteps steps={homeProcess} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Case studies" title="Real results for real businesses" description="A few examples of how we've helped clients save time, cut costs and grow revenue." />
          <div className="grid gap-6 md:grid-cols-3">
            {caseStudies.slice(0, 3).map((cs) => <CaseStudyCard key={cs.slug} cs={cs} />)}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline"><Link href="/portfolio">View full portfolio <ArrowRight /></Link></Button>
          </div>
        </div>
      </section>

      <section className="section bg-secondary/40">
        <div className="container">
          <SectionHeading eyebrow="Industries" title="Solutions tailored to your industry" description="We understand the workflows, regulations and customers of the sectors we serve." />
          <IndustriesGrid items={industries.slice(0, 8)} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Technologies" title="Modern, proven technology stack" description="We pick the right tool for your goals — never the other way round." />
          <TechGrid items={homeTech} />
          <p className="mt-8 text-center text-sm">
            <Link href="/technologies" className="font-semibold text-primary dark:text-accent">See our full tech stack ({technologies.reduce((n, g) => n + g.items.length, 0)}+ tools) →</Link>
          </p>
        </div>
      </section>

      <section className="section bg-secondary/40">
        <div className="container">
          <SectionHeading eyebrow="Testimonials" title="Loved by clients across India and beyond" description="Don't just take our word for it — here's what our clients say." />
          <TestimonialsCarousel items={testimonials} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Engagement models" title="Flexible ways to work with us" description="Choose the model that fits your project, budget and pace. Switch anytime." />
          <EngagementModels />
        </div>
      </section>

      <section className="section bg-secondary/40">
        <div className="container">
          <SectionHeading eyebrow="Insights" title="Latest from our blog" description="Practical advice on technology, security and growth." />
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

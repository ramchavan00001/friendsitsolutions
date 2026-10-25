import { Link } from "@/i18n/link";
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
import { localizedIndustries, localizedServicesByCategory } from "@/i18n/content";
import { technologies } from "@/content/company";
import { getAuthorName, getCaseStudies, getPosts, getTestimonials } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { reviewsSchema } from "@/lib/schema";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/format";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const m = getDictionary(locale).meta.home;
  return buildMetadata({
  title: fmt(m.title, { name: site.name, city: site.city }),
  description: fmt(m.description, { name: site.name, city: site.city }),
  path: "/",
    locale,
  });
}

const homeTech = ["React", "Next.js", "Node.js", "Python", "Flutter", "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "WordPress", "Shopify", "Odoo", "Power BI", "Claude", "Fortinet"];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  const t = d.home;
  const [caseStudies, testimonials, posts] = await Promise.all([getCaseStudies(), getTestimonials(), getPosts()]);
  const latest = await Promise.all(posts.slice(0, 3).map(async (p) => ({ post: p, author: await getAuthorName(p.authorSlug) })));
  const featuredQuote = testimonials.find((t) => t.id === "t2") ?? testimonials[0];

  return (
    <>
      <JsonLd data={reviewsSchema(testimonials)} />
      <Hero founded={site.founded} />
      <Stats
        items={[
          { value: site.projectsDelivered, suffix: "+", label: t.stats.projects },
          { value: site.clientsServed, suffix: "+", label: t.stats.clients },
          { value: yearsInBusiness, suffix: "+", label: t.stats.years },
          { value: site.teamSize, suffix: "+", label: t.stats.team },
          { value: 24, suffix: "/7", label: t.stats.support, animate: false },
        ]}
        label={t.stats.aria}
      />
      <ClientLogos />

      <section className="section" id="services">
        <div className="container">
          <SectionHeading eyebrow={t.expertiseEyebrow} title={<>{t.expertiseA}<br /><strong>{t.expertiseB}</strong></>} />
          <IndexList
            items={localizedServicesByCategory().map((g) => ({
              title: g.label,
              description: `${g.description} ${fmt(t.servicesCount, { n: g.services.length })}`,
              href: `/services#${g.key}`,
            }))}
          />
          <div className="mt-10">
            <Button asChild variant="outline" size="lg"><Link href="/services">{t.exploreAll} <ArrowRight /></Link></Button>
          </div>
        </div>
      </section>

      <section className="section bg-sage text-deep dark:bg-secondary dark:text-foreground">
        <div className="container">
          <SectionHeading eyebrow={t.approachEyebrow} title={<>{t.approachA}<br /><strong>{t.approachB}</strong></>} />
          <FeatureGrid items={d.content.whyChooseUs} />
          <div className="mt-16">
            <ProcessSteps steps={d.content.process} />
          </div>
        </div>
      </section>

      {caseStudies[0] && <FeaturedCase cs={caseStudies[0]} />}

      <section className="section">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={t.industriesEyebrow} title={<>{t.industriesA} <strong>{t.industriesB}</strong></>} className="mb-0" />
            <Link href="/portfolio" className="tracking-[0.04em] text-gold-dark hover:underline dark:text-gold">{t.viewCaseStudies}</Link>
          </div>
          <IndustriesGrid items={localizedIndustries().slice(0, 8)} />
        </div>
      </section>

      <section className="section border-t border-border pt-0 md:pt-0">
        <div className="container grid gap-10 pt-20 md:pt-28 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <SectionHeading eyebrow={t.techEyebrow} title={<>{t.techA} <strong>{t.techB}</strong></>} description={t.techText} className="mb-0" />
          <div>
            <TechGrid items={homeTech} />
            <Link href="/technologies" className="mt-8 inline-block tracking-[0.04em] text-gold-dark hover:underline dark:text-gold">
              {fmt(t.techMore, { n: technologies.reduce((n, g) => n + g.items.length, 0) })}
            </Link>
          </div>
        </div>
      </section>

      <section className="section border-t border-border">
        <div className="container">
          {featuredQuote && <QuoteBlock t={featuredQuote} />}
          <p className="mt-10 text-center">
            <Link href="/testimonials" className="tracking-[0.04em] text-gold-dark hover:underline dark:text-gold">{t.moreStories}</Link>
          </p>
        </div>
      </section>

      <section className="section bg-sage text-deep dark:bg-secondary dark:text-foreground">
        <div className="container">
          <SectionHeading eyebrow={t.engagementEyebrow} title={<>{t.engagementA} <strong>{t.engagementB}</strong></>} />
          <EngagementModels />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={t.insightsEyebrow} title={<>{t.insightsA} <strong>{t.insightsB}</strong></>} className="mb-0" />
            <Link href="/blog" className="tracking-[0.04em] text-gold-dark hover:underline dark:text-gold">{t.allArticles}</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {latest.map(({ post, author }) => <PostCard key={post.slug} post={post} authorName={author} />)}
          </div>
        </div>
      </section>

      <FaqSection faqs={d.content.homeFaqs} description={t.faqText} />
      <CtaBanner />
    </>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCard, TestimonialCard } from "@/components/sections/cards";
import { FaqSection, FeatureGrid } from "@/components/sections/blocks";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { locationPages } from "@/content/misc";
import { services } from "@/content/services";
import { testimonials } from "@/content/portfolio";
import { whyChooseUs, whyChooseUsIcons } from "@/content/company";
import { site } from "@/content/site";
import { localBusinessSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locationPages.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = locationPages.find((l) => l.slug === slug);
  if (!page) return {};
  return buildMetadata({ title: `${page.title} | Trusted Local Experts`, description: page.intro.slice(0, 158), path: `/locations/${slug}` });
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const page = locationPages.find((l) => l.slug === slug);
  if (!page) notFound();
  const pageServices = services.filter((s) => page.serviceSlugs.includes(s.slug));
  const faqs = [
    { q: `Why choose a local partner in ${site.city}?`, a: `A local team means face-to-face meetings, faster on-site support and a partner who understands the ${site.city} market. We also serve clients across India and abroad remotely.` },
    { q: `Which areas of ${site.city} do you cover?`, a: `We serve businesses across ${site.city} and nearby areas, with on-site visits for support and installation projects.` },
    { q: "How quickly can you start?", a: "Most projects kick off within a week of approval. Urgent support requests are handled the same day." },
    { q: "Do you offer a free consultation?", a: `Yes — visit our ${site.city} office, call ${site.phone}, or book an online meeting at no cost.` },
  ];
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <PageHero eyebrow={`${site.city}, ${site.state}`} title={page.headline} description={page.intro} crumbs={[{ name: page.title, path: `/locations/${slug}` }]}>
        <Button asChild size="lg" variant="accent"><Link href="/get-a-quote">Get a Free Quote</Link></Button>
        <Button asChild size="lg" variant="ghostLight"><a href={`tel:${site.phoneHref}`}><Phone /> {site.phone}</a></Button>
      </PageHero>
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Services" title={`Our services in ${site.city}`} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pageServices.map((s) => <ServiceCard key={s.slug} slug={s.slug} title={s.title} summary={s.summary} icon={s.icon} />)}
          </div>
        </div>
      </section>
      <section className="section bg-secondary/40">
        <div className="container">
          <SectionHeading title={`Why ${site.city} businesses choose ${site.name}`} />
          <FeatureGrid items={whyChooseUs} icons={whyChooseUsIcons} />
        </div>
      </section>
      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-2">
          <TestimonialCard t={testimonials[0]} />
          <div className="rounded-sm border bg-card p-6">
            <h2 className="flex items-center gap-2 font-heading text-xl font-medium"><MapPin className="h-5 w-5 text-gold-icon dark:text-gold" aria-hidden="true" /> Visit our {site.city} office</h2>
            <address className="mt-3 not-italic text-muted-foreground">{site.streetAddress}, {site.city}, {site.state} {site.postalCode}</address>
            <iframe title={`Map of ${site.name} in ${site.city}`} src={site.mapEmbedUrl} className="mt-4 h-56 w-full rounded-sm border" loading="lazy" />
          </div>
        </div>
      </section>
      <FaqSection faqs={faqs} title={`${page.title} — FAQs`} moreLink={false} />
      <CtaBanner title={`Looking for ${page.title}? Let’s talk.`} />
    </>
  );
}

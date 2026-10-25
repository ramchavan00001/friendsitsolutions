import { Link } from "@/i18n/link";
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
import { whyChooseUsIcons } from "@/content/company";
import { site } from "@/content/site";
import { localBusinessSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/i18n/server";
import { EnglishOnlyNote } from "@/components/sections/english-only-note";
import { localizeService } from "@/i18n/content";
import { fmt } from "@/i18n/format";
import { getDictionary } from "@/i18n/dictionaries";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locationPages.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const page = locationPages.find((l) => l.slug === slug);
  if (!page) return {};
  return buildMetadata({ title: `${page.title} | Trusted Local Experts`, description: page.intro.slice(0, 158), path: `/locations/${slug}`, locale });
}

export default async function LocationPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  const t = d.pages.locations;
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
        <Button asChild size="lg" variant="accent"><Link href="/get-a-quote">{d.common.getFreeQuote}</Link></Button>
        <Button asChild size="lg" variant="ghostLight"><a href={`tel:${site.phoneHref}`}><Phone /> {site.phone}</a></Button>
      </PageHero>
      <EnglishOnlyNote />
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={t.services} title={fmt(t.servicesTitle, { city: site.city })} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pageServices.map(localizeService).map((s) => <ServiceCard key={s.slug} slug={s.slug} title={s.title} summary={s.summary} icon={s.icon} />)}
          </div>
        </div>
      </section>
      <section className="section bg-secondary/40">
        <div className="container">
          <SectionHeading title={fmt(t.why, { city: site.city, name: site.name })} />
          <FeatureGrid items={d.content.whyChooseUs} icons={whyChooseUsIcons} />
        </div>
      </section>
      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-2">
          <TestimonialCard t={testimonials[0]} />
          <div className="rounded-sm border bg-card p-6">
            <h2 className="flex items-center gap-2 font-heading text-xl font-medium"><MapPin className="h-5 w-5 text-gold-icon dark:text-gold" aria-hidden="true" /> {fmt(t.visit, { city: site.city })}</h2>
            <address className="mt-3 not-italic text-muted-foreground">{site.streetAddress}, {site.city}, {site.state} {site.postalCode}</address>
            <iframe title={fmt(t.mapTitle, { name: site.name, city: site.city })} src={site.mapEmbedUrl} className="mt-4 h-56 w-full rounded-sm border" loading="lazy" />
          </div>
        </div>
      </section>
      <FaqSection faqs={faqs} title={fmt(t.faqTitle, { title: page.title })} moreLink={false} />
      <CtaBanner title={fmt(t.cta, { title: page.title })} />
    </>
  );
}

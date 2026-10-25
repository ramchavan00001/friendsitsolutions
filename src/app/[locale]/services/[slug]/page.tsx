import { Link } from "@/i18n/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Phone, XCircle } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { CaseStudyCard, ServiceCard, TestimonialCard } from "@/components/sections/cards";
import { FaqSection, FeatureGrid, ProcessSteps, TechGrid } from "@/components/sections/blocks";
import { CtaBanner } from "@/components/sections/cta-banner";
import { EnglishOnlyNote } from "@/components/sections/english-only-note";
import { Reveal } from "@/components/sections/reveal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceCategories, services, sharedServiceFaqs } from "@/content/services";
import { site } from "@/content/site";
import { getCaseStudies, getServices, getTestimonials } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { categoryLabel, localizeService } from "@/i18n/content";
import { fmt } from "@/i18n/format";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const service = (await getServices()).find((s) => s.slug === slug);
  if (!service) return {};
  const local = localizeService(service);
  return buildMetadata({
    title: locale === "en" ? service.metaTitle : local.title,
    description: locale === "en" ? service.metaDescription : local.summary,
    path: `/services/${service.slug}`,
    locale,
  });
}

export default async function ServicePage({ params }: Props) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  const t = d.serviceDetail;
  const { slug } = await params;
  const [allServices, caseStudies, testimonials] = await Promise.all([getServices(), getCaseStudies(), getTestimonials()]);
  const service = allServices.find((s) => s.slug === slug);
  if (!service) notFound();

  const local = localizeService(service);
  const category = categoryLabel(service.category);
  const process = service.process ?? serviceCategories[service.category].process;
  const caseStudy = caseStudies.find((c) => c.slug === service.caseStudySlug);
  const testimonial = testimonials.find((x) => x.id === service.testimonialId);
  const faqs = [...service.faqs, ...sharedServiceFaqs(service.title)];
  const related = allServices.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3).map(localizeService);
  const english = locale === "en";

  return (
    <>
      <JsonLd data={serviceSchema(service)} />

      {/* 1. Hero */}
      <PageHero
        eyebrow={category.label}
        title={english ? service.heroHeadline : local.title}
        description={english ? service.heroSubheadline : local.summary}
        crumbs={[
          { name: d.ui.nav.services, path: "/services" },
          { name: local.title, path: `/services/${service.slug}` },
        ]}
      >
        <Button asChild size="lg" variant="accent">
          <Link href={`/get-a-quote?service=${service.slug}`}>{d.common.getFreeQuote} <ArrowRight /></Link>
        </Button>
        <Button asChild size="lg" variant="ghostLight">
          <a href={`tel:${site.phoneHref}`}><Phone /> {d.common.talkToExpert}</a>
        </Button>
      </PageHero>
      <EnglishOnlyNote />

      {/* 2. Problem / solution */}
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-4">{t.challenge}</p>
            <h2 className="text-3xl font-light">{t.soundFamiliar}</h2>
            <ul className="mt-6 space-y-4">
              {service.problems.map((p) => (
                <li key={p} className="flex gap-3 rounded-sm border bg-card p-4">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-sm bg-forest p-8 text-cream shadow-xl dark:bg-secondary">
              <span className="grid h-14 w-14 place-items-center rounded-sm bg-cream/10">
                <Icon name={service.icon} className="h-7 w-7" />
              </span>
              <p className="mt-6 text-sm font-medium uppercase tracking-wider text-gold">{t.ourSolution}</p>
              <h2 className="mt-2 text-3xl font-light">{fmt(t.doneRight, { title: local.title })}</h2>
              <p className="mt-4 text-lg text-[#D3DDD5]">{service.solution}</p>
              <Button asChild variant="ghostLight" className="mt-8">
                <Link href="/book-a-meeting">{d.common.bookConsultation}</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. What's included */}
      <section className="section bg-secondary/40">
        <div className="container">
          <SectionHeading eyebrow={t.included} title={<>{t.includedTitle} <strong>{local.title}</strong></>} />
          <FeatureGrid items={service.features} />
        </div>
      </section>

      {/* 4. Process */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={t.process} title={t.processTitle} description={t.processText} />
          <ProcessSteps steps={process} />
        </div>
      </section>

      {/* 5. Technologies */}
      <section className="section bg-secondary/40">
        <div className="container">
          <SectionHeading eyebrow={t.technologies} title={t.techTitle} />
          <TechGrid items={service.technologies} />
        </div>
      </section>

      {/* 6. Benefits */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={t.benefits} title={t.benefitsTitle} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((b) => (
              <div key={b.title} className="rounded-sm border bg-card p-6">
                <CheckCircle2 className="h-7 w-7 text-gold-icon dark:text-gold" aria-hidden="true" />
                <h3 className="mt-4 font-heading text-lg font-medium">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Case study + 8. Pricing */}
      <section className="section bg-secondary/40">
        <div className="container grid items-stretch gap-8 lg:grid-cols-5">
          {caseStudy && (
            <div className="lg:col-span-3">
              <p className="eyebrow mb-4">{t.relatedCase}</p>
              <CaseStudyCard cs={caseStudy} />
            </div>
          )}
          <div className="flex flex-col lg:col-span-2">
            <p className="eyebrow mb-4 self-start">{t.pricing}</p>
            <div className="flex flex-1 flex-col justify-center rounded-sm border-2 border-gold bg-card p-8 text-center shadow-lg">
              {service.startingPrice ? (
                <>
                  <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{t.startingFrom}</p>
                  <p className="mt-2 text-5xl font-extralight text-gold-dark dark:text-gold">{service.startingPrice}</p>
                  {service.priceUnit && <p className="text-sm text-muted-foreground">{service.priceUnit}</p>}
                  <p className="mt-4 text-sm text-muted-foreground">{t.priceNote}</p>
                </>
              ) : (
                <>
                  <p className="text-3xl font-light">{t.customPricing}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{t.customNote}</p>
                </>
              )}
              <Button asChild size="lg" variant="accent" className="mt-6">
                <Link href={`/get-a-quote?service=${service.slug}`}>{t.getMyQuote}</Link>
              </Button>
              <Link href="/pricing" className="mt-3 text-sm font-medium text-gold-dark underline-offset-4 hover:underline dark:text-gold">
                {t.compareModels}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQs */}
      <FaqSection faqs={faqs} title={fmt(t.faqTitle, { title: local.title })} />

      {/* 10. Testimonial */}
      {testimonial && (
        <section className="pb-16 md:pb-24">
          <div className="container max-w-3xl">
            <TestimonialCard t={testimonial} className="p-8 md:p-10" />
          </div>
        </section>
      )}

      {/* Related services (internal linking) */}
      {related.length > 0 && (
        <section className="section bg-secondary/40">
          <div className="container">
            <SectionHeading eyebrow={t.related} title={fmt(t.moreFrom, { category: category.label })} />
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((s) => <ServiceCard key={s.slug} slug={s.slug} title={s.title} summary={s.summary} icon={s.icon} />)}
            </div>
          </div>
        </section>
      )}

      {/* 11. Final CTA */}
      <CtaBanner title={fmt(t.ctaTitle, { title: local.title })} />
    </>
  );
}

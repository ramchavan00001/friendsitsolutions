import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Phone, XCircle } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { CaseStudyCard, ServiceCard, TestimonialCard } from "@/components/sections/cards";
import { FaqSection, FeatureGrid, ProcessSteps, TechGrid } from "@/components/sections/blocks";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Reveal } from "@/components/sections/reveal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { JsonLd } from "@/components/seo/json-ld";
import { serviceCategories, services, sharedServiceFaqs } from "@/content/services";
import { site } from "@/content/site";
import { getCaseStudies, getServices, getTestimonials } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = (await getServices()).find((s) => s.slug === slug);
  if (!service) return {};
  return buildMetadata({ title: service.metaTitle, description: service.metaDescription, path: `/services/${service.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const [allServices, caseStudies, testimonials] = await Promise.all([getServices(), getCaseStudies(), getTestimonials()]);
  const service = allServices.find((s) => s.slug === slug);
  if (!service) notFound();

  const category = serviceCategories[service.category];
  const process = service.process ?? category.process;
  const caseStudy = caseStudies.find((c) => c.slug === service.caseStudySlug);
  const testimonial = testimonials.find((t) => t.id === service.testimonialId);
  const faqs = [...service.faqs, ...sharedServiceFaqs(service.title)];
  const related = allServices.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={serviceSchema(service)} />

      {/* 1. Hero */}
      <PageHero
        eyebrow={category.label}
        title={service.heroHeadline}
        description={service.heroSubheadline}
        crumbs={[
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
      >
        <Button asChild size="lg" variant="accent">
          <Link href={`/get-a-quote?service=${service.slug}`}>Get a Free Quote <ArrowRight /></Link>
        </Button>
        <Button asChild size="lg" variant="white">
          <a href={`tel:${site.phoneHref}`}><Phone /> Talk to an expert</a>
        </Button>
      </PageHero>

      {/* 2. Problem / solution */}
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-4">The challenge</p>
            <h2 className="text-3xl font-bold">Sound familiar?</h2>
            <ul className="mt-6 space-y-4">
              {service.problems.map((p) => (
                <li key={p} className="flex gap-3 rounded-xl border bg-card p-4">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" aria-hidden="true" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl bg-gradient-to-br from-brand-blue to-teal-700 p-8 text-white shadow-xl">
              <span className="grid h-14 w-14 place-items-center rounded-xl bg-white/15">
                <Icon name={service.icon} className="h-7 w-7" />
              </span>
              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-teal-200">Our solution</p>
              <h2 className="mt-2 text-3xl font-bold">{service.title}, done right</h2>
              <p className="mt-4 text-lg text-blue-100">{service.solution}</p>
              <Button asChild variant="white" className="mt-8">
                <Link href="/book-a-meeting">Book a free consultation</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. What's included */}
      <section className="section bg-secondary/40">
        <div className="container">
          <SectionHeading eyebrow="What's included" title={`Our ${service.title.toLowerCase()} services`} />
          <FeatureGrid items={service.features} />
        </div>
      </section>

      {/* 4. Process */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Our process" title="How we deliver — step by step" description="A transparent process with clear milestones and regular check-ins." />
          <ProcessSteps steps={process} />
        </div>
      </section>

      {/* 5. Technologies */}
      <section className="section bg-secondary/40">
        <div className="container">
          <SectionHeading eyebrow="Technologies" title="Tools and platforms we use" />
          <TechGrid items={service.technologies} />
        </div>
      </section>

      {/* 6. Benefits */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Benefits" title="What you gain" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border bg-card p-6 shadow-sm">
                <CheckCircle2 className="h-7 w-7 text-brand-teal" aria-hidden="true" />
                <h3 className="mt-4 font-heading text-lg font-semibold">{b.title}</h3>
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
              <p className="eyebrow mb-4">Related case study</p>
              <CaseStudyCard cs={caseStudy} />
            </div>
          )}
          <div className="flex flex-col lg:col-span-2">
            <p className="eyebrow mb-4 self-start">Pricing</p>
            <div className="flex flex-1 flex-col justify-center rounded-2xl border-2 border-brand-teal bg-card p-8 text-center shadow-lg">
              {service.startingPrice ? (
                <>
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Starting from</p>
                  <p className="mt-2 font-heading text-4xl font-extrabold text-primary dark:text-accent">{service.startingPrice}</p>
                  {service.priceUnit && <p className="text-sm text-muted-foreground">{service.priceUnit}</p>}
                  <p className="mt-4 text-sm text-muted-foreground">Final price depends on scope. Get an itemised, no-obligation quote within 48 hours.</p>
                </>
              ) : (
                <>
                  <p className="font-heading text-2xl font-bold">Custom pricing</p>
                  <p className="mt-3 text-sm text-muted-foreground">Every project is unique. Tell us your requirements for a tailored quote.</p>
                </>
              )}
              <Button asChild size="lg" variant="accent" className="mt-6">
                <Link href={`/get-a-quote?service=${service.slug}`}>Get my quote</Link>
              </Button>
              <Link href="/pricing" className="mt-3 text-sm font-medium text-primary underline-offset-4 hover:underline dark:text-accent">
                Compare engagement models
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQs */}
      <FaqSection faqs={faqs} title={`${service.title} — FAQs`} />

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
            <SectionHeading eyebrow="Related services" title={`More from ${category.label}`} />
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((s) => <ServiceCard key={s.slug} slug={s.slug} title={s.title} summary={s.summary} icon={s.icon} />)}
            </div>
          </div>
        </section>
      )}

      {/* 11. Final CTA */}
      <CtaBanner title={`Ready to get started with ${service.title.toLowerCase()}?`} />
    </>
  );
}

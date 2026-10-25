import { Link } from "@/i18n/link";
import { notFound } from "next/navigation";
import { Clock, Layers } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CaseStudyCard, TestimonialCard } from "@/components/sections/cards";
import { TechGrid } from "@/components/sections/blocks";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Badge } from "@/components/ui/badge";
import { caseStudies as localCaseStudies } from "@/content/portfolio";
import { getCaseStudies, getServices, getTestimonials } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/i18n/server";
import { EnglishOnlyNote } from "@/components/sections/english-only-note";
import { localizeService } from "@/i18n/content";
import { getDictionary } from "@/i18n/dictionaries";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return localCaseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const cs = (await getCaseStudies()).find((c) => c.slug === slug);
  if (!cs) return {};
  return buildMetadata({ title: `Case Study: ${cs.title}`, description: cs.summary, path: `/portfolio/${cs.slug}`, type: "article", locale });
}

export default async function CaseStudyPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  const t = d.pages.portfolio;
  const { slug } = await params;
  const [all, services, testimonials] = await Promise.all([getCaseStudies(), getServices(), getTestimonials()]);
  const cs = all.find((c) => c.slug === slug);
  if (!cs) notFound();
  const usedServices = services.filter((s) => cs.services.includes(s.slug));
  const testimonial = testimonials.find((x) => x.id === cs.testimonialId);
  const others = all.filter((c) => c.slug !== cs.slug).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={`${cs.industry} · ${d.common.caseStudy}`}
        title={cs.title}
        description={cs.summary}
        crumbs={[{ name: d.ui.nav.portfolio, path: "/portfolio" }, { name: cs.client, path: `/portfolio/${cs.slug}` }]}
      />
      <EnglishOnlyNote />

      <section className="border-b py-10">
        <dl className="container grid grid-cols-2 gap-6 md:grid-cols-4">
          {cs.results.map((r) => (
            <div key={r.label} className="flex flex-col-reverse text-center">
              <dt className="text-sm text-muted-foreground">{r.label}</dt>
              <dd className="text-4xl font-extralight text-gold-dark dark:text-gold md:text-5xl">{r.metric}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-3">
          <article className="prose prose-slate max-w-none dark:prose-invert lg:col-span-2">
            <h2>{t.client}</h2>
            <p>{cs.client} — {cs.industry.toLowerCase()} sector.</p>
            <h2>{t.challenge}</h2>
            <p>{cs.challenge}</p>
            <h2>{t.solution}</h2>
            <p>{cs.solution}</p>
            <h2>{t.results}</h2>
            <ul>{cs.results.map((r) => <li key={r.label}><strong>{r.metric}</strong> {r.label.toLowerCase()}</li>)}</ul>
          </article>
          <aside className="space-y-6">
            <div className="rounded-sm border bg-card p-6">
              <h2 className="flex items-center gap-2 font-heading font-medium"><Clock className="h-5 w-5 text-gold-icon dark:text-gold" aria-hidden="true" /> {t.duration}</h2>
              <p className="mt-1 text-muted-foreground">{cs.duration}</p>
              <h2 className="mt-6 flex items-center gap-2 font-heading font-medium"><Layers className="h-5 w-5 text-gold-icon dark:text-gold" aria-hidden="true" /> {t.services}</h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {usedServices.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`}><Badge>{localizeService(s).title}</Badge></Link></li>)}
              </ul>
            </div>
            <div className="rounded-sm border bg-card p-6">
              <h2 className="mb-4 font-heading font-medium">{t.technologies}</h2>
              <TechGrid items={cs.technologies} />
            </div>
          </aside>
        </div>
      </section>

      {testimonial && (
        <section className="pb-16">
          <div className="container max-w-3xl"><TestimonialCard t={testimonial} className="p-8" /></div>
        </section>
      )}

      {others.length > 0 && (
        <section className="section bg-secondary/40">
          <div className="container">
            <h2 className="mb-8 text-center text-3xl font-light">{t.more}</h2>
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {others.map((c) => <CaseStudyCard key={c.slug} cs={c} />)}
            </div>
          </div>
        </section>
      )}
      <CtaBanner />
    </>
  );
}

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Icon, type IconName } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { faqSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import type { CaseStudy, FAQ, Feature, Industry, Step, Testimonial } from "@/content/types";
import { engagementModels } from "@/content/misc";

/** Items separated by a thin gold rule — no boxes. */
export function FeatureGrid({ items, icons, columns = 3 }: { items: Feature[]; icons?: IconName[]; columns?: 2 | 3 | 4 }) {
  return (
    <div className={cn("grid gap-x-14 gap-y-12 sm:grid-cols-2", columns === 3 && "lg:grid-cols-3", columns === 4 && "lg:grid-cols-4")}>
      {items.map((f, i) => (
        <Reveal key={f.title} delay={i * 0.04}>
          <div className="h-full border-t border-gold pt-6">
            {icons?.[i] && <Icon name={icons[i]} className="mb-4 h-5 w-5 text-gold-icon dark:text-gold" />}
            <h3 className="text-xl font-medium">{f.title}</h3>
            <p className="mt-2 font-light text-muted-foreground">{f.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** Numbered index of rows with large thin numerals (services, practices). */
export function IndexList({ items }: { items: { title: string; description: string; href: string }[] }) {
  return (
    <ol className="border-t border-border">
      {items.map((it, i) => (
        <li key={it.title} className="border-b border-border">
          <Link
            href={it.href}
            className="group grid grid-cols-[64px_1fr] items-center gap-x-5 gap-y-1 py-8 md:grid-cols-[120px_1.1fr_1.4fr_40px] md:gap-8"
          >
            <span className="row-span-2 text-[40px] font-extralight leading-none text-gold-dark dark:text-gold md:row-span-1 md:text-[56px]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-2xl font-normal group-hover:text-forest dark:group-hover:text-gold md:text-[28px]">{it.title}</span>
            <span className="font-light text-muted-foreground">{it.description}</span>
            <ArrowRight className="hidden h-7 w-7 text-gold-icon transition-transform group-hover:translate-x-1 dark:text-gold md:block" strokeWidth={1.4} aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ol>
  );
}

/** A bordered bar of steps; the last step is highlighted. */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="flex flex-wrap border border-border">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <li
            key={s.title}
            className={cn(
              "flex-[1_1_150px] border-b border-r border-border px-5 py-6 last:border-r-0",
              last && "bg-forest text-cream",
            )}
          >
            <span className={cn("block text-xs font-medium tracking-[0.2em]", last ? "text-gold" : "text-gold-dark dark:text-gold")}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-1 text-lg font-normal">{s.title}</h3>
            <p className={cn("mt-1 text-sm font-light", last ? "text-[#D3DDD5]" : "text-muted-foreground")}>{s.description}</p>
          </li>
        );
      })}
    </ol>
  );
}

export function IndustriesGrid({ items }: { items: Industry[] }) {
  return (
    <ul className="grid grid-cols-2 border-l border-t border-border md:grid-cols-4">
      {items.map((ind) => (
        <li key={ind.slug} className="border-b border-r border-border">
          <Link href={`/industries#${ind.slug}`} className="group flex h-full flex-col gap-4 p-7 transition-colors hover:bg-secondary">
            <Icon name={ind.icon} className="h-7 w-7 text-gold-icon dark:text-gold" strokeWidth={1.4} />
            <span className="text-lg font-normal group-hover:text-forest dark:group-hover:text-gold">{ind.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Text "logo" tiles — swap for official SVG logos where your licence allows. */
export function TechGrid({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {items.map((t) => (
        <li key={t} className="border border-border bg-card px-4 py-2 text-sm font-normal tracking-wide">
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Full-bleed forest band featuring one case study with a large gold figure. */
export function FeaturedCase({ cs }: { cs: CaseStudy }) {
  return (
    <section className="grid bg-forest text-cream lg:min-h-[480px] lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 pt-14 text-[120px] font-extralight leading-none tracking-[-0.05em] text-gold lg:border-r lg:border-forest-light lg:pt-0 lg:text-[200px]">
        {cs.results[0].metric}
      </div>
      <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-16">
        <p className="eyebrow-on-dark">Case study · {cs.industry}</p>
        <h3 className="mt-4 text-3xl font-light leading-snug md:text-4xl">{cs.title}</h3>
        <p className="mt-4 font-light text-[#C8D4CC]">{cs.summary}</p>
        <Link href={`/portfolio/${cs.slug}`} className="mt-7 self-start tracking-[0.04em] text-gold hover:underline">
          Read the case study →
        </Link>
      </div>
    </section>
  );
}

/** Centred testimonial with an oversized gold quote mark. */
export function QuoteBlock({ t }: { t: Testimonial }) {
  return (
    <figure className="mx-auto max-w-4xl text-center">
      <span className="block text-[140px] font-extralight leading-[0.6] text-gold" aria-hidden="true">&ldquo;</span>
      <blockquote className="mt-6 text-[26px] font-light leading-[1.35] md:text-[36px]">{t.quote}</blockquote>
      <figcaption className="mt-7 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {t.name} — {t.role}, {t.company}
      </figcaption>
    </figure>
  );
}

export function EngagementModels() {
  return (
    <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
      {engagementModels.map((m) => {
        const featured = "featured" in m && m.featured;
        return (
          <div key={m.name} className={cn("relative flex flex-col p-8", featured ? "bg-forest text-cream" : "bg-card")}>
            {featured && <span className="eyebrow-on-dark mb-4">Most popular</span>}
            <Icon name={m.icon} className={cn("h-7 w-7", featured ? "text-gold" : "text-gold-icon dark:text-gold")} strokeWidth={1.4} />
            <h3 className="mt-5 text-2xl font-normal">{m.name}</h3>
            <p className={cn("mt-1 text-xs uppercase tracking-[0.16em]", featured ? "text-[#B9C7BE]" : "text-muted-foreground")}>Best for: {m.bestFor}</p>
            <p className={cn("mt-4 font-light", featured ? "text-[#D3DDD5]" : "text-muted-foreground")}>{m.description}</p>
            <p className={cn("mt-5 text-2xl font-light", featured ? "text-gold" : "text-gold-dark dark:text-gold")}>{m.price}</p>
            <ul className="mt-5 flex-1 space-y-2.5 text-sm font-light">
              {m.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <Check className={cn("mt-0.5 h-4 w-4 shrink-0", featured ? "text-gold" : "text-gold-icon dark:text-gold")} aria-hidden="true" /> {f}
                </li>
              ))}
            </ul>
            <Button asChild variant={featured ? "accent" : "outline"} className="mt-8">
              <Link href="/get-a-quote">{m.cta}</Link>
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export function FaqSection({
  faqs,
  title = "Frequently asked questions",
  description,
  withSchema = true,
  moreLink = true,
}: {
  faqs: FAQ[];
  title?: string;
  description?: string;
  withSchema?: boolean;
  moreLink?: boolean;
}) {
  return (
    <section className="section">
      {withSchema && <JsonLd data={faqSchema(faqs)} />}
      <div className="container grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <SectionHeading eyebrow="FAQ" title={title} description={description} className="mb-0" />
        <div>
          <Accordion type="single" collapsible className="border-t border-border">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger className="py-6 text-lg font-normal">{f.q}</AccordionTrigger>
                <AccordionContent className="text-base font-light">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {moreLink && (
            <p className="mt-8 text-sm font-light">
              Have another question?{" "}
              <Link href="/faq" className="inline-flex items-center gap-1 tracking-[0.04em] text-gold-dark hover:underline dark:text-gold">
                See all FAQs <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

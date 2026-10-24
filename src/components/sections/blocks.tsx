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
import type { FAQ, Feature, Industry, Step } from "@/content/types";
import { engagementModels } from "@/content/misc";

export function FeatureGrid({ items, icons, columns = 3 }: { items: Feature[]; icons?: IconName[]; columns?: 2 | 3 | 4 }) {
  return (
    <div className={cn("grid gap-5 sm:grid-cols-2", columns === 3 && "lg:grid-cols-3", columns === 4 && "lg:grid-cols-4")}>
      {items.map((f, i) => (
        <Reveal key={f.title} delay={i * 0.05}>
          <div className="h-full rounded-2xl border bg-card p-6 shadow-sm">
            <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-teal-700 dark:text-accent">
              {icons?.[i] ? <Icon name={icons[i]} className="h-5 w-5" /> : <Check className="h-5 w-5" aria-hidden="true" />}
            </span>
            <h3 className="font-heading text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

const stepCols: Record<number, string> = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-6", 7: "lg:grid-cols-7" };

export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className={cn("grid gap-4 sm:grid-cols-2 md:grid-cols-3", stepCols[steps.length] ?? "lg:grid-cols-4")}>
      {steps.map((s, i) => (
        <li key={s.title} className="relative rounded-2xl border bg-card p-5 text-center shadow-sm">
          <span className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-teal font-heading font-bold text-white">
            {i + 1}
          </span>
          <h3 className="font-heading font-semibold">{s.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function IndustriesGrid({ items }: { items: Industry[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {items.map((ind) => (
        <li key={ind.slug}>
          <Link
            href={`/industries#${ind.slug}`}
            className="group flex h-full flex-col items-center rounded-2xl border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-brand-teal/50 hover:shadow-md"
          >
            <Icon name={ind.icon} className="mb-3 h-8 w-8 text-brand-teal" />
            <span className="font-heading font-semibold group-hover:text-primary dark:group-hover:text-accent">{ind.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Text "logo" tiles — swap for official SVG logos where your licence allows. */
export function TechGrid({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap justify-center gap-3">
      {items.map((t) => (
        <li key={t} className="rounded-xl border bg-card px-4 py-2.5 text-sm font-semibold shadow-sm">
          {t}
        </li>
      ))}
    </ul>
  );
}

export function EngagementModels() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {engagementModels.map((m) => {
        const featured = "featured" in m && m.featured;
        return (
          <div
            key={m.name}
            className={cn(
              "relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm",
              featured && "border-2 border-brand-teal shadow-lg",
            )}
          >
            {featured && (
              <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-accent-foreground">Most popular</span>
            )}
            <Icon name={m.icon} className="h-8 w-8 text-brand-teal" />
            <h3 className="mt-4 font-heading text-xl font-semibold">{m.name}</h3>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Best for: {m.bestFor}</p>
            <p className="mt-3 text-sm text-muted-foreground">{m.description}</p>
            <p className="mt-4 font-heading text-lg font-bold text-primary dark:text-accent">{m.price}</p>
            <ul className="mt-4 flex-1 space-y-2 text-sm">
              {m.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" aria-hidden="true" /> {f}
                </li>
              ))}
            </ul>
            <Button asChild variant={featured ? "accent" : "outline"} className="mt-6">
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
      <div className="container max-w-3xl">
        <SectionHeading eyebrow="FAQ" title={title} description={description} />
        <Accordion type="single" collapsible className="rounded-2xl border bg-card px-6 shadow-sm">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`} className={i === faqs.length - 1 ? "border-b-0" : undefined}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {moreLink && (
          <p className="mt-6 text-center text-sm">
            Have another question?{" "}
            <Link href="/faq" className="inline-flex items-center gap-1 font-semibold text-primary dark:text-accent">
              See all FAQs <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

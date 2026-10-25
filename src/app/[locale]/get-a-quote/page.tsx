import { CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { QuoteForm } from "@/components/forms/quote-form";
import { servicesByCategory } from "@/content/services";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { categoryLabel, localizeService } from "@/i18n/content";
import { fmt } from "@/i18n/format";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const m = getDictionary(locale).meta.quote;
  return buildMetadata({
    title: fmt(m.title, { name: site.name, city: site.city }),
    description: fmt(m.description, { name: site.name, city: site.city }),
    path: "/get-a-quote",
    locale,
  });
}

export default async function QuotePage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ service?: string }> }) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  const t = d.pages.quote;
  const { service } = await searchParams;
  const groups = servicesByCategory.map((g) => ({
    label: categoryLabel(g.key).label,
    services: g.services.map((s) => ({ slug: s.slug, title: s.title, label: localizeService(s).title })),
  }));
  const icons = [Clock, CheckCircle2, ShieldCheck];
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} crumbs={[{ name: d.ui.header.getFreeQuote, path: "/get-a-quote" }]} />
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-4">
          <div className="rounded-sm border bg-card p-6 md:p-8 lg:col-span-3">
            <QuoteForm groups={groups} initialService={service} />
          </div>
          <aside className="space-y-4">
            {t.perks.map(({ title, text }, i) => {
              const Icon = icons[i] ?? CheckCircle2;
              return (
                <div key={title} className="rounded-sm border bg-card p-5">
                  <Icon className="h-6 w-6 text-gold-icon dark:text-gold" aria-hidden="true" />
                  <h2 className="mt-3 font-heading font-medium">{title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                </div>
              );
            })}
            <p className="text-sm text-muted-foreground">{t.preferTalk} <a href={`tel:${site.phoneHref}`} className="font-medium text-foreground">{site.phone}</a></p>
          </aside>
        </div>
      </section>
    </>
  );
}

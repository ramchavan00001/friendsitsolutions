import { Link } from "@/i18n/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCard } from "@/components/sections/cards";
import { EngagementModels, FaqSection } from "@/components/sections/blocks";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { buildMetadata } from "@/lib/seo";
import type { IconName } from "@/components/icon";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedServicesByCategory } from "@/i18n/content";
import { fmt } from "@/i18n/format";
import { site } from "@/content/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const m = getDictionary(locale).meta.services;
  return buildMetadata({
    title: fmt(m.title, { name: site.name, city: site.city }),
    description: fmt(m.description, { name: site.name, city: site.city }),
    path: "/services",
    locale,
  });
}

const categoryIcons: Record<string, IconName> = { development: "code", cloud: "cloud", security: "shieldCheck", growth: "rocket" };

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  const t = d.servicesPage;
  const groups = localizedServicesByCategory();
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} crumbs={[{ name: d.ui.nav.services, path: "/services" }]}>
        <Button asChild size="lg" variant="accent"><Link href="/get-a-quote">{d.common.getFreeQuote} <ArrowRight /></Link></Button>
        <Button asChild size="lg" variant="ghostLight"><Link href="/book-a-meeting">{d.common.bookConsultation}</Link></Button>
      </PageHero>

      <nav aria-label={t.categoriesLabel} className="sticky top-16 z-30 border-b bg-background/95 backdrop-blur lg:top-[84px]">
        <div className="container flex gap-2 overflow-x-auto py-3">
          {groups.map((g) => (
            <a key={g.key} href={`#${g.key}`} className="flex shrink-0 items-center gap-2 rounded-sm border px-4 py-1.5 text-sm hover:bg-secondary">
              <Icon name={categoryIcons[g.key]} className="h-4 w-4 text-gold-icon dark:text-gold" /> {g.label}
            </a>
          ))}
        </div>
      </nav>

      {groups.map((g, i) => (
        <section key={g.key} id={g.key} className={`section scroll-mt-32 ${i % 2 ? "bg-secondary/40" : ""}`}>
          <div className="container">
            <SectionHeading eyebrow={fmt(t.count, { n: g.services.length })} title={g.label} description={g.description} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {g.services.map((s) => (
                <ServiceCard key={s.slug} slug={s.slug} title={s.title} summary={s.summary} icon={s.icon} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={t.engagementEyebrow} title={t.engagementTitle} description={t.engagementText} />
          <EngagementModels />
        </div>
      </section>

      <FaqSection faqs={d.content.homeFaqs} />
      <CtaBanner title={t.ctaTitle} description={t.ctaText} />
    </>
  );
}

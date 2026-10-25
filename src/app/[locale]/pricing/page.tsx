import { Link } from "@/i18n/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { EngagementModels, FaqSection } from "@/components/sections/blocks";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Button } from "@/components/ui/button";
import { amcPlans, generalFaqs } from "@/content/misc";
import { servicesByCategory } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { resolveLocale } from "@/i18n/server";
import { categoryLabel, localizeService } from "@/i18n/content";
import { getDictionary } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/format";
import { site } from "@/content/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const m = getDictionary(locale).meta.pricing;
  return buildMetadata({
  title: fmt(m.title, { name: site.name, city: site.city }),
  description: fmt(m.description, { name: site.name, city: site.city }),
  path: "/pricing",
    locale,
  });
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  const t = d.pages.pricing;
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
        crumbs={[{ name: d.ui.nav.pricing, path: "/pricing" }]}
      />

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={t.modelsEyebrow} title={t.modelsTitle} />
          <EngagementModels />
        </div>
      </section>

      <section className="section bg-secondary/40" id="amc">
        <div className="container">
          <SectionHeading eyebrow={t.amcEyebrow} title={t.amcTitle} description={t.amcText} />
          <div className="grid gap-6 lg:grid-cols-3">
            {amcPlans.map((p) => (
              <div key={p.name} className={cn("flex flex-col rounded-sm border bg-card p-7", p.featured && "border-2 border-gold shadow-lg")}>
                <h3 className="font-heading text-xl font-medium">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.description}</p>
                <p className="mt-5"><span className="text-5xl font-extralight">{p.price}</span> <span className="text-sm text-muted-foreground">{p.unit}</span></p>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                  {p.features.map((f) => <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-icon dark:text-gold" aria-hidden="true" />{f}</li>)}
                </ul>
                <Button asChild className="mt-7" variant={p.featured ? "accent" : "outline"}><Link href="/get-a-quote?service=managed-it-services">{fmt(t.choose, { plan: p.name })}</Link></Button>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">{t.gstNote}</p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-5xl">
          <SectionHeading eyebrow={t.servicePricing} title={t.servicePricingTitle} description={t.servicePricingText} />
          <div className="space-y-10">
            {servicesByCategory.map((g) => (
              <div key={g.key} className="overflow-x-auto rounded-sm border bg-card">
                <table className="w-full text-left text-sm">
                  <caption className="bg-secondary px-5 py-3 text-left font-heading font-semibold">{categoryLabel(g.key).label}</caption>
                  <thead className="sr-only"><tr><th scope="col">{t.service}</th><th scope="col">{t.startingPrice}</th></tr></thead>
                  <tbody>
                    {g.services.map((s) => (
                      <tr key={s.slug} className="border-t">
                        <th scope="row" className="px-5 py-3 font-medium"><Link href={`/services/${s.slug}`} className="hover:text-primary hover:underline dark:hover:text-accent">{localizeService(s).title}</Link></th>
                        <td className="px-5 py-3 text-right">{s.startingPrice ? <><b>{s.startingPrice}</b> <span className="text-muted-foreground">{s.priceUnit}</span></> : <Link href="/get-a-quote" className="font-semibold text-primary dark:text-accent">{t.getQuote}</Link>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection faqs={generalFaqs[1].items} title={t.faqTitle} />
      <CtaBanner title={t.ctaTitle} />
    </>
  );
}

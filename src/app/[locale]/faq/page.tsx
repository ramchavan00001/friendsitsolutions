import { PageHero } from "@/components/sections/page-hero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { generalFaqs } from "@/content/misc";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/i18n/server";
import { EnglishOnlyNote } from "@/components/sections/english-only-note";
import { getDictionary } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/format";
import { site } from "@/content/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const m = getDictionary(locale).meta.faq;
  return buildMetadata({
  title: fmt(m.title, { name: site.name, city: site.city }),
  description: fmt(m.description, { name: site.name, city: site.city }),
  path: "/faq",
    locale,
  });
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  const t = d.pages.faq;
  return (
    <>
      <JsonLd data={faqSchema(generalFaqs.flatMap((g) => g.items))} />
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} crumbs={[{ name: d.footer.links.faq, path: "/faq" }]} />
      <EnglishOnlyNote />
      <section className="section">
        <div className="container max-w-3xl space-y-12">
          {generalFaqs.map((g) => (
            <div key={g.group}>
              <h2 className="mb-4 text-2xl font-light">{g.group}</h2>
              <Accordion type="multiple" className="rounded-sm border bg-card px-6">
                {g.items.map((f, i) => (
                  <AccordionItem key={f.q} value={f.q} className={i === g.items.length - 1 ? "border-b-0" : undefined}>
                    <AccordionTrigger>{f.q}</AccordionTrigger>
                    <AccordionContent>{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>
      <CtaBanner title={t.ctaTitle} description={t.ctaText} />
    </>
  );
}

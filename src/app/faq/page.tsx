import { PageHero } from "@/components/sections/page-hero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { generalFaqs } from "@/content/misc";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description: "Answers about FriendsITSolutions services, pricing, engagement models, payment terms, support, data security and IP ownership.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(generalFaqs.flatMap((g) => g.items))} />
      <PageHero eyebrow="FAQ" title="Frequently asked questions" description="Everything you need to know about working with us. Can't find an answer? Just ask." crumbs={[{ name: "FAQ", path: "/faq" }]} />
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
      <CtaBanner title="Still have questions?" description="Talk to a real person — call, WhatsApp or send us a message and we'll get back within one business day." />
    </>
  );
}

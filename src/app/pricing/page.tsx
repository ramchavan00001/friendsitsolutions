import Link from "next/link";
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

export const metadata = buildMetadata({
  title: "Pricing & Engagement Models — Fixed, Hourly, Dedicated, AMC",
  description: "Transparent IT pricing: fixed-price projects, hourly engagements, dedicated teams and AMC / managed IT plans. See starting prices for every service.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Transparent pricing. No surprises."
        description="Choose how you'd like to work with us. Every engagement starts with a free consultation and an itemised estimate."
        crumbs={[{ name: "Pricing", path: "/pricing" }]}
      />

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Engagement models" title="Pick the model that suits you" />
          <EngagementModels />
        </div>
      </section>

      <section className="section bg-secondary/40" id="amc">
        <div className="container">
          <SectionHeading eyebrow="AMC & managed IT" title="Annual maintenance & managed IT plans" description="Predictable monthly costs, proactive maintenance and SLA-backed support." />
          <div className="grid gap-6 lg:grid-cols-3">
            {amcPlans.map((p) => (
              <div key={p.name} className={cn("flex flex-col rounded-sm border bg-card p-7", p.featured && "border-2 border-gold shadow-lg")}>
                <h3 className="font-heading text-xl font-medium">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.description}</p>
                <p className="mt-5"><span className="text-5xl font-extralight">{p.price}</span> <span className="text-sm text-muted-foreground">{p.unit}</span></p>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                  {p.features.map((f) => <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-icon dark:text-gold" aria-hidden="true" />{f}</li>)}
                </ul>
                <Button asChild className="mt-7" variant={p.featured ? "accent" : "outline"}><Link href="/get-a-quote?service=managed-it-services">Choose {p.name}</Link></Button>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">Prices exclude GST (18%). Hardware, licences and third-party costs are billed separately.</p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-5xl">
          <SectionHeading eyebrow="Service pricing" title="Starting prices by service" description="Indicative starting points — your quote will reflect your exact scope." />
          <div className="space-y-10">
            {servicesByCategory.map((g) => (
              <div key={g.key} className="overflow-x-auto rounded-sm border bg-card">
                <table className="w-full text-left text-sm">
                  <caption className="bg-secondary px-5 py-3 text-left font-heading font-semibold">{g.label}</caption>
                  <thead className="sr-only"><tr><th scope="col">Service</th><th scope="col">Starting price</th></tr></thead>
                  <tbody>
                    {g.services.map((s) => (
                      <tr key={s.slug} className="border-t">
                        <th scope="row" className="px-5 py-3 font-medium"><Link href={`/services/${s.slug}`} className="hover:text-primary hover:underline dark:hover:text-accent">{s.title}</Link></th>
                        <td className="px-5 py-3 text-right">{s.startingPrice ? <><b>{s.startingPrice}</b> <span className="text-muted-foreground">{s.priceUnit}</span></> : <Link href="/get-a-quote" className="font-semibold text-primary dark:text-accent">Get quote</Link>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection faqs={generalFaqs[1].items} title="Pricing & payment FAQs" />
      <CtaBanner title="Get a precise quote in 48 hours" />
    </>
  );
}

import { CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { QuoteForm } from "@/components/forms/quote-form";
import { servicesByCategory } from "@/content/services";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Get a Free Quote — No-Obligation IT Project Estimate",
  description: "Tell us about your project in 4 quick steps and receive a free, itemised quote from FriendsITSolutions within 48 hours.",
  path: "/get-a-quote",
});

export default async function QuotePage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const groups = servicesByCategory.map((g) => ({ label: g.label, services: g.services.map(({ slug, title }) => ({ slug, title })) }));
  return (
    <>
      <PageHero eyebrow="Free quote" title="Get a free, no-obligation quote" description="Answer a few quick questions — it takes about 2 minutes. We'll come back with a tailored proposal within 48 hours." crumbs={[{ name: "Get a Quote", path: "/get-a-quote" }]} />
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-4">
          <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8 lg:col-span-3">
            <QuoteForm groups={groups} initialService={service} />
          </div>
          <aside className="space-y-4">
            {[
              { Icon: Clock, title: "Reply within 24 hours", text: "A solutions expert will reach out to understand your needs." },
              { Icon: CheckCircle2, title: "Itemised proposal", text: "Transparent pricing with scope, milestones and timelines." },
              { Icon: ShieldCheck, title: "Your data is safe", text: "We're happy to sign an NDA. Details are used only for your quote." },
            ].map(({ Icon, title, text }) => (
              <div key={title} className="rounded-2xl border bg-card p-5 shadow-sm">
                <Icon className="h-6 w-6 text-brand-teal" aria-hidden="true" />
                <h2 className="mt-3 font-heading font-semibold">{title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
            <p className="text-sm text-muted-foreground">Prefer to talk? Call <a href={`tel:${site.phoneHref}`} className="font-semibold text-foreground">{site.phone}</a></p>
          </aside>
        </div>
      </section>
    </>
  );
}

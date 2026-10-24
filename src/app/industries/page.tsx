import Link from "next/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { industries } from "@/content/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Industries We Serve — Healthcare, Education, Retail & More",
  description: "IT solutions tailored for healthcare, education, retail, finance, manufacturing, real estate, logistics, hospitality and startups.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Technology solutions built for your industry"
        description="Every sector has its own workflows, regulations and customer expectations. We bring domain experience so you get results faster."
        crumbs={[{ name: "Industries", path: "/industries" }]}
      />
      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <article key={ind.slug} id={ind.slug} className="scroll-mt-28 rounded-2xl border bg-card p-7 shadow-sm">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-teal-700 dark:text-accent">
                <Icon name={ind.icon} className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-xl font-bold">{ind.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{ind.description}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {ind.solutions.map((s) => (
                  <li key={s} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" aria-hidden="true" />{s}</li>
                ))}
              </ul>
              <Button asChild variant="link" className="mt-4 px-0">
                <Link href={`/portfolio?industry=${encodeURIComponent(ind.name)}`}>See {ind.name.toLowerCase()} projects →</Link>
              </Button>
            </article>
          ))}
        </div>
      </section>
      <CtaBanner title="Don't see your industry?" description="We've worked across dozens of sectors. Tell us about your business and we'll show you what's possible." />
    </>
  );
}

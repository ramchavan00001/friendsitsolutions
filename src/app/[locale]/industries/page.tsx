import { Link } from "@/i18n/link";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/i18n/server";
import { localizedIndustries } from "@/i18n/content";
import { getDictionary } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/format";
import { site } from "@/content/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const m = getDictionary(locale).meta.industries;
  return buildMetadata({
  title: fmt(m.title, { name: site.name, city: site.city }),
  description: fmt(m.description, { name: site.name, city: site.city }),
  path: "/industries",
    locale,
  });
}

export default async function IndustriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  const t = d.pages.industries;
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
        crumbs={[{ name: d.ui.nav.industries, path: "/industries" }]}
      />
      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {localizedIndustries().map((ind) => (
            <article key={ind.slug} id={ind.slug} className="scroll-mt-28 rounded-sm border bg-card p-7">
              <span className="grid h-12 w-12 place-items-center rounded-sm bg-accent/15 text-gold-dark dark:text-gold">
                <Icon name={ind.icon} className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-xl font-medium">{ind.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{ind.description}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {ind.solutions.map((s) => (
                  <li key={s} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-icon dark:text-gold" aria-hidden="true" />{s}</li>
                ))}
              </ul>
              <Button asChild variant="link" className="mt-4 px-0">
                <Link href={`/portfolio?industry=${encodeURIComponent(ind.name)}`}>See {ind.name.toLowerCase()} projects →</Link>
              </Button>
            </article>
          ))}
        </div>
      </section>
      <CtaBanner title={t.ctaTitle} description={t.ctaText} />
    </>
  );
}

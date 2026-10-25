import { Link } from "@/i18n/link";
import { Briefcase, MapPin } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { CareerForm } from "@/components/forms/career-form";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { perks, values } from "@/content/company";
import { site } from "@/content/site";
import { getJobs } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/i18n/server";
import { EnglishOnlyNote } from "@/components/sections/english-only-note";
import { getDictionary } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/format";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const m = getDictionary(locale).meta.careers;
  return buildMetadata({
  title: fmt(m.title, { name: site.name, city: site.city }),
  description: fmt(m.description, { name: site.name, city: site.city }),
  path: "/careers",
    locale,
  });
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  const t = d.pages.careers;
  const jobs = await getJobs();
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} crumbs={[{ name: d.ui.nav.careers, path: "/careers" }]}>
        <Button asChild size="lg" variant="accent"><a href="#openings">{t.viewOpenings}</a></Button>
      </PageHero>
      <EnglishOnlyNote />

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={t.life} title={t.lifeTitle} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((p) => (
              <div key={p.title} className="rounded-sm border bg-card p-6">
                <Icon name={p.icon} className="h-7 w-7 text-gold-icon dark:text-gold" />
                <h3 className="mt-4 font-heading font-medium">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-sm bg-secondary/60 p-8">
            <h3 className="font-heading text-xl font-medium">{t.culture}</h3>
            <ul className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v) => <li key={v.title}><b>{v.title}.</b> <span className="text-muted-foreground">{v.description}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      <section id="openings" className="section scroll-mt-24 bg-secondary/40">
        <div className="container max-w-4xl">
          <SectionHeading eyebrow={fmt(t.openRoles, { n: jobs.length })} title={t.openPositions} />
          <ul className="space-y-4">
            {jobs.map((j) => (
              <li key={j.slug} className="flex flex-col gap-4 rounded-sm border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-heading text-lg font-medium"><Link href={`/careers/${j.slug}`} className="hover:text-primary dark:hover:text-accent">{j.title}</Link></h3>
                  <p className="mt-1 text-sm text-muted-foreground">{j.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <Badge variant="secondary"><Briefcase className="mr-1 h-3 w-3" aria-hidden="true" />{j.department}</Badge>
                    <Badge variant="secondary"><MapPin className="mr-1 h-3 w-3" aria-hidden="true" />{j.location}</Badge>
                    <Badge variant="secondary">{j.type}</Badge>
                    <Badge variant="secondary">{j.experience}</Badge>
                  </div>
                </div>
                <Button asChild variant="outline" className="shrink-0"><Link href={`/careers/${j.slug}`}>{t.viewApply}</Link></Button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">
          <SectionHeading title={t.noRole} description={fmt(t.noRoleText, { email: site.careersEmail })} />
          <div className="rounded-sm border bg-card p-6 md:p-8">
            <CareerForm positions={[...jobs.map((j) => j.title), "General application"]} defaultPosition="General application" />
          </div>
        </div>
      </section>
    </>
  );
}

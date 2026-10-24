import Link from "next/link";
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

export const metadata = buildMetadata({
  title: "Careers — Join Our Team",
  description: `Build your career at ${site.name}. Explore open roles in engineering, infrastructure and marketing in ${site.city} and remote across India.`,
  path: "/careers",
});

export default async function CareersPage() {
  const jobs = await getJobs();
  return (
    <>
      <PageHero eyebrow="Careers" title="Do your best work with friends" description="Join a team that values learning, kindness and craftsmanship — and ships work that matters." crumbs={[{ name: "Careers", path: "/careers" }]}>
        <Button asChild size="lg" variant="accent"><a href="#openings">View open positions</a></Button>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Life at FriendsIT" title="Why you'll love working here" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((p) => (
              <div key={p.title} className="rounded-2xl border bg-card p-6 shadow-sm">
                <Icon name={p.icon} className="h-7 w-7 text-brand-teal" />
                <h3 className="mt-4 font-heading font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-2xl bg-secondary/60 p-8">
            <h3 className="font-heading text-xl font-semibold">Our culture in a nutshell</h3>
            <ul className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v) => <li key={v.title}><b>{v.title}.</b> <span className="text-muted-foreground">{v.description}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      <section id="openings" className="section scroll-mt-24 bg-secondary/40">
        <div className="container max-w-4xl">
          <SectionHeading eyebrow={`${jobs.length} open roles`} title="Open positions" />
          <ul className="space-y-4">
            {jobs.map((j) => (
              <li key={j.slug} className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-heading text-lg font-semibold"><Link href={`/careers/${j.slug}`} className="hover:text-primary dark:hover:text-accent">{j.title}</Link></h3>
                  <p className="mt-1 text-sm text-muted-foreground">{j.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <Badge variant="secondary"><Briefcase className="mr-1 h-3 w-3" aria-hidden="true" />{j.department}</Badge>
                    <Badge variant="secondary"><MapPin className="mr-1 h-3 w-3" aria-hidden="true" />{j.location}</Badge>
                    <Badge variant="secondary">{j.type}</Badge>
                    <Badge variant="secondary">{j.experience}</Badge>
                  </div>
                </div>
                <Button asChild variant="outline" className="shrink-0"><Link href={`/careers/${j.slug}`}>View & apply</Link></Button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">
          <SectionHeading title="Don't see the right role?" description={`Send us your resume anyway — we're always looking for great people. Or email ${site.careersEmail}.`} />
          <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
            <CareerForm positions={[...jobs.map((j) => j.title), "General application"]} defaultPosition="General application" />
          </div>
        </div>
      </section>
    </>
  );
}

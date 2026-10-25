import { Link } from "@/i18n/link";
import { Award, Eye, Linkedin, Target } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { Stats } from "@/components/sections/stats";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Reveal } from "@/components/sections/reveal";
import { EnglishOnlyNote } from "@/components/sections/english-only-note";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { site, yearsInBusiness } from "@/content/site";
import { certifications, timeline, values } from "@/content/company";
import { getTeam } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/format";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const m = getDictionary(locale).meta.about;
  return buildMetadata({
  title: fmt(m.title, { name: site.name, city: site.city }),
  description: fmt(m.description, { name: site.name, city: site.city }),
  path: "/about",
    locale,
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale).pages.about;
  const team = await getTeam();
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        description={fmt(t.description, { year: site.founded, name: site.name })}
        crumbs={[{ name: getDictionary(locale).ui.nav.about, path: "/about" }]}
      />
      <EnglishOnlyNote />

      <section className="section">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-4">{t.story}</p>
            <h2 className="text-3xl font-light md:text-4xl">{t.storyTitle}</h2>
            {/* REPLACE with your real founding story */}
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                {site.name} began in {site.founded} when a small group of engineers noticed something: businesses had plenty of IT vendors,
                but very few technology partners they genuinely trusted. Quotes were confusing, support was slow, and nobody took ownership.
              </p>
              <p>
                So we built a different kind of IT company — one that treats every client like a friend. We explain things in plain language,
                give honest advice (even when it means a smaller invoice), and stick around long after launch day.
              </p>
              <p>
                Today our team of {site.teamSize}+ developers, designers, engineers and consultants has delivered {site.projectsDelivered}+ projects
                for clients in {site.countriesServed} countries — and we still answer the phone.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-sm bg-forest p-7 text-cream shadow-lg">
                <Target className="h-8 w-8 text-gold" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-medium">{t.mission}</h3>
                <p className="mt-2 text-[#D3DDD5]">{t.missionText}</p>
              </div>
              <div className="rounded-sm bg-forest p-7 text-cream shadow-lg sm:mt-10">
                <Eye className="h-8 w-8 text-gold" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-medium">{t.vision}</h3>
                <p className="mt-2 text-gold">{t.visionText}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Stats
        items={[
          { value: site.projectsDelivered, suffix: "+", label: t.stats.projects },
          { value: site.clientsServed, suffix: "+", label: t.stats.clients },
          { value: yearsInBusiness, suffix: "+", label: t.stats.years },
          { value: site.teamSize, suffix: "+", label: t.stats.team },
          { value: site.countriesServed, label: t.stats.countries },
        ]}
        label={getDictionary(locale).home.stats.aria}
      />

      <section className="section bg-secondary/40">
        <div className="container">
          <SectionHeading eyebrow={t.values} title={t.valuesTitle} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-sm border bg-card p-6">
                <Icon name={v.icon} className="h-8 w-8 text-gold-icon dark:text-gold" />
                <h3 className="mt-4 font-heading text-lg font-medium">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={t.leadership} title={t.team} description={t.teamNote} />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {team.map((m) => (
              <li key={m.slug} className="rounded-sm border bg-card p-6 text-center">
                <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-forest text-2xl font-light text-gold" aria-hidden="true">
                  {m.name.split(" ").map((p) => p[0]).join("")}
                </span>
                <h3 className="mt-4 font-heading font-medium">{m.name}</h3>
                <p className="text-sm text-primary dark:text-accent">{m.role}</p>
                <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
                {m.linkedin && (
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-muted-foreground hover:text-primary" aria-label={`${m.name} on LinkedIn`}>
                    <Linkedin className="h-5 w-5" aria-hidden="true" />
                  </a>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center">
            <Button asChild variant="outline"><Link href="/careers">{t.join}</Link></Button>
          </p>
        </div>
      </section>

      <section className="section bg-secondary/40">
        <div className="container max-w-4xl">
          <SectionHeading eyebrow={t.journey} title={t.journeyTitle} />
          <ol className="relative border-l-2 border-gold/40 pl-8">
            {timeline.map((item) => (
              <li key={item.year} className="relative mb-10 last:mb-0">
                <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-background bg-gold" aria-hidden="true" />
                <p className="text-sm font-medium tracking-[0.2em] text-gold-dark dark:text-gold">{item.year}</p>
                <h3 className="font-heading text-lg font-medium">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={t.certs} title={t.certsTitle} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c) => (
              <li key={c} className="flex items-center gap-3 rounded-sm border bg-card p-4 font-medium">
                <Award className="h-6 w-6 shrink-0 text-gold-icon dark:text-gold" aria-hidden="true" /> {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

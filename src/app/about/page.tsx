import Link from "next/link";
import { Award, Eye, Linkedin, Target } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { Stats } from "@/components/sections/stats";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Reveal } from "@/components/sections/reveal";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { site, yearsInBusiness } from "@/content/site";
import { certifications, timeline, values } from "@/content/company";
import { getTeam } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us — Our Story, Mission & Team",
  description: `Meet ${site.name}: a friendly, expert IT team in ${site.city} helping ${site.clientsServed}+ businesses since ${site.founded}. Our story, mission, values, team and certifications.`,
  path: "/about",
});

export default async function AboutPage() {
  const team = await getTeam();
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={<>We&apos;re the IT friends your business can count on</>}
        description={`Since ${site.founded}, ${site.name} has helped startups, schools, hospitals and enterprises use technology to work smarter, stay secure and grow faster.`}
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <section className="section">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-4">Our story</p>
            <h2 className="text-3xl font-bold md:text-4xl">Started by friends. Built on trust.</h2>
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
              <div className="rounded-2xl bg-gradient-to-br from-brand-blue to-blue-800 p-7 text-white shadow-lg">
                <Target className="h-8 w-8 text-teal-300" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-bold">Our mission</h3>
                <p className="mt-2 text-blue-100">To make reliable, secure and modern technology accessible to every business — with the care of a friend and the skill of an expert.</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 p-7 text-white shadow-lg sm:mt-10">
                <Eye className="h-8 w-8 text-teal-100" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-bold">Our vision</h3>
                <p className="mt-2 text-teal-50">To be India&apos;s most trusted technology partner for growing businesses, known for outcomes, honesty and long-term relationships.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Stats
        items={[
          { value: site.projectsDelivered, suffix: "+", label: "Projects delivered" },
          { value: site.clientsServed, suffix: "+", label: "Clients served" },
          { value: yearsInBusiness, suffix: "+", label: "Years in business" },
          { value: site.teamSize, suffix: "+", label: "Team members" },
          { value: site.countriesServed, label: "Countries served" },
        ]}
      />

      <section className="section bg-secondary/40">
        <div className="container">
          <SectionHeading eyebrow="Our values" title="What we stand for" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border bg-card p-6 shadow-sm">
                <Icon name={v.icon} className="h-8 w-8 text-brand-teal" />
                <h3 className="mt-4 font-heading text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Leadership" title="Meet the team" description="Placeholder profiles — replace with your real team and photos." />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {team.map((m) => (
              <li key={m.slug} className="rounded-2xl border bg-card p-6 text-center shadow-sm">
                <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-teal font-heading text-2xl font-bold text-white" aria-hidden="true">
                  {m.name.split(" ").map((p) => p[0]).join("")}
                </span>
                <h3 className="mt-4 font-heading font-semibold">{m.name}</h3>
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
            <Button asChild variant="outline"><Link href="/careers">Join our team</Link></Button>
          </p>
        </div>
      </section>

      <section className="section bg-secondary/40">
        <div className="container max-w-4xl">
          <SectionHeading eyebrow="Our journey" title="Milestones along the way" />
          <ol className="relative border-l-2 border-brand-teal/40 pl-8">
            {timeline.map((t) => (
              <li key={t.year} className="relative mb-10 last:mb-0">
                <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-background bg-brand-teal" aria-hidden="true" />
                <p className="font-heading text-sm font-bold text-primary dark:text-accent">{t.year}</p>
                <h3 className="font-heading text-lg font-semibold">{t.title}</h3>
                <p className="text-muted-foreground">{t.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Certifications & partnerships" title="Recognised for quality and security" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c) => (
              <li key={c} className="flex items-center gap-3 rounded-xl border bg-card p-4 font-medium shadow-sm">
                <Award className="h-6 w-6 shrink-0 text-brand-teal" aria-hidden="true" /> {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

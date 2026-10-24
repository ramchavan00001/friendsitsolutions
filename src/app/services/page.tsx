import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCard } from "@/components/sections/cards";
import { EngagementModels, FaqSection } from "@/components/sections/blocks";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { servicesByCategory, services } from "@/content/services";
import { generalFaqs } from "@/content/misc";
import { buildMetadata } from "@/lib/seo";
import type { IconName } from "@/components/icon";

export const metadata = buildMetadata({
  title: "IT Services — Software, Cloud, Security, AI & Marketing",
  description: `Explore ${services.length} IT services from FriendsITSolutions: software, web and app development, cloud and DevOps, cybersecurity, managed IT, AI automation, data analytics and digital marketing.`,
  path: "/services",
});

const categoryIcons: Record<string, IconName> = { development: "code", cloud: "cloud", security: "shieldCheck", growth: "rocket" };

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="End-to-end IT services to build, run, secure and grow your business"
        description="One friendly partner for everything technology — from your first website to enterprise cloud, 24/7 support and AI automation."
        crumbs={[{ name: "Services", path: "/services" }]}
      >
        <Button asChild size="lg" variant="accent"><Link href="/get-a-quote">Get a Free Quote <ArrowRight /></Link></Button>
        <Button asChild size="lg" variant="ghostLight"><Link href="/book-a-meeting">Book a Free Consultation</Link></Button>
      </PageHero>

      <nav aria-label="Service categories" className="sticky top-16 z-30 border-b bg-background/95 backdrop-blur lg:top-[72px]">
        <div className="container flex gap-2 overflow-x-auto py-3">
          {servicesByCategory.map((g) => (
            <a key={g.key} href={`#${g.key}`} className="flex shrink-0 items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium hover:bg-secondary">
              <Icon name={categoryIcons[g.key]} className="h-4 w-4 text-gold-icon dark:text-gold" /> {g.label}
            </a>
          ))}
        </div>
      </nav>

      {servicesByCategory.map((g, i) => (
        <section key={g.key} id={g.key} className={`section scroll-mt-32 ${i % 2 ? "bg-secondary/40" : ""}`}>
          <div className="container">
            <SectionHeading align="left" eyebrow={`${g.services.length} services`} title={g.label} description={g.description} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {g.services.map((s) => (
                <ServiceCard key={s.slug} slug={s.slug} title={s.title} summary={s.summary} icon={s.icon} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Engagement models" title="Work with us your way" description="Fixed price, hourly, a dedicated team or an annual maintenance plan." />
          <EngagementModels />
        </div>
      </section>

      <FaqSection faqs={generalFaqs[1].items.concat(generalFaqs[0].items.slice(0, 2))} />
      <CtaBanner title="Not sure which service you need?" description="Tell us about your challenge — we'll recommend the right solution, free of charge." />
    </>
  );
}

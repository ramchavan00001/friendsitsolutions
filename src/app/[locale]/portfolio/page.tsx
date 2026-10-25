import { PageHero } from "@/components/sections/page-hero";
import { PortfolioFilter } from "@/components/sections/portfolio-filter";
import { CtaBanner } from "@/components/sections/cta-banner";
import { getCaseStudies, getServices } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/i18n/server";
import { localizeService } from "@/i18n/content";
import { getDictionary } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/format";
import { site } from "@/content/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const m = getDictionary(locale).meta.portfolio;
  return buildMetadata({
  title: fmt(m.title, { name: site.name, city: site.city }),
  description: fmt(m.description, { name: site.name, city: site.city }),
  path: "/portfolio",
    locale,
  });
}

export default async function PortfolioPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ industry?: string; service?: string }> }) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  const t = d.pages.portfolio;
  const [{ industry, service }, caseStudies, services] = await Promise.all([searchParams, getCaseStudies(), getServices()]);
  const usedServices = services.filter((s) => caseStudies.some((c) => c.services.includes(s.slug))).map(localizeService).map(({ slug, title }) => ({ slug, title }));
  const industries = Array.from(new Set(caseStudies.map((c) => c.industry)));
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
        crumbs={[{ name: d.ui.nav.portfolio, path: "/portfolio" }]}
      />
      <section className="section">
        <div className="container">
          <PortfolioFilter items={caseStudies} services={usedServices} industries={industries} initialIndustry={industry ?? ""} initialService={service ?? ""} cardLabel={d.common.readCaseStudy} />
        </div>
      </section>
      <CtaBanner title={t.ctaTitle} />
    </>
  );
}

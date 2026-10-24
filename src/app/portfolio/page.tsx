import { PageHero } from "@/components/sections/page-hero";
import { PortfolioFilter } from "@/components/sections/portfolio-filter";
import { CtaBanner } from "@/components/sections/cta-banner";
import { getCaseStudies, getServices } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Portfolio & Case Studies",
  description: "Explore FriendsITSolutions case studies across healthcare, retail, education and more — filter by service and industry to see real results.",
  path: "/portfolio",
});

export default async function PortfolioPage({ searchParams }: { searchParams: Promise<{ industry?: string; service?: string }> }) {
  const [{ industry, service }, caseStudies, services] = await Promise.all([searchParams, getCaseStudies(), getServices()]);
  const usedServices = services.filter((s) => caseStudies.some((c) => c.services.includes(s.slug))).map(({ slug, title }) => ({ slug, title }));
  const industries = Array.from(new Set(caseStudies.map((c) => c.industry)));
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Case studies that speak for themselves"
        description="Placeholder projects shown below — replace them with your real client work. Filter by service or industry."
        crumbs={[{ name: "Portfolio", path: "/portfolio" }]}
      />
      <section className="section">
        <div className="container">
          <PortfolioFilter items={caseStudies} services={usedServices} industries={industries} initialIndustry={industry ?? ""} initialService={service ?? ""} />
        </div>
      </section>
      <CtaBanner title="Want results like these?" />
    </>
  );
}

import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { TechGrid } from "@/components/sections/blocks";
import { CtaBanner } from "@/components/sections/cta-banner";
import { technologies } from "@/content/company";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Technologies & Tech Stack",
  description: "The modern, proven technologies FriendsITSolutions uses: React, Next.js, Node.js, Python, Flutter, AWS, Azure, Kubernetes, Odoo, Power BI, AI and more.",
  path: "/technologies",
});

export default function TechnologiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Tech stack"
        title="The right technology for every challenge"
        description="We're technology-agnostic: we recommend what best fits your goals, budget and team — and we're certified in the platforms that matter."
        crumbs={[{ name: "Technologies", path: "/technologies" }]}
      />
      <section className="section">
        <div className="container space-y-14">
          {technologies.map((g) => (
            <div key={g.group}>
              <SectionHeading title={g.group} className="mb-6" />
              <TechGrid items={g.items} />
            </div>
          ))}
        </div>
      </section>
      <CtaBanner title="Need help choosing a tech stack?" description="Our architects will recommend the right tools for performance, cost and long-term maintainability." />
    </>
  );
}

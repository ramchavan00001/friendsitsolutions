import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { TechGrid } from "@/components/sections/blocks";
import { CtaBanner } from "@/components/sections/cta-banner";
import { technologies } from "@/content/company";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/format";
import { site } from "@/content/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const m = getDictionary(locale).meta.technologies;
  return buildMetadata({
  title: fmt(m.title, { name: site.name, city: site.city }),
  description: fmt(m.description, { name: site.name, city: site.city }),
  path: "/technologies",
    locale,
  });
}

export default async function TechnologiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  const t = d.pages.technologies;
  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
        crumbs={[{ name: d.footer.links.technologies, path: "/technologies" }]}
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
      <CtaBanner title={t.ctaTitle} description={t.ctaText} />
    </>
  );
}

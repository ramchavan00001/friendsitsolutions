import { PageHero } from "@/components/sections/page-hero";
import { TestimonialCard } from "@/components/sections/cards";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { getTestimonials } from "@/lib/cms";
import { reviewsSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/format";
import { site } from "@/content/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const m = getDictionary(locale).meta.testimonials;
  return buildMetadata({
  title: fmt(m.title, { name: site.name, city: site.city }),
  description: fmt(m.description, { name: site.name, city: site.city }),
  path: "/testimonials",
    locale,
  });
}

export default async function TestimonialsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  const t = d.pages.testimonials;
  const testimonials = await getTestimonials();
  const avg = (testimonials.reduce((sum, x) => sum + x.rating, 0) / testimonials.length).toFixed(1);
  return (
    <>
      <JsonLd data={reviewsSchema(testimonials)} />
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        description={fmt(t.description, { avg })}
        crumbs={[{ name: d.footer.links.testimonials, path: "/testimonials" }]}
      />
      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => <TestimonialCard key={t.id} t={t} />)}
        </div>
      </section>
      <CtaBanner title={t.ctaTitle} />
    </>
  );
}

import { PageHero } from "@/components/sections/page-hero";
import { TestimonialCard } from "@/components/sections/cards";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { getTestimonials } from "@/lib/cms";
import { reviewsSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Client Testimonials & Reviews",
  description: "Read what hospitals, schools, retailers, manufacturers and startups say about working with FriendsITSolutions.",
  path: "/testimonials",
});

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  const avg = (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1);
  return (
    <>
      <JsonLd data={reviewsSchema(testimonials)} />
      <PageHero
        eyebrow="Testimonials"
        title="Don't take our word for it"
        description={`Rated ${avg}/5 by our clients. Here's what they say about working with us.`}
        crumbs={[{ name: "Testimonials", path: "/testimonials" }]}
      />
      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => <TestimonialCard key={t.id} t={t} />)}
        </div>
      </section>
      <CtaBanner title="Become our next success story" />
    </>
  );
}

import { PageHero } from "@/components/sections/page-hero";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/format";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const m = getDictionary(locale).meta.book;
  return buildMetadata({
  title: fmt(m.title, { name: site.name, city: site.city }),
  description: fmt(m.description, { name: site.name, city: site.city }),
  path: "/book-a-meeting",
    locale,
  });
}

export default async function BookPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  const t = d.pages.book;
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} crumbs={[{ name: d.footer.links.book, path: "/book-a-meeting" }]} />
      <section className="section">
        <div className="container max-w-5xl">
          <div className="overflow-hidden rounded-sm border bg-card">
            {/* Cal.com inline embed. Set NEXT_PUBLIC_CAL_LINK (e.g. "your-team/30min"). For Calendly, swap the src for your Calendly URL. */}
            <iframe title={fmt(t.frame, { name: site.name })} src={`https://cal.com/${site.calLink}?embed=true&theme=auto`} className="h-[720px] w-full" loading="lazy" />
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {t.trouble} <a className="font-semibold text-foreground" href={`tel:${site.phoneHref}`}>{site.phone}</a> {t.orEmail} <a className="font-semibold text-foreground" href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}

import { Link } from "@/i18n/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SupportForm } from "@/components/forms/support-form";
import { site, whatsappLink } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/format";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const m = getDictionary(locale).meta.support;
  return buildMetadata({
  title: fmt(m.title, { name: site.name, city: site.city }),
  description: fmt(m.description, { name: site.name, city: site.city }),
  path: "/support",
    locale,
  });
}

export default async function SupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  const t = d.pages.support;
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} crumbs={[{ name: t.eyebrow, path: "/support" }]} />
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-3">
          <div className="rounded-sm border bg-card p-6 md:p-8 lg:col-span-2">
            <h2 className="mb-6 text-2xl font-light">{t.create}</h2>
            <SupportForm />
          </div>
          <aside className="space-y-4">
            <div className="rounded-sm border-2 border-red-500/40 bg-red-500/5 p-6">
              <h2 className="font-heading font-medium">{t.critical}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t.criticalText}</p>
              <a href={`tel:${site.phoneHref}`} className="mt-3 flex items-center gap-2 font-semibold"><Phone className="h-4 w-4" aria-hidden="true" />{site.phone}</a>
            </div>
            <div className="rounded-sm border bg-card p-6">
              <h2 className="font-heading font-medium">{t.other}</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href={`mailto:${site.supportEmail}`} className="flex items-center gap-2 hover:underline"><Mail className="h-4 w-4 text-gold-icon dark:text-gold" aria-hidden="true" />{site.supportEmail}</a></li>
                <li><a href={whatsappLink("Hi, I need IT support.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline"><MessageCircle className="h-4 w-4 text-gold-icon dark:text-gold" aria-hidden="true" />{t.whatsapp}</a></li>
              </ul>
            </div>
            <div className="rounded-sm border bg-card p-6">
              <h2 className="font-heading font-medium">{t.portal}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t.portalText}</p>
              <Link href="/client-portal" className="mt-3 inline-block text-sm font-semibold text-primary dark:text-accent">{t.portalLink}</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

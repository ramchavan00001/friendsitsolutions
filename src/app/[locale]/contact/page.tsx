import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { site, whatsappLink } from "@/content/site";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { localizeService } from "@/i18n/content";
import { fmt } from "@/i18n/format";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const m = getDictionary(locale).meta.contact;
  return buildMetadata({
    title: fmt(m.title, { name: site.name, city: site.city }),
    description: fmt(m.description, { name: site.name, city: site.city }),
    path: "/contact",
    locale,
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  const t = d.pages.contact;
  const cards = [
    { Icon: Phone, title: t.call, body: site.phone, href: `tel:${site.phoneHref}` },
    { Icon: MessageCircle, title: t.whatsapp, body: t.whatsappText, href: whatsappLink() },
    { Icon: Mail, title: t.email, body: site.email, href: `mailto:${site.email}` },
    { Icon: MapPin, title: t.visit, body: `${site.city}, ${site.state}`, href: "#map" },
  ];
  // English names are submitted (consistent for the team); labels are shown in the visitor's language.
  const serviceOptions = services.map((s) => ({ value: s.title, label: localizeService(s).title }));
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} crumbs={[{ name: d.ui.nav.contact, path: "/contact" }]} />
      <section className="section">
        <div className="container">
          <ul className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ Icon, title, body, href }) => (
              <li key={href}>
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex h-full items-center gap-4 rounded-sm border bg-card p-5 transition-shadow hover:shadow-md">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-sm bg-accent/15 text-gold-dark dark:text-gold"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <span><span className="block font-heading font-medium">{title}</span><span className="block text-sm text-muted-foreground">{body}</span></span>
                </a>
              </li>
            ))}
          </ul>
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="rounded-sm border bg-card p-6 md:p-8 lg:col-span-3">
              <h2 className="mb-2 text-2xl font-light">{t.send}</h2>
              <p className="mb-6 text-sm text-muted-foreground">{t.reply}</p>
              <ContactForm services={serviceOptions} />
            </div>
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-sm border bg-card p-6">
                <h2 className="flex items-center gap-2 font-heading text-lg font-medium"><Clock className="h-5 w-5 text-gold-icon dark:text-gold" aria-hidden="true" /> {t.hours}</h2>
                <dl className="mt-4 space-y-2 text-sm">
                  {site.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4"><dt className="text-muted-foreground">{h.days}</dt><dd className="text-right font-medium">{h.time}</dd></div>
                  ))}
                </dl>
              </div>
              <div className="rounded-sm border bg-card p-6">
                <h2 className="flex items-center gap-2 font-heading text-lg font-medium"><MapPin className="h-5 w-5 text-gold-icon dark:text-gold" aria-hidden="true" /> {t.office}</h2>
                <address className="mt-3 text-sm not-italic text-muted-foreground">{site.streetAddress}<br />{site.city}, {site.state} {site.postalCode}<br />{site.country}</address>
              </div>
              <div id="map" className="overflow-hidden rounded-sm border">
                <iframe title={fmt(t.map, { name: site.name })} src={site.mapEmbedUrl} className="h-72 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

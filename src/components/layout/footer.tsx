import { Link } from "@/i18n/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";
import { SocialIcons } from "./social-icons";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { site } from "@/content/site";
import { footerLinks, locationPages } from "@/content/misc";
import { localizeService } from "@/i18n/content";
import { services } from "@/content/services";
import { getT } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/format";

const popularServices = [
  "custom-software-development",
  "website-design-development",
  "mobile-app-development",
  "cloud-services",
  "cybersecurity",
  "managed-it-services",
  "ai-automation",
  "digital-marketing",
];

export function Footer() {
  const t = getT();
  const f = t.footer;
  return (
    <footer className="bg-deep font-light text-[#B9C7BE]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">{f.heading}</h2>
      <div className="container grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#B9C7BE]">
            {fmt(f.about, { name: site.name, city: site.city })}
          </p>
          <SocialIcons className="mt-6 flex gap-2" />
          <div className="mt-8">
            <p className="mb-2 text-sm font-normal text-cream">{f.tips}</p>
            <NewsletterForm />
          </div>
        </div>

        <nav aria-label={f.company} className="lg:col-span-2">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold">{f.company}</p>
          <ul className="space-y-2 text-sm">
            {footerLinks.company.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-gold">{f.links[l.key]}</Link></li>
            ))}
          </ul>
          <p className="mb-4 mt-8 text-xs font-medium uppercase tracking-[0.2em] text-gold">{f.resources}</p>
          <ul className="space-y-2 text-sm">
            {footerLinks.resources.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-gold">{f.links[l.key]}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label={f.popular} className="lg:col-span-3">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold">{f.popular}</p>
          <ul className="space-y-2 text-sm">
            {popularServices.map((slug) => {
              const s = localizeService(services.find((x) => x.slug === slug)!);
              return <li key={slug}><Link href={`/services/${slug}`} className="hover:text-gold">{s.title}</Link></li>;
            })}
            <li><Link href="/services" className="font-normal text-gold">{t.ui.nav.allServices}</Link></li>
          </ul>
          <p className="mb-4 mt-8 text-xs font-medium uppercase tracking-[0.2em] text-gold">{f.locations}</p>
          <ul className="space-y-2 text-sm">
            {locationPages.map((l) => (
              <li key={l.slug}><Link href={`/locations/${l.slug}`} className="hover:text-gold">{l.title}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-gold">{f.contact}</p>
          <address className="space-y-3 text-sm not-italic">
            <p className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />{site.streetAddress}, {site.city}, {site.state} {site.postalCode}, {site.country}</p>
            <p className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" /><a href={`tel:${site.phoneHref}`} className="hover:text-gold">{site.phone}</a></p>
            <p className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" /><a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a></p>
            <div className="flex gap-3">
              <Clock className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <ul>
                {site.hours.map((h) => <li key={h.days}>{h.days}: {h.time}</li>)}
              </ul>
            </div>
          </address>
        </div>
      </div>

      <div className="border-t border-forest-light">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-[#B9C7BE] md:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. {f.rights}</p>
          <ul className="flex flex-wrap justify-center gap-4">
            {footerLinks.legal.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-gold">{f.links[l.key]}</Link></li>
            ))}
            <li><Link href="/sitemap.xml" className="hover:text-gold">{f.sitemap}</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

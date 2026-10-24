import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";
import { SocialIcons } from "./social-icons";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { site } from "@/content/site";
import { footerLinks, locationPages } from "@/content/misc";
import { services } from "@/content/services";

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
  return (
    <footer className="bg-slate-950 text-slate-300" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            {site.name} is a full-service IT company in {site.city}, helping startups, SMEs, schools, hospitals and enterprises across
            India and worldwide build, run and secure their technology. {site.tagline}.
          </p>
          <SocialIcons className="mt-6 flex gap-2" />
          <div className="mt-8">
            <p className="mb-2 text-sm font-semibold text-white">Get practical tech tips monthly</p>
            <NewsletterForm />
          </div>
        </div>

        <nav aria-label="Company" className="lg:col-span-2">
          <p className="mb-4 text-sm font-semibold text-white">Company</p>
          <ul className="space-y-2 text-sm">
            {footerLinks.company.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-brand-teal">{l.label}</Link></li>
            ))}
          </ul>
          <p className="mb-4 mt-8 text-sm font-semibold text-white">Resources</p>
          <ul className="space-y-2 text-sm">
            {footerLinks.resources.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-brand-teal">{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services" className="lg:col-span-3">
          <p className="mb-4 text-sm font-semibold text-white">Popular services</p>
          <ul className="space-y-2 text-sm">
            {popularServices.map((slug) => {
              const s = services.find((x) => x.slug === slug)!;
              return <li key={slug}><Link href={`/services/${slug}`} className="hover:text-brand-teal">{s.title}</Link></li>;
            })}
            <li><Link href="/services" className="font-semibold text-brand-teal">All services →</Link></li>
          </ul>
          <p className="mb-4 mt-8 text-sm font-semibold text-white">Locations</p>
          <ul className="space-y-2 text-sm">
            {locationPages.map((l) => (
              <li key={l.slug}><Link href={`/locations/${l.slug}`} className="hover:text-brand-teal">{l.title}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="mb-4 text-sm font-semibold text-white">Contact us</p>
          <address className="space-y-3 text-sm not-italic">
            <p className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-brand-teal" aria-hidden="true" />{site.streetAddress}, {site.city}, {site.state} {site.postalCode}, {site.country}</p>
            <p className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-brand-teal" aria-hidden="true" /><a href={`tel:${site.phoneHref}`} className="hover:text-brand-teal">{site.phone}</a></p>
            <p className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-brand-teal" aria-hidden="true" /><a href={`mailto:${site.email}`} className="hover:text-brand-teal">{site.email}</a></p>
            <div className="flex gap-3">
              <Clock className="h-5 w-5 shrink-0 text-brand-teal" aria-hidden="true" />
              <ul>
                {site.hours.map((h) => <li key={h.days}>{h.days}: {h.time}</li>)}
              </ul>
            </div>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate-400 md:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <ul className="flex flex-wrap justify-center gap-4">
            {footerLinks.legal.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-brand-teal">{l.label}</Link></li>
            ))}
            <li><Link href="/sitemap.xml" className="hover:text-brand-teal">Sitemap</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

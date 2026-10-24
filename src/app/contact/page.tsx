import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { site, whatsappLink } from "@/content/site";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us — Call, WhatsApp or Visit Our Office",
  description: `Contact ${site.name} in ${site.city}. Call ${site.phone}, WhatsApp us, email ${site.email} or send a message — we reply within one business day.`,
  path: "/contact",
});

export default function ContactPage() {
  const cards = [
    { Icon: Phone, title: "Call us", body: site.phone, href: `tel:${site.phoneHref}` },
    { Icon: MessageCircle, title: "WhatsApp", body: "Chat with us instantly", href: whatsappLink() },
    { Icon: Mail, title: "Email", body: site.email, href: `mailto:${site.email}` },
    { Icon: MapPin, title: "Visit", body: `${site.city}, ${site.state}`, href: "#map" },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk about your project" description="Whether it's a quick question or a big idea, our friendly team is here to help." crumbs={[{ name: "Contact", path: "/contact" }]} />
      <section className="section">
        <div className="container">
          <ul className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ Icon, title, body, href }) => (
              <li key={title}>
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex h-full items-center gap-4 rounded-sm border bg-card p-5 transition-shadow hover:shadow-md">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-sm bg-accent/15 text-gold-dark dark:text-gold"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <span><span className="block font-heading font-semibold">{title}</span><span className="block text-sm text-muted-foreground">{body}</span></span>
                </a>
              </li>
            ))}
          </ul>
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="rounded-sm border bg-card p-6 md:p-8 lg:col-span-3">
              <h2 className="mb-2 text-2xl font-light">Send us a message</h2>
              <p className="mb-6 text-sm text-muted-foreground">We&apos;ll get back to you within one business day.</p>
              <ContactForm services={services.map((s) => s.title)} />
            </div>
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-sm border bg-card p-6">
                <h2 className="flex items-center gap-2 font-heading text-lg font-medium"><Clock className="h-5 w-5 text-gold-icon dark:text-gold" aria-hidden="true" /> Office hours</h2>
                <dl className="mt-4 space-y-2 text-sm">
                  {site.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4"><dt className="text-muted-foreground">{h.days}</dt><dd className="text-right font-medium">{h.time}</dd></div>
                  ))}
                </dl>
              </div>
              <div className="rounded-sm border bg-card p-6">
                <h2 className="flex items-center gap-2 font-heading text-lg font-medium"><MapPin className="h-5 w-5 text-gold-icon dark:text-gold" aria-hidden="true" /> Our office</h2>
                <address className="mt-3 text-sm not-italic text-muted-foreground">{site.streetAddress}<br />{site.city}, {site.state} {site.postalCode}<br />{site.country}</address>
              </div>
              <div id="map" className="overflow-hidden rounded-sm border">
                <iframe title={`Map showing ${site.name} office`} src={site.mapEmbedUrl} className="h-72 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

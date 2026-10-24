import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SupportForm } from "@/components/forms/support-form";
import { site, whatsappLink } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "IT Support — Raise a Support Ticket",
  description: "Existing client? Raise a support ticket for hardware, network, email, website, software or security issues and our engineers will respond per your SLA.",
  path: "/support",
});

export default function SupportPage() {
  return (
    <>
      <PageHero eyebrow="Support" title="How can we help today?" description="Raise a ticket and our engineers will get on it. For critical outages, please call us as well." crumbs={[{ name: "Support", path: "/support" }]} />
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-3">
          <div className="rounded-sm border bg-card p-6 md:p-8 lg:col-span-2">
            <h2 className="mb-6 text-2xl font-light">Create a support ticket</h2>
            <SupportForm />
          </div>
          <aside className="space-y-4">
            <div className="rounded-sm border-2 border-red-500/40 bg-red-500/5 p-6">
              <h2 className="font-heading font-medium">Critical outage?</h2>
              <p className="mt-1 text-sm text-muted-foreground">Call our priority line for immediate help.</p>
              <a href={`tel:${site.phoneHref}`} className="mt-3 flex items-center gap-2 font-semibold"><Phone className="h-4 w-4" aria-hidden="true" />{site.phone}</a>
            </div>
            <div className="rounded-sm border bg-card p-6">
              <h2 className="font-heading font-medium">Other ways to reach support</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href={`mailto:${site.supportEmail}`} className="flex items-center gap-2 hover:underline"><Mail className="h-4 w-4 text-gold-icon dark:text-gold" aria-hidden="true" />{site.supportEmail}</a></li>
                <li><a href={whatsappLink("Hi, I need IT support.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline"><MessageCircle className="h-4 w-4 text-gold-icon dark:text-gold" aria-hidden="true" />WhatsApp support</a></li>
              </ul>
            </div>
            <div className="rounded-sm border bg-card p-6">
              <h2 className="font-heading font-medium">Client portal</h2>
              <p className="mt-1 text-sm text-muted-foreground">Track tickets, invoices and AMC details.</p>
              <Link href="/client-portal" className="mt-3 inline-block text-sm font-semibold text-primary dark:text-accent">Go to client portal →</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

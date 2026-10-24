import Link from "next/link";
import { FileText, LifeBuoy, Lock, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Client Portal Login",
  description: "Log in to the FriendsITSolutions client portal to view support tickets, invoices and AMC details.",
  path: "/client-portal",
  noIndex: true,
});

/**
 * PLACEHOLDER: the portal itself is not built yet. Wire this form to your auth provider
 * (e.g. Supabase Auth magic links) and build /client-portal/dashboard behind it.
 */
export default function ClientPortalPage() {
  return (
    <>
      <PageHero eyebrow="Clients" title="Client portal" description="View tickets, invoices and service reports in one place." crumbs={[{ name: "Client Portal", path: "/client-portal" }]} />
      <section className="section">
        <div className="container grid items-start gap-10 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-md rounded-sm border bg-card p-8">
            <Lock className="h-8 w-8 text-gold-icon dark:text-gold" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-light">Sign in</h2>
            <p className="mt-1 text-sm text-muted-foreground">The client portal is coming soon. Existing clients can raise tickets via the support page in the meantime.</p>
            <form className="mt-6 space-y-4" aria-describedby="portal-note">
              <div className="space-y-1.5"><Label htmlFor="p-email">Email</Label><Input id="p-email" type="email" autoComplete="email" disabled /></div>
              <div className="space-y-1.5"><Label htmlFor="p-pass">Password</Label><Input id="p-pass" type="password" autoComplete="current-password" disabled /></div>
              <Button type="button" className="w-full" disabled>Sign in</Button>
              <p id="portal-note" className="text-center text-xs text-muted-foreground">Portal login will be enabled soon.</p>
            </form>
          </div>
          <div className="space-y-4">
            {[
              { Icon: LifeBuoy, title: "Support tickets", text: "Raise, track and comment on tickets with live status updates." },
              { Icon: FileText, title: "Invoices & payments", text: "Download invoices, view payment history and pay online." },
              { Icon: ShieldCheck, title: "AMC & assets", text: "See covered devices, SLA details and maintenance reports." },
            ].map(({ Icon, title, text }) => (
              <div key={title} className="flex gap-4 rounded-sm border bg-card p-5">
                <Icon className="h-6 w-6 shrink-0 text-gold-icon dark:text-gold" aria-hidden="true" />
                <div><h3 className="font-heading font-medium">{title}</h3><p className="text-sm text-muted-foreground">{text}</p></div>
              </div>
            ))}
            <Button asChild variant="accent"><Link href="/support">Raise a support ticket now</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}

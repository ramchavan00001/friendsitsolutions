import { Link } from "@/i18n/link";
import { FileText, LifeBuoy, Lock, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  return buildMetadata({
  title: "Client Portal Login",
  description: "Log in to the FriendsITSolutions client portal to view support tickets, invoices and AMC details.",
  path: "/client-portal",
  noIndex: true,
    locale,
  });
}

/**
 * PLACEHOLDER: the portal itself is not built yet. Wire this form to your auth provider
 * (e.g. Supabase Auth magic links) and build /client-portal/dashboard behind it.
 */
export default async function ClientPortalPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  const t = d.pages.portal;
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} crumbs={[{ name: d.footer.links.portal, path: "/client-portal" }]} />
      <section className="section">
        <div className="container grid items-start gap-10 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-md rounded-sm border bg-card p-8">
            <Lock className="h-8 w-8 text-gold-icon dark:text-gold" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-light">{t.signIn}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t.soon}</p>
            <form className="mt-6 space-y-4" aria-describedby="portal-note">
              <div className="space-y-1.5"><Label htmlFor="p-email">{t.email}</Label><Input id="p-email" type="email" autoComplete="email" disabled /></div>
              <div className="space-y-1.5"><Label htmlFor="p-pass">{t.password}</Label><Input id="p-pass" type="password" autoComplete="current-password" disabled /></div>
              <Button type="button" className="w-full" disabled>{t.signIn}</Button>
              <p id="portal-note" className="text-center text-xs text-muted-foreground">{t.enabledSoon}</p>
            </form>
          </div>
          <div className="space-y-4">
            {t.features.map(({ title, text }, i) => ({ Icon: [LifeBuoy, FileText, ShieldCheck][i] ?? LifeBuoy, title, text })).map(({ Icon, title, text }) => (
              <div key={title} className="flex gap-4 rounded-sm border bg-card p-5">
                <Icon className="h-6 w-6 shrink-0 text-gold-icon dark:text-gold" aria-hidden="true" />
                <div><h3 className="font-heading font-medium">{title}</h3><p className="text-sm text-muted-foreground">{text}</p></div>
              </div>
            ))}
            <Button asChild variant="accent"><Link href="/support">{t.raise}</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}

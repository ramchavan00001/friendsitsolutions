import { Link } from "@/i18n/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site, whatsappLink } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/i18n/server";
import { fmt } from "@/i18n/format";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  return buildMetadata({ title: "Thank You", description: "Thanks for contacting FriendsITSolutions.", path: "/thank-you", noIndex: true,
    locale,
  });
}

export default async function ThankYouPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ type?: string; ref?: string }> }) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  const t = d.pages.thankYou;
  const { type, ref } = await searchParams;
  const copy: Record<string, { title: string; body: string }> = t.types;
  const c = copy[type ?? "contact"] ?? copy.contact;
  return (
    <section className="section">
      <div className="container max-w-2xl text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-gold-icon dark:text-gold" aria-hidden="true" />
        <h1 className="mt-6 text-4xl font-light">{c.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{c.body}</p>
        {ref && <p className="mt-4 inline-block rounded-sm bg-secondary px-4 py-2 font-mono text-sm">{fmt(t.reference, { ref: ref.slice(0, 40) })}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild><Link href="/">{t.home}</Link></Button>
          <Button asChild variant="outline"><Link href="/portfolio">{t.work}</Link></Button>
          <Button asChild variant="outline"><a href={whatsappLink()} target="_blank" rel="noopener noreferrer">{t.whatsapp}</a></Button>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">{t.talkNow} <a href={`tel:${site.phoneHref}`} className="font-semibold text-foreground">{site.phone}</a></p>
      </div>
    </section>
  );
}

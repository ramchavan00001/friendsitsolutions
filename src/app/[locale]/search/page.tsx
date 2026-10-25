import { Link } from "@/i18n/link";
import { Search } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteSearch } from "@/lib/search";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/i18n/server";
import { localizePath } from "@/i18n/config";
import { fmt } from "@/i18n/format";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  return buildMetadata({ title: "Search", description: "Search FriendsITSolutions services, case studies, articles and FAQs.", path: "/search", noIndex: true,
    locale,
  });
}

export default async function SearchPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ q?: string }> }) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  const t = d.pages.search;
  const { q = "" } = await searchParams;
  const query = q.trim().slice(0, 100);
  const results = query ? siteSearch(query) : [];
  return (
    <>
      <PageHero title={t.title} crumbs={[{ name: t.title, path: "/search" }]} />
      <section className="section">
        <div className="container max-w-3xl">
          <form action={localizePath(locale, "/search")} method="get" role="search" className="flex gap-2">
            <label htmlFor="site-search" className="sr-only">{t.label}</label>
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <input id="site-search" name="q" type="search" defaultValue={query} autoFocus placeholder={t.placeholder} className="h-12 w-full rounded-sm border border-input bg-background pl-11 pr-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
            </div>
            <Button type="submit" size="lg">{t.button}</Button>
          </form>
          {query && (
            <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">{results.length === 1 ? t.result : fmt(t.results, { n: results.length })} <b className="text-foreground">“{query}”</b></p>
          )}
          <ul className="mt-6 space-y-4">
            {results.map((r) => (
              <li key={r.href + r.title} className="rounded-sm border bg-card p-5">
                <Badge variant="secondary">{t.types[r.type] ?? r.type}</Badge>
                <h2 className="mt-2 font-heading text-lg font-medium"><Link href={r.href} className="hover:text-primary hover:underline dark:hover:text-accent">{r.title}</Link></h2>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.excerpt}</p>
              </li>
            ))}
          </ul>
          {query && !results.length && (
            <p className="mt-6 rounded-sm border border-dashed p-8 text-center text-muted-foreground">
              {t.none} <Link href="/contact" className="font-semibold text-primary underline dark:text-accent">{t.ask}</Link>.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { Search } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteSearch } from "@/lib/search";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Search", description: "Search FriendsITSolutions services, case studies, articles and FAQs.", path: "/search", noIndex: true });

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const query = q.trim().slice(0, 100);
  const results = query ? siteSearch(query) : [];
  return (
    <>
      <PageHero title="Search" crumbs={[{ name: "Search", path: "/search" }]} />
      <section className="section">
        <div className="container max-w-3xl">
          <form action="/search" method="get" role="search" className="flex gap-2">
            <label htmlFor="site-search" className="sr-only">Search the site</label>
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <input id="site-search" name="q" type="search" defaultValue={query} autoFocus placeholder="Try “cloud migration”, “CCTV” or “pricing”" className="h-12 w-full rounded-sm border border-input bg-background pl-11 pr-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
            </div>
            <Button type="submit" size="lg">Search</Button>
          </form>
          {query && (
            <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">{results.length} result{results.length === 1 ? "" : "s"} for <b className="text-foreground">“{query}”</b></p>
          )}
          <ul className="mt-6 space-y-4">
            {results.map((r) => (
              <li key={r.href + r.title} className="rounded-sm border bg-card p-5">
                <Badge variant="secondary">{r.type}</Badge>
                <h2 className="mt-2 font-heading text-lg font-medium"><Link href={r.href} className="hover:text-primary hover:underline dark:hover:text-accent">{r.title}</Link></h2>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.excerpt}</p>
              </li>
            ))}
          </ul>
          {query && !results.length && (
            <p className="mt-6 rounded-sm border border-dashed p-8 text-center text-muted-foreground">
              Nothing found. Try different keywords, or <Link href="/contact" className="font-semibold text-primary underline dark:text-accent">ask our team</Link>.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

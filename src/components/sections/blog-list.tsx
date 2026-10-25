import { Link } from "@/i18n/link";
import { Search } from "lucide-react";
import { PostCard } from "./cards";
import { blogCategories, blogTags } from "@/content/blog";
import type { BlogPost } from "@/content/types";
import { cn } from "@/lib/utils";
import { getT } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/request";
import { localizePath } from "@/i18n/config";

export function BlogList({
  posts,
  authors,
  activeCategory,
  activeTag,
  query,
}: {
  posts: BlogPost[];
  authors: Record<string, string>;
  activeCategory?: string;
  activeTag?: string;
  query?: string;
}) {
  const t = getT().pages.blog;
  return (
    <div className="grid gap-10 lg:grid-cols-4">
      <div className="lg:col-span-3">
        {posts.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((p) => <PostCard key={p.slug} post={p} authorName={authors[p.authorSlug] ?? "FriendsITSolutions Team"} />)}
          </div>
        ) : (
          <p className="rounded-sm border border-dashed p-10 text-center text-muted-foreground">{t.empty}</p>
        )}
      </div>
      <aside className="space-y-8">
        <form action={localizePath(getLocale(), "/blog")} method="get" role="search" className="relative">
          <label htmlFor="blog-search" className="sr-only">{t.searchLabel}</label>
          <input id="blog-search" name="q" type="search" defaultValue={query} placeholder={t.searchPh} className="h-11 w-full rounded-sm border border-input bg-background pl-10 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </form>
        <nav aria-label={t.categories}>
          <h2 className="mb-3 font-heading font-medium">{t.categories}</h2>
          <ul className="space-y-1 text-sm">
            <li><Link href="/blog" className={cn("block rounded-sm px-3 py-1.5 hover:bg-secondary", !activeCategory && !activeTag && !query && "bg-secondary font-medium")}>{t.all}</Link></li>
            {blogCategories.map((c) => (
              <li key={c.slug}>
                <Link href={`/blog/category/${c.slug}`} className={cn("block rounded-sm px-3 py-1.5 hover:bg-secondary", activeCategory === c.slug && "bg-secondary font-medium")}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t.tags}>
          <h2 className="mb-3 font-heading font-medium">{t.tags}</h2>
          <ul className="flex flex-wrap gap-2">
            {blogTags.map((tag) => (
              <li key={tag.slug}>
                <Link href={`/blog/tag/${tag.slug}`} className={cn("inline-block rounded-sm border px-3 py-1 text-xs hover:bg-secondary", activeTag === tag.slug && "border-primary bg-primary text-primary-foreground")}>#{tag.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}

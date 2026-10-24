import Link from "next/link";
import { Search } from "lucide-react";
import { PostCard } from "./cards";
import { blogCategories, blogTags } from "@/content/blog";
import type { BlogPost } from "@/content/types";
import { cn } from "@/lib/utils";

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
  return (
    <div className="grid gap-10 lg:grid-cols-4">
      <div className="lg:col-span-3">
        {posts.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((p) => <PostCard key={p.slug} post={p} authorName={authors[p.authorSlug] ?? "FriendsITSolutions Team"} />)}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">No articles found{query ? ` for “${query}”` : ""}. Try another search.</p>
        )}
      </div>
      <aside className="space-y-8">
        <form action="/blog" method="get" role="search" className="relative">
          <label htmlFor="blog-search" className="sr-only">Search articles</label>
          <input id="blog-search" name="q" type="search" defaultValue={query} placeholder="Search articles…" className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </form>
        <nav aria-label="Blog categories">
          <h2 className="mb-3 font-heading font-semibold">Categories</h2>
          <ul className="space-y-1 text-sm">
            <li><Link href="/blog" className={cn("block rounded-md px-3 py-1.5 hover:bg-secondary", !activeCategory && !activeTag && !query && "bg-secondary font-semibold")}>All articles</Link></li>
            {blogCategories.map((c) => (
              <li key={c.slug}>
                <Link href={`/blog/category/${c.slug}`} className={cn("block rounded-md px-3 py-1.5 hover:bg-secondary", activeCategory === c.slug && "bg-secondary font-semibold")}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Blog tags">
          <h2 className="mb-3 font-heading font-semibold">Tags</h2>
          <ul className="flex flex-wrap gap-2">
            {blogTags.map((t) => (
              <li key={t.slug}>
                <Link href={`/blog/tag/${t.slug}`} className={cn("inline-block rounded-full border px-3 py-1 text-xs hover:bg-secondary", activeTag === t.slug && "border-primary bg-primary text-primary-foreground")}>#{t.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}

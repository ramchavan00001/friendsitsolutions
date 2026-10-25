import { PageHero } from "@/components/sections/page-hero";
import { BlogList } from "@/components/sections/blog-list";
import { blogData, searchPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/format";
import { site } from "@/content/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const m = getDictionary(locale).meta.blog;
  return buildMetadata({
  title: fmt(m.title, { name: site.name, city: site.city }),
  description: fmt(m.description, { name: site.name, city: site.city }),
  path: "/blog",
    locale,
  });
}

export default async function BlogPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ q?: string }> }) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  const t = d.pages.blog;
  const [{ q }, { posts, authors }] = await Promise.all([searchParams, blogData()]);
  const query = q?.trim().slice(0, 100);
  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} crumbs={[{ name: d.ui.nav.blog, path: "/blog" }]} />
      <section className="section">
        <div className="container">
          {query && <p className="mb-6 text-muted-foreground" aria-live="polite">{t.results} <b className="text-foreground">“{query}”</b></p>}
          <BlogList posts={query ? searchPosts(posts, query) : posts} authors={authors} query={query} />
        </div>
      </section>
    </>
  );
}

import { PageHero } from "@/components/sections/page-hero";
import { BlogList } from "@/components/sections/blog-list";
import { blogData, searchPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog & Insights — Tech Tips for Growing Businesses",
  description: "Practical articles on websites, software, cloud, cybersecurity, AI and digital marketing from the FriendsITSolutions team.",
  path: "/blog",
});

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const [{ q }, { posts, authors }] = await Promise.all([searchParams, blogData()]);
  const query = q?.trim().slice(0, 100);
  return (
    <>
      <PageHero eyebrow="Insights" title="Blog & insights" description="Honest, practical advice to help you make better technology decisions." crumbs={[{ name: "Blog", path: "/blog" }]} />
      <section className="section">
        <div className="container">
          {query && <p className="mb-6 text-muted-foreground" aria-live="polite">Search results for <b className="text-foreground">“{query}”</b></p>}
          <BlogList posts={query ? searchPosts(posts, query) : posts} authors={authors} query={query} />
        </div>
      </section>
    </>
  );
}

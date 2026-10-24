import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { BlogList } from "@/components/sections/blog-list";
import { blogTags } from "@/content/blog";
import { blogData, postsWithTag } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogTags.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tag = blogTags.find((t) => t.slug === slug);
  if (!tag) return {};
  return buildMetadata({ title: `#${tag.name} — Articles`, description: `FriendsITSolutions articles tagged ${tag.name}.`, path: `/blog/tag/${slug}` });
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const tag = blogTags.find((t) => t.slug === slug);
  if (!tag) notFound();
  const { posts, authors } = await blogData();
  return (
    <>
      <PageHero eyebrow="Tag" title={`#${tag.name}`} crumbs={[{ name: "Blog", path: "/blog" }, { name: `#${tag.name}`, path: `/blog/tag/${slug}` }]} />
      <section className="section"><div className="container"><BlogList posts={postsWithTag(posts, slug)} authors={authors} activeTag={slug} /></div></section>
    </>
  );
}

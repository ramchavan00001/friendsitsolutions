import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { BlogList } from "@/components/sections/blog-list";
import { blogCategories } from "@/content/blog";
import { blogData, postsInCategory } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const cat = blogCategories.find((c) => c.slug === slug);
  if (!cat) return {};
  return buildMetadata({ title: `${cat.name} Articles`, description: `Articles and guides about ${cat.name.toLowerCase()} from the FriendsITSolutions blog.`, path: `/blog/category/${slug}` });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = blogCategories.find((c) => c.slug === slug);
  if (!cat) notFound();
  const { posts, authors } = await blogData();
  return (
    <>
      <PageHero eyebrow="Category" title={cat.name} crumbs={[{ name: "Blog", path: "/blog" }, { name: cat.name, path: `/blog/category/${slug}` }]} />
      <section className="section"><div className="container"><BlogList posts={postsInCategory(posts, slug)} authors={authors} activeCategory={slug} /></div></section>
    </>
  );
}

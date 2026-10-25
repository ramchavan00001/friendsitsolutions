import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { BlogList } from "@/components/sections/blog-list";
import { team as localTeam } from "@/content/company";
import { blogData } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/i18n/server";
import { fmt } from "@/i18n/format";
import { getDictionary } from "@/i18n/dictionaries";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return localTeam.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const author = localTeam.find((m) => m.slug === slug);
  if (!author) return {};
  return buildMetadata({ title: `${author.name}, ${author.role} — Articles`, description: author.bio, path: `/blog/author/${slug}`, locale });
}

export default async function AuthorPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  const t = d.pages.blog;
  const { slug } = await params;
  const { posts, team, authors } = await blogData();
  const author = team.find((m) => m.slug === slug);
  if (!author) notFound();
  const theirs = posts.filter((p) => p.authorSlug === slug);
  return (
    <>
      <PageHero eyebrow={author.role} title={author.name} description={author.bio} crumbs={[{ name: d.ui.nav.blog, path: "/blog" }, { name: author.name, path: `/blog/author/${slug}` }]} />
      <section className="section">
        <div className="container">
          <h2 className="mb-6 text-2xl font-light">{fmt(t.articlesBy, { name: author.name.split(" ")[0], n: theirs.length })}</h2>
          <BlogList posts={theirs} authors={authors} />
        </div>
      </section>
    </>
  );
}

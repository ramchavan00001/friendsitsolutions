import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Facebook, Linkedin, Twitter } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { PostCard } from "@/components/sections/cards";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { blogPosts } from "@/content/blog";
import type { BlogBlock } from "@/content/types";
import { blogData } from "@/lib/blog";
import { articleSchema } from "@/lib/schema";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { formatDate, slugify } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { posts } = await blogData();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, type: "article", publishedTime: post.publishedAt });
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2": return <h2 id={slugify(block.text)}>{block.text}</h2>;
    case "h3": return <h3>{block.text}</h3>;
    case "ul": return <ul>{block.items.map((i) => <li key={i}>{i}</li>)}</ul>;
    case "quote": return <blockquote><p>{block.text}</p></blockquote>;
    default: return <p>{block.text}</p>;
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const { posts, team, authors } = await blogData();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const author = team.find((m) => m.slug === post.authorSlug);
  const authorName = author?.name ?? "FriendsITSolutions Team";
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const url = absoluteUrl(`/blog/${post.slug}`);
  const toc = post.body.filter((b): b is Extract<BlogBlock, { type: "h2" }> => b.type === "h2");

  const share = [
    { label: "LinkedIn", Icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: "X", Icon: Twitter, href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}` },
    { label: "Facebook", Icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  ];

  return (
    <>
      <JsonLd data={articleSchema(post, authorName)} />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        crumbs={[{ name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]}
      >
        <p className="flex flex-wrap items-center gap-3 text-sm text-[#D3DDD5]">
          By <Link href={`/blog/author/${post.authorSlug}`} className="font-semibold text-cream underline-offset-4 hover:underline">{authorName}</Link>
          · <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          · <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" aria-hidden="true" /> {post.readingMinutes} min read</span>
        </p>
      </PageHero>

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-4">
          <article className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-heading prose-a:text-primary lg:col-span-3">
            {post.body.map((b, i) => <Block key={i} block={b} />)}
            <div className="not-prose mt-10 flex flex-wrap gap-2">
              {post.tags.map((t) => <Link key={t} href={`/blog/tag/${slugify(t)}`}><Badge variant="secondary">#{t}</Badge></Link>)}
            </div>
            {author && (
              <div className="not-prose mt-10 flex gap-4 rounded-sm border bg-card p-6">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-forest font-medium text-gold" aria-hidden="true">
                  {author.name.split(" ").map((p) => p[0]).join("")}
                </span>
                <div>
                  <p className="font-heading font-semibold"><Link href={`/blog/author/${author.slug}`} className="hover:underline">{author.name}</Link></p>
                  <p className="text-sm text-primary dark:text-accent">{author.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{author.bio}</p>
                </div>
              </div>
            )}
          </article>
          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            {toc.length > 0 && (
              <nav aria-label="Table of contents">
                <h2 className="mb-3 font-heading font-medium">In this article</h2>
                <ul className="space-y-2 border-l pl-4 text-sm">
                  {toc.map((h) => <li key={h.text}><a href={`#${slugify(h.text)}`} className="text-muted-foreground hover:text-foreground">{h.text}</a></li>)}
                </ul>
              </nav>
            )}
            <div>
              <h2 className="mb-3 font-heading font-medium">Share</h2>
              <ul className="flex gap-2">
                {share.map(({ label, Icon, href }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label}`} className="grid h-10 w-10 place-items-center rounded-full border hover:bg-secondary">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-sm bg-forest p-6 text-cream">
              <p className="font-heading text-lg font-semibold">Need expert help?</p>
              <p className="mt-2 text-sm text-[#D3DDD5]">Get a free consultation with our team.</p>
              <Link href="/get-a-quote" className="mt-4 inline-block rounded-sm bg-gold px-4 py-2 text-sm font-semibold text-deep">Get a free quote</Link>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-secondary/40">
          <div className="container">
            <h2 className="mb-8 text-center text-3xl font-light">Keep reading</h2>
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {related.map((p) => <PostCard key={p.slug} post={p} authorName={authors[p.authorSlug] ?? "FriendsITSolutions Team"} />)}
            </div>
          </div>
        </section>
      )}
      <CtaBanner />
    </>
  );
}

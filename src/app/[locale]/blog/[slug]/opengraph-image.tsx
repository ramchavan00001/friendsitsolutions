import { ogImage, ogSize } from "@/lib/og";
import { blogPosts, getPost } from "@/content/blog";

export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return ogImage({ title: post?.title ?? "FriendsITSolutions Blog", kicker: post?.category ?? "Blog" });
}

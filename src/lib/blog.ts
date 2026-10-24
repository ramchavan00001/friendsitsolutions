import "server-only";
import { getPosts, getTeam } from "./cms";
import { slugify } from "./utils";

export async function blogData() {
  const [posts, team] = await Promise.all([getPosts(), getTeam()]);
  const authors = Object.fromEntries(team.map((m) => [m.slug, m.name]));
  return { posts, team, authors };
}

export const postsInCategory = (posts: Awaited<ReturnType<typeof getPosts>>, slug: string) => posts.filter((p) => slugify(p.category) === slug);
export const postsWithTag = (posts: Awaited<ReturnType<typeof getPosts>>, slug: string) => posts.filter((p) => p.tags.some((t) => slugify(t) === slug));
export const searchPosts = (posts: Awaited<ReturnType<typeof getPosts>>, q: string) => {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  return posts.filter((p) => {
    const hay = [p.title, p.excerpt, p.category, ...p.tags, ...p.body.map((b) => ("text" in b ? b.text : b.items.join(" ")))].join(" ").toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
};

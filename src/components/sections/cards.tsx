import Link from "next/link";
import { ArrowRight, Clock, Quote, Star } from "lucide-react";
import { Icon, type IconName } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import type { BlogPost, CaseStudy, Testimonial } from "@/content/types";
import { cn, formatDate } from "@/lib/utils";

export function ServiceCard({ slug, title, summary, icon }: { slug: string; title: string; summary: string; icon: IconName }) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-teal/50 hover:shadow-lg"
    >
      <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-blue/10 to-brand-teal/15 text-brand-blue transition-colors group-hover:from-brand-blue group-hover:to-brand-teal group-hover:text-white dark:text-teal-300">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <h3 className="font-heading text-lg font-semibold">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{summary}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary dark:text-accent">
        Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}

export function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link href={`/portfolio/${cs.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className={cn("relative flex h-44 items-end bg-gradient-to-br p-5 text-white", cs.accent)}>
        <div className="bg-grid absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="relative">
          <Badge className="bg-white/20 text-white">{cs.industry}</Badge>
          <p className="mt-2 font-heading text-3xl font-extrabold">{cs.results[0].metric}</p>
          <p className="text-sm text-white/90">{cs.results[0].label}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-lg font-semibold leading-snug group-hover:text-primary dark:group-hover:text-accent">{cs.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{cs.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary dark:text-accent">
          Read case study <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function PostCard({ post, authorName }: { post: BlogPost; authorName: string }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-lg">
      <div className="h-40 bg-gradient-to-br from-brand-blue to-brand-teal p-5">
        <Badge className="bg-white/20 text-white">{post.category}</Badge>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> ·
          <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {post.readingMinutes} min read
        </p>
        <h3 className="mt-2 font-heading text-lg font-semibold leading-snug">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:text-primary dark:group-hover:text-accent">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
        <p className="mt-4 text-xs font-medium">By {authorName}</p>
      </div>
    </article>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-4 w-4", i < rating ? "fill-amber-400 text-amber-400" : "text-slate-300")} aria-hidden="true" />
      ))}
    </div>
  );
}

export function TestimonialCard({ t, className }: { t: Testimonial; className?: string }) {
  return (
    <figure className={cn("flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm", className)}>
      <Quote className="h-8 w-8 text-brand-teal/60" aria-hidden="true" />
      <Stars rating={t.rating} />
      <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-teal text-sm font-bold text-white" aria-hidden="true">
          {t.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
        </span>
        <span>
          <span className="block font-semibold">{t.name}</span>
          <span className="block text-xs text-muted-foreground">{t.role}, {t.company}</span>
        </span>
      </figcaption>
    </figure>
  );
}

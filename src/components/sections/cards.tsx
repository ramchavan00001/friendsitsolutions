import { Link } from "@/i18n/link";
import { ArrowRight, Clock, Star } from "lucide-react";
import { Icon, type IconName } from "@/components/icon";
import type { BlogPost, CaseStudy, Testimonial } from "@/content/types";
import { cn, formatDate } from "@/lib/utils";
import { getT } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/request";
import { localeTags } from "@/i18n/config";
import { fmt } from "@/i18n/format";
import { CaseStudyCardView } from "./case-study-card";

export function ServiceCard({ slug, title, summary, icon }: { slug: string; title: string; summary: string; icon: IconName }) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group flex h-full flex-col border-t border-gold bg-card p-7 transition-colors hover:bg-secondary"
    >
      <span className="mb-5 grid h-11 w-11 place-items-center rounded-full border border-gold-icon text-gold-dark transition-colors group-hover:bg-forest group-hover:text-gold dark:border-gold dark:text-gold">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <h3 className="text-xl font-normal">{title}</h3>
      <p className="mt-2 flex-1 font-light text-muted-foreground">{summary}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm tracking-[0.04em] text-gold-dark dark:text-gold">
        {getT().common.learnMore} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}

/** Server wrapper; client components use CaseStudyCardView with their own label. */
export function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return <CaseStudyCardView cs={cs} label={getT().common.readCaseStudy} />;
}

export function PostCard({ post, authorName }: { post: BlogPost; authorName: string }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden bg-card transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(11,42,32,0.35)]">
      <div className="relative h-40 overflow-hidden bg-sage p-6">
        <span className="arc -right-16 -top-20 h-56 w-56" aria-hidden="true" />
        <p className="relative text-xs font-medium uppercase tracking-[0.2em] text-gold-dark">{post.category}</p>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-xs font-light text-muted-foreground">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, localeTags[getLocale()])}</time> ·
          <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {fmt(getT().common.minRead, { n: post.readingMinutes })}
        </p>
        <h3 className="mt-2 text-xl font-normal leading-snug">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:text-forest dark:group-hover:text-gold">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 font-light text-muted-foreground">{post.excerpt}</p>
        <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">{fmt(getT().common.by, { name: authorName })}</p>
      </div>
    </article>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={fmt(getT().common.stars, { n: rating })}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-4 w-4", i < rating ? "fill-gold text-gold" : "text-sage-dark")} aria-hidden="true" />
      ))}
    </div>
  );
}

export function TestimonialCard({ t, className }: { t: Testimonial; className?: string }) {
  return (
    <figure className={cn("flex h-full flex-col bg-card p-8", className)}>
      <span className="text-7xl font-extralight leading-[0.6] text-gold" aria-hidden="true">&ldquo;</span>
      <Stars rating={t.rating} />
      <blockquote className="mt-4 flex-1 text-lg font-light leading-relaxed">{t.quote}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-forest text-sm font-medium text-gold" aria-hidden="true">
          {t.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
        </span>
        <span>
          <span className="block font-medium">{t.name}</span>
          <span className="block text-xs uppercase tracking-[0.14em] text-muted-foreground">{t.role}, {t.company}</span>
        </span>
      </figcaption>
    </figure>
  );
}

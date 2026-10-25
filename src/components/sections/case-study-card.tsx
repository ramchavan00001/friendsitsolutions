import { Link } from "@/i18n/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/content/types";

export function CaseStudyCardView({ cs, label }: { cs: CaseStudy; label: string }) {
  return (
    <Link href={`/portfolio/${cs.slug}`} className="group flex h-full flex-col overflow-hidden bg-card transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(11,42,32,0.35)]">
      <div className="relative flex h-48 items-end overflow-hidden bg-forest p-6 text-cream">
        <span className="arc -right-20 -top-24 h-64 w-64 border-forest-light" aria-hidden="true" />
        <div className="relative">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">{cs.industry}</p>
          <p className="mt-2 text-5xl font-extralight text-gold">{cs.results[0].metric}</p>
          <p className="text-sm font-light text-[#D3DDD5]">{cs.results[0].label}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-normal leading-snug group-hover:text-forest dark:group-hover:text-gold">{cs.title}</h3>
        <p className="mt-2 flex-1 font-light text-muted-foreground">{cs.summary}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm tracking-[0.04em] text-gold-dark dark:text-gold">
          {label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

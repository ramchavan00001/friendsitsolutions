import { Link } from "@/i18n/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getT } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/format";

/**
 * Split-screen hero: forest panel with the message, sage panel with floating proof cards.
 * Server-rendered without entrance animation so the headline paints immediately (LCP).
 */
export function Hero({ founded }: { founded: number }) {
  const t = getT().home;
  return (
    <section className="grid lg:min-h-[720px] lg:grid-cols-2">
      <div className="flex flex-col justify-center bg-forest px-6 py-16 text-cream dark:bg-deep sm:px-10 lg:py-24 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-16">
        <p className="eyebrow-on-dark">{fmt(t.heroEyebrow, { year: founded })}</p>
        <h1 className="display mt-7 text-[44px] sm:text-6xl xl:text-[80px]">
          {t.heroTitleA} <strong>{t.heroTitleB}</strong>
        </h1>
        <p className="mt-7 max-w-[520px] text-lg font-light text-[#D3DDD5] md:text-[19px]">{t.heroText}</p>
        <div className="mt-10 flex flex-wrap gap-3.5">
          <Button asChild size="lg" variant="accent">
            <Link href="/get-a-quote">
              {t.heroPrimary} <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghostLight">
            <Link href="/portfolio">{t.heroSecondary}</Link>
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden bg-sage px-6 py-16 text-deep dark:bg-forest dark:text-cream sm:px-10 lg:px-16 lg:py-24" aria-hidden="true">
        <span className="arc -right-64 -top-40 h-[700px] w-[700px] dark:border-forest-light" />
        <span className="arc -right-36 -top-10 h-[460px] w-[460px] dark:border-forest-light" />
        <div className="relative flex h-full flex-col justify-center gap-5">
          {t.heroCards.map((c, i) => (
            <div
              key={c.label}
              className="max-w-[400px] bg-cream px-7 py-6 shadow-[0_30px_60px_-30px_rgba(11,42,32,0.35)] dark:bg-deep dark:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]"
              style={{ marginLeft: i === 0 ? 0 : "clamp(24px, 8vw, 90px)" }}
            >
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-dark dark:text-gold">{c.label}</p>
              <p className="mt-1.5 text-[40px] font-light leading-tight md:text-[46px]">{c.value}</p>
              <p className="font-light text-[#4C6458] dark:text-[#B9C7BE]">{c.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

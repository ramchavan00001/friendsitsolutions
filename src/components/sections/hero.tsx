import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Split-screen hero: forest panel with the message, sage panel with floating proof cards.
 * Server-rendered without entrance animation so the headline paints immediately (LCP).
 */
export function Hero({ founded }: { founded: number }) {
  const cards = [
    { label: "Managed servers", value: "99.9% uptime", note: "Monitored around the clock" },
    { label: "Helpdesk", value: "< 1 hour", note: "Average ticket resolution" },
    { label: "Security", value: "VAPT · DPDP", note: "Audit-ready infrastructure" },
  ];
  return (
    <section className="grid lg:min-h-[720px] lg:grid-cols-2">
      <div className="flex flex-col justify-center bg-forest px-6 py-16 text-cream sm:px-10 lg:py-24 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-16">
        <p className="eyebrow-on-dark">Technology partner · since {founded}</p>
        <h1 className="display mt-7 text-[44px] sm:text-6xl xl:text-[80px]">
          Calm, reliable IT for <strong>growing businesses.</strong>
        </h1>
        <p className="mt-7 max-w-[520px] text-lg font-light text-[#D3DDD5] md:text-[19px]">
          We design, build, secure and support the technology behind hospitals, schools, retailers and enterprises — quietly,
          expertly and on time.
        </p>
        <div className="mt-10 flex flex-wrap gap-3.5">
          <Button asChild size="lg" variant="accent">
            <Link href="/get-a-quote">
              Schedule a consultation <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghostLight">
            <Link href="/portfolio">Our work</Link>
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden bg-sage px-6 py-16 text-deep sm:px-10 lg:px-16 lg:py-24" aria-hidden="true">
        <span className="arc -right-64 -top-40 h-[700px] w-[700px]" />
        <span className="arc -right-36 -top-10 h-[460px] w-[460px]" />
        <div className="relative flex h-full flex-col justify-center gap-5">
          {cards.map((c, i) => (
            <div
              key={c.label}
              className="max-w-[400px] bg-cream px-7 py-6 shadow-[0_30px_60px_-30px_rgba(11,42,32,0.35)]"
              style={{ marginLeft: i === 0 ? 0 : "clamp(24px, 8vw, 90px)" }}
            >
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-dark">{c.label}</p>
              <p className="mt-1.5 text-[40px] font-light leading-tight md:text-[46px]">{c.value}</p>
              <p className="font-light text-[#4C6458]">{c.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

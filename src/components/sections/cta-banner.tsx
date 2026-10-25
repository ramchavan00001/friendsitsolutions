import { Link } from "@/i18n/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/content/site";
import { getT } from "@/i18n/dictionaries";

/** Full-bleed split CTA: sage panel with the headline, deep green panel with the action. */
export function CtaBanner({ title, description }: { title?: string; description?: string }) {
  const t = getT().common;
  return (
    <section className="grid lg:grid-cols-[1.3fr_1fr]">
      <div className="bg-sage px-6 py-20 text-deep dark:bg-forest dark:text-cream sm:px-10 lg:py-28 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-16">
        <p className="eyebrow text-gold-dark dark:text-gold">{t.ctaEyebrow}</p>
        <h2 className="display mt-5 max-w-2xl text-4xl md:text-[56px]">{title ?? t.ctaTitle}</h2>
      </div>
      <div className="flex flex-col justify-center gap-5 bg-deep px-6 py-20 text-cream sm:px-10 lg:px-16">
        <p className="max-w-md text-lg font-light">{description ?? t.ctaDescription}</p>
        <Button asChild size="lg" variant="accent" className="self-start">
          <Link href="/get-a-quote">
            {t.ctaButton} <ArrowRight />
          </Link>
        </Button>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="self-start tracking-[0.04em] text-gold hover:underline">
          {t.ctaWhatsapp}
        </a>
      </div>
    </section>
  );
}

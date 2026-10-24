import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/content/site";

/** Full-bleed split CTA: sage panel with the headline, deep green panel with the action. */
export function CtaBanner({
  title = "Let's build something great together",
  description = "A complimentary consultation and a transparent estimate within 48 hours.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="grid lg:grid-cols-[1.3fr_1fr]">
      <div className="bg-sage px-6 py-20 text-deep sm:px-10 lg:py-28 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-16">
        <p className="eyebrow !text-gold-dark">Begin</p>
        <h2 className="display mt-5 max-w-2xl text-4xl md:text-[56px]">{title}</h2>
      </div>
      <div className="flex flex-col justify-center gap-5 bg-deep px-6 py-20 text-cream sm:px-10 lg:px-16">
        <p className="max-w-md text-lg font-light">{description}</p>
        <Button asChild size="lg" variant="accent" className="self-start">
          <Link href="/get-a-quote">
            Request a proposal <ArrowRight />
          </Link>
        </Button>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="self-start tracking-[0.04em] text-gold hover:underline">
          Or message us on WhatsApp
        </a>
      </div>
    </section>
  );
}

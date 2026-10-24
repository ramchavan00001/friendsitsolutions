import Link from "next/link";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroGraphic } from "./hero-graphic";

/** Hero text is server-rendered without entrance animation so it paints immediately (LCP). */
export function Hero({ projects, clients }: { projects: number; clients: number }) {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden="true" />
      <div className="absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-brand-teal/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-40 top-40 h-[420px] w-[420px] rounded-full bg-brand-blue/20 blur-3xl" aria-hidden="true" />

      <div className="container relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-5">
            <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" /> Rated 4.9/5 by {clients}+ clients
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
            Technology that works <span className="gradient-text">like a good friend</span> — reliable, smart, always there.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            From websites and apps to cloud, cybersecurity and 24/7 IT support — FriendsITSolutions is the one technology partner your
            business needs to grow with confidence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/get-a-quote">
                Get Free Consultation <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/portfolio">View Our Work</Link>
            </Button>
          </div>
          <ul className="mt-8 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            {["Free consultation & estimate", "NDA & full IP ownership", "Dedicated project manager", "24/7 support plans"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-teal" aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <HeroGraphic projects={projects} />
      </div>
    </section>
  );
}

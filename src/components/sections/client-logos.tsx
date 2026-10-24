import { clientLogos } from "@/content/portfolio";

/** Placeholder text logos in an infinite marquee — replace with real client logo images. */
export function ClientLogos() {
  const row = [...clientLogos, ...clientLogos];
  return (
    <section aria-label="Trusted by" className="border-y bg-secondary/40 py-8">
      <div className="container">
        <p className="mb-6 text-center text-sm font-medium text-muted-foreground">Trusted by startups, schools, hospitals and growing businesses</p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <ul className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]">
            {row.map((name, i) => (
              <li key={i} aria-hidden={i >= clientLogos.length} className="whitespace-nowrap font-heading text-xl font-bold text-slate-500 dark:text-slate-400">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

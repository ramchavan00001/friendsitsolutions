import { clientLogos } from "@/content/portfolio";

/** Placeholder text logos — replace with real client logo images in /public/clients. */
export function ClientLogos() {
  return (
    <section aria-label="Trusted by" className="border-b border-border">
      <div className="container">
        <ul className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 py-12 text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
          <li className="sr-only">Trusted by:</li>
          {clientLogos.slice(0, 7).map((name) => (
            <li key={name} className="whitespace-nowrap">{name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

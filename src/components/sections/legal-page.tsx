import { PageHero } from "./page-hero";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero title={title} crumbs={[{ name: title, path }]} description={`Last updated: ${updated}`} />
      <section className="section">
        <div className="container max-w-3xl">
          <p className="mb-8 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
            This document is a template provided for convenience. Please have it reviewed by a qualified legal professional before relying on it.
          </p>
          <article className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-heading">{children}</article>
        </div>
      </section>
    </>
  );
}

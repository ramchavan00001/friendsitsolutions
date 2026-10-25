import { PageHero } from "./page-hero";
import { getT } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/format";
import { EnglishOnlyNote } from "./english-only-note";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <PageHero title={title} crumbs={[{ name: title, path }]} description={fmt(getT().pages.legal.updated, { date: updated })} />
      <EnglishOnlyNote />
      <section className="section">
        <div className="container max-w-3xl">
          <p className="mb-8 rounded-sm border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
            {getT().pages.legal.template}
          </p>
          <article className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-heading">{children}</article>
        </div>
      </section>
    </>
  );
}

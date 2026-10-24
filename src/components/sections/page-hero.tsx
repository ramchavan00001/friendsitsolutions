import { Breadcrumbs, type Crumb } from "./breadcrumbs";

/** Standard hero for inner pages: brand gradient, breadcrumbs, H1, intro and optional actions. */
export function PageHero({
  title,
  description,
  crumbs,
  eyebrow,
  children,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  crumbs: Crumb[];
  eyebrow?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-blue via-blue-900 to-teal-800 text-white">
      <div className="bg-grid absolute inset-0 opacity-[0.07]" aria-hidden="true" />
      <div className="container relative py-14 md:py-20">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="mb-4 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-200">{eyebrow}</p>}
        <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
        {description && <p className="mt-5 max-w-3xl text-lg text-blue-100">{description}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

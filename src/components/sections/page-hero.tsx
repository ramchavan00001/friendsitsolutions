import { Breadcrumbs, type Crumb } from "./breadcrumbs";

/** Standard hero for inner pages: forest panel, breadcrumbs, H1, intro and optional actions. */
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
    <section className="relative overflow-hidden bg-forest text-cream">
      <span className="arc -right-48 -top-56 h-[620px] w-[620px] border-forest-light" aria-hidden="true" />
      <span className="arc -right-24 -top-20 h-[380px] w-[380px] border-forest-light" aria-hidden="true" />
      <div className="container relative py-16 md:py-24">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="eyebrow-on-dark mb-5">{eyebrow}</p>}
        <h1 className="display max-w-4xl text-4xl md:text-[56px]">{title}</h1>
        {description && <p className="mt-6 max-w-3xl text-lg font-light text-[#D3DDD5]">{description}</p>}
        {children && <div className="mt-9 flex flex-wrap gap-3.5">{children}</div>}
      </div>
    </section>
  );
}

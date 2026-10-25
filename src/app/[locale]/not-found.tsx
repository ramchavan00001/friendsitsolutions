import { Link } from "@/i18n/link";
import { Button } from "@/components/ui/button";
import { services } from "@/content/services";
import { getT } from "@/i18n/dictionaries";
import { localizeService } from "@/i18n/content";

// not-found has no params; the locale comes from the [locale] layout via the request store.
export default function NotFound() {
  const t = getT().pages.notFound;
  return (
    <section className="section">
      <div className="container max-w-2xl text-center">
        <p className="text-9xl font-extralight text-gold-dark dark:text-gold">404</p>
        <h1 className="mt-4 text-3xl font-light">{t.title}</h1>
        <p className="mt-3 text-muted-foreground">{t.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild><Link href="/">{t.home}</Link></Button>
          <Button asChild variant="outline"><Link href="/search">{t.search}</Link></Button>
          <Button asChild variant="outline"><Link href="/contact">{t.contact}</Link></Button>
        </div>
        <div className="mt-12 text-left">
          <h2 className="mb-3 font-heading font-medium">{t.popular}</h2>
          <ul className="grid gap-2 text-sm sm:grid-cols-2">
            {services.slice(0, 6).map(localizeService).map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className="text-primary hover:underline dark:text-accent">{s.title}</Link></li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

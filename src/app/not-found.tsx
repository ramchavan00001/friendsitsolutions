import Link from "next/link";
import { Button } from "@/components/ui/button";
import { services } from "@/content/services";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container max-w-2xl text-center">
        <p className="text-9xl font-extralight text-gold-dark dark:text-gold">404</p>
        <h1 className="mt-4 text-3xl font-light">Oops — this page took a coffee break</h1>
        <p className="mt-3 text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild><Link href="/">Go home</Link></Button>
          <Button asChild variant="outline"><Link href="/search">Search the site</Link></Button>
          <Button asChild variant="outline"><Link href="/contact">Contact us</Link></Button>
        </div>
        <div className="mt-12 text-left">
          <h2 className="mb-3 font-heading font-medium">Popular pages</h2>
          <ul className="grid gap-2 text-sm sm:grid-cols-2">
            {services.slice(0, 6).map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className="text-primary hover:underline dark:text-accent">{s.title}</Link></li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

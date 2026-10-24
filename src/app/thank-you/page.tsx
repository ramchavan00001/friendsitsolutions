import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site, whatsappLink } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Thank You", description: "Thanks for contacting FriendsITSolutions.", path: "/thank-you", noIndex: true });

const copy: Record<string, { title: string; body: string }> = {
  quote: { title: "Your quote request is in!", body: "Our solutions team will contact you within 24 hours to discuss your project. A confirmation email is on its way." },
  career: { title: "Application received!", body: "Thanks for your interest in joining us. Our hiring team reviews every application and will be in touch if there's a match." },
  support: { title: "Support ticket created", body: "An engineer will respond according to your SLA. For critical issues, please call us too." },
  contact: { title: "Thanks for reaching out!", body: "We've received your message and will reply within one business day." },
};

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ type?: string; ref?: string }> }) {
  const { type, ref } = await searchParams;
  const c = copy[type ?? "contact"] ?? copy.contact;
  return (
    <section className="section">
      <div className="container max-w-2xl text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-gold-icon dark:text-gold" aria-hidden="true" />
        <h1 className="mt-6 text-4xl font-light">{c.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{c.body}</p>
        {ref && <p className="mt-4 inline-block rounded-sm bg-secondary px-4 py-2 font-mono text-sm">Reference: {ref.slice(0, 40)}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild><Link href="/">Back to home</Link></Button>
          <Button asChild variant="outline"><Link href="/portfolio">Browse our work</Link></Button>
          <Button asChild variant="outline"><a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp us</a></Button>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">Need to talk now? Call <a href={`tel:${site.phoneHref}`} className="font-semibold text-foreground">{site.phone}</a></p>
      </div>
    </section>
  );
}

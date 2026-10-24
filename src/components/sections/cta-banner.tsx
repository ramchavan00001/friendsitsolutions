import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/content/site";

export function CtaBanner({
  title = "Let's build something great together",
  description = "Tell us about your goals and get a free consultation and transparent estimate within 48 hours.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue to-teal-700 px-6 py-14 text-center text-white shadow-xl md:px-16">
          <div className="bg-grid absolute inset-0 opacity-10" aria-hidden="true" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold md:text-4xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">{description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="accent">
                <Link href="/get-a-quote">
                  Get a Free Quote <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="white">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { MessageCircle, Phone } from "lucide-react";
import { site, whatsappLink } from "@/content/site";

/** Floating WhatsApp button (all screens) + click-to-call bar (mobile). */
export function ContactDock() {
  return (
    <>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-20 left-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 md:bottom-6 md:left-6"
      >
        <MessageCircle className="h-7 w-7" aria-hidden="true" />
      </a>
      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t bg-background/95 backdrop-blur md:hidden">
        <a href={`tel:${site.phoneHref}`} className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-primary dark:text-accent">
          <Phone className="h-4 w-4" aria-hidden="true" /> Call now
        </a>
        <a href="/get-a-quote" className="flex items-center justify-center gap-2 bg-accent py-3 text-sm font-semibold text-accent-foreground">
          Free quote
        </a>
      </div>
    </>
  );
}

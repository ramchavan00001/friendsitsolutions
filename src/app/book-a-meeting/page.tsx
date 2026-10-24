import { PageHero } from "@/components/sections/page-hero";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book a Free Consultation",
  description: "Pick a time that suits you for a free 30-minute consultation with a FriendsITSolutions expert.",
  path: "/book-a-meeting",
});

export default function BookPage() {
  return (
    <>
      <PageHero eyebrow="Book a call" title="Book a free 30-minute consultation" description="Choose a convenient slot. We'll discuss your goals and suggest the best way forward — no strings attached." crumbs={[{ name: "Book a Meeting", path: "/book-a-meeting" }]} />
      <section className="section">
        <div className="container max-w-5xl">
          <div className="overflow-hidden rounded-sm border bg-card">
            {/* Cal.com inline embed. Set NEXT_PUBLIC_CAL_LINK (e.g. "your-team/30min"). For Calendly, swap the src for your Calendly URL. */}
            <iframe title="Book a meeting with FriendsITSolutions" src={`https://cal.com/${site.calLink}?embed=true&theme=auto`} className="h-[720px] w-full" loading="lazy" />
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Trouble booking? Call <a className="font-semibold text-foreground" href={`tel:${site.phoneHref}`}>{site.phone}</a> or email <a className="font-semibold text-foreground" href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}

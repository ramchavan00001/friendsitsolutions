import { LegalPage } from "@/components/sections/legal-page";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  return buildMetadata({ title: "Refund & Cancellation Policy", description: `Refund and cancellation policy for ${site.name} projects, subscriptions, AMC and hardware.`, path: "/refund-policy",
    locale,
  });
}

export default async function Refund({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  return (
    <LegalPage title={d.footer.links.refund} path="/refund-policy" updated="24 October 2026">
      <p>We want you to be happy with our work. This policy explains how cancellations and refunds are handled.</p>
      <h2>1. Project-based services</h2>
      <ul>
        <li>Advance payments cover planning and resource allocation and are non-refundable once work has started.</li>
        <li>If you cancel mid-project, you pay for work completed up to the cancellation date; any amount paid beyond that is refunded.</li>
        <li>If we fail to deliver an agreed milestone and cannot remedy it within a reasonable time, you are entitled to a refund of the fees paid for that milestone.</li>
      </ul>
      <h2>2. Monthly and annual services (hosting, managed IT, marketing, AMC)</h2>
      <ul>
        <li>Monthly services can be cancelled with 30 days&apos; written notice. No refunds for partial months.</li>
        <li>Annual plans cancelled within 14 days of purchase are refunded pro-rata, minus any third-party costs incurred.</li>
        <li>Domain registrations, SSL certificates and software licences purchased on your behalf are non-refundable.</li>
      </ul>
      <h2>3. Hardware</h2>
      <ul>
        <li>Unopened hardware may be returned within 7 days, subject to a restocking fee of up to 10%.</li>
        <li>Defective hardware is replaced or repaired under the manufacturer&apos;s warranty.</li>
      </ul>
      <h2>4. Training</h2>
      <p>Cancellations more than 7 days before a scheduled workshop receive a full refund; within 7 days, 50%; no-shows are non-refundable. Rescheduling is free with 72 hours&apos; notice.</p>
      <h2>5. How to request a refund</h2>
      <p>Email <a href={`mailto:${site.email}`}>{site.email}</a> with your invoice number and reason. Approved refunds are processed to the original payment method within 7–10 business days.</p>
    </LegalPage>
  );
}

import { LegalPage } from "@/components/sections/legal-page";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Terms & Conditions", description: `Terms and conditions for using the ${site.name} website and services.`, path: "/terms-and-conditions" });

export default function Terms() {
  return (
    <LegalPage title="Terms & Conditions" path="/terms-and-conditions" updated="24 October 2026">
      <p>These terms govern your use of {site.url} and any services provided by {site.name}. By using the website or engaging our services, you agree to these terms.</p>
      <h2>1. Services</h2>
      <p>The specific scope, deliverables, timelines and fees for any engagement are set out in a proposal, statement of work (SOW) or agreement signed by both parties, which takes precedence over these terms.</p>
      <h2>2. Quotes and payment</h2>
      <ul>
        <li>Quotes are valid for 30 days unless stated otherwise. Prices exclude GST and other applicable taxes.</li>
        <li>Project payments are milestone-based as agreed in the SOW. Recurring services are billed in advance.</li>
        <li>Invoices are payable within 15 days. Late payments may incur interest and suspension of services.</li>
      </ul>
      <h2>3. Client responsibilities</h2>
      <p>You agree to provide timely feedback, content, access and approvals. Delays in these may affect timelines and costs.</p>
      <h2>4. Intellectual property</h2>
      <p>On receipt of full payment, ownership of custom deliverables created for you transfers to you. We retain ownership of pre-existing tools, libraries and know-how, and grant you a perpetual licence to use them as part of the deliverables. Third-party and open-source components remain subject to their own licences.</p>
      <h2>5. Confidentiality</h2>
      <p>Both parties will keep confidential information private and use it only for the engagement. We are happy to sign a separate NDA.</p>
      <h2>6. Warranties and support</h2>
      <p>We warrant that deliverables will materially conform to the agreed specification for the warranty period stated in the SOW. Hardware is covered by manufacturer warranties.</p>
      <h2>7. Limitation of liability</h2>
      <p>To the maximum extent permitted by law, our aggregate liability under any engagement is limited to the fees paid for that engagement in the preceding 12 months. We are not liable for indirect or consequential losses, loss of profits or data, except where caused by our gross negligence or wilful misconduct.</p>
      <h2>8. Website use</h2>
      <p>Content on this website is for general information only. You must not misuse the website, attempt unauthorised access, or submit unlawful or malicious content through our forms.</p>
      <h2>9. Termination</h2>
      <p>Either party may terminate an engagement as set out in the SOW. Fees for work completed up to termination remain payable.</p>
      <h2>10. Governing law</h2>
      <p>These terms are governed by the laws of India. Courts at {site.city}, {site.state} shall have exclusive jurisdiction.</p>
      <h2>11. Contact</h2>
      <p>Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </LegalPage>
  );
}

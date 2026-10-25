import { LegalPage } from "@/components/sections/legal-page";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  return buildMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects your personal data in line with India's Digital Personal Data Protection Act, 2023.`,
  path: "/privacy-policy",
    locale,
  });
}

export default async function PrivacyPolicy({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const d = getDictionary(locale);
  return (
    <LegalPage title={d.footer.links.privacy} path="/privacy-policy" updated="24 October 2026">
      <p>
        {site.name} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy. This policy explains how we process your digital personal data when you
        visit {site.url}, contact us or use our services, in accordance with the Digital Personal Data Protection Act, 2023 (&quot;DPDP Act&quot;) and
        applicable rules. For the purposes of the DPDP Act, {site.name} is the <strong>Data Fiduciary</strong>.
      </p>

      <h2>1. Personal data we collect</h2>
      <ul>
        <li><strong>Information you provide:</strong> name, email, phone/WhatsApp number, company, job title, project details, budget, resumes and any files you upload through our forms.</li>
        <li><strong>Support data:</strong> ticket details, screenshots and logs you share with our engineers.</li>
        <li><strong>Technical data:</strong> a hashed (non-reversible) form of your IP address for spam and abuse prevention, browser type and pages visited.</li>
        <li><strong>Cookie data:</strong> analytics and marketing cookies — only with your consent (see our Cookie Policy).</li>
      </ul>

      <h2>2. Purposes of processing</h2>
      <p>We process personal data only for specified, lawful purposes for which you have given consent, or for legitimate uses permitted under the DPDP Act:</p>
      <ul>
        <li>Responding to enquiries and preparing quotes and proposals;</li>
        <li>Delivering, supporting and invoicing our services;</li>
        <li>Evaluating job applications;</li>
        <li>Sending newsletters you have subscribed to;</li>
        <li>Improving our website (with analytics consent);</li>
        <li>Preventing fraud and spam, and complying with legal obligations.</li>
      </ul>

      <h2>3. Consent</h2>
      <p>
        Where we rely on consent, we request it through a clear affirmative action (such as ticking a checkbox) accompanied by this notice. You may withdraw
        consent at any time by emailing <a href={`mailto:${site.email}`}>{site.email}</a> or using the unsubscribe link in our emails. Withdrawal does not
        affect processing carried out before withdrawal.
      </p>

      <h2>4. Sharing your data</h2>
      <p>We do not sell your personal data. We share it only with Data Processors who help us operate, under contracts requiring appropriate safeguards:</p>
      <ul>
        <li>Hosting and database providers (e.g. Vercel, Supabase);</li>
        <li>Email delivery providers (e.g. Resend);</li>
        <li>Analytics and advertising providers (e.g. Google, Meta) — only with your consent;</li>
        <li>Government authorities where required by law.</li>
      </ul>
      <p>Some processors may store data outside India. Any such transfer will comply with restrictions notified by the Government of India under the DPDP Act.</p>

      <h2>5. Data retention</h2>
      <p>
        We retain personal data only as long as necessary for the purpose it was collected: enquiries and quotes for up to 24 months, unsuccessful job
        applications for up to 12 months, and client records for the period required by tax and accounting laws. Data is then deleted or anonymised.
      </p>

      <h2>6. Security safeguards</h2>
      <p>
        We implement reasonable security safeguards including encryption in transit (HTTPS), access controls, the principle of least privilege, input
        validation, rate limiting and regular security reviews. In the event of a personal data breach, we will notify the Data Protection Board of India and
        affected individuals as required.
      </p>

      <h2>7. Your rights</h2>
      <p>As a Data Principal, you have the right to:</p>
      <ul>
        <li>Obtain a summary of your personal data and the processing activities;</li>
        <li>Request correction, completion, updating or erasure of your data;</li>
        <li>Grievance redressal;</li>
        <li>Nominate another individual to exercise your rights in the event of death or incapacity.</li>
      </ul>
      <p>To exercise these rights, email <a href={`mailto:${site.email}`}>{site.email}</a>. We will respond within the timelines prescribed under the DPDP Act.</p>

      <h2>8. Children&apos;s data</h2>
      <p>Our website is not directed at children under 18. We do not knowingly process children&apos;s data without verifiable parental consent.</p>

      <h2>9. Grievance Officer</h2>
      <p>
        {/* REPLACE with the name of your designated officer */}
        Name: [Grievance Officer Name]<br />
        Email: <a href={`mailto:${site.email}`}>{site.email}</a><br />
        Address: {site.streetAddress}, {site.city}, {site.state} {site.postalCode}, {site.country}
      </p>
      <p>If you are not satisfied with our response, you may file a complaint with the Data Protection Board of India.</p>

      <h2>10. Changes to this policy</h2>
      <p>We may update this policy from time to time. The &quot;Last updated&quot; date above shows when it was last revised.</p>
    </LegalPage>
  );
}

import { LegalPage } from "@/components/sections/legal-page";
import { CookieSettingsButton } from "@/components/widgets/cookie-consent";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Cookie Policy", description: `How ${site.name} uses cookies and how to manage your preferences.`, path: "/cookie-policy" });

export default function CookiePolicy() {
  return (
    <LegalPage title="Cookie Policy" path="/cookie-policy" updated="24 October 2026">
      <p>Cookies are small text files stored on your device. We use them to run this website and, only with your consent, to understand how it is used and to measure our marketing.</p>
      <div className="not-prose my-6"><CookieSettingsButton /></div>
      <h2>Types of cookies we use</h2>
      <table>
        <thead><tr><th>Category</th><th>Purpose</th><th>Examples</th><th>Consent</th></tr></thead>
        <tbody>
          <tr><td>Necessary</td><td>Core features such as security, spam protection and remembering your cookie choice and theme.</td><td>Cookie preference, Cloudflare Turnstile</td><td>Not required</td></tr>
          <tr><td>Analytics</td><td>Understand which pages are visited so we can improve the site. IP addresses are anonymised.</td><td>Google Analytics 4 (_ga, _ga_*)</td><td>Required</td></tr>
          <tr><td>Marketing</td><td>Measure the effectiveness of our advertising.</td><td>Meta Pixel (_fbp)</td><td>Required</td></tr>
        </tbody>
      </table>
      <h2>Managing cookies</h2>
      <p>You can change your choice at any time using the button above, or block cookies in your browser settings. Blocking necessary cookies may affect how the site works.</p>
      <h2>Contact</h2>
      <p>Questions about cookies? Email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </LegalPage>
  );
}

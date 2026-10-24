import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/providers";
import { Header, type MenuGroup } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ContactDock } from "@/components/widgets/contact-dock";
import { CookieConsent } from "@/components/widgets/cookie-consent";
import { Analytics } from "@/components/widgets/analytics";
import { LazyWidgets } from "@/components/widgets/lazy-widgets";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/content/site";
import { mainNav } from "@/content/misc";
import { servicesByCategory } from "@/content/services";
import { localBusinessSchema, organizationSchema } from "@/lib/schema";

const outfit = Outfit({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: ["IT company", "software development", "website development", "mobile app development", "managed IT services", "cybersecurity", "cloud services", `IT company in ${site.city}`],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: { siteName: site.name, locale: "en_IN", type: "website" },
  twitter: { card: "summary_large_image" },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0B2A20" },
    { media: "(prefers-color-scheme: dark)", color: "#0B2A20" },
  ],
};

// Slim menu data so the full service content never ships to the browser.
const menu: MenuGroup[] = servicesByCategory.map((g) => ({
  key: g.key,
  label: g.label,
  services: g.services.map(({ slug, title, summary, icon }) => ({ slug, title, summary, icon })),
}));

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning className={outfit.variable}>
      <body className="min-h-screen font-sans">
        <JsonLd data={[organizationSchema(), localBusinessSchema()]} />
        <Providers>
          <Header nav={mainNav} menu={menu} phone={site.phone} phoneHref={site.phoneHref} />
          <main id="main" className="pb-12 md:pb-0">{children}</main>
          <Footer />
          <ContactDock />
          <LazyWidgets />
          <CookieConsent />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}

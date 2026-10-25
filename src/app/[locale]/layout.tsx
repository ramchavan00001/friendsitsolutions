import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Noto_Sans_Devanagari, Outfit } from "next/font/google";
import "../globals.css";
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
import { localizedServicesByCategory } from "@/i18n/content";
import { isLocale, locales, localeTags, ogLocales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { I18nProvider } from "@/i18n/provider";
import { setLocale } from "@/i18n/request";
import { localBusinessSchema, organizationSchema } from "@/lib/schema";

const outfit = Outfit({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600"], variable: "--font-outfit", display: "swap" });
// Devanagari fallback: only downloaded when a page actually renders Devanagari glyphs.
// Japanese uses the OS fonts (see --font-jp in globals.css); a CJK web font would be 100+ files.
const devanagari = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: ["300", "400", "500"], variable: "--font-deva", display: "swap", preload: false });

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = (isLocale(locale) ? locale : "en") as Locale;
  const t = getDictionary(l);
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
    description: t.meta.siteDescription,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    formatDetection: { telephone: true, email: true, address: true },
    openGraph: { siteName: site.name, locale: ogLocales[l], type: "website" },
    twitter: { card: "summary_large_image" },
    verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0B2A20" },
    { media: "(prefers-color-scheme: dark)", color: "#0B2A20" },
  ],
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setLocale(locale);
  const t = getDictionary(locale);

  // Slim, translated menu data so the full service content never ships to the browser.
  const menu: MenuGroup[] = localizedServicesByCategory().map((g) => ({
    key: g.key,
    label: g.label,
    services: g.services.map(({ slug, title, summary, icon }) => ({ slug, title, summary, icon })),
  }));
  const nav = mainNav.map((item) => ({ ...item, label: t.ui.nav[item.key] }));

  return (
    <html lang={localeTags[locale]} suppressHydrationWarning className={`${outfit.variable} ${devanagari.variable}`}>
      <body className="min-h-screen font-sans">
        <JsonLd data={[organizationSchema(), localBusinessSchema()]} />
        <I18nProvider locale={locale} t={t.ui}>
          <Providers>
            <Header nav={nav} menu={menu} phone={site.phone} phoneHref={site.phoneHref} />
            <main id="main" className="pb-12 md:pb-0">{children}</main>
            <Footer />
            <ContactDock />
            <LazyWidgets />
            <CookieConsent />
            <Analytics />
          </Providers>
        </I18nProvider>
      </body>
    </html>
  );
}

# FriendsITSolutions — Website

Production-ready marketing website, lead-capture system and admin dashboard for **FriendsITSolutions**, a full-service IT company.
_Your Trusted Technology Partner._

- **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · shadcn/ui-style components (Radix) · Framer Motion
- **Forms:** React Hook Form + Zod · Resend email · Cloudflare Turnstile · honeypot · rate limiting
- **Data:** Supabase (PostgreSQL + Storage) for leads, quotes, applications, tickets, subscribers
- **CMS:** Sanity (optional) with typed local-content fallback
- **AI chatbot:** Claude (optional) with offline FAQ matcher fallback
- **Hosting:** Vercel

> Content marked **PLACEHOLDER** / **REPLACE** (case studies, testimonials, team, blog posts, contact details, certifications, logos) is realistic sample content and must be replaced before launch.

---

## Quick start

```bash
git clone https://github.com/ramchavan00001/friendsitsolutions.git
cd friendsitsolutions
npm install
cp .env.example .env.local   # every variable is optional for local dev
npm run dev                  # http://localhost:3000
```

With no environment variables set, the full site works: forms validate and log submissions to the server console, emails are logged instead of sent, the chatbot answers from the built-in FAQ, and content comes from `src/content`.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build (type-check + lint + static generation) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (next/core-web-vitals + TypeScript) |
| `npm run typecheck` | `tsc --noEmit` |

---

## Design system — "Forest Premium"

| Token | Hex | Use |
| --- | --- | --- |
| `forest` | `#123A2C` | Hero and feature panels, primary buttons |
| `deep` | `#0B2A20` | Header, footer, stats strip, body text; dark-mode background |
| `sage` | `#DCE7DE` | Alternate section background, hero side panel |
| `cream` | `#F4F1E8` | Page background, text on dark green |
| `gold` | `#C9A24B` | Accent buttons, figures and labels **on dark green only** |
| `gold-dark` | `#7A5C14` | Gold-toned text on light backgrounds (meets WCAG AA) |
| `gold-icon` | `#9A7524` | Icons on light backgrounds |

- **Dark mode:** toggle in the header (sun/moon); follows the visitor's OS setting by default and is remembered per browser (`next-themes`, `class` strategy). Dark theme variables are in `src/app/globals.css`.
- **Type:** Outfit (self-hosted via `next/font`), with Noto Sans Devanagari for Hindi/Marathi (downloaded only when Devanagari text renders) and the visitor's system Japanese font for Japanese. Display headings use the `.display` class — extra-light (200) with `<strong>` for the medium-weight emphasis, e.g. `Calm, reliable IT for <strong>growing businesses.</strong>`.
- **Labels:** `.eyebrow` (light backgrounds) and `.eyebrow-on-dark` — small, uppercase, widely tracked gold text above headings.
- **Shape:** sharp corners (`--radius: 0.25rem`), thin gold rules instead of boxed cards, no gradients.
- Tokens live in `tailwind.config.ts` (palette) and `src/app/globals.css` (light/dark theme variables).

## Languages

The site ships in **English (default), हिन्दी, मराठी, Deutsch, Español, Français and 日本語**. Visitors switch language from the globe button in the header; the choice is remembered in the `NEXT_LOCALE` cookie.

- **URLs:** English stays on clean URLs (`/services`); other languages are prefixed (`/de/services`, `/hi/pricing`). `/en/...` permanently redirects to the unprefixed URL. Routing lives in `src/middleware.ts`; every page sits under `src/app/[locale]/`.
- **SEO:** each page declares `hreflang` alternates for all languages plus `x-default`, a per-language canonical and `og:locale`; `sitemap.xml` lists every language version with its alternates.
- **Strings:** `src/i18n/dictionaries/en.ts` is the source of truth. The other files (`hi`, `mr`, `de`, `es`, `fr`, `ja`) are typed as `Dictionary`, so a missing or misspelt key fails the build. `{name}`-style placeholders are filled with `fmt()`. Records keyed by English text (`budgets`, `errors`, search `types`…) keep their English keys — only the values are translated — so submitted form values stay English for your team.
- **What's translated:** navigation, header/footer, forms and validation messages, chat widget, cookie banner, the full home page, service names and summaries, categories, industries, pricing models, every page hero and section heading, and SEO titles/descriptions.
- **What stays English (for now):** long-form bodies in `src/content` / the CMS — service write-ups, case studies, blog posts, job descriptions, about story/team, FAQ-page answers and legal text. Non-English pages that show these display a short "available in English" note (`EnglishOnlyNote`).
- **Chatbot:** the widget sends the visitor's language and the assistant replies in it.
- **Review:** the translations were written for launch but should be checked by native speakers before going live, especially legal-adjacent wording (consent text, cookie banner).

**Add a language:** add its code to `locales` in `src/i18n/config.ts` (plus `localeNames`, `localeTags`, `ogLocales`), create `src/i18n/dictionaries/<code>.ts` typed as `Dictionary`, and register it in `src/i18n/dictionaries/index.ts`. Run `npm run build` — the type checker lists anything you missed.

**Use `Link` from `@/i18n/link`** (not `next/link`) for internal links so they keep the visitor's language.

## Make it yours (first 30 minutes)

1. **Business details** — edit `src/content/site.ts` (city, phone, WhatsApp, email, address, founded year, team size, socials, hours, map embed). Everything — pages, schema markup, emails, local SEO URLs — reads from here.
2. **Tagline** — set in `site.ts`; three alternatives are listed in the comments.
3. **Logo** — replace the text logo in `src/components/layout/logo.tsx` and the favicon `src/app/icon.svg`.
4. **Content** — services (`services.ts`), case studies & testimonials (`portfolio.ts`), team/jobs/industries/tech (`company.ts`), blog (`blog.ts`), FAQs/pricing/locations/nav (`misc.ts`). Or move it into Sanity (below).
5. **Client logos** — `clientLogos` in `portfolio.ts` are text placeholders; swap the marquee in `components/sections/client-logos.tsx` for `next/image` logos in `/public/clients`.
6. **Legal pages** — fill in the Grievance Officer in `app/privacy-policy/page.tsx` and have all four policies reviewed by a lawyer.

---

## Environment variables

See `.env.example` for the full annotated list.

| Variable | Required for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, OG | e.g. `https://www.friendsitsolutions.com` |
| `RESEND_API_KEY`, `EMAIL_FROM`, `ADMIN_EMAIL` | Sending email | Verify your domain in Resend. `ADMIN_EMAIL` accepts a comma-separated list |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Storing submissions + uploads | Server-only key. Run `supabase/schema.sql` first |
| `SUPABASE_UPLOAD_BUCKET` | File uploads | Defaults to `uploads` (private bucket created by the SQL) |
| `IP_HASH_SALT` | Spam/abuse tracking | IPs are stored only as salted hashes |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Spam protection | Widget appears on all forms when set |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD` | `/admin` dashboard | HTTP Basic Auth; dashboard returns 503 when unset |
| `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN` | Headless CMS | Optional; falls back to local content |
| `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL` | AI chatbot | Optional; defaults to `claude-opus-5-5` |
| `NEXT_PUBLIC_CAL_LINK` | Book-a-meeting embed | Your Cal.com `user/event` slug |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID` | Analytics | Loaded **only after cookie consent** |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console | HTML-tag verification token |

---

## Project structure

```
friendsitsolutions/
├── cms/sanity/schemas/      Sanity schemas: service, caseStudy, post, category, teamMember, testimonial, job
├── supabase/schema.sql      Tables, RLS, private upload bucket, retention helper
├── public/
└── src/
    ├── app/                 Routes (App Router)
    │   ├── [locale]/                    Every public page, once per language (layout.tsx is the root layout)
    │   ├── page.tsx                     Home
    │   ├── services/ [slug]/            Services hub + 26 detail pages (one template)
    │   ├── portfolio/ [slug]/           Filterable case studies
    │   ├── blog/ [slug] category tag author/
    │   ├── careers/ [slug]/             Openings + application with resume upload
    │   ├── locations/[slug]/            Local SEO landing pages
    │   ├── about industries technologies pricing testimonials faq contact
    │   ├── get-a-quote support book-a-meeting client-portal search thank-you
    │   ├── privacy-policy terms-and-conditions refund-policy cookie-policy
    │   ├── admin/                       Leads dashboard + CSV export (Basic Auth)
    │   ├── api/forms/[type]/            Single form pipeline (contact|quote|career|support|newsletter)
    │   ├── api/chat/                    Chatbot endpoint
    │   ├── sitemap.ts robots.ts manifest.ts opengraph-image.tsx
    ├── components/
    │   ├── ui/              Button, Card, Input/Textarea/Select, Label, Accordion, Badge, Sheet
    │   ├── layout/          Header (mega menu), Footer, Logo, ThemeToggle, LanguageSwitcher, Providers
    │   ├── sections/        Hero, Stats, cards, FAQ, CTA, PageHero, EnglishOnlyNote…
    │   ├── forms/           Contact, multi-step Quote, Career, Support, Newsletter, Turnstile, FileInput
    │   ├── widgets/         Chat widget, WhatsApp + click-to-call dock, Cookie consent, Analytics
    │   └── seo/json-ld.tsx
    ├── content/             Typed site content (the single source when no CMS is connected)
    ├── i18n/                Locale config, dictionaries (en + 6 translations), provider, localized Link
    ├── lib/                 cms, seo, schema (JSON-LD), db, email, forms/*, search, og
    └── middleware.ts        Language routing + /admin protection
```

---

## Features

**Pages** — every page from the brief, including 26 service detail pages generated from one template (hero, problem/solution, what's included, process, technologies, benefits, related case study, starting price, 6 FAQs, testimonial, related services, CTA), 3 local-SEO pages, blog category/tag/author archives, a 404 page and thank-you pages.

**Lead capture** — every form goes through `src/lib/forms/handler.ts`:
rate limit (per IP) → honeypot → Turnstile → Zod validation (same schema as the client) → HTML/control-char sanitisation → file type/size checks → Supabase insert + private storage upload → admin notification (with attachments) **and** auto-reply to the visitor → JSON response with a reference number.

**Multi-step quote** — services (pre-selected via `?service=slug` from service pages), project type, description, attachments (≤3 × 5 MB), budget, timeline, contact details, preferred channel.

**Chatbot** — `components/widgets/chat-widget.tsx` (lazy-loaded). With `ANTHROPIC_API_KEY` it uses Claude, grounded in a system prompt built from your services, pricing and FAQs (`lib/chat-knowledge.ts`); without it, a keyword matcher answers from the same content. Visitors can leave name/email/phone for a callback — stored as a lead with the transcript.

**Admin dashboard** — `/admin`: tabs for leads, quotes, applications, tickets and subscribers; search; status updates (new → contacted → won/lost); signed download links for uploads; CSV export (with formula-injection protection).

**Other** — floating WhatsApp button, mobile click-to-call bar, Cal.com booking embed, client-portal placeholder (wire to Supabase Auth), site-wide search, newsletter, light/dark/system theme, consent-gated GA4 and Meta Pixel.

---

## SEO

- Unique `title`/`description`, canonical, Open Graph and Twitter card on every page (`lib/seo.ts`); branded dynamic OG images (site-wide and per blog post).
- JSON-LD: Organization, LocalBusiness (ProfessionalService), Service, FAQPage, BreadcrumbList, BlogPosting, Review/AggregateRating, JobPosting (`lib/schema.ts`).
- `sitemap.xml` and `robots.txt` generated from content; clean URLs like `/services/mobile-app-development`.
- Local SEO pages: `/locations/it-company-in-<city>`, `/locations/website-development-in-<city>`, `/locations/mobile-app-development-in-<city>` — add more in `locationPages` (`content/misc.ts`).
- One `h1` per page, logical heading order, breadcrumbs and heavy internal linking (mega menu, related services, footer).

**After launch:** verify the domain in Google Search Console (set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`), submit `/sitemap.xml`, create a Google Business Profile with the same NAP details as `site.ts`.

---

## Performance, accessibility & security

- Static generation for almost every page; client JS limited to interactive islands; chatbot loaded after hydration; `next/font` self-hosting; AVIF/WebP via `next/image` (configured remote hosts: Sanity CDN, Unsplash).
- WCAG 2.1 AA: skip link, keyboard-operable mega menu/tabs/carousel/accordion/dialogs, visible focus rings, `aria-*` on all form errors, colour pairs chosen for AA contrast in both themes, `prefers-reduced-motion` respected.
- Security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy) in `next.config.mjs`; `poweredByHeader` off; server-only secrets; Supabase RLS on with no public policies; private file bucket with short-lived signed URLs.
- Privacy (DPDP Act, 2023): explicit consent checkbox on every form, consent timestamp stored, IP hashing, cookie consent before any tracking, retention helper `purge_stale_submissions()` in the SQL, DPDP-aligned privacy policy template.

> **Rate limiting** is in-memory per server instance. On Vercel's multi-instance runtime, switch `lib/forms/rate-limit.ts` to Upstash Redis (`@upstash/ratelimit`) for strict global limits.
>
> **CSP:** if you add third-party scripts or embeds, add their domains to the CSP in `next.config.mjs`.

---

## Headless CMS (Sanity)

Schemas live in `cms/sanity/schemas` and mirror `src/content/types.ts`. See `cms/sanity/README.md` to scaffold a Studio. Once `SANITY_PROJECT_ID` is set, `src/lib/cms.ts` reads services, case studies, posts, testimonials, team and jobs from Sanity (ISR, 5-minute revalidation) and falls back to local content for any empty collection. Portable Text blog bodies are converted automatically.

Using Strapi instead? Replace `sanityFetch` in `lib/cms.ts` with calls to the Strapi REST API and map the response to the same types.

---

## Database (Supabase)

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor (tables `leads`, `quotes`, `job_applications`, `support_tickets`, `newsletter_subscribers`, plus the private `uploads` bucket).
3. Copy the project URL and **service-role** key into `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`.
4. Optional: schedule `purge_stale_submissions()` with `pg_cron` for data retention.

---

## Deploying to Vercel

1. Import `ramchavan00001/friendsitsolutions` in Vercel.
2. Keep the default Root Directory (the repository root); the framework preset is Next.js.
3. Add the environment variables from `.env.example` (at minimum `NEXT_PUBLIC_SITE_URL`, Resend, Supabase, Turnstile and admin credentials).
4. Deploy, then add your custom domain and enable HTTPS (automatic on Vercel).
5. In Resend, verify the sending domain (SPF/DKIM). In Cloudflare Turnstile, add the production domain to the widget.
6. Post-launch checklist: submit the sitemap in Search Console, test every form end-to-end (check both the admin email and the auto-reply), confirm `/admin` prompts for credentials, run Lighthouse on mobile.

---

## Verified locally

- `npm run build` — type-check and lint clean; 570 static pages generated (every page in 7 languages).
- axe-core WCAG 2.1 A/AA scan: 0 violations on 13 key pages × 7 languages × light and dark mode; no horizontal overflow at 375px or in the desktop header at 1024–1440px in any language.
- Lighthouse (mobile emulation, local production build): Accessibility 100, Best Practices 100, SEO 100 on the pages tested; Performance 93–95 on inner pages and 80–87 on the animation-heavy home page. Re-measure on the deployed site, where CDN caching lowers server response time.

# Sanity CMS schemas

These schemas mirror the TypeScript types in `src/content/types.ts`, so content authored in
Sanity drops straight into the site via `src/lib/cms.ts`.

## Setup

```bash
npm create sanity@latest -- --project <id> --dataset production --template clean --output-path studio
cp -r cms/sanity/schemas studio/schemaTypes   # then export them from studio/schemaTypes/index.ts
cd studio && npm run dev                       # Studio on http://localhost:3333
```

Then set `SANITY_PROJECT_ID` (and `SANITY_DATASET`) in the website's environment. Pages
revalidate every 5 minutes; add a Sanity webhook that calls `revalidateTag("sanity")` for
instant updates.

Until a collection has at least one document in Sanity, the site keeps using local content.

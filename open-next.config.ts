import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Prerendered pages are served read-only from Workers static assets, so no R2 bucket is needed.
 * Content changes go live on the next deploy. If you connect Sanity and want its 5-minute refresh
 * without redeploying, switch to the R2 incremental cache: https://opennext.js.org/cloudflare/caching
 */
export default defineCloudflareConfig({
	incrementalCache: staticAssetsIncrementalCache,
});

import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/i18n/config";

/** Files served from the app root that must never be locale-prefixed. */
const ROOT_FILES = new Set(["/sitemap.xml", "/robots.txt", "/manifest.webmanifest", "/icon.svg", "/opengraph-image", "/twitter-image"]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) return adminAuth(req);
  if (ROOT_FILES.has(pathname) || pathname.startsWith("/opengraph-image") || pathname.startsWith("/twitter-image")) {
    return NextResponse.next();
  }

  const first = pathname.split("/")[1];

  // Prefixed: /de/services → serve as-is and remember the choice. /en/... → canonical unprefixed URL.
  if (isLocale(first)) {
    if (first === defaultLocale) {
      const url = req.nextUrl.clone();
      url.pathname = pathname.slice(3) || "/";
      const res = NextResponse.redirect(url, 308);
      res.cookies.set(LOCALE_COOKIE, defaultLocale, { path: "/", maxAge: 31536000, sameSite: "lax" });
      return res;
    }
    const res = NextResponse.next();
    if (req.cookies.get(LOCALE_COOKIE)?.value !== first) {
      res.cookies.set(LOCALE_COOKIE, first, { path: "/", maxAge: 31536000, sameSite: "lax" });
    }
    return res;
  }

  // Unprefixed: a visitor who previously picked another language goes back to it.
  const remembered = req.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(remembered) && remembered !== defaultLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/${remembered}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url, 307);
  }

  // Otherwise serve English under the clean URL.
  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

/**
 * Protects /admin with HTTP Basic Auth (ADMIN_USERNAME / ADMIN_PASSWORD).
 * If credentials aren't configured the dashboard is locked entirely.
 */
function adminAuth(req: NextRequest) {
  const user = process.env.ADMIN_USERNAME;
  const pass = process.env.ADMIN_PASSWORD;
  if (!user || !pass) {
    return new NextResponse("Admin dashboard is disabled. Set ADMIN_USERNAME and ADMIN_PASSWORD.", { status: 503 });
  }
  const header = req.headers.get("authorization") ?? "";
  const [scheme, encoded] = header.split(" ");
  if (scheme === "Basic" && encoded) {
    const [u, ...rest] = atob(encoded).split(":");
    if (safeEqual(u, user) && safeEqual(rest.join(":"), pass)) {
      const res = NextResponse.next();
      res.headers.set("X-Robots-Tag", "noindex, nofollow");
      res.headers.set("Cache-Control", "no-store");
      return res;
    }
  }
  return new NextResponse("Authentication required", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="FriendsIT Admin", charset="UTF-8"' } });
}

/** Length-independent comparison to avoid leaking credentials through timing. */
function safeEqual(a: string, b: string) {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

// Everything except API routes, Next internals and static files (anything with an extension except .xml/.txt handled above).
export const config = { matcher: ["/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|avif|ico|woff2?|ttf|js|css|map)$).*)"] };

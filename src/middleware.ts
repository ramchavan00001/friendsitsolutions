import { NextResponse, type NextRequest } from "next/server";

/**
 * Protects /admin with HTTP Basic Auth (ADMIN_USERNAME / ADMIN_PASSWORD).
 * If credentials aren't configured the dashboard is locked entirely.
 */
export function middleware(req: NextRequest) {
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

export const config = { matcher: ["/admin", "/admin/:path*"] };

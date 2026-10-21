import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE } from "@/lib/auth/session";

/**
 * Next.js 16 Proxy (formerly Middleware).
 *
 * This performs an OPTIMISTIC redirect for `/admin` routes only. It is NOT the
 * authorization boundary — every admin server component and Server Action
 * independently verifies the session server-side via `requireAdmin()`.
 */
function secret(): Uint8Array {
  const s = process.env.AUTH_SECRET;
  if (!s) return new Uint8Array();
  return new TextEncoder().encode(s);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedAdmin =
    pathname === "/admin" || pathname.startsWith("/admin/");
  const isLogin = pathname === "/admin/login";

  if (isProtectedAdmin && !isLogin) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const key = secret();
    let ok = false;
    if (token && key.length > 0) {
      try {
        await jwtVerify(token, key);
        ok = true;
      } catch {
        ok = false;
      }
    }
    if (!ok) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

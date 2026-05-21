import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin/dashboard and /api/admin/* (except login)
  if (
    pathname.startsWith("/admin/dashboard") ||
    (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/login"))
  ) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // If logged in, redirect /admin to /admin/dashboard
  if (pathname === "/admin") {
    const token = request.cookies.get("admin_token")?.value;
    if (token) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

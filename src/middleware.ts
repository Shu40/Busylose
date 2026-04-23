import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Simple in-memory rate limit (Note: in serverless, this is per-instance)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;
    const ip = req.ip || req.headers.get("x-forwarded-for") || "unknown";

    // 1. Basic Rate Limiting for API routes
    if (pathname.startsWith("/api/")) {
      const now = Date.now();
      const limit = 100; // 100 requests per minute
      const window = 60000;
      
      const record = rateLimitMap.get(ip) || { count: 0, lastReset: now };
      
      if (now - record.lastReset > window) {
        record.count = 1;
        record.lastReset = now;
      } else {
        record.count++;
      }
      
      rateLimitMap.set(ip, record);

      if (record.count > limit) {
        return new NextResponse("Too Many Requests", { status: 429 });
      }
    }

    // 2. Strict Access Control
    const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
    if (isAdminRoute && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (token?.isBlocked) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("error", "Your account is blocked.");
      return NextResponse.redirect(url);
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const publicPaths = ["/", "/login", "/signup", "/api/auth"];
        const isPublic = publicPaths.some(path => req.nextUrl.pathname === path);
        if (isPublic) return true;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*", 
    "/api/admin/:path*",
    "/contribute", 
    "/profile/:path*",
    "/api/((?!auth).*)", // Rate limit all APIs except auth
  ],
};


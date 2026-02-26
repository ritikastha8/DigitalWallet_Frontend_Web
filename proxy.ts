import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_PATHS = ["/login", "/register", "/forget-password", "/pinsetup"];
const AUTH_PATH_PREFIX = "/reset-password";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;

  const isProtectedUser = pathname.startsWith("/user");
  const isProtectedAdmin = pathname.startsWith("/admin");
  const isProtectedPay = pathname === "/pay";
  const isProtected = isProtectedUser || isProtectedAdmin || isProtectedPay;

  const isAuthPath =
    AUTH_PATHS.some((p) => pathname === p) ||
    pathname.startsWith(AUTH_PATH_PREFIX);

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    const from = pathname + request.nextUrl.search;
    loginUrl.searchParams.set("from", from);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/user/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user/:path*",
    "/admin/:path*",
    "/pay",
    "/login",
    "/register",
    "/forget-password",
    "/pinsetup",
    "/reset-password/:path*",
  ],
};

import { sessionStatus } from "./utils/session";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(req) {
  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === "/login";
  const isProtectedRoute = pathname.startsWith("/chat/") || pathname === "/";

  if (isLoginPage && sessionStatus) {
    const absoluteUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }

  if (isProtectedRoute && !sessionStatus) {
    const absoluteUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
}

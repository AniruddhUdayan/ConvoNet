import { sessionStatus } from "./utils/session";
import { adminStatus } from "./utils/session";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(req) {
  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === "/login";
  const isAdminPage = pathname === "/admin";
  const isDashboardPage = pathname === "/admin/dashboard";
  const isProtectedRoute = pathname.startsWith("/chat/") || pathname === "/" || pathname === "/groups";

  if (isLoginPage && sessionStatus) {
    const absoluteUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }

  if (isProtectedRoute && !sessionStatus) {
    const absoluteUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  if(isAdminPage && adminStatus){
    const absoluteUrl = new URL("/admin/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());;
  }
  if(isDashboardPage && !adminStatus){
    const absoluteUrl = new URL("/admin", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
}

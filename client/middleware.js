import { adminStatus, fetchSessionStatus } from "./utils/session";
import { NextRequest, NextResponse } from "next/server";



export default async function middleware(req) {
  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === "/login";
  const isAdminPage = pathname === "/admin";
  const isDashboardPage = pathname === "/admin/dashboard";
  const isProtectedRoute =
    pathname.startsWith("/chat/") || pathname === "/" || pathname === "/groups";
    const token = req.cookies.get("token") || ''

  if (isLoginPage && token) {
    const absoluteUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }

  if (isProtectedRoute && !token) {
    const absoluteUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  if (isAdminPage && adminStatus) {
    const absoluteUrl = new URL("/admin/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  if (isDashboardPage && !adminStatus) {
    const absoluteUrl = new URL("/admin", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
}

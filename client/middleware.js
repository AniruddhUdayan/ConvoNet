// import { sessionStatus } from "./utils/session";
import { adminStatus, fetchSessionStatus } from "./utils/session";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { useEffect, useState } from "react";

const server = process.env.NEXT_PUBLIC_SERVER;
console.log(server);

export default async function middleware(req) {
  // useEffect(() => {
  //   axios
  //     .get(`${server}/user/me`, { withCredentials: true })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     }),
  //     [];
  // });
  const sessionStatus = await fetchSessionStatus()

  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === "/login";
  const isAdminPage = pathname === "/admin";
  const isDashboardPage = pathname === "/admin/dashboard";
  const isProtectedRoute =
    pathname.startsWith("/chat/") || pathname === "/" || pathname === "/groups";

  if (isLoginPage && sessionStatus) {
    const absoluteUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }

  if (isProtectedRoute && !sessionStatus) {
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

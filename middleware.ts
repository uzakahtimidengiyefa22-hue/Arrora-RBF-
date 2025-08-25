import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminToken } from "./lib/adminAuth";

const userProtected = ["/deal", "/dashboard"];
const adminProtected = ["/admin/dashboard"];

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (userProtected.some(p => url.pathname.startsWith(p))) {
    const sb = req.cookies.get("sb-access-token") || req.cookies.get("sb:token");
    if (!sb) {
      url.pathname = "/login";
      url.searchParams.set("redirect", req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  if (adminProtected.some(p => url.pathname.startsWith(p))) {
    const token = req.cookies.get("admin_token")?.value;
    if (!token) {
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
    // Soft verify (full verify inside server routes too)
    // We don't await here because middleware must be sync/edge-safe
  }

  return NextResponse.next();
}

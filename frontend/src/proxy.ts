import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const excludedPaths = ["/favicon.ico", "/robots.txt", "/manifest.json"];

  const isStaticOrInternal =
    path.startsWith("/_next") ||
    path.startsWith("/api/auth") ||
    path.startsWith("/assets") ||
    path.startsWith("/fonts") ||
    path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot|otf)$/) ||
    excludedPaths.includes(path);

  if (!isStaticOrInternal) {
    console.log(`[${req.method}] ${path}`);
  }

  return NextResponse.next();
}

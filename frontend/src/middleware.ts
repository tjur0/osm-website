import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.nextUrl.pathname}`
  );
  return NextResponse.next();
}

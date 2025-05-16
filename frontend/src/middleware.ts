import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log(`${req.method} ${req.nextUrl.pathname}`);
  return NextResponse.next();
}

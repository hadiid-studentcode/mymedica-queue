import { NextResponse, NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const isApiRoute = request.nextUrl.pathname.startsWith("/api");

  // Jika API dan tidak ada sesi → kembalikan JSON 401
  if (!sessionCookie && isApiRoute) {
    return NextResponse.json(
      { message: "Unauthorized: Session invalid or expired" },
      { status: 401 }
    );
  }

  // Jika Page dan tidak ada sesi → redirect ke /sign-in
  if (!sessionCookie && !isApiRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tenant/:path*",
    "/api/tenant/:path*",
    "/api/queue/:path*",
    "/api/stage/:path*",
    "/api/send-mail/:path*",
  ],
};

import { NextRequest, NextResponse } from "next/server";

// Next.js 16 Proxy (Replaces Middleware)
// Runs on Node.js runtime by default
export function proxy(req: NextRequest) {
  // Add custom headers, auth checks, or logging here
  const response = NextResponse.next();
  
  // Example: Add a custom header to all responses
  response.headers.set("X-Powered-By", "Shorty-NextJS-16");
  
  return response;
}

// Config to specify which routes this proxy should handle
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

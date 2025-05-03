import { NextResponse } from "next/server";

// Specify which routes to apply middleware to
export const config = {
  matcher: [
    "/assessments/:path*",
    "/comments/:path*",
    "/workload-report/:path*",
    "/",
  ],
};

const protectedRoutes = ["/", "/assessments", "/comments", "/workload-report"];

export function middleware(req) {
  const token = req.cookies.get("auth_token")?.value;
  const path = req.nextUrl.pathname;

  console.log("Middleware - Request Path:", path);

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || (route !== "/" && path.startsWith(route))
  );

  // Redirect to login if accessing a protected route without a token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Continue if authenticated or accessing public route
  return NextResponse.next();
}

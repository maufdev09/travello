import { i } from "framer-motion/client";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

type userRole = "TOURIST" | "GUIDE" | "ADMIN";

type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/settings"],
  patterns: [],
};

const guideProtectedRoutes: RouteConfig = {
  patterns: [/^\/guide/],
  exact: [],
};

const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin/],
  exact: [],
};

const touristProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard/],
  exact: [],
};

const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route) => route === pathname);
};
const isRouteMatched = (pathname: string, routes: RouteConfig): boolean => {
  if (routes.exact.includes(pathname)) {
    return true;
  }

  return routes.patterns.some((pattern) => pattern.test(pathname));
};

const getRouteOwner = (pathname: string): userRole | "COMMON" | null => {
  if (isRouteMatched(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isRouteMatched(pathname, guideProtectedRoutes)) {
    return "GUIDE";
  }
  if (isRouteMatched(pathname, touristProtectedRoutes)) {
    return "TOURIST";
  }
  if (isRouteMatched(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};

const getDefaultDashboardRoute = (role: userRole): string => {
  if (role === "ADMIN") {
    return "/admin/dashboard";
  }
  if (role === "GUIDE") {
    return "/guide/dashboard";
  }

  if (role === "TOURIST") {
    return "/dashboard";
  }
  return "/";
};

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();

  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get("accessToken")?.value || null;

  let userRole: userRole | null = null;

  if (accessToken) {
    const verifiedToken: JwtPayload | string = jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string
    );

    if (typeof verifiedToken === "string") {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    userRole = verifiedToken.role;


  }
  const  routeOwner= getRouteOwner(pathname);

  const isAuth=isAuthRoute(pathname);

  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole as userRole), request.url)
    );
    
  }

  if (routeOwner === null ) {
    return NextResponse.next();
  }

  if (!accessToken) {

    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl)
    }


  if (routeOwner === "COMMON") {
    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }


if (routeOwner==="ADMIN"|| routeOwner==="GUIDE"|| routeOwner==="TOURIST") {
    if (userRole !== routeOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as userRole), request.url)
      );
    }

  return NextResponse.next();
}
  return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};

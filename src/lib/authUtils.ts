export type userRole = "TOURIST" | "GUIDE" | "ADMIN";

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/settings"],
  patterns: [],
};

const guideProtectedRoutes: RouteConfig = {
  patterns: [/^\/guide/],
  exact: [],
};

export const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin/],
  exact: [],
};

const touristProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard/],
  exact: [],
};

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route) => route === pathname);
};
export const isRouteMatched = (
  pathname: string,
  routes: RouteConfig
): boolean => {
  if (routes.exact.includes(pathname)) {
    return true;
  }

  return routes.patterns.some((pattern) => pattern.test(pathname));
};

export const getRouteOwner = (pathname: string): userRole | "COMMON" | null => {
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

export const getDefaultDashboardRoute = (role: userRole): string => {
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

export const isValidRedirectForRole = (
  redirectPath: string,
  role: userRole
): boolean => {
  const routeOwner = getRouteOwner(redirectPath);
  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }
  if (routeOwner === role) {
    return true;
  }
  return false;
};

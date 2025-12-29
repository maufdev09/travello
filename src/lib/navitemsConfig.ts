import { NavSection } from "@/types/dashboardInterface";
import { getDefaultDashboardRoute, userRole } from "./authUtils";

export const getCommonNavItems = (role: userRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["TOURIST", "GUIDE", "ADMIN"],
        },
        {
          title: "My Profile",
          href: `/my-profile`,
          icon: "User",
          roles: ["TOURIST", "GUIDE", "ADMIN"],
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Settings", // ✅ String
          roles: ["TOURIST", "GUIDE", "ADMIN"],
        },
      ],
    },
  ];
};
export const guideNavItems: NavSection[] = [];
export const adminNavItems: NavSection[] = [];
export const touristNavItems: NavSection[] = [];

export const getNavItemsByRole = (role: userRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "GUIDE":
      return [...commonNavItems, ...touristNavItems];
    case "TOURIST":
      return [...commonNavItems, ...guideNavItems];
    default:
      return [];
  }
};

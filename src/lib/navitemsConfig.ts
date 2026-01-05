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
export const guideNavItems: NavSection[] = [
  {
    title: "Listing Management",
    items: [
      {
        title: "Listing Management",
        href: "/guide/dashboard/listing-management",
        icon: "Admin", // ✅ String
        roles: ["TOURIST", "GUIDE", "ADMIN"],
      },

    ],
  },
];
export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Admin Management",
        href: "/admin/dashboard/admin-management",
        icon: "Admin", // ✅ String
        roles: ["TOURIST", "GUIDE", "ADMIN"],
      },
      {
        title: "Guide Management",
        href: "/admin/dashboard/guide-management",
        icon: "Admin", // ✅ String
        roles: ["TOURIST", "GUIDE", "ADMIN"],
      },
      {
        title: "Tourist Management",
        href: "/admin/dashboard/tourist-management",
        icon: "Admin", // ✅ String
        roles: ["TOURIST", "GUIDE", "ADMIN"],
      },
    ],
  },
];
export const touristNavItems: NavSection[] = [
  
];

export const getNavItemsByRole = (role: userRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "GUIDE":
      return [...commonNavItems, ...guideNavItems];
    case "TOURIST":
      return [...commonNavItems, ...touristNavItems];
    default:
      return [];
  }
};

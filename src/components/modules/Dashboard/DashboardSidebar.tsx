import { getUserInfo } from "@/services/auth/getUserInfo";
import { UserInfo } from "@/types/userInterface";
import React from "react";
import DAshboardSidebarcontent from "./DAshboardSidebarcontent";
import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { NavSection } from "@/types/dashboardInterface";
import { getNavItemsByRole } from "@/lib/navitemsConfig";

const DashboardSidebar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;

  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DAshboardSidebarcontent
      navItems={navItems}
      dashboardHome={dashboardHome}
      userInfo={userInfo}
    />
  );
};

export default DashboardSidebar;

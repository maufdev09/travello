import React from "react";
import { getUserInfo } from "@/services/auth/getUserInfo";
import DashboardNavbarContent from "./DashboardNavbarContent";
import { getNavItemsByRole } from "@/lib/navitemsConfig";
import { NavSection } from "@/types/dashboardInterface";
import { UserInfo } from "@/types/userInterface";
import { getDefaultDashboardRoute } from "@/lib/authUtils";

const DashboardNavbar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;
    const dashboardHome = getDefaultDashboardRoute(userInfo.role);
  

  const navItems: NavSection[] = getNavItemsByRole(userInfo?.role);
  return <DashboardNavbarContent navItems={navItems} dashboardHome={dashboardHome} userInfo={userInfo} />;
};
export default DashboardNavbar;

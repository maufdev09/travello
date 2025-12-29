"use client";

import { Button } from "@/components/ui/button";
import { UserInfo } from "@/types/userInterface";
import { Bell, Menu, Search } from "lucide-react";
import UserDropdown from "./UserDropdown";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavSection } from "@/types/dashboardInterface";
import DashboardMobileSidebar from "./DashboardMobileSidebar";
import { useEffect, useState } from "react";

interface DashboarNavbarContentProps {
  userInfo: UserInfo;
  navItems?: NavSection[];
  dashboardHome?: string;
}

const DashboardNavbarContent = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboarNavbarContentProps) => {
  const [isOpen, setIsOpen]=useState(false)
  const [ismobile, setIsMobile] = useState(false);


  useEffect(() => {
const checkSmallerScreen = () => {
  setIsMobile(window.innerWidth < 768);
};

checkSmallerScreen();

window.addEventListener("resize", checkSmallerScreen);

return () => {
  window.removeEventListener("resize", checkSmallerScreen);
}

  }, [])
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        <Sheet open={isOpen && ismobile}  onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-64 p-0">
            <DashboardMobileSidebar
              navItems={navItems || []}
              dashboardHome={dashboardHome|| ""}
              userInfo={userInfo}
            />
          </SheetContent>
        </Sheet>

        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-md border bg-background pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Right side Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          </Button>
          {/* User Dropdown */}
          <UserDropdown userInfo={userInfo} />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbarContent;

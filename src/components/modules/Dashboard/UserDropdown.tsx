"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/services/auth/logoutUser";
import { UserInfo } from "@/types/userInterface";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
interface DashboarNavbarContentProps {
  userInfo: UserInfo | null;
}

const UserDropdown = ({ userInfo }: DashboarNavbarContentProps) => {

  const handleLogout = async () => {
    await logoutUser();
  };

  return <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9 rounded-full bg-muted font-semibold hover:bg-muted/80"
    >
      {/* {userInfo?.name.charAt(0).toUpperCase()} */}
      Name
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent
    align="end"
    sideOffset={8}
    className="w-64 rounded-xl p-2 shadow-lg"
  >
    {/* User Info */}
    <DropdownMenuLabel className="rounded-lg bg-muted px-3 py-2">
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-semibold leading-none">
          {/* {userInfo?.name} */}
          Name
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {userInfo?.email}
        </p>
        <span className="w-fit rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary capitalize">
          {userInfo?.role.toLowerCase()}
        </span>
      </div>
    </DropdownMenuLabel>

    <DropdownMenuSeparator className="my-2" />

    {/* Menu Items */}
    <DropdownMenuItem asChild>
      <Link
        href="/my-profile"
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
      >
        <User className="h-4 w-4" />
        My Profile
      </Link>
    </DropdownMenuItem>

    <DropdownMenuItem asChild>
      <Link
        href="/change-password"
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
      >
        <Settings className="h-4 w-4" />
        Change Password
      </Link>
    </DropdownMenuItem>

    <DropdownMenuSeparator className="my-2" />

    {/* Logout */}
    <DropdownMenuItem
      onClick={handleLogout}
      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50 focus:bg-red-50"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

};

export default UserDropdown;

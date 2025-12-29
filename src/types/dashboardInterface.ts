import { userRole } from "@/lib/authUtils";

export interface NavItem {
  title: string;
  href: string;
  icon: string; // ✅ changed from LucideIcon to string
  badge?: string | number;
  description?: string;
  roles: userRole[];
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}
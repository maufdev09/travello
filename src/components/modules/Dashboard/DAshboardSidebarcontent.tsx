"use client";

import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { NavSection } from '@/types/dashboardInterface';
import { UserInfo } from '@/types/userInterface'
import { Bell } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getIconComponent } from '@/lib/icon-mapper';

interface DashboardSidebarContentProps{
    userInfo:UserInfo;
    navItems:NavSection[];
    dashboardHome:string
}

const DAshboardSidebarcontent = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardSidebarContentProps) => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r bg-background">
      
      {/* Logo / Brand */}
      <div className="sticky top-0 z-10 flex h-16 items-center border-b px-6">
        <Link href={dashboardHome} className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            TR
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Travello
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {navItems.map((section, sectionIdx) => (
            <div key={sectionIdx} className="space-y-2">
              
              {section.title && (
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </p>
              )}

              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = getIconComponent(item.icon);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-primary-foreground" />
                      )}
                      <Icon className="h-4 w-4" />

                      <Bell className="h-4 w-4 shrink-0" />

                      <span className="flex-1 truncate">
                        {item.title}
                      </span>

                      {item.badge && (
                        <Badge
                          variant={isActive ? "secondary" : "outline"}
                          className="ml-auto"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>

              {sectionIdx < navItems.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User Info */}
      <div className="sticky bottom-0 border-t bg-background px-4 py-3">
        <div className="flex items-center gap-3">
          
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <span className="text-sm font-semibold text-primary">
              {userInfo?.name?.charAt(0)?.toUpperCase() ?? "U"}
            </span>
          </div>

          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">
              {userInfo?.name ?? "User"}
            </p>
            <p className="text-xs capitalize text-muted-foreground">
              {userInfo?.role?.toLowerCase() ?? "guest"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DAshboardSidebarcontent

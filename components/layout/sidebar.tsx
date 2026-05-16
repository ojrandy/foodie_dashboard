"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationConfig } from "@/lib/config/navigation";
import { cn } from "@/lib/cn";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

export function Sidebar() {
  const pathname = usePathname();
  const sidebarOpen = useAppSelector((state: RootState) => state.ui.sidebarOpen);

  // Group navigation items
  const groups = Array.from(new Set(navigationConfig.map((item) => item.group)));

  if (!sidebarOpen) return null;

  return (
    <aside className="w-64 border-r bg-card flex flex-col hidden md:flex h-screen sticky top-0 overflow-y-auto">
      <div className="h-14 flex items-center px-6 border-b">
        <div className="font-bold text-lg tracking-tighter">FoodOps AI</div>
      </div>
      
      <div className="flex-1 py-4 px-3 flex flex-col gap-6">
        {groups.map((group) => (
          <div key={group || "General"} className="flex flex-col gap-1">
            {group && (
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-1">
                {group}
              </h4>
            )}
            <nav className="flex flex-col gap-1">
              {navigationConfig
                .filter((item) => item.group === group)
                .map((item) => {
                  const isActive = pathname === item.path || (pathname.startsWith(item.path) && item.path !== "/");
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}

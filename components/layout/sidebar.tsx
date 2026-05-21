"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationConfig } from "@/lib/config/navigation";
import { cn } from "@/lib/cn";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { motion, AnimatePresence } from "framer-motion";

export function Sidebar() {
  const pathname = usePathname();
  const sidebarOpen = useAppSelector((state: RootState) => state.ui.sidebarOpen);

  const groups = Array.from(new Set(navigationConfig.map((item) => item.group)));

  return (
    <AnimatePresence initial={false}>
      {sidebarOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 256, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative border-r border-border/40 glass flex-col hidden md:flex h-screen sticky top-0 overflow-visible shrink-0"
        >
          {/* Sidebar ambient glow */}
          <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-glow-1 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-glow-2 blur-[100px] pointer-events-none" />
          {/* Sidebar color bleed into main content area — wider spread */}
          <div className="absolute top-0 left-full w-48 h-full pointer-events-none sidebar-bleed" />
          <div className="absolute top-0 left-full ml-48 w-24 h-full pointer-events-none sidebar-bleed opacity-40" />

          <div className="relative h-14 flex items-center px-6 border-b border-border/40 shrink-0 z-10">
            <div className="font-bold text-lg tracking-tighter bg-gradient-to-r from-accent to-glow-2 bg-clip-text text-transparent">
              FoodOps AI
            </div>
          </div>

          <div className="relative flex-1 py-4 px-3 flex flex-col gap-6 overflow-y-auto custom-scrollbar w-64 z-10">
            {groups.map((group) => (
              <div key={group || "General"} className="flex flex-col gap-1">
                {group && (
                  <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-2">
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
                          className="relative outline-none"
                        >
                          <motion.div
                            whileHover={{ scale: 0.98 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 z-10 relative",
                              isActive
                                ? "text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="sidebar-active-indicator"
                                className="absolute inset-0 bg-primary rounded-md -z-10 shadow-[0_0_20px_var(--glow-1)]"
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              />
                            )}
                            <item.icon className={cn("h-4 w-4", isActive ? "text-accent" : "")} />
                            {item.label}
                          </motion.div>
                        </Link>
                      );
                    })}
                </nav>
              </div>
            ))}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

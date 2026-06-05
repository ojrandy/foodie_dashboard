"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationConfig } from "@/lib/config/navigation";
import { cn } from "@/lib/cn";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { RootState } from "@/store/store";
import { toggleSidebar } from "@/store/slices/uiSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((state: RootState) => state.ui.sidebarOpen);
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close sidebar by default on mobile and tablet devices
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      dispatch({ type: "ui/setSidebarOpen", payload: false });
    }
  }, [dispatch]);

  const groups = Array.from(new Set(navigationConfig.map((item) => item.group)));

  const content = (
    <>
      {/* Sidebar ambient glow */}
      <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-glow-1 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-glow-2 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-full w-48 h-full pointer-events-none sidebar-bleed hidden lg:block" />
      <div className="absolute top-0 left-full ml-48 w-24 h-full pointer-events-none sidebar-bleed opacity-40 hidden lg:block" />

      <div className="relative h-14 flex items-center justify-between px-4 border-b border-border/40 shrink-0 z-10">
        <div className="font-bold text-lg tracking-tighter bg-gradient-to-r from-accent to-glow-2 bg-clip-text text-transparent" suppressHydrationWarning>
          {mounted ? t("nav.title") : "FoodOps AI"}
        </div>
        <Button variant="ghost" size="icon" onClick={() => dispatch(toggleSidebar())} className="h-7 w-7">
          <X className="h-4 w-4" />
        </Button>
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
                      onClick={() => {
                        if (typeof window !== "undefined" && window.innerWidth < 1024) {
                          dispatch({ type: "ui/setSidebarOpen", payload: false });
                        }
                      }}
                      className="relative outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded-md"
                    >
                      <motion.div
                        whileHover={isActive ? { y: -1 } : { y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 z-10 relative",
                          isActive
                            ? "bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-text)] shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/40 hover:shadow-sm"
                        )}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="sidebar-active-indicator"
                            className="absolute left-0 top-1 bottom-1 w-[3px] rounded-r-full bg-[var(--sidebar-active-border)]"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <item.icon className={cn(
                          "h-4 w-4 transition-all duration-200 shrink-0",
                          isActive ? "text-[var(--sidebar-active-icon)]" : "text-muted-foreground"
                        )} />
                        {(() => {
                          const key = item.path === "/" ? "dashboard" : item.path.split("/").pop();
                          if (!mounted) return <span className="capitalize" suppressHydrationWarning>{item.label}</span>;
                          const translation = t(`sidebar.${key}`);
                          const displayLabel = translation !== `sidebar.${key}` ? translation : item.label;
                          return <span className="capitalize" suppressHydrationWarning>{displayLabel}</span>;
                        })()}
                      </motion.div>
                    </Link>
                  );
                })}
            </nav>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar - part of flex flow */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 256, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="relative border-r border-border/40 glass flex-col hidden lg:flex h-screen sticky top-0 overflow-visible shrink-0"
          >
            {content}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile sidebar - fixed overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch(toggleSidebar())}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="fixed inset-y-0 left-0 z-50 w-64 border-r border-border/40 bg-card shadow-2xl flex-col flex lg:hidden h-screen overflow-visible"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

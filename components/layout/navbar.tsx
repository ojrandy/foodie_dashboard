"use client";

import { Menu, Search, Bell, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/store/hooks";
import { toggleSidebar } from "@/store/slices/uiSlice";
import { motion } from "framer-motion";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();

  return (
    <header className="h-14 border-b border-border/40 flex items-center px-4 glass-elevated justify-between sticky top-0 z-[200] transition-colors duration-300">
      <div className="flex items-center gap-4 flex-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(toggleSidebar())}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="font-bold text-sm md:hidden bg-gradient-to-r from-accent to-glow-2 bg-clip-text text-transparent">
          FoodOps AI
        </div>

        <div className="hidden md:flex relative w-96 max-w-full group">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-accent" />
          <Input
            type="search"
            placeholder="Search orders, recipes, or riders... (Press '/')"
            className="pl-9 bg-muted/50 w-full border-border/50 focus-visible:ring-[var(--ring)]/30 focus-visible:border-[var(--ring)]/50 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="icon" className="text-muted-foreground relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent ring-2 ring-background" />
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-8 w-8 ml-3 rounded-full bg-gradient-to-br from-accent to-glow-2 flex items-center justify-center text-xs font-bold text-primary-foreground shadow-md cursor-pointer hover:shadow-lg transition-all ring-2 ring-background"
        >
          JD
        </motion.div>
      </div>
    </header>
  );
}

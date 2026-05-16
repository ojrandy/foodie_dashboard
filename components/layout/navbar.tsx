"use client";

import { Menu, Search, Bell, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/store/hooks";
import { toggleSidebar } from "@/store/slices/uiSlice";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();

  return (
    <header className="h-14 border-b flex items-center px-4 bg-card justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => dispatch(toggleSidebar())}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="font-medium text-sm md:hidden">FoodOps AI</div>
        
        <div className="hidden md:flex relative w-96 max-w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search orders, recipes, or riders..." 
            className="pl-9 bg-muted/50 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-muted-foreground"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        <div className="h-8 w-8 ml-2 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold cursor-pointer hover:ring-2 ring-primary ring-offset-2 transition-all">
          JD
        </div>
      </div>
    </header>
  );
}

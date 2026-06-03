import {
  LayoutDashboard,
  UtensilsCrossed,
  Tags,
  ShoppingCart,
  Truck,
  LineChart,
  Wallet,
  Settings,
  Zap,
  Sparkles,
  Package,
  LifeBuoy,
  Bell,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  roles: string[];
  group?: string;
}

export const navigationConfig: NavItem[] = [
  // ==========================================
  // OVERVIEW GROUP
  // ==========================================
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
    roles: ["admin", "operations"],
    group: "Overview",
  },
  
  // ==========================================
  // INTELLIGENCE GROUP
  // ==========================================
  {
    label: "Recipes",
    path: "/recipes",
    icon: UtensilsCrossed,
    roles: ["admin", "operations"],
    group: "Intelligence",
  },
  {
    label: "Pricing Engine",
    path: "/pricing",
    icon: Tags,
    roles: ["admin", "operations", "finance"],
    group: "Intelligence",
  },
  {
    label: "Automation",
    path: "/automation",
    icon: Zap,
    roles: ["admin", "operations"],
    group: "Intelligence",
  },
  {
    label: "Budget AI",
    path: "/budget-ai",
    icon: Sparkles,
    roles: ["admin", "operations", "finance"],
    group: "Intelligence",
  },
  
  // ==========================================
  // OPERATIONS GROUP
  // ==========================================
  {
    label: "Orders",
    path: "/orders",
    icon: ShoppingCart,
    roles: ["admin", "operations", "support"],
    group: "Operations",
  },
  {
    label: "Dispatch",
    path: "/dispatch",
    icon: Truck,
    roles: ["admin", "operations", "logistics"],
    group: "Operations",
  },
  {
    label: "Inventory",
    path: "/inventory",
    icon: Package,
    roles: ["admin", "operations"],
    group: "Operations",
  },

  // ==========================================
  // BUSINESS GROUP
  // ==========================================
  {
    label: "Analytics",
    path: "/analytics",
    icon: LineChart,
    roles: ["admin", "finance"],
    group: "Business",
  },
  {
    label: "Finance",
    path: "/finance",
    icon: Wallet,
    roles: ["admin", "finance"],
    group: "Business",
  },

  // ==========================================
  // SYSTEM GROUP
  // ==========================================
  {
    label: "Support",
    path: "/support",
    icon: LifeBuoy,
    roles: ["admin", "support"],
    group: "System",
  },
  {
    label: "Notifications",
    path: "/notifications",
    icon: Bell,
    roles: ["admin"],
    group: "System",
  },
  {
    label: "Security",
    path: "/security",
    icon: ShieldCheck,
    roles: ["admin"],
    group: "System",
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
    roles: ["admin"],
    group: "System",
  },
];

import {
  LayoutDashboard,
  UtensilsCrossed,
  Tags,
  ShoppingCart,
  Truck,
  LineChart,
  Wallet,
  Settings,
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
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
    roles: ["admin", "operations"],
    group: "Overview",
  },
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
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
    roles: ["admin"],
    group: "System",
  },
];

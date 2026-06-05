"use client";

import {
  DollarSign, ShoppingBag, Truck, Users, ChefHat,
  ArrowRight, Activity,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

interface ColorMap {
  iconBg: string;
  iconText: string;
}

function getColors(color: string): ColorMap {
  switch (color) {
    case "accent": return { iconBg: "bg-accent/10", iconText: "text-accent" };
    case "success": return { iconBg: "bg-success/10", iconText: "text-success" };
    case "warning": return { iconBg: "bg-warning/10", iconText: "text-warning" };
    case "sky-500": return { iconBg: "bg-sky-500/10", iconText: "text-sky-500" };
    default: return { iconBg: "bg-accent/10", iconText: "text-accent" };
  }
}

const QUICK_LINKS = [
  {
    label: "Recipes",
    desc: "Manage your AI-powered recipe catalog",
    path: "/dashboard/recipes",
    icon: ChefHat,
    color: "accent" as const,
  },
  {
    label: "Orders",
    desc: "Track and dispatch orders in real-time",
    path: "/dashboard/orders",
    icon: ShoppingBag,
    color: "success" as const,
  },
  {
    label: "Dispatch",
    desc: "Rider fleet and delivery management",
    path: "/dashboard/dispatch",
    icon: Truck,
    color: "sky-500" as const,
  },
  {
    label: "Analytics",
    desc: "Business metrics and performance KPIs",
    path: "/dashboard/analytics",
    icon: Activity,
    color: "warning" as const,
  },
];

const STATS = [
  { label: "Active Orders", value: "24", icon: ShoppingBag, color: "accent" as const },
  { label: "Revenue Today", value: "185,500 XAF", icon: DollarSign, color: "success" as const },
  { label: "Active Riders", value: "8", icon: Truck, color: "sky-500" as const },
  { label: "Total Customers", value: "1,280", icon: Users, color: "warning" as const },
];

export default function DashboardOverviewPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Command Center
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Realtime overview of your food logistics, dispatch, and market intelligence operations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => {
          const { iconBg, iconText } = getColors(s.color);
          return (
          <Card key={i} className="glass">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
                  {s.label}
                </span>
                <div className="text-xl font-extrabold mt-1 text-foreground">{s.value}</div>
              </div>
              <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", iconBg, iconText)}>
                <s.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
          );
        })}
      </div>

      <div>
        <h3 className="text-sm font-bold text-foreground mb-4">Quick Access</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_LINKS.map((link, i) => (
            <Card
              key={i}
              className="glass cursor-pointer hover:bg-muted/10 transition-colors border-border/40"
              onClick={() => router.push(link.path)}
            >
              <CardContent className="p-5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <link.icon className={cn("h-6 w-6", getColors(link.color).iconText)} />
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <h4 className="text-sm font-bold text-foreground">{link.label}</h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{link.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <Button variant="outline" onClick={() => router.push("/")}>
          View Full Dashboard
        </Button>
      </div>
    </div>
  );
}

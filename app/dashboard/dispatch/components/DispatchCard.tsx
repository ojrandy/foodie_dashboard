"use client";

import { User, CheckCircle, Activity, AlertTriangle, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { DispatchStats } from "../types";

interface DispatchCardProps {
  stats: DispatchStats;
}

export function DispatchCard({ stats }: DispatchCardProps) {
  const items: { label: string; value: string | number; icon: LucideIcon; color: string; danger?: boolean }[] = [
    { label: "Active Riders", value: `${stats.activeRiders} Online`, icon: User, color: "accent" },
    { label: "Deliveries Today", value: stats.totalDeliveries, icon: CheckCircle, color: "success" },
    { label: "Fleet Avg Rating", value: `${stats.avgRating} / 5.0`, icon: Activity, color: "sky-500" },
    { label: "High-Risk Routes", value: `${stats.highRiskRoutes} Active`, icon: AlertTriangle, color: "warning", danger: true },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((kpi, i) => {
        const bgClass = kpi.color === "accent" ? "bg-accent/10" : kpi.color === "success" ? "bg-success/10" : kpi.color === "sky-500" ? "bg-sky-500/10" : "bg-warning/10";
        const textClass = kpi.color === "accent" ? "text-accent" : kpi.color === "success" ? "text-success" : kpi.color === "sky-500" ? "text-sky-500" : "text-warning";
        return (
          <Card key={i} className={`glass ${kpi.danger ? "border-warning/20 bg-warning/5" : ""}`}>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <span className={`text-[10px] font-bold tracking-widest uppercase ${kpi.danger ? "text-warning" : "text-muted-foreground"}`}>{kpi.label}</span>
                <div className={`text-2xl font-extrabold mt-1 ${kpi.danger ? "text-warning" : "text-foreground"}`}>{kpi.value}</div>
              </div>
              <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", bgClass, textClass)}>
                <kpi.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

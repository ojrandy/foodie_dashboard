"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { KpiMetric } from "../types";

interface AnalyticsCardProps {
  metrics: KpiMetric[];
}

export function AnalyticsCard({ metrics }: AnalyticsCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, i) => (
        <Card key={i} className="glass">
          <CardContent className="p-5 flex flex-col gap-2">
            <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
              {m.label}
            </span>
            <div className="text-2xl font-extrabold text-foreground">{m.value}</div>
            <div className="flex items-center gap-1.5">
              {m.trend === "up" ? (
                <TrendingUp className="h-3.5 w-3.5 text-success" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-destructive" />
              )}
              <span
                className={`text-xs font-bold ${
                  m.trend === "up" ? "text-success" : "text-destructive"
                }`}
              >
                {m.change > 0 ? "+" : ""}
                {m.change}%
              </span>
              {m.subtitle && (
                <span className="text-[10px] text-muted-foreground ml-1">
                  {m.subtitle}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

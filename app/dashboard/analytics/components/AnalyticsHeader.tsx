"use client";

import { LineChart } from "lucide-react";

export function AnalyticsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <LineChart className="h-8 w-8 text-accent" /> Analytics Dashboard
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Business performance metrics, customer trends, and operational KPIs at a glance.
        </p>
      </div>
    </div>
  );
}

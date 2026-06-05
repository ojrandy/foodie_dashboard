"use client";

import { Truck } from "lucide-react";

export function DispatchHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <Truck className="h-8 w-8 text-accent" /> Dispatch & Logistics Command
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Live rider tracking, route intelligence, zone heatmaps, and delivery fleet management.
        </p>
      </div>
    </div>
  );
}

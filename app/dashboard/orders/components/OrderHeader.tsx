"use client";

import { ShoppingCart } from "lucide-react";

export function OrderHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <ShoppingCart className="h-8 w-8 text-accent" /> Orders Operations Command
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Real-time logistical monitoring, Kanban dispatcher, AI bottleneck forecast, and driver assignments.
        </p>
      </div>
    </div>
  );
}

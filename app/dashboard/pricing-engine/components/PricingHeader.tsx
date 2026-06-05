"use client";

import { TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingHeaderProps {
  onAddClick: () => void;
}

export function PricingHeader({ onAddClick }: PricingHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <TrendingUp className="h-8 w-8 text-accent animate-pulse" /> Cameroon Market Pricing Engine
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Real-time cross-regional commodity comparisons, volatility intelligence, and predictive shortage metrics.
        </p>
      </div>
      <Button onClick={onAddClick} className="gap-2 shadow-md">
        <Plus className="h-4 w-4" /> Add Commodity Index
      </Button>
    </div>
  );
}

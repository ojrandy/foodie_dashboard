"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { usePricingEngine } from "../hooks/usePricingEngine";
import { PricingHeader } from "./PricingHeader";
import { PricingCard } from "./PricingCard";
import { PricingVolatilityChart } from "./PricingVolatilityChart";
import { PricingShortagePanel } from "./PricingShortagePanel";
import { PricingTable } from "./PricingTable";

export function PricingMain() {
  const {
    filteredCommodities,
    stats,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    historicalData,
    commodities,
  } = usePricingEngine();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div className="space-y-6">
      <PricingHeader onAddClick={() => {}} />
      <PricingCard stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <PricingVolatilityChart data={historicalData} mounted={mounted} />
        <PricingShortagePanel commodities={commodities} />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card/40 border border-border/40 p-4 rounded-xl glass shadow-sm">
        <div className="relative w-full sm:max-w-xs group">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search commodities..."
            className="pl-3 bg-muted/30 border-border/50 focus-visible:ring-accent/30"
          />
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <Badge
            onClick={() => setCategoryFilter("All")}
            className={`cursor-pointer px-3 py-1 ${
              categoryFilter === "All"
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All Items
          </Badge>
          {["Vegetables", "Tubers", "Oils", "Spices"].map((cat) => (
            <Badge
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`cursor-pointer px-3 py-1 ${
                categoryFilter === cat
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>
      <PricingTable commodities={filteredCommodities} />
    </div>
  );
}

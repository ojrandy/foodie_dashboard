"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { usePricingEngine } from "../hooks/usePricingEngine";
import dynamic from "next/dynamic";
import { PricingHeader } from "./PricingHeader";
import { PricingCard } from "./PricingCard";
import { PricingTable } from "./PricingTable";
import { AddCommodityModal } from "./AddCommodityModal";
import { Loader2 } from "lucide-react";

// Dynamically import heavy Recharts/Framer Motion modules to slash main bundle size
const PricingVolatilityChart = dynamic(() => import("./PricingVolatilityChart").then(mod => mod.PricingVolatilityChart), { 
  ssr: false,
  loading: () => <div className="h-[400px] flex items-center justify-center bg-muted/10 rounded-2xl border border-border/40"><Loader2 className="h-8 w-8 text-muted-foreground animate-spin" /></div>
});

const PricingShortagePanel = dynamic(() => import("./PricingShortagePanel").then(mod => mod.PricingShortagePanel), { 
  ssr: false,
  loading: () => <div className="h-[400px] flex items-center justify-center bg-muted/10 rounded-2xl border border-border/40"><Loader2 className="h-8 w-8 text-muted-foreground animate-spin" /></div>
});

const RegionalIntelligence = dynamic(() => import("./RegionalIntelligence").then(mod => mod.RegionalIntelligence), { ssr: false });
const CostSimulator = dynamic(() => import("./CostSimulator").then(mod => mod.CostSimulator), { ssr: false });
const AIPricingInsights = dynamic(() => import("./AIPricingInsights").then(mod => mod.AIPricingInsights), { ssr: false });

export function PricingMain() {
  const {
    filteredCommodities,
    stats,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    commodities,
    setCommodities,
  } = usePricingEngine();

  const [mounted, setMounted] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div className="space-y-12 pb-12 relative">
      {/* HEADER & ADD DIALOG */}
      <PricingHeader onAddClick={() => setIsAddOpen(true)} />
      
      <AddCommodityModal 
        isOpen={isAddOpen} 
        onClose={() => setIsAddOpen(false)} 
        onAdd={(newCom) => setCommodities([newCom, ...commodities])} 
      />
      
      {/* MODULE 1: KPI DASHBOARD */}
      <PricingCard stats={stats} />
      
      {/* MODULE 5 & 8: VOLATILITY MAP & SHORTAGE PREDICTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <PricingVolatilityChart commodities={commodities} mounted={mounted} />
        <PricingShortagePanel commodities={commodities} />
      </div>

      <hr className="border-border/40" />

      {/* MODULE 3 & 4: REGIONAL INTELLIGENCE & MARKET SOURCES */}
      <RegionalIntelligence commodities={commodities} />

      <hr className="border-border/40" />

      {/* MODULE 6: SMART PRICING ENGINE / COST SIMULATOR */}
      <CostSimulator commodities={commodities} />

      <hr className="border-border/40" />

      {/* MODULE 7, 9, 10: AI INSIGHTS, ALERTS, ANALYTICS */}
      <AIPricingInsights commodities={commodities} />

      <hr className="border-border/40" />

      {/* MODULE 2: INGREDIENT PRICE REGISTRY */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Ingredient Price Registry</h3>
        <p className="text-sm text-muted-foreground mb-4">Master database of all tracked commodities across the national network.</p>

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
            {["Vegetables", "Tubers", "Oils", "Spices", "Proteins", "Grains"].map((cat) => (
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
    </div>
  );
}

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useInventoryIntelligence } from "../hooks/useInventoryIntelligence";
import { Package, TrendingDown, AlertTriangle, AlertOctagon, TrendingUp, Sparkles, Server } from "lucide-react";
import { motion } from "framer-motion";

export function SupplyCommandCenter() {
  const { kpis } = useInventoryIntelligence();

  const metrics = [
    { label: "Tracked Ingredients", value: kpis.totalTracked, icon: Package, color: "text-primary", bg: "bg-primary/10", trend: "+2 this week" },
    { label: "Available Items", value: kpis.available, icon: Server, color: "text-success", bg: "bg-success/10", trend: "Stable" },
    { label: "Low Supply", value: kpis.lowSupply, icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", trend: "Needs attention" },
    { label: "Critical/Out of Stock", value: kpis.critical, icon: AlertOctagon, color: "text-destructive", bg: "bg-destructive/10", trend: "-1 since yesterday" },
    { label: "Stability Score", value: `${kpis.stabilityScore}%`, icon: Sparkles, color: "text-sky-500", bg: "bg-sky-500/10", trend: "+4% improvement" },
    { label: "Market Avail. Index", value: `${kpis.availabilityIndex}%`, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10", trend: "Slight dip" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="glass relative overflow-hidden group hover:border-primary/50 transition-colors h-full">
            <div className={`absolute top-0 right-0 p-4 opacity-5 ${m.color}`}>
              <m.icon className="h-16 w-16 -mr-4 -mt-4 transform group-hover:scale-110 transition-transform" />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg ${m.bg}`}>
                  <m.icon className={`h-4 w-4 ${m.color}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">{m.label}</p>
              <h3 className="text-2xl font-black text-foreground mb-1">{m.value}</h3>
              <div className="flex items-center gap-1">
                {m.trend.includes("+") || m.trend === "Stable" ? (
                  <TrendingUp className="h-3 w-3 text-success" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-warning" />
                )}
                <span className="text-[9px] text-muted-foreground">{m.trend}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

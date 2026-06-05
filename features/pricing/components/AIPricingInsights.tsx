import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowDownRight, ArrowUpRight, Activity, Zap, AlertTriangle, ShieldCheck } from "lucide-react";
import { CommodityPrice } from "../hooks/usePricingEngine";
import { Badge } from "@/components/ui/badge";

interface AIPricingInsightsProps {
  commodities: CommodityPrice[];
}

export function AIPricingInsights({ commodities }: AIPricingInsightsProps) {
  const { topIncreases, topDecreases, mostVolatile } = useMemo(() => {
    // Mock analytics logic based on the data we have
    const sortedByRisk = [...commodities].sort((a, b) => b.shortageProbability - a.shortageProbability);
    const up = commodities.filter(c => c.trend === "up").slice(0, 3);
    const down = commodities.filter(c => c.trend === "down").slice(0, 3);
    
    return {
      mostVolatile: sortedByRisk.slice(0, 4),
      topIncreases: up,
      topDecreases: down
    };
  }, [commodities]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-6 w-6 text-warning" />
        <h2 className="text-2xl font-bold text-foreground">AI Intelligence & Forecasting</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Module 7: AI Insights */}
        <Card className="glass border-accent/20">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-accent flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> Smart Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-accent/5 rounded-xl border border-accent/10">
              <h4 className="text-xs font-bold text-foreground">Cost Optimization</h4>
              <p className="text-[11px] text-muted-foreground mt-1">Replace <strong>Fresh Tomatoes</strong> with <strong>Tomato Paste</strong> this week. Fresh tomato prices have surged 12% across all regions.</p>
            </div>
            <div className="p-3 bg-success/5 rounded-xl border border-success/10">
              <h4 className="text-xs font-bold text-foreground">Budget Alternative</h4>
              <p className="text-[11px] text-muted-foreground mt-1">Sourcing <strong>Palm Oil</strong> from Douala instead of Buea will save 2,000 XAF per 20L jerrycan based on current spreads.</p>
            </div>
            <div className="p-3 bg-warning/5 rounded-xl border border-warning/10">
              <h4 className="text-xs font-bold text-foreground">Seasonal Shift</h4>
              <p className="text-[11px] text-muted-foreground mt-1">Plantain prices are expected to drop in the next 2 weeks due to harvest season in the South West.</p>
            </div>
          </CardContent>
        </Card>

        {/* Module 10: Executive Analytics (Leaderboards) */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4" /> Market Movers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-muted-foreground uppercase mb-3">Highest Growth</h4>
              <div className="space-y-2">
                {topIncreases.map(c => (
                  <div key={c.id} className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{c.name}</span>
                    <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-[10px]"><ArrowUpRight className="h-3 w-3 mr-1" /> Inflation</Badge>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-muted-foreground uppercase mb-3">Biggest Drops</h4>
              <div className="space-y-2">
                {topDecreases.map(c => (
                  <div key={c.id} className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{c.name}</span>
                    <Badge className="bg-success/10 text-success border-success/20 text-[10px]"><ArrowDownRight className="h-3 w-3 mr-1" /> Price Drop</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Module 9: Alerts Feed */}
        <Card className="glass border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-destructive flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Live Alert Monitor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mostVolatile.slice(0, 3).map((c, idx) => (
              <div key={c.id} className="p-3 bg-card rounded-lg border border-border/40 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-destructive" />
                <div className="pl-2">
                  <h4 className="text-xs font-bold text-foreground">{idx === 0 ? "Severe Shortage Warning" : "High Volatility"}</h4>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    <strong>{c.name}</strong> has a {c.shortageProbability}% risk of shortage in the next 48 hours. Secure inventory immediately.
                  </p>
                </div>
              </div>
            ))}
            <div className="p-3 bg-card rounded-lg border border-border/40 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-success" />
              <div className="pl-2">
                <h4 className="text-xs font-bold text-foreground flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-success" /> Market Stable</h4>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Proteins category remains highly stable across all tracked regions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

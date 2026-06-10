import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, TrendingUp, TrendingDown, Minus } from "lucide-react";

export function MarketSupplyMonitoring() {
  const markets = [
    { name: "Buea Central Market", region: "South West", count: 42, index: 85, risk: "Low", trend: "up" },
    { name: "Mokolo Market", region: "Centre", count: 156, index: 62, risk: "Medium", trend: "down" },
    { name: "Douala Central Market", region: "Littoral", count: 210, index: 94, risk: "Low", trend: "up" },
    { name: "OIC Market", region: "South West", count: 28, index: 40, risk: "High", trend: "down" },
    { name: "Bamenda Main Market", region: "North West", count: 65, index: 35, risk: "Critical", trend: "stable" },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-success bg-success/10 border-success/20";
      case "Medium": return "text-warning bg-warning/10 border-warning/20";
      case "High": return "text-orange-500 bg-orange-500/10 border-orange-500/20";
      case "Critical": return "text-destructive bg-destructive/10 border-destructive/20";
      default: return "";
    }
  };

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Store className="h-5 w-5 text-primary" /> Market Sources
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {markets.map(market => (
          <div key={market.name} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg border border-border/40 bg-muted/10 hover:bg-muted/30 transition-colors gap-4">
            
            <div className="flex items-start gap-3 w-full sm:w-auto">
              <div className="p-2 rounded bg-background border border-border/50 shrink-0">
                <Store className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{market.name}</p>
                <p className="text-[10px] text-muted-foreground">{market.region} • {market.count} Ingredients</p>
              </div>
            </div>

            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Avail. Index</p>
                <div className="flex items-center gap-1 justify-end">
                  {market.trend === "up" ? <TrendingUp className="h-3 w-3 text-success" /> : 
                   market.trend === "down" ? <TrendingDown className="h-3 w-3 text-destructive" /> : 
                   <Minus className="h-3 w-3 text-muted-foreground" />}
                  <span className="text-sm font-bold">{market.index}%</span>
                </div>
              </div>

              <div className={`px-2.5 py-1 rounded-sm border text-[10px] font-bold uppercase tracking-wider ${getRiskColor(market.risk)}`}>
                {market.risk} Risk
              </div>
            </div>

          </div>
        ))}
      </CardContent>
    </Card>
  );
}

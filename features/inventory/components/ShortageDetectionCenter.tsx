import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertOctagon, TrendingDown, Clock, ShieldAlert } from "lucide-react";

export function ShortageDetectionCenter() {
  const shortages = [
    { name: "Palm Oil", severity: "Critical", daysLeft: 0, reason: "Regional strike in North West affecting transport.", market: "Bamenda" },
    { name: "Fish", severity: "High", daysLeft: 2, reason: "Seasonal scarcity and high demand.", market: "Limbe" },
    { name: "Tomatoes", severity: "Medium", daysLeft: 5, reason: "Unexpected demand spike from university events.", market: "Buea" },
    { name: "Egusi", severity: "Medium", daysLeft: 6, reason: "Supplier delivery delayed by 48 hours.", market: "Mokolo" }
  ];

  return (
    <Card className="glass h-full border-destructive/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2 text-destructive">
          <AlertOctagon className="h-5 w-5 animate-pulse" /> Shortage Detection Center
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {shortages.map((item, i) => (
          <div key={i} className="p-3 bg-muted/10 border border-border/40 rounded-xl hover:bg-muted/30 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className={`h-4 w-4 ${item.severity === 'Critical' ? 'text-destructive' : item.severity === 'High' ? 'text-orange-500' : 'text-warning'}`} />
                <span className="text-sm font-bold">{item.name}</span>
              </div>
              <span className={`text-[9px] uppercase font-bold px-2 py-1 rounded-sm ${
                item.severity === 'Critical' ? 'bg-destructive/20 text-destructive' :
                item.severity === 'High' ? 'bg-orange-500/20 text-orange-500' :
                'bg-warning/20 text-warning'
              }`}>
                {item.severity}
              </span>
            </div>
            
            <p className="text-[10px] text-muted-foreground leading-snug mb-3">
              {item.reason}
            </p>

            <div className="flex items-center justify-between text-[10px] font-bold">
              <div className="flex items-center gap-1 text-muted-foreground">
                <TrendingDown className="h-3 w-3" /> Source: {item.market}
              </div>
              <div className={`flex items-center gap-1 ${item.daysLeft <= 2 ? 'text-destructive' : 'text-foreground'}`}>
                <Clock className="h-3 w-3" /> {item.daysLeft === 0 ? "Depleted" : `${item.daysLeft} Days Supply Left`}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

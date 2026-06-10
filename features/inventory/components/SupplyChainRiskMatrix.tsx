import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export function SupplyChainRiskMatrix() {
  const risks = [
    { name: "Fish Scarcity", impact: 5, likelihood: 4 },
    { name: "Palm Oil Transport", impact: 4, likelihood: 5 },
    { name: "Rice Price Spike", impact: 5, likelihood: 2 },
    { name: "Tomato Seasonality", impact: 3, likelihood: 4 },
    { name: "Cassava Yield", impact: 2, likelihood: 3 },
    { name: "Chicken Disease", impact: 4, likelihood: 1 },
  ];

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-destructive" /> Supply Chain Risk Matrix
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-square max-h-[300px] mx-auto bg-muted/10 border-l-2 border-b-2 border-border/60">
          
          {/* Matrix Grid */}
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 opacity-20 pointer-events-none">
            {Array.from({ length: 25 }).map((_, i) => {
              const x = i % 5;
              const y = Math.floor(i / 5); // 0 is top (High Impact), 4 is bottom (Low Impact)
              const score = (5 - y) * (x + 1);
              const color = score > 15 ? 'bg-red-500' : score > 8 ? 'bg-orange-500' : score > 4 ? 'bg-yellow-500' : 'bg-emerald-500';
              return <div key={i} className={`border border-foreground/10 ${color}`} />
            })}
          </div>

          <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
            Impact
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Likelihood
          </div>

          {/* Plotting Risks */}
          {risks.map((risk, i) => {
            const x = ((risk.likelihood - 1) / 4) * 100; // 0% to 100%
            const y = ((5 - risk.impact) / 4) * 100; // 0% is high impact, 100% is low impact
            
            const score = risk.impact * risk.likelihood;
            const color = score > 15 ? 'bg-destructive shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 
                          score > 8 ? 'bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 
                          score > 4 ? 'bg-warning shadow-[0_0_15px_rgba(234,179,8,0.5)]' : 
                          'bg-success shadow-[0_0_15px_rgba(16,185,129,0.5)]';

            return (
              <div 
                key={i} 
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10 cursor-pointer"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className={`w-3 h-3 rounded-full ${color} transition-transform group-hover:scale-150`} />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                  <p className="text-[10px] font-bold">{risk.name}</p>
                  <p className="text-[9px] text-muted-foreground">Score: {score}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, TrendingUp, Star } from "lucide-react";

export function RevenueIntelligence() {
  const topCustomers = [
    { name: "Paul Biya", ltv: "1,500,000 F", orders: 120, trend: "+12%" },
    { name: "Ahmadou Bello", ltv: "250,000 F", orders: 42, trend: "+5%" },
    { name: "Daniel Ek", ltv: "140,000 F", orders: 28, trend: "+18%" },
    { name: "John Doe", ltv: "85,000 F", orders: 15, trend: "+2%" },
  ];

  return (
    <Card className="glass h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2 text-amber-500">
          <Trophy className="h-5 w-5" /> Revenue Leaderboards
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="p-4 bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-xl relative overflow-hidden">
          <Star className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 text-amber-500/20" />
          <p className="text-[10px] uppercase font-bold text-amber-500 tracking-wider mb-1">Top Segment by LTV</p>
          <p className="text-xl font-black text-foreground">VIP Customers</p>
          <p className="text-[10px] text-muted-foreground mt-1">Generates 45% of total platform revenue.</p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Highest Spenders</h4>
          <div className="space-y-2">
            {topCustomers.map((cust, i) => (
              <div key={i} className="p-3 bg-muted/10 border border-border/40 rounded-xl hover:bg-muted/30 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    i === 0 ? "bg-amber-500 text-white" : 
                    i === 1 ? "bg-slate-300 text-slate-800" : 
                    i === 2 ? "bg-amber-700 text-white" : "bg-muted/50 text-muted-foreground"
                  }`}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{cust.name}</p>
                    <p className="text-[9px] text-muted-foreground">{cust.orders} lifetime orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black font-mono">{cust.ltv}</p>
                  <p className="text-[10px] text-success flex items-center justify-end gap-0.5">
                    <TrendingUp className="h-3 w-3" /> {cust.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

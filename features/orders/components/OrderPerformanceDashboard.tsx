"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star } from "lucide-react";

export function OrderPerformanceDashboard() {
  const recipes = [
    { name: "Egusi Soup Combo", revenue: "1.2M", orders: 120, rating: 4.9 },
    { name: "Ndole Plan Deluxe", revenue: "850K", orders: 85, rating: 4.8 },
    { name: "Jollof Rice Supreme", revenue: "640K", orders: 150, rating: 4.7 },
  ];

  return (
    <Card className="glass border-warning/20 h-full">
      <CardHeader>
        <CardTitle className="text-base font-bold flex items-center gap-2">
          <Trophy className="h-4 w-4 text-warning" /> Performance Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div>
          <h4 className="text-[10px] font-bold uppercase text-muted-foreground mb-3">Best Performing Recipes Today</h4>
          <div className="space-y-2">
            {recipes.map((r, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-card border border-border/40 rounded-xl hover:bg-muted/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${i === 0 ? 'bg-warning/20 text-warning' : 'bg-muted text-muted-foreground'}`}>
                    #{i + 1}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-foreground">{r.name}</h5>
                    <p className="text-[9px] text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Star className="h-3 w-3 text-warning fill-warning" /> {r.rating} ({r.orders} orders)
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-success">{r.revenue} XAF</p>
                  <Badge variant="outline" className="text-[8px] bg-success/10 text-success border-success/20 mt-0.5">High Margin</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

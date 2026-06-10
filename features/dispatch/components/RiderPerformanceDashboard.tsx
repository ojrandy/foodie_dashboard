import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Star, TrendingUp } from "lucide-react";
import { useDispatchOperations } from "../hooks/useDispatchOperations";

export function RiderPerformanceDashboard() {
  const { riders } = useDispatchOperations();

  // Top by deliveries
  const topDeliveries = [...riders].sort((a, b) => b.completedDeliveries - a.completedDeliveries).slice(0, 3);
  // Top by rating
  const topRated = [...riders].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" /> Rider Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div>
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <TrendingUp className="h-3 w-3" /> Most Deliveries
          </h4>
          <div className="space-y-2">
            {topDeliveries.map((r, i) => (
              <div key={r.id} className="flex items-center justify-between p-2 rounded bg-muted/20 border border-border/40">
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-black ${i === 0 ? "text-yellow-500" : i === 1 ? "text-slate-400" : "text-amber-700"}`}>
                    #{i + 1}
                  </span>
                  <span className="text-sm font-bold">{r.name}</span>
                </div>
                <span className="text-xs font-black text-primary">{r.completedDeliveries}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <Star className="h-3 w-3" /> Highest Ratings
          </h4>
          <div className="space-y-2">
            {topRated.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-2 rounded bg-muted/20 border border-border/40">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold">{r.name}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-black text-yellow-500">
                  {r.rating} <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

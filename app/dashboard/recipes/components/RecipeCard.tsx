"use client";

import { ChefHat, Clock, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { RecipeStats } from "../types";

interface RecipeCardProps {
  stats: RecipeStats;
}

export function RecipeCard({ stats }: RecipeCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="glass shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">Active Catalog</span>
            <div className="text-2xl font-extrabold mt-1 text-foreground">{stats.total} Recipes</div>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <ChefHat className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
      <Card className="glass shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">Average Cost Index</span>
            <div className="text-2xl font-extrabold mt-1 text-foreground">{stats.avgCost.toLocaleString()} XAF</div>
          </div>
          <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <Sparkles className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
      <Card className="glass shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">Average Prep Time</span>
            <div className="text-2xl font-extrabold mt-1 text-foreground">{stats.avgDuration} Mins</div>
          </div>
          <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center text-warning">
            <Clock className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { DollarSign, MapPin, ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { PricingStats } from "../types";

interface PricingCardProps {
  stats: PricingStats;
}

export function PricingCard({ stats }: PricingCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="glass">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase flex items-center gap-1">
              <MapPin className="h-3 w-3 text-accent" /> Buea Avg Index
            </span>
            <div className="text-2xl font-extrabold mt-1 text-foreground">
              {stats.avgBuea.toLocaleString()} XAF
            </div>
          </div>
          <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
            <DollarSign className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
      <Card className="glass">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase flex items-center gap-1">
              <MapPin className="h-3 w-3 text-sky-500" /> Douala Avg Index
            </span>
            <div className="text-2xl font-extrabold mt-1 text-foreground">
              {stats.avgDouala.toLocaleString()} XAF
            </div>
          </div>
          <div className="h-10 w-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500">
            <DollarSign className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
      <Card className="glass">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase flex items-center gap-1">
              <MapPin className="h-3 w-3 text-emerald-500" /> Yaounde Avg Index
            </span>
            <div className="text-2xl font-extrabold mt-1 text-foreground">
              {stats.avgYaounde.toLocaleString()} XAF
            </div>
          </div>
          <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <DollarSign className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
      <Card className="glass border-destructive/20 bg-destructive/5">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.08em] text-destructive uppercase flex items-center gap-1">
              <ShieldAlert className="h-3 w-3" /> Shortage Warnings
            </span>
            <div className="text-2xl font-extrabold mt-1 text-destructive">
              {stats.highRiskShortages} Commodities
            </div>
          </div>
          <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
            <ShieldAlert className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Coins, MapPin, ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { PricingStats } from "../types";

interface PricingCardProps {
  stats: PricingStats;
}

export function PricingCard({ stats }: PricingCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="glass relative group overflow-visible">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase flex items-center gap-1">
              <MapPin className="h-3 w-3 text-accent" /> Buea Avg Index
            </span>
            <div className="text-2xl font-extrabold mt-1 text-foreground">
              {stats.avgBuea.toLocaleString()} XAF
            </div>
          </div>
          <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent relative cursor-help">
            <Coins className="h-5 w-5" />
            
            {/* Custom Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[100]">
              <div className="bg-card border border-border/40 shadow-xl rounded-lg p-3 text-xs text-muted-foreground font-medium">
                <span className="font-bold text-foreground block mb-1">Buea Market (XAF)</span>
                The average cost of all tracked commodities aggregated specifically from Buea Central Market sources.
              </div>
              <div className="w-2 h-2 bg-card border-b border-r border-border/40 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass relative group overflow-visible">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase flex items-center gap-1">
              <MapPin className="h-3 w-3 text-sky-500" /> Douala Avg Index
            </span>
            <div className="text-2xl font-extrabold mt-1 text-foreground">
              {stats.avgDouala.toLocaleString()} XAF
            </div>
          </div>
          <div className="h-10 w-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500 relative cursor-help">
            <Coins className="h-5 w-5" />

            {/* Custom Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[100]">
              <div className="bg-card border border-border/40 shadow-xl rounded-lg p-3 text-xs text-muted-foreground font-medium">
                <span className="font-bold text-foreground block mb-1">Douala Market (XAF)</span>
                The average cost of all tracked commodities aggregated specifically from Sandaga & Mokolo Douala markets.
              </div>
              <div className="w-2 h-2 bg-card border-b border-r border-border/40 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass relative group overflow-visible">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase flex items-center gap-1">
              <MapPin className="h-3 w-3 text-emerald-500" /> Yaounde Avg Index
            </span>
            <div className="text-2xl font-extrabold mt-1 text-foreground">
              {stats.avgYaounde.toLocaleString()} XAF
            </div>
          </div>
          <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 relative cursor-help">
            <Coins className="h-5 w-5" />

            {/* Custom Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[100]">
              <div className="bg-card border border-border/40 shadow-xl rounded-lg p-3 text-xs text-muted-foreground font-medium">
                <span className="font-bold text-foreground block mb-1">Yaounde Market (XAF)</span>
                The average cost of all tracked commodities aggregated specifically from Mokolo Yaounde & Central markets.
              </div>
              <div className="w-2 h-2 bg-card border-b border-r border-border/40 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass border-destructive/20 bg-destructive/5 relative group overflow-visible">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.08em] text-destructive uppercase flex items-center gap-1">
              <ShieldAlert className="h-3 w-3" /> Shortage Warnings
            </span>
            <div className="text-2xl font-extrabold mt-1 text-destructive">
              {stats.highRiskShortages} Commodities
            </div>
          </div>
          <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive relative cursor-help">
            <ShieldAlert className="h-5 w-5" />

            {/* Custom Tooltip */}
            <div className="absolute bottom-full mb-2 right-0 w-56 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[100]">
              <div className="bg-card border border-destructive/40 shadow-xl rounded-lg p-3 text-xs text-muted-foreground font-medium">
                <span className="font-bold text-destructive block mb-1">High Risk Threshold</span>
                Number of commodities currently displaying a shortage probability greater than 50% across the national network. Action required.
              </div>
              <div className="w-2 h-2 bg-card border-b border-r border-destructive/40 transform rotate-45 absolute -bottom-1 right-4"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

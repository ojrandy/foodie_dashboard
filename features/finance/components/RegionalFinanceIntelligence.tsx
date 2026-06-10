import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, DollarSign, TrendingUp, Activity } from "lucide-react";
import { CameroonMap } from "@/components/dashboard/CameroonMap";

const FINANCE_REGION_META = {
  "south_west": { activeUsers: "High", activeZones: 90, activityLevel: "Stable" }, 
  "littoral": { activeUsers: "High", activeZones: 95, activityLevel: "Stable" },
  "centre": { activeUsers: "High", activeZones: 85, activityLevel: "Stable" },
  "west": { activeUsers: "Medium", activeZones: 60, activityLevel: "Warning" },
  "north_west": { activeUsers: "Medium", activeZones: 50, activityLevel: "Warning" },
  "south": { activeUsers: "Low", activeZones: 35, activityLevel: "Critical" },
  "east": { activeUsers: "Low", activeZones: 25, activityLevel: "Critical" },
  "adamawa": { activeUsers: "Low", activeZones: 15, activityLevel: "Critical" },
  "north": { activeUsers: "Low", activeZones: 20, activityLevel: "Critical" },
  "far_north": { activeUsers: "Low", activeZones: 10, activityLevel: "Critical" }
};

type RegionMeta = { activeUsers: string; activeZones: number; activityLevel: string };

export function RegionalFinanceIntelligence() {
  const [selectedRegion, setSelectedRegion] = useState("all");

  const activeMeta = selectedRegion !== "all" ? (FINANCE_REGION_META as Record<string, RegionMeta>)[selectedRegion] : null;

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Map className="h-5 w-5 text-primary" /> Regional Profitability
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="flex justify-center relative">
            <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <CameroonMap 
              selectedRegionId={selectedRegion}
              onSelectRegion={setSelectedRegion}
              metadata={FINANCE_REGION_META as Record<string, RegionMeta>}
              className="w-full max-w-sm bg-transparent border-none shadow-none z-10 relative"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                {selectedRegion === "all" ? "National Profitability" : selectedRegion.replace("_", " ").toUpperCase()}
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/20 border border-border/40 rounded-xl">
                  <DollarSign className="h-5 w-5 text-emerald-500 mb-2" />
                  <p className="text-2xl font-black text-foreground">
                    {selectedRegion === "all" ? "14.5M" : `${activeMeta?.activeZones ? Math.floor(activeMeta.activeZones * 1.5) : 0}M`}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">Monthly Revenue (F)</p>
                </div>
                
                <div className="p-4 bg-muted/20 border border-border/40 rounded-xl">
                  <Activity className="h-5 w-5 text-blue-500 mb-2" />
                  <p className="text-2xl font-black text-foreground">
                    {selectedRegion === "all" ? "24.5%" : `${activeMeta?.activeZones ? Math.min(35, Math.floor(activeMeta.activeZones * 0.4)) : 0}%`}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">Profit Margin</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 p-4 bg-muted/10 border border-border/40 rounded-xl">
              <div className="flex justify-between items-center pb-2 border-b border-border/20">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Top Performing Zones</span>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>
              
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold">Douala (Littoral)</p>
                    <p className="text-[10px] text-muted-foreground">Highest transaction volume</p>
                  </div>
                  <p className="text-sm font-black font-mono text-emerald-500">32%</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold">Yaoundé (Centre)</p>
                    <p className="text-[10px] text-muted-foreground">Highest AOV</p>
                  </div>
                  <p className="text-sm font-black font-mono text-emerald-500">28%</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
}

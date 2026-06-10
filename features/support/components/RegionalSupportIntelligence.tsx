import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, Ticket, Star, Activity } from "lucide-react";
import { CameroonMap } from "@/components/dashboard/CameroonMap";

const SUPPORT_REGION_META = {
  "south_west": { activeUsers: "High", activeZones: 90, activityLevel: "Warning" }, 
  "littoral": { activeUsers: "High", activeZones: 95, activityLevel: "Stable" },
  "centre": { activeUsers: "High", activeZones: 85, activityLevel: "Stable" },
  "west": { activeUsers: "Medium", activeZones: 60, activityLevel: "Stable" },
  "north_west": { activeUsers: "Medium", activeZones: 50, activityLevel: "Critical" },
  "south": { activeUsers: "Low", activeZones: 35, activityLevel: "Stable" },
  "east": { activeUsers: "Low", activeZones: 25, activityLevel: "Stable" },
  "adamawa": { activeUsers: "Low", activeZones: 15, activityLevel: "Stable" },
  "north": { activeUsers: "Low", activeZones: 20, activityLevel: "Stable" },
  "far_north": { activeUsers: "Low", activeZones: 10, activityLevel: "Stable" }
};

type RegionMeta = { activeUsers: string; activeZones: number; activityLevel: string };

export function RegionalSupportIntelligence() {
  const [selectedRegion, setSelectedRegion] = useState("all");

  const activeMeta = selectedRegion !== "all" ? (SUPPORT_REGION_META as Record<string, RegionMeta>)[selectedRegion] : null;

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Map className="h-5 w-5 text-primary" /> Regional Support Load
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="flex justify-center relative">
            <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            <CameroonMap 
              selectedRegionId={selectedRegion}
              onSelectRegion={setSelectedRegion}
              metadata={SUPPORT_REGION_META as Record<string, RegionMeta>}
              className="w-full max-w-sm bg-transparent border-none shadow-none z-10 relative"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                {selectedRegion === "all" ? "National Support Volume" : selectedRegion.replace("_", " ").toUpperCase()}
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/20 border border-border/40 rounded-xl">
                  <Ticket className="h-5 w-5 text-blue-500 mb-2" />
                  <p className="text-2xl font-black text-foreground">
                    {selectedRegion === "all" ? "1,245" : `${activeMeta?.activeZones ? Math.floor(activeMeta.activeZones * 2.5) : 0}`}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">Open Tickets</p>
                </div>
                
                <div className="p-4 bg-muted/20 border border-border/40 rounded-xl">
                  <Star className="h-5 w-5 text-amber-500 mb-2" />
                  <p className="text-2xl font-black text-foreground">
                    {selectedRegion === "all" ? "4.5" : `${activeMeta?.activeZones ? Math.min(4.9, 3.5 + Math.floor(activeMeta.activeZones * 0.015)) : 0}`}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">CSAT Score</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 p-4 bg-muted/10 border border-border/40 rounded-xl">
              <div className="flex justify-between items-center pb-2 border-b border-border/20">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">High Volume Zones</span>
                <Activity className="h-4 w-4 text-rose-500" />
              </div>
              
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold">Buea (South West)</p>
                    <p className="text-[10px] text-muted-foreground">Late delivery complaints spiking</p>
                  </div>
                  <p className="text-sm font-black font-mono text-rose-500">124</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold">Douala (Littoral)</p>
                    <p className="text-[10px] text-muted-foreground">General inquiries</p>
                  </div>
                  <p className="text-sm font-black font-mono text-blue-500">86</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
}

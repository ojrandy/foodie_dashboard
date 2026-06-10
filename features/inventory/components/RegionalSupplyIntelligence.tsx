import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, AlertTriangle, TrendingUp, AlertOctagon } from "lucide-react";
import { CameroonMap } from "@/components/dashboard/CameroonMap";

const REGION_SUPPLY_META = {
  "south_west": { activeUsers: "High", activeZones: 85, activityLevel: "Stable" }, // activityLevel string for compatibility
  "littoral": { activeUsers: "Medium", activeZones: 65, activityLevel: "Warning" },
  "centre": { activeUsers: "High", activeZones: 92, activityLevel: "Stable" },
  "west": { activeUsers: "Low", activeZones: 35, activityLevel: "Critical" },
  "north_west": { activeUsers: "Low", activeZones: 40, activityLevel: "Warning" },
  "south": { activeUsers: "Medium", activeZones: 70, activityLevel: "Stable" },
  "east": { activeUsers: "Medium", activeZones: 60, activityLevel: "Stable" },
  "adamawa": { activeUsers: "Low", activeZones: 20, activityLevel: "Critical" },
  "north": { activeUsers: "Low", activeZones: 30, activityLevel: "Warning" },
  "far_north": { activeUsers: "Low", activeZones: 15, activityLevel: "Critical" }
};

type RegionMeta = { activeUsers: string; activeZones: number; activityLevel: string };

export function RegionalSupplyIntelligence() {
  const [selectedRegion, setSelectedRegion] = useState("all");

  const activeMeta = selectedRegion !== "all" ? (REGION_SUPPLY_META as Record<string, RegionMeta>)[selectedRegion] : null;

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Map className="h-5 w-5 text-primary" /> Regional Supply Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <CameroonMap 
              selectedRegionId={selectedRegion}
              onSelectRegion={setSelectedRegion}
              metadata={REGION_SUPPLY_META as Record<string, RegionMeta>}
              className="w-full max-w-sm bg-muted/10 border-none shadow-none"
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                Region Analytics: {selectedRegion === "all" ? "National Overview" : selectedRegion.replace("_", " ").toUpperCase()}
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/20 border border-border/40 rounded-xl">
                  <TrendingUp className="h-5 w-5 text-primary mb-2" />
                  <p className="text-2xl font-black text-foreground">
                    {selectedRegion === "all" ? "82%" : `${activeMeta?.activeZones}%`}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">Avail. Index</p>
                </div>
                
                <div className="p-4 bg-muted/20 border border-border/40 rounded-xl">
                  {activeMeta?.activityLevel === "Critical" ? (
                    <AlertOctagon className="h-5 w-5 text-destructive mb-2" />
                  ) : activeMeta?.activityLevel === "Warning" ? (
                    <AlertTriangle className="h-5 w-5 text-warning mb-2" />
                  ) : (
                    <Map className="h-5 w-5 text-success mb-2" />
                  )}
                  <p className="text-2xl font-black text-foreground">
                    {selectedRegion === "all" ? "Stable" : activeMeta?.activityLevel || "N/A"}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">Overall Status</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-border/40 rounded-xl bg-accent/5">
              <p className="text-xs font-bold text-foreground mb-2">Regional Risk Profile</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                {selectedRegion === "all" ? "Select a region to view specific shortage risks and supply chain stability." :
                 activeMeta?.activityLevel === "Critical" ? "Severe supply shortages detected. Immediate sourcing reallocation required from neighboring regions." :
                 activeMeta?.activityLevel === "Warning" ? "Certain ingredients are experiencing high price volatility. Proceed with caution." :
                 "Supply chain is stable. Availability indexes are performing within expected standard deviations."}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, MapPin, Users, Target } from "lucide-react";
import { CameroonMap } from "@/components/dashboard/CameroonMap";
import { Progress } from "@/components/ui/progress";

const CUSTOMER_REGION_META = {
  "south_west": { activeUsers: "High", activeZones: 85, activityLevel: "Stable" }, 
  "littoral": { activeUsers: "High", activeZones: 92, activityLevel: "Stable" },
  "centre": { activeUsers: "High", activeZones: 88, activityLevel: "Stable" },
  "west": { activeUsers: "Medium", activeZones: 65, activityLevel: "Warning" },
  "north_west": { activeUsers: "Medium", activeZones: 55, activityLevel: "Warning" },
  "south": { activeUsers: "Low", activeZones: 40, activityLevel: "Critical" },
  "east": { activeUsers: "Low", activeZones: 30, activityLevel: "Critical" },
  "adamawa": { activeUsers: "Low", activeZones: 20, activityLevel: "Critical" },
  "north": { activeUsers: "Low", activeZones: 25, activityLevel: "Critical" },
  "far_north": { activeUsers: "Low", activeZones: 15, activityLevel: "Critical" }
};

type RegionMeta = { activeUsers: string; activeZones: number; activityLevel: string };

export function GeographicIntelligence() {
  const [selectedRegion, setSelectedRegion] = useState("all");

  const activeMeta = selectedRegion !== "all" ? (CUSTOMER_REGION_META as Record<string, RegionMeta>)[selectedRegion] : null;

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Map className="h-5 w-5 text-primary" /> Geographic Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="flex justify-center relative">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <CameroonMap 
              selectedRegionId={selectedRegion}
              onSelectRegion={setSelectedRegion}
              metadata={CUSTOMER_REGION_META as Record<string, RegionMeta>}
              className="w-full max-w-sm bg-transparent border-none shadow-none z-10 relative"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                Region Analytics: {selectedRegion === "all" ? "National Overview" : selectedRegion.replace("_", " ").toUpperCase()}
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/20 border border-border/40 rounded-xl">
                  <Users className="h-5 w-5 text-primary mb-2" />
                  <p className="text-2xl font-black text-foreground">
                    {selectedRegion === "all" ? "12.4k" : `${activeMeta?.activeZones ? Math.floor(activeMeta.activeZones * 124) : 0}`}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">Total Customers</p>
                </div>
                
                <div className="p-4 bg-muted/20 border border-border/40 rounded-xl">
                  <Target className="h-5 w-5 text-emerald-500 mb-2" />
                  <p className="text-2xl font-black text-foreground">
                    {selectedRegion === "all" ? "68%" : `${activeMeta?.activeZones || 0}%`}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">Penetration Rate</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 p-4 bg-muted/10 border border-border/40 rounded-xl">
              <h4 className="text-xs font-bold flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-primary" /> High Density Zones
              </h4>
              
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1">
                    <span>Douala (Littoral)</span>
                    <span>35% of total</span>
                  </div>
                  <Progress value={35} className="h-1.5" />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1">
                    <span>Yaoundé (Centre)</span>
                    <span>28% of total</span>
                  </div>
                  <Progress value={28} indicatorClassName="bg-amber-500" className="h-1.5" />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1">
                    <span>Buea (South West)</span>
                    <span>15% of total</span>
                  </div>
                  <Progress value={15} indicatorClassName="bg-emerald-500" className="h-1.5" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
}

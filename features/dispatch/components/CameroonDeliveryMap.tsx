import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map as MapIcon, Users, Box } from "lucide-react";
import { CameroonMap } from "@/components/dashboard/CameroonMap";

const REGION_METADATA = {
  "south_west": { activeUsers: "1,245", activeZones: 8, activityLevel: "High" },
  "littoral": { activeUsers: "3,890", activeZones: 12, activityLevel: "High" },
  "centre": { activeUsers: "2,500", activeZones: 10, activityLevel: "Medium" },
  "west": { activeUsers: "800", activeZones: 5, activityLevel: "Low" },
  "north_west": { activeUsers: "450", activeZones: 3, activityLevel: "Low" },
  "south": { activeUsers: "320", activeZones: 2, activityLevel: "Low" },
  "east": { activeUsers: "150", activeZones: 1, activityLevel: "Low" },
  "adamawa": { activeUsers: "80", activeZones: 1, activityLevel: "Low" },
  "north": { activeUsers: "40", activeZones: 1, activityLevel: "Low" },
  "far_north": { activeUsers: "20", activeZones: 1, activityLevel: "Low" }
};

type RegionMeta = { activeUsers: string; activeZones: number; activityLevel: string };

export function CameroonDeliveryMap() {
  const [selectedRegion, setSelectedRegion] = useState("all");

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <MapIcon className="h-5 w-5 text-accent" /> Cameroon Delivery Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <CameroonMap 
              selectedRegionId={selectedRegion}
              onSelectRegion={setSelectedRegion}
              metadata={REGION_METADATA as Record<string, RegionMeta>}
              className="w-full max-w-sm bg-muted/10 border-none shadow-none"
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                Region Analytics: {selectedRegion === "all" ? "National" : selectedRegion.replace("_", " ").toUpperCase()}
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/20 border border-border/40 rounded-xl">
                  <Box className="h-5 w-5 text-primary mb-2" />
                  <p className="text-2xl font-black text-foreground">
                    {selectedRegion === "all" ? "9,495" : (REGION_METADATA as Record<string, RegionMeta>)[selectedRegion]?.activeUsers || "0"}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">Total Deliveries</p>
                </div>
                
                <div className="p-4 bg-muted/20 border border-border/40 rounded-xl">
                  <Users className="h-5 w-5 text-success mb-2" />
                  <p className="text-2xl font-black text-foreground">
                    {selectedRegion === "all" ? "44" : (REGION_METADATA as Record<string, RegionMeta>)[selectedRegion]?.activeZones || "0"}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1">Active Riders</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-border/40 rounded-xl bg-accent/5">
              <p className="text-xs font-bold text-foreground mb-2">Logistics Insight</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                {selectedRegion === "south_west" ? "High demand in Buea and Limbe. Suggesting reallocation of 3 riders from West to South West to handle peak lunch hours." :
                 selectedRegion === "littoral" ? "Douala is experiencing heavy traffic near Akwa. Route optimization is actively bypassing Boulevard de la République." :
                 selectedRegion === "centre" ? "Steady delivery volume in Yaoundé. Bastos area accounts for 45% of total orders in this region." :
                 "Select a specific region on the map to view AI-generated logistics insights and demand predictions."}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

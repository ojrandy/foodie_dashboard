"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Map, CloudRain, AlertTriangle } from "lucide-react";

export function FleetLogisticsCenter() {
  const regions = [
    { name: "Buea Central", activeRiders: 24, load: "Heavy", weather: "Clear", surge: "1.2x" },
    { name: "Douala Marche", activeRiders: 45, load: "Gridlock", weather: "Rain", surge: "2.5x" },
    { name: "Yaounde Bastos", activeRiders: 32, load: "Moderate", weather: "Clear", surge: "1.0x" },
  ];

  return (
    <Card className="glass border-accent/20 h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Truck className="h-6 w-6 text-accent" /> Fleet Logistics Center
        </CardTitle>
        <p className="text-xs text-muted-foreground">Admin overview of live fleet metrics, active surge pricing rules, and weather impacts.</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-accent/10 p-4 rounded-xl border border-accent/20 text-center">
            <p className="text-[10px] uppercase font-bold text-accent">Total Active Fleet</p>
            <p className="text-3xl font-black text-accent mt-1">101</p>
          </div>
          <div className="bg-destructive/10 p-4 rounded-xl border border-destructive/20 text-center">
            <p className="text-[10px] uppercase font-bold text-destructive flex justify-center items-center gap-1"><AlertTriangle className="h-3 w-3" /> System Risk</p>
            <p className="text-3xl font-black text-destructive mt-1">High</p>
          </div>
          <div className="bg-muted/10 p-4 rounded-xl border border-border/40 text-center">
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Avg Surge</p>
            <p className="text-3xl font-black text-foreground mt-1">1.5x</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2 flex items-center gap-2"><Map className="h-4 w-4" /> Regional Breakdown</h4>
          {regions.map((region, i) => (
            <div key={i} className="bg-card border border-border/40 p-4 rounded-xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-foreground text-sm">{region.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-[9px]"><Truck className="h-3 w-3 mr-1" /> {region.activeRiders} Riders</Badge>
                  {region.weather === "Rain" && <Badge variant="outline" className="text-[9px] bg-blue-500/10 text-blue-500 border-blue-500/30"><CloudRain className="h-3 w-3 mr-1" /> Rain</Badge>}
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Live Surge Multiplier</p>
                <p className={`text-lg font-black ${region.surge === '1.0x' ? 'text-foreground' : 'text-destructive'}`}>
                  {region.surge}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

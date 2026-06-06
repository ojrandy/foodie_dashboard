"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, Zap, AlertTriangle } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const data = [
  { time: "08:00", avgEta: 25 },
  { time: "10:00", avgEta: 22 },
  { time: "12:00", avgEta: 45 },
  { time: "14:00", avgEta: 38 },
  { time: "16:00", avgEta: 35 },
  { time: "18:00", avgEta: 55 },
  { time: "20:00", avgEta: 40 },
];

export function DeliveryETAIntelligence() {
  return (
    <Card className="glass border-border/40 h-full">
      <CardHeader>
        <CardTitle className="text-base font-bold flex items-center gap-2">
          <Activity className="h-4 w-4 text-purple-500" /> ETA Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card border border-border/40 p-3 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-success/10 text-success flex items-center justify-center">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[9px] uppercase font-bold text-muted-foreground">Fastest Route</p>
              <p className="text-sm font-black text-foreground">12 mins</p>
            </div>
          </div>
          <div className="bg-card border border-border/40 p-3 rounded-xl flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[9px] uppercase font-bold text-muted-foreground">Slowest Route</p>
              <p className="text-sm font-black text-foreground">85 mins</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <h4 className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> Average ETA Trend (Today)
            </h4>
            <span className="text-xs font-black text-warning">Peak: 55 mins</span>
          </div>
          
          <div className="h-[120px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorEta" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "10px" }}
                  itemStyle={{ color: "hsl(var(--foreground))", fontWeight: "bold" }}
                />
                <Area type="monotone" dataKey="avgEta" stroke="hsl(var(--warning))" strokeWidth={2} fillOpacity={1} fill="url(#colorEta)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

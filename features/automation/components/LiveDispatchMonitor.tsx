"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, MapPin, CheckCircle2 } from "lucide-react";

interface LiveEvent {
  id: string;
  recipe: string;
  region: string;
  status: string;
  time: string;
  margin: number;
}

export function LiveDispatchMonitor() {
  const [liveStream, setLiveStream] = useState<LiveEvent[]>([]);

  // Simulate incoming live orders from the mobile app
  useEffect(() => {
    const interval = setInterval(() => {
      const mockRegions = ["Buea Central", "Molyko", "Bonamoussadi", "Akwa", "Bastos"];
      const mockRecipes = ["Egusi Soup", "Ndole", "Jollof Rice", "Eru"];
      
      const newEvent = {
        id: `LD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        recipe: mockRecipes[Math.floor(Math.random() * mockRecipes.length)],
        region: mockRegions[Math.floor(Math.random() * mockRegions.length)],
        status: "Processing",
        time: new Date().toLocaleTimeString(),
        margin: Math.floor(Math.random() * 2000) + 1500,
      };

      setLiveStream(prev => [newEvent, ...prev].slice(0, 5));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass border-accent/20 h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Activity className="h-6 w-6 text-accent" /> Live Dispatch Monitor
        </CardTitle>
        <p className="text-xs text-muted-foreground">Real-time view of the automation engine processing mobile app orders.</p>
      </CardHeader>
      <CardContent>
        
        {/* Live Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-muted/10 p-3 rounded-lg border border-border/40 text-center">
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Active Dispatches</p>
            <p className="text-2xl font-black text-accent mt-1 animate-pulse">42</p>
          </div>
          <div className="bg-muted/10 p-3 rounded-lg border border-border/40 text-center">
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Avg Route Time</p>
            <p className="text-2xl font-black text-foreground mt-1">18m</p>
          </div>
          <div className="bg-muted/10 p-3 rounded-lg border border-border/40 text-center">
            <p className="text-[10px] uppercase font-bold text-muted-foreground">System Load</p>
            <p className="text-2xl font-black text-success mt-1">Low</p>
          </div>
        </div>

        {/* Live Feed */}
        <div className="space-y-3 relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border/40 z-0" />
          
          <AnimatePresence>
            {liveStream.map((event, idx) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative z-10 flex items-center gap-4 bg-card border border-border/40 p-3 rounded-xl shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 border border-accent/30 text-accent">
                  {idx === 0 ? <Activity className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-bold">{event.recipe}</p>
                    <span className="text-[10px] text-muted-foreground">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] flex items-center gap-1 text-muted-foreground"><MapPin className="h-3 w-3" /> {event.region}</span>
                    <Badge variant="outline" className="text-[9px] bg-success/10 text-success border-success/30">+{event.margin} XAF Margin</Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

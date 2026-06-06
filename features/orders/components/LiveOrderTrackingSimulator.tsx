"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Map, Truck, Navigation } from "lucide-react";

export function LiveOrderTrackingSimulator() {
  const [progress, setProgress] = useState(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 10;
        return p + 5;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass border-border/40">
      <CardHeader>
        <CardTitle className="text-base font-bold flex items-center gap-2">
          <Map className="h-4 w-4 text-sky-500" /> Live Tracking Simulator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="relative h-48 bg-muted/20 rounded-xl border border-border/40 overflow-hidden flex items-center justify-center">
          {/* Mock Map Background Grid */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          
          <div className="absolute top-4 left-4 bg-card/80 backdrop-blur border border-border/40 p-2 rounded-lg text-[10px] font-bold text-foreground shadow-sm">
            Mock Map View: Buea Central
          </div>

          {/* Animated Route Line */}
          <div className="absolute top-1/2 left-1/4 right-1/4 h-1 bg-muted rounded-full">
            <motion.div 
              className="h-full bg-sky-500 rounded-full" 
              animate={{ width: `${progress}%` }} 
              transition={{ ease: "linear" }}
            />
          </div>

          {/* Restaurant Node */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="h-4 w-4 bg-accent rounded-full border-2 border-background" />
            <span className="text-[9px] font-bold mt-1 bg-card/80 px-1 rounded">Kitchen</span>
          </div>

          {/* Customer Node */}
          <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="h-4 w-4 bg-success rounded-full border-2 border-background" />
            <span className="text-[9px] font-bold mt-1 bg-card/80 px-1 rounded">Drop-off</span>
          </div>

          {/* Rider Icon */}
          <motion.div 
            className="absolute top-1/2 left-1/4 -translate-y-1/2 z-10"
            animate={{ x: `calc(${progress * 2}px)` }} // Mocking x distance based on progress
            transition={{ ease: "linear" }}
            style={{ marginLeft: `${progress * 1.5}%` }}
          >
            <div className="h-6 w-6 bg-sky-500 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-background">
              <Truck className="h-3 w-3" />
            </div>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-foreground text-background text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
              ORD-9422
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card p-3 rounded-lg border border-border/40">
            <p className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1"><Navigation className="h-3 w-3" /> Current Status</p>
            <p className="text-sm font-bold text-sky-500 mt-1">In Transit - Molyko Rd</p>
          </div>
          <div className="bg-card p-3 rounded-lg border border-border/40 text-right">
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Estimated Arrival</p>
            <p className="text-sm font-bold text-foreground mt-1">15 mins away</p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

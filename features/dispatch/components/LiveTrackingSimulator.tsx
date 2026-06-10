import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation, Truck } from "lucide-react";
import { motion } from "framer-motion";

export function LiveTrackingSimulator() {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 5;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="glass relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
      <CardHeader className="pb-3 relative z-10">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <Navigation className="h-4 w-4 text-primary animate-pulse" /> Live Tracking Simulation
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 space-y-4">
        <div className="flex justify-between items-center text-xs">
          <div>
            <p className="font-bold text-muted-foreground">Order #1027</p>
            <p className="text-[10px] font-black mt-1">Frank Ndip (Clerks Qrt)</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-primary">Status</p>
            <p className="font-bold text-foreground">In Transit</p>
          </div>
        </div>

        <div className="relative h-20 bg-muted/20 border border-border/40 rounded-xl flex items-center px-4 overflow-hidden">
          {/* Animated Map Grid Background */}
          <div className="absolute inset-0 opacity-10"
               style={{ backgroundImage: "radial-gradient(var(--primary) 1px, transparent 1px)", backgroundSize: "10px 10px" }} />
          
          <div className="w-full h-1 bg-border rounded-full relative">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-primary rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
            
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 h-6 w-6 bg-card border-2 border-primary rounded-full flex items-center justify-center shadow-lg"
              animate={{ left: `calc(${progress}% - 12px)` }}
              transition={{ duration: 0.5 }}
            >
              <Truck className="h-3 w-3 text-primary" />
            </motion.div>
          </div>

          <div className="absolute left-4 top-1/2 -translate-y-1/2 h-3 w-3 bg-card border-2 border-muted-foreground rounded-full" />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 h-3 w-3 bg-card border-2 border-success rounded-full" />
        </div>

        <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
          <span>Kitchen (Buea)</span>
          <span className="text-success">{100 - progress}% remaining</span>
          <span>Destination</span>
        </div>
      </CardContent>
    </Card>
  );
}

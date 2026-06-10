import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HOTSPOTS = [
  { city: "Buea", zones: [
    { name: "Molyko", intensity: 95 },
    { name: "Bomaka", intensity: 70 },
    { name: "Great Soppo", intensity: 85 },
    { name: "Bonduma", intensity: 40 },
  ]},
  { city: "Douala", zones: [
    { name: "Akwa", intensity: 98 },
    { name: "Bonapriso", intensity: 88 },
    { name: "Deido", intensity: 75 },
    { name: "Bonaberi", intensity: 60 },
  ]},
  { city: "Yaoundé", zones: [
    { name: "Bastos", intensity: 92 },
    { name: "Mvan", intensity: 65 },
    { name: "Biyem-Assi", intensity: 80 },
    { name: "Omnisport", intensity: 72 },
  ]},
];

export function DeliveryHeatmaps() {
  const [activeCity, setActiveCity] = useState(HOTSPOTS[0]);

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500 animate-pulse" /> Delivery Heatmaps
          </div>
          <div className="flex bg-muted/30 p-1 rounded-lg border border-border/40">
            {HOTSPOTS.map(h => (
              <button
                key={h.city}
                onClick={() => setActiveCity(h)}
                className={`px-3 py-1 text-[10px] font-bold rounded-md transition-colors ${
                  activeCity.city === h.city ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {h.city}
              </button>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[300px] bg-muted/10 rounded-xl border border-border/40 overflow-hidden flex items-center justify-center">
          {/* Abstract Heatmap Grid Visualization */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-5 pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCity.city}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full relative p-6"
            >
              {activeCity.zones.map((zone, i) => {
                // Generate somewhat random but fixed positions for aesthetic map distribution
                const top = 20 + (i * 20) + (i % 2 === 0 ? 5 : -5);
                const left = 15 + (i * 20) + (i % 2 === 0 ? -10 : 10);
                
                // Color based on intensity
                const color = zone.intensity > 90 ? "bg-red-500" :
                              zone.intensity > 75 ? "bg-orange-500" :
                              zone.intensity > 60 ? "bg-yellow-500" : "bg-emerald-500";

                const glow = zone.intensity > 90 ? "shadow-[0_0_30px_rgba(239,68,68,0.6)]" :
                             zone.intensity > 75 ? "shadow-[0_0_20px_rgba(249,115,22,0.5)]" :
                             zone.intensity > 60 ? "shadow-[0_0_15px_rgba(234,179,8,0.4)]" : "shadow-none";

                return (
                  <motion.div
                    key={zone.name}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    className="absolute flex flex-col items-center group cursor-crosshair"
                    style={{ top: `${top}%`, left: `${left}%` }}
                  >
                    <div className={`relative flex items-center justify-center rounded-full ${color} ${glow} transition-all duration-300 group-hover:scale-125`}
                         style={{ width: `${zone.intensity * 0.8}px`, height: `${zone.intensity * 0.8}px`, opacity: 0.7 }}>
                      <MapPin className="h-4 w-4 text-white drop-shadow-md" />
                    </div>
                    <div className="mt-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                      <p className="text-[10px] font-bold text-foreground">{zone.name}</p>
                      <p className="text-[9px] text-muted-foreground">Demand: {zone.intensity}%</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/40 flex items-center gap-3">
            <span className="text-[9px] font-bold uppercase text-muted-foreground tracking-wider">Demand</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-emerald-500 opacity-70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
              <div className="w-3 h-3 rounded-full bg-orange-500 opacity-70" />
              <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
            </div>
            <span className="text-[9px] font-bold uppercase text-muted-foreground tracking-wider">High</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

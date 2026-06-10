import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ThermometerSun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HOTSPOTS = [
  { city: "Buea Central Market", zones: [
    { name: "Tomatoes", intensity: 95 }, // Red = low supply
    { name: "Rice", intensity: 20 }, // Green = good supply
    { name: "Fish", intensity: 85 },
    { name: "Plantains", intensity: 30 },
  ]},
  { city: "Douala Akwa", zones: [
    { name: "Cassava", intensity: 50 },
    { name: "Palm Oil", intensity: 98 },
    { name: "Onions", intensity: 45 },
    { name: "Chicken", intensity: 25 },
  ]},
  { city: "Yaoundé Mokolo", zones: [
    { name: "Egusi", intensity: 88 },
    { name: "Beans", intensity: 65 },
    { name: "Pepper", intensity: 40 },
    { name: "Beef", intensity: 72 },
  ]},
];

export function SupplyHeatmaps() {
  const [activeCity, setActiveCity] = useState(HOTSPOTS[0]);

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ThermometerSun className="h-5 w-5 text-orange-500 animate-pulse" /> Supply Scarcity Heatmap
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
                {h.city.split(" ")[0]}
              </button>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[250px] bg-muted/10 rounded-xl border border-border/40 overflow-hidden flex items-center justify-center">
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
                const top = 20 + (i * 20) + (i % 2 === 0 ? 5 : -5);
                const left = 15 + (i * 20) + (i % 2 === 0 ? -10 : 10);
                
                // Color based on SCARCITY intensity (higher = worse)
                const color = zone.intensity > 85 ? "bg-red-500" :
                              zone.intensity > 60 ? "bg-orange-500" :
                              zone.intensity > 40 ? "bg-yellow-500" : "bg-emerald-500";

                const glow = zone.intensity > 85 ? "shadow-[0_0_30px_rgba(239,68,68,0.6)]" :
                             zone.intensity > 60 ? "shadow-[0_0_20px_rgba(249,115,22,0.5)]" :
                             zone.intensity > 40 ? "shadow-[0_0_15px_rgba(234,179,8,0.4)]" : "shadow-none";

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
                         style={{ width: `${Math.max(zone.intensity, 30)}px`, height: `${Math.max(zone.intensity, 30)}px`, opacity: 0.7 }}>
                      <MapPin className="h-4 w-4 text-white drop-shadow-md" />
                    </div>
                    <div className="mt-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                      <p className="text-[10px] font-bold text-foreground">{zone.name}</p>
                      <p className="text-[9px] text-muted-foreground">Scarcity: {zone.intensity}%</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/40 flex items-center gap-3">
            <span className="text-[9px] font-bold uppercase text-muted-foreground tracking-wider">Available</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-emerald-500 opacity-70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
              <div className="w-3 h-3 rounded-full bg-orange-500 opacity-70" />
              <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
            </div>
            <span className="text-[9px] font-bold uppercase text-muted-foreground tracking-wider">Scarce</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

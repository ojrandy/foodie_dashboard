import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInventoryIntelligence } from "../hooks/useInventoryIntelligence";
import { Activity, Bell, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function InventoryActivityFeed() {
  const { feed } = useInventoryIntelligence();
  const [displayFeed, setDisplayFeed] = useState(feed);

  useEffect(() => {
    // Simulate real-time stream
    const interval = setInterval(() => {
      setDisplayFeed(prev => {
        const newEvent = {
          id: `EV-NEW-${Date.now()}`,
          title: "System check completed, inventory updated",
          time: "Just now",
          type: "info" as const
        };
        return [newEvent, ...prev].slice(0, 8); // keep last 8
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary animate-pulse" /> Live Supply Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[var(--card)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[var(--card)] to-transparent z-10 pointer-events-none" />
        
        <div className="space-y-3 h-full overflow-y-auto custom-scrollbar pr-2 pb-8">
          <AnimatePresence>
            {displayFeed.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3 p-3 rounded-lg border border-border/40 bg-muted/10 hover:bg-muted/30 transition-colors"
              >
                <div className={`p-2 rounded-full mt-0.5 ${
                  event.type === 'positive' ? 'bg-success/10 text-success' :
                  event.type === 'negative' ? 'bg-destructive/10 text-destructive' :
                  event.type === 'warning' ? 'bg-warning/10 text-warning' :
                  'bg-primary/10 text-primary'
                }`}>
                  {event.type === 'positive' ? <CheckCircle2 className="h-3 w-3" /> :
                   event.type === 'negative' ? <AlertTriangle className="h-3 w-3" /> :
                   event.type === 'warning' ? <Bell className="h-3 w-3" /> :
                   <Info className="h-3 w-3" />}
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground leading-tight mb-1">{event.title}</p>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-bold">{event.time}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

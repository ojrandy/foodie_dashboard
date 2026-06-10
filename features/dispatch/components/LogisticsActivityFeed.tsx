import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Bell, MapPin, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_FEED = [
  { id: 1, message: "Rider Samuel E. assigned to Order #1027", time: "Just now", type: "assignment" },
  { id: 2, message: "Order #1026 picked up by Alain N.", time: "2 mins ago", type: "pickup" },
  { id: 3, message: "Delivery delayed in Buea (Heavy Rain)", time: "5 mins ago", type: "alert" },
  { id: 4, message: "Order #1024 delivered successfully", time: "10 mins ago", type: "success" },
];

export function LogisticsActivityFeed() {
  const [feed, setFeed] = useState(INITIAL_FEED);

  // Simulate incoming real-time events
  useEffect(() => {
    const timer = setInterval(() => {
      const newEvents = [
        { message: "New rider came online in Douala", type: "info" },
        { message: "Order #1030 waiting for assignment", type: "alert" },
        { message: "Rider Marc O. accepted Order #1029", type: "assignment" }
      ];
      const randomEvent = newEvents[Math.floor(Math.random() * newEvents.length)];
      
      setFeed(prev => [
        { id: Date.now(), message: randomEvent.message, time: "Just now", type: randomEvent.type },
        ...prev.slice(0, 4) // Keep only 5 latest items
      ]);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="glass">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <Activity className="h-4 w-4 text-accent" /> Logistics Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 relative">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border/40" />
          <AnimatePresence>
            {feed.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex gap-3 relative z-10"
              >
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm ${
                  item.type === "assignment" ? "bg-primary/10 text-primary" :
                  item.type === "pickup" ? "bg-warning/10 text-warning" :
                  item.type === "alert" ? "bg-destructive/10 text-destructive" :
                  item.type === "success" ? "bg-success/10 text-success" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {item.type === "alert" ? <Bell className="h-3 w-3" /> :
                   item.type === "assignment" ? <Truck className="h-3 w-3" /> :
                   <MapPin className="h-3 w-3" />}
                </div>
                <div className="bg-muted/20 border border-border/40 p-3 rounded-xl flex-1">
                  <p className="text-xs font-bold text-foreground">{item.message}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

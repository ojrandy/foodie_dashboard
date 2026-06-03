"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Truck, DollarSign, ChefHat } from "lucide-react";
import { cn } from "@/lib/cn";

interface ActivityEvent {
  id: string;
  type: "order" | "dispatch" | "market" | "recipe";
  title: string;
  description: string;
  time: string;
  status: "success" | "warning" | "info";
  detail?: string;
}

const INITIAL_EVENTS: ActivityEvent[] = [
  {
    id: "act-1",
    type: "dispatch",
    title: "Rider Dispatched (RD-492)",
    description: "Rider 'Erick N.' left central kitchen with order #ORD-8291",
    time: "Just Now",
    status: "info",
    detail: "Central Buea Zone",
  },
  {
    id: "act-2",
    type: "order",
    title: "Order Assigned (#ORD-8293)",
    description: "Assigned to nearest dispatch rider 'Mike S.'",
    time: "2 min ago",
    status: "success",
    detail: "Molyko",
  },
  {
    id: "act-3",
    type: "market",
    title: "Market Price Update: Egusi",
    description: "Wholesale Egusi seed price updated to 4,200 XAF/kg (+3%)",
    time: "10 min ago",
    status: "warning",
    detail: "Buea Central Market",
  },
  {
    id: "act-4",
    type: "recipe",
    title: "New Recipe Created: Ndole Plan",
    description: "Chef 'Amelie P.' published 'Ndole Supreme Premium Plan'",
    time: "25 min ago",
    status: "info",
    detail: "5 ingredients",
  },
  {
    id: "act-5",
    type: "order",
    title: "Delivery Completed (#ORD-8288)",
    description: "Delivered to 'Clara T.' in Muea. Total duration: 24 mins.",
    time: "42 min ago",
    status: "success",
    detail: "Muea",
  },
];

const SIMULATED_STREAM_EVENTS: Omit<ActivityEvent, "id" | "time">[] = [
  {
    type: "order",
    title: "New Order Placed (#ORD-8302)",
    description: "Student Family Pack combo ordered by 'Julius M.'",
    status: "success",
    detail: "Molyko Student Ghetto",
  },
  {
    type: "dispatch",
    title: "Rider Delivered Order (#ORD-8290)",
    description: "Rider 'Sarah L.' completed express meal delivery",
    status: "success",
    detail: "Mile 17 Terminal",
  },
  {
    type: "market",
    title: "Market Price Dip: Plantains",
    description: "Plantain finger unit price reduced to 120 XAF (-6%)",
    status: "success",
    detail: "Mutengene Wholesale",
  },
  {
    type: "dispatch",
    title: "Rider Dispatched (RD-301)",
    description: "Rider 'John D.' departed kitchen with order #ORD-8299",
    status: "info",
    detail: "Yaounde Route 1",
  },
];

export interface LiveActivityFeedProps {
  customEvents?: ActivityEvent[];
  customSimulatedEvents?: Omit<ActivityEvent, "id" | "time">[];
}

export function LiveActivityFeed({
  customEvents = INITIAL_EVENTS,
  customSimulatedEvents = SIMULATED_STREAM_EVENTS,
}: LiveActivityFeedProps) {
  const [events, setEvents] = useState<ActivityEvent[]>(customEvents);
  const simIndexRef = useRef(0);

  // Sync state instantly when parent regional filter shifts
  useEffect(() => {
    setEvents(customEvents);
  }, [customEvents]);

  // Simulate active operational updates over time (real-time feeling)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!customSimulatedEvents.length) return;
      const idx = simIndexRef.current % customSimulatedEvents.length;
      const template = customSimulatedEvents[idx];
      
      const newEvent: ActivityEvent = {
        ...template,
        id: `act-sim-${Date.now()}`,
        time: "Just Now",
      };

      setEvents((prev) => {
        // Shift times of older "Just Now" events to keep realistic
        const updatedPrev = prev.map((e) => {
          if (e.time === "Just Now") return { ...e, time: "1 min ago" };
          if (e.time === "1 min ago") return { ...e, time: "3 min ago" };
          return e;
        });
        
        // Cap list size
        return [newEvent, ...updatedPrev.slice(0, 5)];
      });

      simIndexRef.current += 1;
    }, 12000); // Add a new event every 12 seconds to keep it dynamic but not visually exhausting

    return () => clearInterval(interval);
  }, [customSimulatedEvents]);

  return (
    <div className="rounded-xl border border-border/50 bg-card shadow-sm flex flex-col overflow-hidden h-full">
      {/* Header */}
      <div className="p-6 border-b border-border/50 flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-semibold text-foreground text-sm tracking-wide">Live Dispatch & Logistics Feed</h3>
          <p className="text-xs text-muted-foreground">Active event stream from kitchen to regional couriers.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 text-emerald-500">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Live</span>
        </div>
      </div>

      {/* Feed Container */}
      <div className="p-4 flex-1 overflow-y-auto max-h-[460px] custom-scrollbar">
        <div className="relative border-l border-border/60 ml-4 pl-6 flex flex-col gap-6">
          <AnimatePresence initial={false}>
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10, y: -5 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: "hidden", transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 150, damping: 18 }}
                className="relative group"
              >
                {/* Timeline Icon Node */}
                <span className={cn(
                  "absolute -left-[38px] top-1 flex h-6 w-6 items-center justify-center rounded-full border bg-card transition-transform group-hover:scale-110",
                  event.status === "success" ? "border-emerald-500/30 text-emerald-500" :
                  event.status === "warning" ? "border-rose-500/30 text-rose-500" :
                  "border-primary/20 text-primary"
                )}>
                  {event.type === "order" && <ShoppingBag className="h-3 w-3" />}
                  {event.type === "dispatch" && <Truck className="h-3 w-3" />}
                  {event.type === "market" && <DollarSign className="h-3 w-3" />}
                  {event.type === "recipe" && <ChefHat className="h-3 w-3" />}
                </span>

                {/* Event Text Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-border/10 pb-4 last:border-0 last:pb-0">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-sm text-foreground flex items-center gap-2">
                      {event.title}
                      {event.detail && (
                        <span className="text-[10px] font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {event.detail}
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      {event.description}
                    </span>
                  </div>

                  <span className="text-[10px] font-medium text-muted-foreground bg-muted/40 px-2 py-0.5 rounded shrink-0 self-start md:self-center">
                    {event.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

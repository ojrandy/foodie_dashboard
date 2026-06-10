import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCustomerIntelligence, FeedEvent } from "../hooks/useCustomerIntelligence";
import { Activity, UserPlus, Crown, Star, RefreshCcw, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CustomerActivityFeed() {
  const { feed } = useCustomerIntelligence();
  const [displayFeed, setDisplayFeed] = useState<FeedEvent[]>(feed);

  useEffect(() => {
    // Simulate real-time stream
    const interval = setInterval(() => {
      setDisplayFeed(prev => {
        const newEvent: FeedEvent = {
          id: `FE-NEW-${Date.now()}`,
          title: "Returning customer placed their 5th order",
          time: "Just now",
          type: "order"
        };
        return [newEvent, ...prev].slice(0, 8);
      });
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'new': return <UserPlus className="h-3 w-3 text-violet-500" />;
      case 'vip': return <Crown className="h-3 w-3 text-amber-500" />;
      case 'review': return <Star className="h-3 w-3 text-yellow-500" />;
      case 'refund': return <RefreshCcw className="h-3 w-3 text-destructive" />;
      case 'order': return <ShoppingCart className="h-3 w-3 text-emerald-500" />;
      default: return <Activity className="h-3 w-3 text-primary" />;
    }
  };

  const getEventBg = (type: string) => {
    switch (type) {
      case 'new': return "bg-violet-500/10";
      case 'vip': return "bg-amber-500/10";
      case 'review': return "bg-yellow-500/10";
      case 'refund': return "bg-destructive/10";
      case 'order': return "bg-emerald-500/10";
      default: return "bg-primary/10";
    }
  };

  return (
    <Card className="glass h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary animate-pulse" /> Live Customer Activity
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
                <div className={`p-2 rounded-full mt-0.5 shrink-0 ${getEventBg(event.type)}`}>
                  {getEventIcon(event.type)}
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

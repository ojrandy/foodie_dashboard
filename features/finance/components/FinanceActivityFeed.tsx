import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinanceIntelligence, FinanceFeedEvent } from "../hooks/useFinanceIntelligence";
import { Activity, DollarSign, ShieldAlert, Bike, Target, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FinanceActivityFeed() {
  const { feed } = useFinanceIntelligence();
  const [displayFeed, setDisplayFeed] = useState<FinanceFeedEvent[]>(feed);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayFeed(prev => {
        const newEvent: FinanceFeedEvent = {
          id: `FF-NEW-${Date.now()}`,
          title: "New transaction completed: 25,000 F",
          time: "Just now",
          type: "transaction"
        };
        return [newEvent, ...prev].slice(0, 8);
      });
    }, 25000);

    return () => clearInterval(interval);
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'transaction': return <DollarSign className="h-3 w-3 text-emerald-500" />;
      case 'refund': return <ShieldAlert className="h-3 w-3 text-destructive" />;
      case 'payout': return <Bike className="h-3 w-3 text-pink-500" />;
      case 'milestone': return <Target className="h-3 w-3 text-amber-500" />;
      case 'alert': return <AlertTriangle className="h-3 w-3 text-violet-500" />;
      default: return <Activity className="h-3 w-3 text-primary" />;
    }
  };

  const getEventBg = (type: string) => {
    switch (type) {
      case 'transaction': return "bg-emerald-500/10 border-emerald-500/20";
      case 'refund': return "bg-destructive/10 border-destructive/20";
      case 'payout': return "bg-pink-500/10 border-pink-500/20";
      case 'milestone': return "bg-amber-500/10 border-amber-500/20";
      case 'alert': return "bg-violet-500/10 border-violet-500/20";
      default: return "bg-primary/10 border-primary/20";
    }
  };

  return (
    <Card className="glass h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Activity className="h-5 w-5 text-emerald-500 animate-pulse" /> Live Finance Feed
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
                <div className={`p-2 rounded-full border shrink-0 ${getEventBg(event.type)}`}>
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

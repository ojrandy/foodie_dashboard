import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSupportIntelligence, SupportEvent } from "../hooks/useSupportIntelligence";
import { Activity, Ticket, AlertTriangle, CheckCircle2, Star, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SupportActivityFeed() {
  const { feed } = useSupportIntelligence();
  const [displayFeed, setDisplayFeed] = useState<SupportEvent[]>(feed);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayFeed(prev => {
        const newEvent: SupportEvent = {
          id: `EV-NEW-${Date.now()}`,
          title: "New ticket SUP-2042 created",
          time: "Just now",
          type: "ticket"
        };
        return [newEvent, ...prev].slice(0, 8);
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'ticket': return <Ticket className="h-3 w-3 text-blue-500" />;
      case 'escalation': return <AlertTriangle className="h-3 w-3 text-destructive" />;
      case 'resolution': return <CheckCircle2 className="h-3 w-3 text-emerald-500" />;
      case 'satisfaction': return <Star className="h-3 w-3 text-amber-500 fill-amber-500" />;
      case 'refund': return <ShieldAlert className="h-3 w-3 text-orange-500" />;
      default: return <Activity className="h-3 w-3 text-primary" />;
    }
  };

  const getEventBg = (type: string) => {
    switch (type) {
      case 'ticket': return "bg-blue-500/10 border-blue-500/20";
      case 'escalation': return "bg-destructive/10 border-destructive/20";
      case 'resolution': return "bg-emerald-500/10 border-emerald-500/20";
      case 'satisfaction': return "bg-amber-500/10 border-amber-500/20";
      case 'refund': return "bg-orange-500/10 border-orange-500/20";
      default: return "bg-primary/10 border-primary/20";
    }
  };

  return (
    <Card className="glass h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-500 animate-pulse" /> Support Feed
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

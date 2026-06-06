"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CreditCard, Truck, CheckCircle2, XCircle, LucideIcon } from "lucide-react";

interface ActivityFeedItem {
  id: number;
  type: string;
  text: string;
  time: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export function CustomerActivityFeed() {
  const [feed, setFeed] = useState<ActivityFeedItem[]>([
    { id: 1, type: "payment", text: "Payment received for ORD-9421", time: "Just now", icon: CreditCard, color: "text-success", bg: "bg-success/10" },
    { id: 2, type: "dispatch", text: "ORD-9422 assigned to Marc O.", time: "2 mins ago", icon: Truck, color: "text-accent", bg: "bg-accent/10" },
    { id: 3, type: "delivery", text: "ORD-9420 successfully delivered", time: "5 mins ago", icon: CheckCircle2, color: "text-primary", bg: "bg-primary/10" },
    { id: 4, type: "refund", text: "Refund requested for ORD-9415", time: "12 mins ago", icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent = {
        id: Date.now(),
        type: "order",
        text: `New order ORD-${Math.floor(Math.random() * 9000) + 1000} placed in Buea.`,
        time: "Just now",
        icon: Bell,
        color: "text-warning",
        bg: "bg-warning/10"
      };
      setFeed(prev => [newEvent, ...prev].slice(0, 8));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-base font-bold flex items-center gap-2">
          <Bell className="h-4 w-4 text-muted-foreground" /> Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <AnimatePresence>
          {feed.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3"
            >
              <div className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center ${item.bg} ${item.color}`}>
                <item.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">{item.text}</p>
                <p className="text-[10px] text-muted-foreground">{item.time}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

"use client";

import { Navigation, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ActiveDelivery } from "../types";

interface DispatchLiveTrackerProps {
  deliveries: ActiveDelivery[];
}

export function DispatchLiveTracker({ deliveries }: DispatchLiveTrackerProps) {
  return (
    <Card className="lg:col-span-7 glass">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Navigation className="h-5 w-5 text-accent animate-pulse" /> Live Delivery Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {deliveries.map((d) => (
          <div
            key={d.id}
            className="p-4 rounded-xl border border-border/40 bg-muted/20 glass space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-bold text-foreground">{d.customer}</h4>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3" /> {d.location}
                </p>
              </div>
              <div className="text-right">
                <Badge
                  className={
                    d.risk === "High"
                      ? "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/10"
                      : d.risk === "Medium"
                      ? "bg-warning/10 text-warning border border-warning/20 hover:bg-warning/10"
                      : "bg-success/10 text-success border border-success/20 hover:bg-success/10"
                  }
                >
                  {d.risk} Risk
                </Badge>
                <p className="text-[10px] text-muted-foreground mt-1">
                  ETA: <strong className="text-foreground">{d.etaRemaining} mins</strong>
                </p>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
                <span>Rider: {d.rider}</span>
                <span>{d.progressPct}% Complete</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${d.progressPct}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    d.risk === "High"
                      ? "bg-destructive"
                      : d.risk === "Medium"
                      ? "bg-warning"
                      : "bg-success"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

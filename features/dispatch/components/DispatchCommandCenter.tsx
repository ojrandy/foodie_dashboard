import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatchOperations } from "../hooks/useDispatchOperations";
import { Users, UserCheck, Clock, CheckCircle2, AlertTriangle, Activity, TrendingUp, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Metric { label: string; value: string | number; icon: React.ElementType; color: string; bg: string; trend: string; insight: string; }

export function DispatchCommandCenter() {
  const { kpis } = useDispatchOperations();
  const [activeMetric, setActiveMetric] = React.useState<Metric | null>(null);

  const metrics = [
    { label: "Active Riders", value: kpis.activeRiders, icon: Users, color: "text-primary", bg: "bg-primary/10", trend: "+2", insight: "2 new riders came online in the last hour." },
    { label: "Available", value: kpis.availableRiders, icon: UserCheck, color: "text-success", bg: "bg-success/10", trend: "+5", insight: "Adequate fleet availability for current order volume." },
    { label: "Waiting Assignment", value: kpis.waitingAssignment, icon: Clock, color: "text-warning", bg: "bg-warning/10", trend: "-10%", insight: "Dispatch efficiency is high. AI auto-assignment is handling 80% of volume." },
    { label: "In Transit", value: kpis.inTransit, icon: TrendingUp, color: "text-sky-500", bg: "bg-sky-500/10", trend: "+5%", insight: "Smooth traffic reported in major zones." },
    { label: "Completed", value: kpis.completedDeliveries, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", trend: "+12%", insight: "Target delivery volume exceeded by 12%." },
    { label: "Delayed", value: kpis.delayedDeliveries, icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", trend: "-2", insight: "Delays caused by heavy rain in Molyko." },
    { label: "Avg Time", value: kpis.avgDeliveryTime, icon: Activity, color: "text-muted-foreground", bg: "bg-muted", trend: "-2 mins", insight: "Average delivery time dropped by 2 minutes." },
    { label: "Satisfaction", value: kpis.satisfactionScore, icon: Star, color: "text-yellow-500", bg: "bg-yellow-500/10", trend: "+0.1", insight: "Customer ratings remain strong." },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <Card 
            key={i} 
            onClick={() => setActiveMetric(m)}
            className="glass hover:bg-muted/5 transition-colors cursor-pointer group hover:scale-[1.02] active:scale-95 duration-200"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${m.bg} ${m.color}`}>
                  <m.icon className="h-4 w-4" />
                </div>
                <span className={`text-[10px] font-bold ${m.trend.includes('-') && m.label !== "Avg Time" && m.label !== "Waiting Assignment" ? 'text-destructive' : 'text-success'}`}>
                  {m.trend}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">{m.label}</p>
                <p className="text-2xl font-black text-foreground mt-0.5">{m.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AnimatePresence>
        {activeMetric && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setActiveMetric(null)}
          >
            <div 
              className="bg-card border border-border/40 rounded-2xl shadow-2xl p-6 glass max-w-sm w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="font-bold text-lg">{activeMetric.label} Insight</h3>
              <p className="text-sm text-muted-foreground mt-2">{activeMetric.insight}</p>
              <Button className="w-full mt-6" onClick={() => setActiveMetric(null)}>Close</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

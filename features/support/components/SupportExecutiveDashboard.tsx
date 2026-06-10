import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSupportIntelligence } from "../hooks/useSupportIntelligence";
import { Ticket, CheckCircle2, Clock, AlertTriangle, MessageSquare, ShieldAlert, Users, Zap, TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export function SupportExecutiveDashboard() {
  const { kpis } = useSupportIntelligence();

  const metrics = [
    { label: "Open Tickets", value: kpis.openTickets, icon: Ticket, color: "text-blue-500", bg: "bg-blue-500/10", trend: "+5 today", trendUp: true },
    { label: "Resolved", value: kpis.resolvedTickets, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", trend: "+24 today", trendUp: true },
    { label: "Avg Resolution Time", value: kpis.avgResolutionTime, icon: Clock, color: "text-indigo-500", bg: "bg-indigo-500/10", trend: "-5m this week", trendUp: false }, // down is good
    { label: "Satisfaction Score", value: `${kpis.csatScore}%`, icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10", trend: "+2% this month", trendUp: true },
    { label: "Pending", value: kpis.pendingTickets, icon: MessageSquare, color: "text-violet-500", bg: "bg-violet-500/10", trend: "Awaiting reply", trendUp: null },
    { label: "Escalated", value: kpis.escalatedTickets, icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", trend: "Requires attention", trendUp: true },
    { label: "Refund Requests", value: kpis.refundRequests, icon: ShieldAlert, color: "text-orange-500", bg: "bg-orange-500/10", trend: "-12% this month", trendUp: false },
    { label: "Agent Workload", value: kpis.agentWorkload, icon: Users, color: "text-pink-500", bg: "bg-pink-500/10", trend: "High capacity", trendUp: true },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="col-span-2"
        >
          <Card className="glass relative overflow-hidden group hover:border-primary/50 transition-colors h-full">
            <div className={`absolute top-0 right-0 p-4 opacity-5 ${m.color}`}>
              <m.icon className="h-16 w-16 -mr-4 -mt-4 transform group-hover:scale-110 transition-transform" />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg ${m.bg}`}>
                  <m.icon className={`h-4 w-4 ${m.color}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">{m.label}</p>
              <h3 className="text-xl lg:text-2xl font-black text-foreground mb-1 whitespace-nowrap">{m.value}</h3>
              <div className="flex items-center gap-1">
                {m.trendUp === true ? (
                  <TrendingUp className="h-3 w-3 text-warning" />
                ) : m.trendUp === false ? (
                  <TrendingDown className="h-3 w-3 text-success" />
                ) : (
                  <Clock className="h-3 w-3 text-muted-foreground" />
                )}
                <span className="text-[9px] text-muted-foreground whitespace-nowrap">{m.trend}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

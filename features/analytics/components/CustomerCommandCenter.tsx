import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCustomerIntelligence } from "../hooks/useCustomerIntelligence";
import { Users, UserCheck, UserPlus, HeartHandshake, Banknote, Star, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

export function CustomerCommandCenter() {
  const { kpis } = useCustomerIntelligence();

  const metrics = [
    { label: "Total Customers", value: kpis.totalCustomers.toLocaleString(), icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", trend: "+12.5% this month", trendUp: true },
    { label: "Active Customers", value: kpis.activeCustomers.toLocaleString(), icon: UserCheck, color: "text-emerald-500", bg: "bg-emerald-500/10", trend: "Stable", trendUp: true },
    { label: "New Signups", value: kpis.newSignups.toLocaleString(), icon: UserPlus, color: "text-violet-500", bg: "bg-violet-500/10", trend: "+45 this week", trendUp: true },
    { label: "Retention Rate", value: `${kpis.retentionRate}%`, icon: HeartHandshake, color: "text-pink-500", bg: "bg-pink-500/10", trend: "-2% from last month", trendUp: false },
    { label: "Avg Order Value", value: `${kpis.avgOrderValue.toLocaleString()} F`, icon: Banknote, color: "text-amber-500", bg: "bg-amber-500/10", trend: "+150 F", trendUp: true },
    { label: "Lifetime Value (LTV)", value: `${kpis.customerLTV.toLocaleString()} F`, icon: Star, color: "text-indigo-500", bg: "bg-indigo-500/10", trend: "+8% yoy", trendUp: true },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
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
                {m.trendUp ? (
                  <TrendingUp className="h-3 w-3 text-success" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive" />
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

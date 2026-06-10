import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useFinanceIntelligence } from "../hooks/useFinanceIntelligence";
import { Wallet, TrendingUp, TrendingDown, DollarSign, Activity, CreditCard, Bike, ShieldAlert, BarChart3, Clock } from "lucide-react";
import { motion } from "framer-motion";

export function FinanceExecutiveDashboard() {
  const { kpis } = useFinanceIntelligence();

  const metrics = [
    { label: "Total Revenue", value: `${(kpis.totalRevenue / 1000000).toFixed(1)}M F`, icon: Wallet, color: "text-blue-500", bg: "bg-blue-500/10", trend: "+12% yoy", trendUp: true },
    { label: "Net Revenue", value: `${(kpis.netRevenue / 1000000).toFixed(1)}M F`, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10", trend: "+8.5% yoy", trendUp: true },
    { label: "Today's Revenue", value: `${kpis.todayRevenue.toLocaleString()} F`, icon: Activity, color: "text-indigo-500", bg: "bg-indigo-500/10", trend: "+4% from yesterday", trendUp: true },
    { label: "Profit Margin", value: `${kpis.profitMargin}%`, icon: BarChart3, color: "text-violet-500", bg: "bg-violet-500/10", trend: "Stable", trendUp: true },
    { label: "Transactions", value: kpis.totalTransactions.toLocaleString(), icon: CreditCard, color: "text-amber-500", bg: "bg-amber-500/10", trend: "+450 this week", trendUp: true },
    { label: "Refunds", value: `${kpis.refundAmount.toLocaleString()} F`, icon: ShieldAlert, color: "text-destructive", bg: "bg-destructive/10", trend: "-2% this month", trendUp: false },
    { label: "Rider Payouts", value: `${(kpis.riderPayouts / 1000000).toFixed(1)}M F`, icon: Bike, color: "text-pink-500", bg: "bg-pink-500/10", trend: "+15% this month", trendUp: true },
    { label: "Outstanding", value: `${kpis.outstandingPayments.toLocaleString()} F`, icon: Clock, color: "text-warning", bg: "bg-warning/10", trend: "Pending payouts", trendUp: null },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={i < 4 ? "col-span-2" : "col-span-2"}
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
                  <TrendingUp className="h-3 w-3 text-success" />
                ) : m.trendUp === false ? (
                  <TrendingDown className="h-3 w-3 text-success" /> // down refunds is good
                ) : (
                  <Activity className="h-3 w-3 text-warning" />
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

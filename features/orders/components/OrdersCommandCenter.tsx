"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useOrdersOperations } from "../hooks/useOrdersOperations";
import { 
  ShoppingBag, Clock, CheckCircle2, ChefHat, 
  Truck, XCircle, TrendingUp, Activity, X, Info, LucideIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Metric {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bg: string;
  trend: string;
  insight: string;
}

export function OrdersCommandCenter() {
  const { kpis, orders } = useOrdersOperations();
  const [activeMetric, setActiveMetric] = React.useState<Metric | null>(null);
  const [page, setPage] = React.useState(1);

  // Filter orders based on active metric
  const filteredOrders = React.useMemo(() => {
    if (!activeMetric) return [];
    
    let baseOrders = [];
    if (activeMetric.label === "Total Orders") {
      baseOrders = orders;
    } else if (["Pending", "Preparing", "In Transit", "Delivered", "Cancelled"].includes(activeMetric.label)) {
      const statusMatch = activeMetric.label === "In Transit" ? "Transit" : activeMetric.label;
      baseOrders = orders.filter(o => o.status === statusMatch);
    } else {
      baseOrders = orders;
    }

    if (baseOrders.length === 0) baseOrders = orders;

    const targetSize = typeof activeMetric.value === 'number' ? activeMetric.value : baseOrders.length;
    
    const expanded = [];
    for (let i = 0; i < targetSize; i++) {
      const base = baseOrders[i % baseOrders.length];
      expanded.push({
        ...base,
        id: i < baseOrders.length ? base.id : `ORD-${9500 + i}`,
      });
    }

    return expanded;
  }, [activeMetric, orders]);

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE) || 1;
  const paginatedOrders = filteredOrders.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const metrics = [
    { label: "Total Orders", value: kpis.totalToday, icon: ShoppingBag, color: "text-primary", bg: "bg-primary/10", trend: "+12%", insight: "Order volume is pacing 12% higher than yesterday. Mobile App conversions are driving the majority of this traffic." },
    { label: "Pending", value: kpis.pending, icon: Clock, color: "text-warning", bg: "bg-warning/10", trend: "+2%", insight: "13 orders are awaiting system confirmation. No major bottlenecks detected; normal processing time." },
    { label: "Preparing", value: kpis.preparing, icon: ChefHat, color: "text-accent", bg: "bg-accent/10", trend: "0%", insight: "Kitchen capacity is at 75%. Orders are being prepared efficiently without delay." },
    { label: "In Transit", value: kpis.transit, icon: Truck, color: "text-sky-500", bg: "bg-sky-500/10", trend: "+5%", insight: "35 orders currently active in the delivery network. Minor traffic in Bonamoussadi is being bypassed." },
    { label: "Delivered", value: kpis.delivered, icon: CheckCircle2, color: "text-success", bg: "bg-success/10", trend: "+15%", insight: "90 successful deliveries today. Delivery SLAs are being met with a 98% success rate." },
    { label: "Cancelled", value: kpis.cancelled, icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", trend: "-1%", insight: "Only 4 cancellations. Most were due to user-requested address modifications post-dispatch." },
    { label: "Avg ETA", value: kpis.avgDeliveryTime, icon: Activity, color: "text-muted-foreground", bg: "bg-muted", trend: "-5 mins", insight: "Average ETA has improved by 5 minutes due to the new AI Route Optimization rollout." },
    { label: "Avg Order Value", value: kpis.avgOrderValue, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10", trend: "+3%", insight: "Average order value is up by 3%. Users are increasingly bundling Family Meal plans." },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" /> Command Center
          </h2>
          <p className="text-xs text-muted-foreground">High-level executive overview of today&apos;s operations.</p>
        </div>
        <div className="bg-success/10 border border-success/20 rounded-lg px-4 py-2 text-center">
          <p className="text-[10px] uppercase font-bold text-success">Total Revenue Today</p>
          <p className="text-xl font-black text-success flex items-center gap-1 justify-center">
            <span className="font-extrabold text-lg mr-0.5">F</span> {kpis.revenue}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <Card 
            key={i} 
            onClick={() => {
              setActiveMetric(m);
              setPage(1);
            }}
            className="glass hover:bg-muted/5 transition-colors cursor-pointer group hover:scale-[1.02] active:scale-95 duration-200"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${m.bg} ${m.color}`}>
                  <m.icon className="h-4 w-4" />
                </div>
                <span className={`text-[10px] font-bold ${m.trend.includes('-') && m.label !== "Avg ETA" ? 'text-destructive' : 'text-success'}`}>
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
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveMetric(null)}
              className="fixed inset-0 bg-black z-[900]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[75vw] max-w-5xl max-h-[85vh] flex flex-col bg-card border border-border/40 rounded-2xl shadow-2xl z-[950] p-6 glass"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${activeMetric.bg} ${activeMetric.color}`}>
                    <activeMetric.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{activeMetric.label} Details</h3>
                    <p className={`text-xs font-bold ${activeMetric.trend.includes('-') && activeMetric.label !== "Avg ETA" ? 'text-destructive' : 'text-success'}`}>
                      {activeMetric.trend} vs yesterday
                    </p>
                  </div>
                </div>
                <Button size="icon" variant="ghost" onClick={() => setActiveMetric(null)} className="-mt-2 -mr-2">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="bg-muted/30 p-3 rounded-xl border border-border/40 mb-4">
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Info className="h-4 w-4" />
                  <span className="text-[10px] uppercase font-bold tracking-wider">AI Insight</span>
                </div>
                <p className="text-xs text-foreground leading-relaxed">
                  {activeMetric.insight}
                </p>
              </div>

              {/* Data Table */}
              <div className="border border-border/40 rounded-xl overflow-hidden bg-card flex-1 flex flex-col min-h-[300px]">
                <div className="flex-1 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-muted/30 text-[9px] uppercase font-bold text-muted-foreground sticky top-0 backdrop-blur z-10">
                      <tr>
                        <th className="px-3 py-2">Order ID</th>
                        <th className="px-3 py-2">Customer</th>
                        <th className="px-3 py-2">Cost (XAF)</th>
                        <th className="px-3 py-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                      {paginatedOrders.length > 0 ? (
                        paginatedOrders.map(o => (
                          <tr key={o.id} className="hover:bg-muted/10">
                            <td className="px-3 py-2 font-bold text-primary">{o.id}</td>
                            <td className="px-3 py-2">{o.customerName}</td>
                            <td className="px-3 py-2 font-black">{o.totalCost.toLocaleString()}</td>
                            <td className="px-3 py-2 text-right">
                              <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                                o.status === "Pending" ? "bg-warning/10 text-warning" :
                                o.status === "Delivered" ? "bg-success/10 text-success" :
                                "bg-accent/10 text-accent"
                              }`}>
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-3 py-4 text-center text-muted-foreground italic">No related orders found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between p-2 border-t border-border/40 bg-muted/10">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="h-6 text-[10px]"
                    >
                      Prev
                    </Button>
                    <span className="text-[10px] font-bold text-muted-foreground">
                      Page {page} of {totalPages}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="h-6 text-[10px]"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <Button className="w-full" onClick={() => setActiveMetric(null)}>Acknowledge</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

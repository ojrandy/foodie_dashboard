"use client";

import { motion, Variants } from "framer-motion";
import { Sparkles, TrendingUp, AlertTriangle, ArrowRight, DollarSign, ChefHat } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

interface Insight {
  id: string;
  type: "market" | "logistics" | "price" | "trend";
  title: string;
  description: string;
  severity: "success" | "warning" | "primary";
  actionText?: string;
  metric?: string;
}

const INSIGHTS: Insight[] = [
  {
    id: "in-1",
    type: "market",
    title: "Market Price Alert: Tomato Inflation",
    description: "Tomato prices increased by 14% today in local markets. Recommend adjusting raw material pricing index.",
    severity: "warning",
    metric: "+14.2% price index",
    actionText: "Update Raw Costs",
  },
  {
    id: "in-2",
    type: "trend",
    title: "Demand Spike: Egusi Soup in Buea",
    description: "Active demand for Egusi meal plans in Buea has doubled over the past 3 hours. Optimal window for premium features promotion.",
    severity: "success",
    metric: "2.1x active orders spike",
    actionText: "Promote Campaign",
  },
  {
    id: "in-3",
    type: "logistics",
    title: "Delivery Delay Threat: Molyko Route",
    description: "Congestion predicted around Molyko commercial center due to street traffic. Recommendation: Re-route active couriers to peripheral zones.",
    severity: "warning",
    metric: "+12m expected delay",
    actionText: "Reroute Dispatch",
  },
  {
    id: "in-4",
    type: "price",
    title: "Cheapest Meal Plan Opportunity",
    description: "Local ingredient surplus enables a high-margin student budget meal plan optimization. Potential yield: +8.4% gross margin.",
    severity: "primary",
    metric: "+8.4% yield gain",
    actionText: "Launch Menu Item",
  },
];

export interface AIInsightsProps {
  insights?: Insight[];
}

export function AIInsights({ insights = INSIGHTS }: AIInsightsProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm tracking-wide">Operational AI Insights</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Real-time predictive analytics and cost optimizations.</p>
          </div>
        </div>
        <span className="text-[10px] font-bold tracking-wider text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase flex items-center gap-1.5 animate-pulse">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Engine Active
        </span>
      </div>

      {/* Insights Stream */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-4"
      >
        {insights.map((insight) => (
          <motion.div
            key={insight.id}
            variants={itemVariants}
            whileHover={{ x: 3 }}
            className={cn(
              "p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-muted/15",
              insight.severity === "warning" ? "border-rose-500/15 bg-rose-500/[0.01]" :
              insight.severity === "success" ? "border-emerald-500/15 bg-emerald-500/[0.01]" :
              "border-border/50 bg-muted/5"
            )}
          >
            <div className="flex gap-3">
              {/* Left Indicator Icon */}
              <div className={cn(
                "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                insight.severity === "warning" ? "bg-rose-500/10 text-rose-500" :
                insight.severity === "success" ? "bg-emerald-500/10 text-emerald-500" :
                "bg-primary/10 text-primary"
              )}>
                {insight.type === "market" && <DollarSign className="h-4 w-4" />}
                {insight.type === "trend" && <TrendingUp className="h-4 w-4" />}
                {insight.type === "logistics" && <AlertTriangle className="h-4 w-4" />}
                {insight.type === "price" && <ChefHat className="h-4 w-4" />}
              </div>
              
              {/* Core Content */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm text-foreground">{insight.title}</span>
                  {insight.metric && (
                    <span className={cn(
                      "text-[10px] font-medium px-2 py-0.5 rounded-full border",
                      insight.severity === "warning" ? "bg-rose-500/10 border-rose-500/20 text-rose-500" :
                      insight.severity === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
                      "bg-primary/5 border-border text-foreground"
                    )}>
                      {insight.metric}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">{insight.description}</p>
              </div>
            </div>

            {/* Action Trigger Button */}
            {insight.actionText && (
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "self-start md:self-center shrink-0 gap-1.5 text-xs font-semibold h-8 rounded-lg border-border/80 hover:bg-foreground hover:text-background transition-colors",
                  insight.severity === "warning" ? "hover:border-rose-500" :
                  insight.severity === "success" ? "hover:border-emerald-500" :
                  ""
                )}
              >
                {insight.actionText}
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

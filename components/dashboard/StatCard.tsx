"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface SubMetric {
  label: string;
  value: string | number;
  trend?: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  subMetrics?: SubMetric[];
  progress?: number;
  accentType?: "success" | "warning" | "primary";
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
  subMetrics,
  progress,
  accentType = "primary",
  className,
}: StatCardProps) {

  const accentColors = {
    primary: {
      text: "text-foreground",
      iconBg: "bg-primary/10",
      iconText: "text-card-foreground",
      border: "border-border/40",
      glow: "bg-glow-1",
      progressBg: "bg-primary/20",
      progressBar: "bg-primary",
    },
    success: {
      text: "text-success",
      iconBg: "bg-success/10",
      iconText: "text-success",
      border: "border-success/20",
      glow: "bg-success/5",
      progressBg: "bg-success/10",
      progressBar: "bg-success",
    },
    warning: {
      text: "text-destructive",
      iconBg: "bg-destructive/10",
      iconText: "text-destructive",
      border: "border-destructive/20",
      glow: "bg-destructive/5",
      progressBg: "bg-destructive/10",
      progressBar: "bg-destructive",
    },
  };

  const selectedAccent = accentColors[accentType];

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm glass transition-all duration-300 hover:shadow-md p-6",
        selectedAccent.border,
        className
      )}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">{title}</span>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:rotate-12", selectedAccent.iconBg)}>
          <Icon className={cn("h-5 w-5", selectedAccent.iconText)} />
        </div>
      </div>

      {/* Main KPI Value */}
      <div className="mt-4">
        <div className="text-3xl font-extrabold tracking-tight text-foreground">{value}</div>

        {/* Primary Trend */}
        {trend !== undefined && (
          <div className="mt-1 flex items-center gap-1.5 text-xs">
            <span
              className={cn(
                "font-semibold rounded px-1.5 py-0.5",
                trend > 0
                  ? "bg-success/10 text-success"
                  : trend < 0
                    ? "bg-destructive/10 text-destructive"
                    : "bg-muted text-muted-foreground"
              )}
            >
              {trend > 0 ? "↑ +" : trend < 0 ? "↓ " : ""}{trend}%
            </span>
            <span className="text-muted-foreground">{trendLabel || "vs last month"}</span>
          </div>
        )}
      </div>

      {/* Premium Progress Bar */}
      {progress !== undefined && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
            <span>Progress Index</span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <div className={cn("h-1 w-full rounded-full overflow-hidden", selectedAccent.progressBg)}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={cn("h-full rounded-full", selectedAccent.progressBar)}
            />
          </div>
        </div>
      )}

      {/* Sub-KPI grid helper if present */}
      {subMetrics && subMetrics.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border/40 grid grid-cols-2 gap-4">
          {subMetrics.map((sm, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-[9px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">{sm.label}</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-sm font-bold text-foreground">{sm.value}</span>
                {sm.trend !== undefined && (
                  <span className={cn(
                    "text-[9px] font-semibold",
                    sm.trend > 0 ? "text-success" : "text-destructive"
                  )}>
                    {sm.trend > 0 ? "+" : ""}{sm.trend}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subtle corner premium ambient glow accent */}
      <div className={cn("absolute -bottom-6 -right-6 h-24 w-24 rounded-full blur-2xl pointer-events-none opacity-40", selectedAccent.glow)} />
    </motion.div>
  );
}

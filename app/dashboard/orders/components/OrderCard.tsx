"use client";

import { Clock, CheckCircle, Sparkles, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { OrderStats } from "../types";

interface OrderCardProps {
  stats: OrderStats;
}

export function OrderCard({ stats }: OrderCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="glass">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">Active Deliveries</span>
            <div className="text-2xl font-extrabold mt-1 text-foreground">{stats.active} Orders</div>
          </div>
          <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
            <Clock className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
      <Card className="glass">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">Completed Today</span>
            <div className="text-2xl font-extrabold mt-1 text-foreground">{stats.completed} Orders</div>
          </div>
          <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center text-success">
            <CheckCircle className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
      <Card className="glass">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">Transactional Volume</span>
            <div className="text-2xl font-extrabold mt-1 text-foreground">{stats.totalRev.toLocaleString()} XAF</div>
          </div>
          <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <Sparkles className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
      <Card className="glass border-warning/20 bg-warning/5">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.08em] text-warning uppercase">AI Logistics Warnings</span>
            <div className="text-2xl font-extrabold mt-1 text-warning">{stats.highRisk} High Risk</div>
          </div>
          <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center text-warning">
            <AlertTriangle className="h-5 w-5 animate-bounce" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

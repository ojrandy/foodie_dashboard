"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { RevenueSummary } from "../types";

interface FinanceCardProps {
  summary: RevenueSummary;
}

export function FinanceCard({ summary }: FinanceCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="glass">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">Total Revenue</span>
            <div className="text-2xl font-extrabold mt-1 text-foreground">
              {summary.totalRevenue.toLocaleString()} XAF
            </div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-xs font-bold text-success">+{summary.revenueChange}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="glass">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">Total Expenses</span>
            <div className="text-2xl font-extrabold mt-1 text-foreground">
              {summary.totalExpenses.toLocaleString()} XAF
            </div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-success" />
              <span className="text-xs font-bold text-success">{summary.expenseChange}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="glass border-accent/20 bg-accent/5">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.08em] text-accent uppercase">Net Profit</span>
            <div className="text-2xl font-extrabold mt-1 text-accent">
              {summary.netProfit.toLocaleString()} XAF
            </div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-accent" />
              <span className="text-xs font-bold text-accent">+{summary.profitChange}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { BarChart2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import type { HistoricalTrend } from "../types";

interface PricingVolatilityChartProps {
  data: HistoricalTrend[];
  mounted: boolean;
}

export function PricingVolatilityChart({ data, mounted }: PricingVolatilityChartProps) {
  return (
    <Card className="lg:col-span-8 glass">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-accent" /> Commodity Price Volatility Map
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="h-[300px] w-full">
          {!mounted ? (
            <div className="h-full w-full animate-pulse rounded bg-muted/20" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTomatoes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOils" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#888" fontSize={11} tickLine={false} />
                <YAxis stroke="#888" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "0.75rem",
                    color: "var(--foreground)",
                  }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Area
                  name="Tomatoes (Large Basket)"
                  type="monotone"
                  dataKey="Tomatoes"
                  stroke="var(--primary)"
                  fillOpacity={1}
                  fill="url(#colorTomatoes)"
                  strokeWidth={2.5}
                />
                <Area
                  name="Palm Oil (20L)"
                  type="monotone"
                  dataKey="PalmOil"
                  stroke="#0ea5e9"
                  fillOpacity={1}
                  fill="url(#colorOils)"
                  strokeWidth={2.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

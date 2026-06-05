"use client";

import { Route } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import type { ZonePerformance } from "../types";

interface DispatchZoneChartProps {
  data: ZonePerformance[];
  mounted: boolean;
}

export function DispatchZoneChart({ data, mounted }: DispatchZoneChartProps) {
  if (!mounted) {
    return (
      <Card className="lg:col-span-5 glass">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Route className="h-5 w-5 text-accent" /> Zone Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[260px] animate-pulse rounded bg-muted/20" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-5 glass">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Route className="h-5 w-5 text-accent" /> Zone Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" stroke="#888" fontSize={10} tickLine={false} />
              <YAxis type="category" dataKey="zone" stroke="#888" fontSize={10} tickLine={false} width={65} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                  borderRadius: "0.75rem",
                  color: "var(--foreground)",
                  fontSize: "11px",
                }}
              />
              <Bar dataKey="deliveries" fill="var(--primary)" radius={[0, 6, 6, 0]} name="Deliveries" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

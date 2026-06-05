"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import type { AnalyticsDataPoint } from "../types";

interface AnalyticsTrendChartProps {
  data: AnalyticsDataPoint[];
}

export function AnalyticsTrendChart({ data }: AnalyticsTrendChartProps) {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Revenue & Orders Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
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
              <Bar
                dataKey="revenue"
                fill="var(--primary)"
                radius={[4, 4, 0, 0]}
                name="Revenue (XAF)"
              />
              <Bar
                dataKey="orders"
                fill="#0ea5e9"
                radius={[4, 4, 0, 0]}
                name="Orders"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

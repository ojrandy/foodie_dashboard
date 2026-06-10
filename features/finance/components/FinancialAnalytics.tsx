import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Wallet, PieChart as PieChartIcon } from "lucide-react";

const DISTRIBUTION_DATA = [
  { name: "Order Fulfillment", value: 45, color: "#ef4444" },
  { name: "Rider Payouts", value: 35, color: "#f59e0b" },
  { name: "Platform Infra", value: 12, color: "#3b82f6" },
  { name: "Marketing", value: 8, color: "#8b5cf6" },
];

export function FinancialAnalytics() {
  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <PieChartIcon className="h-5 w-5 text-amber-500" /> Capital Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="h-[200px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DISTRIBUTION_DATA}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {DISTRIBUTION_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "0.75rem", fontSize: "11px" }}
                itemStyle={{ color: "var(--foreground)" }}
                formatter={(value) => [`${value}%`, 'Allocation']}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: "10px", fontWeight: "bold" }} />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-20px]">
            <Wallet className="h-6 w-6 text-muted-foreground opacity-50" />
          </div>
        </div>

        <div className="p-3 bg-muted/10 border border-border/40 rounded-xl text-xs text-muted-foreground leading-relaxed">
          <span className="font-bold text-foreground">Insight:</span> Rider payouts currently consume 35% of revenue. Consider optimizing batch deliveries to improve margins.
        </div>

      </CardContent>
    </Card>
  );
}

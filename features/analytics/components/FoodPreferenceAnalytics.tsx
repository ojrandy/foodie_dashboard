import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Utensils, TrendingUp } from "lucide-react";

const DATA = [
  { name: "Egusi Soup", value: 35, color: "#f59e0b" },
  { name: "Ndole", value: 25, color: "#10b981" },
  { name: "Jollof Rice", value: 20, color: "#ef4444" },
  { name: "Eru", value: 10, color: "#8b5cf6" },
  { name: "Achu", value: 10, color: "#3b82f6" },
];

export function FoodPreferenceAnalytics() {
  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Utensils className="h-5 w-5 text-orange-500" /> Food Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="h-[200px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DATA}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "0.75rem", fontSize: "11px" }}
                itemStyle={{ color: "var(--foreground)" }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black text-foreground">Top 5</span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Meals</span>
          </div>
        </div>

        <div className="space-y-2">
          {DATA.map((item, i) => (
            <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-muted/10 border border-border/40">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-bold text-foreground">{item.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold">{item.value}%</span>
                {i < 3 && <TrendingUp className="h-3 w-3 text-success" />}
              </div>
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}

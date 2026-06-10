import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { HeartHandshake } from "lucide-react";

const RETENTION_DATA = [
  { month: "M0", cohort: 100 },
  { month: "M1", cohort: 65 },
  { month: "M2", cohort: 45 },
  { month: "M3", cohort: 38 },
  { month: "M4", cohort: 32 },
  { month: "M5", cohort: 28 },
  { month: "M6", cohort: 25 },
];

export function RetentionAnalytics() {
  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <HeartHandshake className="h-5 w-5 text-pink-500" /> Retention Curve
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-muted/10 rounded-xl border border-border/40">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">M1 Retention</p>
            <p className="text-2xl font-black text-foreground">65%</p>
          </div>
          <div className="p-3 bg-muted/10 rounded-xl border border-border/40">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Churn Risk</p>
            <p className="text-2xl font-black text-warning">12%</p>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-4">
            Cohort Survival Analysis
          </h4>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={RETENTION_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "0.75rem", fontSize: "11px" }}
                  formatter={(value) => [`${value}% retained`, 'Cohort']}
                />
                <Line 
                  type="monotone" 
                  dataKey="cohort" 
                  stroke="#ec4899" 
                  strokeWidth={3} 
                  dot={{ r: 4, strokeWidth: 2, fill: "var(--background)" }} 
                  activeDot={{ r: 6, fill: "#ec4899", strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
import { BarChart3 } from "lucide-react";

const GROWTH_DATA = [
  { month: "Jan", stable: 45, volatile: 12 },
  { month: "Feb", stable: 48, volatile: 15 },
  { month: "Mar", stable: 52, volatile: 10 },
  { month: "Apr", stable: 60, volatile: 8 },
  { month: "May", stable: 58, volatile: 18 },
  { month: "Jun", stable: 65, volatile: 14 },
];

export function InventoryAnalytics() {
  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" /> Executive Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div>
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
            Supply Volatility Trend (6 Months)
          </h4>
          <div className="h-[150px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={GROWTH_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "0.75rem", fontSize: "11px" }}
                />
                <Line type="monotone" dataKey="stable" stroke="var(--primary)" strokeWidth={2} dot={{ r: 3 }} name="Stable Supply" />
                <Line type="monotone" dataKey="volatile" stroke="var(--destructive)" strokeWidth={2} dot={{ r: 3 }} name="Volatile Supply" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
            Regional Stock Intake
          </h4>
          <div className="h-[120px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={GROWTH_DATA.slice(-4)}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "0.75rem", fontSize: "11px" }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="stable" fill="#10b981" radius={[4, 4, 0, 0]} name="Successful Procurement" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

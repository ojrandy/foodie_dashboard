import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const PROFIT_DATA = [
  { month: "Jan", Revenue: 24, Expenses: 18, Profit: 6 },
  { month: "Feb", Revenue: 32, Expenses: 22, Profit: 10 },
  { month: "Mar", Revenue: 28, Expenses: 20, Profit: 8 },
  { month: "Apr", Revenue: 38, Expenses: 25, Profit: 13 },
  { month: "May", Revenue: 41, Expenses: 28, Profit: 13 },
  { month: "Jun", Revenue: 48, Expenses: 30, Profit: 18 },
];

export function ProfitabilityIntelligence() {
  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-indigo-500" /> Profitability Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-muted/10 rounded-xl border border-border/40">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Gross Profit Margin</p>
            <p className="text-2xl font-black text-foreground">37.5%</p>
          </div>
          <div className="p-3 bg-muted/10 rounded-xl border border-border/40">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Net Profit Margin</p>
            <p className="text-2xl font-black text-emerald-500">24.5%</p>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center justify-between">
            Monthly P&L (in Millions F)
            <span className="flex items-center gap-1 text-success bg-success/10 px-2 py-0.5 rounded-full"><TrendingUp className="h-3 w-3" /> +15%</span>
          </h4>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PROFIT_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}M`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "0.75rem", fontSize: "11px" }}
                  cursor={{ fill: 'var(--muted)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "10px", fontWeight: "bold" }} />
                <Bar dataKey="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Profit" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

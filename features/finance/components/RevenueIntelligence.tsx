import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { LineChart as LineChartIcon } from "lucide-react";

const REVENUE_TRENDS = [
  { month: "Jan", food: 2400, delivery: 800, service: 400 },
  { month: "Feb", food: 3200, delivery: 950, service: 450 },
  { month: "Mar", food: 2800, delivery: 850, service: 420 },
  { month: "Apr", food: 3800, delivery: 1100, service: 550 },
  { month: "May", food: 4100, delivery: 1300, service: 600 },
  { month: "Jun", food: 4800, delivery: 1600, service: 750 },
];

export function RevenueIntelligence() {
  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <LineChartIcon className="h-5 w-5 text-emerald-500" /> Revenue Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 h-[calc(100%-4rem)] flex flex-col">
        
        <div className="grid grid-cols-3 gap-4 shrink-0">
          <div className="p-3 bg-muted/10 rounded-xl border border-border/40">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Food Orders</p>
            <p className="text-xl font-black text-blue-500">68%</p>
          </div>
          <div className="p-3 bg-muted/10 rounded-xl border border-border/40">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Delivery Fees</p>
            <p className="text-xl font-black text-emerald-500">22%</p>
          </div>
          <div className="p-3 bg-muted/10 rounded-xl border border-border/40">
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Service Fees</p>
            <p className="text-xl font-black text-violet-500">10%</p>
          </div>
        </div>

        <div className="flex-1 min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorFood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDelivery" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorService" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "0.75rem", fontSize: "12px" }}
              />
              <Area type="monotone" dataKey="food" stackId="1" stroke="#3b82f6" fill="url(#colorFood)" name="Food Revenue" />
              <Area type="monotone" dataKey="delivery" stackId="1" stroke="#10b981" fill="url(#colorDelivery)" name="Delivery Revenue" />
              <Area type="monotone" dataKey="service" stackId="1" stroke="#8b5cf6" fill="url(#colorService)" name="Service Fees" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </CardContent>
    </Card>
  );
}

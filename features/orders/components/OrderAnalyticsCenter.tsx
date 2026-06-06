"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { name: "Buea", orders: 145 },
  { name: "Douala", orders: 230 },
  { name: "Yaounde", orders: 180 },
  { name: "Bamenda", orders: 60 },
  { name: "Limbe", orders: 90 },
];

export function OrderAnalyticsCenter() {
  return (
    <Card className="glass border-border/40 h-full">
      <CardHeader>
        <CardTitle className="text-base font-bold flex items-center gap-2">
          <BarChart2 className="h-4 w-4 text-emerald-500" /> Executive Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="bg-card p-4 rounded-xl border border-border/40">
          <h4 className="text-[10px] font-bold uppercase text-muted-foreground mb-4">Orders by Region</h4>
          <div className="h-[150px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip 
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.2 }}
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "10px" }}
                  itemStyle={{ color: "hsl(var(--emerald-500))", fontWeight: "bold" }}
                />
                <Bar dataKey="orders" fill="hsl(var(--emerald-500))" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card border border-border/40 p-3 rounded-xl">
            <p className="text-[9px] uppercase font-bold text-muted-foreground">Repeat Customers</p>
            <p className="text-xl font-black text-foreground mt-1">68%</p>
          </div>
          <div className="bg-card border border-border/40 p-3 rounded-xl">
            <p className="text-[9px] uppercase font-bold text-muted-foreground">Cancellation Rate</p>
            <p className="text-xl font-black text-destructive mt-1">1.2%</p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { BarChart3, PieChart as PieChartIcon } from "lucide-react";

const PERFORMANCE_DATA = [
  { name: "Family Plan", value: 450, color: "#8b5cf6" },
  { name: "Student Plan", value: 300, color: "#0ea5e9" },
  { name: "Budget Plan", value: 200, color: "#10b981" },
  { name: "Healthy Plan", value: 150, color: "#f59e0b" }
];

const REVENUE_DATA = [
  { recipe: "Egusi & Fufu", revenue: 150000, cost: 80000 },
  { recipe: "Premium Ndole", revenue: 210000, cost: 95000 },
  { recipe: "Student Jollof", revenue: 45000, cost: 15000 },
  { recipe: "Achu Special", revenue: 110000, cost: 55000 },
  { recipe: "Eru & Waterfufu", revenue: 180000, cost: 85000 }
];

const TREND_DATA = [
  { day: "Mon", expensive: 12, cheap: 45 },
  { day: "Tue", expensive: 15, cheap: 38 },
  { day: "Wed", expensive: 18, cheap: 52 },
  { day: "Thu", expensive: 14, cheap: 60 },
  { day: "Fri", expensive: 25, cheap: 85 },
  { day: "Sat", expensive: 45, cheap: 110 },
  { day: "Sun", expensive: 35, cheap: 95 }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border/40 p-3 rounded-lg shadow-xl text-xs">
        <p className="font-bold mb-2">{label}</p>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {payload.map((entry: any, i: number) => (
          <div key={i} className="flex items-center justify-between gap-4 py-1">
            <span style={{ color: entry.color }} className="font-semibold">{entry.name}</span>
            <span className="font-black">{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function ConversionAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bar Chart - Revenue vs Cost */}
        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> Highest Revenue Recipes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" vertical={false} />
                  <XAxis dataKey="recipe" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} angle={-25} textAnchor="end" />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted)/0.3)' }} />
                  <Bar dataKey="revenue" name="Revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="cost" name="Raw Cost" fill="#cbd5e1" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart - Plan Performance */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" /> Plan Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PERFORMANCE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {PERFORMANCE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full grid grid-cols-2 gap-2 mt-4">
              {PERFORMANCE_DATA.map((entry, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[10px] font-bold">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="truncate">{entry.name} ({entry.value})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Area Chart - Order Conversion Trends */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Order Volume Trends (Cheap vs Expensive)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCheap" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" vertical={false} />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="cheap" name="Low-Cost Orders" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorCheap)" />
                <Area type="monotone" dataKey="expensive" name="Premium Orders" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorExp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

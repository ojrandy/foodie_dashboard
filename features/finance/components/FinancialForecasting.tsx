import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Target, Zap } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const FORECAST_DATA = [
  { month: "Jun", actual: 48, forecast: 48 },
  { month: "Jul", actual: null, forecast: 55 },
  { month: "Aug", actual: null, forecast: 62 },
  { month: "Sep", actual: null, forecast: 75 },
];

export function FinancialForecasting() {
  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-violet-500 animate-pulse" /> AI Forecast Engine
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-xl flex items-start gap-3">
          <Target className="h-5 w-5 text-violet-500 mt-0.5 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-foreground">Q3 Revenue Projection</h4>
            <p className="text-[10px] text-muted-foreground mt-1">Expected to grow by 35% driven by increased student engagement in South West.</p>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
            90-Day Forecast (Millions F)
          </h4>
          <div className="h-[150px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FORECAST_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}M`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "0.75rem", fontSize: "11px" }}
                />
                <Area type="monotone" dataKey="forecast" stroke="#8b5cf6" fill="url(#colorForecast)" strokeDasharray="5 5" name="Forecast" />
                <Area type="monotone" dataKey="actual" stroke="#10b981" fill="#10b981" name="Actual" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="p-2 bg-muted/10 border border-border/40 rounded-lg text-center">
            <p className="text-lg font-black text-foreground font-mono">75M</p>
            <p className="text-[9px] uppercase font-bold text-muted-foreground">Sept Target</p>
          </div>
          <div className="p-2 bg-muted/10 border border-border/40 rounded-lg text-center flex flex-col justify-center items-center">
            <Zap className="h-4 w-4 text-amber-500 mb-1" />
            <p className="text-[9px] uppercase font-bold text-muted-foreground">High Confidence</p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

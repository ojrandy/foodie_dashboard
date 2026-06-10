import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XAxis, Tooltip, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Sparkles, BrainCircuit } from "lucide-react";

const FORECAST_DATA = [
  { day: "Mon", demand: 120, predicted: 125 },
  { day: "Tue", demand: 135, predicted: 140 },
  { day: "Wed", demand: 150, predicted: 155 },
  { day: "Thu", demand: 145, predicted: 150 },
  { day: "Fri", demand: 190, predicted: 195 },
  { day: "Sat", demand: 250, predicted: 260 },
  { day: "Sun", demand: 220, predicted: 230 },
  { day: "Next Mon", demand: null, predicted: 135 },
  { day: "Next Tue", demand: null, predicted: 150 },
];

export function DemandForecastingEngine() {
  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-primary" /> Demand Forecasting Engine
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div>
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
            7-Day Forward Prediction (All Ingredients)
          </h4>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FORECAST_DATA}>
                <defs>
                  <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "0.75rem", fontSize: "11px" }}
                />
                <Area type="monotone" dataKey="demand" stroke="var(--primary)" fillOpacity={1} fill="url(#colorDemand)" strokeWidth={2} name="Actual Demand" />
                <Area type="monotone" dataKey="predicted" stroke="#10b981" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPredicted)" strokeWidth={2} name="AI Prediction" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted/20 border border-border/40 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-success/10 rounded-full blur-xl -mr-8 -mt-8" />
            <h4 className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Chicken Demand</h4>
            <p className="text-xl font-black text-foreground flex items-center gap-2">
              +18% <Sparkles className="h-3 w-3 text-success" />
            </p>
            <p className="text-[9px] text-muted-foreground mt-1">Expected spike this weekend</p>
          </div>
          <div className="p-4 bg-muted/20 border border-border/40 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-destructive/10 rounded-full blur-xl -mr-8 -mt-8" />
            <h4 className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Tomatoes Supply</h4>
            <p className="text-xl font-black text-foreground flex items-center gap-2">
              -12% <Sparkles className="h-3 w-3 text-destructive" />
            </p>
            <p className="text-[9px] text-muted-foreground mt-1">Expected drop next week</p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}

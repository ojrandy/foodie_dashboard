import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, Droplet, LineChart, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function FinancialHealthMonitoring() {
  const metrics = [
    { label: "Liquidity Score", value: 85, status: "Excellent", icon: Droplet, color: "text-blue-500", bg: "bg-blue-500" },
    { label: "Revenue Stability", value: 92, status: "Excellent", icon: LineChart, color: "text-emerald-500", bg: "bg-emerald-500" },
    { label: "Refund Risk", value: 12, status: "Low Risk", icon: AlertTriangle, color: "text-success", bg: "bg-success" },
  ];

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <HeartPulse className="h-5 w-5 text-rose-500" /> Financial Health
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-xl relative overflow-hidden flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider mb-1">Health Index</p>
            <p className="text-3xl font-black text-foreground">94/100</p>
            <p className="text-[10px] text-muted-foreground mt-1">Excellent Operating Condition</p>
          </div>
          <div className="h-16 w-16 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-emerald-500/10">
            <HeartPulse className="h-8 w-8 text-emerald-500" />
          </div>
        </div>

        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md bg-muted/20 border border-border/40 ${metric.color}`}>
                    <metric.icon className="h-3 w-3" />
                  </div>
                  <h4 className="text-xs font-bold text-foreground">{metric.label}</h4>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-xs font-black">{metric.value}/100</span>
                  <span className="text-[9px] text-muted-foreground uppercase font-bold">{metric.status}</span>
                </div>
              </div>
              <Progress value={metric.value} indicatorClassName={metric.bg} className="h-1.5 bg-muted/30" />
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}

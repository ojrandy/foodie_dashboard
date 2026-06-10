import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Route, Navigation, Car, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function RouteOptimizationCenter() {
  const routes = [
    { id: "RT-01", destination: "Bastos, Yaoundé", distance: "4.2 km", traffic: "Low", efficiency: 95, status: "Optimal" },
    { id: "RT-02", destination: "Akwa, Douala", distance: "12.5 km", traffic: "High", efficiency: 45, status: "Rerouting" },
    { id: "RT-03", destination: "Molyko, Buea", distance: "2.1 km", traffic: "Medium", efficiency: 78, status: "Acceptable" },
  ];

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Route className="h-5 w-5 text-sky-500" /> Route Optimization Center
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-muted/20 border border-border/40 rounded-xl">
            <h4 className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Fuel Efficiency</h4>
            <p className="text-2xl font-black text-emerald-500">+14%</p>
            <p className="text-[10px] text-muted-foreground mt-1">Saved today via AI routing</p>
          </div>
          <div className="p-4 bg-muted/20 border border-border/40 rounded-xl">
            <h4 className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Avg Route Distance</h4>
            <p className="text-2xl font-black text-foreground">3.8 km</p>
            <p className="text-[10px] text-muted-foreground mt-1">Shorter by 1.2km avg</p>
          </div>
        </div>

        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Live Route Analysis</h4>
        <div className="space-y-3">
          {routes.map(r => (
            <div key={r.id} className="p-3 border border-border/40 rounded-lg bg-muted/10">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm font-bold flex items-center gap-2">
                    <Navigation className="h-3 w-3 text-primary" /> {r.destination}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{r.id} • {r.distance}</p>
                </div>
                <div className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                  r.status === 'Optimal' ? 'bg-success/10 text-success' :
                  r.status === 'Rerouting' ? 'bg-destructive/10 text-destructive' :
                  'bg-warning/10 text-warning'
                }`}>
                  {r.status === 'Optimal' ? <CheckCircle2 className="h-3 w-3" /> :
                   r.status === 'Rerouting' ? <AlertTriangle className="h-3 w-3" /> :
                   <Car className="h-3 w-3" />}
                  {r.status}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-bold uppercase text-muted-foreground">
                  <span>Efficiency Score</span>
                  <span>{r.efficiency}%</span>
                </div>
                <Progress value={r.efficiency} className="h-1.5" />
              </div>
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}

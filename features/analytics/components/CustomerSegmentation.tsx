import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, GraduationCap, Users, HeartPulse, Sparkles, TrendingUp } from "lucide-react";

export function CustomerSegmentation() {
  const segments = [
    { name: "Students", icon: GraduationCap, color: "text-blue-500", bg: "bg-blue-500/10", size: "35%", trait: "Budget Buyers", trend: "up" },
    { name: "Families", icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10", size: "28%", trait: "Bulk Orders", trend: "stable" },
    { name: "Health Conscious", icon: HeartPulse, color: "text-rose-500", bg: "bg-rose-500/10", size: "15%", trait: "Premium Subscriptions", trend: "up" },
    { name: "Corporate", icon: Sparkles, color: "text-violet-500", bg: "bg-violet-500/10", size: "12%", trait: "High LTV", trend: "down" },
  ];

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" /> Segmentation Engine
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {segments.map((seg, i) => (
          <div key={i} className="p-3 bg-muted/10 border border-border/40 rounded-xl hover:bg-muted/30 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${seg.bg}`}>
                <seg.icon className={`h-4 w-4 ${seg.color}`} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">{seg.name}</h4>
                <p className="text-[10px] text-muted-foreground">{seg.trait}</p>
              </div>
            </div>
            
            <div className="text-right flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-sm font-black">{seg.size}</span>
                <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">of base</span>
              </div>
              {seg.trend === "up" ? (
                <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center">
                  <TrendingUp className="h-3 w-3 text-success" />
                </div>
              ) : seg.trend === "down" ? (
                <div className="h-6 w-6 rounded-full bg-destructive/10 flex items-center justify-center">
                  <TrendingUp className="h-3 w-3 text-destructive rotate-180 transform" />
                </div>
              ) : (
                <div className="h-6 w-6 rounded-full bg-muted/30 flex items-center justify-center">
                  <div className="w-2 h-0.5 bg-muted-foreground rounded-full" />
                </div>
              )}
            </div>
          </div>
        ))}

      </CardContent>
    </Card>
  );
}

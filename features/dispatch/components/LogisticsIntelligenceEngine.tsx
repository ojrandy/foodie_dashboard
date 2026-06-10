import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, BrainCircuit, ArrowUpRight, ArrowDownRight, Zap } from "lucide-react";

export function LogisticsIntelligenceEngine() {
  const insights = [
    {
      title: "Delivery demand increasing in Molyko",
      description: "University students are ordering lunch. Recommend shifting 2 idle riders from Buea Town to Molyko.",
      impact: "High Impact",
      type: "positive"
    },
    {
      title: "South West region has fastest delivery rate",
      description: "Riders in South West are completing deliveries 14% faster than the national average today.",
      impact: "Performance",
      type: "positive"
    },
    {
      title: "Traffic delay detected in Akwa",
      description: "Multiple riders reporting gridlock near Boulevard de la Liberté. Rerouting all active deliveries via Bonadibong.",
      impact: "Critical",
      type: "negative"
    },
    {
      title: "High rider utilization in Centre Region",
      description: "Available riders have dropped below 10%. Consider assigning 3 additional riders or activating surge pricing.",
      impact: "Warning",
      type: "warning"
    }
  ];

  return (
    <Card className="glass overflow-hidden relative">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary animate-pulse" /> AI Logistics Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, idx) => (
            <div key={idx} className="p-4 bg-muted/20 border border-border/40 rounded-xl hover:border-primary/30 transition-colors relative group">
              <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                {insight.type === 'positive' ? <ArrowUpRight className="h-4 w-4 text-success" /> :
                 insight.type === 'negative' ? <ArrowDownRight className="h-4 w-4 text-destructive" /> :
                 <BrainCircuit className="h-4 w-4 text-warning" />}
                <span className="text-xs font-bold text-foreground">{insight.title}</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed pr-8">
                {insight.description}
              </p>
              <div className="mt-3">
                <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded-sm ${
                  insight.type === 'positive' ? 'bg-success/10 text-success' :
                  insight.type === 'negative' ? 'bg-destructive/10 text-destructive' :
                  'bg-warning/10 text-warning'
                }`}>
                  {insight.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

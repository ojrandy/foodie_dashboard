import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowRight, Zap, AlertTriangle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AISupportInsights() {
  const insights = [
    {
      title: "Buea Delivery Delays",
      description: "Late delivery complaints spiked in South West over the last 48 hours. Suggest increasing dispatch capacity in Buea.",
      action: "View Heatmap",
      type: "alert"
    },
    {
      title: "Refunds Decreasing",
      description: "Refund requests dropped by 12% this week following the new automated 'Missing Item' bot resolution flow.",
      action: "View Report",
      type: "success"
    },
    {
      title: "Payment Complaints",
      description: "Increase in MTN MoMo failure reports. Issue appears isolated to transactions on Fridays between 4PM-6PM.",
      action: "Investigate",
      type: "insight"
    }
  ];

  return (
    <Card className="glass h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse" /> AI Support Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        
        {insights.map((insight, i) => (
          <div key={i} className="p-4 bg-muted/20 border border-border/40 rounded-xl hover:border-primary/30 transition-colors group">
            <div className="flex gap-3">
              <div className={`mt-1 p-2 rounded-full shrink-0 ${
                insight.type === 'alert' ? 'bg-rose-500/10 text-rose-500' :
                insight.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                'bg-amber-500/10 text-amber-500'
              }`}>
                {insight.type === 'alert' ? <AlertTriangle className="h-4 w-4" /> :
                 insight.type === 'success' ? <TrendingUp className="h-4 w-4" /> :
                 <Zap className="h-4 w-4" />}
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground mb-1">{insight.title}</h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed mb-3">{insight.description}</p>
                <Button variant="outline" size="sm" className="h-7 text-[10px] bg-background/50 group-hover:border-primary/50 transition-colors">
                  {insight.action} <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        ))}

      </CardContent>
    </Card>
  );
}

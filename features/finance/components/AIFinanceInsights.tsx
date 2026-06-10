import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowRight, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AIFinanceInsights() {
  const insights = [
    {
      title: "Delivery Revenue Spike",
      description: "Delivery income increased by 18% this week. Consider adjusting rider payout structures to maintain margins.",
      action: "Review Payouts",
      type: "opportunity"
    },
    {
      title: "Weekend vs Weekday",
      description: "Weekend revenue consistently outperforms weekdays by 45%. Target marketing spend towards Thursday/Friday.",
      action: "Adjust Marketing",
      type: "insight"
    },
    {
      title: "Refund Rate Decreasing",
      description: "Refund requests dropped by 2% this month, positively impacting the net profit margin.",
      action: "View Report",
      type: "success"
    }
  ];

  return (
    <Card className="glass h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse" /> AI Finance Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        
        {insights.map((insight, i) => (
          <div key={i} className="p-4 bg-muted/20 border border-border/40 rounded-xl hover:border-primary/30 transition-colors group">
            <div className="flex gap-3">
              <div className={`mt-1 p-2 rounded-full shrink-0 ${
                insight.type === 'opportunity' ? 'bg-amber-500/10 text-amber-500' :
                insight.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                'bg-primary/10 text-primary'
              }`}>
                {insight.type === 'opportunity' ? <Zap className="h-4 w-4" /> :
                 insight.type === 'success' ? <TrendingUp className="h-4 w-4" /> :
                 <Sparkles className="h-4 w-4" />}
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

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowRight, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SmartCustomerInsights() {
  const insights = [
    {
      title: "Student Segment Growth",
      description: "Students are increasingly ordering budget meal plans. Consider launching a 'Back to School' promotional bundle.",
      action: "Create Promo",
      type: "opportunity"
    },
    {
      title: "Jollof Rice Demand Spike",
      description: "Jollof Rice demand increased by 18% among returning customers in the Littoral region.",
      action: "Optimize Inventory",
      type: "insight"
    },
    {
      title: "Retention Warning",
      description: "35 customers who joined last month haven't ordered yet. Engage them with a 10% discount to prevent churn.",
      action: "Send Campaign",
      type: "warning"
    }
  ];

  return (
    <Card className="glass h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse" /> AI Customer Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        
        {insights.map((insight, i) => (
          <div key={i} className="p-4 bg-muted/20 border border-border/40 rounded-xl hover:border-primary/30 transition-colors group">
            <div className="flex gap-3">
              <div className={`mt-1 p-2 rounded-full shrink-0 ${
                insight.type === 'opportunity' ? 'bg-success/10 text-success' :
                insight.type === 'warning' ? 'bg-warning/10 text-warning' :
                'bg-primary/10 text-primary'
              }`}>
                {insight.type === 'opportunity' ? <Zap className="h-4 w-4" /> :
                 insight.type === 'warning' ? <Target className="h-4 w-4" /> :
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

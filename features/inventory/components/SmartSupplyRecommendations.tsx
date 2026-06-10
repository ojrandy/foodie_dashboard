import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ArrowRight, Zap, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SmartSupplyRecommendations() {
  const recommendations = [
    {
      title: "Switch Sourcing to OIC Market",
      description: "Tomatoes are approaching shortage levels at Buea Central Market. OIC Market currently has excess supply at 15% lower cost.",
      action: "Reroute Supply",
      type: "optimization"
    },
    {
      title: "Stockpile Plantains",
      description: "Plantains currently have excellent availability and prices are dropping. Demand is expected to rise next month.",
      action: "Execute Bulk Order",
      type: "opportunity"
    },
    {
      title: "Alternative Ingredient Required",
      description: "Fish supply may become constrained within 7 days. Consider promoting chicken-based recipes to balance demand.",
      action: "Update Menu Engine",
      type: "warning"
    }
  ];

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500 animate-pulse" /> Smart Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, i) => (
          <div key={i} className="p-4 bg-muted/10 border border-border/40 rounded-xl group hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full mt-1 shrink-0 ${
                rec.type === 'optimization' ? 'bg-primary/10 text-primary' :
                rec.type === 'opportunity' ? 'bg-success/10 text-success' :
                'bg-warning/10 text-warning'
              }`}>
                {rec.type === 'optimization' ? <RefreshCw className="h-4 w-4" /> :
                 rec.type === 'opportunity' ? <Zap className="h-4 w-4" /> :
                 <Lightbulb className="h-4 w-4" />}
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground mb-1">{rec.title}</h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed mb-3">
                  {rec.description}
                </p>
                <Button variant="outline" size="sm" className="h-7 text-[10px] bg-background/50 hover:bg-background group-hover:border-primary/50 transition-colors">
                  {rec.action} <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

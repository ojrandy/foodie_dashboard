import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Smile, Meh, Frown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function CustomerSatisfaction() {
  const scores = [
    { label: "Positive (4-5 Stars)", value: 78, icon: Smile, color: "text-emerald-500", bg: "bg-emerald-500" },
    { label: "Neutral (3 Stars)", value: 14, icon: Meh, color: "text-amber-500", bg: "bg-amber-500" },
    { label: "Negative (1-2 Stars)", value: 8, icon: Frown, color: "text-rose-500", bg: "bg-rose-500" },
  ];

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Heart className="h-5 w-5 text-rose-500" /> Satisfaction (CSAT)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-xl relative overflow-hidden flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider mb-1">Global NPS Score</p>
            <p className="text-3xl font-black text-foreground">72</p>
            <p className="text-[10px] text-muted-foreground mt-1">World-class rating (&gt;70)</p>
          </div>
          <div className="h-16 w-16 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-emerald-500/10">
            <Heart className="h-8 w-8 text-emerald-500 fill-emerald-500" />
          </div>
        </div>

        <div className="space-y-4">
          {scores.map((score) => (
            <div key={score.label} className="space-y-2">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md bg-muted/20 border border-border/40 ${score.color}`}>
                    <score.icon className="h-3 w-3" />
                  </div>
                  <h4 className="text-xs font-bold text-foreground">{score.label}</h4>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black">{score.value}%</span>
                </div>
              </div>
              <Progress value={score.value} indicatorClassName={score.bg} className="h-1.5 bg-muted/30" />
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}

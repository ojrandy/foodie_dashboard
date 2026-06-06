"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, TrendingUp, AlertCircle, Clock } from "lucide-react";

export function SmartOrderInsights() {
  const insights = [
    { icon: TrendingUp, text: "Orders from Buea Central increased by 18% in the last 2 hours.", color: "text-success", bg: "bg-success/10" },
    { icon: AlertCircle, text: "Delivery delays rising in Molyko due to severe weather. Rerouting active.", color: "text-destructive", bg: "bg-destructive/10" },
    { icon: Clock, text: "Peak ordering period detected. Anticipated load: +45% for next hour.", color: "text-warning", bg: "bg-warning/10" },
    { icon: Sparkles, text: "Student Meal Plans are generating the highest volume today (65% of orders).", color: "text-primary", bg: "bg-primary/10" }
  ];

  return (
    <Card className="glass border-primary/20 h-full">
      <CardHeader>
        <CardTitle className="text-base font-bold flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" /> Smart Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, i) => (
          <div key={i} className="bg-card border border-border/40 p-3 rounded-xl flex items-start gap-3 hover:bg-muted/5 transition-colors">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${insight.bg} ${insight.color}`}>
              <insight.icon className="h-4 w-4" />
            </div>
            <p className="text-xs font-medium text-foreground leading-relaxed pt-1">
              {insight.text}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

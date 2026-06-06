"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign } from "lucide-react";

export function SubscriptionPlanAnalytics() {
  const plans = [
    { name: "Family Power Plan", users: 1240, mrr: 18500000, growth: "+12%", status: "Healthy" },
    { name: "Student Survival", users: 3400, mrr: 12200000, growth: "+25%", status: "Viral" },
    { name: "Weekend Premium", users: 450, mrr: 8500000, growth: "-2%", status: "Stagnant" },
    { name: "Healthy & Organic", users: 890, mrr: 10400000, growth: "+8%", status: "Healthy" },
  ];

  return (
    <Card className="glass border-primary/20 h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" /> Subscription Plan Analytics
        </CardTitle>
        <p className="text-xs text-muted-foreground">Admin overview of active users, MRR, and demographic plan performance.</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {plans.map((plan, i) => (
            <div key={i} className="bg-card border border-border/40 p-4 rounded-xl flex items-center justify-between hover:bg-muted/5 transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-foreground text-base">{plan.name}</h4>
                  <Badge variant="outline" className={`text-[9px] ${
                    plan.status === "Viral" ? "bg-accent/10 text-accent border-accent/30" : 
                    plan.status === "Healthy" ? "bg-success/10 text-success border-success/30" : 
                    "bg-warning/10 text-warning border-warning/30"
                  }`}>{plan.status}</Badge>
                </div>
                <p className="text-[10px] uppercase font-bold text-muted-foreground mt-1 flex items-center gap-1">
                  <Users className="h-3 w-3" /> {plan.users.toLocaleString()} Active Subscribers
                </p>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-black text-primary flex items-center justify-end gap-1">
                  <DollarSign className="h-3 w-3" /> {plan.mrr.toLocaleString()}
                </p>
                <p className={`text-[10px] font-bold mt-1 ${plan.growth.includes('+') ? 'text-success' : 'text-destructive'}`}>
                  {plan.growth} MoM
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { Sparkles, Lightbulb, PiggyBank, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function BudgetAIPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-accent" /> Budget AI
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            AI-powered budget optimization, cost forecasting, and smart allocation engine.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Smart Budget</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">Active</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <PiggyBank className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Cost Savings</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">+18.4%</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center text-success">
              <Target className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">AI Insights</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">12 Active</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Lightbulb className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border border-dashed border-border/40 p-12 text-center glass">
        <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-bold text-foreground">Budget AI Module</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mt-2">
          Intelligent budget allocation and cost optimization tools coming soon. This module will provide AI-driven financial planning and expense tracking.
        </p>
      </div>
    </div>
  );
}

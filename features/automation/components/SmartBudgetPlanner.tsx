"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRecipeAutomation } from "../hooks/useRecipeAutomation";
import { Wallet, Users, Calendar, ArrowRight, HeartPulse, CheckCircle2 } from "lucide-react";

export function SmartBudgetPlanner() {
  const { recipes, calculateRecipeCost } = useRecipeAutomation();
  const [budget, setBudget] = useState(15000);
  const [familySize, setFamilySize] = useState(5);
  const [durationDays, setDurationDays] = useState(7);
  const [planType, setPlanType] = useState<"Family" | "Student" | "Healthy" | "Budget">("Family");
  const [isCalculating, setIsCalculating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<{
    meals: { day: string; recipe: string; cost: number }[];
    totalCost: number;
    utilization: number;
    nutritionScore: number;
  } | null>(null);

  const handleGeneratePlan = () => {
    setIsCalculating(true);
    setTimeout(() => {
      // Mock plan generation logic
      const targetRecipes = recipes.filter(r => r.category === planType || planType === "Family");
      const meals = [];
      let currentCost = 0;

      for (let i = 0; i < durationDays; i++) {
        const recipe = targetRecipes[i % targetRecipes.length];
        if (recipe) {
          const cost = calculateRecipeCost(recipe.id, familySize);
          currentCost += cost;
          meals.push({
            day: `Day ${i + 1}`,
            recipe: recipe.name,
            cost
          });
        }
      }

      setGeneratedPlan({
        meals,
        totalCost: currentCost,
        utilization: (currentCost / budget) * 100,
        nutritionScore: planType === "Healthy" ? 95 : 78
      });
      setIsCalculating(false);
    }, 1000);
  };

  return (
    <Card className="glass border-warning/20">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Wallet className="h-6 w-6 text-warning" /> Smart Budget & Meal Planner
        </CardTitle>
        <p className="text-xs text-muted-foreground">Reverse-engineer meal plans based on your budget, family size, and diet goals.</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/10 rounded-xl border border-border/40">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1"><Wallet className="h-3 w-3" /> Target Budget (XAF)</label>
            <Input type="number" value={budget} onChange={(e) => setBudget(parseInt(e.target.value) || 0)} className="font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" /> Family Size</label>
            <Input type="number" min={1} value={familySize} onChange={(e) => setFamilySize(parseInt(e.target.value) || 1)} className="font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> Duration (Days)</label>
            <Input type="number" min={1} max={30} value={durationDays} onChange={(e) => setDurationDays(parseInt(e.target.value) || 1)} className="font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1"><HeartPulse className="h-3 w-3" /> Plan Type</label>
            <select 
              className="w-full bg-background border border-border/40 rounded-lg p-2.5 text-sm font-semibold focus:ring-1 focus:ring-warning/30"
              value={planType}
              onChange={(e) => setPlanType(e.target.value as "Family" | "Student" | "Healthy" | "Budget")}
            >
              <option value="Family">Family Plan</option>
              <option value="Student">Student Plan</option>
              <option value="Budget">Aggressive Budget</option>
              <option value="Healthy">Healthy & Organic</option>
            </select>
          </div>
        </div>

        <Button 
          className="w-full bg-warning hover:bg-warning/90 text-warning-foreground"
          onClick={handleGeneratePlan}
          disabled={isCalculating}
        >
          {isCalculating ? (
            <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> AI Synthesizing Plan...</span>
          ) : (
            <span className="flex items-center gap-2">Generate {planType} Plan <ArrowRight className="h-4 w-4" /></span>
          )}
        </Button>

        {generatedPlan && (
          <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-background border border-border/40 rounded-xl">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Estimated Cost</p>
                <p className={`text-2xl font-black ${generatedPlan.totalCost > budget ? 'text-destructive' : 'text-success'}`}>
                  {generatedPlan.totalCost.toLocaleString()} XAF
                </p>
                <p className="text-xs text-muted-foreground mt-1">vs {budget.toLocaleString()} XAF budget</p>
              </div>
              <div className="p-4 bg-background border border-border/40 rounded-xl">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Budget Utilization</p>
                <p className="text-2xl font-black text-foreground">{generatedPlan.utilization.toFixed(1)}%</p>
                <div className="w-full h-1.5 bg-muted mt-2 rounded-full overflow-hidden">
                  <div className={`h-full ${generatedPlan.utilization > 100 ? 'bg-destructive' : 'bg-success'}`} style={{ width: `${Math.min(generatedPlan.utilization, 100)}%` }} />
                </div>
              </div>
              <div className="p-4 bg-background border border-border/40 rounded-xl">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Nutrition Score</p>
                <p className="text-2xl font-black text-accent flex items-center gap-2">
                  {generatedPlan.nutritionScore}/100 <CheckCircle2 className="h-5 w-5" />
                </p>
              </div>
            </div>

            <div className="bg-card border border-border/40 rounded-xl overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] text-muted-foreground uppercase bg-muted/20">
                  <tr>
                    <th className="px-4 py-3">Schedule</th>
                    <th className="px-4 py-3">Meal Recommendation</th>
                    <th className="px-4 py-3 text-right">Raw Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {generatedPlan.meals.map((meal, idx: number) => (
                    <tr key={idx} className="hover:bg-muted/5 transition-colors">
                      <td className="px-4 py-3 font-bold">{meal.day}</td>
                      <td className="px-4 py-3 text-foreground">{meal.recipe}</td>
                      <td className="px-4 py-3 text-right font-medium">{meal.cost.toLocaleString()} XAF</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

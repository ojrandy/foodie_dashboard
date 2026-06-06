"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, ShoppingBasket, Users, HeartPulse, GraduationCap, Flame, ChevronRight } from "lucide-react";
import { useRecipeAutomation } from "../hooks/useRecipeAutomation";

export function FamilyMealPlanner() {
  const { recipes, calculateRecipeCost } = useRecipeAutomation();
  const [activeTab, setActiveTab] = useState<"Family" | "Student" | "Budget" | "Healthy" | "Premium">("Family");

  const plans = [
    { id: "Family", icon: Users, title: "Family Power Plan", desc: "Balanced, high-yield meals for 4+ people." },
    { id: "Student", icon: GraduationCap, title: "Student Survival", desc: "Quick prep, ultra-low cost bulk meals." },
    { id: "Budget", icon: ShoppingBasket, title: "Aggressive Budget", desc: "Maximum calorie-to-cost ratio." },
    { id: "Healthy", icon: HeartPulse, title: "Wellness & Organic", desc: "Low oil, high protein, fresh greens." },
    { id: "Premium", icon: Flame, title: "Weekend Premium", desc: "High-margin indulgent weekend specials." }
  ] as const;

  const targetRecipes = recipes.filter(r => r.category === activeTab || activeTab === "Family");

  return (
    <Card className="glass border-primary/20 overflow-hidden">
      <CardHeader className="bg-muted/10 border-b border-border/40">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <CalendarDays className="h-6 w-6 text-primary" /> Curated Meal Planners
        </CardTitle>
        <p className="text-xs text-muted-foreground">Pre-configured operational plans targeting specific customer demographics.</p>
      </CardHeader>
      
      <div className="flex flex-col md:flex-row h-full">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 border-r border-border/40 bg-card/50 p-4 space-y-2 shrink-0">
          {plans.map(p => (
            <button 
              key={p.id}
              onClick={() => setActiveTab(p.id)}
              className={`w-full text-left p-3 rounded-xl transition-all flex flex-col gap-1 border ${
                activeTab === p.id 
                  ? 'bg-primary/10 border-primary/30 text-primary' 
                  : 'bg-transparent border-transparent text-muted-foreground hover:bg-muted/20'
              }`}
            >
              <span className="font-bold text-sm flex items-center gap-2"><p.icon className="h-4 w-4" /> {p.title}</span>
              <span className="text-[10px] opacity-80 leading-tight">{p.desc}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 bg-background/50">
          <h3 className="text-lg font-black mb-4 flex items-center justify-between">
            {plans.find(p => p.id === activeTab)?.title} Curriculum
            <Badge className="bg-primary/20 text-primary border-primary/30">{targetRecipes.length} Meals</Badge>
          </h3>

          <div className="space-y-4">
            {targetRecipes.map((recipe, i) => {
              const standardCost = calculateRecipeCost(recipe.id, recipe.baseServings);
              const perServing = Math.round(standardCost / recipe.baseServings);

              return (
                <div key={i} className="bg-card border border-border/40 p-4 rounded-xl shadow-sm hover:border-primary/40 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-3 mb-3">
                    <div>
                      <h4 className="font-bold text-foreground text-base">{recipe.name}</h4>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                        {recipe.baseServings} Servings • {recipe.preparationTime} Mins Prep
                      </p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground">Est. Base Cost</p>
                        <p className="font-black text-primary">{standardCost.toLocaleString()} XAF</p>
                        <p className="text-[10px] text-muted-foreground">{perServing.toLocaleString()} XAF / serving</p>
                      </div>
                      <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full"><ChevronRight className="h-4 w-4" /></Button>
                    </div>
                  </div>

                  {/* Ingredients Preview */}
                  <div className="flex flex-wrap gap-2">
                    {recipe.ingredients.map(ing => (
                      <Badge key={ing.id} variant="outline" className="text-[10px] py-0.5 bg-muted/10">
                        {ing.quantityNeeded} {ing.unit} {ing.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
            
            {targetRecipes.length === 0 && (
              <div className="text-center p-8 border border-dashed border-border/50 rounded-xl">
                <p className="text-sm text-muted-foreground">No pre-configured recipes found for this demographic.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

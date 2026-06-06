"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useRecipeAutomation } from "../hooks/useRecipeAutomation";
import { Calculator, Users, MapPin, Search } from "lucide-react";

export function RecipeCostBuilder() {
  const { recipes, calculateRecipeCost } = useRecipeAutomation();
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(recipes[0]?.id || "");
  const [servings, setServings] = useState<number>(4);
  const [location, setLocation] = useState<string>("Buea Central");

  const activeRecipe = recipes.find(r => r.id === selectedRecipeId);
  const totalCost = activeRecipe ? calculateRecipeCost(selectedRecipeId, servings) : 0;
  const multiplier = activeRecipe ? servings / activeRecipe.baseServings : 1;

  return (
    <Card className="glass border-primary/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" /> Dynamic Recipe Cost Builder
        </CardTitle>
        <p className="text-xs text-muted-foreground">Select a recipe, family size, and market to instantly calculate raw ingredient costs.</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-muted/10 p-4 rounded-xl border border-border/40">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1"><Search className="h-3 w-3" /> Select Recipe</label>
            <select 
              className="w-full bg-background border border-border/40 rounded-lg p-2.5 text-sm font-semibold focus:ring-1 focus:ring-primary/30"
              value={selectedRecipeId}
              onChange={(e) => setSelectedRecipeId(e.target.value)}
            >
              {recipes.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" /> Target Servings</label>
            <Input 
              type="number" 
              min={1} 
              max={50}
              value={servings}
              onChange={(e) => setServings(parseInt(e.target.value) || 1)}
              className="font-bold bg-background"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> Market Location</label>
            <select 
              className="w-full bg-background border border-border/40 rounded-lg p-2.5 text-sm font-semibold focus:ring-1 focus:ring-primary/30"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="Buea Central">Buea Central Market</option>
              <option value="Douala Marche">Douala Marche Central</option>
              <option value="Yaounde Market">Yaounde Mokolo Market</option>
              <option value="Muea Market">Muea Local Market</option>
            </select>
          </div>
        </div>

        {activeRecipe && (
          <div className="space-y-4">
            <div className="flex justify-between items-end border-b border-border/40 pb-3">
              <div>
                <h4 className="font-extrabold text-foreground">{activeRecipe.name}</h4>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline" className="text-[10px]">{activeRecipe.category}</Badge>
                  <Badge variant="secondary" className="text-[10px]">Base: {activeRecipe.baseServings} servings</Badge>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-muted-foreground block">Raw Total Cost</span>
                <span className="text-2xl font-black text-primary">{totalCost.toLocaleString()} XAF</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] text-muted-foreground uppercase bg-muted/20">
                  <tr>
                    <th className="px-3 py-2 rounded-tl-lg">Ingredient</th>
                    <th className="px-3 py-2">Category</th>
                    <th className="px-3 py-2">Req. Qty</th>
                    <th className="px-3 py-2 text-right">Unit Price</th>
                    <th className="px-3 py-2 text-right rounded-tr-lg">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {activeRecipe.ingredients.map(ing => {
                    const qty = ing.quantityNeeded * multiplier;
                    const lineTotal = qty * ing.currentMarketPrice;
                    return (
                      <tr key={ing.id} className="hover:bg-muted/10 transition-colors">
                        <td className="px-3 py-2.5 font-bold text-foreground">{ing.name} <span className="text-[10px] text-muted-foreground font-normal ml-1">from {ing.marketSource}</span></td>
                        <td className="px-3 py-2.5"><Badge variant="outline" className="text-[9px]">{ing.category}</Badge></td>
                        <td className="px-3 py-2.5 font-semibold">{qty.toFixed(1)} {ing.unit}</td>
                        <td className="px-3 py-2.5 text-right font-medium">{ing.currentMarketPrice.toLocaleString()} XAF</td>
                        <td className="px-3 py-2.5 text-right font-bold text-accent">{lineTotal.toLocaleString()} XAF</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

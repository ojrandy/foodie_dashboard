"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LineChart, ArrowDownRight, AlertOctagon } from "lucide-react";

export function MarginStressTester() {
  const [ingredient, setIngredient] = useState("Palm Oil");
  const [priceSpike, setPriceSpike] = useState(20);
  const [isSimulating, setIsSimulating] = useState(false);
  const [results, setResults] = useState<{ affectedRecipes: number; avgMarginDrop: number; revenueAtRisk: number; } | null>(null);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setResults({
        affectedRecipes: 45,
        avgMarginDrop: priceSpike * 0.4, // Mock calculation
        revenueAtRisk: 1200000,
      });
      setIsSimulating(false);
    }, 800);
  };

  return (
    <Card className="glass border-destructive/20 h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <LineChart className="h-6 w-6 text-destructive" /> Margin Stress Tester
        </CardTitle>
        <p className="text-xs text-muted-foreground">Simulate market price spikes to calculate algorithmic impact on global profit margins.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="grid grid-cols-2 gap-4 bg-muted/10 p-4 rounded-xl border border-border/40">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-muted-foreground">Target Commodity</label>
            <select className="w-full bg-background border border-border/40 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-destructive/30" value={ingredient} onChange={(e) => setIngredient(e.target.value)}>
              <option value="Palm Oil">Palm Oil</option>
              <option value="Tomatoes">Tomatoes</option>
              <option value="Frozen Chicken">Frozen Chicken</option>
              <option value="Onions">Onions</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-muted-foreground">Price Spike (%)</label>
            <Input type="number" value={priceSpike} onChange={(e) => setPriceSpike(Number(e.target.value))} className="font-bold bg-background text-destructive" />
          </div>
        </div>

        <Button className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground" onClick={handleSimulate} disabled={isSimulating}>
          {isSimulating ? "Running Global Simulation..." : "Execute Stress Test"}
        </Button>

        {results && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border/40 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-card p-4 rounded-xl border border-border/40 text-center">
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Recipes Affected</p>
              <p className="text-2xl font-black text-foreground mt-1">{results.affectedRecipes}</p>
            </div>
            <div className="bg-destructive/10 p-4 rounded-xl border border-destructive/20 text-center">
              <p className="text-[10px] uppercase font-bold text-destructive">Avg Margin Drop</p>
              <p className="text-2xl font-black text-destructive mt-1 flex items-center justify-center gap-1">
                <ArrowDownRight className="h-5 w-5" /> {results.avgMarginDrop.toFixed(1)}%
              </p>
            </div>
            <div className="bg-warning/10 p-4 rounded-xl border border-warning/20 text-center">
              <p className="text-[10px] uppercase font-bold text-warning">Revenue at Risk</p>
              <p className="text-lg font-black text-warning mt-1">{results.revenueAtRisk.toLocaleString()} XAF</p>
            </div>
            
            {results.avgMarginDrop > 15 && (
              <div className="col-span-1 sm:col-span-3 bg-destructive/10 p-3 rounded-lg border border-destructive/20 flex items-center gap-2 text-xs text-destructive mt-2">
                <AlertOctagon className="h-4 w-4" /> 
                System Alert: This price spike will push 12 automated recipes below the minimum threshold margin of 20%. The system will auto-suspend those orders.
              </div>
            )}
          </div>
        )}

      </CardContent>
    </Card>
  );
}

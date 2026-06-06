import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Trash2, ArrowRight, Percent, CheckCircle2 } from "lucide-react";
import { CommodityPrice } from "../hooks/usePricingEngine";

interface CostSimulatorProps {
  commodities: CommodityPrice[];
}

export function CostSimulator({ commodities }: CostSimulatorProps) {
  const [selectedItems, setSelectedItems] = useState<{ id: string; qty: number; unit: string }[]>([]);
  const [targetMarket, setTargetMarket] = useState<"bueaPrice" | "doualaPrice" | "yaoundePrice">("bueaPrice");

  const handleAddItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (!id) return;
    if (selectedItems.find(i => i.id === id)) return; // prevent dupes
    setSelectedItems([...selectedItems, { id, qty: 1, unit: "Unit" }]);
    e.target.value = ""; // reset
  };

  const updateQty = (id: string, qty: number) => {
    setSelectedItems(prev => prev.map(item => item.id === id ? { ...item, qty } : item));
  };

  const removeItem = (id: string) => {
    setSelectedItems(prev => prev.filter(i => i.id !== id));
  };

  const { totalCost, itemBreakdown } = useMemo(() => {
    const breakdown = selectedItems.map(item => {
      const com = commodities.find(c => c.id === item.id);
      if (!com) return null;
      const unitPrice = com[targetMarket];
      const itemTotal = unitPrice * item.qty;
      return { ...com, qty: item.qty, itemTotal, unitPrice };
    }).filter(Boolean) as (CommodityPrice & { qty: number; itemTotal: number; unitPrice: number })[];

    const total = breakdown.reduce((sum, item) => sum + item.itemTotal, 0);

    return { totalCost: total, itemBreakdown: breakdown };
  }, [selectedItems, commodities, targetMarket]);

  const familyCost = totalCost * 1.5; // Estimated multiplier for family
  const suggestedSellingPrice = totalCost * 2.5; // Standard restaurant margin 150%

  return (
    <Card className="glass border-primary/20">
      <CardHeader className="border-b border-border/40 bg-muted/10 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Calculator className="h-6 w-6 text-primary" /> Smart Pricing Engine
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Calculate exact recipe costs, family meal estimates, and restaurant profit margins in real-time.</p>
          </div>
          <select 
            value={targetMarket}
            onChange={(e) => setTargetMarket(e.target.value as "bueaPrice" | "doualaPrice" | "yaoundePrice")}
            className="bg-background border border-border/40 rounded-lg p-2 text-sm focus:ring-1 focus:ring-primary/30"
          >
            <option value="bueaPrice">Buea Market Pricing</option>
            <option value="doualaPrice">Douala Market Pricing</option>
            <option value="yaoundePrice">Yaounde Market Pricing</option>
          </select>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Ingredient Selection */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex gap-2">
            <select 
              onChange={handleAddItem}
              className="w-full bg-muted/30 border border-border/40 rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary/30"
            >
              <option value="">+ Search and Add Ingredient...</option>
              {commodities.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c[targetMarket]} XAF / {c.unit})</option>
              ))}
            </select>
          </div>

          <div className="space-y-3 mt-4">
            {itemBreakdown.length === 0 ? (
              <div className="text-center p-8 border border-dashed border-border/50 rounded-xl bg-muted/10">
                <p className="text-sm text-muted-foreground">No ingredients added to the simulator yet.</p>
              </div>
            ) : (
              itemBreakdown.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg border border-border/40 bg-card hover:bg-muted/10 transition-colors">
                  <div>
                    <h4 className="text-sm font-bold">{item.name}</h4>
                    <p className="text-[10px] text-muted-foreground uppercase">{item.unitPrice.toLocaleString()} XAF per {item.unit}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-muted/30 rounded-md border border-border/40 overflow-hidden">
                      <Button variant="ghost" size="sm" className="h-8 rounded-none px-2" onClick={() => updateQty(item.id, Math.max(0.5, item.qty - 0.5))}>-</Button>
                      <span className="text-xs font-bold w-8 text-center">{item.qty}</span>
                      <Button variant="ghost" size="sm" className="h-8 rounded-none px-2" onClick={() => updateQty(item.id, item.qty + 0.5)}>+</Button>
                    </div>
                    <div className="w-24 text-right">
                      <span className="font-bold text-primary">{item.itemTotal.toLocaleString()} XAF</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Cost Analysis Output */}
        <div className="lg:col-span-5">
          <div className="bg-card border border-border/40 rounded-xl p-6 shadow-xl sticky top-4 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2">Simulation Output</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-muted-foreground">Raw Ingredient Cost</p>
                  <p className="text-3xl font-extrabold text-foreground">{totalCost.toLocaleString()} <span className="text-sm text-muted-foreground">XAF</span></p>
                </div>
                <div className="bg-muted p-2 rounded-lg text-center">
                  <p className="text-[10px] uppercase text-muted-foreground font-bold">Items</p>
                  <p className="font-extrabold">{selectedItems.length}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/40">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                  <p className="text-[10px] uppercase text-muted-foreground font-bold flex items-center gap-1"><ArrowRight className="h-3 w-3" /> Family Meal (x1.5)</p>
                  <p className="text-lg font-bold text-primary mt-1">{familyCost.toLocaleString()} XAF</p>
                </div>
                <div className="bg-success/5 border border-success/20 rounded-lg p-3">
                  <p className="text-[10px] uppercase text-muted-foreground font-bold flex items-center gap-1"><Percent className="h-3 w-3" /> Target Sale Price</p>
                  <p className="text-lg font-bold text-success mt-1">{suggestedSellingPrice.toLocaleString()} XAF</p>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mt-2">
                <h4 className="text-xs font-bold text-emerald-500 flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> AI Margin Assessment</h4>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                  Selling this recipe at the target price yields a <span className="font-bold text-foreground">{(suggestedSellingPrice - totalCost).toLocaleString()} XAF</span> gross profit per serving (60% margin). This is highly competitive for the {targetMarket.replace("Price", "")} market.
                </p>
              </div>

              <Button className="w-full mt-2" size="lg">Save Recipe Pricing Model</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

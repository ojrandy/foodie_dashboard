"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useRecipeAutomation } from "../hooks/useRecipeAutomation";
import { ShoppingCart, ArrowRight, CheckCircle2, Package, MapPin, ChefHat, Truck } from "lucide-react";

export function OrderGenerator() {
  const { recipes, simulateOrderCreation, recentOrders } = useRecipeAutomation();
  const [step, setStep] = useState(1);
  const [recipeId, setRecipeId] = useState(recipes[0]?.id || "");
  const [servings, setServings] = useState(4);
  const [region, setRegion] = useState("Buea");
  const [distanceKm, setDistanceKm] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      simulateOrderCreation(recipeId, servings, region, distanceKm);
      setIsGenerating(false);
      setStep(6); // completion step
    }, 1500);
  };

  const selectedRecipe = recipes.find(r => r.id === recipeId);

  return (
    <Card className="glass shadow-xl relative overflow-hidden border-accent/20">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <ShoppingCart className="h-48 w-48 text-accent" />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-black flex items-center gap-2">
          <ShoppingCart className="h-6 w-6 text-accent" /> Smart Order Generator
        </CardTitle>
        <p className="text-sm text-muted-foreground">End-to-end recipe translation into final deliverable orders.</p>
      </CardHeader>

      <CardContent>
        {/* Progress Bar */}
        <div className="flex items-center gap-2 mb-8 relative z-10">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`h-2 flex-1 rounded-full transition-colors duration-500 ${step >= s ? 'bg-accent' : 'bg-muted'}`} />
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: Select Recipe */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2"><ChefHat className="h-5 w-5 text-accent"/> Select Recipe</h3>
              <div className="grid grid-cols-1 gap-3">
                {recipes.map(r => (
                  <div 
                    key={r.id} 
                    onClick={() => setRecipeId(r.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${recipeId === r.id ? 'border-accent bg-accent/10 shadow-md' : 'border-border/40 hover:border-accent/50'}`}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold">{r.name}</h4>
                      {recipeId === r.id && <CheckCircle2 className="h-5 w-5 text-accent" />}
                    </div>
                    <Badge variant="outline" className="mt-2 text-[10px]">{r.category}</Badge>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" onClick={() => setStep(2)}>Next Step <ArrowRight className="h-4 w-4 ml-2" /></Button>
            </motion.div>
          )}

          {/* STEP 2: Select Servings */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2"><Package className="h-5 w-5 text-accent"/> Define Order Size</h3>
              <p className="text-xs text-muted-foreground">How many people are we cooking for?</p>
              <div className="bg-muted/10 p-6 rounded-xl border border-border/40">
                <Input 
                  type="number" 
                  min={1} 
                  max={100}
                  value={servings}
                  onChange={(e) => setServings(parseInt(e.target.value) || 1)}
                  className="text-center text-2xl font-black h-16 bg-background"
                />
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button className="flex-1" onClick={() => setStep(3)}>Next Step <ArrowRight className="h-4 w-4 ml-2" /></Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3 & 4: Logistics */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2"><MapPin className="h-5 w-5 text-accent"/> Logistics Setup</h3>
              <div className="space-y-4 bg-muted/10 p-6 rounded-xl border border-border/40">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Market Region</label>
                  <select 
                    className="w-full bg-background border border-border/40 rounded-lg p-3 text-sm font-semibold focus:ring-1 focus:ring-accent/30"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    <option value="Buea">Buea</option>
                    <option value="Douala">Douala</option>
                    <option value="Yaounde">Yaounde</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Delivery Distance (Km)</label>
                  <Input 
                    type="number" 
                    min={1} 
                    max={50}
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(parseInt(e.target.value) || 1)}
                    className="font-bold bg-background"
                  />
                  <p className="text-[10px] text-muted-foreground">Affects traffic simulation and delivery cost.</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button className="flex-1" onClick={() => setStep(5)}>Review Order <ArrowRight className="h-4 w-4 ml-2" /></Button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Generate */}
          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2"><Truck className="h-5 w-5 text-accent"/> Generate Order Payload</h3>
              <div className="bg-card p-6 rounded-xl border border-accent/40 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full" />
                <h4 className="font-black text-xl mb-1 text-foreground">{selectedRecipe?.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">{servings} Servings • Delivering to {region} ({distanceKm}km)</p>
                
                <div className="space-y-2 mt-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">System Status</span>
                    <Badge className="bg-success/20 text-success border-success/30">Ready for dispatch</Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" disabled={isGenerating} onClick={() => setStep(3)}>Back</Button>
                <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isGenerating} onClick={handleGenerate}>
                  {isGenerating ? (
                    <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Compiling Physics...</span>
                  ) : (
                    <span className="flex items-center gap-2">Execute Order Simulation <ArrowRight className="h-4 w-4" /></span>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 6: Success */}
          {step === 6 && recentOrders[0] && (
            <motion.div key="step6" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8 space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-success/20 flex items-center justify-center text-success mb-4 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black text-foreground">Order Successfully Generated</h3>
              <p className="text-sm text-muted-foreground">Order ID: <strong className="text-foreground">{recentOrders[0].id}</strong></p>
              
              <div className="grid grid-cols-2 gap-4 mt-6 text-left">
                <div className="bg-muted/10 p-3 rounded-lg border border-border/40">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Total Value</p>
                  <p className="font-bold text-lg text-accent">{recentOrders[0].totalCost.toLocaleString()} XAF</p>
                </div>
                <div className="bg-muted/10 p-3 rounded-lg border border-border/40">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Profit Margin</p>
                  <p className="font-bold text-lg text-success">{recentOrders[0].margin.toLocaleString()} XAF</p>
                </div>
              </div>

              <Button className="w-full mt-6" variant="outline" onClick={() => { setStep(1); setRecipeId(recipes[0].id); }}>Create Another Order</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Settings2, ShieldAlert, CheckCircle2 } from "lucide-react";

export function BudgetAlgorithmSandbox() {
  const [testBudget, setTestBudget] = useState(15000);
  const [testFamilySize, setTestFamilySize] = useState(5);
  const [simulatedResult, setSimulatedResult] = useState<{
    algorithmConfidence: number;
    marginSafety: string;
    recommendedPlan: string;
    projectedMargin: number;
  } | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const runTest = () => {
    setIsTesting(true);
    setTimeout(() => {
      // Simulate algorithm processing
      const marginSafety = testBudget > 12000 ? "High" : testBudget > 8000 ? "Medium" : "Critical";
      const recommendedPlan = testBudget > 12000 ? "Family Power Plan" : "Aggressive Budget";
      
      setSimulatedResult({
        algorithmConfidence: 94,
        marginSafety,
        recommendedPlan,
        projectedMargin: testBudget * 0.35, // Mock 35% margin
      });
      setIsTesting(false);
    }, 800);
  };

  return (
    <Card className="glass border-warning/20 h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-warning" /> Budget Algorithm Sandbox
        </CardTitle>
        <p className="text-xs text-muted-foreground">Admin tool to stress-test the AI budget-matching logic with hypothetical user parameters.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="grid grid-cols-2 gap-4 bg-muted/10 p-4 rounded-xl border border-border/40">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1">Simulated User Budget (XAF)</label>
            <Input type="number" value={testBudget} onChange={(e) => setTestBudget(Number(e.target.value))} className="font-bold bg-background" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1">Simulated Family Size</label>
            <Input type="number" value={testFamilySize} onChange={(e) => setTestFamilySize(Number(e.target.value))} className="font-bold bg-background" />
          </div>
        </div>

        <Button className="w-full bg-warning hover:bg-warning/90 text-warning-foreground" onClick={runTest} disabled={isTesting}>
          {isTesting ? "Executing Logic Test..." : "Run AI Matching Algorithm"}
        </Button>

        {simulatedResult && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 pt-4 border-t border-border/40">
            <h4 className="text-sm font-bold flex items-center gap-2"><Settings2 className="h-4 w-4 text-muted-foreground" /> Algorithm Output Diagnostics</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card p-4 rounded-xl border border-border/40">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">System Recommendation</p>
                <p className="text-lg font-black text-foreground mt-1">{simulatedResult.recommendedPlan}</p>
                <Badge variant="outline" className="mt-2 bg-primary/10 text-primary border-primary/30">Confidence: {simulatedResult.algorithmConfidence}%</Badge>
              </div>
              
              <div className="bg-card p-4 rounded-xl border border-border/40">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Margin Safety Check</p>
                <div className="flex items-center gap-2 mt-1">
                  {simulatedResult.marginSafety === "Critical" ? (
                    <ShieldAlert className="h-6 w-6 text-destructive" />
                  ) : (
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  )}
                  <p className={`text-lg font-black ${simulatedResult.marginSafety === "Critical" ? "text-destructive" : "text-success"}`}>
                    {simulatedResult.marginSafety}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Projected Margin: {simulatedResult.projectedMargin.toLocaleString()} XAF</p>
              </div>
            </div>
            
            {simulatedResult.marginSafety === "Critical" && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-lg border border-destructive/20 text-xs flex items-center gap-2">
                <ShieldAlert className="h-4 w-4" /> 
                Algorithm Warning: This budget-to-size ratio yields unsustainably low margins. System will fallback to extreme budget ingredients.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, TrendingDown, Target, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AIOptimizationCenter() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showInsights] = useState(true);

  const insights = [
    {
      id: 1,
      type: "Budget Alert",
      icon: TrendingDown,
      color: "text-destructive",
      bg: "bg-destructive/10",
      title: "Recipe Exceeds Budget by 18%",
      desc: "Student Budget Jollof current raw cost is 4,500 XAF, exceeding the 3,800 XAF target due to frozen chicken price hikes.",
      action: "Replace Chicken with Smoked Fish",
      savings: "Save 700 XAF"
    },
    {
      id: 2,
      type: "Market Sourcing",
      icon: Target,
      color: "text-warning",
      bg: "bg-warning/10",
      title: "Sub-Optimal Sourcing Detected",
      desc: "You are sourcing Palm Oil from Douala Marche. Buea Central currently has a 15% lower wholesale rate.",
      action: "Switch Supplier to Buea Central",
      savings: "Increase Margin by 4%"
    },
    {
      id: 3,
      type: "Logistics Optimization",
      icon: Zap,
      color: "text-primary",
      bg: "bg-primary/10",
      title: "Delivery Fleet Inefficiency",
      desc: "There are 4 pending orders to the exact same region (Molyko). Dispatching them individually wastes fuel.",
      action: "Batch 4 Orders into 1 Dispatch",
      savings: "Reduce Delivery Cost by 60%"
    }
  ];

  const handleApply = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      // In a real app, we'd remove the insight or mark it as applied
    }, 1000);
  };

  return (
    <Card className="glass relative overflow-hidden border-primary/30 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
      <div className="absolute top-0 right-0 p-3 opacity-20 pointer-events-none">
        <Sparkles className="h-24 w-24 text-primary" />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" /> Copilot Optimization Center
        </CardTitle>
        <p className="text-xs text-muted-foreground">AI-driven actionable insights analyzing your recipes, orders, and delivery fleet in real-time.</p>
      </CardHeader>
      
      <CardContent>
        <AnimatePresence>
          {showInsights ? (
            <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {insights.map((insight) => (
                <div key={insight.id} className="bg-card border border-border/40 p-4 rounded-xl flex flex-col md:flex-row gap-4 justify-between hover:bg-muted/5 transition-colors">
                  <div className="flex gap-4">
                    <div className={`mt-1 h-10 w-10 shrink-0 rounded-full ${insight.bg} ${insight.color} flex items-center justify-center`}>
                      <insight.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={`text-[10px] ${insight.color} border-${insight.color.replace('text-', '')}/30`}>
                          {insight.type}
                        </Badge>
                        <h4 className="font-bold text-foreground">{insight.title}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">{insight.desc}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end justify-center shrink-0 border-t md:border-t-0 md:border-l border-border/40 pt-3 md:pt-0 md:pl-4 mt-2 md:mt-0 gap-2">
                    <span className="text-[10px] font-bold uppercase text-success bg-success/10 px-2 py-1 rounded-md">{insight.savings}</span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full md:w-auto text-xs hover:bg-primary hover:text-primary-foreground border-primary/30"
                      onClick={() => handleApply()}
                      disabled={isOptimizing}
                    >
                      {isOptimizing ? <RefreshCw className="h-3 w-3 animate-spin" /> : insight.action}
                    </Button>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center text-success mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">System Fully Optimized</h3>
              <p className="text-muted-foreground text-sm">No new actionable insights detected at this moment.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

// Needed to avoid undefined error in JSX above
import { CheckCircle2 } from "lucide-react";

"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ChefHat, ShoppingBag, Store, Calculator, Truck, CheckCircle2, ArrowRight } from "lucide-react";

const STAGES = [
  { id: 1, name: "Recipe Parsing", icon: ChefHat, metric: "240ms", status: "Active", desc: "Analyzing components" },
  { id: 2, name: "Ingredient Mapping", icon: ShoppingBag, metric: "12 Items", status: "Active", desc: "Sourcing raw materials" },
  { id: 3, name: "Market Intelligence", icon: Store, metric: "Live", status: "Active", desc: "Fetching real-time prices" },
  { id: 4, name: "Cost Engine", icon: Calculator, metric: "Calculated", status: "Active", desc: "Computing margins" },
  { id: 5, name: "Logistics Sync", icon: Truck, metric: "5km Route", status: "Active", desc: "Estimating delivery" },
  { id: 6, name: "Order Generation", icon: CheckCircle2, metric: "Success", status: "Completed", desc: "Finalizing payload" }
];

export function PipelineVisualizer() {
  const [activeStage, setActiveStage] = useState(1);

  // Auto-simulate pipeline
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage(prev => (prev >= 6 ? 1 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass overflow-hidden border-primary/20">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <ArrowRight className="h-6 w-6 text-primary" /> Live Automation Pipeline
        </CardTitle>
        <p className="text-xs text-muted-foreground">Real-time visualization of the smart recipe-to-order workflow execution.</p>
      </CardHeader>
      <CardContent>
        <div className="relative pt-8 pb-16 px-4 sm:px-12 overflow-x-auto custom-scrollbar">
          
          {/* Connecting Line Background */}
          <div className="absolute top-20 left-12 right-12 h-1 bg-muted/30 z-0 hidden sm:block" />
          
          {/* Animated Progress Line */}
          <motion.div 
            className="absolute top-20 left-12 h-1 bg-primary z-0 hidden sm:block"
            initial={{ width: "0%" }}
            animate={{ width: `${((activeStage - 1) / 5) * 100}%` }}
            transition={{ duration: 0.5 }}
          />

          <div className="flex flex-col sm:flex-row justify-between relative z-10 gap-8 sm:gap-4 min-w-[600px]">
            {STAGES.map((stage) => {
              const isActive = stage.id === activeStage;
              const isPast = stage.id < activeStage;
              
              let bgColor = "bg-card border-border/40 text-muted-foreground";
              if (isActive) bgColor = "bg-primary border-primary text-primary-foreground shadow-[0_0_20px_rgba(139,92,246,0.4)]";
              else if (isPast) bgColor = "bg-primary/20 border-primary text-primary";

              return (
                <div key={stage.id} className="flex flex-col items-center w-32 shrink-0">
                  <motion.div 
                    className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${bgColor}`}
                    animate={{ scale: isActive ? 1.1 : 1 }}
                  >
                    <stage.icon className="h-6 w-6" />
                  </motion.div>
                  
                  <div className="text-center mt-4">
                    <p className={`text-xs font-bold ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{stage.name}</p>
                    <p className="text-[9px] text-muted-foreground mt-1 max-w-[100px] mx-auto">{stage.desc}</p>
                    <Badge variant="outline" className={`mt-2 text-[9px] px-1.5 py-0 bg-background ${isActive ? 'border-primary text-primary' : 'border-border/40'}`}>
                      {stage.metric}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-muted/10 p-4 rounded-xl border border-border/40 mt-4 text-center">
          <p className="text-sm font-semibold flex items-center justify-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            System Status: Healthy & Processing Orders
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

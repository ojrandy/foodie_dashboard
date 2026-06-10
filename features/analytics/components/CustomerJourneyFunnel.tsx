import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Users, Eye, ShoppingCart, Repeat, Star } from "lucide-react";
import { motion } from "framer-motion";

export function CustomerJourneyFunnel() {
  const steps = [
    { label: "Visits", count: 25000, conv: null, icon: Eye, color: "bg-slate-500" },
    { label: "Signups", count: 8500, conv: 34, icon: Users, color: "bg-blue-500" },
    { label: "First Order", count: 4200, conv: 49, icon: ShoppingCart, color: "bg-indigo-500" },
    { label: "Repeat Order", count: 2100, conv: 50, icon: Repeat, color: "bg-violet-500" },
    { label: "Loyal", count: 850, conv: 40, icon: Star, color: "bg-fuchsia-500" },
  ];

  const maxCount = steps[0].count;

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Filter className="h-5 w-5 text-indigo-500" /> Journey Funnel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 pt-4">
          {steps.map((step, i) => {
            const width = Math.max((step.count / maxCount) * 100, 15); // min 15% width for visibility
            
            return (
              <div key={i} className="relative">
                {/* Conversion connecting line */}
                {i > 0 && (
                  <div className="absolute -top-6 left-6 flex items-center gap-2 text-[10px] font-bold text-muted-foreground z-10">
                    <div className="w-4 h-full border-l border-b border-border/40 rounded-bl-lg" />
                    {step.conv}% Conversion
                  </div>
                )}
                
                <div className="flex items-center gap-4 relative z-20">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="flex items-center gap-1.5"><step.icon className="h-3 w-3 text-muted-foreground" /> {step.label}</span>
                      <span>{step.count.toLocaleString()}</span>
                    </div>
                    <div className="h-3 w-full bg-muted/30 rounded-full overflow-hidden flex justify-end">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${width}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                        className={`h-full rounded-full ${step.color}`}
                        style={{ alignSelf: "flex-end" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

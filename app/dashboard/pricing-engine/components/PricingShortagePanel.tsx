"use client";

import { useState } from "react";
import { Sparkles, MousePointerClick } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CommodityPrice } from "../types";
import { CommodityInsightModal } from "./CommodityInsightModal";

interface PricingShortagePanelProps {
  commodities: CommodityPrice[];
}

export function PricingShortagePanel({ commodities }: PricingShortagePanelProps) {
  const [activeCommodity, setActiveCommodity] = useState<CommodityPrice | null>(null);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);

  // Take the top 4 most volatile commodities for the panel
  const sortedByRisk = [...commodities].sort((a, b) => b.shortageProbability - a.shortageProbability);
  const top4Risk = sortedByRisk.slice(0, 4);

  return (
    <>
      <Card className="lg:col-span-4 glass relative group">
        <CardHeader>
          <CardTitle 
            className="text-lg font-bold flex items-center justify-between cursor-pointer hover:text-accent transition-colors"
            onClick={() => setIsViewAllOpen(true)}
          >
            <span className="flex items-center gap-1.5"><Sparkles className="h-5 w-5 text-accent" /> AI Shortage Predictor</span>
            <MousePointerClick className="h-4 w-4 text-muted-foreground opacity-50" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 relative">
          {top4Risk.map((com) => (
            <div
              key={com.id}
              onClick={() => setActiveCommodity(com)}
              className="p-3.5 rounded-xl border border-border/40 bg-muted/20 glass space-y-2 cursor-pointer transition-all duration-200 hover:border-accent/50 hover:bg-accent/5 group/item relative overflow-hidden"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-transparent group-hover/item:bg-accent transition-colors duration-200" />
              
              <div className="flex justify-between items-start pl-1">
                <div>
                  <h4 className="text-xs font-bold text-foreground group-hover/item:text-accent transition-colors">{com.name}</h4>
                  <span className="text-[10px] text-muted-foreground">
                    Updated {com.lastUpdated}
                  </span>
                </div>
                <Badge
                  className={
                    com.shortageProbability > 60
                      ? "bg-destructive/10 text-destructive border border-destructive/20"
                      : com.shortageProbability > 30
                      ? "bg-warning/10 text-warning border border-warning/20"
                      : "bg-success/10 text-success border border-success/20"
                  }
                >
                  {com.shortageProbability}% Risk
                </Badge>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden ml-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${com.shortageProbability}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    com.shortageProbability > 60
                      ? "bg-destructive"
                      : com.shortageProbability > 30
                      ? "bg-warning"
                      : "bg-success"
                  }`}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <CommodityInsightModal 
        commodity={activeCommodity} 
        onClose={() => setActiveCommodity(null)} 
      />

      {/* Massive View All Modal */}
      {isViewAllOpen && (
        <div className="fixed inset-0 z-[900] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md" 
            onClick={() => setIsViewAllOpen(false)}
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative z-[950] w-[90vw] md:w-[75vw] h-[85vh] bg-card border border-border/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-border/40 bg-muted/20 flex justify-between items-center shrink-0">
              <div>
                <h2 className="text-2xl font-extrabold flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-accent" /> Complete AI Shortage Projections
                </h2>
                <p className="text-muted-foreground text-sm mt-1">Live national grid of all tracked commodities ranked by risk.</p>
              </div>
              <button onClick={() => setIsViewAllOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                <MousePointerClick className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {sortedByRisk.map((com) => (
                <div
                  key={`all-${com.id}`}
                  onClick={() => setActiveCommodity(com)}
                  className="p-4 rounded-xl border border-border/40 bg-muted/10 space-y-3 cursor-pointer transition-all hover:border-accent/50 hover:bg-accent/5 group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">{com.name}</h4>
                      <span className="text-xs text-muted-foreground">{com.category}</span>
                    </div>
                    <Badge
                      className={
                        com.shortageProbability > 60
                          ? "bg-destructive/10 text-destructive border-destructive/20"
                          : com.shortageProbability > 30
                          ? "bg-warning/10 text-warning border-warning/20"
                          : "bg-success/10 text-success border-success/20"
                      }
                    >
                      {com.shortageProbability}% Risk
                    </Badge>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      style={{ width: `${com.shortageProbability}%` }}
                      className={`h-full rounded-full ${
                        com.shortageProbability > 60 ? "bg-destructive" : com.shortageProbability > 30 ? "bg-warning" : "bg-success"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

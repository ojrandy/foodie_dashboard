"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, TrendingDown, Clock, ShieldAlert, Zap, Banknote, ThumbsUp, ThumbsDown, CheckCircle2, Activity, MapPin, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommodityPrice } from "../types";

interface CommodityInsightModalProps {
  commodity: CommodityPrice | null;
  onClose: () => void;
}

export function CommodityInsightModal({ commodity, onClose }: CommodityInsightModalProps) {
  const [feedbackState, setFeedbackState] = useState<"idle" | "liked" | "disliked">("idle");

  // Reset feedback state when a new commodity is opened
  useEffect(() => {
    if (commodity) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFeedbackState("idle");
    }
  }, [commodity]);

  // We removed the early return null to allow AnimatePresence to handle exit animations
  
  // Mock AI reasoning based on category and shortage risk
  const getAIReasoning = (com: CommodityPrice) => {
    const base = {
      confidence: Math.round(75 + (com.shortageProbability / 4)),
      affectedRegions: com.bueaPrice > com.doualaPrice ? "South West (Severe)" : "Littoral (Moderate)",
      alternatives: [] as string[]
    };

    if (com.category === "Tubers") {
      return {
        ...base,
        alternatives: ["Irish Potatoes", "Plantains", "Yams"],
        reason: "Transitioning out of primary harvest season. Supply from the South West region is dropping by 14% weekly due to delayed replanting cycles.",
        duration: "Next 3-4 weeks",
        action: "Establish bulk advance orders with cooperatives in the Littoral region immediately."
      };
    } else if (com.category === "Vegetables" && com.trend === "up") {
      return {
        ...base,
        alternatives: ["Frozen Mixed Veg", "Green Beans", "Cabbage"],
        reason: "Heavy off-season rainfall is damaging open-field vegetable crops, causing localized scarcity and rotting during transport.",
        duration: "Next 2 weeks",
        action: "Switch partially to greenhouse-grown suppliers or substitute with frozen alternatives."
      };
    } else if (com.category === "Oils") {
      return {
        ...base,
        alternatives: ["Soybean Oil", "Groundnut Oil"],
        reason: "Global market stability and localized oversupply in Douala are driving favorable pricing. Refinery outputs are at 92% capacity.",
        duration: "Stable for next 2 months",
        action: "Maintain current order volumes. No urgent stockpiling required."
      };
    } else if (com.shortageProbability > 60) {
      return {
        ...base,
        alternatives: ["Check Cross-Category Proteins", "Imported Reserves"],
        reason: "Severe transport delays from the North West region due to road conditions and security checkpoints. Local hoarding detected.",
        duration: "Unknown timeframe",
        action: "CRITICAL: Secure alternative suppliers in Yaounde/Centre region within 48 hours."
      };
    }
    return {
      ...base,
      alternatives: ["Standard Substitutes"],
      reason: "Standard seasonal supply variations. No extreme market conditions or anomalies detected in the logistics chain at this time.",
      duration: "Variable",
      action: "Continue standard re-order protocols."
    };
  };

  const insights = commodity ? getAIReasoning(commodity) : null;
  const avgPrice = commodity ? Math.round((commodity.bueaPrice + commodity.doualaPrice + commodity.yaoundePrice) / 3) : 0;

  return (
    <AnimatePresence>
      {commodity && insights && (
        <React.Fragment key="insight-modal-wrapper">
          <motion.div 
            key="insight-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-[1000]"
          />
          <motion.div 
            key="insight-content"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-card border border-border/40 rounded-2xl glass shadow-2xl z-[1050] overflow-hidden flex flex-col max-h-[90vh]"
          >
        {/* Header Section */}
        <div className="bg-muted/30 border-b border-border/40 p-5 flex justify-between items-center relative overflow-hidden shrink-0">
          <div className={`absolute inset-0 opacity-15 bg-gradient-to-r ${
            commodity.shortageProbability > 60 ? "from-destructive to-transparent" : 
            commodity.trend === "down" ? "from-success to-transparent" : "from-accent to-transparent"
          }`} />
          
          <div className="relative z-10 flex items-center gap-3">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
              commodity.shortageProbability > 60 ? "bg-destructive/20 text-destructive" : 
              commodity.trend === "down" ? "bg-success/20 text-success" : "bg-accent/20 text-accent"
            }`}>
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-foreground tracking-tight">{commodity.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold bg-background/50 px-2 py-0.5 rounded-full border border-border/50">
                  {commodity.category}
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold bg-background/50 px-2 py-0.5 rounded-full border border-border/50">
                  {commodity.unit}
                </span>
              </div>
            </div>
          </div>
          <Button size="icon" variant="ghost" onClick={onClose} className="relative z-10 hover:bg-background/80 rounded-full h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content Scrollable Area */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Top Metrics Row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card border border-border/50 rounded-xl p-4 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold flex items-center gap-1.5 mb-2">
                <Banknote className="h-3 w-3 text-accent" /> Nat. Average
              </span>
              <p className="text-2xl font-extrabold text-foreground">{avgPrice.toLocaleString()} <span className="text-sm font-semibold text-muted-foreground">XAF</span></p>
            </div>
            
            <div className={`border rounded-xl p-4 shadow-sm flex flex-col justify-between ${
              commodity.trend === "up" ? "bg-destructive/5 border-destructive/20" : 
              commodity.trend === "down" ? "bg-success/5 border-success/20" : "bg-muted/10 border-border/40"
            }`}>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold flex items-center gap-1.5 mb-2">
                {commodity.trend === "up" ? <TrendingUp className="h-3 w-3 text-destructive" /> : 
                 commodity.trend === "down" ? <TrendingDown className="h-3 w-3 text-success" /> : 
                 <Activity className="h-3 w-3 text-muted-foreground" />} Trend
              </span>
              <p className={`text-xl font-extrabold ${
                commodity.trend === "up" ? "text-destructive" : 
                commodity.trend === "down" ? "text-success" : "text-foreground"
              }`}>
                {commodity.trend === "up" ? "+ Inflating" : 
                 commodity.trend === "down" ? "- Deflating" : "Stable"}
              </p>
            </div>

            <div className="bg-card border border-border/50 rounded-xl p-4 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold flex items-center gap-1.5 mb-2">
                <Activity className="h-3 w-3 text-accent" /> AI Confidence
              </span>
              <div className="flex items-end gap-1">
                <p className="text-2xl font-extrabold text-accent">{insights.confidence}%</p>
              </div>
            </div>
          </div>

          {/* Core AI Intelligence */}
          <div className="bg-muted/10 border border-border/40 rounded-xl p-5 space-y-4 shadow-inner">
            <h4 className="text-xs font-bold uppercase text-accent tracking-widest flex items-center gap-2 border-b border-border/40 pb-3">
              <Zap className="h-4 w-4" /> Market Intelligence Report
            </h4>
            
            <p className="text-[15px] text-foreground leading-relaxed font-medium">
              {insights.reason}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-background/50 p-3 rounded-lg border border-border/30">
                <h5 className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest flex items-center gap-1.5 mb-1">
                  <MapPin className="h-3 w-3" /> Most Affected Hub
                </h5>
                <p className="text-sm font-semibold">{insights.affectedRegions}</p>
              </div>
              <div className="bg-background/50 p-3 rounded-lg border border-border/30">
                <h5 className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest flex items-center gap-1.5 mb-1">
                  <Shuffle className="h-3 w-3" /> Viable Alternatives
                </h5>
                <p className="text-sm font-semibold">{insights.alternatives.join(", ")}</p>
              </div>
            </div>
          </div>
          
          {/* Action Plan */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4">
            <div className="border border-border/40 rounded-xl p-4 bg-card shadow-sm">
              <h4 className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest flex items-center gap-1.5 mb-2">
                <Clock className="h-3 w-3" /> Expected Duration
              </h4>
              <p className="text-sm font-bold text-foreground">{insights.duration}</p>
            </div>
            <div className={`border rounded-xl p-4 shadow-sm ${commodity.shortageProbability > 60 ? "bg-destructive/5 border-destructive/30" : "bg-card border-border/40"}`}>
              <h4 className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 mb-2 ${commodity.shortageProbability > 60 ? "text-destructive" : "text-muted-foreground"}`}>
                <ShieldAlert className="h-3 w-3" /> Recommended Strategy
              </h4>
              <p className={`text-sm font-bold ${commodity.shortageProbability > 60 ? "text-destructive" : "text-foreground"}`}>
                {insights.action}
              </p>
            </div>
          </div>

        </div>

        {/* Footer & Feedback System */}
        <div className="bg-muted/30 border-t border-border/40 p-4 shrink-0 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-3">
            {feedbackState === "idle" ? (
              <>
                <span className="text-xs font-semibold text-muted-foreground">Was this insight helpful?</span>
                <div className="flex gap-1.5">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 rounded-full border-border/50 text-muted-foreground hover:text-success hover:border-success/50 hover:bg-success/10"
                    onClick={() => setFeedbackState("liked")}
                  >
                    <ThumbsUp className="h-3.5 w-3.5 mr-1" /> Yes
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 rounded-full border-border/50 text-muted-foreground hover:text-destructive hover:border-destructive/50 hover:bg-destructive/10"
                    onClick={() => setFeedbackState("disliked")}
                  >
                    <ThumbsDown className="h-3.5 w-3.5 mr-1" /> No
                  </Button>
                </div>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="flex items-center gap-2 text-xs font-bold text-success bg-success/10 px-3 py-1.5 rounded-full border border-success/20"
              >
                <CheckCircle2 className="h-4 w-4" />
                Thanks for improving our AI Model!
              </motion.div>
            )}
          </div>

          <Button onClick={onClose} className="h-9 px-6 font-bold shadow-md">Close Report</Button>
        </div>
      </motion.div>
      </React.Fragment>
      )}
    </AnimatePresence>
  );
}

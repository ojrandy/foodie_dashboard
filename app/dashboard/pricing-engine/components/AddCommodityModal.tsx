"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CommodityPrice } from "../types";

interface AddCommodityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (commodity: CommodityPrice) => void;
}

export function AddCommodityModal({ isOpen, onClose, onAdd }: AddCommodityModalProps) {
  const [newName, setNewName] = useState("");
  const [newUnit, setNewUnit] = useState("Sack");
  const [newCategory, setNewCategory] = useState<CommodityPrice["category"]>("Vegetables");
  
  // Market Selection
  const [targetMarket, setTargetMarket] = useState<"Buea" | "Douala" | "Yaounde">("Buea");
  const [marketPrice, setMarketPrice] = useState(5000);
  const [newShortage, setNewShortage] = useState(30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast.error("Please provide a valid commodity name");
      return;
    }

    // Since they are recording price for one specific market, we mock the other two based on it to keep the app functional
    let bueaPrice = marketPrice;
    let doualaPrice = marketPrice * 1.1; // mock slightly higher
    let yaoundePrice = marketPrice * 1.05;

    if (targetMarket === "Douala") {
      bueaPrice = marketPrice * 0.9;
      doualaPrice = marketPrice;
      yaoundePrice = marketPrice * 0.95;
    } else if (targetMarket === "Yaounde") {
      bueaPrice = marketPrice * 0.95;
      doualaPrice = marketPrice * 1.05;
      yaoundePrice = marketPrice;
    }

    const newCom: CommodityPrice = {
      id: `com-${Date.now()}`,
      name: newName,
      unit: newUnit,
      category: newCategory,
      bueaPrice: Math.round(bueaPrice),
      doualaPrice: Math.round(doualaPrice),
      yaoundePrice: Math.round(yaoundePrice),
      shortageProbability: newShortage,
      trend: newShortage > 50 ? "up" : "stable",
      lastUpdated: "Just now"
    };

    onAdd(newCom);
    toast.success(`${newName} index added for ${targetMarket} market.`);
    setNewName("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[900]"
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-card border border-border/40 p-6 rounded-2xl glass shadow-2xl z-[950]"
          >
            <div className="flex justify-between items-center border-b border-border/40 pb-4 mb-4">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-1.5">
                <Sparkles className="h-5 w-5 text-accent" /> Record Market Price
              </h3>
              <Button size="icon" variant="ghost" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wide">Commodity Name *</label>
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. White Beans Sack..." className="bg-muted/30 focus-visible:ring-accent/30" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wide">Unit</label>
                  <Input value={newUnit} onChange={(e) => setNewUnit(e.target.value)} placeholder="e.g. 50kg Bag" className="bg-muted/30 focus-visible:ring-accent/30" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wide">Category</label>
                  <select value={newCategory} onChange={(e: any) => setNewCategory(e.target.value)} className="bg-muted/30 border border-border/40 rounded-lg p-2.5 text-foreground">
                    <option value="Vegetables">Vegetables</option>
                    <option value="Tubers">Tubers</option>
                    <option value="Oils">Oils</option>
                    <option value="Proteins">Proteins</option>
                    <option value="Spices">Spices</option>
                    <option value="Grains">Grains</option>
                  </select>
                </div>
              </div>

              {/* Advanced Market Selection */}
              <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 mt-2 space-y-4">
                <h4 className="font-bold text-accent uppercase tracking-wide flex items-center gap-1.5 border-b border-accent/20 pb-2">
                  <MapPin className="h-3 w-3" /> Market Context
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-muted-foreground uppercase tracking-wide">Source Market</label>
                    <select value={targetMarket} onChange={(e: any) => setTargetMarket(e.target.value)} className="bg-muted/50 border border-border/40 rounded-lg p-2.5 text-foreground font-bold">
                      <option value="Buea">Buea Central Market</option>
                      <option value="Douala">Douala Sandaga Market</option>
                      <option value="Yaounde">Yaounde Mokolo Market</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-muted-foreground uppercase tracking-wide">Observed Price (XAF)</label>
                    <Input type="number" value={marketPrice} onChange={(e) => setMarketPrice(parseInt(e.target.value)||0)} className="bg-background border-accent/30 font-bold" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wide flex justify-between">
                  <span>Estimated Shortage Risk %</span>
                  <span className={newShortage > 50 ? "text-destructive" : "text-success"}>{newShortage}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={newShortage} 
                  onChange={(e) => setNewShortage(parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
              
              <Button type="submit" className="w-full mt-4 gap-2 h-10">
                <Sparkles className="h-4 w-4" /> Deploy Index Update
              </Button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

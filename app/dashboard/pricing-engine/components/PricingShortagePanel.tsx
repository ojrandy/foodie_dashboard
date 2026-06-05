"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CommodityPrice } from "../types";

interface PricingShortagePanelProps {
  commodities: CommodityPrice[];
}

export function PricingShortagePanel({ commodities }: PricingShortagePanelProps) {
  return (
    <Card className="lg:col-span-4 glass">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-1.5">
          <Sparkles className="h-5 w-5 text-accent" /> AI Shortage Predictor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {commodities.slice(0, 4).map((com) => (
          <div
            key={com.id}
            className="p-3.5 rounded-xl border border-border/40 bg-muted/20 glass space-y-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-xs font-bold text-foreground">{com.name}</h4>
                <span className="text-[10px] text-muted-foreground">
                  Updated {com.lastUpdated}
                </span>
              </div>
              <Badge
                className={
                  com.shortageProbability > 60
                    ? "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/10"
                    : com.shortageProbability > 30
                    ? "bg-warning/10 text-warning border border-warning/20 hover:bg-warning/10"
                    : "bg-success/10 text-success border border-success/20 hover:bg-success/10"
                }
              >
                {com.shortageProbability}% Risk
              </Badge>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
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
  );
}

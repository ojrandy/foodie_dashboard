"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Carrot, Beef, ChefHat, Leaf, type LucideIcon } from "lucide-react";

type Insight = {
  icon: LucideIcon;
  text: string;
  color: string;
  bg: string;
};

const INSIGHTS: Insight[] = [
  { icon: Carrot, text: "Did you know? Carrots were originally purple before cultivation.", color: "text-orange-500", bg: "bg-orange-500/10" },
  { icon: Beef, text: "Calculating optimal cold-chain logistics for fresh meats...", color: "text-rose-500", bg: "bg-rose-500/10" },
  { icon: Leaf, text: "Analyzing regional harvest data for pricing predictions...", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: ChefHat, text: "Orchestrating kitchen capacity and dispatchers...", color: "text-accent", bg: "bg-accent/10" },
];

export function GlobalPreloader() {
  const [isFading, setIsFading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Pick a random starting insight
    const randomStartIndex = Math.floor(Math.random() * INSIGHTS.length);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentIndex(randomStartIndex);

    // Guaranteed bulletproof unmount sequence independent of animation frameworks
    const fadeTimeout = setTimeout(() => {
      setIsFading(true);
    }, 1500); // Start fade out at 1.5s

    const removeTimeout = setTimeout(() => {
      setIsComplete(true);
    }, 2000); // Fully unmount at 2.0s

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(removeTimeout);
    };
  }, []);

  if (isComplete) return null;

  const currentInsight = INSIGHTS[currentIndex];
  const Icon = currentInsight.icon;

  return (
    <div
      className={`hidden md:flex fixed inset-0 z-[9999] flex-col items-center justify-center bg-background transition-opacity duration-500 ease-in-out ${isFading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div className="relative flex flex-col items-center justify-center gap-8 w-full max-w-md px-6 text-center">
        {/* Static Icon */}
        <div>
          <div 
            className={`p-5 rounded-full shadow-xl border border-border/30 ${currentInsight.bg} ${currentInsight.color}`}
          >
            <Icon className="h-12 w-12" />
          </div>
        </div>

        {/* Insight Text */}
        <div className="h-16 flex items-center justify-center">
          <p className="text-sm font-medium text-muted-foreground leading-relaxed">
            {currentInsight.text}
          </p>
        </div>

        {/* Loading Progress bar (fast fill) */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden mt-4">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "linear" }}
            className="h-full bg-accent" 
          />
        </div>
      </div>
    </div>
  );
}

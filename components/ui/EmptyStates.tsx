"use client";

import { motion } from "framer-motion";
import { FileSearch, UtensilsCrossed, type LucideIcon } from "lucide-react";

export function EmptyState({ title, description, icon: Icon = FileSearch }: { title: string, description: string, icon?: LucideIcon }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-border/40 bg-card/20 glass"
    >
      <div className="h-16 w-16 bg-muted/40 rounded-full flex items-center justify-center mb-4 text-muted-foreground">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-bold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mt-2">{description}</p>
    </motion.div>
  );
}

export function EmptyFoodState({ title, description }: { title: string, description: string }) {
  return <EmptyState title={title} description={description} icon={UtensilsCrossed} />;
}

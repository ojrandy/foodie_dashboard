"use client";

import { motion } from "framer-motion";
import { AlertOctagon, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ErrorState({ title, description, onRetry }: { title: string, description: string, onRetry?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-10 text-center rounded-xl border border-destructive/20 bg-destructive/5 glass"
    >
      <div className="h-16 w-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4 text-destructive">
        <AlertOctagon className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-bold text-destructive">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mt-2 mb-6">{description}</p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2 border-destructive/30 hover:bg-destructive/10 text-destructive">
          <RotateCcw className="h-4 w-4" />
          Retry Request
        </Button>
      )}
    </motion.div>
  );
}

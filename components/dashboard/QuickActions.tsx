"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ReceiptText, ChefHat, Truck, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuickActions() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: ReceiptText, label: "Add Order", color: "bg-accent", text: "text-accent-foreground", delay: 0.05 },
    { icon: ChefHat, label: "Create Recipe", color: "bg-muted-foreground/30", text: "text-foreground", delay: 0.1 },
    { icon: DollarSign, label: "Update Prices", color: "bg-muted-foreground/20", text: "text-foreground", delay: 0.15 },
    { icon: Truck, label: "Dispatch Rider", color: "bg-destructive", text: "text-destructive-foreground", delay: 0.2 },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      {/* Floating Staggered Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-end gap-3 mb-2">
            {actions.map((action, i) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.9 }}
                transition={{ duration: 0.18, delay: action.delay }}
                className="flex items-center gap-3 group cursor-pointer"
              >
                {/* Action Tag Description */}
                <span className="bg-card px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md border border-border/80 text-foreground transition-transform group-hover:scale-105">
                  {action.label}
                </span>
                
                {/* Icon Button */}
                <Button
                  size="icon"
                  className={`${action.color} ${action.text} hover:opacity-90 rounded-full h-11 w-11 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center`}
                >
                  <action.icon className="h-4.5 w-4.5" />
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="h-13 w-13 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl hover:shadow-2xl transition-all flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center justify-center"
          >
            <Plus className="h-6 w-6" />
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
}

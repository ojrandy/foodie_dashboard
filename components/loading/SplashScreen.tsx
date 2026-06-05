"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Carrot, Beef, Leaf, UtensilsCrossed, PackageSearch } from "lucide-react";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Guaranteed bulletproof unmount sequence
    // It's lightning fast and doesn't rely on heavy animation hooks
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 1800); // Fully fades out at 1.8s

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background pointer-events-none"
        >
          <div className="flex flex-col items-center gap-8 px-6 text-center w-full max-w-sm">
            {/* Header / Logo Area */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-accent to-glow-2 flex items-center justify-center shadow-lg shadow-accent/20 mb-2">
                <PackageSearch className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-accent to-glow-2 bg-clip-text text-transparent">
                FoodOps AI
              </h1>
              <p className="text-sm font-medium text-muted-foreground">
                Smart Food Intelligence Platform
              </p>
            </motion.div>

            {/* Subtle Food Icons */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-5 text-muted-foreground/50"
            >
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}>
                <Carrot className="h-5 w-5" />
              </motion.div>
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}>
                <Beef className="h-5 w-5" />
              </motion.div>
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                <Leaf className="h-5 w-5" />
              </motion.div>
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}>
                <UtensilsCrossed className="h-5 w-5" />
              </motion.div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="w-full flex flex-col items-center gap-3 mt-4"
            >
              <p className="text-xs text-muted-foreground animate-pulse">
                Loading Dashboard...
              </p>
              <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, ease: "linear", delay: 0.2 }}
                  className="h-full bg-accent" 
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

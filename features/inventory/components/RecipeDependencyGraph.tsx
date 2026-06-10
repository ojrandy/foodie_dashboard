import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Network, AlertTriangle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_RECIPES = [
  { 
    id: "R1", 
    name: "Egusi Soup", 
    risk: "Medium",
    ingredients: [
      { name: "Egusi", status: "Low Supply" },
      { name: "Fish", status: "Critical" },
      { name: "Palm Oil", status: "Out of Stock" },
      { name: "Pepper", status: "Available" }
    ]
  },
  { 
    id: "R2", 
    name: "Ndole", 
    risk: "High",
    ingredients: [
      { name: "Bitterleaf", status: "Available" },
      { name: "Groundnuts", status: "Available" },
      { name: "Beef", status: "Low Supply" },
      { name: "Plantains", status: "Available" }
    ]
  },
  { 
    id: "R3", 
    name: "Jollof Rice", 
    risk: "Low",
    ingredients: [
      { name: "Rice", status: "Available" },
      { name: "Tomatoes", status: "Low Supply" },
      { name: "Chicken", status: "Available" },
      { name: "Onions", status: "Available" }
    ]
  }
];

export function RecipeDependencyGraph() {
  const [activeRecipe, setActiveRecipe] = useState(MOCK_RECIPES[0]);

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Network className="h-5 w-5 text-indigo-500" /> Recipe Dependencies
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-4 mb-4">
          {MOCK_RECIPES.map(recipe => (
            <button
              key={recipe.id}
              onClick={() => setActiveRecipe(recipe)}
              className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeRecipe.id === recipe.id ? "bg-indigo-500/20 text-indigo-500 border border-indigo-500/30" : "bg-muted/20 text-muted-foreground hover:bg-muted/40 border border-border/40"
              }`}
            >
              {recipe.name}
            </button>
          ))}
        </div>

        <div className="relative h-[220px] bg-muted/5 rounded-xl border border-border/40 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRecipe.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Center Recipe Node */}
              <div className="absolute z-20 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-card border-2 border-indigo-500 flex items-center justify-center shadow-lg z-20 relative">
                  <span className="text-[10px] font-black text-center leading-tight px-1">{activeRecipe.name}</span>
                </div>
              </div>

              {/* Connecting Lines & Ingredients */}
              {activeRecipe.ingredients.map((ing, i) => {
                const angle = (i * (360 / activeRecipe.ingredients.length)) * (Math.PI / 180);
                const radius = 80;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                const color = ing.status === "Available" ? "text-success border-success bg-success/10" :
                              ing.status === "Low Supply" ? "text-warning border-warning bg-warning/10" :
                              "text-destructive border-destructive bg-destructive/10";

                return (
                  <React.Fragment key={ing.name}>
                    {/* SVG Line connecting center to node */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                      <line 
                        x1="50%" y1="50%" 
                        x2={`calc(50% + ${x}px)`} y2={`calc(50% + ${y}px)`} 
                        stroke="rgba(148, 163, 184, 0.2)" 
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                    </svg>
                    
                    <motion.div
                      initial={{ scale: 0, x: 0, y: 0 }}
                      animate={{ scale: 1, x, y }}
                      transition={{ delay: i * 0.1, type: "spring" }}
                      className="absolute z-10"
                    >
                      <div className={`px-3 py-1.5 rounded-lg border backdrop-blur-md shadow-sm flex flex-col items-center justify-center gap-1 ${color}`}>
                        <span className="text-[10px] font-bold whitespace-nowrap">{ing.name}</span>
                        {ing.status === "Available" ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                      </div>
                    </motion.div>
                  </React.Fragment>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

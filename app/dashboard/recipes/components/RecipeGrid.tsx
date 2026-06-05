"use client";

import {
  Clock, Flame, ChefHat, Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Recipe } from "../types";

interface RecipeGridProps {
  recipes: Recipe[];
  onDelete: (id: string) => void;
}

export function RecipeGrid({ recipes, onDelete }: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 border border-dashed border-border/40 rounded-xl glass">
        <ChefHat className="h-12 w-12 text-muted-foreground animate-pulse mb-3" />
        <h3 className="text-lg font-bold text-foreground">No Recipes Found</h3>
        <p className="text-muted-foreground text-sm max-w-sm text-center mt-1">
          Try adjusting your search queries or filtering options to find delicious meals.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {recipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            layoutId={`recipe-card-${recipe.id}`}
            whileHover={{ y: -4, scale: 1.01 }}
            className="relative overflow-hidden rounded-xl border border-border/40 bg-card text-card-foreground shadow-sm glass cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="h-28 w-full bg-gradient-to-br from-accent/20 via-primary/10 to-transparent p-4 flex items-start justify-between border-b border-border/20">
                <Badge variant="outline" className="border-accent/40 bg-accent/5 text-accent font-semibold px-2 py-0.5">
                  {recipe.category}
                </Badge>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 rounded-full bg-card/60"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(recipe.id);
                    toast.success("Recipe deleted successfully");
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
              <div className="p-5 flex flex-col gap-3">
                <h4 className="text-lg font-bold tracking-tight text-foreground line-clamp-1">{recipe.name}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{recipe.description}</p>
                <div className="grid grid-cols-3 gap-2 py-2.5 border-t border-b border-border/20">
                  <div className="flex flex-col items-center">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground mb-1" />
                    <span className="text-[10px] font-bold text-foreground">{recipe.duration} Mins</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Flame className="h-3.5 w-3.5 text-muted-foreground mb-1" />
                    <span className="text-[10px] font-bold text-foreground">{recipe.calories} kcal</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <ChefHat className="h-3.5 w-3.5 text-accent mb-1" />
                    <span className={`text-[10px] font-bold ${recipe.difficulty === "Easy" ? "text-success" : recipe.difficulty === "Medium" ? "text-warning" : "text-destructive"}`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 justify-between items-center text-[10px] text-muted-foreground font-semibold px-1">
                  <span>Pro: <strong className="text-foreground font-bold">{recipe.protein}g</strong></span>
                  <span>Carbs: <strong className="text-foreground font-bold">{recipe.carbs}g</strong></span>
                  <span>Fats: <strong className="text-foreground font-bold">{recipe.fats}g</strong></span>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-border/20 bg-muted/20 flex justify-between items-center rounded-b-xl">
              <span className="text-xs text-muted-foreground font-medium">Est. Cost:</span>
              <span className="text-sm font-extrabold text-foreground">{recipe.costEstimate.toLocaleString()} XAF</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

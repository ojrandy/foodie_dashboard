"use client";

import { ChefHat, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecipeHeaderProps {
  onAddClick: () => void;
}

export function RecipeHeader({ onAddClick }: RecipeHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
          <ChefHat className="h-8 w-8 text-accent" /> Recipe Intelligence
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          AI-powered meal planning, automated nutrition maps, and Cameroon cost matrices.
        </p>
      </div>
      <Button onClick={onAddClick} className="gap-2 self-start md:self-auto shadow-md">
        <Plus className="h-4 w-4" /> Add Smart Recipe
      </Button>
    </div>
  );
}

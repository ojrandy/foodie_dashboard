import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat } from "lucide-react";

export function IngredientIntelligence() {
  return (
    <div className="space-y-6">
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-accent" />
            Ingredient Intelligence Database
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex flex-col items-center justify-center border border-dashed border-border/40 rounded-xl bg-muted/10">
            <h3 className="font-bold text-foreground">Ingredient Matrix Loading...</h3>
            <p className="text-sm text-muted-foreground mt-2 text-center max-w-sm">
              Connecting to supplier APIs for real-time quantity and cost intelligence.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

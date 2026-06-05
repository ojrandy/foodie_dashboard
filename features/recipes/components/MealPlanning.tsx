import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export function MealPlanning() {
  return (
    <div className="space-y-6">
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-warning" />
            Automated Meal Planning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex flex-col items-center justify-center border border-dashed border-border/40 rounded-xl bg-muted/10">
            <h3 className="font-bold text-foreground">AI Planner Connecting...</h3>
            <p className="text-sm text-muted-foreground mt-2 text-center max-w-sm">
              Generating optimized schedules for Family, Student, and Budget plans based on current market data.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

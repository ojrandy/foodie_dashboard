import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRecipeAutomation } from "../hooks/useRecipeAutomation";
import { ChefHat, ShoppingBag, TrendingDown, TrendingUp, DollarSign, Target } from "lucide-react";

export function RecipeAutomationDashboard() {
  const { stats } = useRecipeAutomation();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <ChefHat className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-bold text-foreground">Recipe-to-Order Automation</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* KPI 1 */}
        <Card className="glass border-primary/20 bg-primary/5">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Recipes Converted</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground flex items-center gap-2">
                {stats.recipesConvertedToday}
                <span className="text-xs text-success flex items-center"><TrendingUp className="h-3 w-3 mr-0.5" /> +12%</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <ChefHat className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* KPI 2 */}
        <Card className="glass border-accent/20 bg-accent/5">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Orders Generated</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground flex items-center gap-2">
                {stats.ordersGenerated}
                <span className="text-xs text-success flex items-center"><TrendingUp className="h-3 w-3 mr-0.5" /> +8%</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* KPI 3 */}
        <Card className="glass border-success/20 bg-success/5">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Automation Success</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground flex items-center gap-2">
                {stats.automationSuccessRate}%
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center text-success">
              <Target className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* KPI 4 */}
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Avg Recipe Cost</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">
                {stats.averageRecipeCost.toLocaleString()} <span className="text-sm text-muted-foreground">XAF</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <DollarSign className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* KPI 5 */}
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Avg Delivery Cost</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">
                {stats.averageDeliveryCost.toLocaleString()} <span className="text-sm text-muted-foreground">XAF</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <TrendingDown className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* KPI 6 */}
        <Card className="glass border-warning/20 bg-warning/5">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Budget Savings</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">
                {stats.budgetSavingsGenerated.toLocaleString()} <span className="text-sm text-muted-foreground">XAF</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-warning/20 flex items-center justify-center text-warning">
              <DollarSign className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* KPI 7 - Top Converted */}
        <Card className="glass sm:col-span-2 lg:col-span-1">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1">Top Converted Recipes</span>
              <div className="mt-3 space-y-2">
                {stats.topConvertedRecipes.map((r, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-foreground truncate max-w-[120px]">{r.name}</span>
                    <span className="flex items-center gap-1">
                      <span className="font-bold text-accent">{r.conversions}</span>
                      {r.trend === "up" ? <TrendingUp className="h-3 w-3 text-success" /> : <TrendingDown className="h-3 w-3 text-destructive" />}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI 8 - Most Profitable */}
        <Card className="glass sm:col-span-2 lg:col-span-2">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div>
              <span className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1">Most Profitable Recipes</span>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {stats.mostProfitableRecipes.map((r, i) => (
                  <div key={i} className="bg-muted/10 p-2.5 rounded-lg border border-border/40">
                    <p className="text-xs font-bold text-foreground truncate">{r.name}</p>
                    <div className="flex justify-between items-end mt-1">
                      <span className="text-sm font-black text-success">{r.margin.toLocaleString()} XAF</span>
                      <Badge variant="outline" className="text-[8px] border-success text-success bg-success/10">{r.roi}% ROI</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

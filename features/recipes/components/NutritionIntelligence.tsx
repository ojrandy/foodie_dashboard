import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { useRecipes } from "../hooks/useRecipes";
import { Apple, Activity } from "lucide-react";
import { ChartSkeleton, CardSkeleton } from "@/components/ui/skeletons";
import { TrendingDown, TrendingUp, Flame, Dumbbell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface TooltipProps { active?: boolean; payload?: any[]; label?: string; }
const CustomBarTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border/40 p-3 rounded-lg shadow-xl min-w-[150px]">
        <p className="text-sm font-bold text-foreground mb-2 border-b border-border/40 pb-2">{label} Category</p>
        <div className="space-y-1.5">
          {payload.map((entry, index: number) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: entry.color }} />
                <span className="text-muted-foreground font-medium">{entry.name}</span>
              </div>
              <span className="font-extrabold" style={{ color: entry.color }}>{entry.value}g</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const CustomRadarTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-border/40 p-3 rounded-lg shadow-xl">
        <p className="text-sm font-bold text-foreground mb-1">{data.subject}</p>
        <div className="flex items-center gap-2 text-xs mt-2 bg-muted/30 p-1.5 rounded">
          <div className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
          <span className="text-muted-foreground font-medium">Global Average:</span>
          <span className="font-extrabold text-[#8b5cf6]">{data.A}g</span>
        </div>
      </div>
    );
  }
  return null;
};

export function NutritionIntelligence() {
  const { data: recipes, isLoading } = useRecipes();

  const nutritionAverages = useMemo(() => {
    if (!recipes || recipes.length === 0) return [];
    
    // Group by category to find average macros
    const categories = ["Traditional", "Student", "Budget", "Healthy"];
    
    return categories.map(cat => {
      const catRecipes = recipes.filter(r => r.category === cat);
      const total = catRecipes.length || 1;
      
      return {
        category: cat,
        Protein: Math.round(catRecipes.reduce((sum, r) => sum + r.protein, 0) / total),
        Carbs: Math.round(catRecipes.reduce((sum, r) => sum + r.carbs, 0) / total),
        Fats: Math.round(catRecipes.reduce((sum, r) => sum + r.fats, 0) / total),
      };
    });
  }, [recipes]);

  const radarData = useMemo(() => {
    if (!recipes || recipes.length === 0) return [];
    const total = recipes.length;
    return [
      { subject: 'Protein (g)', A: Math.round(recipes.reduce((sum, r) => sum + r.protein, 0) / total), fullMark: 100 },
      { subject: 'Carbs (g)', A: Math.round(recipes.reduce((sum, r) => sum + r.carbs, 0) / total), fullMark: 100 },
      { subject: 'Fats (g)', A: Math.round(recipes.reduce((sum, r) => sum + r.fats, 0) / total), fullMark: 100 },
      { subject: 'Fiber (g)', A: 12, fullMark: 100 }, // Mock
      { subject: 'Sugar (g)', A: 8, fullMark: 100 }, // Mock
    ];
  }, [recipes]);

  const kpis = useMemo(() => {
    if (!recipes || recipes.length === 0) return null;
    const total = recipes.length;
    const avgCal = Math.round(recipes.reduce((sum, r) => sum + r.calories, 0) / total);
    const avgPro = Math.round(recipes.reduce((sum, r) => sum + r.protein, 0) / total);
    
    const highestCal = [...recipes].sort((a, b) => b.calories - a.calories)[0];
    const lowestCal = [...recipes].sort((a, b) => a.calories - b.calories)[0];

    return { avgCal, avgPro, highestCal, lowestCal };
  }, [recipes]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      {kpis && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">Average Calories</p>
                <h4 className="text-3xl font-extrabold mt-1">{kpis.avgCal} <span className="text-sm font-medium text-muted-foreground">kcal</span></h4>
              </div>
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Flame className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">Average Protein</p>
                <h4 className="text-3xl font-extrabold mt-1">{kpis.avgPro} <span className="text-sm font-medium text-muted-foreground">g</span></h4>
              </div>
              <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center text-success">
                <Dumbbell className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">Highest Calorie Meal</p>
                <h4 className="text-xl font-extrabold mt-1 truncate max-w-[150px]">{kpis.highestCal.name}</h4>
                <p className="text-xs text-destructive mt-1 font-bold flex items-center gap-1"><TrendingUp className="h-3 w-3" /> {kpis.highestCal.calories} kcal</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                <Flame className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">Lowest Calorie Meal</p>
                <h4 className="text-xl font-extrabold mt-1 truncate max-w-[150px]">{kpis.lowestCal.name}</h4>
                <p className="text-xs text-success mt-1 font-bold flex items-center gap-1"><TrendingDown className="h-3 w-3" /> {kpis.lowestCal.calories} kcal</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center text-success">
                <Apple className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Apple className="h-5 w-5 text-success" />
              Macronutrient Distribution by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={nutritionAverages} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} maxBarSize={50}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" vertical={false} />
                  <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={false}
                    content={<CustomBarTooltip />}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="Protein" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="Carbs" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="Fats" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Activity className="h-5 w-5 text-accent" />
              Global Nutrition Profile Radar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                  <Radar name="Global Average" dataKey="A" stroke="#8b5cf6" strokeWidth={2} fill="#8b5cf6" fillOpacity={0.4} />
                  <Tooltip content={<CustomRadarTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-sm font-bold tracking-widest text-muted-foreground uppercase">Detailed Nutrition Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] uppercase bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Recipe Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3 text-right">Calories</th>
                  <th className="px-4 py-3 text-right">Protein</th>
                  <th className="px-4 py-3 text-right">Carbs</th>
                  <th className="px-4 py-3 text-right rounded-tr-lg">Fats</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {recipes?.map((recipe) => (
                  <tr key={recipe.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-4 py-3 font-bold text-foreground">{recipe.name}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-[10px] bg-background/50">{recipe.category}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right font-extrabold">{recipe.calories} kcal</td>
                    <td className="px-4 py-3 text-right text-success font-semibold">{recipe.protein}g</td>
                    <td className="px-4 py-3 text-right text-warning font-semibold">{recipe.carbs}g</td>
                    <td className="px-4 py-3 text-right text-destructive font-semibold">{recipe.fats}g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

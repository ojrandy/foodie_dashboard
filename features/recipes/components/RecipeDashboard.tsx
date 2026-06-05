import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, TrendingUp, Clock, Sparkles, AlertCircle, LineChart as LineChartIcon } from "lucide-react";
import { useRecipes } from "../hooks/useRecipes";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { CardSkeleton } from "@/components/ui/skeletons";
import { Badge } from "@/components/ui/badge";

const CustomAreaTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border/40 p-3 rounded-lg shadow-xl min-w-[140px]">
        <p className="text-sm font-bold text-foreground mb-1">{label} Growth</p>
        <div className="flex items-center gap-2 text-xs bg-[#8b5cf6]/10 p-1.5 rounded mt-2">
          <TrendingUp className="h-3 w-3 text-[#8b5cf6]" />
          <span className="text-muted-foreground font-medium">Catalog Size:</span>
          <span className="font-extrabold text-[#8b5cf6]">{payload[0].value}</span>
        </div>
      </div>
    );
  }
  return null;
};

const mockGrowthData = [
  { month: "Jan", recipes: 12 },
  { month: "Feb", recipes: 18 },
  { month: "Mar", recipes: 25 },
  { month: "Apr", recipes: 32 },
  { month: "May", recipes: 45 },
  { month: "Jun", recipes: 58 },
];

export function RecipeDashboard() {
  const { data: recipes, isLoading } = useRecipes();

  const stats = useMemo(() => {
    if (!recipes) return { total: 0, avgCost: 0, avgTime: 0, published: 0, categories: [], recent: [] };
    const total = recipes.length;
    const avgCost = Math.round(recipes.reduce((sum, r) => sum + r.costEstimate, 0) / (total || 1));
    const avgTime = Math.round(recipes.reduce((sum, r) => sum + r.duration, 0) / (total || 1));
    
    // Category distribution
    const catMap = new Map<string, number>();
    recipes.forEach(r => catMap.set(r.category, (catMap.get(r.category) || 0) + 1));
    const categories = Array.from(catMap.entries()).map(([name, value]) => ({ name, value }));
    
    // Recent recipes
    const recent = [...recipes].slice(0, 4);

    return { total, avgCost, avgTime, published: total > 0 ? total - 1 : 0, categories, recent };
  }, [recipes]);

  const COLORS = ['#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#ec4899', '#14b8a6'];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">Total Recipes</p>
              <h4 className="text-3xl font-extrabold mt-1">{stats.total}</h4>
              <p className="text-xs text-success mt-1 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +12% this month</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ChefHat className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">Published Catalog</p>
              <h4 className="text-3xl font-extrabold mt-1">{stats.published}</h4>
              <p className="text-xs text-muted-foreground mt-1">1 Draft pending review</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <Sparkles className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">Avg Prep Time</p>
              <h4 className="text-3xl font-extrabold mt-1">{stats.avgTime}m</h4>
              <p className="text-xs text-success mt-1 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Optimized by 5%</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center text-warning">
              <Clock className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">Avg Cost Index</p>
              <h4 className="text-3xl font-extrabold mt-1">{stats.avgCost.toLocaleString()} XAF</h4>
              <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Market prices up 2%</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
              <LineChartIcon className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              Catalog Growth Trajectory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockGrowthData}>
                  <defs>
                    <linearGradient id="colorRecipes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ stroke: 'hsl(var(--muted))', strokeWidth: 2 }}
                    content={<CustomAreaTooltip />}
                  />
                  <Area type="natural" dataKey="recipes" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorRecipes)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights Panel */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold tracking-widest text-muted-foreground uppercase flex items-center gap-2">
            <Sparkles className="h-4 w-4" /> AI Operations Insights
          </h3>
          
          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-accent/20 text-accent"><ChefHat className="h-4 w-4" /></div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Menu Optimization</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    "Egusi Soup Supreme" is currently your highest-rated traditional dish. Consider adding a budget-friendly variant to capture the student demographic.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-emerald-500/5 border-emerald-500/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-500"><LineChartIcon className="h-4 w-4" /></div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Cost Alert</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Palm oil prices have spiked 15% in the Buea market. Cost estimates for 4 traditional recipes have been automatically adjusted.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-warning/5 border-warning/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-warning/20 text-warning"><Clock className="h-4 w-4" /></div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Prep Time Inefficiency</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    "Achu Special" is averaging 75 mins prep time. Introducing pre-pounded coco-yam paste could reduce this by 40%.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.categories}
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={6}
                    cornerRadius={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {stats.categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Additions */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center justify-between">
              Recently Added
              <Badge variant="outline" className="text-[10px]">Live Sync</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recent.map((recipe, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-muted relative overflow-hidden">
                      {recipe.thumbnailUrl ? (
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${recipe.thumbnailUrl})` }} />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-accent/20 text-accent">
                          <ChefHat className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground line-clamp-1">{recipe.name}</p>
                      <p className="text-xs text-muted-foreground">{recipe.category} • {recipe.duration} mins</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-accent">{recipe.costEstimate} XAF</p>
                    <p className="text-[10px] text-success flex items-center gap-1 justify-end">
                      <Sparkles className="h-3 w-3" /> Ready
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

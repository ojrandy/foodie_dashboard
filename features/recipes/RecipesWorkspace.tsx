"use client";

import React, { useState, useMemo } from "react";
import { 
  Search, Plus, Trash2, Clock, Flame, 
  ChefHat, Sparkles, Filter, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// ==========================================
// TYPES & MOCK RECIPES DATA
// ==========================================

export interface Recipe {
  id: string;
  name: string;
  category: "Student" | "Family" | "Budget" | "Healthy" | "Traditional";
  difficulty: "Easy" | "Medium" | "Hard";
  duration: number; // in mins
  calories: number;
  protein: number; // in g
  carbs: number; // in g
  fats: number; // in g
  costEstimate: number; // in XAF
  ingredients: { name: string; amount: string; sub?: string }[];
  instructions: string[];
  description: string;
}

const INITIAL_RECIPES: Recipe[] = [
  {
    id: "rec-1",
    name: "Egusi Soup supreme",
    category: "Traditional",
    difficulty: "Medium",
    duration: 45,
    calories: 520,
    protein: 28,
    carbs: 12,
    fats: 42,
    costEstimate: 4500,
    description: "Rich, aromatic West African melon seed soup packed with spinach, dried fish, and premium Cameroonian spices.",
    ingredients: [
      { name: "Egusi seeds (ground)", amount: "2 cups", sub: "Pumpkin seeds" },
      { name: "Spinach / Pumpkin leaves", amount: "3 cups (chopped)" },
      { name: "Beef & Tripe (cooked)", amount: "500g" },
      { name: "Dried fish / Stockfish", amount: "2 pieces" },
      { name: "Palm oil", amount: "1/2 cup" },
      { name: "Crayfish (ground)", amount: "2 tbsp" }
    ],
    instructions: [
      "Mix ground Egusi with a tiny bit of water to form thick paste clumps.",
      "Heat palm oil in a pot and sauté sliced onions for 3 minutes.",
      "Add the Egusi paste clumps and fry gently for 10 minutes until golden.",
      "Pour in beef stock, dried fish, and cooked beef. Simmer for 15 minutes.",
      "Fold in chopped spinach and ground crayfish. Cover and steam for 5 minutes.",
      "Serve hot with yellow Garri or Fufu."
    ]
  },
  {
    id: "rec-2",
    name: "Ndole Supreme Plan",
    category: "Traditional",
    difficulty: "Hard",
    duration: 60,
    calories: 680,
    protein: 34,
    carbs: 18,
    fats: 50,
    costEstimate: 5500,
    description: "The crown jewel of Cameroonian cuisine. Stewed bitterleaf nuts enriched with peanuts, shrimp, and premium beef.",
    ingredients: [
      { name: "Bitterleaf (washed clean)", amount: "3 cups" },
      { name: "Raw peanuts (boiled & paste)", amount: "2 cups" },
      { name: "Fresh shrimp / prawns", amount: "200g" },
      { name: "Beef pieces (boiled)", amount: "300g" },
      { name: "Onions (sliced)", amount: "2 medium" },
      { name: "Garlic & Ginger paste", amount: "1 tbsp" }
    ],
    instructions: [
      "Boil raw peanuts for 15 minutes, drain, and blend into a smooth cream.",
      "Heat a large pot, add beef, blended garlic/ginger, and boil until tender.",
      "Add peanut cream to the beef stock and simmer on low heat for 15 minutes, stirring constantly.",
      "Stir in washed bitterleaf and cook for another 10 minutes.",
      "In a separate pan, heat vegetable oil, sauté remaining onions, and fry shrimp until pink.",
      "Pour hot oil, onions, and shrimp over the pot of Ndole. Mix gently and serve."
    ]
  },
  {
    id: "rec-3",
    name: "Achu Special",
    category: "Traditional",
    difficulty: "Hard",
    duration: 75,
    calories: 590,
    protein: 22,
    carbs: 70,
    fats: 24,
    costEstimate: 6000,
    description: "Traditional delicacy from the Northwest region. Smooth pounded coco-yams served with rich, aromatic yellow limestone soup.",
    ingredients: [
      { name: "Coco-yams (taro)", amount: "6 large" },
      { name: "Achu soup spices (traditional)", amount: "3 tbsp" },
      { name: "Limestone / Kanwa powder", amount: "1 tsp" },
      { name: "Red Palm oil", amount: "1 cup" },
      { name: "Smoked cow skin (Canda)", amount: "200g" }
    ],
    instructions: [
      "Boil unpeeled coco-yams until completely soft, peel, and pound in a mortar until smooth.",
      "Heat palm oil slightly in a bowl, mix Kanwa with warm water, and strain into the oil, stirring to emulsify into a yellow soup.",
      "Add Achu spices and stock to the yellow mixture and stir thoroughly.",
      "Plate the pounded coco-yam paste with a central well filled with warm yellow soup, cow skin, and smoked fish."
    ]
  },
  {
    id: "rec-4",
    name: "Student Budget Cup",
    category: "Student",
    difficulty: "Easy",
    duration: 15,
    calories: 340,
    protein: 10,
    carbs: 45,
    fats: 8,
    costEstimate: 800,
    description: "Extremely affordable, rapid-fuel student rice combo prepared with sliced tomatoes, eggs, and dynamic localized spices.",
    ingredients: [
      { name: "Parboiled Rice", amount: "1.5 cups" },
      { name: "Fresh eggs", amount: "2 units", sub: "Fried tofu" },
      { name: "Tomatoes & Pepper", amount: "2 chopped" },
      { name: "Vegetable oil", amount: "2 tbsp" }
    ],
    instructions: [
      "Parboil rice for 10 minutes and drain.",
      "Heat vegetable oil, fry onions and tomatoes for 3 minutes, then crack in eggs to scramble.",
      "Stir in rice and cook for 5 minutes until fluffy."
    ]
  },
  {
    id: "rec-5",
    name: "Molyko Student Cup",
    category: "Student",
    difficulty: "Easy",
    duration: 12,
    calories: 410,
    protein: 14,
    carbs: 55,
    fats: 10,
    costEstimate: 950,
    description: "Highly energetic Molyko student staple consisting of stewed spaghetti, local seasoning, and egg strips.",
    ingredients: [
      { name: "Spaghetti noodles", amount: "1 pack" },
      { name: "Egg (scrambled)", amount: "1 unit" },
      { name: "Tomato paste", amount: "1 tbsp" }
    ],
    instructions: [
      "Boil spaghetti for 8 minutes and drain.",
      "Sauté tomato paste and onions in oil, mix in scrambled egg and spaghetti. Serve hot."
    ]
  },
  {
    id: "rec-6",
    name: "Koki Wrap Plan",
    category: "Budget",
    difficulty: "Medium",
    duration: 50,
    calories: 480,
    protein: 18,
    carbs: 40,
    fats: 20,
    costEstimate: 1500,
    description: "Budget-friendly steamed black-eyed pea pudding enriched with palm oil, wrapped beautifully in banana leaves.",
    ingredients: [
      { name: "Black-eyed beans", amount: "2 cups" },
      { name: "Palm oil", amount: "1/2 cup" },
      { name: "Cocoyam leaves (young)", amount: "5 leaves" }
    ],
    instructions: [
      "Soak beans, peel skins, and blend into a thick, smooth paste.",
      "Stir palm oil into paste until bright orange-yellow and fluffy.",
      "Wrap paste in banana leaves with cocoyam leaves, steam for 40 minutes."
    ]
  }
];

export function RecipesWorkspace() {
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"name" | "cost" | "duration">("name");
  
  // Drawer States
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form State for Add Recipe
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState<Recipe["category"]>("Traditional");
  const [newDifficulty, setNewDifficulty] = useState<Recipe["difficulty"]>("Easy");
  const [newDuration, setNewDuration] = useState(30);
  const [newCost, setNewCost] = useState(1500);
  const [newCalories, setNewCalories] = useState(400);
  const [newProtein, setNewProtein] = useState(15);
  const [newCarbs, setNewCarbs] = useState(40);
  const [newFats, setNewFats] = useState(12);
  const [newDesc, setNewDesc] = useState("");
  const [newIngText, setNewIngText] = useState("");
  const [newInstText, setNewInstText] = useState("");

  // Filters & Sorting logic
  const filteredRecipes = useMemo(() => {
    return recipes
      .filter((r) => {
        const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || 
          r.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === "All" || r.category === categoryFilter;
        const matchesDiff = difficultyFilter === "All" || r.difficulty === difficultyFilter;
        return matchesSearch && matchesCategory && matchesDiff;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "cost") return a.costEstimate - b.costEstimate;
        if (sortBy === "duration") return a.duration - b.duration;
        return 0;
      });
  }, [recipes, search, categoryFilter, difficultyFilter, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    const total = recipes.length;
    const avgCost = Math.round(recipes.reduce((sum, r) => sum + r.costEstimate, 0) / total);
    const avgDuration = Math.round(recipes.reduce((sum, r) => sum + r.duration, 0) / total);
    return { total, avgCost, avgDuration };
  }, [recipes]);

  // Handlers
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    toast.success("Recipe deleted successfully");
  };

  const handleAddRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newDesc.trim()) {
      toast.error("Please fill in the required fields");
      return;
    }

    const newRecipe: Recipe = {
      id: `rec-${Date.now()}`,
      name: newName,
      category: newCategory,
      difficulty: newDifficulty,
      duration: newDuration,
      costEstimate: newCost,
      calories: newCalories,
      protein: newProtein,
      carbs: newCarbs,
      fats: newFats,
      description: newDesc,
      ingredients: newIngText.split(",").map(i => ({ name: i.trim(), amount: "1 unit" })),
      instructions: newInstText.split(".").map(i => i.trim()).filter(Boolean)
    };

    setRecipes((prev) => [newRecipe, ...prev]);
    setIsAddOpen(false);
    toast.success("AI Nutrition Auto-Calculated! Recipe added.");
    // Clear inputs
    setNewName("");
    setNewDesc("");
    setNewIngText("");
    setNewInstText("");
  };

  return (
    <div className="space-y-6">
      {/* 1. TOP HEADER & METRICS STRIP */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <ChefHat className="h-8 w-8 text-accent" /> Recipe Intelligence
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            AI-powered meal planning, automated nutrition maps, and Cameroon cost matrices.
          </p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="gap-2 self-start md:self-auto shadow-md">
          <Plus className="h-4 w-4" /> Add Smart Recipe
        </Button>
      </div>

      {/* KPI stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">Active Catalog</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">{stats.total} Recipes</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ChefHat className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">Average Cost Index</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">{stats.avgCost.toLocaleString()} XAF</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Sparkles className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">Average Prep Time</span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">{stats.avgDuration} Mins</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center text-warning">
              <Clock className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2. SEARCH & ADVANCED FILTER ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-card/40 border border-border/40 p-4 rounded-xl glass shadow-sm">
        {/* Search */}
        <div className="lg:col-span-4 relative group">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-accent" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes, ingredients..." 
            className="pl-9 bg-muted/30 border-border/50 focus-visible:ring-accent/30"
          />
        </div>

        {/* Category Filters */}
        <div className="lg:col-span-8 flex gap-2 flex-wrap items-center justify-end">
          <Badge 
            onClick={() => setCategoryFilter("All")}
            className={`cursor-pointer px-3 py-1 ${categoryFilter === "All" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            All Categories
          </Badge>
          {["Traditional", "Student", "Budget", "Healthy"].map((cat) => (
            <Badge 
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`cursor-pointer px-3 py-1 ${categoryFilter === cat ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {cat}
            </Badge>
          ))}
          
          {/* Sorting */}
          <div className="flex items-center gap-1.5 ml-2 border-l border-border/50 pl-3">
            <Filter className="h-3.5 w-3.5 text-muted-foreground" />
            <select 
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-semibold text-foreground border-none focus:outline-none cursor-pointer outline-none"
            >
              <option value="name" className="bg-card">Sort by Name</option>
              <option value="cost" className="bg-card">Sort by Cost</option>
              <option value="duration" className="bg-card">Sort by Duration</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. DYNAMIC RECIPE FOOD CARDS */}
      {filteredRecipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border border-dashed border-border/40 rounded-xl glass">
          <ChefHat className="h-12 w-12 text-muted-foreground animate-pulse mb-3" />
          <h3 className="text-lg font-bold text-foreground">No Recipes Found</h3>
          <p className="text-muted-foreground text-sm max-w-sm text-center mt-1">
            Try adjusting your search queries or filtering options to find delicious Cameroonian meals.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredRecipes.map((recipe) => (
              <motion.div
                key={recipe.id}
                layoutId={`recipe-card-${recipe.id}`}
                whileHover={{ y: -4, scale: 1.01 }}
                onClick={() => setSelectedRecipe(recipe)}
                className="relative overflow-hidden rounded-xl border border-border/40 bg-card text-card-foreground shadow-sm glass cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Food Card Banner/Gradient Overlay */}
                  <div className="h-28 w-full bg-gradient-to-br from-accent/20 via-primary/10 to-transparent p-4 flex items-start justify-between border-b border-border/20">
                    <Badge variant="outline" className="border-accent/40 bg-accent/5 text-accent font-semibold px-2 py-0.5">
                      {recipe.category}
                    </Badge>
                    <div className="flex gap-1.5">
                      <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full bg-card/60" onClick={(e) => handleDelete(recipe.id, e)}>
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-bold tracking-tight text-foreground line-clamp-1">{recipe.name}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{recipe.description}</p>
                    
                    {/* Performance metrics row */}
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

                    {/* Nutrition rings mock data indicators */}
                    <div className="flex gap-4 justify-between items-center text-[10px] text-muted-foreground font-semibold px-1">
                      <span>Pro: <strong className="text-foreground font-bold">{recipe.protein}g</strong></span>
                      <span>Carbs: <strong className="text-foreground font-bold">{recipe.carbs}g</strong></span>
                      <span>Fats: <strong className="text-foreground font-bold">{recipe.fats}g</strong></span>
                    </div>
                  </div>
                </div>

                {/* Footer price & CTA */}
                <div className="p-4 border-t border-border/20 bg-muted/20 flex justify-between items-center rounded-b-xl">
                  <span className="text-xs text-muted-foreground font-medium">Est. Cost:</span>
                  <span className="text-sm font-extrabold text-foreground">{recipe.costEstimate.toLocaleString()} XAF</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* 4. RECIPE DETAILS INTERACTIVE DRAWER */}
      <AnimatePresence>
        {selectedRecipe && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRecipe(null)}
              className="fixed inset-0 bg-black z-[900]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-card border-l border-border/40 z-[950] p-6 shadow-2xl glass overflow-y-auto flex flex-col justify-between"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex justify-between items-center border-b border-border/40 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <ChefHat className="h-5 w-5 text-accent" />
                    <h3 className="text-lg font-bold text-foreground">Recipe Recipe Matrix</h3>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => setSelectedRecipe(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Drawer Main Info */}
                <div className="space-y-6">
                  <div>
                    <Badge variant="outline" className="border-accent/40 bg-accent/5 text-accent font-semibold mb-2">
                      {selectedRecipe.category}
                    </Badge>
                    <h2 className="text-2xl font-extrabold tracking-tight text-foreground">{selectedRecipe.name}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2">{selectedRecipe.description}</p>
                  </div>

                  {/* AI Nutrition Calculator Ring Panel */}
                  <div className="p-4 bg-accent/5 border border-accent/20 rounded-xl glass flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-accent/15 flex items-center justify-center text-accent animate-pulse">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-foreground">AI Intelligence calculation</h4>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Automated raw ingredient analysis.</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-foreground">{selectedRecipe.calories} Calories</div>
                      <div className="text-[9px] text-muted-foreground uppercase font-semibold mt-0.5">
                        p: {selectedRecipe.protein}g | c: {selectedRecipe.carbs}g | f: {selectedRecipe.fats}g
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Cost estimate */}
                  <div className="p-4 bg-muted/30 border border-border/40 rounded-xl glass flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Dynamic Market Cost Index</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Estimated Buea regional index today.</p>
                    </div>
                    <span className="text-lg font-extrabold text-accent">{selectedRecipe.costEstimate.toLocaleString()} XAF</span>
                  </div>

                  {/* Ingredients Listing */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-widest text-muted-foreground mb-3">Ingredients Map</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedRecipe.ingredients.map((ing, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2 px-3 bg-muted/20 rounded-lg border border-border/20 text-xs">
                          <span className="font-semibold text-foreground">{ing.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">{ing.amount}</span>
                            {ing.sub && (
                              <Badge variant="outline" className="text-[9px] border-warning/40 bg-warning/5 text-warning px-1.5 py-0">
                                Sub: {ing.sub}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-foreground uppercase tracking-widest text-muted-foreground mb-3">Chef Instructions</h4>
                    <div className="space-y-3">
                      {selectedRecipe.instructions.map((inst, idx) => (
                        <div key={idx} className="flex gap-3 text-xs leading-relaxed">
                          <span className="h-5 w-5 shrink-0 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-bold text-accent">
                            {idx + 1}
                          </span>
                          <p className="text-muted-foreground pt-0.5">{inst}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-border/40 pt-4 mt-6 flex gap-3">
                <Button className="flex-1" onClick={() => {
                  toast.success(`Generated optimized grocery cart for ${selectedRecipe.name}`);
                  setSelectedRecipe(null);
                }}>
                  Deploy Meal Plan
                </Button>
                <Button variant="outline" onClick={() => setSelectedRecipe(null)}>
                  Close Matrix
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 5. ADD RECIPE DIALOG */}
      <AnimatePresence>
        {isAddOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddOpen(false)}
              className="fixed inset-0 bg-black z-[900]"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-card border border-border/40 p-6 rounded-2xl glass shadow-2xl z-[950] overflow-y-auto max-h-[85vh]"
            >
              <div className="flex justify-between items-center border-b border-border/40 pb-4 mb-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-1.5">
                  <Sparkles className="h-5 w-5 text-accent" /> AI Recipe Creation Engine
                </h3>
                <Button size="icon" variant="ghost" onClick={() => setIsAddOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleAddRecipe} className="space-y-4 text-xs">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wide">Recipe Name *</label>
                  <Input 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Ndole Supreme Plan, Egusi Soup..." 
                    className="bg-muted/30 focus-visible:ring-accent/30"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-muted-foreground uppercase tracking-wide">Category</label>
                    <select 
                      value={newCategory}
                      onChange={(e: any) => setNewCategory(e.target.value)}
                      className="bg-muted/30 border border-border/40 rounded-lg p-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 cursor-pointer"
                    >
                      <option value="Traditional">Traditional</option>
                      <option value="Student">Student</option>
                      <option value="Budget">Budget</option>
                      <option value="Healthy">Healthy</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-muted-foreground uppercase tracking-wide">Difficulty</label>
                    <select 
                      value={newDifficulty}
                      onChange={(e: any) => setNewDifficulty(e.target.value)}
                      className="bg-muted/30 border border-border/40 rounded-lg p-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 cursor-pointer"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-muted-foreground uppercase tracking-wide">Duration (Mins)</label>
                    <Input 
                      type="number"
                      value={newDuration}
                      onChange={(e) => setNewDuration(parseInt(e.target.value) || 0)}
                      className="bg-muted/30 focus-visible:ring-accent/30"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-muted-foreground uppercase tracking-wide">Cost Estimate (XAF)</label>
                    <Input 
                      type="number"
                      value={newCost}
                      onChange={(e) => setNewCost(parseInt(e.target.value) || 0)}
                      className="bg-muted/30 focus-visible:ring-accent/30"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wide">Description *</label>
                  <textarea 
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Provide a detailed, elegant description of this culinary plan..." 
                    className="bg-muted/30 border border-border/40 rounded-lg p-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 min-h-[60px]"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wide">Ingredients (Comma separated)</label>
                  <Input 
                    value={newIngText}
                    onChange={(e) => setNewIngText(e.target.value)}
                    placeholder="e.g. ground egusi, washed spinach, dried fish, shrimp..." 
                    className="bg-muted/30 focus-visible:ring-accent/30"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wide">Cooking Instructions (Period separated)</label>
                  <textarea 
                    value={newInstText}
                    onChange={(e) => setNewInstText(e.target.value)}
                    placeholder="e.g. Boil peanuts for 15 mins. Blend peanuts smooth. Simmer peanut with tender beef..." 
                    className="bg-muted/30 border border-border/40 rounded-lg p-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 min-h-[60px]"
                  />
                </div>

                <Button type="submit" className="w-full mt-4 gap-2">
                  <Sparkles className="h-4 w-4" /> Deploy AI Nutrition Calculation
                </Button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

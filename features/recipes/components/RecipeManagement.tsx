import React, { useState, useMemo, useEffect } from "react";

import { Search, Plus, Trash2, Clock, Flame, ChefHat, Filter, Sparkles, X, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useRecipes, useDeleteRecipe } from "../hooks/useRecipes";
import { Recipe } from "../data/mockRecipes";
import { TableSkeleton } from "@/components/ui/skeletons";
import { RecipeForm } from "./RecipeForm";

export function RecipeManagement() {
  const { data: recipes, isLoading } = useRecipes();
  const { mutate: deleteRecipe } = useDeleteRecipe();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showTrending, setShowTrending] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "name" | "cost" | "duration">("newest");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  // Reset page when filters change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [search, categoryFilter, sortBy, showTrending]);

  const filteredRecipes = useMemo(() => {
    if (!recipes) return [];
    return recipes
      .filter((r) => {
        const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || 
          r.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === "All" || r.category === categoryFilter;
        const matchesTrending = showTrending ? r.isTrending === true : true;
        return matchesSearch && matchesCategory && matchesTrending;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "cost") return a.costEstimate - b.costEstimate;
        if (sortBy === "duration") return a.duration - b.duration;
        // Default 'newest' uses original array order which is already FIFO in useRecipes
        return 0;
      });
  }, [recipes, search, categoryFilter, sortBy, showTrending]);

  const paginatedRecipes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecipes.slice(start, start + itemsPerPage);
  }, [filteredRecipes, currentPage]);

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteRecipe(id);
  };

  if (isLoading) {
    return <TableSkeleton rows={8} />;
  }

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative group flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-accent" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes, ingredients..." 
            className="pl-9 bg-card border-border/50 focus-visible:ring-accent/30 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Badge 
            onClick={() => setCategoryFilter("All")}
            className={`cursor-pointer px-3 py-1.5 ${categoryFilter === "All" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            All
          </Badge>
          {["Traditional", "Student", "Budget", "Healthy"].map((cat) => (
            <Badge 
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`cursor-pointer px-3 py-1.5 whitespace-nowrap ${categoryFilter === cat ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {cat}
            </Badge>
          ))}
          
          <Badge 
            onClick={() => setShowTrending(!showTrending)}
            className={`cursor-pointer px-3 py-1.5 whitespace-nowrap ml-2 border border-destructive/30 ${showTrending ? "bg-destructive text-destructive-foreground shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "bg-transparent text-destructive hover:bg-destructive/10"}`}
          >
            <Flame className="h-3.5 w-3.5 mr-1.5" /> Hot Meals
          </Badge>
          
          <div className="flex items-center gap-1.5 ml-2 border-l border-border/50 pl-3">
            <Filter className="h-3.5 w-3.5 text-muted-foreground" />
            <select 
              value={sortBy}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value as "newest" | "name" | "cost" | "duration")}
              className="bg-transparent text-xs font-semibold text-foreground border-none focus:outline-none cursor-pointer outline-none"
            >
              <option value="newest" className="bg-card">Newest First</option>
              <option value="name" className="bg-card">Sort by Name</option>
              <option value="cost" className="bg-card">Sort by Cost</option>
              <option value="duration" className="bg-card">Sort by Duration</option>
            </select>
          </div>

          <Button onClick={() => setIsAddOpen(true)} className="gap-2 ml-2 shadow-md shrink-0">
            <Plus className="h-4 w-4" /> Add Recipe
          </Button>
        </div>
      </div>

      {/* Recipe Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-border/40 rounded-xl glass">
          <ChefHat className="h-12 w-12 text-muted-foreground animate-pulse mb-3" />
          <h3 className="text-lg font-bold text-foreground">No Recipes Found</h3>
          <p className="text-muted-foreground text-sm max-w-sm text-center mt-1">
            Try adjusting your search queries or filtering options.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {paginatedRecipes.map((recipe) => (
                <motion.div
                  key={recipe.id}
                  layoutId={`recipe-card-${recipe.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  onClick={() => setSelectedRecipe(recipe)}
                  className="relative overflow-hidden rounded-xl border border-border/40 bg-card text-card-foreground shadow-sm glass cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail Header */}
                    <div 
                      className="h-36 w-full bg-muted relative border-b border-border/20"
                    >
                      {recipe.thumbnailUrl ? (
                        <div 
                          className="absolute inset-0 bg-cover bg-center" 
                          style={{ backgroundImage: `url(${recipe.thumbnailUrl})` }} 
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/10 to-transparent" />
                      )}
                      
                      {/* Gradient Overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
                      
                      <div className="absolute top-0 w-full p-4 flex items-start justify-between z-10">
                        <div className="flex flex-col gap-2">
                          <Badge variant="outline" className="border-accent/40 bg-black/40 text-accent font-semibold px-2 py-0.5 backdrop-blur-md w-fit">
                            {recipe.category}
                          </Badge>
                          {recipe.isTrending && (
                            <Badge className="bg-destructive text-white font-bold px-2 py-0.5 shadow-lg border-none w-fit flex items-center gap-1">
                              <Flame className="h-3 w-3" /> Trending
                            </Badge>
                          )}
                        </div>
                        <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full bg-black/40 backdrop-blur-md" onClick={(e) => handleDelete(recipe.id, e)}>
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </div>

                      {recipe.videoUrl && (
                        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md rounded-full p-1.5 text-white z-10 shadow-lg">
                          <PlayCircle className="h-5 w-5" />
                        </div>
                      )}
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-border/40 mt-6">
              <p className="text-xs text-muted-foreground font-semibold">
                Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredRecipes.length)} of {filteredRecipes.length} recipes
              </p>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8 rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button 
                      key={i} 
                      variant={currentPage === i + 1 ? "default" : "ghost"} 
                      size="icon"
                      onClick={() => setCurrentPage(i + 1)}
                      className={`h-8 w-8 text-xs rounded-full font-bold ${currentPage === i + 1 ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted"}`}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ADD / EDIT RECIPE MODAL */}
      <AnimatePresence>
        {(isAddOpen || editingRecipe) && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { setIsAddOpen(false); setEditingRecipe(null); }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[900]"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, x: "-50%", y: "-50%" }} animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }} exit={{ scale: 0.95, opacity: 0, x: "-50%", y: "-50%" }}
              className="fixed top-1/2 left-1/2 w-full max-w-2xl bg-card border border-border/40 p-6 rounded-2xl shadow-2xl z-[950] overflow-y-auto max-h-[85vh] scrollbar-thin"
            >
              <div className="flex justify-between items-center border-b border-border/40 pb-4 mb-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-1.5">
                  <Sparkles className="h-5 w-5 text-accent" /> {editingRecipe ? "Edit Recipe" : "Publish New Recipe"}
                </h3>
                <Button size="icon" variant="ghost" onClick={() => { setIsAddOpen(false); setEditingRecipe(null); }}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <RecipeForm 
                initialData={editingRecipe || undefined}
                onSuccess={() => { setIsAddOpen(false); setEditingRecipe(null); }} 
                onCancel={() => { setIsAddOpen(false); setEditingRecipe(null); }} 
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* RECIPE DETAILS DRAWER */}
      <AnimatePresence>
        {selectedRecipe && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedRecipe(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[900]"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: "-48%", x: "-50%" }} animate={{ scale: 1, opacity: 1, y: "-50%", x: "-50%" }} exit={{ scale: 0.95, opacity: 0, y: "-48%", x: "-50%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 w-full h-full md:w-[65vw] md:max-w-5xl md:h-[90vh] bg-card md:border border-border/40 md:rounded-2xl z-[950] shadow-2xl glass overflow-y-auto flex flex-col justify-between scrollbar-thin"
            >
              <div className="relative">
                {/* Drawer Hero Image */}
                {selectedRecipe.thumbnailUrl ? (
                  <div className="h-64 w-full bg-muted relative">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${selectedRecipe.thumbnailUrl})` }} />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-card" />
                    
                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                      <Button size="sm" variant="secondary" className="h-8 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 font-semibold" onClick={() => { setEditingRecipe(selectedRecipe); setSelectedRecipe(null); }}>
                        Edit Recipe
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60" onClick={() => setSelectedRecipe(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 border-b border-border/40 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <ChefHat className="h-5 w-5 text-accent" />
                      <h3 className="text-lg font-bold text-foreground">Recipe Matrix</h3>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-8 text-xs font-semibold" onClick={() => { setEditingRecipe(selectedRecipe); setSelectedRecipe(null); }}>
                        Edit Recipe
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setSelectedRecipe(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                  <div className={`space-y-6 ${selectedRecipe.thumbnailUrl ? 'px-6 pb-6 -mt-12 relative z-10' : 'p-6'}`}>
                    <div>
                      <div className="flex gap-2 mb-2">
                        <Badge variant="outline" className="border-accent/40 bg-accent/5 text-accent font-semibold backdrop-blur-md">
                          {selectedRecipe.category}
                        </Badge>
                        {selectedRecipe.isTrending && (
                          <Badge className="bg-destructive text-white font-bold px-2 py-0.5 shadow-lg border-none flex items-center gap-1">
                            <Flame className="h-3 w-3" /> Trending
                          </Badge>
                        )}
                      </div>
                      <h2 className="text-2xl font-extrabold tracking-tight text-foreground leading-tight">{selectedRecipe.name}</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-2">{selectedRecipe.description}</p>
                    </div>

                    {/* Engagement & Analytics Strip */}
                    <div className="grid grid-cols-2 gap-3 py-3 border-y border-border/20">
                      <div>
                        <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">Global Views</p>
                        <p className="text-xl font-extrabold text-foreground mt-0.5">{(selectedRecipe.views || 0).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">Total Orders</p>
                        <p className="text-xl font-extrabold text-success mt-0.5">{(selectedRecipe.orders || 0).toLocaleString()}</p>
                      </div>
                    </div>

                  {/* Video Integration */}
                  {selectedRecipe.videoUrl && (
                    <div className="w-full aspect-video rounded-xl overflow-hidden border border-border/40 shadow-lg bg-black">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={selectedRecipe.videoUrl} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      />
                    </div>
                  )}

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

                  <div className="p-4 bg-muted/30 border border-border/40 rounded-xl glass flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Dynamic Market Cost Index</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Estimated regional index today.</p>
                    </div>
                    <span className="text-lg font-extrabold text-accent">{selectedRecipe.costEstimate.toLocaleString()} XAF</span>
                  </div>

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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useRecipes } from "../hooks/useRecipes";
import { RecipeHeader } from "./RecipeHeader";
import { RecipeCard } from "./RecipeCard";
import { RecipeSearch } from "./RecipeSearch";
import { RecipeGrid } from "./RecipeGrid";

export function RecipeMain() {
  const {
    filteredRecipes,
    stats,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
    handleDelete,
  } = useRecipes();

  return (
    <div className="space-y-6">
      <RecipeHeader onAddClick={() => {}} />
      <RecipeCard stats={stats} />
      <RecipeSearch
        search={search}
        onSearchChange={setSearch}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <RecipeGrid
        recipes={filteredRecipes}
        onDelete={handleDelete}
      />
    </div>
  );
}

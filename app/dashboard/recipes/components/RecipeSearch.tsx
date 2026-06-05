"use client";

import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface RecipeSearchProps {
  search: string;
  onSearchChange: (val: string) => void;
  categoryFilter: string;
  onCategoryChange: (val: string) => void;
  sortBy: "name" | "cost" | "duration";
  onSortChange: (val: "name" | "cost" | "duration") => void;
}

const CATEGORIES = ["All", "Traditional", "Student", "Budget", "Healthy"];

export function RecipeSearch({
  search,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  sortBy,
  onSortChange,
}: RecipeSearchProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-card/40 border border-border/40 p-4 rounded-xl glass shadow-sm">
      <div className="lg:col-span-4 relative group">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-accent" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search recipes, ingredients..."
          className="pl-9 bg-muted/30 border-border/50 focus-visible:ring-accent/30"
        />
      </div>
      <div className="lg:col-span-8 flex gap-2 flex-wrap items-center justify-end">
        {CATEGORIES.map((cat) => (
          <Badge
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`cursor-pointer px-3 py-1 ${
              categoryFilter === cat
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat}
          </Badge>
        ))}
        <div className="flex items-center gap-1.5 ml-2 border-l border-border/50 pl-3">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          <select
            value={sortBy}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onSortChange(e.target.value as "name" | "cost" | "duration")}
            className="bg-transparent text-xs font-semibold text-foreground border-none focus:outline-none cursor-pointer outline-none"
          >
            <option value="name" className="bg-card">Sort by Name</option>
            <option value="cost" className="bg-card">Sort by Cost</option>
            <option value="duration" className="bg-card">Sort by Duration</option>
          </select>
        </div>
      </div>
    </div>
  );
}

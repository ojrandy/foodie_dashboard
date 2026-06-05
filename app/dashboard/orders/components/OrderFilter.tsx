"use client";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface OrderFilterProps {
  search: string;
  onSearchChange: (val: string) => void;
  cityFilter: string;
  onCityChange: (val: string) => void;
}

const CITIES = ["All", "Buea", "Douala", "Yaounde"];

export function OrderFilter({
  search,
  onSearchChange,
  cityFilter,
  onCityChange,
}: OrderFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card/40 border border-border/40 p-4 rounded-xl glass shadow-sm">
      <div className="relative w-full sm:max-w-xs group">
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search customer, order ID..."
          className="pl-3 bg-muted/30 border-border/50 focus-visible:ring-accent/30"
        />
      </div>
      <div className="flex gap-2 flex-wrap items-center">
        {CITIES.map((city) => (
          <Badge
            key={city}
            onClick={() => onCityChange(city)}
            className={`cursor-pointer px-3 py-1 ${
              cityFilter === city
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {city}
          </Badge>
        ))}
      </div>
    </div>
  );
}

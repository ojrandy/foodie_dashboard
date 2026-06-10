import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInventoryIntelligence, Ingredient } from "../hooks/useInventoryIntelligence";
import { Search, Filter, Database, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SupplyRegistryTable() {
  const { ingredients } = useInventoryIntelligence();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Ingredient>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleSort = (field: keyof Ingredient) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const filtered = ingredients.filter(ing => 
    ing.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    ing.marketSource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    if (valA < valB) return sortDir === "asc" ? -1 : 1;
    if (valA > valB) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusColor = (level: string) => {
    switch (level) {
      case "Available": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Low Supply": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "Critical": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "Out of Stock": return "bg-neutral-500/10 text-neutral-500 border-neutral-500/20";
      default: return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <Card className="glass h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" /> Supply Registry
          </CardTitle>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search ingredients..." 
                className="pl-9 bg-background/50 border-border/40 text-sm"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>
            <Button variant="outline" size="icon" className="shrink-0 bg-background/50">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto rounded-lg border border-border/40 bg-card/30 flex-1">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] uppercase tracking-wider text-muted-foreground bg-muted/30 border-b border-border/40 sticky top-0 z-10 backdrop-blur-md">
              <tr>
                <th className="px-4 py-3 font-bold cursor-pointer hover:text-foreground" onClick={() => handleSort("name")}>
                  <div className="flex items-center gap-1">Ingredient <ArrowUpDown className="h-3 w-3" /></div>
                </th>
                <th className="px-4 py-3 font-bold cursor-pointer hover:text-foreground" onClick={() => handleSort("category")}>
                  <div className="flex items-center gap-1">Category <ArrowUpDown className="h-3 w-3" /></div>
                </th>
                <th className="px-4 py-3 font-bold cursor-pointer hover:text-foreground" onClick={() => handleSort("supplyLevel")}>
                  <div className="flex items-center gap-1">Supply Status <ArrowUpDown className="h-3 w-3" /></div>
                </th>
                <th className="px-4 py-3 font-bold cursor-pointer hover:text-foreground" onClick={() => handleSort("marketPrice")}>
                  <div className="flex items-center gap-1">Price (XAF) <ArrowUpDown className="h-3 w-3" /></div>
                </th>
                <th className="px-4 py-3 font-bold hidden md:table-cell">Market Source</th>
                <th className="px-4 py-3 font-bold text-right cursor-pointer hover:text-foreground" onClick={() => handleSort("riskScore")}>
                  <div className="flex items-center justify-end gap-1">Risk Score <ArrowUpDown className="h-3 w-3" /></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.length > 0 ? paginated.map((ing) => (
                <tr key={ing.id} className="border-b border-border/20 hover:bg-muted/10 transition-colors group">
                  <td className="px-4 py-3 font-bold text-foreground">
                    {ing.name}
                    <div className="text-[10px] text-muted-foreground font-normal mt-0.5">{ing.id}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{ing.category}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(ing.supplyLevel)}`}>
                      {ing.supplyLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground font-mono">{ing.marketPrice.toLocaleString()} F</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell truncate max-w-[150px]">
                    {ing.marketSource}
                    <div className="text-[10px] text-primary/70">{ing.region}</div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-1.5 bg-muted/40 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${ing.riskScore > 75 ? 'bg-destructive' : ing.riskScore > 40 ? 'bg-warning' : 'bg-success'}`}
                          style={{ width: `${ing.riskScore}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold w-6">{ing.riskScore}</span>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground text-sm">
                    No ingredients found matching &quot;{searchTerm}&quot;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
            Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, sorted.length)} of {sorted.length}
          </p>
          <div className="flex items-center gap-1">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-7 w-7 bg-background/50" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-7 w-7 bg-background/50"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

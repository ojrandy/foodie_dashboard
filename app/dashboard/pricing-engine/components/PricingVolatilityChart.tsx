"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { BarChart2, Plus, X, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import type { CommodityPrice } from "../types";
import { generateHistoricalData } from "../hooks/usePricingEngine";

const CHART_COLORS = [
  "#8b5cf6", // Purple (primary)
  "#0ea5e9", // Sky blue
  "#10b981", // Emerald
  "#f43f5e", // Rose
  "#f59e0b", // Amber
];

interface PricingVolatilityChartProps {
  commodities: CommodityPrice[];
  mounted: boolean;
}

export function PricingVolatilityChart({ commodities, mounted }: PricingVolatilityChartProps) {
  const [timeframe, setTimeframe] = useState<'weeks' | 'months' | 'year'>('months');
  
  // Default selected: Tomatoes & Palm Oil
  const [selectedIds, setSelectedIds] = useState<string[]>(["com-1", "com-2"]);
  
  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedCommodities = useMemo(() => {
    return selectedIds.map(id => commodities.find(c => c.id === id)).filter(Boolean) as CommodityPrice[];
  }, [selectedIds, commodities]);

  const chartData = useMemo(() => {
    if (selectedCommodities.length === 0) return [];
    return generateHistoricalData(selectedCommodities, timeframe);
  }, [selectedCommodities, timeframe]);

  const unselectedCommodities = useMemo(() => {
    return commodities.filter(c => !selectedIds.includes(c.id) && c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [commodities, selectedIds, searchTerm]);

  const handleAddCommodity = (id: string) => {
    if (selectedIds.length < 5) {
      setSelectedIds([...selectedIds, id]);
      setSearchTerm("");
      setIsDropdownOpen(false);
    }
  };

  const handleRemoveCommodity = (id: string) => {
    setSelectedIds(selectedIds.filter(item => item !== id));
  };

  return (
    <Card className="lg:col-span-8 glass relative overflow-visible z-10">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-accent" /> Commodity Price Volatility Map
          </CardTitle>
          
          {/* Timeframe Toggle */}
          <div className="flex bg-muted/30 rounded-lg p-1 border border-border/40">
            <button 
              onClick={() => setTimeframe('weeks')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${timeframe === 'weeks' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Weeks
            </button>
            <button 
              onClick={() => setTimeframe('months')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${timeframe === 'months' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Months
            </button>
            <button 
              onClick={() => setTimeframe('year')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${timeframe === 'year' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Year
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0 space-y-6">
        
        {/* Commodity Selector UI */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center relative" ref={dropdownRef}>
          <div className="flex flex-wrap gap-2 flex-1">
            {selectedCommodities.map((c, idx) => (
              <div 
                key={c.id} 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold bg-card"
                style={{ borderColor: CHART_COLORS[idx % CHART_COLORS.length], color: CHART_COLORS[idx % CHART_COLORS.length] }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }} />
                {c.name}
                <button onClick={() => handleRemoveCommodity(c.id)} className="ml-1 hover:opacity-70 transition-opacity">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            
            {selectedIds.length < 5 && (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 rounded-full text-xs gap-1 border-dashed border-muted-foreground/50 text-muted-foreground hover:border-foreground hover:text-foreground"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Plus className="h-3 w-3" /> Compare Commodity
              </Button>
            )}
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-10 left-0 w-full sm:w-72 bg-card border border-border shadow-2xl rounded-xl z-[100] overflow-hidden">
              <div className="p-2 border-b border-border/40 flex items-center gap-2 bg-muted/20">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input 
                  autoFocus
                  placeholder="Search commodities..." 
                  className="bg-transparent border-none outline-none text-xs w-full text-foreground"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="max-h-60 overflow-y-auto p-1">
                {unselectedCommodities.length === 0 ? (
                  <p className="text-xs text-muted-foreground p-3 text-center">No commodities found.</p>
                ) : (
                  unselectedCommodities.map(c => (
                    <button 
                      key={c.id} 
                      className="w-full text-left px-3 py-2 text-xs rounded-md hover:bg-muted/50 transition-colors flex justify-between items-center"
                      onClick={() => handleAddCommodity(c.id)}
                    >
                      <span className="font-bold">{c.name}</span>
                      <span className="text-[10px] text-muted-foreground uppercase">{c.category}</span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Chart Engine */}
        <div className="h-[300px] w-full mt-4">
          {!mounted ? (
            <div className="h-full w-full animate-pulse rounded bg-muted/20" />
          ) : selectedCommodities.length === 0 ? (
            <div className="h-full w-full flex flex-col items-center justify-center border-2 border-dashed border-border/40 rounded-xl bg-muted/5">
              <BarChart2 className="h-10 w-10 text-muted-foreground/30 mb-2" />
              <p className="text-sm font-bold text-muted-foreground">No commodities selected.</p>
              <p className="text-xs text-muted-foreground">Click &quot;Compare Commodity&quot; to add data.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  {selectedCommodities.map((c, idx) => (
                    <linearGradient key={`grad-${c.id}`} id={`color-${c.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={CHART_COLORS[idx % CHART_COLORS.length]} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={CHART_COLORS[idx % CHART_COLORS.length]} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <XAxis dataKey="label" stroke="#888" fontSize={11} tickLine={false} />
                <YAxis stroke="#888" fontSize={11} tickLine={false} tickFormatter={(val) => `${val >= 1000 ? (val/1000).toFixed(0)+'k' : val}`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "0.75rem",
                    color: "var(--foreground)",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
                  }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  labelStyle={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}
                />
                <Area type="monotone" dataKey="ghost_for_legend" stroke="none" fill="none" /> {/* Spacer */}
                {selectedCommodities.map((c, idx) => (
                  <Area
                    key={c.id}
                    name={c.name}
                    type="monotone"
                    dataKey={c.id}
                    stroke={CHART_COLORS[idx % CHART_COLORS.length]}
                    fillOpacity={1}
                    fill={`url(#color-${c.id})`}
                    strokeWidth={2.5}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

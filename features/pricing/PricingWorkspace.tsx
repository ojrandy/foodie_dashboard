"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  TrendingUp, TrendingDown, DollarSign, MapPin, 
  Sparkles, ShieldAlert, X, Plus, BarChart2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend
} from "recharts";

// ==========================================
// TYPES & MOCK DATA
// ==========================================

export interface CommodityPrice {
  id: string;
  name: string;
  unit: string;
  bueaPrice: number;
  doualaPrice: number;
  yaoundePrice: number;
  shortageProbability: number; // 0 to 100
  trend: "up" | "down" | "stable";
  category: "Vegetables" | "Tubers" | "Oils" | "Proteins" | "Spices";
  lastUpdated: string;
}

const INITIAL_COMMODITIES: CommodityPrice[] = [
  {
    id: "com-1",
    name: "Tomato Basket (Large)",
    unit: "20kg Basket",
    bueaPrice: 8500,
    doualaPrice: 7000,
    yaoundePrice: 7500,
    shortageProbability: 65,
    trend: "up",
    category: "Vegetables",
    lastUpdated: "2 hours ago"
  },
  {
    id: "com-2",
    name: "Palm Oil (Red)",
    unit: "20 Liters",
    bueaPrice: 19500,
    doualaPrice: 17500,
    yaoundePrice: 18000,
    shortageProbability: 25,
    trend: "down",
    category: "Oils",
    lastUpdated: "4 hours ago"
  },
  {
    id: "com-3",
    name: "Plantain Bunch (Grade A)",
    unit: "Standard Bunch",
    bueaPrice: 3500,
    doualaPrice: 2800,
    yaoundePrice: 3000,
    shortageProbability: 45,
    trend: "up",
    category: "Tubers",
    lastUpdated: "1 day ago"
  },
  {
    id: "com-4",
    name: "Fresh Habenero Pepper",
    unit: "5kg Bucket",
    bueaPrice: 5500,
    doualaPrice: 4200,
    yaoundePrice: 4600,
    shortageProbability: 80,
    trend: "up",
    category: "Spices",
    lastUpdated: "3 hours ago"
  },
  {
    id: "com-5",
    name: "Smoked Fish (Kanga)",
    unit: "Medium Carton",
    bueaPrice: 22000,
    doualaPrice: 19000,
    yaoundePrice: 19500,
    shortageProbability: 15,
    trend: "stable",
    category: "Proteins",
    lastUpdated: "2 days ago"
  },
  {
    id: "com-6",
    name: "Irish Potato Bag",
    unit: "50kg Sack",
    bueaPrice: 24000,
    doualaPrice: 27000,
    yaoundePrice: 25000,
    shortageProbability: 30,
    trend: "down",
    category: "Tubers",
    lastUpdated: "12 hours ago"
  }
];

const HISTORICAL_TREND_DATA = [
  { month: "Jan", Tomatoes: 6200, PalmOil: 16000, Plantains: 2100 },
  { month: "Feb", Tomatoes: 6800, PalmOil: 16500, Plantains: 2300 },
  { month: "Mar", Tomatoes: 7500, PalmOil: 18000, Plantains: 2900 },
  { month: "Apr", Tomatoes: 9000, PalmOil: 17200, Plantains: 3200 },
  { month: "May", Tomatoes: 8500, PalmOil: 19500, Plantains: 3500 }
];

export function PricingWorkspace() {
  const [commodities, setCommodities] = useState<CommodityPrice[]>(INITIAL_COMMODITIES);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Add commodity form state
  const [newName, setNewName] = useState("");
  const [newUnit, setNewUnit] = useState("Basket");
  const [newCategory, setNewCategory] = useState<CommodityPrice["category"]>("Vegetables");
  const [newBuea, setNewBuea] = useState(6000);
  const [newDouala, setNewDouala] = useState(5500);
  const [newYaounde, setNewYaounde] = useState(5800);
  const [newShortage, setNewShortage] = useState(30);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const filteredCommodities = useMemo(() => {
    return commodities.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
        c.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "All" || c.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [commodities, search, categoryFilter]);

  const stats = useMemo(() => {
    const total = commodities.length;
    const avgBuea = Math.round(commodities.reduce((sum, c) => sum + c.bueaPrice, 0) / total);
    const avgDouala = Math.round(commodities.reduce((sum, c) => sum + c.doualaPrice, 0) / total);
    const avgYaounde = Math.round(commodities.reduce((sum, c) => sum + c.yaoundePrice, 0) / total);
    const highRiskShortages = commodities.filter(c => c.shortageProbability > 50).length;
    return { avgBuea, avgDouala, avgYaounde, highRiskShortages };
  }, [commodities]);

  const handleAddCommodity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      toast.error("Please provide a valid commodity name");
      return;
    }

    const newCom: CommodityPrice = {
      id: `com-${Date.now()}`,
      name: newName,
      unit: newUnit,
      category: newCategory,
      bueaPrice: newBuea,
      doualaPrice: newDouala,
      yaoundePrice: newYaounde,
      shortageProbability: newShortage,
      trend: newShortage > 50 ? "up" : "stable",
      lastUpdated: "Just now"
    };

    setCommodities((prev) => [newCom, ...prev]);
    setIsAddOpen(false);
    toast.success(`${newName} index added successfully to market monitors.`);
    setNewName("");
  };

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-accent animate-pulse" /> Cameroon Market Pricing Engine
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time cross-regional commodity comparisons, volatility intelligence, and predictive shortage metrics.
          </p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="gap-2 shadow-md">
          <Plus className="h-4 w-4" /> Add Commodity Index
        </Button>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase flex items-center gap-1">
                <MapPin className="h-3 w-3 text-accent" /> Buea Avg Index
              </span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">
                {stats.avgBuea.toLocaleString()} XAF
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <DollarSign className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase flex items-center gap-1">
                <MapPin className="h-3 w-3 text-sky-500" /> Douala Avg Index
              </span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">
                {stats.avgDouala.toLocaleString()} XAF
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500">
              <DollarSign className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase flex items-center gap-1">
                <MapPin className="h-3 w-3 text-emerald-500" /> Yaounde Avg Index
              </span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">
                {stats.avgYaounde.toLocaleString()} XAF
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <DollarSign className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-destructive/20 bg-destructive/5">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-[0.08em] text-destructive uppercase flex items-center gap-1">
                <ShieldAlert className="h-3 w-3" /> Shortage Warnings
              </span>
              <div className="text-2xl font-extrabold mt-1 text-destructive">
                {stats.highRiskShortages} Commodities
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
              <ShieldAlert className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DUAL COLUMN - VOLATILITY & SHORTAGE PREDICTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Volatility Chart */}
        <Card className="lg:col-span-8 glass">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-accent" /> Commodity Price Volatility Map
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="h-[300px] w-full">
              {!mounted ? (
                <div className="h-full w-full animate-pulse rounded bg-muted/20" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={HISTORICAL_TREND_DATA}>
                    <defs>
                      <linearGradient id="colorTomatoes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorOils" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#888" fontSize={11} tickLine={false} />
                    <YAxis stroke="#888" fontSize={11} tickLine={false} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)",
                        borderRadius: "0.75rem",
                        color: "var(--foreground)"
                      }}
                    />
                    <Legend verticalAlign="top" height={36} iconType="circle" />
                    <Area name="Tomatoes (Large Basket)" type="monotone" dataKey="Tomatoes" stroke="var(--primary)" fillOpacity={1} fill="url(#colorTomatoes)" strokeWidth={2.5} />
                    <Area name="Palm Oil (20L)" type="monotone" dataKey="PalmOil" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorOils)" strokeWidth={2.5} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Shortage Risk Panel */}
        <Card className="lg:col-span-4 glass">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-1.5">
              <Sparkles className="h-5 w-5 text-accent" /> AI Shortage Predictor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {commodities.slice(0, 4).map((com) => (
              <div key={com.id} className="p-3.5 rounded-xl border border-border/40 bg-muted/20 glass space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{com.name}</h4>
                    <span className="text-[10px] text-muted-foreground">Updated {com.lastUpdated}</span>
                  </div>
                  <Badge 
                    className={
                      com.shortageProbability > 60 
                        ? "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/10" 
                        : com.shortageProbability > 30 
                        ? "bg-warning/10 text-warning border border-warning/20 hover:bg-warning/10" 
                        : "bg-success/10 text-success border border-success/20 hover:bg-success/10"
                    }
                  >
                    {com.shortageProbability}% Risk
                  </Badge>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${com.shortageProbability}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      com.shortageProbability > 60 
                        ? "bg-destructive" 
                        : com.shortageProbability > 30 
                        ? "bg-warning" 
                        : "bg-success"
                    }`}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card/40 border border-border/40 p-4 rounded-xl glass shadow-sm">
        <div className="relative w-full sm:max-w-xs group">
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search commodities..." 
            className="pl-3 bg-muted/30 border-border/50 focus-visible:ring-accent/30"
          />
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <Badge 
            onClick={() => setCategoryFilter("All")}
            className={`cursor-pointer px-3 py-1 ${categoryFilter === "All" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            All Items
          </Badge>
          {["Vegetables", "Tubers", "Oils", "Spices"].map((cat) => (
            <Badge 
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`cursor-pointer px-3 py-1 ${categoryFilter === cat ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {/* CROSS REGIONAL PRICE MATRIX GRID */}
      <Card className="glass overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border/40 bg-muted/20 text-muted-foreground uppercase font-bold tracking-wider">
                  <th className="p-4">Commodity / Unit</th>
                  <th className="p-4">Buea Market</th>
                  <th className="p-4">Douala Market</th>
                  <th className="p-4">Yaounde Market</th>
                  <th className="p-4 text-center">Spreads / Volatility</th>
                  <th className="p-4 text-center">Trend Indicator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {filteredCommodities.map((c) => {
                  const maxPrice = Math.max(c.bueaPrice, c.doualaPrice, c.yaoundePrice);
                  const minPrice = Math.min(c.bueaPrice, c.doualaPrice, c.yaoundePrice);
                  const spread = maxPrice - minPrice;

                  return (
                    <tr 
                      key={c.id}
                      className="transition-colors text-foreground hover:bg-muted/10 cursor-pointer"
                    >
                      <td className="p-4">
                        <div className="font-extrabold text-sm">{c.name}</div>
                        <div className="text-[10px] text-muted-foreground">{c.unit} | {c.category}</div>
                      </td>
                      <td className="p-4 font-semibold">
                        <span className={c.bueaPrice === minPrice ? "text-emerald-500 font-extrabold" : c.bueaPrice === maxPrice ? "text-destructive" : ""}>
                          {c.bueaPrice.toLocaleString()} XAF
                        </span>
                        {c.bueaPrice === minPrice && <Badge className="ml-1.5 text-[8px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/10">Cheapest</Badge>}
                      </td>
                      <td className="p-4 font-semibold">
                        <span className={c.doualaPrice === minPrice ? "text-emerald-500 font-extrabold" : c.doualaPrice === maxPrice ? "text-destructive" : ""}>
                          {c.doualaPrice.toLocaleString()} XAF
                        </span>
                        {c.doualaPrice === minPrice && <Badge className="ml-1.5 text-[8px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/10">Cheapest</Badge>}
                      </td>
                      <td className="p-4 font-semibold">
                        <span className={c.yaoundePrice === minPrice ? "text-emerald-500 font-extrabold" : c.yaoundePrice === maxPrice ? "text-destructive" : ""}>
                          {c.yaoundePrice.toLocaleString()} XAF
                        </span>
                        {c.yaoundePrice === minPrice && <Badge className="ml-1.5 text-[8px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/10">Cheapest</Badge>}
                      </td>
                      <td className="p-4 text-center">
                        <div className="font-extrabold text-accent">+{spread.toLocaleString()} XAF Spread</div>
                        <div className="text-[9px] text-muted-foreground font-semibold uppercase mt-0.5">Spread Index</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-1.5">
                          {c.trend === "up" ? (
                            <Badge className="bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/10 flex gap-1 items-center">
                              <TrendingUp className="h-3 w-3" /> Inflationary
                            </Badge>
                          ) : c.trend === "down" ? (
                            <Badge className="bg-success/10 text-success border border-success/20 hover:bg-success/10 flex gap-1 items-center">
                              <TrendingDown className="h-3 w-3" /> Deflationary
                            </Badge>
                          ) : (
                            <Badge className="bg-muted text-muted-foreground border border-border/20 hover:bg-muted flex gap-1 items-center">
                              Stable
                            </Badge>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ADD DIALOG MODAL */}
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
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-card border border-border/40 p-6 rounded-2xl glass shadow-2xl z-[950]"
            >
              <div className="flex justify-between items-center border-b border-border/40 pb-4 mb-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-1.5">
                  <Sparkles className="h-5 w-5 text-accent" /> Add Market Price Monitor
                </h3>
                <Button size="icon" variant="ghost" onClick={() => setIsAddOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleAddCommodity} className="space-y-4 text-xs">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wide">Commodity Name *</label>
                  <Input 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. White Beans Sack, Local Rice..." 
                    className="bg-muted/30 focus-visible:ring-accent/30"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-muted-foreground uppercase tracking-wide">Unit Measure</label>
                    <Input 
                      value={newUnit}
                      onChange={(e) => setNewUnit(e.target.value)}
                      placeholder="e.g. 50kg Sack, 20L Jerrycan" 
                      className="bg-muted/30 focus-visible:ring-accent/30"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-muted-foreground uppercase tracking-wide">Category</label>
                    <select 
                      value={newCategory}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewCategory(e.target.value as CommodityPrice["category"])}
                      className="bg-muted/30 border border-border/40 rounded-lg p-2.5 text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 cursor-pointer"
                    >
                      <option value="Vegetables">Vegetables</option>
                      <option value="Tubers">Tubers</option>
                      <option value="Oils">Oils</option>
                      <option value="Proteins">Proteins</option>
                      <option value="Spices">Spices</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-muted-foreground uppercase tracking-wide">Buea (XAF)</label>
                    <Input 
                      type="number"
                      value={newBuea}
                      onChange={(e) => setNewBuea(parseInt(e.target.value) || 0)}
                      className="bg-muted/30 focus-visible:ring-accent/30"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-muted-foreground uppercase tracking-wide">Douala (XAF)</label>
                    <Input 
                      type="number"
                      value={newDouala}
                      onChange={(e) => setNewDouala(parseInt(e.target.value) || 0)}
                      className="bg-muted/30 focus-visible:ring-accent/30"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-muted-foreground uppercase tracking-wide">Yaounde (XAF)</label>
                    <Input 
                      type="number"
                      value={newYaounde}
                      onChange={(e) => setNewYaounde(parseInt(e.target.value) || 0)}
                      className="bg-muted/30 focus-visible:ring-accent/30"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wide">Shortage Probability (0-100%)</label>
                  <Input 
                    type="number"
                    min={0}
                    max={100}
                    value={newShortage}
                    onChange={(e) => setNewShortage(parseInt(e.target.value) || 0)}
                    className="bg-muted/30 focus-visible:ring-accent/30"
                  />
                </div>

                <Button type="submit" className="w-full mt-4 gap-2">
                  <Sparkles className="h-4 w-4" /> Deploy Index Update
                </Button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

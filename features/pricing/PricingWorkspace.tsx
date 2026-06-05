"use client";

import React, { useState, useEffect } from "react";
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

// Implemented Modules
import { usePricingEngine, CommodityPrice, HISTORICAL_TREND_DATA } from "./hooks/usePricingEngine";
import { CostSimulator } from "./components/CostSimulator";
import { RegionalIntelligence } from "./components/RegionalIntelligence";
import { AIPricingInsights } from "./components/AIPricingInsights";

export function PricingWorkspace() {
  const { commodities, stats, addCommodity } = usePricingEngine();
  
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

  const filteredCommodities = commodities.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

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

    addCommodity(newCom);
    setIsAddOpen(false);
    toast.success(`${newName} index added successfully to market monitors.`);
    setNewName("");
  };

  return (
    <div className="space-y-12 pb-12">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-accent animate-pulse" /> Market Pricing Intelligence
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Centralized intelligence system for market trends, forecasting, regional prices, and recipe simulations.
          </p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="gap-2 shadow-md">
          <Plus className="h-4 w-4" /> Add Commodity Index
        </Button>
      </div>

      {/* MODULE 1: PRICING DASHBOARD (KPIs) */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground">Global Market Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="glass">
            <CardContent className="p-4">
              <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase flex items-center gap-1">
                <MapPin className="h-3 w-3 text-accent" /> Buea Avg Index
              </span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">{stats.avgBuea.toLocaleString()} XAF</div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="p-4">
              <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase flex items-center gap-1">
                <MapPin className="h-3 w-3 text-sky-500" /> Douala Avg Index
              </span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">{stats.avgDouala.toLocaleString()} XAF</div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="p-4">
              <span className="text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase flex items-center gap-1">
                <MapPin className="h-3 w-3 text-emerald-500" /> Yaounde Avg Index
              </span>
              <div className="text-2xl font-extrabold mt-1 text-foreground">{stats.avgYaounde.toLocaleString()} XAF</div>
            </CardContent>
          </Card>
          <Card className="glass border-warning/20">
            <CardContent className="p-4">
              <span className="text-[10px] font-bold tracking-[0.08em] text-warning uppercase">Market Volatility</span>
              <div className="text-2xl font-extrabold mt-1 text-warning">{stats.volatilityScore}%</div>
            </CardContent>
          </Card>
          <Card className="glass border-destructive/20 bg-destructive/5">
            <CardContent className="p-4">
              <span className="text-[10px] font-bold tracking-[0.08em] text-destructive uppercase flex items-center gap-1">
                <ShieldAlert className="h-3 w-3" /> Shortage Warnings
              </span>
              <div className="text-2xl font-extrabold mt-1 text-destructive">{stats.highRiskShortages} Items</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* MODULE 5 & 8: VOLATILITY CHART & SHORTAGE PREDICTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
                      contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "0.75rem", color: "var(--foreground)" }}
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

        {/* Shortage Predictor */}
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
                  <Badge className={
                    com.shortageProbability > 60 ? "bg-destructive/10 text-destructive border-destructive/20" : 
                    com.shortageProbability > 30 ? "bg-warning/10 text-warning border-warning/20" : 
                    "bg-success/10 text-success border-success/20"
                  }>
                    {com.shortageProbability}% Risk
                  </Badge>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${com.shortageProbability}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      com.shortageProbability > 60 ? "bg-destructive" : com.shortageProbability > 30 ? "bg-warning" : "bg-success"
                    }`}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <hr className="border-border/40" />

      {/* MODULE 3 & 4: REGIONAL INTELLIGENCE & MARKET SOURCES */}
      <RegionalIntelligence commodities={commodities} />

      <hr className="border-border/40" />

      {/* MODULE 6: SMART PRICING ENGINE */}
      <CostSimulator commodities={commodities} />

      <hr className="border-border/40" />

      {/* MODULE 7, 9, 10: AI INSIGHTS, ALERTS, ANALYTICS */}
      <AIPricingInsights commodities={commodities} />

      <hr className="border-border/40" />

      {/* MODULE 2: INGREDIENT PRICE REGISTRY */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-foreground">Ingredient Price Registry</h3>
        <p className="text-sm text-muted-foreground mb-4">Master database of all tracked commodities across the national network.</p>
        
        {/* Search and Filters */}
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
            <Badge onClick={() => setCategoryFilter("All")} className={`cursor-pointer px-3 py-1 ${categoryFilter === "All" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>All Items</Badge>
            {["Vegetables", "Tubers", "Oils", "Proteins", "Spices"].map((cat) => (
              <Badge key={cat} onClick={() => setCategoryFilter(cat)} className={`cursor-pointer px-3 py-1 ${categoryFilter === cat ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{cat}</Badge>
            ))}
          </div>
        </div>

        {/* Data Grid */}
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
                      <tr key={c.id} className="transition-colors text-foreground hover:bg-muted/10 cursor-pointer">
                        <td className="p-4">
                          <div className="font-extrabold text-sm">{c.name}</div>
                          <div className="text-[10px] text-muted-foreground">{c.unit} | {c.category}</div>
                        </td>
                        <td className="p-4 font-semibold">
                          <span className={c.bueaPrice === minPrice ? "text-emerald-500 font-extrabold" : c.bueaPrice === maxPrice ? "text-destructive" : ""}>{c.bueaPrice.toLocaleString()} XAF</span>
                          {c.bueaPrice === minPrice && <Badge className="ml-1.5 text-[8px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Cheapest</Badge>}
                        </td>
                        <td className="p-4 font-semibold">
                          <span className={c.doualaPrice === minPrice ? "text-emerald-500 font-extrabold" : c.doualaPrice === maxPrice ? "text-destructive" : ""}>{c.doualaPrice.toLocaleString()} XAF</span>
                          {c.doualaPrice === minPrice && <Badge className="ml-1.5 text-[8px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Cheapest</Badge>}
                        </td>
                        <td className="p-4 font-semibold">
                          <span className={c.yaoundePrice === minPrice ? "text-emerald-500 font-extrabold" : c.yaoundePrice === maxPrice ? "text-destructive" : ""}>{c.yaoundePrice.toLocaleString()} XAF</span>
                          {c.yaoundePrice === minPrice && <Badge className="ml-1.5 text-[8px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Cheapest</Badge>}
                        </td>
                        <td className="p-4 text-center">
                          <div className="font-extrabold text-accent">+{spread.toLocaleString()} XAF</div>
                          <div className="text-[9px] text-muted-foreground font-semibold uppercase mt-0.5">Spread Index</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-1.5">
                            {c.trend === "up" ? (
                              <Badge className="bg-destructive/10 text-destructive border-destructive/20 flex gap-1 items-center"><TrendingUp className="h-3 w-3" /> Inflationary</Badge>
                            ) : c.trend === "down" ? (
                              <Badge className="bg-success/10 text-success border-success/20 flex gap-1 items-center"><TrendingDown className="h-3 w-3" /> Deflationary</Badge>
                            ) : (
                              <Badge className="bg-muted text-muted-foreground border-border/20 flex gap-1 items-center">Stable</Badge>
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
      </div>

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
                {/* Form internals omitted for brevity but remain fully functional */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wide">Commodity Name *</label>
                  <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. White Beans Sack..." className="bg-muted/30 focus-visible:ring-accent/30" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-muted-foreground uppercase tracking-wide">Unit</label>
                    <Input value={newUnit} onChange={(e) => setNewUnit(e.target.value)} className="bg-muted/30 focus-visible:ring-accent/30" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-muted-foreground uppercase tracking-wide">Category</label>
                    <select value={newCategory} onChange={(e: any) => setNewCategory(e.target.value)} className="bg-muted/30 border border-border/40 rounded-lg p-2.5">
                      <option value="Vegetables">Vegetables</option>
                      <option value="Tubers">Tubers</option>
                      <option value="Oils">Oils</option>
                      <option value="Proteins">Proteins</option>
                      <option value="Spices">Spices</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1.5"><label>Buea</label><Input type="number" value={newBuea} onChange={(e) => setNewBuea(parseInt(e.target.value)||0)} /></div>
                  <div className="flex flex-col gap-1.5"><label>Douala</label><Input type="number" value={newDouala} onChange={(e) => setNewDouala(parseInt(e.target.value)||0)} /></div>
                  <div className="flex flex-col gap-1.5"><label>Yaounde</label><Input type="number" value={newYaounde} onChange={(e) => setNewYaounde(parseInt(e.target.value)||0)} /></div>
                </div>
                <div className="flex flex-col gap-1.5"><label>Shortage %</label><Input type="number" value={newShortage} onChange={(e) => setNewShortage(parseInt(e.target.value)||0)} /></div>
                
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

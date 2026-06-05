"use client";

import { useState, useMemo } from "react";
import type { CommodityPrice, PricingStats, HistoricalTrend } from "../types";

const INITIAL_COMMODITIES: CommodityPrice[] = [
  { id: "com-1", name: "Tomato Basket (Large)", unit: "20kg Basket", bueaPrice: 8500, doualaPrice: 7000, yaoundePrice: 7500, shortageProbability: 65, trend: "up", category: "Vegetables", lastUpdated: "2 hours ago" },
  { id: "com-2", name: "Palm Oil (Red)", unit: "20 Liters", bueaPrice: 19500, doualaPrice: 17500, yaoundePrice: 18000, shortageProbability: 25, trend: "down", category: "Oils", lastUpdated: "4 hours ago" },
  { id: "com-3", name: "Plantain Bunch (Grade A)", unit: "Standard Bunch", bueaPrice: 3500, doualaPrice: 2800, yaoundePrice: 3000, shortageProbability: 45, trend: "up", category: "Tubers", lastUpdated: "1 day ago" },
  { id: "com-4", name: "Fresh Habenero Pepper", unit: "5kg Bucket", bueaPrice: 5500, doualaPrice: 4200, yaoundePrice: 4600, shortageProbability: 80, trend: "up", category: "Spices", lastUpdated: "3 hours ago" },
  { id: "com-5", name: "Smoked Fish (Kanga)", unit: "Medium Carton", bueaPrice: 22000, doualaPrice: 19000, yaoundePrice: 19500, shortageProbability: 15, trend: "stable", category: "Proteins", lastUpdated: "2 days ago" },
  { id: "com-6", name: "Irish Potato Bag", unit: "50kg Sack", bueaPrice: 24000, doualaPrice: 27000, yaoundePrice: 25000, shortageProbability: 30, trend: "down", category: "Tubers", lastUpdated: "12 hours ago" },
  { id: "com-7", name: "Local Rice (Ndop)", unit: "50kg Bag", bueaPrice: 21000, doualaPrice: 19500, yaoundePrice: 20000, shortageProbability: 10, trend: "stable", category: "Grains", lastUpdated: "5 hours ago" },
  { id: "com-8", name: "Egusi (Melon Seeds)", unit: "5L Bucket", bueaPrice: 12000, doualaPrice: 11000, yaoundePrice: 11500, shortageProbability: 55, trend: "up", category: "Proteins", lastUpdated: "6 hours ago" },
  { id: "com-9", name: "Groundnut (Raw)", unit: "15L Bucket", bueaPrice: 14000, doualaPrice: 12500, yaoundePrice: 13000, shortageProbability: 20, trend: "stable", category: "Proteins", lastUpdated: "1 day ago" },
  { id: "com-10", name: "Ndole Leaves (Washed)", unit: "1kg Bundle", bueaPrice: 1500, doualaPrice: 2000, yaoundePrice: 1800, shortageProbability: 40, trend: "up", category: "Vegetables", lastUpdated: "1 hour ago" },
  { id: "com-11", name: "Onions", unit: "10kg Bag", bueaPrice: 9000, doualaPrice: 7500, yaoundePrice: 8000, shortageProbability: 10, trend: "down", category: "Vegetables", lastUpdated: "3 days ago" },
  { id: "com-12", name: "Refined Vegetable Oil", unit: "5 Liters", bueaPrice: 6500, doualaPrice: 6000, yaoundePrice: 6200, shortageProbability: 5, trend: "stable", category: "Oils", lastUpdated: "12 hours ago" },
  { id: "com-13", name: "Beef (With Bone)", unit: "1kg", bueaPrice: 3000, doualaPrice: 2800, yaoundePrice: 2800, shortageProbability: 15, trend: "stable", category: "Proteins", lastUpdated: "4 hours ago" },
  { id: "com-14", name: "Waterleaf", unit: "Large Bundle", bueaPrice: 500, doualaPrice: 700, yaoundePrice: 600, shortageProbability: 70, trend: "up", category: "Vegetables", lastUpdated: "30 mins ago" },
  { id: "com-15", name: "Garri (White)", unit: "15L Bucket", bueaPrice: 4500, doualaPrice: 4000, yaoundePrice: 4200, shortageProbability: 5, trend: "stable", category: "Tubers", lastUpdated: "1 day ago" },
  { id: "com-16", name: "Cassava Tubers", unit: "50kg Sack", bueaPrice: 12000, doualaPrice: 14000, yaoundePrice: 13500, shortageProbability: 10, trend: "stable", category: "Tubers", lastUpdated: "5 hours ago" },
  { id: "com-17", name: "Sweet Potatoes", unit: "50kg Sack", bueaPrice: 18000, doualaPrice: 21000, yaoundePrice: 20000, shortageProbability: 20, trend: "up", category: "Tubers", lastUpdated: "6 hours ago" },
  { id: "com-18", name: "Dry Crayfish", unit: "5L Bucket", bueaPrice: 15000, doualaPrice: 12000, yaoundePrice: 13000, shortageProbability: 40, trend: "down", category: "Proteins", lastUpdated: "1 day ago" },
  { id: "com-19", name: "Eru Leaves (Sliced)", unit: "1kg", bueaPrice: 2500, doualaPrice: 3000, yaoundePrice: 2800, shortageProbability: 60, trend: "up", category: "Vegetables", lastUpdated: "2 hours ago" },
  { id: "com-20", name: "Bitterleaf (Washed)", unit: "1kg Bundle", bueaPrice: 1200, doualaPrice: 1500, yaoundePrice: 1400, shortageProbability: 30, trend: "stable", category: "Vegetables", lastUpdated: "3 hours ago" },
  { id: "com-21", name: "Maggi Cubes", unit: "Carton", bueaPrice: 11000, doualaPrice: 10500, yaoundePrice: 10800, shortageProbability: 2, trend: "stable", category: "Spices", lastUpdated: "12 hours ago" },
  { id: "com-22", name: "Table Salt", unit: "25kg Bag", bueaPrice: 6500, doualaPrice: 6000, yaoundePrice: 6200, shortageProbability: 5, trend: "down", category: "Spices", lastUpdated: "2 days ago" },
  { id: "com-23", name: "Frozen Chicken", unit: "Carton (10kg)", bueaPrice: 18000, doualaPrice: 16500, yaoundePrice: 17000, shortageProbability: 15, trend: "stable", category: "Proteins", lastUpdated: "4 hours ago" },
  { id: "com-24", name: "Fresh Pork", unit: "1kg", bueaPrice: 2800, doualaPrice: 3000, yaoundePrice: 2900, shortageProbability: 25, trend: "up", category: "Proteins", lastUpdated: "1 hour ago" },
  { id: "com-25", name: "Red Beans", unit: "15L Bucket", bueaPrice: 11000, doualaPrice: 9500, yaoundePrice: 10000, shortageProbability: 15, trend: "down", category: "Grains", lastUpdated: "1 day ago" },
  { id: "com-26", name: "Fresh Okra", unit: "5kg Basket", bueaPrice: 4000, doualaPrice: 5500, yaoundePrice: 5000, shortageProbability: 75, trend: "up", category: "Vegetables", lastUpdated: "2 hours ago" },
  { id: "com-27", name: "Garlic", unit: "1kg", bueaPrice: 3500, doualaPrice: 3000, yaoundePrice: 3200, shortageProbability: 10, trend: "stable", category: "Spices", lastUpdated: "3 days ago" },
  { id: "com-28", name: "Ginger", unit: "1kg", bueaPrice: 2000, doualaPrice: 1800, yaoundePrice: 1900, shortageProbability: 10, trend: "stable", category: "Spices", lastUpdated: "3 days ago" },
  { id: "com-29", name: "White Sugar", unit: "50kg Bag", bueaPrice: 35000, doualaPrice: 33000, yaoundePrice: 34000, shortageProbability: 5, trend: "stable", category: "Spices", lastUpdated: "1 week ago" },
  { id: "com-30", name: "Spaghetti", unit: "Carton", bueaPrice: 6000, doualaPrice: 5500, yaoundePrice: 5800, shortageProbability: 2, trend: "stable", category: "Grains", lastUpdated: "1 week ago" },
];

export function generateHistoricalData(commodities: CommodityPrice[], timeframe: 'weeks' | 'months' | 'year'): HistoricalTrend[] {
  let labels: string[] = [];
  let steps = 0;

  if (timeframe === 'weeks') {
    steps = 7;
    // Walk backward 7 weeks from today to get accurate "Month WX" labels
    for (let i = steps - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - (i * 7));
      const monthStr = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(d);
      // approximate week of the month (1-4/5)
      const weekNum = Math.ceil(d.getDate() / 7);
      labels.push(`${monthStr} W${weekNum}`);
    }
  } else if (timeframe === 'months') {
    steps = 6;
    for (let i = steps - 1; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      labels.push(new Intl.DateTimeFormat('en-US', { month: 'short' }).format(d));
    }
  } else {
    steps = 5;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // 0-11
    
    for (let i = steps - 1; i >= 0; i--) {
      const yearStr = (currentYear - i).toString();
      if (i === 0) {
        // Current year: determine if H1 or H2
        const half = currentMonth < 6 ? "H1" : "H2";
        labels.push(`${yearStr} (${half})`);
      } else {
        labels.push(yearStr);
      }
    }
  }

  const data: HistoricalTrend[] = [];

  for (let i = 0; i < steps; i++) {
    const point: HistoricalTrend = { label: labels[i] };
    
    commodities.forEach(c => {
      // Base average price today
      const basePrice = Math.round((c.bueaPrice + c.doualaPrice + c.yaoundePrice) / 3);
      
      // Calculate historical price by walking backwards from the base price based on trend
      const isUp = c.trend === "up";
      const isDown = c.trend === "down";
      
      // The further back in time we go (i=0 is furthest past, i=steps-1 is today)
      // If trend is UP today, it means past was CHEAPER.
      // If trend is DOWN today, it means past was MORE EXPENSIVE.
      const timeDistance = (steps - 1 - i); // 0 at today, max at beginning
      
      // Volatility factor based on shortage probability (0-100)
      const vol = c.shortageProbability / 100;
      
      let pastPrice = basePrice;
      
      if (isUp) {
        pastPrice = basePrice * (1 - (0.05 * timeDistance)); // Drop by 5% each step back
      } else if (isDown) {
        pastPrice = basePrice * (1 + (0.05 * timeDistance)); // Rise by 5% each step back
      }
      
      // Add some random noise based on volatility
      // Random multiplier between 0.95 and 1.05, scaled by vol
      // We use a pseudo-random seed based on id and i to keep it stable
      const pseudoRandom = Math.sin((c.id.length * 13) + (i * 17)) * 0.5 + 0.5; // 0 to 1
      const noise = (pseudoRandom * 0.2 - 0.1) * vol; // -0.1*vol to +0.1*vol
      
      pastPrice = pastPrice * (1 + noise);
      
      // Round to nearest 50 XAF
      point[c.id] = Math.round(pastPrice / 50) * 50;
    });
    
    data.push(point);
  }

  return data;
}

export function usePricingEngine() {
  const [commodities, setCommodities] = useState<CommodityPrice[]>(INITIAL_COMMODITIES);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredCommodities = useMemo(() => {
    return commodities.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || c.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [commodities, search, categoryFilter]);

  const stats = useMemo(() => {
    const total = commodities.length;
    const avgBuea = Math.round(commodities.reduce((sum, c) => sum + c.bueaPrice, 0) / total);
    const avgDouala = Math.round(commodities.reduce((sum, c) => sum + c.doualaPrice, 0) / total);
    const avgYaounde = Math.round(commodities.reduce((sum, c) => sum + c.yaoundePrice, 0) / total);
    const highRiskShortages = commodities.filter((c) => c.shortageProbability > 50).length;
    
    const volatilityScore = Math.round((commodities.filter(c => c.trend !== "stable").length / total) * 100);

    const rising = commodities.filter(c => c.trend === "up").length;
    const falling = commodities.filter(c => c.trend === "down").length;
    const stable = commodities.filter(c => c.trend === "stable").length;

    return { 
      avgBuea, avgDouala, avgYaounde, highRiskShortages, 
      volatilityScore, rising, falling, stable 
    };
  }, [commodities]);

  const categories = useMemo(
    () => [...new Set(commodities.map((c) => c.category))],
    [commodities]
  );

  return {
    commodities,
    filteredCommodities,
    stats,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    categories,
    setCommodities
  };
}

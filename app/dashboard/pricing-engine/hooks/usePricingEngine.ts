"use client";

import { useState, useMemo } from "react";
import type {
  CommodityPrice,
  PricingStats,
  HistoricalTrend,
} from "../types";

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
    lastUpdated: "2 hours ago",
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
    lastUpdated: "4 hours ago",
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
    lastUpdated: "1 day ago",
  },
  {
    id: "com-4",
    name: "Fresh Habanero Pepper",
    unit: "5kg Bucket",
    bueaPrice: 5500,
    doualaPrice: 4200,
    yaoundePrice: 4600,
    shortageProbability: 80,
    trend: "up",
    category: "Spices",
    lastUpdated: "3 hours ago",
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
    lastUpdated: "2 days ago",
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
    lastUpdated: "12 hours ago",
  },
];

const HISTORICAL_TREND_DATA: HistoricalTrend[] = [
  { month: "Jan", Tomatoes: 6200, PalmOil: 16000, Plantains: 2100 },
  { month: "Feb", Tomatoes: 6800, PalmOil: 16500, Plantains: 2300 },
  { month: "Mar", Tomatoes: 7500, PalmOil: 18000, Plantains: 2900 },
  { month: "Apr", Tomatoes: 9000, PalmOil: 17200, Plantains: 3200 },
  { month: "May", Tomatoes: 8500, PalmOil: 19500, Plantains: 3500 },
];

export function usePricingEngine() {
  const [commodities] = useState<CommodityPrice[]>(INITIAL_COMMODITIES);
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

  const stats: PricingStats = useMemo(() => {
    const total = commodities.length;
    const avgBuea = Math.round(
      commodities.reduce((sum, c) => sum + c.bueaPrice, 0) / total
    );
    const avgDouala = Math.round(
      commodities.reduce((sum, c) => sum + c.doualaPrice, 0) / total
    );
    const avgYaounde = Math.round(
      commodities.reduce((sum, c) => sum + c.yaoundePrice, 0) / total
    );
    const highRiskShortages = commodities.filter(
      (c) => c.shortageProbability > 50
    ).length;
    return { avgBuea, avgDouala, avgYaounde, highRiskShortages };
  }, [commodities]);

  const historicalData = HISTORICAL_TREND_DATA;

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
    historicalData,
    categories,
  };
}

import { useState, useMemo, useEffect } from "react";

export interface CommodityPrice {
  id: string;
  name: string;
  unit: string;
  bueaPrice: number;
  doualaPrice: number;
  yaoundePrice: number;
  shortageProbability: number; // 0 to 100
  trend: "up" | "down" | "stable";
  category: "Vegetables" | "Tubers" | "Oils" | "Proteins" | "Spices" | "Grains";
  lastUpdated: string;
}

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
];

export const HISTORICAL_TREND_DATA = [
  { month: "Jan", Tomatoes: 6200, PalmOil: 16000, Plantains: 2100 },
  { month: "Feb", Tomatoes: 6800, PalmOil: 16500, Plantains: 2300 },
  { month: "Mar", Tomatoes: 7500, PalmOil: 18000, Plantains: 2900 },
  { month: "Apr", Tomatoes: 9000, PalmOil: 17200, Plantains: 3200 },
  { month: "May", Tomatoes: 8500, PalmOil: 19500, Plantains: 3500 },
  { month: "Jun", Tomatoes: 9500, PalmOil: 18500, Plantains: 3600 }
];

export function usePricingEngine() {
  const [commodities, setCommodities] = useState<CommodityPrice[]>(INITIAL_COMMODITIES);

  const stats = useMemo(() => {
    const total = commodities.length;
    const avgBuea = Math.round(commodities.reduce((sum, c) => sum + c.bueaPrice, 0) / total);
    const avgDouala = Math.round(commodities.reduce((sum, c) => sum + c.doualaPrice, 0) / total);
    const avgYaounde = Math.round(commodities.reduce((sum, c) => sum + c.yaoundePrice, 0) / total);
    const highRiskShortages = commodities.filter(c => c.shortageProbability > 50).length;
    
    // Market Volatility Score (mock calc)
    const volatilityScore = Math.round((commodities.filter(c => c.trend !== "stable").length / total) * 100);

    const rising = commodities.filter(c => c.trend === "up").length;
    const falling = commodities.filter(c => c.trend === "down").length;
    const stable = commodities.filter(c => c.trend === "stable").length;

    return { avgBuea, avgDouala, avgYaounde, highRiskShortages, volatilityScore, rising, falling, stable };
  }, [commodities]);

  const addCommodity = (newCom: CommodityPrice) => {
    setCommodities(prev => [newCom, ...prev]);
  };

  return {
    commodities,
    stats,
    addCommodity
  };
}

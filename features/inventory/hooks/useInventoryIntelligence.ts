import { useState } from "react";

export type SupplyLevel = "Available" | "Low Supply" | "Critical" | "Out of Stock";
export type RiskLevel = "Low" | "Medium" | "High" | "Critical";

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  supplyLevel: SupplyLevel;
  marketPrice: number;
  marketSource: string;
  region: string;
  demandScore: number; // 0 - 100
  riskScore: number; // 0 - 100
  lastUpdated: string;
}

const mockIngredients: Ingredient[] = [
  { id: "ING-01", name: "Tomatoes", category: "Vegetables", supplyLevel: "Low Supply", marketPrice: 2500, marketSource: "OIC Market", region: "South West", demandScore: 92, riskScore: 78, lastUpdated: "10 mins ago" },
  { id: "ING-02", name: "Rice", category: "Grains", supplyLevel: "Available", marketPrice: 20000, marketSource: "Douala Central Market", region: "Littoral", demandScore: 85, riskScore: 20, lastUpdated: "1 hr ago" },
  { id: "ING-03", name: "Chicken", category: "Meat", supplyLevel: "Available", marketPrice: 4500, marketSource: "Mokolo Market", region: "Centre", demandScore: 88, riskScore: 35, lastUpdated: "5 mins ago" },
  { id: "ING-04", name: "Fish", category: "Seafood", supplyLevel: "Critical", marketPrice: 3800, marketSource: "Limbe Down Beach", region: "South West", demandScore: 95, riskScore: 85, lastUpdated: "2 mins ago" },
  { id: "ING-05", name: "Palm Oil", category: "Oils", supplyLevel: "Out of Stock", marketPrice: 1200, marketSource: "Bamenda Main Market", region: "North West", demandScore: 70, riskScore: 90, lastUpdated: "3 hrs ago" },
  { id: "ING-06", name: "Plantains", category: "Fruits", supplyLevel: "Available", marketPrice: 3000, marketSource: "Buea Central Market", region: "South West", demandScore: 82, riskScore: 15, lastUpdated: "10 mins ago" },
  { id: "ING-07", name: "Onions", category: "Vegetables", supplyLevel: "Available", marketPrice: 5000, marketSource: "Maroua Market", region: "Far North", demandScore: 75, riskScore: 25, lastUpdated: "1 hr ago" },
  { id: "ING-08", name: "Egusi", category: "Seeds", supplyLevel: "Low Supply", marketPrice: 1500, marketSource: "Mokolo Market", region: "Centre", demandScore: 65, riskScore: 60, lastUpdated: "45 mins ago" },
  { id: "ING-09", name: "Pepper", category: "Vegetables", supplyLevel: "Available", marketPrice: 1000, marketSource: "OIC Market", region: "South West", demandScore: 80, riskScore: 30, lastUpdated: "5 mins ago" },
  { id: "ING-10", name: "Cassava", category: "Tubers", supplyLevel: "Available", marketPrice: 2500, marketSource: "Edea Market", region: "Littoral", demandScore: 60, riskScore: 10, lastUpdated: "2 hrs ago" },
  { id: "ING-11", name: "Beans", category: "Grains", supplyLevel: "Low Supply", marketPrice: 1200, marketSource: "Bafoussam Market", region: "West", demandScore: 75, riskScore: 65, lastUpdated: "30 mins ago" },
  { id: "ING-12", name: "Groundnuts", category: "Seeds", supplyLevel: "Available", marketPrice: 800, marketSource: "Garoua Market", region: "North", demandScore: 50, riskScore: 20, lastUpdated: "1 hr ago" },
];

export interface FeedEvent {
  id: string;
  title: string;
  time: string;
  type: "positive" | "negative" | "info" | "warning";
}

const mockFeedEvents: FeedEvent[] = [
  { id: "EV-1", title: "Tomatoes marked as Low Supply", time: "2 mins ago", type: "warning" },
  { id: "EV-2", title: "Chicken availability increased in Centre", time: "15 mins ago", type: "positive" },
  { id: "EV-3", title: "Palm Oil shortage detected in Bamenda", time: "45 mins ago", type: "negative" },
  { id: "EV-4", title: "New market prices received from OIC", time: "1 hour ago", type: "info" },
  { id: "EV-5", title: "Fish demand forecasted to rise 18%", time: "2 hours ago", type: "warning" },
];

export function useInventoryIntelligence() {
  const [ingredients] = useState<Ingredient[]>(mockIngredients);
  const [feed] = useState<FeedEvent[]>(mockFeedEvents);

  const kpis = {
    totalTracked: ingredients.length,
    available: ingredients.filter(i => i.supplyLevel === "Available").length,
    lowSupply: ingredients.filter(i => i.supplyLevel === "Low Supply").length,
    critical: ingredients.filter(i => ["Critical", "Out of Stock"].includes(i.supplyLevel)).length,
    stabilityScore: 78,
    availabilityIndex: 82,
  };

  return {
    ingredients,
    feed,
    kpis
  };
}

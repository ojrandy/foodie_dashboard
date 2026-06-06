"use client";

import { useState, useMemo } from "react";
import { AutomationRecipe, OrderSimulation, DeliverySimulation, AutomationStats } from "../types";

const MOCK_RECIPES: AutomationRecipe[] = [
  {
    id: "rec-1",
    name: "Classic Egusi Soup & Fufu",
    category: "Family",
    baseServings: 4,
    preparationTime: 45,
    profitabilityScore: 85,
    ingredients: [
      { id: "ing-1", name: "Egusi Seeds", category: "Proteins", quantityNeeded: 3, unit: "Cups", currentMarketPrice: 1200, marketSource: "Buea Central" },
      { id: "ing-2", name: "Smoked Fish", category: "Proteins", quantityNeeded: 2, unit: "Pieces", currentMarketPrice: 2500, marketSource: "Douala Marche" },
      { id: "ing-3", name: "Palm Oil", category: "Oils", quantityNeeded: 0.5, unit: "Liters", currentMarketPrice: 900, marketSource: "Buea Central" },
      { id: "ing-4", name: "Bitterleaf", category: "Vegetables", quantityNeeded: 2, unit: "Bundles", currentMarketPrice: 500, marketSource: "Muea Market" },
      { id: "ing-5", name: "Fufu Flour", category: "Tubers", quantityNeeded: 2, unit: "Kg", currentMarketPrice: 600, marketSource: "Buea Central" }
    ]
  },
  {
    id: "rec-2",
    name: "Student Budget Jollof Rice",
    category: "Student",
    baseServings: 2,
    preparationTime: 30,
    profitabilityScore: 92,
    ingredients: [
      { id: "ing-6", name: "Local Rice", category: "Grains", quantityNeeded: 1, unit: "Kg", currentMarketPrice: 800, marketSource: "Buea Central" },
      { id: "ing-7", name: "Tomato Paste", category: "Vegetables", quantityNeeded: 1, unit: "Sachet", currentMarketPrice: 200, marketSource: "Buea Central" },
      { id: "ing-8", name: "Frozen Chicken", category: "Proteins", quantityNeeded: 0.5, unit: "Kg", currentMarketPrice: 1800, marketSource: "Douala Marche" },
      { id: "ing-9", name: "Onions & Spices", category: "Spices", quantityNeeded: 1, unit: "Pack", currentMarketPrice: 500, marketSource: "Muea Market" }
    ]
  },
  {
    id: "rec-3",
    name: "Premium Ndole with Beef & Prawns",
    category: "Premium",
    baseServings: 6,
    preparationTime: 90,
    profitabilityScore: 78,
    ingredients: [
      { id: "ing-10", name: "Washed Ndole Leaves", category: "Vegetables", quantityNeeded: 4, unit: "Bundles", currentMarketPrice: 1500, marketSource: "Yaounde Market" },
      { id: "ing-11", name: "Beef (Without Bone)", category: "Proteins", quantityNeeded: 2, unit: "Kg", currentMarketPrice: 3500, marketSource: "Douala Marche" },
      { id: "ing-12", name: "Groundnuts", category: "Proteins", quantityNeeded: 1.5, unit: "Kg", currentMarketPrice: 1200, marketSource: "Buea Central" },
      { id: "ing-13", name: "Dry Prawns", category: "Proteins", quantityNeeded: 2, unit: "Cups", currentMarketPrice: 2000, marketSource: "Douala Marche" },
      { id: "ing-14", name: "Plantains", category: "Tubers", quantityNeeded: 2, unit: "Bunches", currentMarketPrice: 3000, marketSource: "Muea Market" }
    ]
  }
];

export function useRecipeAutomation() {
  const [recipes] = useState<AutomationRecipe[]>(MOCK_RECIPES);
  const [recentOrders, setRecentOrders] = useState<OrderSimulation[]>([]);

  const stats = useMemo<AutomationStats>(() => ({
    recipesConvertedToday: 142,
    ordersGenerated: 128,
    averageRecipeCost: 8500,
    averageDeliveryCost: 1200,
    automationSuccessRate: 98.4,
    budgetSavingsGenerated: 450000,
    topConvertedRecipes: [
      { name: "Egusi Soup & Fufu", conversions: 45, trend: "up" },
      { name: "Student Budget Jollof", conversions: 38, trend: "up" },
      { name: "Ndole with Beef", conversions: 22, trend: "down" }
    ],
    mostProfitableRecipes: [
      { name: "Premium Ndole", margin: 4500, roi: 65 },
      { name: "Egusi Soup & Fufu", margin: 2800, roi: 45 },
      { name: "Eru & Waterfufu", margin: 3200, roi: 55 }
    ]
  }), []);

  const calculateRecipeCost = (recipeId: string, targetServings: number) => {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return 0;

    const multiplier = targetServings / recipe.baseServings;
    return recipe.ingredients.reduce((total, ing) => {
      return total + (ing.quantityNeeded * multiplier * ing.currentMarketPrice);
    }, 0);
  };

  const generateDeliverySimulation = (location: string, distanceKm: number): DeliverySimulation => {
    // Mock simulation logic based on distance
    const baseFee = 500;
    const perKm = 100;
    const trafficMultiplier = distanceKm > 10 ? 1.5 : 1;
    const weatherMultiplier = 1; // Assuming clear
    
    const cost = Math.round((baseFee + (distanceKm * perKm)) * trafficMultiplier * weatherMultiplier);
    
    return {
      region: location,
      distanceKm,
      trafficLevel: distanceKm > 10 ? "Heavy" : "Moderate",
      weather: "Clear",
      estimatedTime: Math.round(15 + (distanceKm * 3) * trafficMultiplier),
      cost,
      riskScore: distanceKm > 10 ? 65 : 25
    };
  };

  const simulateOrderCreation = (recipeId: string, servings: number, location: string, distanceKm: number) => {
    const rawCost = calculateRecipeCost(recipeId, servings);
    const delivery = generateDeliverySimulation(location, distanceKm);
    
    const packagingCost = 200 * servings;
    const serviceFee = Math.round(rawCost * 0.05); // 5% platform fee
    const totalCost = rawCost + packagingCost + delivery.cost + serviceFee;
    const suggestedSalePrice = Math.round(totalCost * 1.4); // 40% margin

    const newOrder: OrderSimulation = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      recipeId,
      servings,
      location,
      deliveryZone: location,
      rawCost,
      packagingCost,
      deliveryFee: delivery.cost,
      serviceFee,
      totalCost,
      suggestedSalePrice,
      margin: suggestedSalePrice - totalCost,
      timestamp: new Date().toISOString()
    };

    setRecentOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  return {
    recipes,
    recentOrders,
    stats,
    calculateRecipeCost,
    generateDeliverySimulation,
    simulateOrderCreation
  };
}

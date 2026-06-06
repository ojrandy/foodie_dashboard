export interface AutomationRecipe {
  id: string;
  name: string;
  category: "Family" | "Student" | "Budget" | "Healthy" | "Premium";
  baseServings: number;
  preparationTime: number; // minutes
  ingredients: RecipeIngredient[];
  profitabilityScore: number; // 0-100
}

export interface RecipeIngredient {
  id: string;
  name: string;
  category: string;
  quantityNeeded: number;
  unit: string;
  currentMarketPrice: number; // Price per unit
  marketSource: string;
}

export interface OrderSimulation {
  id: string;
  recipeId: string;
  servings: number;
  location: string;
  deliveryZone: string;
  rawCost: number;
  packagingCost: number;
  deliveryFee: number;
  serviceFee: number;
  totalCost: number;
  suggestedSalePrice: number;
  margin: number;
  timestamp: string;
}

export interface DeliverySimulation {
  region: string;
  distanceKm: number;
  trafficLevel: "Low" | "Moderate" | "Heavy" | "Gridlock";
  weather: "Clear" | "Rain" | "Storm";
  estimatedTime: number; // minutes
  cost: number;
  riskScore: number; // 0-100
}

export interface AutomationStats {
  recipesConvertedToday: number;
  ordersGenerated: number;
  averageRecipeCost: number;
  averageDeliveryCost: number;
  automationSuccessRate: number; // percentage
  budgetSavingsGenerated: number;
  topConvertedRecipes: { name: string; conversions: number; trend: "up" | "down" }[];
  mostProfitableRecipes: { name: string; margin: number; roi: number }[];
}

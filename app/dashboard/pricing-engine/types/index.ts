export type CommodityCategory = "Vegetables" | "Tubers" | "Oils" | "Proteins" | "Spices";
export type TrendDirection = "up" | "down" | "stable";

export interface CommodityPrice {
  id: string;
  name: string;
  unit: string;
  bueaPrice: number;
  doualaPrice: number;
  yaoundePrice: number;
  shortageProbability: number;
  trend: TrendDirection;
  category: CommodityCategory;
  lastUpdated: string;
}

export interface PricingStats {
  avgBuea: number;
  avgDouala: number;
  avgYaounde: number;
  highRiskShortages: number;
}

export interface HistoricalTrend {
  month: string;
  Tomatoes: number;
  PalmOil: number;
  Plantains: number;
}

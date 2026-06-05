export type RiderStatus = "Active" | "Idle" | "Offline";
export type RiskLevel = "Low" | "Medium" | "High";

export interface Rider {
  id: string;
  name: string;
  status: RiderStatus;
  zone: string;
  deliveriesCompleted: number;
  avgEta: number;
  rating: number;
  currentOrder?: string;
}

export interface ActiveDelivery {
  id: string;
  customer: string;
  location: string;
  rider: string;
  progressPct: number;
  etaRemaining: number;
  risk: RiskLevel;
}

export interface ZonePerformance {
  zone: string;
  deliveries: number;
  avgTime: number;
}

export interface DispatchStats {
  activeRiders: number;
  totalDeliveries: number;
  avgRating: string;
  highRiskRoutes: number;
}

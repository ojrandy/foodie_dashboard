export interface Order {
  id: string;
  customerName: string;
  location: string;
  itemsCount: number;
  totalCost: number;
  status: "Pending" | "Confirmed" | "Preparing" | "Transit" | "Delivered";
  assignedRider?: string;
  eta: number;
  createdAt: string;
  riskFactor: "Low" | "Medium" | "High";
  itemsDescription: string;
}

export interface OrderStats {
  active: number;
  completed: number;
  totalRev: number;
  highRisk: number;
}

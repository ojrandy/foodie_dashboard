export interface KpiMetric {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
  subtitle?: string;
}

export interface ChartDataset {
  label: string;
  data: number[];
  color: string;
}

export interface AnalyticsDataPoint {
  month: string;
  revenue: number;
  orders: number;
  customers: number;
}

export interface AnalyticsOverview {
  revenue: KpiMetric;
  orders: KpiMetric;
  customers: KpiMetric;
  satisfaction: KpiMetric;
  chartData: AnalyticsDataPoint[];
}

"use client";

import { useState, useMemo } from "react";
import type { AnalyticsOverview, AnalyticsDataPoint } from "../types";

const MOCK_CHART_DATA: AnalyticsDataPoint[] = [
  { month: "Jan", revenue: 2850000, orders: 1420, customers: 890 },
  { month: "Feb", revenue: 3120000, orders: 1580, customers: 945 },
  { month: "Mar", revenue: 2980000, orders: 1510, customers: 1020 },
  { month: "Apr", revenue: 3560000, orders: 1720, customers: 1150 },
  { month: "May", revenue: 3890000, orders: 1890, customers: 1280 },
  { month: "Jun", revenue: 4230000, orders: 2100, customers: 1410 },
];

export function useAnalytics() {
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d">("30d");

  const overview: AnalyticsOverview = useMemo(
    () => ({
      revenue: {
        label: "Total Revenue",
        value: "3,890,000 XAF",
        change: 18.5,
        trend: "up",
        subtitle: "vs previous period",
      },
      orders: {
        label: "Total Orders",
        value: "1,890",
        change: 12.3,
        trend: "up",
        subtitle: "vs previous period",
      },
      customers: {
        label: "Active Customers",
        value: "1,280",
        change: 8.7,
        trend: "up",
        subtitle: "vs previous period",
      },
      satisfaction: {
        label: "Satisfaction Rate",
        value: "94.2%",
        change: 2.1,
        trend: "up",
        subtitle: "vs previous period",
      },
      chartData: MOCK_CHART_DATA,
    }),
    []
  );

  return {
    overview,
    dateRange,
    setDateRange,
  };
}

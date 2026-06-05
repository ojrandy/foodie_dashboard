"use client";

import { useAnalytics } from "../hooks/useAnalytics";
import { AnalyticsHeader } from "./AnalyticsHeader";
import { AnalyticsCard } from "./AnalyticsCard";
import { AnalyticsTrendChart } from "./AnalyticsTrendChart";

export function AnalyticsMain() {
  const { overview } = useAnalytics();

  const metrics = [
    overview.revenue,
    overview.orders,
    overview.customers,
    overview.satisfaction,
  ];

  return (
    <div className="space-y-6">
      <AnalyticsHeader />
      <AnalyticsCard metrics={metrics} />
      <AnalyticsTrendChart data={overview.chartData} />
    </div>
  );
}

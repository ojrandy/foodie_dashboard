"use client";

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import { TrendingUp, ShoppingBag, PieChart as PieIcon, Activity, Users } from "lucide-react";
import { cn } from "@/lib/cn";

// Hook to check screen size for chart responsiveness
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

// Custom Tooltip component
function ChartTooltip({ active, payload, label, prefix = "", suffix = "" }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-md text-xs z-50">
        <p className="font-semibold text-muted-foreground mb-1.5">{label}</p>
        <div className="flex flex-col gap-1">
          {payload.map((item: any, idx: number) => (
            <div key={idx} className="flex items-center gap-4 justify-between">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color || item.fill }} />
                {item.name}:
              </span>
              <span className="font-bold text-foreground">
                {prefix}{item.value.toLocaleString()}{suffix}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

// ==========================================
// FALLBACK DEFAULT DATASETS
// ==========================================

const DEFAULT_REVENUE_DATA = [
  { name: "08:00", revenue: 420, delivery: 110 },
  { name: "10:00", revenue: 680, delivery: 180 },
  { name: "12:00", revenue: 1450, delivery: 310 },
  { name: "14:00", revenue: 1100, delivery: 240 },
  { name: "16:00", revenue: 790, delivery: 190 },
  { name: "18:00", revenue: 1650, delivery: 390 },
  { name: "20:00", revenue: 1200, delivery: 280 },
];

const DEFAULT_LIFECYCLE_DATA = [
  { name: "Cart", count: 85, fill: "#64748b" },
  { name: "Placed", count: 58, fill: "#f59e0b" },
  { name: "Assigned", count: 32, fill: "#3b82f6" },
  { name: "Preparing", count: 24, fill: "#8b5cf6" },
  { name: "Transit", count: 48, fill: "#06b6d4" },
  { name: "Delivered", count: 412, fill: "#10b981" },
];

const DEFAULT_MEAL_DATA = [
  { name: "Egusi Soup", value: 142, color: "#10b981" },
  { name: "Ndole Supreme", value: 118, color: "#3b82f6" },
  { name: "Achu Special", value: 89, color: "#f59e0b" },
  { name: "Eru Gourmet", value: 76, color: "#8b5cf6" },
  { name: "Koki Wrap", value: 54, color: "#06b6d4" },
];

const DEFAULT_DELIVERY_DATA = [
  { hour: "08:00", active: 22 },
  { hour: "10:00", active: 35 },
  { hour: "12:00", active: 54 },
  { hour: "14:00", active: 48 },
  { hour: "16:00", active: 31 },
  { hour: "18:00", active: 62 },
  { hour: "20:00", active: 44 },
];

const DEFAULT_USER_DATA = [
  { day: "Mon", new: 82, returning: 240 },
  { day: "Tue", new: 95, returning: 280 },
  { day: "Wed", new: 110, returning: 310 },
  { day: "Thu", new: 88, returning: 295 },
  { day: "Fri", new: 135, returning: 380 },
  { day: "Sat", new: 154, returning: 410 },
  { day: "Sun", new: 120, returning: 350 },
];

// ==========================================
// 1. REVENUE TREND CHART (Memoized & Dynamic)
// ==========================================
interface RevenueTrendChartProps {
  data?: { name: string; revenue: number; delivery: number }[];
}

export const RevenueTrendChart = React.memo(function RevenueTrendChart({ data = DEFAULT_REVENUE_DATA }: RevenueTrendChartProps) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-[280px] w-full animate-pulse rounded bg-muted/20" />;

  return (
    <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground">Revenue Trend Analysis</h4>
            <p className="text-xs text-muted-foreground">Logistics gross vs. net delivery fees.</p>
          </div>
        </div>
      </div>
      
      <div className="h-[230px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 5, left: isMobile ? -30 : -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
              </linearGradient>
              <linearGradient id="deliveryGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64748b" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#64748b" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
            <XAxis 
              dataKey="name" 
              stroke="#888888" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              interval={isMobile ? 1 : 0}
            />
            <YAxis 
              stroke="#888888" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(v) => `$${v}`}
              tickCount={isMobile ? 3 : 5}
            />
            <Tooltip content={<ChartTooltip prefix="$" />} />
            <Area type="monotone" name={isMobile ? "Gross" : "Gross Revenue"} dataKey="revenue" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#revenueGlow)" />
            <Area type="monotone" name={isMobile ? "Delivery" : "Delivery Share"} dataKey="delivery" stroke="#64748b" strokeWidth={1.5} fillOpacity={1} fill="url(#deliveryGlow)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

// ==========================================
// 2. ORDER LIFECYCLE CHART (Memoized & Dynamic)
// ==========================================
interface OrderLifecycleChartProps {
  data?: { name: string; count: number; fill: string }[];
}

export const OrderLifecycleChart = React.memo(function OrderLifecycleChart({ data = DEFAULT_LIFECYCLE_DATA }: OrderLifecycleChartProps) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-[280px] w-full animate-pulse rounded bg-muted/20" />;

  return (
    <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground">Order Lifecycle Distribution</h4>
            <p className="text-xs text-muted-foreground">Volume count at each operational pipeline stage.</p>
          </div>
        </div>
      </div>

      <div className="h-[230px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 5, left: isMobile ? -30 : -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
            <XAxis dataKey="name" stroke="#888888" fontSize={9} tickLine={false} axisLine={false} interval={isMobile ? 1 : 0} />
            <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} tickCount={isMobile ? 4 : 5} />
            <Tooltip content={<ChartTooltip suffix=" active" />} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={isMobile ? 18 : 32}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

// ==========================================
// 3. MEAL POPULARITY CHART (Memoized & Dynamic)
// ==========================================
interface MealPopularityChartProps {
  data?: { name: string; value: number; color: string }[];
}

export const MealPopularityChart = React.memo(function MealPopularityChart({ data = DEFAULT_MEAL_DATA }: MealPopularityChartProps) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-[280px] w-full animate-pulse rounded bg-muted/20" />;

  // In mobile views, only show top 3 meals to reduce visual density and fits standard small viewports
  const finalData = isMobile ? data.slice(0, 3) : data;

  return (
    <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
            <PieIcon className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground">Meal Popularity Breakdown</h4>
            <p className="text-xs text-muted-foreground">Top selling recipes by total orders today.</p>
          </div>
        </div>
      </div>

      <div className={cn(
        "flex items-center justify-center min-h-[220px] gap-4",
        isMobile ? "flex-col py-1" : "flex-row h-[230px] md:gap-8"
      )}>
        <div className={cn("shrink-0", isMobile ? "h-[120px] w-[120px]" : "h-[180px] w-[180px]")}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={finalData}
                cx="50%"
                cy="50%"
                innerRadius={isMobile ? 38 : 55}
                outerRadius={isMobile ? 55 : 75}
                paddingAngle={4}
                dataKey="value"
              >
                {finalData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip suffix=" meals sold" />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend - Responsive styling */}
        <div className={cn(
          "grid gap-2 w-full",
          isMobile ? "grid-cols-3 px-1 mt-1 text-[9px]" : "flex flex-col max-w-[170px]"
        )}>
          {finalData.map((meal, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground truncate max-w-[70px] md:max-w-none">
                <span className="h-2 w-2 rounded-sm shrink-0" style={{ backgroundColor: meal.color }} />
                <span className="truncate">{meal.name}</span>
              </span>
              <span className="font-bold text-foreground pl-1">{meal.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// ==========================================
// 4. DELIVERY ACTIVITY HEATMAP (Memoized & Dynamic)
// ==========================================
interface DeliveryActivityChartProps {
  data?: { hour: string; active: number }[];
}

export const DeliveryActivityChart = React.memo(function DeliveryActivityChart({ data = DEFAULT_DELIVERY_DATA }: DeliveryActivityChartProps) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-[280px] w-full animate-pulse rounded bg-muted/20" />;

  return (
    <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground">Delivery Activity Heatmap</h4>
            <p className="text-xs text-muted-foreground">Hourly operational delivery courier loads.</p>
          </div>
        </div>
      </div>

      <div className="h-[230px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 5, left: isMobile ? -30 : -20, bottom: 0 }}>
            <defs>
              <linearGradient id="deliveryHeatGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
            <XAxis dataKey="hour" stroke="#888888" fontSize={9} tickLine={false} axisLine={false} interval={isMobile ? 2 : 0} />
            <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} tickCount={isMobile ? 3 : 5} />
            <Tooltip content={<ChartTooltip suffix=" couriers active" />} />
            <Area type="monotone" name="Active Couriers" dataKey="active" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#deliveryHeatGlow)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

// ==========================================
// 5. USER ENGAGEMENT CHART (Memoized & Dynamic)
// ==========================================
interface UserEngagementChartProps {
  data?: { day: string; new: number; returning: number }[];
}

export const UserEngagementChart = React.memo(function UserEngagementChart({ data = DEFAULT_USER_DATA }: UserEngagementChartProps) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-[280px] w-full animate-pulse rounded bg-muted/20" />;

  return (
    <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground">User Engagement Analytics</h4>
            <p className="text-xs text-muted-foreground">New signups vs. returning customers.</p>
          </div>
        </div>
      </div>

      <div className="h-[230px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 5, left: isMobile ? -30 : -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
            <XAxis dataKey="day" stroke="#888888" fontSize={9} tickLine={false} axisLine={false} interval={isMobile ? 1 : 0} />
            <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} tickCount={isMobile ? 4 : 5} />
            <Tooltip content={<ChartTooltip />} />
            <Line type="monotone" name={isMobile ? "New" : "New Signups"} dataKey="new" stroke="#10b981" strokeWidth={2} activeDot={{ r: 5 }} dot={{ r: 2.5 }} />
            <Line type="monotone" name={isMobile ? "Return" : "Returning Users"} dataKey="returning" stroke="#64748b" strokeWidth={1.5} dot={{ r: 2.5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

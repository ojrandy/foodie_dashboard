"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  DollarSign,
  ShoppingBag,
  Truck,
  Users,
  Calendar,
  MapPin,
  ChevronDown,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ChefHat,
  Search,
} from "lucide-react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

// Custom UI Components
import { StatCard } from "@/components/dashboard/StatCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { LiveActivityFeed } from "@/components/dashboard/LiveActivityFeed";
import { CameroonMap } from "@/components/dashboard/CameroonMap";

// Recharts components wrapped with hydration check internally
import {
  RevenueTrendChart,
  OrderLifecycleChart,
  MealPopularityChart,
  DeliveryActivityChart,
  UserEngagementChart,
} from "@/components/dashboard/OperationalCharts";

// Skeleton Loading System
import {
  StatCardSkeleton,
  ChartSkeleton,
  ActivityFeedSkeleton,
  AIInsightsSkeleton,
} from "@/components/dashboard/SkeletonLoaders";

// Dynamically import Three.js background for performance
const AmbientBackground = dynamic(
  () => import("@/components/dashboard/AmbientBackground").then(mod => mod.AmbientBackground),
  { ssr: false }
);

// ============================================================================
// DYNAMIC REGION DATA DICTIONARY
// ============================================================================

interface RegionalData {
  metadata: {
    activeUsers: string;
    activeZones: number;
    activityLevel: "High" | "Medium" | "Stable";
  };
  statusStrip: {
    activeDeliveries: string;
    fulfillmentRate: string;
    marketAlerts: string;
    latency: string;
  };
  kpis: {
    orders: {
      total: string;
      active: string;
      delivered: string;
      cancelled: string;
      subTotal: { label: string; value: string }[];
      subActive: { label: string; value: string }[];
      subDelivered: { label: string; value: string }[];
      subCancelled: { label: string; value: string }[];
    };
    revenue: {
      gross: string;
      weekly: string;
      fleet: string;
      avgValue: string;
      subGross: { label: string; value: string }[];
      subWeekly: { label: string; value: string }[];
      subFleet: { label: string; value: string }[];
      subAvgValue: { label: string; value: string }[];
    };
    customers: {
      active: string;
      returning: string;
      newWeekly: string;
      peakHour: string;
      subActive: { label: string; value: string }[];
      subReturning: { label: string; value: string }[];
      subNewWeekly: { label: string; value: string }[];
      subPeakHour: { label: string; value: string }[];
    };
    market: {
      trending: string;
      cheapest: string;
      costIndex: string;
      kitchenCapacity: string;
      subTrending: { label: string; value: string }[];
      subCheapest: { label: string; value: string }[];
      subCostIndex: { label: string; value: string }[];
      subKitchenCapacity: { label: string; value: string }[];
    };
  };
  charts: {
    revenueTrend: { name: string; revenue: number; delivery: number }[];
    orderLifecycle: { name: string; count: number; fill: string }[];
    mealPopularity: { name: string; value: number; color: string }[];
    deliveryActivity: { hour: string; active: number }[];
    userEngagement: { day: string; new: number; returning: number }[];
  };
  insights: any[];
  activityFeed: any[];
  simulatedActivityStream: any[];
}

const REGION_METADATA_MAP: Record<string, { activeUsers: string; activeZones: number; activityLevel: "High" | "Medium" | "Stable" }> = {
  far_north: { activeUsers: "2,105", activeZones: 6, activityLevel: "Medium" },
  north: { activeUsers: "2,840", activeZones: 8, activityLevel: "Stable" },
  adamawa: { activeUsers: "3,112", activeZones: 9, activityLevel: "Medium" },
  centre: { activeUsers: "11,402", activeZones: 28, activityLevel: "Stable" },
  east: { activeUsers: "1,880", activeZones: 5, activityLevel: "Stable" },
  south: { activeUsers: "2,490", activeZones: 7, activityLevel: "Stable" },
  littoral: { activeUsers: "14,820", activeZones: 34, activityLevel: "High" },
  west: { activeUsers: "5,410", activeZones: 16, activityLevel: "High" },
  north_west: { activeUsers: "3,950", activeZones: 14, activityLevel: "Stable" },
  south_west: { activeUsers: "4,921", activeZones: 12, activityLevel: "High" },
};

const REGIONAL_DATASETS: Record<string, RegionalData> = {
  all: {
    metadata: { activeUsers: "50,930", activeZones: 139, activityLevel: "High" },
    statusStrip: { activeDeliveries: "127 In Progress", fulfillmentRate: "99.4% Today", marketAlerts: "1 Price Spike active", latency: "14ms nominal" },
    kpis: {
      orders: {
        total: "542", active: "48", delivered: "482", cancelled: "12",
        subTotal: [{ label: "Express", value: "320" }, { label: "Scheduled", value: "222" }],
        subActive: [{ label: "Littoral", value: "20" }, { label: "South West", value: "14" }],
        subDelivered: [{ label: "On-time", value: "450" }, { label: "Delayed", value: "32" }],
        subCancelled: [{ label: "Refusal", value: "8" }, { label: "No Rider", value: "4" }]
      },
      revenue: {
        gross: "$8,821.50", weekly: "$59,482.00", fleet: "$3,842.10", avgValue: "$18.92",
        subGross: [{ label: "Food Sales", value: "$7,120" }, { label: "Deliveries", value: "$1,701" }],
        subWeekly: [{ label: "Avg/Day", value: "$8,497" }, { label: "Growth", value: "+14.8%" }],
        subFleet: [{ label: "Rider Tips", value: "$910" }, { label: "Net Comm", value: "$2,932" }],
        subAvgValue: [{ label: "Littoral Avg", value: "$22.50" }, { label: "SW Avg", value: "$14.20" }]
      },
      customers: {
        active: "6,921", returning: "76.4%", newWeekly: "+892", peakHour: "12:00 - 14:00",
        subActive: [{ label: "Mobile App", value: "4,810" }, { label: "Web Portal", value: "2,111" }],
        subReturning: [{ label: "Churn Rate", value: "4.2%" }, { label: "Loyal Count", value: "5,290" }],
        subNewWeekly: [{ label: "Referral", value: "420" }, { label: "Direct", value: "472" }],
        subPeakHour: [{ label: "Lunch Vol", value: "390 ord" }, { label: "Dinner Vol", value: "260 ord" }]
      },
      market: {
        trending: "Egusi Soup Plan", cheapest: "Student Budget Plan", costIndex: "104.2", kitchenCapacity: "86.2%",
        subTrending: [{ label: "SW Sales", value: "182" }, { label: "Littoral Sales", value: "135" }],
        subCheapest: [{ label: "Price/Day", value: "1,200 XAF" }, { label: "Avg Margin", value: "42%" }],
        subCostIndex: [{ label: "Veg Cost", value: "+8.4%" }, { label: "Meat Cost", value: "-2.1%" }],
        subKitchenCapacity: [{ label: "Littoral Cap", value: "88%" }, { label: "SW Cap", value: "84%" }]
      }
    },
    charts: {
      revenueTrend: [
        { name: "08:00", revenue: 420, delivery: 110 },
        { name: "10:00", revenue: 680, delivery: 180 },
        { name: "12:00", revenue: 1450, delivery: 310 },
        { name: "14:00", revenue: 1100, delivery: 240 },
        { name: "16:00", revenue: 790, delivery: 190 },
        { name: "18:00", revenue: 1650, delivery: 390 },
        { name: "20:00", revenue: 1200, delivery: 280 }
      ],
      orderLifecycle: [
        { name: "Cart", count: 85, fill: "#64748b" },
        { name: "Placed", count: 58, fill: "#f59e0b" },
        { name: "Assigned", count: 32, fill: "#3b82f6" },
        { name: "Preparing", count: 24, fill: "#8b5cf6" },
        { name: "Transit", count: 48, fill: "#06b6d4" },
        { name: "Delivered", count: 412, fill: "#10b981" }
      ],
      mealPopularity: [
        { name: "Egusi Soup", value: 142, color: "#10b981" },
        { name: "Ndole Supreme", value: 118, color: "#3b82f6" },
        { name: "Achu Special", value: 89, color: "#f59e0b" },
        { name: "Eru Gourmet", value: 76, color: "#8b5cf6" },
        { name: "Koki Wrap", value: 54, color: "#06b6d4" }
      ],
      deliveryActivity: [
        { hour: "08:00", active: 22 },
        { hour: "10:00", active: 35 },
        { hour: "12:00", active: 54 },
        { hour: "14:00", active: 48 },
        { hour: "16:00", active: 31 },
        { hour: "18:00", active: 62 },
        { hour: "20:00", active: 44 }
      ],
      userEngagement: [
        { day: "Mon", new: 82, returning: 240 },
        { day: "Tue", new: 95, returning: 280 },
        { day: "Wed", new: 110, returning: 310 },
        { day: "Thu", new: 88, returning: 295 },
        { day: "Fri", new: 135, returning: 380 },
        { day: "Sat", new: 154, returning: 410 },
        { day: "Sun", new: 120, returning: 350 }
      ]
    },
    insights: [
      { id: "in-1", type: "market", title: "Market Price Alert: Tomato Inflation", description: "Tomato prices increased by 14% today in local markets. Recommend adjusting raw material pricing index.", severity: "warning", metric: "+14.2% price index", actionText: "Update Raw Costs" },
      { id: "in-2", type: "trend", title: "Demand Spike: Egusi Soup in Buea", description: "Active demand for Egusi meal plans in Buea has doubled over the past 3 hours. Optimal window for premium campaigns.", severity: "success", metric: "2.1x active orders", actionText: "Promote Campaign" },
      { id: "in-3", type: "logistics", title: "Delivery Delay Threat: Molyko Route", description: "Congestion predicted around Molyko commercial center due to local traffic. Recommend peripheral zone dispatch rerouting.", severity: "warning", metric: "+12m expected delay", actionText: "Reroute Dispatch" },
      { id: "in-4", type: "price", title: "Student Budget Plan Opportunity", description: "Local ingredient surplus enables a high-margin student budget meal plan optimization. Potential yield: +8.4% gross margin.", severity: "primary", metric: "+8.4% margin yield", actionText: "Optimize Pricing" }
    ],
    activityFeed: [
      { id: "act-1", type: "dispatch", title: "Rider Dispatched (RD-492)", description: "Rider 'Erick N.' left central kitchen with order #ORD-8291", time: "Just Now", status: "info", detail: "Central Buea Zone" },
      { id: "act-2", type: "order", title: "Order Assigned (#ORD-8293)", description: "Assigned to nearest dispatch rider 'Mike S.'", time: "2 min ago", status: "success", detail: "Molyko" },
      { id: "act-3", type: "market", title: "Market Price Update: Egusi", description: "Wholesale Egusi seed price updated to 4,200 XAF/kg (+3%)", time: "10 min ago", status: "warning", detail: "Buea Central" },
      { id: "act-4", type: "recipe", title: "New Recipe: Ndole Supreme", description: "Chef 'Amelie P.' published 'Ndole Supreme Premium Plan'", time: "25 min ago", status: "info", detail: "5 ingredients" }
    ],
    simulatedActivityStream: [
      { type: "order", title: "New Order Placed (#ORD-8302)", description: "Student Family Pack combo ordered by 'Julius M.'", status: "success", detail: "Molyko Ghetto" },
      { type: "dispatch", title: "Rider Delivered Order (#ORD-8290)", description: "Rider 'Sarah L.' completed express meal delivery", status: "success", detail: "Mile 17 Terminal" }
    ]
  },
  south_west: {
    metadata: { activeUsers: "4,921", activeZones: 12, activityLevel: "High" },
    statusStrip: { activeDeliveries: "34 In Progress", fulfillmentRate: "99.1% Today", marketAlerts: "1 Crop Surplus active", latency: "9ms nominal" },
    kpis: {
      orders: {
        total: "142", active: "14", delivered: "125", cancelled: "3",
        subTotal: [{ label: "Express", value: "98" }, { label: "Scheduled", value: "44" }],
        subActive: [{ label: "Molyko", value: "9" }, { label: "Muea", value: "5" }],
        subDelivered: [{ label: "On-time", value: "115" }, { label: "Delayed", value: "10" }],
        subCancelled: [{ label: "Refusal", value: "2" }, { label: "No Rider", value: "1" }]
      },
      revenue: {
        gross: "$2,210.40", weekly: "$14,840.00", fleet: "$820.50", avgValue: "$15.56",
        subGross: [{ label: "Food Sales", value: "$1,820" }, { label: "Deliveries", value: "$390" }],
        subWeekly: [{ label: "Avg/Day", value: "$2,120" }, { label: "Growth", value: "+18.2%" }],
        subFleet: [{ label: "Rider Tips", value: "$210" }, { label: "Net Comm", value: "$610" }],
        subAvgValue: [{ label: "Molyko Avg", value: "$14.10" }, { label: "Muea Avg", value: "$17.40" }]
      },
      customers: {
        active: "1,840", returning: "81.2%", newWeekly: "+210", peakHour: "12:00 - 13:30",
        subActive: [{ label: "Mobile App", value: "1,510" }, { label: "Web Portal", value: "330" }],
        subReturning: [{ label: "Churn Rate", value: "2.4%" }, { label: "Loyal Count", value: "1,494" }],
        subNewWeekly: [{ label: "Student Promo", value: "140" }, { label: "Organic Signups", value: "70" }],
        subPeakHour: [{ label: "Lunch Vol", value: "120 ord" }, { label: "Dinner Vol", value: "62 ord" }]
      },
      market: {
        trending: "Egusi Soup Plan", cheapest: "Molyko Student Cup", costIndex: "98.4", kitchenCapacity: "84.0%",
        subTrending: [{ label: "Molyko Sales", value: "88" }, { label: "Muea Sales", value: "37" }],
        subCheapest: [{ label: "Price/Day", value: "800 XAF" }, { label: "Avg Margin", value: "48%" }],
        subCostIndex: [{ label: "Egusi Crop", value: "-8.5%" }, { label: "Water Cost", value: "Stable" }],
        subKitchenCapacity: [{ label: "Buea Central", value: "84%" }, { label: "Molyko Annex", value: "N/A" }]
      }
    },
    charts: {
      revenueTrend: [
        { name: "08:00", revenue: 110, delivery: 30 },
        { name: "10:00", revenue: 180, delivery: 45 },
        { name: "12:00", revenue: 450, delivery: 90 },
        { name: "14:00", revenue: 320, delivery: 60 },
        { name: "16:00", revenue: 210, delivery: 50 },
        { name: "18:00", revenue: 490, delivery: 110 },
        { name: "20:00", revenue: 350, delivery: 80 }
      ],
      orderLifecycle: [
        { name: "Cart", count: 24, fill: "#64748b" },
        { name: "Placed", count: 18, fill: "#f59e0b" },
        { name: "Assigned", count: 11, fill: "#3b82f6" },
        { name: "Preparing", count: 8, fill: "#8b5cf6" },
        { name: "Transit", count: 14, fill: "#06b6d4" },
        { name: "Delivered", count: 125, fill: "#10b981" }
      ],
      mealPopularity: [
        { name: "Egusi Soup", value: 88, color: "#10b981" },
        { name: "Achu Special", value: 32, color: "#f59e0b" },
        { name: "Eru Gourmet", value: 22, color: "#8b5cf6" }
      ],
      deliveryActivity: [
        { hour: "08:00", active: 6 },
        { hour: "10:00", active: 11 },
        { hour: "12:00", active: 18 },
        { hour: "14:00", active: 14 },
        { hour: "16:00", active: 9 },
        { hour: "18:00", active: 22 },
        { hour: "20:00", active: 12 }
      ],
      userEngagement: [
        { day: "Mon", new: 22, returning: 85 },
        { day: "Tue", new: 31, returning: 98 },
        { day: "Wed", new: 28, returning: 110 },
        { day: "Thu", new: 24, returning: 95 },
        { day: "Fri", new: 42, returning: 130 },
        { day: "Sat", new: 48, returning: 145 },
        { day: "Sun", new: 35, returning: 122 }
      ]
    },
    insights: [
      { id: "in-1", type: "trend", title: "Demand Spike: Egusi Soup in Buea", description: "Active demand for Egusi meal plans in Buea (Molyko Zone) has doubled over the past 3 hours.", severity: "success", metric: "2.1x active orders", actionText: "Promote Campaign" },
      { id: "in-2", type: "logistics", title: "Delivery Delay Threat: Molyko Route", description: "Congestion predicted around Molyko commercial center. Re-route active couriers to peripheral student areas.", severity: "warning", metric: "+12m expected delay", actionText: "Reroute Dispatch" },
      { id: "in-3", type: "market", title: "Egusi Seed Surplus: Price Dip", description: "Wholesale prices dropped by 8.5% at Buea Central Market. Opportunity to secure student pack raw supply.", severity: "success", metric: "-8.5% cost reduction", actionText: "Lock Supplier Rates" }
    ],
    activityFeed: [
      { id: "act-1", type: "dispatch", title: "Rider Dispatched (RD-492)", description: "Rider 'Erick N.' left central kitchen with order #ORD-8291", time: "Just Now", status: "info", detail: "Central Buea Zone" },
      { id: "act-2", type: "order", title: "Order Assigned (#ORD-8293)", description: "Assigned to nearest dispatch rider 'Mike S.'", time: "2 min ago", status: "success", detail: "Molyko" },
      { id: "act-3", type: "market", title: "Market Price Update: Egusi", description: "Wholesale Egusi seed price updated to 4,200 XAF/kg (+3%)", time: "10 min ago", status: "warning", detail: "Buea Central" }
    ],
    simulatedActivityStream: [
      { type: "order", title: "New Order Placed (#ORD-8302)", description: "Student Family Pack combo ordered by 'Julius M.'", status: "success", detail: "Molyko Ghetto" },
      { type: "dispatch", title: "Rider Delivered Order (#ORD-8290)", description: "Rider 'Sarah L.' completed express meal delivery", status: "success", detail: "Mile 17 Terminal" }
    ]
  },
  littoral: {
    metadata: { activeUsers: "14,820", activeZones: 34, activityLevel: "High" },
    statusStrip: { activeDeliveries: "52 In Progress", fulfillmentRate: "99.7% Today", marketAlerts: "1 Port Delay active", latency: "16ms nominal" },
    kpis: {
      orders: {
        total: "198", active: "22", delivered: "172", cancelled: "4",
        subTotal: [{ label: "Express", value: "135" }, { label: "Scheduled", value: "63" }],
        subActive: [{ label: "Akwa", value: "12" }, { label: "Bonaberi", value: "10" }],
        subDelivered: [{ label: "On-time", value: "165" }, { label: "Delayed", value: "7" }],
        subCancelled: [{ label: "Refusal", value: "3" }, { label: "No Rider", value: "1" }]
      },
      revenue: {
        gross: "$3,842.20", weekly: "$24,910.00", fleet: "$1,620.10", avgValue: "$22.50",
        subGross: [{ label: "Food Sales", value: "$3,120" }, { label: "Deliveries", value: "$722" }],
        subWeekly: [{ label: "Avg/Day", value: "$3,560" }, { label: "Growth", value: "+16.4%" }],
        subFleet: [{ label: "Rider Tips", value: "$410" }, { label: "Net Comm", value: "$1,210" }],
        subAvgValue: [{ label: "Akwa Avg", value: "$24.50" }, { label: "Bonaberi Avg", value: "$20.10" }]
      },
      customers: {
        active: "2,980", returning: "74.8%", newWeekly: "+420", peakHour: "12:00 - 14:00",
        subActive: [{ label: "Mobile App", value: "1,980" }, { label: "Web Portal", value: "1,000" }],
        subReturning: [{ label: "Churn Rate", value: "5.1%" }, { label: "Loyal Count", value: "2,229" }],
        subNewWeekly: [{ label: "Direct Ad", value: "240" }, { label: "Referral", value: "180" }],
        subPeakHour: [{ label: "Lunch Vol", value: "160 ord" }, { label: "Dinner Vol", value: "110 ord" }]
      },
      market: {
        trending: "Ndole Supreme", cheapest: "Fish & Plantain Duo", costIndex: "106.8", kitchenCapacity: "88.2%",
        subTrending: [{ label: "Akwa Sales", value: "95" }, { label: "Bonaberi Sales", value: "40" }],
        subCheapest: [{ label: "Price/Day", value: "1,500 XAF" }, { label: "Avg Margin", value: "44%" }],
        subCostIndex: [{ label: "Fresh Fish", value: "-12.4%" }, { label: "Plantain", value: "+6.8%" }],
        subKitchenCapacity: [{ label: "Akwa Kitchen", value: "90%" }, { label: "Bonaberi Annex", value: "86%" }]
      }
    },
    charts: {
      revenueTrend: [
        { name: "08:00", revenue: 190, delivery: 50 },
        { name: "10:00", revenue: 290, delivery: 75 },
        { name: "12:00", revenue: 620, delivery: 140 },
        { name: "14:00", revenue: 480, delivery: 110 },
        { name: "16:00", revenue: 350, delivery: 85 },
        { name: "18:00", revenue: 710, delivery: 165 },
        { name: "20:00", revenue: 520, delivery: 120 }
      ],
      orderLifecycle: [
        { name: "Cart", count: 31, fill: "#64748b" },
        { name: "Placed", count: 24, fill: "#f59e0b" },
        { name: "Assigned", count: 16, fill: "#3b82f6" },
        { name: "Preparing", count: 12, fill: "#8b5cf6" },
        { name: "Transit", count: 22, fill: "#06b6d4" },
        { name: "Delivered", count: 172, fill: "#10b981" }
      ],
      mealPopularity: [
        { name: "Ndole Supreme", value: 95, color: "#3b82f6" },
        { name: "Koki Wrap", value: 48, color: "#06b6d4" },
        { name: "Eru Gourmet", value: 29, color: "#8b5cf6" }
      ],
      deliveryActivity: [
        { hour: "08:00", active: 10 },
        { hour: "10:00", active: 16 },
        { hour: "12:00", active: 25 },
        { hour: "14:00", active: 22 },
        { hour: "16:00", active: 15 },
        { hour: "18:00", active: 34 },
        { hour: "20:00", active: 20 }
      ],
      userEngagement: [
        { day: "Mon", new: 45, returning: 120 },
        { day: "Tue", new: 52, returning: 135 },
        { day: "Wed", new: 58, returning: 150 },
        { day: "Thu", new: 48, returning: 140 },
        { day: "Fri", new: 68, returning: 180 },
        { day: "Sat", new: 74, returning: 195 },
        { day: "Sun", new: 60, returning: 170 }
      ]
    },
    insights: [
      { id: "in-1", type: "market", title: "Fresh Seafood Surplus: Douala Port", description: "Douala port catches surplus reduces fish raw index by 12.4%. Excellent margin bump opportunity for Ndole supreme recipe.", severity: "success", metric: "-12.4% fish index", actionText: "Purchase Stock" },
      { id: "in-2", type: "logistics", title: "Logistics Congestion: Bonaberi Bridge", description: "Severe traffic delays on Bonaberi corridor. Deploy secondary courier hub routing rules to bypass central bridge.", severity: "warning", metric: "+18m expected delay", actionText: "Activate Routing B" },
      { id: "in-3", type: "trend", title: "Seafood Platter Trend", description: "Seafood Ndole combo demand is up 38% among executive corporate offices in Akwa commercial district.", severity: "primary", metric: "+38% sales jump", actionText: "Market B2B Package" }
    ],
    activityFeed: [
      { id: "act-1", type: "dispatch", title: "Rider Rerouted (RD-104)", description: "Rider 'Joseph O.' rerouted to bypass Bonaberi traffic jams", time: "Just Now", status: "warning", detail: "Bonaberi corridor" },
      { id: "act-2", type: "order", title: "High-Volume B2B Checkout", description: "Corporate Ndole Platter ordered by 'MTN Cameroon Headquarters'", time: "4 min ago", status: "success", detail: "Akwa Node" }
    ],
    simulatedActivityStream: [
      { type: "order", title: "New Order Placed (#ORD-9102)", description: "Akwa Executive Lunch Plan purchased by 'Orange S.A.'", status: "success", detail: "Akwa Central" }
    ]
  },
  centre: {
    metadata: { activeUsers: "11,402", activeZones: 28, activityLevel: "Stable" },
    statusStrip: { activeDeliveries: "41 In Progress", fulfillmentRate: "99.5% Today", marketAlerts: "1 Congestion Alert active", latency: "11ms nominal" },
    kpis: {
      orders: {
        total: "182", active: "18", delivered: "160", cancelled: "4",
        subTotal: [{ label: "Express", value: "110" }, { label: "Scheduled", value: "72" }],
        subActive: [{ label: "Bastos", value: "10" }, { label: "Mvan", value: "8" }],
        subDelivered: [{ label: "On-time", value: "152" }, { label: "Delayed", value: "8" }],
        subCancelled: [{ label: "Refusal", value: "2" }, { label: "No Rider", value: "2" }]
      },
      revenue: {
        gross: "$3,420.50", weekly: "$21,480.00", fleet: "$1,382.40", avgValue: "$18.79",
        subGross: [{ label: "Food Sales", value: "$2,810" }, { label: "Deliveries", value: "$610.50" }],
        subWeekly: [{ label: "Avg/Day", value: "$3,068" }, { label: "Growth", value: "+11.2%" }],
        subFleet: [{ label: "Rider Tips", value: "$340" }, { label: "Net Comm", value: "$1,042.40" }],
        subAvgValue: [{ label: "Bastos Avg", value: "$21.50" }, { label: "Mvan Avg", value: "$15.10" }]
      },
      customers: {
        active: "2,420", returning: "78.2%", newWeekly: "+310", peakHour: "12:00 - 13:30",
        subActive: [{ label: "Mobile App", value: "1,720" }, { label: "Web Portal", value: "700" }],
        subReturning: [{ label: "Churn Rate", value: "3.8%" }, { label: "Loyal Count", value: "1,892" }],
        subNewWeekly: [{ label: "Govt Promo", value: "180" }, { label: "Organic Signups", value: "130" }],
        subPeakHour: [{ label: "Lunch Vol", value: "135 ord" }, { label: "Dinner Vol", value: "85 ord" }]
      },
      market: {
        trending: "Ndole Supreme", cheapest: "Millet & Sauce Duo", costIndex: "102.4", kitchenCapacity: "85.4%",
        subTrending: [{ label: "Bastos Sales", value: "78" }, { label: "Mvan Sales", value: "42" }],
        subCheapest: [{ label: "Price/Day", value: "1,100 XAF" }, { label: "Avg Margin", value: "45%" }],
        subCostIndex: [{ label: "Oil Cost", value: "-4.5%" }, { label: "Beef Supply", value: "+2.8%" }],
        subKitchenCapacity: [{ label: "Yaounde Central", value: "85%" }, { label: "Bastos Annex", value: "N/A" }]
      }
    },
    charts: {
      revenueTrend: [
        { name: "08:00", revenue: 140, delivery: 40 },
        { name: "10:00", revenue: 220, delivery: 55 },
        { name: "12:00", revenue: 540, delivery: 110 },
        { name: "14:00", revenue: 410, delivery: 85 },
        { name: "16:00", revenue: 290, delivery: 70 },
        { name: "18:00", revenue: 590, delivery: 130 },
        { name: "20:00", revenue: 430, delivery: 95 }
      ],
      orderLifecycle: [
        { name: "Cart", count: 28, fill: "#64748b" },
        { name: "Placed", count: 20, fill: "#f59e0b" },
        { name: "Assigned", count: 12, fill: "#3b82f6" },
        { name: "Preparing", count: 10, fill: "#8b5cf6" },
        { name: "Transit", count: 18, fill: "#06b6d4" },
        { name: "Delivered", count: 160, fill: "#10b981" }
      ],
      mealPopularity: [
        { name: "Ndole Supreme", value: 78, color: "#3b82f6" },
        { name: "Koki Wrap", value: 42, color: "#06b6d4" },
        { name: "Achu Special", value: 31, color: "#f59e0b" }
      ],
      deliveryActivity: [
        { hour: "08:00", active: 8 },
        { hour: "10:00", active: 13 },
        { hour: "12:00", active: 20 },
        { hour: "14:00", active: 18 },
        { hour: "16:00", active: 12 },
        { hour: "18:00", active: 28 },
        { hour: "20:00", active: 16 }
      ],
      userEngagement: [
        { day: "Mon", new: 32, returning: 95 },
        { day: "Tue", new: 38, returning: 110 },
        { day: "Wed", new: 44, returning: 122 },
        { day: "Thu", new: 35, returning: 115 },
        { day: "Fri", new: 52, returning: 145 },
        { day: "Sat", new: 58, returning: 160 },
        { day: "Sun", new: 45, returning: 138 }
      ]
    },
    insights: [
      { id: "in-1", type: "logistics", title: "Government District Lunch Spike", description: "Ministerial buildings demand for executive lunch boxes peaked. Assign express couriers to Bastos node.", severity: "success", metric: "+42% lunch volume", actionText: "Dispatch Bastos Fleet" },
      { id: "in-2", type: "logistics", title: "Post Office Roundabout Congestion", description: "Heavy military parade traffic near post office. Auto-rerouting active couriers via Bastos peripheral ring roads.", severity: "warning", metric: "+10m predicted delay", actionText: "Trigger Reroutes" }
    ],
    activityFeed: [
      { id: "act-1", type: "order", title: "Govt Order Dispatched (#ORD-4921)", description: "Delivering executive lunch boxes to Ministry of Finance", time: "Just Now", status: "success", detail: "Yaounde Central" },
      { id: "act-2", type: "dispatch", title: "Rider Delayed (RD-88)", description: "Rider 'Frank Y.' slowed down near Post Office Roundabout", time: "5 min ago", status: "warning", detail: "Central Post Office" }
    ],
    simulatedActivityStream: [
      { type: "dispatch", title: "Rider Dispatched (RD-301)", description: "Rider 'John D.' departed kitchen with order #ORD-8299", status: "info", detail: "Yaounde Route 1" }
    ]
  },
  far_north: {
    metadata: { activeUsers: "2,105", activeZones: 6, activityLevel: "Medium" },
    statusStrip: { activeDeliveries: "12 In Progress", fulfillmentRate: "98.8% Today", marketAlerts: "1 Heat Warning active", latency: "18ms nominal" },
    kpis: {
      orders: {
        total: "64", active: "5", delivered: "57", cancelled: "2",
        subTotal: [{ label: "Express", value: "40" }, { label: "Scheduled", value: "24" }],
        subActive: [{ label: "Maroua I", value: "3" }, { label: "Maroua II", value: "2" }],
        subDelivered: [{ label: "On-time", value: "54" }, { label: "Delayed", value: "3" }],
        subCancelled: [{ label: "Refusal", value: "1" }, { label: "No Rider", value: "1" }]
      },
      revenue: {
        gross: "$980.20", weekly: "$6,210.00", fleet: "$380.40", avgValue: "$12.10",
        subGross: [{ label: "Food Sales", value: "$810" }, { label: "Deliveries", value: "$170.20" }],
        subWeekly: [{ label: "Avg/Day", value: "$887" }, { label: "Growth", value: "+8.2%" }],
        subFleet: [{ label: "Rider Tips", value: "$95" }, { label: "Net Comm", value: "$285.40" }],
        subAvgValue: [{ label: "Maroua I Avg", value: "$13.20" }, { label: "Maroua II Avg", value: "$11.00" }]
      },
      customers: {
        active: "780", returning: "79.1%", newWeekly: "+72", peakHour: "10:30 - 12:30",
        subActive: [{ label: "Mobile App", value: "580" }, { label: "Web Portal", value: "200" }],
        subReturning: [{ label: "Churn Rate", value: "3.1%" }, { label: "Loyal Count", value: "617" }],
        subNewWeekly: [{ label: "Referral", value: "30" }, { label: "Direct", value: "42" }],
        subPeakHour: [{ label: "Morning Peak", value: "48 ord" }, { label: "Evening Peak", value: "16 ord" }]
      },
      market: {
        trending: "Millet Couscous Plan", cheapest: "Sorghum Porridge Plan", costIndex: "101.2", kitchenCapacity: "82.5%",
        subTrending: [{ label: "Maroua I Sales", value: "35" }, { label: "Maroua II Sales", value: "22" }],
        subCheapest: [{ label: "Price/Day", value: "600 XAF" }, { label: "Avg Margin", value: "51%" }],
        subCostIndex: [{ label: "Millet", value: "+2.4%" }, { label: "Sorghum", value: "-1.8%" }],
        subKitchenCapacity: [{ label: "Maroua Central", value: "82.5%" }, { label: "Kakataré Annex", value: "N/A" }]
      }
    },
    charts: {
      revenueTrend: [
        { name: "08:00", revenue: 50, delivery: 15 },
        { name: "10:00", revenue: 90, delivery: 22 },
        { name: "12:00", revenue: 210, delivery: 45 },
        { name: "14:00", revenue: 140, delivery: 30 },
        { name: "16:00", revenue: 80, delivery: 20 },
        { name: "18:00", revenue: 240, delivery: 50 },
        { name: "20:00", revenue: 170, delivery: 38 }
      ],
      orderLifecycle: [
        { name: "Cart", count: 9, fill: "#64748b" },
        { name: "Placed", count: 6, fill: "#f59e0b" },
        { name: "Assigned", count: 4, fill: "#3b82f6" },
        { name: "Preparing", count: 3, fill: "#8b5cf6" },
        { name: "Transit", count: 5, fill: "#06b6d4" },
        { name: "Delivered", count: 57, fill: "#10b981" }
      ],
      mealPopularity: [
        { name: "Millet Couscous", value: 35, color: "#10b981" },
        { name: "Koki Wrap", value: 14, color: "#06b6d4" },
        { name: "Achu Special", value: 8, color: "#f59e0b" }
      ],
      deliveryActivity: [
        { hour: "08:00", active: 3 },
        { hour: "10:00", active: 5 },
        { hour: "12:00", active: 8 },
        { hour: "14:00", active: 6 },
        { hour: "16:00", active: 4 },
        { hour: "18:00", active: 10 },
        { hour: "20:00", active: 6 }
      ],
      userEngagement: [
        { day: "Mon", new: 8, returning: 40 },
        { day: "Tue", new: 10, returning: 45 },
        { day: "Wed", new: 12, returning: 48 },
        { day: "Thu", new: 9, returning: 44 },
        { day: "Fri", new: 15, returning: 55 },
        { day: "Sat", new: 18, returning: 62 },
        { day: "Sun", new: 12, returning: 50 }
      ]
    },
    insights: [
      { id: "in-1", type: "logistics", title: "Heatwave Shift: Peak Hours 42°C+", description: "Ambient temperature predicted at 42°C. Shifting express courier slots to cooler morning (07:00-10:00) and evening windows.", severity: "warning", metric: "+42°C Alert", actionText: "Shift Rider Slots" },
      { id: "in-2", type: "price", title: "Millet Supply Stability", description: "Local millet harvest yields stabilized. Grain index holds flat margin. Student sorghum porridge packs profitable.", severity: "success", metric: "Stable raw index", actionText: "Confirm Contracts" }
    ],
    activityFeed: [
      { id: "act-1", type: "market", title: "Sorghum Flour Batch Inspected", description: "Wholesale sorghum bags certified organic by regional officer", time: "Just Now", status: "success", detail: "Kakataré Annex" }
    ],
    simulatedActivityStream: [
      { type: "market", title: "Millet Price Dip: Maroua", description: "Millet unit cost down 2% in central market", status: "success", detail: "Maroua Market" }
    ]
  }
};

// Fill in other Cameroon regions dynamically using helpers to prevent huge code size while maintaining high-fidelity experience
const CameroonRegionsList = [
  { id: "far_north", name: "Far North" },
  { id: "north", name: "North" },
  { id: "adamawa", name: "Adamawa" },
  { id: "centre", name: "Centre" },
  { id: "east", name: "East" },
  { id: "south", name: "South" },
  { id: "littoral", name: "Littoral" },
  { id: "west", name: "West" },
  { id: "north_west", name: "North West" },
  { id: "south_west", name: "South West" }
];

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // States for UX Simulators
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"orders" | "revenue" | "customers" | "market">("orders");
  const [timeFilter, setTimeFilter] = useState<"today" | "week" | "month">("today");
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const today = new Date();
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  
  // Expanded 10 regions state
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  // Filter dropdown toggle states
  const [timeMenuOpen, setTimeMenuOpen] = useState(false);
  const [regionMenuOpen, setRegionMenuOpen] = useState(false);

  // Simulate skeleton load on mount for realistic SaaS flow
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // GSAP reveal animations when data loads
  useEffect(() => {
    if (isLoading || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero reveal
      if (heroRef.current) {
        gsap.from(heroRef.current.children, {
          y: 25,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        });
      }

      // Status strip reveal
      gsap.from(".gsap-status-strip", {
        y: 15,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.15,
      });

      // Filter & Tab controllers reveal
      gsap.from(".gsap-controls", {
        y: 15,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.2,
      });

      // Stat cards grid stagger
      gsap.from(".gsap-stat-card", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.25,
      });

      // Charts section stagger
      gsap.from(".gsap-chart-card", {
        y: 35,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.35,
      });

      // Activity Feed & AI Insights panels
      gsap.from(".gsap-feed-panel", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.45,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  // Micro-Sync logic on region transition
  const handleRegionChange = (newRegion: string) => {
    setIsSyncing(true);
    setRegionFilter(newRegion);
    setRegionMenuOpen(false);
    
    // Simulate lightning-fast edge database sync query
    setTimeout(() => {
      setIsSyncing(false);
    }, 400);
  };

  // Get active regional data falling back gracefully to Centre/all if not hardcoded
  const activeData: RegionalData = useMemo(() => {
    const matched = REGIONAL_DATASETS[regionFilter];
    if (matched) return matched;
    
    // Dynamically synthesize data for other regions to keep the dashboard full and premium without bloated mock code
    const meta = REGION_METADATA_MAP[regionFilter] || { activeUsers: "3,200", activeZones: 8, activityLevel: "Stable" };
    const base = REGIONAL_DATASETS["centre"]; // Use Centre as default template for simulated regions
    
    return {
      ...base,
      metadata: meta,
      statusStrip: {
        activeDeliveries: `${Math.round(meta.activeZones * 2.8)} In Progress`,
        fulfillmentRate: "99.2% Today",
        marketAlerts: "1 Regional Cost alert",
        latency: "12ms nominal"
      },
      kpis: {
        ...base.kpis,
        orders: {
          ...base.kpis.orders,
          total: String(Math.round(parseInt(meta.activeUsers.replace(",", "")) * 0.025)),
          active: String(Math.round(meta.activeZones * 1.5)),
        }
      }
    };
  }, [regionFilter]);

  // Fuzzy-search matching regions in search selector
  const filteredRegions = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return CameroonRegionsList;
    return CameroonRegionsList.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Find active region name
  const activeRegionName = useMemo(() => {
    if (regionFilter === "all") return "All Regions";
    return CameroonRegionsList.find((r) => r.id === regionFilter)?.name || "All Regions";
  }, [regionFilter]);

  return (
    <div ref={containerRef} className="relative min-h-[calc(100vh-3.5rem)] flex flex-col gap-6 pb-12 bg-background">
      {/* 1. HERO SECTION WITH AMBIENT ATMOSPHERE */}
      <div className="relative -mx-6 -mt-6 p-8 overflow-hidden min-h-[240px] flex flex-col justify-center border-b border-border/40 glass">
        {/* Ambient glow layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-glow-1 blur-[100px]" />
          <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-glow-2 blur-[100px]" />
          <AmbientBackground />
        </div>
        
        {/* Soft atmospheric overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />

        <div ref={heroRef} className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-2">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-1.5 self-start bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-bold tracking-wider text-accent uppercase">Operational Status Stable</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mt-1">
            Command Center
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mt-1 leading-relaxed">
            Realtime food logistics, dispatch orchestration, market intelligence index, and regional kitchen stability analytics.
          </p>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto flex flex-col gap-8 px-6 mt-[-1.5rem] z-10">
        
        {/* 2. OPERATIONAL STATUS STRIP */}
        <div className="gsap-status-strip grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl border border-border/40 glass shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Truck className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Active Deliveries</span>
              <span className="text-sm font-bold text-foreground transition-all duration-300">
                {isSyncing ? "Syncing..." : activeData.statusStrip.activeDeliveries}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 border-l border-border/40 pl-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Fulfillment Rate</span>
              <span className="text-sm font-bold text-foreground">
                {activeData.statusStrip.fulfillmentRate}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 border-l border-border/40 pl-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
              <AlertTriangle className="h-5 w-5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Market Alerts</span>
              <span className="text-sm font-bold text-destructive truncate max-w-[120px]">
                {activeData.statusStrip.marketAlerts}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 border-l border-border/40 pl-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Activity className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">Logistics Latency</span>
              <span className="text-sm font-bold text-foreground">
                {activeData.statusStrip.latency}
              </span>
            </div>
          </div>
        </div>

        {/* 3. CONTROLLERS & SWITCHERS PANEL */}
        <div className={`gsap-controls relative ${timeMenuOpen || regionMenuOpen ? "z-50" : "z-30"} flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/40 pb-4`}>
          
          {/* Time & Searchable Cameroon Region Dropdown */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Calendar / Time Filter */}
            <div className={`relative ${timeMenuOpen ? "z-50" : "z-10"}`}>
              <button
                onClick={() => setTimeMenuOpen(!timeMenuOpen)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-border/60 bg-card text-xs font-semibold text-foreground hover:bg-muted/50 transition-colors cursor-pointer select-none"
              >
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <span>
                  {timeFilter === "today" && selectedDay !== null &&
                    selectedDay === today.getDate() &&
                    selectedMonth === today.getMonth() &&
                    selectedYear === today.getFullYear()
                    ? "Today"
                    : timeFilter === "today"
                    ? `${MONTHS[selectedMonth]} ${selectedDay}, ${selectedYear}`
                    : timeFilter === "week"
                    ? "This Week"
                    : "This Month"}
                </span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </button>
              
              <AnimatePresence>
                {timeMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-[90]" onClick={() => setTimeMenuOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute left-0 mt-1.5 w-[230px] rounded-xl border border-border bg-card p-3 shadow-xl z-[100] flex flex-col gap-3"
                    >
                      {/* Presets Toggle Strip */}
                      <div className="flex bg-muted/60 p-0.5 rounded-lg border border-border/50">
                        {[
                          { id: "today", label: "Day" },
                          { id: "week", label: "Week" },
                          { id: "month", label: "Month" },
                        ].map((item) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              setTimeFilter(item.id as any);
                              if (item.id !== "today") {
                                setSelectedDay(null);
                                handleRegionChange(regionFilter); // Trigger a micro sync to update metrics
                                setTimeMenuOpen(false);
                              }
                            }}
                            className={`flex-1 py-1 text-[9px] font-bold uppercase rounded-md text-center transition-colors ${
                              timeFilter === item.id 
                                ? "bg-card text-foreground shadow-sm" 
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>

                      {/* Minimal Calendar Grid */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between px-1">
                          <span className="text-[10px] font-bold text-foreground">{MONTHS[currentMonth]} {currentYear}</span>
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => {
                                if (currentMonth === 0) {
                                  setCurrentMonth(11);
                                  setCurrentYear(currentYear - 1);
                                } else {
                                  setCurrentMonth(currentMonth - 1);
                                }
                              }}
                              className="h-3 w-3 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded text-[9px] cursor-pointer"
                            >&lt;</button>
                            <button
                              onClick={() => {
                                if (currentMonth === 11) {
                                  setCurrentMonth(0);
                                  setCurrentYear(currentYear + 1);
                                } else {
                                  setCurrentMonth(currentMonth + 1);
                                }
                              }}
                              className="h-3 w-3 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded text-[9px] cursor-pointer"
                            >&gt;</button>
                          </div>
                        </div>

                        {/* Weekday labels */}
                        <div className="grid grid-cols-7 text-[8px] font-bold uppercase text-muted-foreground text-center">
                          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                            <span key={day}>{day}</span>
                          ))}
                        </div>

                        {/* Month Days Grid */}
                        <div className="grid grid-cols-7 gap-1 text-[9px] justify-items-center">
                          {/* Blank cells for days before the 1st */}
                          {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                            <div key={`blank-${idx}`} className="w-5 h-5" />
                          ))}

                          {/* Month days */}
                          {Array.from({ length: daysInMonth }).map((_, idx) => {
                            const dayNum = idx + 1;
                            const isSelected = selectedDay === dayNum && currentMonth === selectedMonth && currentYear === selectedYear;
                            const isToday =
                              currentYear === today.getFullYear() &&
                              currentMonth === today.getMonth() &&
                              dayNum === today.getDate();
                            const isFuture =
                              currentYear > today.getFullYear() ||
                              (currentYear === today.getFullYear() && currentMonth > today.getMonth()) ||
                              (currentYear === today.getFullYear() && currentMonth === today.getMonth() && dayNum > today.getDate());

                            return (
                              <button
                                key={`day-${dayNum}`}
                                disabled={isFuture}
                                onClick={() => {
                                  if (isFuture) return;
                                  setSelectedDay(dayNum);
                                  setSelectedMonth(currentMonth);
                                  setSelectedYear(currentYear);
                                  setTimeFilter("today");
                                  handleRegionChange(regionFilter);
                                  setTimeMenuOpen(false);
                                }}
                                className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-semibold transition-all ${
                                  isSelected
                                    ? "bg-emerald-500 text-white font-bold"
                                    : isToday
                                    ? "border border-emerald-500 text-emerald-500 hover:bg-emerald-500/10"
                                    : isFuture
                                    ? "text-muted-foreground/40 cursor-not-allowed"
                                    : "text-foreground hover:bg-muted"
                                }`}
                              >
                                {dayNum}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Cameroon Searchable Region Selector Dropdown */}
            <div className={`relative ${regionMenuOpen ? "z-50" : "z-10"}`}>
              <button
                onClick={() => setRegionMenuOpen(!regionMenuOpen)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-border/60 bg-card text-xs font-semibold text-foreground hover:bg-muted/50 transition-colors cursor-pointer select-none"
              >
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="truncate max-w-[120px]">{activeRegionName}</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </button>
              
              <AnimatePresence>
                {regionMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-[90]" onClick={() => setRegionMenuOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute left-0 mt-1.5 w-[250px] rounded-xl border border-border bg-card/95 backdrop-blur-xl p-2.5 shadow-xl z-[100] flex flex-col gap-2"
                    >
                      {/* Fuzzy Search Box inside dropdown */}
                      <div className="relative flex items-center">
                        <Search className="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search Cameroon region..."
                          className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-border/60 bg-muted/40 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/60"
                        />
                      </div>

                      <div className="h-px bg-border/40 my-1" />

                      {/* Regions List */}
                      <div className="flex flex-col gap-0.5 max-h-[220px] overflow-y-auto custom-scrollbar pr-0.5">
                        {/* Option: All Regions */}
                        <button
                          onClick={() => handleRegionChange("all")}
                          className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                            regionFilter === "all" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                          }`}
                        >
                          <span>All Regions</span>
                          <span className="text-[10px] opacity-75 font-normal">Cameroon Overview</span>
                        </button>

                        {/* List Cameroon Regions */}
                        {filteredRegions.map((region) => {
                          const meta = REGION_METADATA_MAP[region.id];
                          const isActive = regionFilter === region.id;
                          
                          return (
                            <button
                              key={region.id}
                              onClick={() => handleRegionChange(region.id)}
                              className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors flex flex-col gap-0.5 ${
                                isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className="font-bold">{region.name}</span>
                                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full border ${
                                  isActive
                                    ? "bg-white/20 border-transparent text-white"
                                    : meta.activityLevel === "High"
                                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                                    : meta.activityLevel === "Medium"
                                    ? "bg-amber-500/10 border-amber-500/20 text-amber-500"
                                    : "bg-slate-500/10 border-slate-500/20 text-muted-foreground"
                                }`}>
                                  {meta.activityLevel}
                                </span>
                              </div>
                              <div className={`text-[9px] flex items-center justify-between ${
                                isActive ? "text-white/80" : "text-muted-foreground"
                              }`}>
                                <span>{meta.activeUsers} Active Users</span>
                                <span>•</span>
                                <span>{meta.activeZones} Zones</span>
                              </div>
                            </button>
                          );
                        })}

                        {filteredRegions.length === 0 && (
                          <div className="text-center py-4 text-[10px] text-muted-foreground">
                            No Cameroon regions match search
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Grouped Section Tab Buttons */}
          <div className="flex bg-muted/65 p-1 rounded-lg border border-border/60">
            {[
              { id: "orders", label: "Orders" },
              { id: "revenue", label: "Revenue" },
              { id: "customers", label: "Customers" },
              { id: "market", label: "Market Intel" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === tab.id
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* ====================================================================
            MAIN COMMAND PANEL: SIDEBAR GRID FOR INTERACTIVE CAMEROON SVG MAP
            ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: ANALYTICS & CHARTS PANEL (lg:col-span-8 or 9) */}
          <div className="lg:col-span-9 flex flex-col gap-8">
            
            {/* 4. KPI ANALYTICS GRID (WITH TOUCH SWIPE SLIDE CAROUSAL & MICRO SYNC PULSE) */}
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
              </div>
            ) : (
              <div className="relative">
                {/* Visual sync overlay scanning effect */}
                <AnimatePresence>
                  {isSyncing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.15 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-emerald-500/20 rounded-2xl pointer-events-none z-20 backdrop-blur-[1px] flex items-center justify-center border border-emerald-500/30 overflow-hidden"
                    >
                      {/* Scanning neon laser lines */}
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent absolute top-0 animate-[bounce_1.5s_infinite]" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mobile touch-swipe-snap horizontally, grid on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 transition-opacity duration-300">
                  <AnimatePresence mode="wait">
                    {activeTab === "orders" && (
                      <>
                        <div className="gsap-stat-card">
                          <StatCard
                            title="Total Orders Today"
                            value={activeData.kpis.orders.total}
                            icon={ShoppingBag}
                            trend={12.4}
                            trendLabel="vs last Tuesday"
                            progress={84}
                            subMetrics={activeData.kpis.orders.subTotal}
                          />
                        </div>
                        <div className="gsap-stat-card">
                          <StatCard
                            title="Active in Transit"
                            value={activeData.kpis.orders.active}
                            icon={Truck}
                            trend={4.2}
                            progress={62}
                            subMetrics={activeData.kpis.orders.subActive}
                          />
                        </div>
                        <div className="gsap-stat-card">
                          <StatCard
                            title="Delivered Successfully"
                            value={activeData.kpis.orders.delivered}
                            icon={CheckCircle2}
                            trend={8.7}
                            accentType="success"
                            progress={94}
                            subMetrics={activeData.kpis.orders.subDelivered}
                          />
                        </div>
                        <div className="gsap-stat-card">
                          <StatCard
                            title="Cancelled / Missed"
                            value={activeData.kpis.orders.cancelled}
                            icon={AlertTriangle}
                            trend={-15.3}
                            accentType="warning"
                            progress={4}
                            subMetrics={activeData.kpis.orders.subCancelled}
                          />
                        </div>
                      </>
                    )}

                    {activeTab === "revenue" && (
                      <>
                        <div className="gsap-stat-card">
                          <StatCard
                            title="Daily Gross Income"
                            value={activeData.kpis.revenue.gross}
                            icon={DollarSign}
                            trend={16.8}
                            progress={78}
                            subMetrics={activeData.kpis.revenue.subGross}
                          />
                        </div>
                        <div className="gsap-stat-card">
                          <StatCard
                            title="Weekly Income"
                            value={activeData.kpis.revenue.weekly}
                            icon={DollarSign}
                            trend={21.4}
                            progress={82}
                            subMetrics={activeData.kpis.revenue.subWeekly}
                          />
                        </div>
                        <div className="gsap-stat-card">
                          <StatCard
                            title="Fleet Net Shares"
                            value={activeData.kpis.revenue.fleet}
                            icon={Truck}
                            trend={8.3}
                            progress={45}
                            subMetrics={activeData.kpis.revenue.subFleet}
                          />
                        </div>
                        <div className="gsap-stat-card">
                          <StatCard
                            title="Average Order Value"
                            value={activeData.kpis.revenue.avgValue}
                            icon={ShoppingBag}
                            trend={3.5}
                            progress={54}
                            subMetrics={activeData.kpis.revenue.subAvgValue}
                          />
                        </div>
                      </>
                    )}

                    {activeTab === "customers" && (
                      <>
                        <div className="gsap-stat-card">
                          <StatCard
                            title="Active Platform Users"
                            value={activeData.kpis.customers.active}
                            icon={Users}
                            trend={18.2}
                            progress={64}
                            subMetrics={activeData.kpis.customers.subActive}
                          />
                        </div>
                        <div className="gsap-stat-card">
                          <StatCard
                            title="Returning Customers"
                            value={activeData.kpis.customers.returning}
                            icon={Users}
                            trend={2.4}
                            accentType="success"
                            progress={76}
                            subMetrics={activeData.kpis.customers.subReturning}
                          />
                        </div>
                        <div className="gsap-stat-card">
                          <StatCard
                            title="New Weekly Signups"
                            value={activeData.kpis.customers.newWeekly}
                            icon={Users}
                            trend={34.1}
                            progress={90}
                            subMetrics={activeData.kpis.customers.subNewWeekly}
                          />
                        </div>
                        <div className="gsap-stat-card">
                          <StatCard
                            title="Peak Activity Hour"
                            value={activeData.kpis.customers.peakHour}
                            icon={Activity}
                            progress={95}
                            subMetrics={activeData.kpis.customers.subPeakHour}
                          />
                        </div>
                      </>
                    )}

                    {activeTab === "market" && (
                      <>
                        <div className="gsap-stat-card">
                          <StatCard
                            title="Trending Recipe"
                            value={activeData.kpis.market.trending}
                            icon={ChefHat}
                            trend={54.2}
                            accentType="success"
                            progress={96}
                            subMetrics={activeData.kpis.market.subTrending}
                          />
                        </div>
                        <div className="gsap-stat-card">
                          <StatCard
                            title="Cheapest Plan Available"
                            value={activeData.kpis.market.cheapest}
                            icon={DollarSign}
                            progress={22}
                            subMetrics={activeData.kpis.market.subCheapest}
                          />
                        </div>
                        <div className="gsap-stat-card">
                          <StatCard
                            title="Market Cost Index"
                            value={activeData.kpis.market.costIndex}
                            icon={Activity}
                            trend={1.2}
                            accentType="warning"
                            progress={78}
                            subMetrics={activeData.kpis.market.subCostIndex}
                          />
                        </div>
                        <div className="gsap-stat-card">
                          <StatCard
                            title="Kitchen Capacity Yield"
                            value={activeData.kpis.market.kitchenCapacity}
                            icon={ChefHat}
                            trend={4.5}
                            progress={86}
                            subMetrics={activeData.kpis.market.subKitchenCapacity}
                          />
                        </div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* 5. MAIN OPERATIONAL CHARTS SECTION */}
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2">
                <ChartSkeleton />
                <ChartSkeleton />
                <ChartSkeleton />
                <ChartSkeleton />
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 relative">
                {/* Charts micro sync layer */}
                <AnimatePresence>
                  {isSyncing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-emerald-500/10 rounded-2xl pointer-events-none z-20 backdrop-blur-[0.5px]"
                    />
                  )}
                </AnimatePresence>

                <div className="gsap-chart-card">
                  <RevenueTrendChart data={activeData.charts.revenueTrend} />
                </div>
                <div className="gsap-chart-card">
                  <OrderLifecycleChart data={activeData.charts.orderLifecycle} />
                </div>
                <div className="gsap-chart-card">
                  <MealPopularityChart data={activeData.charts.mealPopularity} />
                </div>
                <div className="gsap-chart-card">
                  <DeliveryActivityChart data={activeData.charts.deliveryActivity} />
                </div>
                <div className="gsap-chart-card md:col-span-2">
                  <UserEngagementChart data={activeData.charts.userEngagement} />
                </div>
              </div>
            )}

            {/* 6. AI INSIGHTS PANEL & LIVE ACTIVITY FEED SIDE-BY-SIDE */}
            <div className="grid gap-6 lg:grid-cols-5">
              {/* AI Insights - 3 Cols wide */}
              <div className="lg:col-span-3">
                {isLoading ? (
                  <AIInsightsSkeleton />
                ) : (
                  <div className="gsap-feed-panel h-full relative">
                    <AnimatePresence>
                      {isSyncing && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-emerald-500/10 rounded-2xl pointer-events-none z-20 backdrop-blur-[0.5px]"
                        />
                      )}
                    </AnimatePresence>
                    <AIInsights insights={activeData.insights} />
                  </div>
                )}
              </div>
              
              {/* Live activity feed - 2 Cols wide */}
              <div className="lg:col-span-2">
                {isLoading ? (
                  <ActivityFeedSkeleton />
                ) : (
                  <div className="gsap-feed-panel h-full relative">
                    <AnimatePresence>
                      {isSyncing && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-emerald-500/10 rounded-2xl pointer-events-none z-20 backdrop-blur-[0.5px]"
                        />
                      )}
                    </AnimatePresence>
                    <LiveActivityFeed
                      customEvents={activeData.activityFeed}
                      customSimulatedEvents={activeData.simulatedActivityStream}
                    />
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR: INTERACTIVE GEOMETRIC CAMEROON SVG MAP (lg:col-span-3 or 4) */}
          <div className="lg:col-span-3 flex flex-col gap-6 lg:sticky lg:top-6">
            
            {/* Cameroon SVG map control panel */}
            <div className="flex flex-col gap-4">
              <CameroonMap
                selectedRegionId={regionFilter}
                onSelectRegion={handleRegionChange}
                metadata={REGION_METADATA_MAP}
              />
            </div>

            {/* Sidebar contextual region information box */}
            <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col gap-4 backdrop-blur-md">
              <div className="flex items-center gap-2 border-b border-border/40 pb-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Focused Intel Summary</h4>
              </div>

              {regionFilter === "all" ? (
                <div className="text-xs text-muted-foreground leading-relaxed flex flex-col gap-3">
                  <p>
                    Showing combined aggregates across all <strong>10 Cameroon nodes</strong>.
                  </p>
                  <div className="p-3 bg-muted/40 rounded-lg border border-border/40 flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-[10px] text-muted-foreground uppercase font-medium">Busiest Hub</span>
                      <span className="font-bold text-foreground">Littoral (Douala)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[10px] text-muted-foreground uppercase font-medium">High Growth Hub</span>
                      <span className="font-bold text-emerald-500">South West (Buea)</span>
                    </div>
                  </div>
                  <p className="text-[10px]">
                    Click any geometric path on the Cameroon mini map or select from the dropdown to focus dashboard metrics, activity streams, and cost indices.
                  </p>
                </div>
              ) : (
                <div className="text-xs text-muted-foreground leading-relaxed flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground text-sm">{activeRegionName} Node</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase border border-emerald-500/20">
                      {activeData.metadata.activityLevel} Activity
                    </span>
                  </div>

                  <p>
                    Operational analytics, logistics metrics, and raw ingredient indexes are targeted specifically to the <strong>{activeRegionName}</strong> kitchen.
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-1">
                    <div className="p-2.5 bg-muted/45 rounded-lg border border-border/30 flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Active Zones</span>
                      <span className="font-bold text-foreground text-sm mt-0.5">{activeData.metadata.activeZones} hubs</span>
                    </div>
                    <div className="p-2.5 bg-muted/45 rounded-lg border border-border/30 flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Active Users</span>
                      <span className="font-bold text-foreground text-sm mt-0.5">{activeData.metadata.activeUsers}</span>
                    </div>
                  </div>

                  <div className="text-[10px] bg-emerald-500/[0.02] border border-emerald-500/10 rounded-lg p-3 text-emerald-600 dark:text-emerald-400 flex gap-2">
                    <Sparkles className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span>
                      {activeData.insights[0]?.title || "Region is currently stable with normal logistics latency."}
                    </span>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* 7. QUICK ACTION DOCK SYSTEM */}
      <QuickActions />
    </div>
  );
}

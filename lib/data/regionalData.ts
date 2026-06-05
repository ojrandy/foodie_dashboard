export interface ActivityFeedItem {
  id: string;
  type: "order" | "market" | "dispatch" | "recipe";
  title: string;
  description: string;
  time: string;
  status: "success" | "warning" | "info";
  detail?: string;
}

export interface SimulatedActivityItem {
  type: "order" | "market" | "dispatch" | "recipe";
  title: string;
  description: string;
  status: "success" | "warning" | "info";
  detail?: string;
}

export interface InsightItem {
  id: string;
  type: "market" | "logistics" | "price" | "trend";
  title: string;
  description: string;
  severity: "success" | "warning" | "primary";
  metric?: string;
  actionText?: string;
}

export interface RegionalData {
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
  insights: InsightItem[];
  activityFeed: ActivityFeedItem[];
  simulatedActivityStream: SimulatedActivityItem[];
}

export const REGION_METADATA_MAP: Record<string, { activeUsers: string; activeZones: number; activityLevel: "High" | "Medium" | "Stable" }> = {
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

export const CameroonRegionsList = [
  { id: "far_north", name: "Far North" },
  { id: "north", name: "North" },
  { id: "adamawa", name: "Adamawa" },
  { id: "centre", name: "Centre" },
  { id: "east", name: "East" },
  { id: "south", name: "South" },
  { id: "littoral", name: "Littoral" },
  { id: "west", name: "West" },
  { id: "north_west", name: "North West" },
  { id: "south_west", name: "South West" },
];

export const REGIONAL_DATASETS: Record<string, RegionalData> = {
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

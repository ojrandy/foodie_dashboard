"use client";

import { useState, useMemo, lazy, Suspense } from "react";
import dynamic from "next/dynamic";
import {
  DollarSign, ShoppingBag, Truck, Users, Calendar, MapPin,
  ChevronDown, Activity, AlertTriangle, CheckCircle2, Sparkles, ChefHat, Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import { StatCard } from "@/components/dashboard/StatCard";
import {
  ChartSkeleton, ActivityFeedSkeleton, AIInsightsSkeleton,
} from "@/components/dashboard/SkeletonLoaders";
import { REGIONAL_DATASETS, REGION_METADATA_MAP, CameroonRegionsList, type RegionalData } from "@/lib/data/regionalData";

const AmbientBackground = dynamic(
  () => import("@/components/dashboard/AmbientBackground").then((m) => m.AmbientBackground),
  { ssr: false }
);

const QuickActions = lazy(() => import("@/components/dashboard/QuickActions").then((m) => ({ default: m.QuickActions })));
const CameroonMap = lazy(() => import("@/components/dashboard/CameroonMap").then((m) => ({ default: m.CameroonMap })));
const AIInsights = lazy(() => import("@/components/dashboard/AIInsights").then((m) => ({ default: m.AIInsights })));
const LiveActivityFeed = lazy(() => import("@/components/dashboard/LiveActivityFeed").then((m) => ({ default: m.LiveActivityFeed })));

const RevenueTrendChart = lazy(() => import("@/components/dashboard/OperationalCharts").then((m) => ({ default: m.RevenueTrendChart })));
const OrderLifecycleChart = lazy(() => import("@/components/dashboard/OperationalCharts").then((m) => ({ default: m.OrderLifecycleChart })));
const MealPopularityChart = lazy(() => import("@/components/dashboard/OperationalCharts").then((m) => ({ default: m.MealPopularityChart })));
const DeliveryActivityChart = lazy(() => import("@/components/dashboard/OperationalCharts").then((m) => ({ default: m.DeliveryActivityChart })));
const UserEngagementChart = lazy(() => import("@/components/dashboard/OperationalCharts").then((m) => ({ default: m.UserEngagementChart })));

export default function DashboardPage() {
  const { t } = useTranslation();
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

  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  const [timeMenuOpen, setTimeMenuOpen] = useState(false);
  const [regionMenuOpen, setRegionMenuOpen] = useState(false);

  const handleRegionChange = (newRegion: string) => {
    setIsSyncing(true);
    setRegionFilter(newRegion);
    setRegionMenuOpen(false);
    setTimeout(() => setIsSyncing(false), 400);
  };

  const activeData: RegionalData = useMemo(() => {
    const matched = REGIONAL_DATASETS[regionFilter];
    if (matched) return matched;
    const meta = REGION_METADATA_MAP[regionFilter] || { activeUsers: "3,200", activeZones: 8, activityLevel: "Stable" };
    const base = REGIONAL_DATASETS["centre"];
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

  const filteredRegions = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return CameroonRegionsList;
    return CameroonRegionsList.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const activeRegionName = useMemo(() => {
    if (regionFilter === "all") return "All Regions";
    return CameroonRegionsList.find((r) => r.id === regionFilter)?.name || "All Regions";
  }, [regionFilter]);

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] flex flex-col gap-6 pb-12 bg-background">
      {/* 1. HERO SECTION */}
      <div className="relative -mx-6 -mt-6 p-8 overflow-hidden min-h-[200px] flex flex-col justify-center border-b border-border/40 glass">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-glow-1 blur-[100px]" />
          <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-glow-2 blur-[100px]" />
          <AmbientBackground />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-2">
          <div className="inline-flex items-center gap-1.5 self-start bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-bold tracking-wider text-accent uppercase">{t("dashboard.status")}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mt-1">
            {t("dashboard.title")}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mt-1 leading-relaxed">
            {t("dashboard.subtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto flex flex-col gap-8 px-6 mt-[-1.5rem] z-10">

        {/* 2. OPERATIONAL STATUS STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl border border-border/40 glass shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Truck className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">{t("dashboard.metrics.active_deliveries")}</span>
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
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">{t("dashboard.metrics.fulfillment_rate")}</span>
              <span className="text-sm font-bold text-foreground">{activeData.statusStrip.fulfillmentRate}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 border-l border-border/40 pl-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
              <AlertTriangle className="h-5 w-5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">{t("dashboard.metrics.market_alerts")}</span>
              <span className="text-sm font-bold text-destructive truncate max-w-[120px]">{activeData.statusStrip.marketAlerts}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 border-l border-border/40 pl-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Activity className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">{t("dashboard.metrics.logistics_latency")}</span>
              <span className="text-sm font-bold text-foreground">{activeData.statusStrip.latency}</span>
            </div>
          </div>
        </div>

        {/* 3. CONTROLLERS */}
        <div className={`relative ${timeMenuOpen || regionMenuOpen ? "z-50" : "z-30"} flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/40 pb-4`}>
          <div className="flex flex-wrap items-center gap-3">
            {/* Time Filter */}
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
                      <div className="flex bg-muted/60 p-0.5 rounded-lg border border-border/50">
                        {[
                          { id: "today", label: "Day" },
                          { id: "week", label: "Week" },
                          { id: "month", label: "Month" },
                        ].map((item) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              setTimeFilter(item.id as "today" | "week" | "month");
                              if (item.id !== "today") {
                                setSelectedDay(null);
                                handleRegionChange(regionFilter);
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
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between px-1">
                          <span className="text-[10px] font-bold text-foreground">{MONTHS[currentMonth]} {currentYear}</span>
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => {
                                if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
                                else { setCurrentMonth(currentMonth - 1); }
                              }}
                              className="h-3 w-3 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded text-[9px] cursor-pointer"
                            >&lt;</button>
                            <button
                              onClick={() => {
                                if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
                                else { setCurrentMonth(currentMonth + 1); }
                              }}
                              className="h-3 w-3 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded text-[9px] cursor-pointer"
                            >&gt;</button>
                          </div>
                        </div>
                        <div className="grid grid-cols-7 text-[8px] font-bold uppercase text-muted-foreground text-center">
                          {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (<span key={d}>{d}</span>))}
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-[9px] justify-items-center">
                          {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                            <div key={`b-${idx}`} className="w-5 h-5" />
                          ))}
                          {Array.from({ length: daysInMonth }).map((_, idx) => {
                            const dayNum = idx + 1;
                            const isSelected = selectedDay === dayNum && currentMonth === selectedMonth && currentYear === selectedYear;
                            const isToday = currentYear === today.getFullYear() && currentMonth === today.getMonth() && dayNum === today.getDate();
                            const isFuture = currentYear > today.getFullYear() ||
                              (currentYear === today.getFullYear() && currentMonth > today.getMonth()) ||
                              (currentYear === today.getFullYear() && currentMonth === today.getMonth() && dayNum > today.getDate());
                            return (
                              <button
                                key={`d-${dayNum}`}
                                disabled={isFuture}
                                onClick={() => {
                                  if (isFuture) return;
                                  setSelectedDay(dayNum); setSelectedMonth(currentMonth);
                                  setSelectedYear(currentYear); setTimeFilter("today");
                                  handleRegionChange(regionFilter); setTimeMenuOpen(false);
                                }}
                                className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-semibold transition-all ${
                                  isSelected ? "bg-emerald-500 text-white font-bold"
                                  : isToday ? "border border-emerald-500 text-emerald-500 hover:bg-emerald-500/10"
                                  : isFuture ? "text-muted-foreground/40 cursor-not-allowed"
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

            {/* Region Selector */}
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
                      <div className="flex flex-col gap-0.5 max-h-[220px] overflow-y-auto custom-scrollbar pr-0.5">
                        <button
                          onClick={() => handleRegionChange("all")}
                          className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                            regionFilter === "all" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                          }`}
                        >
                          <span>All Regions</span>
                          <span className="text-[10px] opacity-75 font-normal">Cameroon Overview</span>
                        </button>
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
                                  isActive ? "bg-white/20 border-transparent text-white"
                                  : meta.activityLevel === "High" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                                  : meta.activityLevel === "Medium" ? "bg-amber-500/10 border-amber-500/20 text-amber-500"
                                  : "bg-slate-500/10 border-slate-500/20 text-muted-foreground"
                                }`}>{meta.activityLevel}</span>
                              </div>
                              <div className={`text-[9px] flex items-center justify-between ${isActive ? "text-white/80" : "text-muted-foreground"}`}>
                                <span>{meta.activeUsers} Active Users</span>
                                <span>&bull;</span>
                                <span>{meta.activeZones} Zones</span>
                              </div>
                            </button>
                          );
                        })}
                        {filteredRegions.length === 0 && (
                          <div className="text-center py-4 text-[10px] text-muted-foreground">No Cameroon regions match search</div>
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Tab Buttons */}
          <div className="flex bg-muted/65 p-1 rounded-lg border border-border/60">
            {[
              { id: "orders", label: t("dashboard.tabs.orders") },
              { id: "revenue", label: t("dashboard.tabs.revenue") },
              { id: "customers", label: t("dashboard.tabs.customers") },
              { id: "market", label: t("dashboard.tabs.market") },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "orders" | "revenue" | "customers" | "market")}
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

        {/* MAIN CONTENT: CHARTS + MAP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-9 flex flex-col gap-8">

            {/* 4. KPI GRID */}
            <div className="relative">
              <AnimatePresence>
                {isSyncing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-emerald-500/20 rounded-2xl pointer-events-none z-20 backdrop-blur-[1px] flex items-center justify-center border border-emerald-500/30 overflow-hidden"
                  >
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent absolute top-0 animate-[bounce_1.5s_infinite]" />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 transition-opacity duration-300">
                <AnimatePresence mode="wait">
                  {activeTab === "orders" && (
                    <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="contents">
                      <StatCard title="Total Orders Today" value={activeData.kpis.orders.total} icon={ShoppingBag} trend={12.4} trendLabel="vs last Tuesday" progress={84} subMetrics={activeData.kpis.orders.subTotal} />
                      <StatCard title="Active in Transit" value={activeData.kpis.orders.active} icon={Truck} trend={4.2} progress={62} subMetrics={activeData.kpis.orders.subActive} />
                      <StatCard title="Delivered Successfully" value={activeData.kpis.orders.delivered} icon={CheckCircle2} trend={8.7} accentType="success" progress={94} subMetrics={activeData.kpis.orders.subDelivered} />
                      <StatCard title="Cancelled / Missed" value={activeData.kpis.orders.cancelled} icon={AlertTriangle} trend={-15.3} accentType="warning" progress={4} subMetrics={activeData.kpis.orders.subCancelled} />
                    </motion.div>
                  )}
                  {activeTab === "revenue" && (
                    <motion.div key="revenue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="contents">
                      <StatCard title="Daily Gross Income" value={activeData.kpis.revenue.gross} icon={DollarSign} trend={16.8} progress={78} subMetrics={activeData.kpis.revenue.subGross} />
                      <StatCard title="Weekly Income" value={activeData.kpis.revenue.weekly} icon={DollarSign} trend={21.4} progress={82} subMetrics={activeData.kpis.revenue.subWeekly} />
                      <StatCard title="Fleet Net Shares" value={activeData.kpis.revenue.fleet} icon={Truck} trend={8.3} progress={45} subMetrics={activeData.kpis.revenue.subFleet} />
                      <StatCard title="Average Order Value" value={activeData.kpis.revenue.avgValue} icon={ShoppingBag} trend={3.5} progress={54} subMetrics={activeData.kpis.revenue.subAvgValue} />
                    </motion.div>
                  )}
                  {activeTab === "customers" && (
                    <motion.div key="customers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="contents">
                      <StatCard title="Active Platform Users" value={activeData.kpis.customers.active} icon={Users} trend={18.2} progress={64} subMetrics={activeData.kpis.customers.subActive} />
                      <StatCard title="Returning Customers" value={activeData.kpis.customers.returning} icon={Users} trend={2.4} accentType="success" progress={76} subMetrics={activeData.kpis.customers.subReturning} />
                      <StatCard title="New Weekly Signups" value={activeData.kpis.customers.newWeekly} icon={Users} trend={34.1} progress={90} subMetrics={activeData.kpis.customers.subNewWeekly} />
                      <StatCard title="Peak Activity Hour" value={activeData.kpis.customers.peakHour} icon={Activity} progress={95} subMetrics={activeData.kpis.customers.subPeakHour} />
                    </motion.div>
                  )}
                  {activeTab === "market" && (
                    <motion.div key="market" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="contents">
                      <StatCard title="Trending Recipe" value={activeData.kpis.market.trending} icon={ChefHat} trend={54.2} accentType="success" progress={96} subMetrics={activeData.kpis.market.subTrending} />
                      <StatCard title="Cheapest Plan Available" value={activeData.kpis.market.cheapest} icon={DollarSign} progress={22} subMetrics={activeData.kpis.market.subCheapest} />
                      <StatCard title="Market Cost Index" value={activeData.kpis.market.costIndex} icon={Activity} trend={1.2} accentType="warning" progress={78} subMetrics={activeData.kpis.market.subCostIndex} />
                      <StatCard title="Kitchen Capacity Yield" value={activeData.kpis.market.kitchenCapacity} icon={ChefHat} trend={4.5} progress={86} subMetrics={activeData.kpis.market.subKitchenCapacity} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 5. CHARTS */}
            <div className="grid gap-6 md:grid-cols-2 relative">
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
              <Suspense fallback={<ChartSkeleton />}><RevenueTrendChart data={activeData.charts.revenueTrend} /></Suspense>
              <Suspense fallback={<ChartSkeleton />}><OrderLifecycleChart data={activeData.charts.orderLifecycle} /></Suspense>
              <Suspense fallback={<ChartSkeleton />}><MealPopularityChart data={activeData.charts.mealPopularity} /></Suspense>
              <Suspense fallback={<ChartSkeleton />}><DeliveryActivityChart data={activeData.charts.deliveryActivity} /></Suspense>
              <div className="md:col-span-2"><Suspense fallback={<ChartSkeleton />}><UserEngagementChart data={activeData.charts.userEngagement} /></Suspense></div>
            </div>

            {/* 6. AI INSIGHTS + ACTIVITY FEED */}
            <div className="grid gap-6 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <div className="h-full relative">
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
                  <Suspense fallback={<AIInsightsSkeleton />}>
                    <AIInsights insights={activeData.insights} />
                  </Suspense>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="h-full relative">
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
                  <Suspense fallback={<ActivityFeedSkeleton />}>
                    <LiveActivityFeed
                      customEvents={activeData.activityFeed}
                      customSimulatedEvents={activeData.simulatedActivityStream}
                    />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: CAMEROON MAP */}
          <div className="lg:col-span-3 flex flex-col gap-6 lg:sticky lg:top-6">
            <div className="flex flex-col gap-4">
              <Suspense fallback={<div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm h-[300px] animate-pulse" />}>
                <CameroonMap
                  selectedRegionId={regionFilter}
                  onSelectRegion={handleRegionChange}
                  metadata={REGION_METADATA_MAP}
                />
              </Suspense>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm flex flex-col gap-4 backdrop-blur-md">
              <div className="flex items-center gap-2 border-b border-border/40 pb-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Focused Intel Summary</h4>
              </div>
              {regionFilter === "all" ? (
                <div className="text-xs text-muted-foreground leading-relaxed flex flex-col gap-3">
                  <p>Showing combined aggregates across all <strong>10 Cameroon nodes</strong>.</p>
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
                  <p className="text-[10px]">Click any geometric path on the Cameroon mini map or select from the dropdown to focus dashboard metrics.</p>
                </div>
              ) : (
                <div className="text-xs text-muted-foreground leading-relaxed flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground text-sm">{activeRegionName} Node</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase border border-emerald-500/20">{activeData.metadata.activityLevel} Activity</span>
                  </div>
                  <p>Operational analytics, logistics metrics, and raw ingredient indexes are targeted specifically to the <strong>{activeRegionName}</strong> kitchen.</p>
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
                    <span>{activeData.insights[0]?.title || "Region is currently stable with normal logistics latency."}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 7. QUICK ACTIONS */}
      <Suspense fallback={null}><QuickActions /></Suspense>
    </div>
  );
}

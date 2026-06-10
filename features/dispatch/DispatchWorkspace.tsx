"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Users, Map as MapIcon, BarChart3 } from "lucide-react";

// Tab 1 Components
import { DispatchCommandCenter } from "./components/DispatchCommandCenter";
import { DispatchAssignmentBoard } from "./components/DispatchAssignmentBoard";
import { LogisticsActivityFeed } from "./components/LogisticsActivityFeed";
import { LiveTrackingSimulator } from "./components/LiveTrackingSimulator";

// Tab 2 Components
import { RiderManagementCenter } from "./components/RiderManagementCenter";
import { RiderPerformanceDashboard } from "./components/RiderPerformanceDashboard";
import { DeliveryIncidentCenter } from "./components/DeliveryIncidentCenter";

// Tab 3 Components
import { CameroonDeliveryMap } from "./components/CameroonDeliveryMap";
import { DeliveryHeatmaps } from "./components/DeliveryHeatmaps";

// Tab 4 Components
import { LogisticsIntelligenceEngine } from "./components/LogisticsIntelligenceEngine";
import { RouteOptimizationCenter } from "./components/RouteOptimizationCenter";
import { DeliveryAnalyticsCenter } from "./components/DeliveryAnalyticsCenter";

export function DispatchWorkspace() {
  const [activeTab, setActiveTab] = useState<"routing" | "fleet" | "intelligence" | "optimization">("routing");

  const tabs = [
    { id: "routing", label: "Live Routing", icon: Truck },
    { id: "fleet", label: "Fleet Operators", icon: Users },
    { id: "intelligence", label: "Intelligence", icon: MapIcon },
    { id: "optimization", label: "Optimization", icon: BarChart3 },
  ] as const;

  return (
    <div className="space-y-6 pb-20">
      {/* Header & Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-3">
            <Truck className="h-8 w-8 text-primary" />
            Logistics Control Center
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time fleet management, route intelligence, and dynamic rider assignment.
          </p>
        </div>

        <div className="flex bg-muted/30 p-1 rounded-xl border border-border/40 glass">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                  isActive ? "text-primary shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="dispatch-tab-indicator"
                    className="absolute inset-0 bg-background border border-border/50 rounded-lg shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {activeTab === "routing" && (
            <div className="space-y-6">
              <DispatchCommandCenter />
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <DispatchAssignmentBoard />
                </div>
                <div className="space-y-6">
                  <LogisticsActivityFeed />
                  <LiveTrackingSimulator />
                </div>
              </div>
            </div>
          )}

          {activeTab === "fleet" && (
            <div className="space-y-6">
              <RiderManagementCenter />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RiderPerformanceDashboard />
                <DeliveryIncidentCenter />
              </div>
            </div>
          )}

          {activeTab === "intelligence" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CameroonDeliveryMap />
              <DeliveryHeatmaps />
            </div>
          )}

          {activeTab === "optimization" && (
            <div className="space-y-6">
              <LogisticsIntelligenceEngine />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RouteOptimizationCenter />
                <DeliveryAnalyticsCenter />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

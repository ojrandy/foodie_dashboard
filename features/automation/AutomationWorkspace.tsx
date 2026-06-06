"use client";

import React, { useState } from "react";
import { Zap, Activity, Calculator, CalendarDays, ShoppingCart, LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import all 10 Modules
import { RecipeAutomationDashboard } from "./components/RecipeAutomationDashboard";
import { PipelineVisualizer } from "./components/PipelineVisualizer";
import { ConversionAnalytics } from "./components/ConversionAnalytics";
import { ProfitabilityAnalytics } from "./components/ProfitabilityAnalytics";
import { MarginStressTester } from "./components/MarginStressTester";
import { FleetLogisticsCenter } from "./components/FleetLogisticsCenter";
import { BudgetAlgorithmSandbox } from "./components/BudgetAlgorithmSandbox";
import { SubscriptionPlanAnalytics } from "./components/SubscriptionPlanAnalytics";
import { LiveDispatchMonitor } from "./components/LiveDispatchMonitor";
import { AIOptimizationCenter } from "./components/AIOptimizationCenter";

type TabType = "Command Center" | "Simulators" | "Planners" | "Order Engine";

export function AutomationWorkspace() {
  const [activeTab, setActiveTab] = useState<TabType>("Command Center");

  const tabs: { id: TabType; icon: LucideIcon; label: string }[] = [
    { id: "Command Center", icon: Activity, label: "Command Center" },
    { id: "Simulators", icon: Calculator, label: "Simulators" },
    { id: "Planners", icon: CalendarDays, label: "Planners" },
    { id: "Order Engine", icon: ShoppingCart, label: "Order Engine" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <Zap className="h-8 w-8 text-primary" /> Smart Recipe-to-Order Automation
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            End-to-end predictive engine linking recipes, pricing, logistics, and dynamic orders.
          </p>
        </div>
        
        {/* Custom Tabs Navigation */}
        <div className="flex gap-1 bg-muted/20 p-1 rounded-xl border border-border/40">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Rendering */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "Command Center" && (
            <div className="space-y-6">
              <RecipeAutomationDashboard />
              <PipelineVisualizer />
              <div className="grid grid-cols-1 gap-6">
                <ConversionAnalytics />
                <ProfitabilityAnalytics />
              </div>
            </div>
          )}

          {activeTab === "Simulators" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MarginStressTester />
              <FleetLogisticsCenter />
            </div>
          )}

          {activeTab === "Planners" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BudgetAlgorithmSandbox />
              <SubscriptionPlanAnalytics />
            </div>
          )}

          {activeTab === "Order Engine" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LiveDispatchMonitor />
              <div className="space-y-6">
                <AIOptimizationCenter />
                {/* Additional space for future engine modules or charts could go here */}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

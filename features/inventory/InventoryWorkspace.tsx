"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Database, Map, BrainCircuit, ShieldAlert } from "lucide-react";

// Tab 1: Command Center
import { SupplyCommandCenter } from "./components/SupplyCommandCenter";
import { InventoryActivityFeed } from "./components/InventoryActivityFeed";

// Tab 2: Intelligence Directory
import { SupplyRegistryTable } from "./components/SupplyRegistryTable";
import { SupplyStatusMonitoring } from "./components/SupplyStatusMonitoring";

// Tab 3: Geographic Intelligence
import { RegionalSupplyIntelligence } from "./components/RegionalSupplyIntelligence";
import { SupplyHeatmaps } from "./components/SupplyHeatmaps";
import { MarketSupplyMonitoring } from "./components/MarketSupplyMonitoring";

// Tab 4: Predictive AI & Optimization
import { ShortageDetectionCenter } from "./components/ShortageDetectionCenter";
import { DemandForecastingEngine } from "./components/DemandForecastingEngine";
import { SmartSupplyRecommendations } from "./components/SmartSupplyRecommendations";

// Tab 5: Risk & Analytics
import { SupplyChainRiskMatrix } from "./components/SupplyChainRiskMatrix";
import { RecipeDependencyGraph } from "./components/RecipeDependencyGraph";
import { InventoryAnalytics } from "./components/InventoryAnalytics";

export function InventoryWorkspace() {
  const [activeTab, setActiveTab] = useState("command-center");

  const tabs = [
    { id: "command-center", label: "Command Center", icon: LayoutDashboard },
    { id: "directory", label: "Supply Registry", icon: Database },
    { id: "geographic", label: "Geographic Intel", icon: Map },
    { id: "predictive", label: "Predictive AI", icon: BrainCircuit },
    { id: "risk-analytics", label: "Risk & Analytics", icon: ShieldAlert },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] overflow-hidden max-w-[1600px] mx-auto w-full gap-4">
      
      {/* Header & Navigation */}
      <header className="shrink-0 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
              Inventory Intelligence
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Market-Based Supply Chain & Intelligence Center
            </p>
          </div>
        </div>

        <div className="flex overflow-x-auto custom-scrollbar pb-2">
          <div className="flex p-1 bg-muted/20 border border-border/40 rounded-xl">
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
                      layoutId="inventory-tab-indicator"
                      className="absolute inset-0 bg-background border border-border/50 rounded-lg shadow-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <tab.icon className={`h-4 w-4 relative z-10 ${isActive ? "text-primary" : ""}`} />
                  <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto custom-scrollbar pb-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeTab === "command-center" && (
              <div className="flex flex-col gap-4 h-full">
                <div className="shrink-0">
                  <SupplyCommandCenter />
                </div>
                <div className="flex-1 min-h-[300px]">
                  <InventoryActivityFeed />
                </div>
              </div>
            )}

            {activeTab === "directory" && (
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 h-full">
                <div className="xl:col-span-3 h-[600px] xl:h-full">
                  <SupplyRegistryTable />
                </div>
                <div className="xl:col-span-1 h-[400px] xl:h-full">
                  <SupplyStatusMonitoring />
                </div>
              </div>
            )}

            {activeTab === "geographic" && (
              <div className="flex flex-col gap-4 h-full">
                <div className="shrink-0">
                  <RegionalSupplyIntelligence />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[400px]">
                  <SupplyHeatmaps />
                  <MarketSupplyMonitoring />
                </div>
              </div>
            )}

            {activeTab === "predictive" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                <div className="lg:col-span-2 flex flex-col gap-4">
                  <div className="flex-1 min-h-[350px]">
                    <DemandForecastingEngine />
                  </div>
                  <div className="shrink-0">
                    <SmartSupplyRecommendations />
                  </div>
                </div>
                <div className="lg:col-span-1 h-[500px] lg:h-full">
                  <ShortageDetectionCenter />
                </div>
              </div>
            )}

            {activeTab === "risk-analytics" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                <div className="lg:col-span-1 flex flex-col gap-4">
                  <div className="h-[400px]">
                    <SupplyChainRiskMatrix />
                  </div>
                  <div className="flex-1 min-h-[300px]">
                    <RecipeDependencyGraph />
                  </div>
                </div>
                <div className="lg:col-span-2 h-[500px] lg:h-full">
                  <InventoryAnalytics />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

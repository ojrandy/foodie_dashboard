"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Users, HeartPulse, LineChart, Map } from "lucide-react";

// Tab 1: Command Center
import { CustomerCommandCenter } from "./components/CustomerCommandCenter";
import { CustomerActivityFeed } from "./components/CustomerActivityFeed";
import { ExecutiveCustomerAnalytics } from "./components/ExecutiveCustomerAnalytics";

// Tab 2: Customer Registry
import { CustomerRegistryTable } from "./components/CustomerRegistryTable";

// Tab 3: Behavioral Intelligence
import { FoodPreferenceAnalytics } from "./components/FoodPreferenceAnalytics";
import { SpendingIntelligence } from "./components/SpendingIntelligence";
import { CustomerSatisfactionCenter } from "./components/CustomerSatisfactionCenter";

// Tab 4: Growth & Retention
import { RetentionAnalytics } from "./components/RetentionAnalytics";
import { CustomerSegmentation } from "./components/CustomerSegmentation";
import { CustomerJourneyFunnel } from "./components/CustomerJourneyFunnel";

// Tab 5: Geographic & AI Insights
import { GeographicIntelligence } from "./components/GeographicIntelligence";
import { RevenueIntelligence } from "./components/RevenueIntelligence";
import { SmartCustomerInsights } from "./components/SmartCustomerInsights";

export function CustomerIntelligenceWorkspace() {
  const [activeTab, setActiveTab] = useState("command-center");

  const tabs = [
    { id: "command-center", label: "Executive Dashboard", icon: LayoutDashboard },
    { id: "registry", label: "Customer Registry", icon: Users },
    { id: "behavioral", label: "Behavioral Intel", icon: HeartPulse },
    { id: "growth", label: "Growth & Retention", icon: LineChart },
    { id: "geographic", label: "Geographic Insights", icon: Map },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] overflow-hidden max-w-[1600px] mx-auto w-full gap-4">
      
      {/* Header & Navigation */}
      <header className="shrink-0 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              Customer Intelligence
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Deep Behavioral & Analytics CRM Platform
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
                    isActive ? "text-blue-500 shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="customer-tab-indicator"
                      className="absolute inset-0 bg-background border border-border/50 rounded-lg shadow-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <tab.icon className={`h-4 w-4 relative z-10 ${isActive ? "text-blue-500" : ""}`} />
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
                  <CustomerCommandCenter />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-[400px]">
                  <div className="lg:col-span-2">
                    <ExecutiveCustomerAnalytics />
                  </div>
                  <div className="lg:col-span-1">
                    <CustomerActivityFeed />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "registry" && (
              <div className="h-full min-h-[600px]">
                <CustomerRegistryTable />
              </div>
            )}

            {activeTab === "behavioral" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                <div className="lg:col-span-1 h-[400px] lg:h-full">
                  <FoodPreferenceAnalytics />
                </div>
                <div className="lg:col-span-2 flex flex-col gap-4 h-full">
                  <div className="flex-1 min-h-[300px]">
                    <SpendingIntelligence />
                  </div>
                  <div className="shrink-0 min-h-[250px]">
                    <CustomerSatisfactionCenter />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "growth" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                <div className="lg:col-span-2 flex flex-col gap-4 h-full">
                  <div className="flex-1 min-h-[350px]">
                    <RetentionAnalytics />
                  </div>
                  <div className="shrink-0 min-h-[200px]">
                    <CustomerSegmentation />
                  </div>
                </div>
                <div className="lg:col-span-1 h-[400px] lg:h-full">
                  <CustomerJourneyFunnel />
                </div>
              </div>
            )}

            {activeTab === "geographic" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                <div className="lg:col-span-2 h-[500px] lg:h-full">
                  <GeographicIntelligence />
                </div>
                <div className="lg:col-span-1 flex flex-col gap-4 h-full">
                  <div className="flex-1 min-h-[300px]">
                    <RevenueIntelligence />
                  </div>
                  <div className="shrink-0 min-h-[200px]">
                    <SmartCustomerInsights />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

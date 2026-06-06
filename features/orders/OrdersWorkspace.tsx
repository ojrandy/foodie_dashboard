"use client";

import React, { useState } from "react";
import { ShoppingCart, LayoutGrid, TableProperties, LineChart, Wallet, LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mod 1, 2, 11
import { OrdersCommandCenter } from "./components/OrdersCommandCenter";
import { OrdersPipelineBoard } from "./components/OrdersPipelineBoard";
import { CustomerActivityFeed } from "./components/CustomerActivityFeed";

// Mod 3, 4
import { OrdersManagementTable } from "./components/OrdersManagementTable";
import { OrderDetailsDrawer } from "./components/OrderDetailsDrawer";

// Mod 5, 6, 7
import { LiveOrderTrackingSimulator } from "./components/LiveOrderTrackingSimulator";
import { PaymentVerificationCenter } from "./components/PaymentVerificationCenter";
import { RefundManagement } from "./components/RefundManagement";

// Mod 8, 9, 10, 12
import { DeliveryETAIntelligence } from "./components/DeliveryETAIntelligence";
import { SmartOrderInsights } from "./components/SmartOrderInsights";
import { OrderAnalyticsCenter } from "./components/OrderAnalyticsCenter";
import { OrderPerformanceDashboard } from "./components/OrderPerformanceDashboard";

type TabType = "Pipeline" | "Records" | "Finance & Tracking" | "Intelligence";

export function OrdersWorkspace() {
  const [activeTab, setActiveTab] = useState<TabType>("Pipeline");

  const tabs: { id: TabType; icon: LucideIcon; label: string }[] = [
    { id: "Pipeline", icon: LayoutGrid, label: "Pipeline & Dispatch" },
    { id: "Records", icon: TableProperties, label: "Records & Data" },
    { id: "Finance & Tracking", icon: Wallet, label: "Finance & Logistics" },
    { id: "Intelligence", icon: LineChart, label: "Intelligence & Analytics" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <ShoppingCart className="h-8 w-8 text-primary" /> Orders Operations Center
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Enterprise-grade management for dispatch, analytics, finance, and logistics.
          </p>
        </div>
        
        {/* Custom Tabs Navigation */}
        <div className="flex gap-1 bg-muted/20 p-1 rounded-xl border border-border/40 overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
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

      {/* Shared Drawer Component */}
      <OrderDetailsDrawer />

      {/* Tab Content Rendering */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "Pipeline" && (
            <div className="space-y-6">
              <OrdersCommandCenter />
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                <div className="xl:col-span-3">
                  <OrdersPipelineBoard />
                </div>
                <div className="xl:col-span-1">
                  <CustomerActivityFeed />
                </div>
              </div>
            </div>
          )}

          {activeTab === "Records" && (
            <div className="space-y-6">
              <OrdersManagementTable />
            </div>
          )}

          {activeTab === "Finance & Tracking" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <PaymentVerificationCenter />
              </div>
              <div className="lg:col-span-1 space-y-6">
                <RefundManagement />
              </div>
              <div className="lg:col-span-1 space-y-6">
                <LiveOrderTrackingSimulator />
              </div>
            </div>
          )}

          {activeTab === "Intelligence" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SmartOrderInsights />
              <DeliveryETAIntelligence />
              <OrderPerformanceDashboard />
              <OrderAnalyticsCenter />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

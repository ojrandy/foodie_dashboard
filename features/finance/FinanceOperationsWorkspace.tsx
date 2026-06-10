"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Wallet, CreditCard, BarChart3, Map } from "lucide-react";

// Tab 1: Command Center
import { FinanceExecutiveDashboard } from "./components/FinanceExecutiveDashboard";
import { FinanceActivityFeed } from "./components/FinanceActivityFeed";
import { ExecutiveFinanceReporting } from "./components/ExecutiveFinanceReporting";

// Tab 2: Revenue & Transactions
import { RevenueIntelligence } from "./components/RevenueIntelligence";
import { TransactionRegistry } from "./components/TransactionRegistry";

// Tab 3: Expenses & Payouts
import { RiderPayoutManagement } from "./components/RiderPayoutManagement";
import { RefundManagement } from "./components/RefundManagement";
import { ExpenseManagement } from "./components/ExpenseManagement";

// Tab 4: Profitability & Forecasting
import { ProfitabilityIntelligence } from "./components/ProfitabilityIntelligence";
import { FinancialForecasting } from "./components/FinancialForecasting";
import { FinancialAnalytics } from "./components/FinancialAnalytics";

// Tab 5: Health & Geography
import { RegionalFinanceIntelligence } from "./components/RegionalFinanceIntelligence";
import { FinancialHealthMonitoring } from "./components/FinancialHealthMonitoring";
import { AIFinanceInsights } from "./components/AIFinanceInsights";

export function FinanceOperationsWorkspace() {
  const [activeTab, setActiveTab] = useState("command-center");

  const tabs = [
    { id: "command-center", label: "Executive Dashboard", icon: LayoutDashboard },
    { id: "revenue", label: "Revenue & Txns", icon: Wallet },
    { id: "expenses", label: "Expenses & Payouts", icon: CreditCard },
    { id: "profitability", label: "Profit & Forecast", icon: BarChart3 },
    { id: "health", label: "Health & Geography", icon: Map },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] overflow-hidden max-w-[1600px] mx-auto w-full gap-4">
      
      {/* Header & Navigation */}
      <header className="shrink-0 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
              Finance Operations
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enterprise Financial Intelligence & Payouts Engine
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
                    isActive ? "text-emerald-500 shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="finance-tab-indicator"
                      className="absolute inset-0 bg-background border border-border/50 rounded-lg shadow-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <tab.icon className={`h-4 w-4 relative z-10 ${isActive ? "text-emerald-500" : ""}`} />
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
                  <FinanceExecutiveDashboard />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-[400px]">
                  <div className="lg:col-span-2">
                    <ExecutiveFinanceReporting />
                  </div>
                  <div className="lg:col-span-1">
                    <FinanceActivityFeed />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "revenue" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                <div className="lg:col-span-1 h-[400px] lg:h-full">
                  <RevenueIntelligence />
                </div>
                <div className="lg:col-span-2 h-[500px] lg:h-full">
                  <TransactionRegistry />
                </div>
              </div>
            )}

            {activeTab === "expenses" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                <div className="lg:col-span-1 flex flex-col gap-4 h-full">
                  <div className="flex-1 min-h-[300px]">
                    <ExpenseManagement />
                  </div>
                </div>
                <div className="lg:col-span-1 h-[400px] lg:h-full">
                  <RiderPayoutManagement />
                </div>
                <div className="lg:col-span-1 h-[400px] lg:h-full">
                  <RefundManagement />
                </div>
              </div>
            )}

            {activeTab === "profitability" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                <div className="lg:col-span-2 flex flex-col gap-4 h-full">
                  <div className="flex-1 min-h-[350px]">
                    <ProfitabilityIntelligence />
                  </div>
                  <div className="shrink-0 min-h-[250px]">
                    <FinancialForecasting />
                  </div>
                </div>
                <div className="lg:col-span-1 h-[400px] lg:h-full">
                  <FinancialAnalytics />
                </div>
              </div>
            )}

            {activeTab === "health" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                <div className="lg:col-span-2 h-[500px] lg:h-full">
                  <RegionalFinanceIntelligence />
                </div>
                <div className="lg:col-span-1 flex flex-col gap-4 h-full">
                  <div className="flex-1 min-h-[200px]">
                    <FinancialHealthMonitoring />
                  </div>
                  <div className="shrink-0 min-h-[250px]">
                    <AIFinanceInsights />
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
